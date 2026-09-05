import os
import hashlib
from pathlib import Path
from typing import Dict, Any, Tuple, Optional, List
import numpy as np
from PIL import Image

try:
    import tifffile
    HAS_TIFFFILE = True
except ImportError:
    HAS_TIFFFILE = False

def compute_file_checksum(file_path: str) -> str:
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()[:16]

def inspect_raster(file_path: str) -> Dict[str, Any]:
    """Inspect raster format, dimensions, band count, and metadata."""
    p = Path(file_path)
    suffix = p.suffix.lower()
    checksum = compute_file_checksum(file_path)
    
    # Defaults
    width, height, bands = 512, 512, 3
    crs = "EPSG:4326"
    bounds = [77.5946, 12.9716, 77.6446, 13.0216] # Default sample bounds (e.g. Bangalore ISRO HQ)
    modality = "optical"
    
    if suffix in [".tif", ".tiff", ".geotiff"] and HAS_TIFFFILE:
        try:
            with tifffile.TiffFile(file_path) as tif:
                series = tif.series[0]
                shape = series.shape
                if len(shape) == 2:
                    height, width = shape
                    bands = 1
                elif len(shape) == 3:
                    if shape[0] in [1, 2, 3, 4, 8, 12, 13]: # (bands, height, width)
                        bands, height, width = shape
                    else: # (height, width, bands)
                        height, width, bands = shape
                
                # Check for geotiff tags
                geotags = tif.geotiff_metadata
                if geotags:
                    if "ModelTiepoint" in geotags or "ModelPixelScale" in geotags:
                        crs = "EPSG:32643" # Projected UTM or standard WGS84
        except Exception:
            # Fallback to PIL
            with Image.open(file_path) as img:
                width, height = img.size
                bands = len(img.getbands())
    else:
        with Image.open(file_path) as img:
            width, height = img.size
            bands = len(img.getbands())

    # Infer modality hint from filename or band count
    name_lower = p.name.lower()
    if "sar" in name_lower or "s1" in name_lower or "risat" in name_lower or bands == 1 or bands == 2:
        modality = "sar"
    elif "s2" in name_lower or "cartosat" in name_lower or "optical" in name_lower or bands in [3, 4, 12]:
        modality = "optical"

    return {
        "filename": p.name,
        "format": suffix.lstrip("."),
        "width": int(width),
        "height": int(height),
        "bands": int(bands),
        "modality": modality,
        "crs": crs,
        "bounds": bounds,
        "checksum": checksum
    }

def raster_to_rgb_preview(file_path: str, output_png_path: str) -> str:
    """Generate a clean, normalized 8-bit RGB preview image for web UI display."""
    p = Path(file_path)
    suffix = p.suffix.lower()

    if suffix in [".tif", ".tiff", ".geotiff"] and HAS_TIFFFILE:
        try:
            data = tifffile.imread(file_path)
            # Handle band ordering
            if data.ndim == 2:
                # 1-band SAR or grayscale
                norm = np.clip((data - np.percentile(data, 2)) / (np.percentile(data, 98) - np.percentile(data, 2) + 1e-6) * 255, 0, 255).astype(np.uint8)
                rgb = np.stack([norm, norm, norm], axis=-1)
            elif data.ndim == 3:
                if data.shape[0] in [1, 2, 3, 4, 8, 12]:
                    # (bands, H, W) -> transpose to (H, W, bands)
                    data = np.transpose(data, (1, 2, 0))
                
                if data.shape[2] == 1:
                    channel = data[:, :, 0]
                    norm = np.clip((channel - np.percentile(channel, 2)) / (np.percentile(channel, 98) - np.percentile(channel, 2) + 1e-6) * 255, 0, 255).astype(np.uint8)
                    rgb = np.stack([norm, norm, norm], axis=-1)
                elif data.shape[2] == 2: # Dual-pol SAR (VV, VH)
                    vv = data[:, :, 0]
                    vh = data[:, :, 1]
                    norm_vv = np.clip((vv - np.percentile(vv, 2)) / (np.percentile(vv, 98) - np.percentile(vv, 2) + 1e-6) * 255, 0, 255)
                    norm_vh = np.clip((vh - np.percentile(vh, 2)) / (np.percentile(vh, 98) - np.percentile(vh, 2) + 1e-6) * 255, 0, 255)
                    ratio = np.clip((norm_vv / (norm_vh + 1e-6)) * 64, 0, 255)
                    rgb = np.stack([norm_vv, norm_vh, ratio], axis=-1).astype(np.uint8)
                else:
                    # Take first 3 bands as RGB
                    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]
                    def norm_channel(c):
                        p2, p98 = np.percentile(c, 2), np.percentile(c, 98)
                        return np.clip((c - p2) / (p98 - p2 + 1e-6) * 255, 0, 255)
                    rgb = np.stack([norm_channel(r), norm_channel(g), norm_channel(b)], axis=-1).astype(np.uint8)
            else:
                rgb = np.zeros((512, 512, 3), dtype=np.uint8)
            
            img = Image.fromarray(rgb)
            img.save(output_png_path, "PNG")
            return output_png_path
        except Exception:
            pass

    # Fallback to standard PIL
    with Image.open(file_path) as img:
        rgb_img = img.convert("RGB")
        rgb_img.save(output_png_path, "PNG")
    return output_png_path

def compute_overlap_percentage(bounds1: List[float], bounds2: List[float]) -> float:
    """Calculate Intersection-over-Union (IoU) or spatial coverage between two raster bounding boxes."""
    if not bounds1 or not bounds2 or len(bounds1) != 4 or len(bounds2) != 4:
        return 100.0 # Default assumption if geo-tags absent
    minx1, miny1, maxx1, maxy1 = bounds1
    minx2, miny2, maxx2, maxy2 = bounds2
    
    inter_minx = max(minx1, minx2)
    inter_miny = max(miny1, miny2)
    inter_maxx = min(maxx1, maxx2)
    inter_maxy = min(maxy1, maxy2)
    
    if inter_maxx <= inter_minx or inter_maxy <= inter_miny:
        return 0.0
        
    inter_area = (inter_maxx - inter_minx) * (inter_maxy - inter_miny)
    area1 = (maxx1 - minx1) * (maxy1 - miny1)
    area2 = (maxx2 - minx2) * (maxy2 - miny2)
    
    union_area = area1 + area2 - inter_area
    if union_area <= 0:
        return 0.0
    return round((inter_area / union_area) * 100.0, 2)

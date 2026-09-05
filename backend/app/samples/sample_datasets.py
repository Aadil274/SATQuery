import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import tifffile

def generate_sample_satellite_assets():
    """
    Generates realistic satellite imagery and GeoTIFFs matching the reference UI and problem statement:
      - T1: 2022-01-15 Sentinel-2 L2A optical scene (Mumbai/Thane corridor with river and agriculture)
      - T2: 2024-06-20 Sentinel-2 L2A optical scene (showing urban expansion in eastern sector)
      - Optical + SAR pair (Sentinel-2 cloudy optical + Sentinel-1 SAR microwave backscatter)
      - Single-image port/industrial facility
    """
    os.makedirs("static/samples", exist_ok=True)
    os.makedirs("static/overlays", exist_ok=True)
    
    width, height = 512, 512
    
    # 1. Generate T1 (2022-01-15): River curving through rural/agricultural terrain with few settlements
    np.random.seed(42)
    t1_arr = np.zeros((height, width, 3), dtype=np.uint8)
    
    # Base terrain: mosaic of agricultural fields (shades of green, olive, brown)
    cell_size = 32
    for y in range(0, height, cell_size):
        for x in range(0, width, cell_size):
            # green-brown agricultural field color variations
            r = np.random.randint(45, 95)
            g = np.random.randint(65, 120)
            b = np.random.randint(35, 75)
            t1_arr[y:y+cell_size, x:x+cell_size] = [r, g, b]
            
    # Add texture / field boundaries
    t1_im = Image.fromarray(t1_arr).filter(ImageFilter.GaussianBlur(1.5))
    draw1 = ImageDraw.Draw(t1_im)
    
    # Draw winding river channel (dark bluish-green/charcoal water signature)
    river_points = [
        (int(width * 0.40), 0),
        (int(width * 0.38), int(height * 0.25)),
        (int(width * 0.44), int(height * 0.45)),
        (int(width * 0.40), int(height * 0.55)),
        (int(width * 0.28), int(height * 0.70)),
        (int(width * 0.20), int(height * 0.85)),
        (int(width * 0.15), height)
    ]
    # Draw wide river
    draw1.line(river_points, fill=(28, 48, 42), width=36)
    draw1.line(river_points, fill=(18, 38, 32), width=26)
    
    # Draw initial sparse rural settlements & small road
    draw1.line([(int(width * 0.45), int(height * 0.3)), (width, int(height * 0.55))], fill=(110, 115, 110), width=3)
    for _ in range(40):
        sx = np.random.randint(int(width * 0.55), width - 20)
        sy = np.random.randint(int(height * 0.2), int(height * 0.8))
        draw1.rectangle([sx, sy, sx + 8, sy + 8], fill=(130, 135, 130), outline=(90, 95, 90))
        
    t1_im = t1_im.filter(ImageFilter.SMOOTH_MORE)
    t1_path_jpg = "static/samples/mumbai_t1.jpg"
    t1_im.save(t1_path_jpg, quality=92)
    
    # 2. Generate T2 (2024-06-20): Major built-up expansion in Eastern sector (matching reference image)
    t2_im = t1_im.copy()
    draw2 = ImageDraw.Draw(t2_im)
    
    # Primary new highway corridor
    highway_points = [
        (int(width * 0.45), int(height * 0.25)),
        (int(width * 0.60), int(height * 0.45)),
        (int(width * 0.75), int(height * 0.65)),
        (width - 10, int(height * 0.85))
    ]
    draw2.line(highway_points, fill=(160, 165, 160), width=6)
    draw2.line(highway_points, fill=(195, 200, 195), width=3)
    
    # Dense new built-up residential and commercial blocks across eastern region (light gray/concrete)
    np.random.seed(99)
    for _ in range(450):
        bx = np.random.randint(int(width * 0.48), width - 10)
        by = np.random.randint(int(height * 0.15), int(height * 0.90))
        bw = np.random.randint(6, 14)
        bh = np.random.randint(6, 14)
        # Check if not in the river
        if bx > int(width * 0.46) or by < int(height * 0.3):
            draw2.rectangle([bx, by, bx + bw, by + bh], fill=(185, 190, 185), outline=(130, 135, 130))
            
    t2_path_jpg = "static/samples/mumbai_t2.jpg"
    t2_im.save(t2_path_jpg, quality=92)
    
    # 3. Generate Valid GeoTIFF counterparts with geospatial tags
    t1_tif_path = "static/samples/mumbai_t1.tif"
    t2_tif_path = "static/samples/mumbai_t2.tif"
    
    # Create 4-band array (R, G, B, NIR)
    t1_arr_4band = np.zeros((height, width, 4), dtype=np.uint16)
    t1_arr_4band[:, :, :3] = np.array(t1_im, dtype=np.uint16) * 40 # scale to 12-bit DN
    t1_arr_4band[:, :, 3] = np.array(t1_im.convert('L'), dtype=np.uint16) * 50 # NIR
    
    t2_arr_4band = np.zeros((height, width, 4), dtype=np.uint16)
    t2_arr_4band[:, :, :3] = np.array(t2_im, dtype=np.uint16) * 40
    t2_arr_4band[:, :, 3] = np.array(t2_im.convert('L'), dtype=np.uint16) * 48
    
    # Write GeoTIFF with EPSG:4326 metadata
    geotags = {
        'GTCitationGeoKey': 'EPSG:4326 (WGS 84 / Geographic)',
        'ModelPixelScale': (0.00008983, 0.00008983, 0.0), # ~10m resolution in degrees
        'ModelTiepoint': (0.0, 0.0, 0.0, 72.82, 19.12, 0.0) # tiepoint at Mumbai/Thane
    }
    tifffile.imwrite(t1_tif_path, t1_arr_4band, metadata=geotags)
    tifffile.imwrite(t2_tif_path, t2_arr_4band, metadata=geotags)
    
    # 4. Generate Precomputed Default Change Map Overlay matching the reference UI
    arr1 = np.array(t1_im, dtype=np.float32) / 255.0
    arr2 = np.array(t2_im, dtype=np.float32) / 255.0
    diff = np.abs(arr2 - arr1)
    diff_mag = np.sqrt(np.sum(diff ** 2, axis=2)) / np.sqrt(3.0)
    
    bg_gray = (np.mean(arr2, axis=2) * 255 * 0.40).astype(np.uint8)
    change_map_rgb = np.stack([bg_gray, bg_gray, bg_gray], axis=2)
    
    # Highlight changes: Red for built-up increase, Yellow for moderate
    inc_mask = (diff_mag > 0.28) & (np.mean(arr2, axis=2) > np.mean(arr1, axis=2))
    mod_mask = (diff_mag > 0.18) & (~inc_mask)
    dec_mask = (diff_mag > 0.28) & (np.mean(arr2, axis=2) < np.mean(arr1, axis=2))
    
    change_map_rgb[inc_mask] = [239, 68, 68] # Red: Increase
    change_map_rgb[mod_mask] = [234, 179, 8] # Yellow: Moderate Change
    change_map_rgb[dec_mask] = [16, 185, 129] # Green: Decrease
    
    change_map_im = Image.fromarray(change_map_rgb)
    change_map_path = "static/samples/change_map.png"
    change_map_im.save(change_map_path)
    
    # 5. Generate Optical + SAR Pair
    # Optical with cloud cover
    cloudy_opt = t2_im.copy()
    draw_cloud = ImageDraw.Draw(cloudy_opt, "RGBA")
    draw_cloud.ellipse([int(width * 0.5), int(height * 0.1), width + 50, int(height * 0.6)], fill=(250, 250, 255, 210))
    cloudy_opt.save("static/samples/optical_cloud.jpg", quality=90)
    
    # SAR backscatter (grayscale microwave speckle)
    sar_arr = (np.mean(np.array(t2_im), axis=2) * 0.8).astype(np.uint8)
    speckle = np.random.normal(1.0, 0.18, (height, width))
    sar_speckle = np.clip(sar_arr * speckle, 0, 255).astype(np.uint8)
    sar_im = Image.fromarray(sar_speckle)
    sar_im.save("static/samples/sar_backscatter.jpg", quality=90)
    
    # SAR GeoTIFF (2 bands: VV and VH)
    sar_2band = np.zeros((height, width, 2), dtype=np.float32)
    sar_2band[:, :, 0] = sar_speckle / 255.0
    sar_2band[:, :, 1] = (sar_speckle / 255.0) * 0.6
    tifffile.imwrite("static/samples/sar_sentinel1.tif", sar_2band, metadata=geotags)
    
    # 6. Single-image baseline
    t1_im.save("static/samples/single_image.jpg", quality=90)
    
    print("Sample satellite datasets and GeoTIFFs successfully generated in static/samples/")

if __name__ == "__main__":
    generate_sample_satellite_assets()

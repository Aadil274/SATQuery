import uuid
from pathlib import Path
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse

from backend.app.core.config import UPLOADS_DIR, OUTPUTS_DIR, SAMPLES_DIR
from backend.app.models_schema.image import ImageMetadata, ImageValidationResult, PairValidationRequest, PairValidationResult
from backend.app.services.storage import storage_service
from ai.shared.raster_utils import inspect_raster, raster_to_rgb_preview, compute_overlap_percentage

router = APIRouter(prefix="/images", tags=["images"])

@router.post("/upload", response_model=ImageValidationResult)
async def upload_image(
    file: UploadFile = File(...),
    modality_hint: Optional[str] = Form("optical")
):
    """Upload GeoTIFF, TIFF, PNG, or JPEG raster. Automatically parses CRS, bands, and generates web preview."""
    ext = Path(file.filename).suffix.lower().lstrip(".")
    if ext not in ["tif", "tiff", "geotiff", "png", "jpg", "jpeg"]:
        return ImageValidationResult(
            is_valid=False,
            reasons=[f"Unsupported file format '.{ext}'. Supported: GeoTIFF, TIFF, PNG, JPEG"],
            metadata=None
        )

    image_id = f"img_{uuid.uuid4().hex[:8]}"
    saved_filename = f"{image_id}_{file.filename}"
    saved_path = UPLOADS_DIR / saved_filename
    
    # Save file to disk
    contents = await file.read()
    with open(saved_path, "wb") as f:
        f.write(contents)

    # Inspect raster
    info = inspect_raster(str(saved_path))
    if modality_hint and modality_hint in ["optical", "sar", "multispectral"]:
        info["modality"] = modality_hint

    # Generate web preview PNG
    preview_filename = f"prev_{image_id}.png"
    preview_path = UPLOADS_DIR / preview_filename
    raster_to_rgb_preview(str(saved_path), str(preview_path))

    metadata = ImageMetadata(
        image_id=image_id,
        filename=file.filename,
        file_path=str(saved_path),
        format=info["format"],
        width=info["width"],
        height=info["height"],
        bands=info["bands"],
        modality=info["modality"],
        crs=info["crs"],
        bounds=info["bounds"],
        checksum=info["checksum"],
        preview_url=f"/api/images/previews/{preview_filename}"
    )

    storage_service.save_image(image_id, metadata.model_dump())

    return ImageValidationResult(
        is_valid=True,
        reasons=["Raster parsed and validated successfully.", f"CRS: {info['crs']}, Bands: {info['bands']}"],
        metadata=metadata
    )

@router.post("/validate-pair", response_model=PairValidationResult)
def validate_pair(req: PairValidationRequest):
    """Validates co-registration, CRS compatibility, and spatial coverage for pairs."""
    img1 = storage_service.get_image(req.image_id_1)
    img2 = storage_service.get_image(req.image_id_2)

    if not img1 or not img2:
        raise HTTPException(status_code=404, detail="One or both images not found")

    meta1 = ImageMetadata(**img1)
    meta2 = ImageMetadata(**img2)

    reasons = []
    is_compatible = True
    co_registered = meta1.crs == meta2.crs

    if not co_registered:
        is_compatible = False
        reasons.append(f"CRS mismatch: {meta1.crs} vs {meta2.crs}.")

    overlap = compute_overlap_percentage(meta1.bounds or [], meta2.bounds or [])
    if overlap < 50.0:
        is_compatible = False
        reasons.append(f"Insufficient spatial overlap: {overlap}% (minimum 50% required).")
    else:
        reasons.append(f"Spatial overlap verified: {overlap}% coverage.")

    if req.pair_type == "cross_modal":
        has_sar = meta1.modality == "sar" or meta2.modality == "sar"
        has_opt = meta1.modality in ["optical", "multispectral"] or meta2.modality in ["optical", "multispectral"]
        if not (has_sar and has_opt):
            reasons.append("Notice: Cross-modal analysis works best with 1 Optical and 1 SAR input.")

    return PairValidationResult(
        is_compatible=is_compatible,
        co_registered=co_registered,
        spatial_overlap_percent=overlap,
        reasons=reasons,
        metadata_1=meta1,
        metadata_2=meta2
    )

@router.get("/samples")
def get_sample_datasets():
    """Returns curated demo datasets for 1-click live testing."""
    manifest_file = SAMPLES_DIR / "sample_manifest.json"
    if manifest_file.exists():
        import json
        with open(manifest_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"samples": []}

@router.post("/samples/load/{scenario_id}")
def load_sample_scenario(scenario_id: str):
    """Loads a pre-bundled evaluation scenario directly into active session storage."""
    manifest_file = SAMPLES_DIR / "sample_manifest.json"
    if not manifest_file.exists():
        raise HTTPException(status_code=404, detail="Sample manifest not found")
    
    import json
    import shutil
    with open(manifest_file, "r", encoding="utf-8") as f:
        manifest = json.load(f)
        
    scenario = next((s for s in manifest.get("samples", []) if s["id"] == scenario_id), None)
    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")
        
    loaded_images = []
    for item in scenario["images"]:
        src_path = SAMPLES_DIR / item["filename"]
        if not src_path.exists():
            continue
            
        img_id = f"sample_{item['filename'].split('.')[0]}"
        dest_filename = f"{img_id}_{item['filename']}"
        dest_path = UPLOADS_DIR / dest_filename
        shutil.copyfile(src_path, dest_path)
        
        preview_filename = f"prev_{img_id}.png"
        preview_path = UPLOADS_DIR / preview_filename
        
        # Copy preview if exists or generate
        src_prev = SAMPLES_DIR / item.get("preview_filename", "")
        if src_prev.exists():
            shutil.copyfile(src_prev, preview_path)
        else:
            raster_to_rgb_preview(str(dest_path), str(preview_path))
            
        info = inspect_raster(str(dest_path))
        info["modality"] = item.get("modality", info["modality"])
        info["crs"] = item.get("crs", info["crs"])
        
        meta = ImageMetadata(
            image_id=img_id,
            filename=item["filename"],
            file_path=str(dest_path),
            format=info["format"],
            width=info["width"],
            height=info["height"],
            bands=info["bands"],
            modality=info["modality"],
            crs=info["crs"],
            bounds=info["bounds"],
            checksum=info["checksum"],
            acquisition_date=item.get("date"),
            preview_url=f"/api/images/previews/{preview_filename}"
        )
        storage_service.save_image(img_id, meta.model_dump())
        loaded_images.append(meta)
        
    return {
        "scenario": scenario,
        "loaded_images": loaded_images
    }

@router.get("/previews/{filename}")
def get_preview_image(filename: str):
    file_path = UPLOADS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Preview not found")
    return FileResponse(file_path, media_type="image/png")

@router.get("/outputs/{filename}")
def get_output_overlay(filename: str):
    file_path = OUTPUTS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Overlay not found")
    return FileResponse(file_path, media_type="image/png")

import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Dict, Any, Optional

from backend.app.schemas.raster_schema import ValidationResult, CoRegistrationResult
from backend.app.validation.raster_validator import RasterValidator
from backend.app.validation.coregistration import CoRegistrationValidator

router = APIRouter()

@router.post("/validate-raster", response_model=ValidationResult)
async def validate_raster(file_path: str):
    return RasterValidator.inspect_raster(file_path)

@router.post("/upload")
async def upload_satellite_image(file: UploadFile = File(...)):
    os.makedirs("static/uploads", exist_ok=True)
    ext = os.path.splitext(file.filename)[1]
    filename = f"upload_{uuid.uuid4().hex[:8]}{ext}"
    saved_path = os.path.join("static/uploads", filename)
    
    with open(saved_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    validation = RasterValidator.inspect_raster(saved_path)
    return {
        "filename": file.filename,
        "saved_path": saved_path,
        "url": f"/static/uploads/{filename}",
        "validation": validation.model_dump()
    }

@router.post("/validate-pair", response_model=CoRegistrationResult)
async def validate_image_pair(file1_path: str, file2_path: str):
    v1 = RasterValidator.inspect_raster(file1_path)
    v2 = RasterValidator.inspect_raster(file2_path)
    return CoRegistrationValidator.validate_pair(v1, v2)

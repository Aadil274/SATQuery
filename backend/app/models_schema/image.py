from pydantic import BaseModel, Field
from typing import Optional, List

class ImageMetadata(BaseModel):
    image_id: str
    filename: str
    file_path: str
    format: str
    width: int
    height: int
    bands: int
    modality: str = "optical"  # optical | sar | multispectral
    crs: Optional[str] = "EPSG:4326"
    bounds: Optional[List[float]] = None  # [minx, miny, maxx, maxy]
    acquisition_date: Optional[str] = None
    checksum: Optional[str] = None
    preview_url: Optional[str] = None

class ImageValidationResult(BaseModel):
    is_valid: bool
    reasons: List[str] = []
    metadata: Optional[ImageMetadata] = None

class PairValidationRequest(BaseModel):
    image_id_1: str
    image_id_2: str
    pair_type: str = "cross_modal"  # cross_modal (optical+sar) | bitemporal (T1+T2)

class PairValidationResult(BaseModel):
    is_compatible: bool
    co_registered: bool
    spatial_overlap_percent: float
    reasons: List[str] = []
    metadata_1: Optional[ImageMetadata] = None
    metadata_2: Optional[ImageMetadata] = None

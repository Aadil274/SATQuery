from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class ModalityType(str, Enum):
    OPTICAL = "Optical (S2)"
    SAR = "SAR (S1)"
    MULTISPECTRAL = "Multispectral"
    UNKNOWN = "Unknown"

class GeoMetadata(BaseModel):
    crs: str = Field("Unknown", description="Coordinate Reference System")
    bounds: List[float] = Field(default_factory=lambda: [], description="[minx, miny, maxx, maxy]")
    width: int = Field(512, description="Raster width in pixels")
    height: int = Field(512, description="Raster height in pixels")
    resolution_m: float = Field(0.0, description="Spatial pixel resolution in meters")
    band_count: int = Field(0, description="Number of raster bands")
    band_names: List[str] = Field(default_factory=lambda: [])
    data_type: str = Field("unknown", description="Raster data type (uint8, uint16, float32)")
    nodata: Optional[float] = Field(None, description="NoData pixel value")
    center_lat: float = Field(0.0, description="Center latitude in degrees")
    center_lon: float = Field(0.0, description="Center longitude in degrees")
    acquisition_date: str = Field("Unknown", description="Acquisition date (YYYY-MM-DD)")
    sensor: str = Field("Unknown", description="Sensor platform name")
    cloud_cover_pct: Optional[float] = Field(0.0, description="Estimated cloud cover percentage")
    area_sq_km: float = Field(0.0, description="Ground area footprint in square kilometers")

class ValidationResult(BaseModel):
    is_valid: bool = True
    file_format: str = "GeoTIFF"
    modality: ModalityType = ModalityType.OPTICAL
    metadata: GeoMetadata
    warnings: List[str] = Field(default_factory=list)
    error: Optional[str] = None

class CoRegistrationResult(BaseModel):
    is_compatible: bool = False
    crs_match: bool = False
    spatial_overlap_pct: float = 0.0
    resolution_match: bool = False
    temporal_difference_days: int = 0
    temporal_order_valid: bool = False
    message: str = "Co-registration not yet validated."

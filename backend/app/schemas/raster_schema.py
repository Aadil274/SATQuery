from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class ModalityType(str, Enum):
    OPTICAL = "Optical (S2)"
    SAR = "SAR (S1)"
    MULTISPECTRAL = "Multispectral"
    UNKNOWN = "Unknown"

class GeoMetadata(BaseModel):
    crs: str = Field("EPSG:4326", description="Coordinate Reference System")
    bounds: List[float] = Field(default_factory=lambda: [72.80, 19.00, 72.95, 19.15], description="[minx, miny, maxx, maxy]")
    width: int = Field(512, description="Raster width in pixels")
    height: int = Field(512, description="Raster height in pixels")
    resolution_m: float = Field(10.0, description="Spatial pixel resolution in meters")
    band_count: int = Field(4, description="Number of raster bands")
    band_names: List[str] = Field(default_factory=lambda: ["B02_Blue", "B03_Green", "B04_Red", "B08_NIR"])
    data_type: str = Field("uint16", description="Raster data type (uint8, uint16, float32)")
    nodata: Optional[float] = Field(None, description="NoData pixel value")
    center_lat: float = Field(19.0760, description="Center latitude in degrees")
    center_lon: float = Field(72.8777, description="Center longitude in degrees")
    acquisition_date: str = Field("2024-06-20", description="Acquisition date (YYYY-MM-DD)")
    sensor: str = Field("Sentinel-2 L2A", description="Sensor platform name")
    cloud_cover_pct: Optional[float] = Field(0.0, description="Estimated cloud cover percentage")
    area_sq_km: float = Field(100.0, description="Ground area footprint in square kilometers")

class ValidationResult(BaseModel):
    is_valid: bool = True
    file_format: str = "GeoTIFF"
    modality: ModalityType = ModalityType.OPTICAL
    metadata: GeoMetadata
    warnings: List[str] = Field(default_factory=list)
    error: Optional[str] = None

class CoRegistrationResult(BaseModel):
    is_compatible: bool = True
    crs_match: bool = True
    spatial_overlap_pct: float = 100.0
    resolution_match: bool = True
    temporal_difference_days: int = 887
    temporal_order_valid: bool = True
    message: str = "Images are accurately co-registered with compatible CRS (EPSG:4326) and 10m spatial resolution."

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from backend.app.stac.stac_service import stac_service, PRESET_LOCATIONS

router = APIRouter()

class StacSearchRequest(BaseModel):
    location: Optional[str] = "mumbai"
    bbox: Optional[List[float]] = None
    modality: Optional[str] = "optical"  # "optical" | "sar"
    max_cloud_cover: Optional[float] = 25.0
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    limit: Optional[int] = 8

class StacIngestRequest(BaseModel):
    id: str
    preview_url: str
    modality: Optional[str] = "optical"
    datetime: Optional[str] = None
    platform: Optional[str] = "Sentinel-2"
    sensor: Optional[str] = "MSI L2A (10m)"
    resolution: Optional[str] = "10.0m / pixel"
    location_name: Optional[str] = "Global Satellite Pass"
    bbox: Optional[List[float]] = None
    source: Optional[str] = "STAC Engine"

@router.get("/presets")
async def get_stac_preset_locations():
    """Returns curated high-interest global satellite locations for quick discovery."""
    return list(PRESET_LOCATIONS.values())

@router.post("/search")
async def search_stac_scenes(req: StacSearchRequest):
    """
    Searches live public STAC catalogs (Planetary Computer & Earth Search)
    for Sentinel-2 Optical and Sentinel-1 SAR imagery.
    """
    try:
        results = stac_service.search_passes(
            location=req.location,
            bbox=req.bbox,
            modality=req.modality or "optical",
            max_cloud_cover=req.max_cloud_cover if req.max_cloud_cover is not None else 25.0,
            start_date=req.start_date,
            end_date=req.end_date,
            limit=req.limit or 8
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"STAC search failed: {str(e)}")

@router.post("/ingest")
async def ingest_stac_scene(req: StacIngestRequest):
    """
    Downloads and caches a selected satellite pass and converts it into a ready-to-use ImageSlot.
    """
    try:
        slot = stac_service.ingest_scene(req.model_dump())
        return slot
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to ingest STAC satellite scene: {str(e)}")

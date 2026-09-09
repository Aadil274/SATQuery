import sys
import os

# Ensure project root is in sys.path for reliable imports across hosting platforms
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.app.api.routes_agent import router as agent_router
from backend.app.api.routes_raster import router as raster_router
from backend.app.api.routes_registry import router as registry_router
from backend.app.api.routes_datasets import router as dataset_router

app = FastAPI(
    title="SatQuery AI - Core Backend API",
    description="Vision-Language Assistant for Remote Sensing & Earth Observation (Autonomous Earth-Observation Console)",
    version="1.0.0"
)

# Enable CORS for local dev and GUI access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directories for imagery, overlays, and generated PDF reports
STATIC_DIR = os.path.join(ROOT_DIR, "static")
os.makedirs(os.path.join(STATIC_DIR, "samples"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "overlays"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "reports"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "uploads"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "datasets"), exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Include API Routers
app.include_router(agent_router, prefix="/api", tags=["Agentic Analysis"])
app.include_router(raster_router, prefix="/api", tags=["Raster & Geospatial Validation"])
app.include_router(registry_router, prefix="/api", tags=["Model & Tool Registry"])
app.include_router(dataset_router, prefix="/api/datasets", tags=["Dataset & Benchmark Explorers"])

@app.get("/api/health")
async def health_check():
    return {
        "system": "SatQuery AI",
        "description": "Remote Sensing Vision-Language Assistant for Earth Observation",
        "status": "Operational",
        "supported_inputs": [
            "Single Image (Optical/SAR)",
            "Optical + SAR Pair",
            "Bi-temporal Pair"
        ],
        "formats": ["GeoTIFF (.tif/.tiff)", "Standard Raster (.png/.jpg for benchmarks)"],
        "version": "1.0.0"
    }

# Serve frontend build if present
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "frontend", "dist")

if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_candidate = os.path.join(frontend_dist, full_path)
        if full_path and os.path.exists(file_candidate) and os.path.isfile(file_candidate):
            return FileResponse(file_candidate)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    @app.get("/")
    async def root():
        return await health_check()

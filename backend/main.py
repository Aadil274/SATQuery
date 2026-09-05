import sys
from pathlib import Path

# Add project root to sys.path so 'backend' and 'ai' modules can be imported smoothly
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.routes import auth, images, query, registry, history, report

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis (ISRO / SIH 2026 PS ID 26167)"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(images.router, prefix=settings.API_V1_STR)
app.include_router(query.router, prefix=settings.API_V1_STR)
app.include_router(registry.router, prefix=settings.API_V1_STR)
app.include_router(history.router, prefix=settings.API_V1_STR)
app.include_router(report.router, prefix=settings.API_V1_STR)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "controller": "Agentic Multi-Model Orchestrator Active"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

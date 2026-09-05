import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent.parent
STORAGE_DIR = BASE_DIR / "storage"
UPLOADS_DIR = STORAGE_DIR / "uploads"
OUTPUTS_DIR = STORAGE_DIR / "outputs"
REPORTS_DIR = STORAGE_DIR / "reports"
SAMPLES_DIR = BASE_DIR / "samples"

for d in [STORAGE_DIR, UPLOADS_DIR, OUTPUTS_DIR, REPORTS_DIR, SAMPLES_DIR]:
    d.mkdir(parents=True, exist_ok=True)

class Settings(BaseModel):
    PROJECT_NAME: str = "SatQuery AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "satquery-isro-sih2026-super-secret-key-32charsmin")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # Supported modalities
    MODALITIES: list[str] = ["optical", "sar", "multispectral"]
    
    # Supported task categories
    TASKS: list[str] = [
        "single_vqa",
        "captioning",
        "grounding",
        "bitemporal_change",
        "cross_modal_fusion"
    ]

settings = Settings()

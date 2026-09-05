from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class ReportMetadata(BaseModel):
    report_id: str
    generated_at: str
    mission_agency: str = "Earth Observation Mission Division"
    system_name: str = "SatQuery AI - Remote Sensing Vision-Language Assistant"
    classification: str = "OFFICIAL / EO-EVALUATION"

class ReportPayload(BaseModel):
    metadata: ReportMetadata
    query: str
    task_type: str
    executive_summary: str
    confidence_score: int
    bullet_points: List[str]
    geospatial_metadata: Dict[str, Any]
    models_executed: List[Dict[str, Any]]
    execution_trace: List[Dict[str, Any]]
    change_metrics: Optional[Dict[str, Any]] = None
    evidence_regions: List[Dict[str, Any]]

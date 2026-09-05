from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from backend.app.models_schema.trace import ExecutionTrace

class QuerySubmitRequest(BaseModel):
    image_ids: List[str] = Field(..., min_length=1, max_length=2)
    query_text: str = Field(..., min_length=2)
    task_override: Optional[str] = None  # allows manual override if desired
    parameters: Optional[Dict[str, Any]] = Field(default_factory=dict)

class VisualEvidence(BaseModel):
    overlay_url: Optional[str] = None
    overlay_type: str  # "grounding_boxes", "change_diff_heatmap", "sar_optical_fused", "scene_segmentation"
    features: List[Dict[str, Any]] = Field(default_factory=list)
    legend: Dict[str, str] = Field(default_factory=dict)
    summary_stats: Dict[str, Any] = Field(default_factory=dict)

class ConfidenceDetail(BaseModel):
    score: float = Field(..., ge=0.0, le=1.0)
    level: str  # "HIGH", "MODERATE", "LOW"
    calibration_metric: str = "temperature_scaled_entropy"
    low_confidence_warning: bool = False
    warning_message: Optional[str] = None
    factors: Dict[str, float] = Field(default_factory=dict)

class QueryResponse(BaseModel):
    request_id: str
    status: str = "completed"
    task_type: str
    query_text: str
    answer_text: str
    confidence: ConfidenceDetail
    visual_evidence: Optional[VisualEvidence] = None
    execution_trace: ExecutionTrace
    report_url: Optional[str] = None
    created_at: str

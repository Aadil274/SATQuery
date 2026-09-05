from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class ModelInvoked(BaseModel):
    model_id: str
    model_name: str
    version: str
    task_specialty: str
    architecture: str
    benchmark_score: Dict[str, Any] = Field(default_factory=dict)
    endpoint_type: str = "in-process-loRA"

class InputValidationTrace(BaseModel):
    input_count: int
    modalities_detected: List[str]
    crs_aligned: bool
    spatial_coverage_overlap: float
    format_verified: bool

class ExecutionTrace(BaseModel):
    trace_id: str
    timestamp: str
    task_classified: str
    classification_method: str = "rule_plus_intent_classifier"
    classification_confidence: float
    input_validation: InputValidationTrace
    routing_rationale: str
    models_invoked: List[ModelInvoked]
    permitted_parameters_used: Dict[str, Any] = Field(default_factory=dict)
    execution_latency_ms: float
    confidence_calibration: Dict[str, Any] = Field(default_factory=dict)

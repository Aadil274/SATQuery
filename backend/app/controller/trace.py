import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from backend.app.models_schema.trace import ExecutionTrace, ModelInvoked, InputValidationTrace

def build_execution_trace(
    task_classified: str,
    classification_method: str,
    classification_confidence: float,
    routing_rationale: str,
    input_validation_trace: InputValidationTrace,
    model_entry: Dict[str, Any],
    sanitized_parameters: Dict[str, Any],
    execution_latency_ms: float,
    confidence_detail: Dict[str, Any]
) -> ExecutionTrace:
    """Constructs a deterministic, auditable JSON execution trace compliant with ISRO evaluation."""
    
    trace_id = f"trc_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:6]}"
    
    model_invoked = ModelInvoked(
        model_id=model_entry.get("model_id", "Unknown-Model"),
        model_name=model_entry.get("name", "Unknown-Model-Name"),
        version=model_entry.get("version", "1.0.0"),
        task_specialty=task_classified,
        architecture=model_entry.get("architecture", "Custom RS Neural Architecture"),
        benchmark_score=model_entry.get("benchmark_scores", {}),
        endpoint_type="in-process-loRA"
    )
    
    return ExecutionTrace(
        trace_id=trace_id,
        timestamp=datetime.now(timezone.utc).isoformat(),
        task_classified=task_classified,
        classification_method=classification_method,
        classification_confidence=round(classification_confidence, 3),
        input_validation=input_validation_trace,
        routing_rationale=routing_rationale,
        models_invoked=[model_invoked],
        permitted_parameters_used=sanitized_parameters,
        execution_latency_ms=round(execution_latency_ms, 2),
        confidence_calibration=confidence_detail
    )

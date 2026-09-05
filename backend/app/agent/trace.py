import time
from typing import Dict, Any, List, Optional
import uuid

class ExecutionTraceRecorder:
    """
    Maintains an auditable, replayable execution trace log for every SatQuery AI request.
    Stores exact parameter snapshots, step latency, intermediate tensors, and decision criteria.
    """
    def __init__(self):
        self._traces: Dict[str, Dict[str, Any]] = {}

    def start_trace(self, query: str, task_type: str, inputs: Dict[str, Any]) -> str:
        trace_id = f"tr_{uuid.uuid4().hex[:12]}"
        self._traces[trace_id] = {
            "trace_id": trace_id,
            "start_time": time.time(),
            "query": query,
            "task_type": task_type,
            "inputs": inputs,
            "steps": [],
            "models_executed": [],
            "status": "in_progress"
        }
        return trace_id

    def log_step(
        self,
        trace_id: str,
        step_name: str,
        status: str,
        details: Dict[str, Any],
        duration_ms: float = 0.0
    ):
        if trace_id in self._traces:
            self._traces[trace_id]["steps"].append({
                "step_name": step_name,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                "status": status,
                "duration_ms": round(duration_ms, 2),
                "details": details
            })

    def complete_trace(
        self,
        trace_id: str,
        output_summary: Dict[str, Any],
        confidence: float
    ) -> Dict[str, Any]:
        if trace_id in self._traces:
            trace = self._traces[trace_id]
            trace["end_time"] = time.time()
            trace["total_duration_sec"] = round(trace["end_time"] - trace["start_time"], 2)
            trace["confidence"] = confidence
            trace["output_summary"] = output_summary
            trace["status"] = "completed"
            return trace
        return {}

    def get_trace(self, trace_id: str) -> Optional[Dict[str, Any]]:
        return self._traces.get(trace_id)

trace_recorder = ExecutionTraceRecorder()

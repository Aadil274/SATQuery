from typing import Dict, Any, List
from backend.app.agent.registry import RemoteSensingTool, Tuple_Validation, tool_registry
from backend.app.models.change_detector import ChangeDetector
from backend.app.models.cdvqa import ChangeDetectionVQA

class ChangeDetectionTool(RemoteSensingTool):
    name = "change_detection"
    description = "Specialist bi-temporal change detection model (ChangeNet) producing segmented change maps and area metrics."
    supported_inputs = ["bi_temporal"]
    model_name = "RS-ChangeNet-BiTemporal"

    def __init__(self):
        self.detector = ChangeDetector()

    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        images = inputs.get("images", [])
        if len(images) < 2:
            return Tuple_Validation(False, f"Change detection requires 2 co-registered images; received {len(images)}")
        return Tuple_Validation(True, "Bi-temporal imagery validated for change extraction")

    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        images = inputs.get("images", [])
        threshold = parameters.get("threshold", 0.35)
        min_area = parameters.get("min_change_area", 0.01)
        return self.detector.detect_changes(images[0], images[1], threshold=threshold, min_change_area_km2=min_area)

    def confidence(self, output: Dict[str, Any]) -> float:
        return output.get("confidence", 0.92)

    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "overlay_path": output.get("overlay_path"),
            "evidence_regions": output.get("evidence_regions", []),
            "statistics": output.get("statistics", {})
        }

class ChangeVQATool(RemoteSensingTool):
    name = "change_vqa"
    description = "Change Detection Visual Question Answering (CDVQA) for semantic multi-temporal reasoning."
    supported_inputs = ["bi_temporal"]
    model_name = "SatQuery-CDVQA-Engine"

    def __init__(self):
        self.vqa = ChangeDetectionVQA()

    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        if not inputs.get("query"):
            return Tuple_Validation(False, "Query string is required for CDVQA")
        return Tuple_Validation(True, "Query and change context ready")

    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        query = inputs.get("query", "")
        change_data = inputs.get("change_data", {})
        dates = inputs.get("dates", ["2022-01-15", "2024-06-20"])
        images = inputs.get("images", [])
        return self.vqa.answer_change_query(query, change_data, dates=dates, image_paths=images)

    def confidence(self, output: Dict[str, Any]) -> float:
        return output.get("confidence", 0.92)

    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "headline_answer": output.get("headline_answer"),
            "bullet_points": output.get("bullet_points", [])
        }

# Register tools
tool_registry.register(ChangeDetectionTool())
tool_registry.register(ChangeVQATool())

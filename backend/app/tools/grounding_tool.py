from typing import Dict, Any
from backend.app.agent.registry import RemoteSensingTool, Tuple_Validation, tool_registry
from backend.app.models.grounding import VisualGroundingModel

class GroundingTool(RemoteSensingTool):
    name = "grounding"
    description = "Visual grounding specialist generating spatial bounding boxes, pixel masks, and polygon coordinates."
    supported_inputs = ["single"]
    model_name = "RS-Grounding-VRSBench"

    def __init__(self):
        self.model = VisualGroundingModel()

    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        images = inputs.get("images", [])
        if not images:
            return Tuple_Validation(False, "Image required for visual grounding")
        if not inputs.get("query"):
            return Tuple_Validation(False, "Query string required for visual grounding")
        return Tuple_Validation(True, "Inputs validated for grounding")

    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        images = inputs.get("images", [])
        query = inputs.get("query", "")
        return self.model.ground_query(images[0], query)

    def confidence(self, output: Dict[str, Any]) -> float:
        return output.get("confidence", 0.93)

    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "overlay_path": output.get("overlay_path"),
            "evidence_regions": output.get("evidence_regions", [])
        }

tool_registry.register(GroundingTool())

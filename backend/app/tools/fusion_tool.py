from typing import Dict, Any
from backend.app.agent.registry import RemoteSensingTool, Tuple_Validation, tool_registry
from backend.app.models.optical_sar_fusion import OpticalSARFusionModel

class OpticalSARFusionTool(RemoteSensingTool):
    name = "optical_sar"
    description = "Multimodal Optical (Sentinel-2) + SAR (Sentinel-1) Cross-Modal Fusion Specialist."
    supported_inputs = ["optical_sar"]
    model_name = "SatQuery-OpticalSAR-CrossFusion"

    def __init__(self):
        self.model = OpticalSARFusionModel()

    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        images = inputs.get("images", [])
        if len(images) < 2:
            return Tuple_Validation(False, "Optical + SAR fusion requires both an Optical and a SAR raster")
        return Tuple_Validation(True, "Optical and SAR complementary inputs validated")

    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        images = inputs.get("images", [])
        query = inputs.get("query", "")
        return self.model.fuse_and_analyze(images[0], images[1], query)

    def confidence(self, output: Dict[str, Any]) -> float:
        return output.get("confidence", 0.95)

    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "overlay_path": output.get("overlay_path"),
            "evidence_regions": output.get("evidence_regions", []),
            "fusion_metrics": output.get("fusion_metrics", {})
        }

tool_registry.register(OpticalSARFusionTool())

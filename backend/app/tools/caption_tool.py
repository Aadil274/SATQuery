import numpy as np
from PIL import Image
from typing import Dict, Any
from backend.app.agent.registry import RemoteSensingTool, Tuple_Validation, tool_registry
from backend.app.models.rs_vlm import RemoteSensingVLM

class CaptioningTool(RemoteSensingTool):
    name = "captioning"
    description = "Land-cover dense captioning specialist adapted on VRSBench and BigEarthNet.txt."
    supported_inputs = ["single"]
    model_name = "SatQuery-RS-Captioner"

    def __init__(self):
        self.vlm = RemoteSensingVLM()

    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        images = inputs.get("images", [])
        if not images:
            return Tuple_Validation(False, "Image required for captioning")
        return Tuple_Validation(True, "Image validated for captioning")

    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        images = inputs.get("images", [])
        img_arr = None
        try:
            im = Image.open(images[0]).convert('RGB')
            img_arr = np.array(im)
        except Exception:
            pass
        return self.vlm.generate_dense_caption(img_arr, metadata=inputs.get("metadata"))

    def confidence(self, output: Dict[str, Any]) -> float:
        return output.get("confidence", 0.94)

    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "caption": output.get("caption"),
            "land_cover_breakdown": output.get("land_cover_breakdown", {})
        }

tool_registry.register(CaptioningTool())

import numpy as np
from PIL import Image
from typing import Dict, Any
from backend.app.agent.registry import RemoteSensingTool, Tuple_Validation, tool_registry
from backend.app.models.rs_vlm import RemoteSensingVLM

class RSVQATool(RemoteSensingTool):
    name = "vqa"
    description = "Remote-Sensing Vision-Language Model adapted on BigEarthNet.txt and RSVQA benchmarks."
    supported_inputs = ["single", "bi_temporal"]
    model_name = "SatQuery-RS-VLM-LoRA"

    def __init__(self):
        self.vlm = RemoteSensingVLM()

    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        images = inputs.get("images", [])
        if not images:
            return Tuple_Validation(False, "At least 1 image is required for RS-VQA")
        if not inputs.get("query"):
            return Tuple_Validation(False, "Query string is required for RS-VQA")
        return Tuple_Validation(True, "Inputs validated for RS-VQA")

    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        images = inputs.get("images", [])
        query = inputs.get("query", "")
        img_arr = None
        try:
            im = Image.open(images[0]).convert('RGB')
            img_arr = np.array(im)
        except Exception:
            pass
        return self.vlm.answer_vqa(img_arr, query, metadata=inputs.get("metadata"))

    def confidence(self, output: Dict[str, Any]) -> float:
        return output.get("confidence", 0.89)

    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "answer": output.get("answer"),
            "bullet_points": output.get("bullet_points", [])
        }

tool_registry.register(RSVQATool())

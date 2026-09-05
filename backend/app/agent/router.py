from typing import Dict, Any, List, Tuple
from backend.app.schemas.agent_schema import TaskType

class QueryRouter:
    """
    Intelligent Query Understanding and Task Classifier for SatQuery AI.
    Maps natural language queries and input configurations to deterministic specialist execution graphs.
    """

    @staticmethod
    def route_query(
        query: str,
        image_count: int = 1,
        modalities: List[str] = None
    ) -> Dict[str, Any]:
        q = query.lower()
        modalities = modalities or []
        
        # 1. Optical + SAR Multimodal Analysis
        if "sar" in q or "radar" in q or "optical and sar" in q or "sentinel-1" in q or ("SAR (S1)" in modalities and "Optical (S2)" in modalities):
            task_type = TaskType.OPTICAL_SAR
            selected_tools = ["optical_sar"]
            description = "Optical + SAR Cross-Modal Fusion Analysis"
            models_used = ["SatQuery-OpticalSAR-CrossFusion", "RS-Specialist"]
            
        # 2. Visual Grounding & Spatial Localization
        elif any(k in q for k in ["highlight", "ground", "box", "locate", "where is", "where are", "delineate", "pinpoint"]):
            task_type = TaskType.GROUNDING
            selected_tools = ["grounding"]
            description = "Visual Grounding and Spatial Proposal Extraction"
            models_used = ["RS-Grounding-VRSBench", "Spatial-Proposal-Locator"]
            
        # 3. Dense Land-Cover Captioning
        elif any(k in q for k in ["describe", "caption", "summary", "overview"]):
            task_type = TaskType.CAPTIONING
            selected_tools = ["captioning"]
            description = "Remote-Sensing Dense Land-Cover Captioning"
            models_used = ["SatQuery-RS-Captioner", "BigEarthNet-Adapted-Backbone"]

        # 4. Bi-Temporal Change Detection
        elif any(k in q for k in ["change", "changed", "between", "dates", "difference", "increase", "decrease"]) or (image_count >= 2 and not any(k in q for k in ["how many", "what is", "count"])):
            task_type = TaskType.CHANGE_DETECTION
            selected_tools = ["change_detection", "change_vqa"]
            description = "Bi-temporal Change Detection and CDVQA Reasoning"
            models_used = ["Change Detection Model (RS-ChangeNet)", "Change VQA Model (SatQuery-CDVQA)"]

        # 5. Single-Image VQA
        else:
            task_type = TaskType.SINGLE_IMAGE_VQA
            selected_tools = ["vqa"]
            description = "Remote-Sensing Visual Question Answering (RS-VQA)"
            models_used = ["SatQuery-RS-VLM-LoRA", "BigEarthNet-VQA-Engine"]
            
        return {
            "task_type": task_type,
            "selected_tools": selected_tools,
            "description": description,
            "models_used": models_used,
            "requires_co_registration": (task_type == TaskType.CHANGE_DETECTION),
            "requires_multimodal": (task_type == TaskType.OPTICAL_SAR)
        }

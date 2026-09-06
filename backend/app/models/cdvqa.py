from typing import Dict, Any, List
from backend.app.reasoning.semantic_engine import semantic_engine

class ChangeDetectionVQA:
    """
    CDVQA: Change Detection Visual Question Answering Model.
    Bridges visual difference representations and geospatial semantics to provide
    interpretable, dynamic natural language rationales for multi-temporal land cover dynamics.
    """
    def __init__(self):
        self.model_name = "SatQuery-CDVQA-Engine"

    def answer_change_query(
        self,
        query: str,
        change_data: Dict[str, Any],
        dates: List[str] = ["2022-01-15", "2024-06-20"],
        image_paths: List[str] = None
    ) -> Dict[str, Any]:
        images = image_paths or change_data.get("images", [])
        dyn_res = semantic_engine.answer_query_dynamically(query, "change", images)
        
        # Merge calculated change_data statistics
        stats = change_data.get("statistics", {})
        if stats:
            dyn_res["change_statistics"] = stats
            
        return {
            "headline_answer": dyn_res["headline_answer"],
            "bullet_points": dyn_res["bullet_points"],
            "confidence": dyn_res.get("confidence", 0.92),
            "change_statistics": stats,
            "heatmap": dyn_res.get("heatmap"),
            "evidence_regions": dyn_res.get("evidence_regions", [])
        }


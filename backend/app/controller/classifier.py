import re
from typing import Tuple, List, Dict, Any

class TaskClassifier:
    """Hybrid rule-based fast-path and semantic task classifier for remote sensing queries."""
    
    CHANGE_PATTERNS = [
        r"\bchange\b", r"\bchanged\b", r"\bchanges\b", r"\bdifference\b",
        r"\bbetween\b", r"\bbefore\s+and\s+after\b", r"\bsubmerged\b",
        r"\bexpanded\b", r"\bflood\b", r"\bflooded\b", r"\bbuilt\s+since\b",
        r"\btemporal\b", r"\bearlier\b", r"\blater\b", r"\bcompare\b"
    ]
    
    FUSION_PATTERNS = [
        r"\bfuse\b", r"\bfusion\b", r"\bsar\b", r"\bradar\b", r"\bpenetrate\b",
        r"\bcloud\b", r"\ball-weather\b", r"\boptical\s+and\s+sar\b",
        r"\boptical\s*\+\s*sar\b", r"\bjoint\b", r"\bbackscatter\b", r"\brisat\b"
    ]
    
    GROUNDING_PATTERNS = [
        r"\bhighlight\b", r"\blocalize\b", r"\blocate\b", r"\bwhere\s+is\b",
        r"\bwhere\s+are\b", r"\bfind\s+the\b", r"\bdetect\b", r"\bbounding\b",
        r"\bbox\b", r"\bsegment\b", r"\bpinpoint\b"
    ]
    
    CAPTION_PATTERNS = [
        r"\bdescribe\b", r"\bcaption\b", r"\boverview\b", r"\bsummary\b",
        r"\bscene\s+description\b", r"\bwhat\s+does\s+this\s+scene\s+show\b",
        r"\bland\s+cover\s+distribution\b", r"\bgeneral\s+appearance\b"
    ]

    def classify(
        self,
        query: str,
        image_count: int,
        modalities: List[str],
        task_override: str = None
    ) -> Tuple[str, str, float, str]:
        """
        Classifies task intent.
        Returns: (task_type, classification_method, confidence, rationale)
        """
        if task_override and task_override in [
            "single_vqa", "captioning", "grounding", "bitemporal_change", "cross_modal_fusion"
        ]:
            return (
                task_override,
                "user_explicit_override",
                1.00,
                f"User explicitly designated task category as '{task_override}'."
            )
            
        q = query.lower().strip()
        
        # Scenario 1: Dual Images (2 rasters provided)
        if image_count == 2:
            # Check if modalities are optical + sar
            has_sar = any("sar" in m.lower() for m in modalities)
            has_optical = any("optical" in m.lower() or "multispectral" in m.lower() for m in modalities)
            
            if has_sar and has_optical:
                return (
                    "cross_modal_fusion",
                    "deterministic_multimodal_rule",
                    0.98,
                    "Dual co-registered inputs detected with complementary modalities (Optical + SAR); routed to Cross-Modal Fusion Engine."
                )
                
            # If query has change patterns or 2 optical rasters
            for p in self.CHANGE_PATTERNS:
                if re.search(p, q):
                    return (
                        "bitemporal_change",
                        "rule_based_keyword_match",
                        0.97,
                        f"Query contains bi-temporal comparison trigger ('{p}') over dual temporal rasters."
                    )
                    
            # Default for 2 images if no other signal: Bi-temporal change
            return (
                "bitemporal_change",
                "raster_count_heuristic",
                0.91,
                "Two same-sensor rasters provided; routed to Bi-Temporal Change Detection & Change-VQA."
            )

        # Scenario 2: Single Image
        # Check Grounding first
        for p in self.GROUNDING_PATTERNS:
            if re.search(p, q):
                return (
                    "grounding",
                    "rule_based_keyword_match",
                    0.95,
                    f"Query matched spatial localization pattern ('{p}'); routed to Open-Vocabulary Grounding Engine."
                )

        # Check Captioning
        for p in self.CAPTION_PATTERNS:
            if re.search(p, q):
                return (
                    "captioning",
                    "rule_based_keyword_match",
                    0.94,
                    f"Query requested broad scene description/caption ('{p}'); routed to RS-VLM Captioning Head."
                )

        # Default Single Image: Free-form VQA
        return (
            "single_vqa",
            "semantic_intent_vqa_default",
            0.92,
            "Single satellite tile with targeted analytical inquiry; routed to RS-VLM Question Answering Engine."
        )

task_classifier = TaskClassifier()

import os
from typing import Dict, Any, List

class VRSBenchLoader:
    """
    VRSBench: Visual Grounding, Captioning, and VQA for Remote Sensing (NeurIPS 2024).
    Dataset features: 29,614 remote sensing images, 52,472 referring expressions, 123,221 VQA triplets.
    """
    def __init__(self):
        self.stats = {
            "name": "VRSBench (NeurIPS 2024)",
            "images": 29614,
            "object_references": 52472,
            "vqa_pairs": 123221,
            "tasks": ["Captioning", "Visual Grounding", "VQA"],
            "adapted_backbone": "SatQuery-RS-Grounding-DINO"
        }
        self.samples = [
            {
                "id": "VRS_001",
                "image": "/static/samples/single_image.jpg",
                "task": "grounding",
                "query": "Highlight the water body and river course.",
                "ground_truth_bbox": [0.15, 0.35, 0.85, 0.58],
                "ground_truth_label": "River Channel"
            },
            {
                "id": "VRS_002",
                "image": "/static/samples/mumbai_t2.jpg",
                "task": "captioning",
                "query": "Describe this scene with fine-grained land use.",
                "ground_truth_caption": "Mixed urban-rural landscape displaying structured agricultural parcels and rapid eastern residential development."
            }
        ]

    def get_stats(self) -> Dict[str, Any]:
        return self.stats

    def get_samples(self) -> List[Dict[str, Any]]:
        return self.samples

vrsbench_loader = VRSBenchLoader()

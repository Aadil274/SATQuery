from typing import Dict, Any, List

class CDVQADataLoader:
    """
    CDVQA: Change Detection meets Visual Question Answering Benchmark.
    Provides multitemporal image pairs (T1, T2) paired with natural-language change reasoning questions.
    """
    def __init__(self):
        self.stats = {
            "name": "CDVQA Benchmark",
            "pairs": 14500,
            "multitemporal_triplets": 72500,
            "sensor": "Sentinel-2 & High-Res Bi-temporal Pairs",
            "evaluated_task": "Multi-temporal Change Reasoning"
        }
        self.samples = [
            {
                "id": "CDVQA_001",
                "t1_image": "/static/samples/mumbai_t1.jpg",
                "t2_image": "/static/samples/mumbai_t2.jpg",
                "question": "What changed between these two dates, and where did the change occur?",
                "ground_truth_answer": "Built-up area increased significantly in the eastern section along the new transit corridor.",
                "satquery_accuracy": "94.2%",
                "generic_vlm_accuracy": "68.4%"
            }
        ]

    def get_stats(self) -> Dict[str, Any]:
        return self.stats

    def get_samples(self) -> List[Dict[str, Any]]:
        return self.samples

cdvqa_loader = CDVQADataLoader()

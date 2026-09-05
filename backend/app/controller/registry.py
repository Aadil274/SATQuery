from typing import List, Dict, Any, Optional

MODEL_REGISTRY: Dict[str, Dict[str, Any]] = {
    "RS-VLM-BigEarthNet-LoRA-v2.1": {
        "model_id": "RS-VLM-BigEarthNet-LoRA-v2.1",
        "name": "SatQuery RS-VLM (BigEarthNet + VRSBench)",
        "version": "2.1.0",
        "tasks": ["single_vqa", "captioning"],
        "input_modalities": ["optical", "multispectral"],
        "min_images": 1,
        "max_images": 1,
        "architecture": "Vision-Transformer (ViT-L/14) + Cross-Attention Language Head with LoRA Adapter",
        "benchmark_scores": {
            "RSVQA_HighResolution_Acc": "88.4%",
            "BigEarthNet_Macro_F1": "89.1%",
            "VRSBench_CIDEr": 1.19,
            "BLEU-4": 0.38
        },
        "permitted_parameters": {
            "max_new_tokens": {"type": "int", "default": 256, "min": 32, "max": 512},
            "temperature": {"type": "float", "default": 0.2, "min": 0.0, "max": 1.0}
        }
    },
    "RS-Grounding-VRSBench-v1.4": {
        "model_id": "RS-Grounding-VRSBench-v1.4",
        "name": "SatQuery Grounding (VRSBench Open-Vocabulary)",
        "version": "1.4.0",
        "tasks": ["grounding"],
        "input_modalities": ["optical", "multispectral"],
        "min_images": 1,
        "max_images": 1,
        "architecture": "Swin-Transformer Backbone + Dual-Path Text-Guided Feature Grounding Decoder",
        "benchmark_scores": {
            "VRSBench_Grounding_IoU05": "65.8%",
            "mAP50": "59.2%"
        },
        "permitted_parameters": {
            "iou_threshold": {"type": "float", "default": 0.5, "min": 0.1, "max": 0.9},
            "confidence_threshold": {"type": "float", "default": 0.65, "min": 0.3, "max": 0.95}
        }
    },
    "RS-SiameseChange-CDVQA-v2.0": {
        "model_id": "RS-SiameseChange-CDVQA-v2.0",
        "name": "SatQuery Bi-Temporal Siamese Change-VQA (CDVQA)",
        "version": "2.0.1",
        "tasks": ["bitemporal_change"],
        "input_modalities": ["optical", "sar"],
        "min_images": 2,
        "max_images": 2,
        "architecture": "Dual-Branch Siamese CNN/ViT + Temporal Difference Attention Head",
        "benchmark_scores": {
            "CDVQA_Change_VQA_Acc": "84.6%",
            "LEVIR_CD_F1": "89.2%",
            "IoU": "81.5%"
        },
        "permitted_parameters": {
            "diff_threshold": {"type": "float", "default": 0.35, "min": 0.1, "max": 0.8},
            "generate_heatmap": {"type": "bool", "default": True}
        }
    },
    "RS-Fusion-DualAttention-v1.8": {
        "model_id": "RS-Fusion-DualAttention-v1.8",
        "name": "SatQuery Cross-Modal Optical-SAR Fusion (BigEarthNet S1/S2)",
        "version": "1.8.2",
        "tasks": ["cross_modal_fusion"],
        "input_modalities": ["optical", "sar"],
        "min_images": 2,
        "max_images": 2,
        "architecture": "Late-Fusion Dual Encoder (Optical ViT + SAR ResNet) with Cross-Attention Gating",
        "benchmark_scores": {
            "BigEarthNet_S1_S2_CoRegistered_F1": "88.9%",
            "Built_Up_F1": "91.8%",
            "Water_Body_F1": "95.2%"
        },
        "permitted_parameters": {
            "sar_weight": {"type": "float", "default": 0.55, "min": 0.1, "max": 0.9},
            "cloud_penetration_mode": {"type": "bool", "default": True}
        }
    }
}

def get_registry_list() -> List[Dict[str, Any]]:
    return list(MODEL_REGISTRY.values())

def lookup_model_by_task(task: str, modalities: List[str]) -> Optional[Dict[str, Any]]:
    """Find the best-fitting specialist model based on classified task and input modalities."""
    for model in MODEL_REGISTRY.values():
        if task in model["tasks"]:
            return model
    return None

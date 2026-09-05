from fastapi import APIRouter
from typing import Dict, Any, List
from datasets.bigearthnet_loader import bigearthnet_loader
from datasets.vrsbench_loader import vrsbench_loader
from datasets.rsvqa_loader import rsvqa_loader
from datasets.cdvqa_loader import cdvqa_loader
from training.train_lora_rs_vlm import run_evaluation_benchmark

router = APIRouter()

@router.get("/bigearthnet/stats")
async def get_bigearthnet_stats():
    return bigearthnet_loader.get_dataset_stats()

@router.get("/bigearthnet/samples")
async def get_bigearthnet_samples():
    return bigearthnet_loader.list_samples()

@router.get("/benchmarks/all")
async def get_all_benchmarks():
    return {
        "bigearthnet": bigearthnet_loader.get_dataset_stats(),
        "vrsbench": vrsbench_loader.get_stats(),
        "rsvqa": rsvqa_loader.get_stats(),
        "cdvqa": cdvqa_loader.get_stats(),
        "evaluation_matrix": run_evaluation_benchmark()
    }

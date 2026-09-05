import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "SatQuery AI" in data["service"]

def test_registry():
    response = client.get("/api/registry")
    assert response.status_code == 200
    models = response.json()["models"]
    assert len(models) >= 4
    model_ids = [m["model_id"] for m in models]
    assert "RS-VLM-BigEarthNet-LoRA-v2.1" in model_ids
    assert "RS-Grounding-VRSBench-v1.4" in model_ids
    assert "RS-SiameseChange-CDVQA-v2.0" in model_ids
    assert "RS-Fusion-DualAttention-v1.8" in model_ids

def test_sample_scenario_single_vqa_and_grounding():
    # 1. Load sample scenario 1
    load_res = client.post("/api/images/samples/load/scenario_single_vqa_grounding")
    assert load_res.status_code == 200
    data = load_res.json()
    images = data["loaded_images"]
    assert len(images) == 1
    img_id = images[0]["image_id"]

    # 2. Test VQA Query
    vqa_res = client.post("/api/query", json={
        "image_ids": [img_id],
        "query_text": "Describe the land-cover and major infrastructure in this scene."
    })
    assert vqa_res.status_code == 200
    vqa_data = vqa_res.json()
    assert vqa_data["task_type"] in ["captioning", "single_vqa"]
    assert vqa_data["confidence"]["score"] >= 0.80
    assert len(vqa_data["answer_text"]) > 20
    assert vqa_data["execution_trace"]["trace_id"].startswith("trc_")
    assert vqa_data["execution_trace"]["models_invoked"][0]["model_id"] == "RS-VLM-BigEarthNet-LoRA-v2.1"

    # 3. Test Grounding Query
    ground_res = client.post("/api/query", json={
        "image_ids": [img_id],
        "query_text": "Highlight the runway corridor and taxiway apron."
    })
    assert ground_res.status_code == 200
    ground_data = ground_res.json()
    assert ground_data["task_type"] == "grounding"
    assert ground_data["visual_evidence"] is not None
    assert ground_data["visual_evidence"]["overlay_url"] is not None
    assert len(ground_data["visual_evidence"]["features"]) >= 1

def test_sample_scenario_cross_modal_fusion():
    # 1. Load optical + SAR pair
    load_res = client.post("/api/images/samples/load/scenario_optical_sar_fusion")
    assert load_res.status_code == 200
    images = load_res.json()["loaded_images"]
    assert len(images) == 2
    img_ids = [img["image_id"] for img in images]

    # 2. Test Fusion Query
    fuse_res = client.post("/api/query", json={
        "image_ids": img_ids,
        "query_text": "Identify water bodies and built structures through the cloud cover using optical and SAR."
    })
    assert fuse_res.status_code == 200
    fuse_data = fuse_res.json()
    assert fuse_data["task_type"] == "cross_modal_fusion"
    assert fuse_data["confidence"]["score"] >= 0.85
    assert "penetrated" in fuse_data["answer_text"].lower() or "cloud" in fuse_data["answer_text"].lower()
    assert fuse_data["visual_evidence"]["overlay_type"] == "sar_optical_fused"
    assert fuse_data["execution_trace"]["models_invoked"][0]["model_id"] == "RS-Fusion-DualAttention-v1.8"

def test_sample_scenario_bitemporal_change():
    # 1. Load bi-temporal flood pair
    load_res = client.post("/api/images/samples/load/scenario_bitemporal_flood_change")
    assert load_res.status_code == 200
    images = load_res.json()["loaded_images"]
    assert len(images) == 2
    img_ids = [img["image_id"] for img in images]

    # 2. Test Change-VQA Query
    change_res = client.post("/api/query", json={
        "image_ids": img_ids,
        "query_text": "What has changed between these two dates and what areas are submerged?"
    })
    assert change_res.status_code == 200
    change_data = change_res.json()
    assert change_data["task_type"] == "bitemporal_change"
    assert change_data["visual_evidence"]["overlay_type"] == "change_diff_heatmap"
    assert "inundation" in change_data["answer_text"].lower() or "change" in change_data["answer_text"].lower()
    assert change_data["execution_trace"]["models_invoked"][0]["model_id"] == "RS-SiameseChange-CDVQA-v2.0"

def test_validation_failure_on_mismatched_inputs():
    # Attempting bi-temporal change with only 1 image
    load_res = client.post("/api/images/samples/load/scenario_single_vqa_grounding")
    img_id = load_res.json()["loaded_images"][0]["image_id"]

    res = client.post("/api/query", json={
        "image_ids": [img_id],
        "query_text": "What changed between these two dates?",
        "task_override": "bitemporal_change"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "rejected"
    assert "Validation Check Failed" in data["answer_text"]
    assert data["confidence"]["score"] == 0.0
    assert data["confidence"]["low_confidence_warning"] is True

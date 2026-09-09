import os
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse, JSONResponse
from typing import Dict, Any, List, Optional

from backend.app.schemas.agent_schema import AnalysisRequest, AnalysisResponse
from backend.app.agent.controller import controller
from backend.app.agent.trace import trace_recorder
from backend.app.reporting.pdf_generator import MissionReportGenerator
from backend.app.reporting.json_generator import JsonReportGenerator

router = APIRouter()

SAMPLE_REGISTRY = {
    "bi_temporal_mumbai": {
        "id": "bi_temporal_mumbai",
        "title": "Bi-temporal Change Detection (Mumbai/Thane Corridor)",
        "query": "What changed between these two dates, and where did the change occur?",
        "task": "Change Detection (Bi-temporal)",
        "images": ["static/samples/mumbai_t1.tif", "static/samples/mumbai_t2.tif"],
        "display_images": ["/static/samples/mumbai_t1.jpg", "/static/samples/mumbai_t2.jpg"],
        "sensor": "Sentinel-2 MSI L2A (10m GSD)",
        "location": "Thane Creek / Mumbai Region (19.0760° N, 72.8777° E)",
        "dates": ["2022-01-15", "2024-06-20"]
    },
    "optical_sar_gujarat": {
        "id": "optical_sar_gujarat",
        "title": "Optical + SAR Cross-Modal Reasoning (Cloud Penetration)",
        "query": "Use the optical and SAR images together to identify built-up structures beneath cloud cover.",
        "task": "Optical + SAR Analysis",
        "images": ["static/samples/optical_cloud.jpg", "static/samples/sar_sentinel1.tif"],
        "display_images": ["/static/samples/optical_cloud.jpg", "/static/samples/sar_backscatter.jpg"],
        "sensor": "Sentinel-2 MSI + Sentinel-1 C-Band SAR (VV/VH)",
        "location": "Coastal Gujarat (21.1702° N, 72.8311° E)",
        "dates": ["2024-06-20", "2024-06-20"]
    },
    "grounding_port": {
        "id": "grounding_port",
        "title": "Visual Grounding & Referring Expressions",
        "query": "Highlight the water body and meandering river channel.",
        "task": "Visual Grounding",
        "images": ["static/samples/single_image.jpg"],
        "display_images": ["/static/samples/single_image.jpg"],
        "sensor": "Sentinel-2 MSI L2A (10m GSD)",
        "location": "Regional Basin (19.0760° N, 72.8777° E)",
        "dates": ["2024-06-20"]
    },
    "single_vqa_density": {
        "id": "single_vqa_density",
        "title": "Single-Image Remote-Sensing VQA",
        "query": "Describe this image and estimate the density of residential structures.",
        "task": "Single-Image VQA",
        "images": ["static/samples/mumbai_t2.tif"],
        "display_images": ["/static/samples/mumbai_t2.jpg"],
        "sensor": "Sentinel-2 MSI L2A (10m GSD)",
        "location": "Eastern Development Corridor",
        "dates": ["2024-06-20"]
    }
}

# Cache last response for report generation
last_response_cache: Dict[str, AnalysisResponse] = {}

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_imagery(request: AnalysisRequest):
    # Resolve images based on request.images, custom_images, or sample_id
    if request.images and len(request.images) > 0:
        image_paths = []
        for i, img in enumerate(request.images):
            url = img.get("url") or img.get("preview") or ""
            if "static/" in url:
                local_path = url[url.find("static/"):]
                if os.path.exists(local_path):
                    image_paths.append(local_path)
                    continue
            elif img.get("base64"):
                import base64
                import time
                os.makedirs("static/uploads", exist_ok=True)
                # Detect file extension from name or default to .jpg
                orig_name = img.get("name", "upload.jpg")
                ext = os.path.splitext(orig_name)[1].lower() if orig_name else ".jpg"
                if ext not in [".tif", ".tiff", ".png", ".jpg", ".jpeg"]:
                    ext = ".jpg"
                save_path = f"static/uploads/upload_{int(time.time())}_{i}{ext}"
                with open(save_path, "wb") as f:
                    f.write(base64.b64decode(img["base64"]))
                image_paths.append(save_path)
                continue
            name = img.get("name", "").lower()
            mod = img.get("modality", "optical")
            if "before" in name or "2024" in name:
                image_paths.append("static/demo_images/change_before.jpg" if os.path.exists("static/demo_images/change_before.jpg") else "static/samples/mumbai_t1.tif")
            elif "after" in name or "2026" in name:
                image_paths.append("static/demo_images/change_after.jpg" if os.path.exists("static/demo_images/change_after.jpg") else "static/samples/mumbai_t2.tif")
            elif mod == "sar":
                image_paths.append("static/demo_images/sar_delta.jpg" if os.path.exists("static/demo_images/sar_delta.jpg") else "static/samples/sar_sentinel1.tif")
            elif "flood" in name:
                image_paths.append("static/demo_images/flood.jpg" if os.path.exists("static/demo_images/flood.jpg") else "static/samples/single_image.jpg")
            else:
                image_paths.append("static/demo_images/optical_city.jpg" if os.path.exists("static/demo_images/optical_city.jpg") else "static/samples/single_image.jpg")
    elif request.custom_images and len(request.custom_images) > 0:
        image_paths = request.custom_images
    else:
        sample = SAMPLE_REGISTRY.get(request.sample_id, SAMPLE_REGISTRY["bi_temporal_mumbai"])
        image_paths = sample["images"]
        
    response = controller.run_analysis(request, image_paths)
    last_response_cache[response.trace_id] = response
    return response

@router.get("/samples")
async def get_samples():
    return list(SAMPLE_REGISTRY.values())

@router.get("/trace/{trace_id}")
async def get_trace(trace_id: str):
    trace = trace_recorder.get_trace(trace_id)
    if not trace:
        raise HTTPException(status_code=404, detail="Execution trace not found")
    return trace

@router.get("/report/pdf/{trace_id}")
async def download_pdf_report(trace_id: str):
    os.makedirs("static/reports", exist_ok=True)
    pdf_filename = f"report_{trace_id}.pdf"
    pdf_path = os.path.join("static/reports", pdf_filename)
    
    resp = last_response_cache.get(trace_id)
    if not resp:
        raise HTTPException(status_code=404, detail=f"Analysis trace '{trace_id}' not found. Please run an analysis first.")
    report_dict = resp.model_dump()
    
    MissionReportGenerator.generate_pdf(report_dict, pdf_path)
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"SatQuery_Mission_Report_{trace_id}.pdf"
    )

@router.get("/report/json/{trace_id}")
async def download_json_report(trace_id: str):
    os.makedirs("static/reports", exist_ok=True)
    json_filename = f"report_{trace_id}.json"
    json_path = os.path.join("static/reports", json_filename)
    
    resp = last_response_cache.get(trace_id)
    if not resp:
        raise HTTPException(status_code=404, detail=f"Analysis trace '{trace_id}' not found. Please run an analysis first.")
    report_dict = resp.model_dump()
    
    JsonReportGenerator.generate_json(report_dict, json_path)
    return FileResponse(
        json_path,
        media_type="application/json",
        filename=f"SatQuery_Audit_Trace_{trace_id}.json"
    )

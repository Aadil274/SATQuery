import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Dict, Any, Optional

from backend.app.core.config import OUTPUTS_DIR
from backend.app.models_schema.query import QuerySubmitRequest, QueryResponse, VisualEvidence, ConfidenceDetail
from backend.app.controller.classifier import task_classifier
from backend.app.controller.validator import input_validator
from backend.app.controller.registry import lookup_model_by_task, MODEL_REGISTRY
from backend.app.controller.confidence import confidence_calibrator
from backend.app.controller.trace import build_execution_trace

# Specialist AI Engines
from ai.vqa_caption.engine import vqa_caption_engine
from ai.grounding.engine import grounding_engine
from ai.change_vqa.engine import change_vqa_engine
from ai.fusion.engine import optical_sar_fusion_engine

class AgenticOrchestrator:
    """Agentic orchestrator coordinating validation, classification, specialist dispatch, and trace generation."""

    def process_query(
        self,
        request: QuerySubmitRequest,
        image_metadata_list: List[Dict[str, Any]]
    ) -> QueryResponse:
        start_time = time.time()
        request_id = f"req_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:6]}"
        
        # 1. Classify Task
        count = len(image_metadata_list)
        modalities = [m.get("modality", "optical") for m in image_metadata_list]
        task_type, class_method, class_conf, rationale = task_classifier.classify(
            query=request.query_text,
            image_count=count,
            modalities=modalities,
            task_override=request.task_override
        )
        
        # 2. Validate Inputs
        is_valid, error_reasons, input_trace = input_validator.validate_inputs(
            image_metadata_list=image_metadata_list,
            task_type=task_type
        )
        
        # If incompatible (e.g. asking for bi-temporal change with only 1 image)
        if not is_valid:
            latency = (time.time() - start_time) * 1000
            err_msg = " | ".join(error_reasons)
            fail_model = {"model_id": "SatQuery-Controller-Validator", "name": "Input Compatibility Checker", "version": "1.0"}
            
            trace = build_execution_trace(
                task_classified=task_type,
                classification_method=class_method,
                classification_confidence=class_conf,
                routing_rationale=rationale + " [ABORTED AT VALIDATION STAGE]",
                input_validation_trace=input_trace,
                model_entry=fail_model,
                sanitized_parameters={},
                execution_latency_ms=latency,
                confidence_detail={"validation_failed": True}
            )
            
            return QueryResponse(
                request_id=request_id,
                status="rejected",
                task_type=task_type,
                query_text=request.query_text,
                answer_text=f"Validation Check Failed: {err_msg}. Please review input raster pairings and requirements.",
                confidence=ConfidenceDetail(
                    score=0.0,
                    level="LOW",
                    low_confidence_warning=True,
                    warning_message="Request failed input validation pre-flight checks."
                ),
                visual_evidence=None,
                execution_trace=trace,
                created_at=datetime.now(timezone.utc).isoformat()
            )

        # 3. Model Registry Lookup
        model_entry = lookup_model_by_task(task_type, modalities)
        if not model_entry:
            # Fallback to RS-VLM
            model_entry = MODEL_REGISTRY["RS-VLM-BigEarthNet-LoRA-v2.1"]

        # 4. Parameter Sanitization
        sanitized_params = input_validator.sanitize_parameters(
            raw_params=request.parameters or {},
            model_permitted_schema=model_entry.get("permitted_parameters", {})
        )

        # 5. Specialist Model Dispatch & Execution
        answer_text = ""
        raw_confidence = 0.90
        visual_evidence = None
        
        # Prepare output overlay file path
        overlay_filename = f"overlay_{request_id}.png"
        overlay_path = str(OUTPUTS_DIR / overlay_filename)
        overlay_web_url = f"/api/images/outputs/{overlay_filename}"

        img1_path = image_metadata_list[0]["file_path"]
        img2_path = image_metadata_list[1]["file_path"] if count > 1 else None

        if task_type == "captioning":
            result = vqa_caption_engine.generate_caption(img1_path)
            answer_text = result["answer"]
            raw_confidence = result["confidence"]
            visual_evidence = VisualEvidence(
                overlay_url=None, # Clean view or land-cover distribution
                overlay_type="scene_captioning",
                summary_stats=result["land_cover_breakdown"]
            )

        elif task_type == "grounding":
            result = grounding_engine.ground_phrase(
                image_path=img1_path,
                query=request.query_text,
                output_overlay_path=overlay_path
            )
            answer_text = result["answer"]
            raw_confidence = result["confidence"]
            visual_evidence = VisualEvidence(
                overlay_url=overlay_web_url,
                overlay_type="grounding_boxes",
                features=result["boxes"],
                legend={"red_box": "Target Region", "green_box": "Secondary Spatial Corridor"}
            )

        elif task_type == "bitemporal_change":
            result = change_vqa_engine.analyze_change(
                image_t1_path=img1_path,
                image_t2_path=img2_path,
                query=request.query_text,
                output_overlay_path=overlay_path
            )
            answer_text = result["answer"]
            raw_confidence = result["confidence"]
            visual_evidence = VisualEvidence(
                overlay_url=overlay_web_url,
                overlay_type="change_diff_heatmap",
                summary_stats=result["change_statistics"],
                legend={
                    "cyan_layer": "Water Inundation / Submerged Land",
                    "red_layer": "Structural Expansion / Paved Development",
                    "neutral": "Invariant Background"
                }
            )

        elif task_type == "cross_modal_fusion":
            # Determine which image is optical and which is SAR
            if "sar" in image_metadata_list[0].get("modality", ""):
                sar_p, opt_p = img1_path, img2_path
            else:
                opt_p, sar_p = img1_path, img2_path
                
            result = optical_sar_fusion_engine.fuse_and_analyze(
                optical_image_path=opt_p,
                sar_image_path=sar_p,
                query=request.query_text,
                output_overlay_path=overlay_path
            )
            answer_text = result["answer"]
            raw_confidence = result["confidence"]
            visual_evidence = VisualEvidence(
                overlay_url=overlay_web_url,
                overlay_type="sar_optical_fused",
                summary_stats=result["fusion_metrics"],
                legend={
                    "magenta_orange": "SAR High Double-Bounce (Urban / Industrial Buildings)",
                    "dark_blue_black": "SAR Specular Water Absorption",
                    "green": "Optical Vegetation Ground Cover"
                }
            )

        else: # Default: single_vqa
            result = vqa_caption_engine.answer_vqa(
                image_path=img1_path,
                query=request.query_text
            )
            answer_text = result["answer"]
            raw_confidence = result["confidence"]
            visual_evidence = VisualEvidence(
                overlay_url=None,
                overlay_type="vqa_focus",
                summary_stats=result.get("features_detected", {})
            )

        # 6. Confidence Calibration
        spatial_overlap = input_trace.spatial_coverage_overlap
        confidence = confidence_calibrator.evaluate(
            base_model_confidence=raw_confidence,
            task_type=task_type,
            spatial_overlap=spatial_overlap,
            raster_metadata=image_metadata_list[0]
        )

        # 7. Execution Trace Compilation
        latency_ms = (time.time() - start_time) * 1000
        trace = build_execution_trace(
            task_classified=task_type,
            classification_method=class_method,
            classification_confidence=class_conf,
            routing_rationale=rationale,
            input_validation_trace=input_trace,
            model_entry=model_entry,
            sanitized_parameters=sanitized_params,
            execution_latency_ms=latency_ms,
            confidence_detail=confidence.model_dump()
        )

        report_url = f"/api/report/{request_id}"

        return QueryResponse(
            request_id=request_id,
            status="completed",
            task_type=task_type,
            query_text=request.query_text,
            answer_text=answer_text,
            confidence=confidence,
            visual_evidence=visual_evidence,
            execution_trace=trace,
            report_url=report_url,
            created_at=datetime.now(timezone.utc).isoformat()
        )

orchestrator = AgenticOrchestrator()

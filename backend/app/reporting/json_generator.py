import json
from datetime import datetime
from typing import Dict, Any

class JsonReportGenerator:
    """
    Generates standardized JSON/GeoJSON audit packages for SatQuery AI evaluations.
    """
    @staticmethod
    def generate_json(report_data: Dict[str, Any], output_path: str) -> str:
        trace_id = report_data.get("trace_id", report_data.get("execution_summary", {}).get("trace_id", "000"))
        payload = {
            "$schema": "https://satquery.ai/schema/v1/report.json",
            "report_id": f"SATQUERY-RPT-{trace_id}",
            "generated_at": datetime.utcnow().isoformat() + "Z",
            "report_metadata": {
                "mission_agency": "Earth Observation Mission Division",
                "system": "SatQuery AI",
                "version": "1.0.0-PROD",
                "timestamp": report_data.get("execution_summary", {}).get("timestamp", "")
            },
            "query": report_data.get("query"),
            "task_classification": report_data.get("task_type"),
            "findings": {
                "headline": report_data.get("headline_answer"),
                "key_observations": report_data.get("bullet_points", []),
                "confidence_score": report_data.get("confidence_score")
            },
            "geospatial_metadata": report_data.get("input_information", {}),
            "execution_summary": report_data.get("execution_summary", {}),
            "workflow_steps": report_data.get("workflow_steps", []),
            "spatial_evidence": [
                {
                    "id": r.get("id"),
                    "label": r.get("label"),
                    "normalized_bbox": r.get("bbox"),
                    "area_km2": r.get("area_km2"),
                    "category": r.get("category"),
                    "confidence": r.get("confidence")
                }
                for r in report_data.get("evidence_regions", [])
            ],
            "change_statistics": report_data.get("change_statistics"),
            "heatmap": report_data.get("heatmap"),
            "confidence_breakdown": report_data.get("confidence", {}),
            "image_cards": [
                {"title": getattr(c, 'title', c.get('title', '')) if isinstance(c, dict) else getattr(c, 'title', ''),
                 "date": getattr(c, 'date', c.get('date', '')) if isinstance(c, dict) else getattr(c, 'date', ''),
                 "modality": getattr(c, 'modality', c.get('modality', '')) if isinstance(c, dict) else getattr(c, 'modality', '')}
                for c in report_data.get("image_cards", [])
            ]
        }
        
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)
            
        return output_path

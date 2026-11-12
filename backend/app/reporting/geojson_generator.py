import json
import math
from datetime import datetime, timezone
from typing import Dict, Any, List

class GeoJsonReportGenerator:
    """
    Generates official RFC 7946 GeoJSON FeatureCollections for SatQuery AI spatial evidence.
    Enables instant drag-and-drop vector overlay into QGIS, ArcGIS, Mapbox, and Leaflet.
    """

    @staticmethod
    def generate_geojson(report_data: Dict[str, Any], output_path: str) -> str:
        trace_id = report_data.get("trace_id", report_data.get("id", "000"))
        query = report_data.get("query", "")
        task_type = report_data.get("task_type", report_data.get("task", "Remote Sensing Analysis"))
        headline = report_data.get("headline_answer", report_data.get("result", {}).get("answer", ""))
        hazard_level = report_data.get("hazard_level", "NORMAL")

        input_info = report_data.get("input_information") or {}
        loc_str = input_info.get("location", "")
        
        # Extract center lat/lon from location string if present
        center_lat = 19.0760
        center_lon = 72.8777
        if "Lat:" in loc_str and "Lon:" in loc_str:
            try:
                parts = loc_str.split(",")
                lat_part = parts[0].replace("Lat:", "").replace("° N", "").replace("°", "").strip()
                lon_part = parts[1].replace("Lon:", "").replace("° E", "").replace("°", "").strip()
                center_lat = float(lat_part)
                center_lon = float(lon_part)
            except Exception:
                pass

        # Calculate coordinate span (approx 5km bounding area standard for EO patches)
        cos_lat = math.cos(math.radians(center_lat)) if abs(center_lat) < 89 else 1.0
        delta_lat = 0.025  # ~2.7 km
        delta_lon = 0.025 / max(0.2, cos_lat)

        features = []
        raw_regions = report_data.get("evidence_regions", []) or report_data.get("result", {}).get("evidence_regions", [])

        for idx, r in enumerate(raw_regions):
            r_dict = r if isinstance(r, dict) else r.model_dump() if hasattr(r, "model_dump") else r.__dict__
            bbox = r_dict.get("bbox") or []
            if not bbox and r_dict.get("box"):
                # Convert [x, y, w, h] to [ymin, xmin, ymax, xmax]
                x, y, w, h = r_dict["box"]
                bbox = [y, x, y + h, x + w]

            if len(bbox) >= 4:
                ymin, xmin, ymax, xmax = bbox[:4]
                # Map [0, 1] normalized pixel box to real WGS84 coordinates
                min_lon = round(center_lon + (xmin - 0.5) * 2 * delta_lon, 6)
                max_lon = round(center_lon + (xmax - 0.5) * 2 * delta_lon, 6)
                min_lat = round(center_lat + (0.5 - ymax) * 2 * delta_lat, 6)
                max_lat = round(center_lat + (0.5 - ymin) * 2 * delta_lat, 6)

                polygon_coords = [[
                    [min_lon, min_lat],
                    [max_lon, min_lat],
                    [max_lon, max_lat],
                    [min_lon, max_lat],
                    [min_lon, min_lat]
                ]]

                features.append({
                    "type": "Feature",
                    "id": r_dict.get("id", f"region_{idx+1}"),
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": polygon_coords
                    },
                    "properties": {
                        "id": r_dict.get("id", f"region_{idx+1}"),
                        "label": r_dict.get("label", "Spatial Cluster"),
                        "category": r_dict.get("category", r_dict.get("type", "feature")),
                        "area_km2": r_dict.get("area_km2", 0.0),
                        "confidence": r_dict.get("confidence", 0.90),
                        "color": r_dict.get("color", "#00F0FF"),
                        "hazard_level": hazard_level,
                        "task": task_type
                    }
                })

        # If no regions detected, output scene bounding box
        if not features:
            scene_polygon = [[
                [round(center_lon - delta_lon, 6), round(center_lat - delta_lat, 6)],
                [round(center_lon + delta_lon, 6), round(center_lat - delta_lat, 6)],
                [round(center_lon + delta_lon, 6), round(center_lat + delta_lat, 6)],
                [round(center_lon - delta_lon, 6), round(center_lat + delta_lat, 6)],
                [round(center_lon - delta_lon, 6), round(center_lat - delta_lat, 6)]
            ]]
            features.append({
                "type": "Feature",
                "id": "scene_boundary",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": scene_polygon
                },
                "properties": {
                    "label": "Monitored Remote Sensing Footprint",
                    "status": "Nominal",
                    "hazard_level": hazard_level
                }
            })

        geojson_payload = {
            "type": "FeatureCollection",
            "name": f"SatQuery_AI_Analysis_{trace_id}",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "metadata": {
                "system": "SatQuery AI (Autonomous Earth Observation Console)",
                "trace_id": trace_id,
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "query": query,
                "task": task_type,
                "headline": headline,
                "hazard_level": hazard_level
            },
            "features": features
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(geojson_payload, f, indent=2)

        return output_path

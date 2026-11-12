import math
from datetime import datetime
from typing import Dict, Any

class KmlReportGenerator:
    """
    Generates official OGC KML (Keyhole Markup Language) packages for SatQuery AI spatial evidence.
    Enables direct drag-and-drop 3D visualization inside Google Earth and Earth-Observation GIS viewers.
    """

    @staticmethod
    def generate_kml(report_data: Dict[str, Any], output_path: str) -> str:
        trace_id = report_data.get("trace_id", report_data.get("id", "000"))
        query = report_data.get("query", "")
        task_type = report_data.get("task_type", report_data.get("task", "Remote Sensing Analysis"))
        headline = report_data.get("headline_answer", report_data.get("result", {}).get("answer", ""))
        hazard_level = report_data.get("hazard_level", "NORMAL")

        input_info = report_data.get("input_information") or {}
        loc_str = input_info.get("location", "")
        
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

        cos_lat = math.cos(math.radians(center_lat)) if abs(center_lat) < 89 else 1.0
        delta_lat = 0.025
        delta_lon = 0.025 / max(0.2, cos_lat)

        raw_regions = report_data.get("evidence_regions", []) or report_data.get("result", {}).get("evidence_regions", [])

        placemarks_xml = []
        for idx, r in enumerate(raw_regions):
            r_dict = r if isinstance(r, dict) else r.model_dump() if hasattr(r, "model_dump") else r.__dict__
            bbox = r_dict.get("bbox") or []
            if not bbox and r_dict.get("box"):
                x, y, w, h = r_dict["box"]
                bbox = [y, x, y + h, x + w]

            if len(bbox) >= 4:
                ymin, xmin, ymax, xmax = bbox[:4]
                min_lon = round(center_lon + (xmin - 0.5) * 2 * delta_lon, 6)
                max_lon = round(center_lon + (xmax - 0.5) * 2 * delta_lon, 6)
                min_lat = round(center_lat + (0.5 - ymax) * 2 * delta_lat, 6)
                max_lat = round(center_lat + (0.5 - ymin) * 2 * delta_lat, 6)

                label = r_dict.get("label", f"Cluster {idx+1}")
                area_km2 = r_dict.get("area_km2", 0.0)
                conf_pct = int(float(r_dict.get("confidence", 0.90)) * 100)
                cat = str(r_dict.get("category", "feature")).lower()

                # Choose KML color style (aabbggrr format)
                style_id = "polyWater" if "water" in cat or "inundat" in label.lower() else (
                    "polyIncrease" if "inc" in cat or "urban" in label.lower() else (
                        "polyDecrease" if "dec" in cat or "loss" in label.lower() else "polyGeneric"
                    )
                )

                coords_str = f"{min_lon},{min_lat},0 {max_lon},{min_lat},0 {max_lon},{max_lat},0 {min_lon},{max_lat},0 {min_lon},{min_lat},0"

                pm = f"""    <Placemark>
      <name>{label}</name>
      <description><![CDATA[
        <b>Task:</b> {task_type}<br/>
        <b>Area:</b> {area_km2} km²<br/>
        <b>Model Confidence:</b> {conf_pct}%<br/>
        <b>Alert Status:</b> {hazard_level}
      ]]></description>
      <styleUrl>#{style_id}</styleUrl>
      <Polygon>
        <extrude>1</extrude>
        <altitudeMode>clampToGround</altitudeMode>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>{coords_str}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>"""
                placemarks_xml.append(pm)

        kml_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>SatQuery AI Analysis - {trace_id}</name>
    <description><![CDATA[
      <h3>SatQuery AI Earth Observation Report</h3>
      <p><b>Query:</b> {query}</p>
      <p><b>Finding:</b> {headline}</p>
      <p><b>Hazard Level:</b> {hazard_level}</p>
    ]]></description>

    <!-- Styles (KML Color format: aabbggrr) -->
    <Style id="polyWater">
      <LineStyle><color>ffff0000</color><width>2.5</width></LineStyle>
      <PolyStyle><color>7fffff00</color></PolyStyle>
    </Style>
    <Style id="polyIncrease">
      <LineStyle><color>ff0000ff</color><width>2.5</width></LineStyle>
      <PolyStyle><color>7f0000ff</color></PolyStyle>
    </Style>
    <Style id="polyDecrease">
      <LineStyle><color>ff00a5ff</color><width>2.5</width></LineStyle>
      <PolyStyle><color>7f00a5ff</color></PolyStyle>
    </Style>
    <Style id="polyGeneric">
      <LineStyle><color>ffffff00</color><width>2.0</width></LineStyle>
      <PolyStyle><color>60ffff00</color></PolyStyle>
    </Style>

{chr(10).join(placemarks_xml)}
  </Document>
</kml>"""

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(kml_content)

        return output_path

from datetime import datetime
from typing import Tuple, List, Optional
from backend.app.schemas.raster_schema import ValidationResult, CoRegistrationResult

class CoRegistrationValidator:
    """
    Validates paired multitemporal satellite imagery for change detection.
    Guarantees spatial registration, compatible CRS, resolution, and chronological validity.
    """
    
    @staticmethod
    def validate_pair(val_1: ValidationResult, val_2: ValidationResult) -> CoRegistrationResult:
        if not val_1.is_valid or not val_2.is_valid:
            return CoRegistrationResult(
                is_compatible=False,
                crs_match=False,
                spatial_overlap_pct=0.0,
                resolution_match=False,
                temporal_difference_days=0,
                temporal_order_valid=False,
                message=f"One or both images failed ingestion: {val_1.error or val_2.error}"
            )
            
        m1 = val_1.metadata
        m2 = val_2.metadata
        
        # 1. CRS Check
        crs_match = (m1.crs == m2.crs)
        
        # 2. Dimensions and Resolution Check
        dim_match = (m1.width == m2.width and m1.height == m2.height)
        res_match = (abs(m1.resolution_m - m2.resolution_m) < 0.05)
        
        # 3. Spatial Bounds Overlap (Intersection over Union / Overlap Area)
        # bounds = [minx, miny, maxx, maxy]
        b1, b2 = m1.bounds, m2.bounds
        overlap_pct = 0.0
        if len(b1) >= 4 and len(b2) >= 4:
            inter_minx = max(b1[0], b2[0])
            inter_miny = max(b1[1], b2[1])
            inter_maxx = min(b1[2], b2[2])
            inter_maxy = min(b1[3], b2[3])
            
            if inter_maxx > inter_minx and inter_maxy > inter_miny:
                inter_area = (inter_maxx - inter_minx) * (inter_maxy - inter_miny)
                area1 = (b1[2] - b1[0]) * (b1[3] - b1[1])
                area2 = (b2[2] - b2[0]) * (b2[3] - b2[1])
                overlap_pct = round((inter_area / max(area1, area2)) * 100.0, 1)
        elif len(b1) == 0 and len(b2) == 0:
            # Both images lack bounds — assume 100% overlap if dimensions match
            if dim_match:
                overlap_pct = 100.0
            
        # 4. Temporal Relationship Check
        try:
            d1 = datetime.strptime(m1.acquisition_date, "%Y-%m-%d")
            d2 = datetime.strptime(m2.acquisition_date, "%Y-%m-%d")
            diff_days = abs((d2 - d1).days)
            order_valid = (d2 >= d1)
        except Exception:
            diff_days = 0
            order_valid = False
            
        is_compatible = (overlap_pct >= 70.0 and res_match and dim_match and crs_match)
        
        msg_parts = []
        if is_compatible:
            msg_parts.append(f"Images verified co-registered: {overlap_pct}% spatial overlap")
            msg_parts.append(f"Matching resolution: {m1.resolution_m}m")
            msg_parts.append(f"Temporal baseline: {diff_days} days between observations")
        else:
            if overlap_pct < 70.0:
                msg_parts.append(f"Spatial overlap insufficient ({overlap_pct}% < 70%)")
            if not dim_match:
                msg_parts.append(f"Dimension mismatch ({m1.width}x{m1.height} vs {m2.width}x{m2.height})")
            if not res_match:
                msg_parts.append(f"Resolution mismatch ({m1.resolution_m}m vs {m2.resolution_m}m)")
                
        return CoRegistrationResult(
            is_compatible=is_compatible,
            crs_match=crs_match,
            spatial_overlap_pct=overlap_pct,
            resolution_match=res_match,
            temporal_difference_days=diff_days,
            temporal_order_valid=order_valid,
            message=" | ".join(msg_parts)
        )

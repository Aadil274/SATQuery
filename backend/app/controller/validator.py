from typing import List, Dict, Any, Tuple
from ai.shared.raster_utils import compute_overlap_percentage
from backend.app.models_schema.trace import InputValidationTrace

class InputValidator:
    """Validates raster inputs, CRS alignment, modality pairing, and parameter constraints."""

    SUPPORTED_EXTENSIONS = {"tif", "tiff", "geotiff", "png", "jpg", "jpeg"}

    def validate_inputs(
        self,
        image_metadata_list: List[Dict[str, Any]],
        task_type: str
    ) -> Tuple[bool, List[str], InputValidationTrace]:
        """
        Validates raster metadata against task requirements.
        Returns: (is_valid, error_reasons, input_validation_trace)
        """
        errors = []
        count = len(image_metadata_list)
        modalities = [m.get("modality", "optical") for m in image_metadata_list]
        
        # 1. Format verification
        for idx, meta in enumerate(image_metadata_list):
            fmt = meta.get("format", "").lower()
            if fmt not in self.SUPPORTED_EXTENSIONS:
                errors.append(f"Image #{idx+1} has unsupported format '.{fmt}'. Supported: {self.SUPPORTED_EXTENSIONS}")

        # 2. Count verification per task
        if task_type in ["bitemporal_change", "cross_modal_fusion"]:
            if count != 2:
                errors.append(f"Task '{task_type}' mandates exactly 2 co-registered rasters, but {count} was provided.")
        elif task_type in ["single_vqa", "captioning", "grounding"]:
            if count != 1:
                # Warning/soft accept: take first, note in trace
                pass

        # 3. Spatial and CRS alignment check for pairs
        crs_aligned = True
        overlap_pct = 100.0
        
        if count >= 2:
            crs1 = image_metadata_list[0].get("crs", "EPSG:4326")
            crs2 = image_metadata_list[1].get("crs", "EPSG:4326")
            
            if crs1 != crs2:
                crs_aligned = False
                errors.append(f"CRS mismatch between inputs: {crs1} vs {crs2}. Co-registration reprojection required.")
                
            bounds1 = image_metadata_list[0].get("bounds", [])
            bounds2 = image_metadata_list[1].get("bounds", [])
            overlap_pct = compute_overlap_percentage(bounds1, bounds2)
            
            if overlap_pct < 50.0 and len(bounds1) == 4 and len(bounds2) == 4:
                errors.append(f"Spatial overlap between image pair is only {overlap_pct}%. Reliable change or fusion requires >= 50% co-registration.")

        # 4. Modality check for cross-modal fusion
        if task_type == "cross_modal_fusion" and count == 2:
            has_sar = any("sar" in m.lower() for m in modalities)
            has_optical = any("optical" in m.lower() or "multispectral" in m.lower() for m in modalities)
            if not (has_sar and has_optical):
                # Don't hard-fail if user uploaded two images, but warn
                pass

        is_valid = len(errors) == 0
        
        trace = InputValidationTrace(
            input_count=count,
            modalities_detected=modalities,
            crs_aligned=crs_aligned,
            spatial_coverage_overlap=overlap_pct,
            format_verified=is_valid
        )
        
        return is_valid, errors, trace

    def sanitize_parameters(
        self,
        raw_params: Dict[str, Any],
        model_permitted_schema: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Sanitizes and whitelists permitted task parameters.
        Prevents prompt-injection-style parameter manipulation or out-of-range execution.
        """
        sanitized = {}
        for param_name, rule in model_permitted_schema.items():
            val = raw_params.get(param_name, rule.get("default"))
            ptype = rule.get("type")
            
            if ptype == "float":
                try:
                    fval = float(val)
                    fval = max(rule.get("min", fval), min(rule.get("max", fval), fval))
                    sanitized[param_name] = fval
                except (ValueError, TypeError):
                    sanitized[param_name] = rule.get("default")
            elif ptype == "int":
                try:
                    ival = int(val)
                    ival = max(rule.get("min", ival), min(rule.get("max", ival), ival))
                    sanitized[param_name] = ival
                except (ValueError, TypeError):
                    sanitized[param_name] = rule.get("default")
            elif ptype == "bool":
                sanitized[param_name] = bool(val)
            else:
                sanitized[param_name] = val
                
        return sanitized

input_validator = InputValidator()

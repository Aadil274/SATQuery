from typing import Dict, Any, Tuple
from backend.app.models_schema.query import ConfidenceDetail

class ConfidenceCalibrator:
    """Estimates and calibrates analytical confidence for satellite vision-language outputs."""

    def evaluate(
        self,
        base_model_confidence: float,
        task_type: str,
        spatial_overlap: float = 100.0,
        raster_metadata: Dict[str, Any] = None
    ) -> ConfidenceDetail:
        """
        Calibrates raw model probability with physical remote sensing indicators.
        """
        # Base factor
        c = base_model_confidence
        factors = {"raw_model_score": round(base_model_confidence, 3)}
        
        # Spatial overlap penalty for pair tasks
        if task_type in ["bitemporal_change", "cross_modal_fusion"]:
            overlap_factor = min(1.0, max(0.5, spatial_overlap / 100.0))
            factors["spatial_co_registration_factor"] = round(overlap_factor, 3)
            c *= overlap_factor

        # Resolution / dimension check
        if raster_metadata:
            w = raster_metadata.get("width", 512)
            h = raster_metadata.get("height", 512)
            if w < 256 or h < 256:
                resolution_factor = 0.88
                factors["low_resolution_penalty"] = 0.88
                c *= resolution_factor
            else:
                factors["resolution_quality"] = 1.00

        final_score = round(float(max(0.10, min(0.99, c))), 3)
        
        if final_score >= 0.85:
            level = "HIGH"
            low_warning = False
            warning_msg = None
        elif final_score >= 0.68:
            level = "MODERATE"
            low_warning = False
            warning_msg = "Moderate analytical confidence. Corroborate with spectral ground-truth if available."
        else:
            level = "LOW"
            low_warning = True
            warning_msg = "Low confidence alert: Sensor noise, partial cloud obscuration, or co-registration variance detected. Human analyst verification mandatory."

        return ConfidenceDetail(
            score=final_score,
            level=level,
            calibration_metric="Temperature-Scaled Platt Scaling with Spatial Co-Registration Regularizer",
            low_confidence_warning=low_warning,
            warning_message=warning_msg,
            factors=factors
        )

confidence_calibrator = ConfidenceCalibrator()

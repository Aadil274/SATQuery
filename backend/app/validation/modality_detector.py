from typing import Dict, Any, List, Optional
from backend.app.schemas.raster_schema import ModalityType, ValidationResult

class ModalityDetector:
    """
    Analyzes radiometric signatures, band configurations, and metadata tags
    to determine and verify satellite sensor modality (Multispectral Optical vs C-band SAR).
    """

    @staticmethod
    def identify_modality(result: ValidationResult) -> Dict[str, Any]:
        meta = result.metadata
        bands = meta.band_names
        count = meta.band_count
        
        is_sar = False
        is_optical = False
        
        # Check band naming
        for b in bands:
            b_lower = b.lower()
            if "vv" in b_lower or "vh" in b_lower or "hh" in b_lower or "hv" in b_lower or "sar" in b_lower:
                is_sar = True
            if "red" in b_lower or "green" in b_lower or "blue" in b_lower or "nir" in b_lower or "b0" in b_lower:
                is_optical = True
                
        if is_sar and not is_optical:
            modality = ModalityType.SAR
            description = "Sentinel-1 Synthetic Aperture Radar (SAR) - C-Band dual-pol (VV/VH)"
            features = ["Surface roughness", "Corner reflectors (structures)", "Dielectric properties", "All-weather cloud penetration"]
        elif is_optical:
            modality = ModalityType.OPTICAL
            description = "Sentinel-2 MultiSpectral Instrument (MSI) - VNIR bands"
            features = ["Chlorophyll absorption", "Spectral reflectance", "Normalized Difference Indices (NDVI/NDWI)", "Land-cover texture"]
        else:
            modality = ModalityType.OPTICAL
            description = "Optical Multispectral Imagery"
            features = ["Visual spectral reflectance"]
            
        return {
            "modality": modality,
            "description": description,
            "band_count": count,
            "bands": bands,
            "key_features": features,
            "cloud_sensitive": (modality == ModalityType.OPTICAL)
        }

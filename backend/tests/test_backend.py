import unittest
import os
from backend.app.validation.raster_validator import RasterValidator
from backend.app.validation.coregistration import CoRegistrationValidator
from backend.app.agent.router import QueryRouter
from backend.app.agent.controller import controller
from backend.app.schemas.agent_schema import AnalysisRequest, TaskType
from backend.app.reporting.pdf_generator import MissionReportGenerator

class TestSatQueryBackend(unittest.TestCase):
    
    def test_01_raster_validator_geotiff(self):
        tif_path = "static/samples/mumbai_t1.tif"
        res = RasterValidator.inspect_raster(tif_path)
        self.assertTrue(res.is_valid)
        self.assertEqual(res.file_format, "GeoTIFF")
        self.assertEqual(res.metadata.width, 512)
        self.assertEqual(res.metadata.height, 512)
        self.assertEqual(res.metadata.resolution_m, 10.0)
        print("[PASS] GeoTIFF validation passed:", res.metadata.crs, res.metadata.sensor)
        
    def test_02_coregistration_validator(self):
        v1 = RasterValidator.inspect_raster("static/samples/mumbai_t1.tif")
        v2 = RasterValidator.inspect_raster("static/samples/mumbai_t2.tif")
        coreg = CoRegistrationValidator.validate_pair(v1, v2)
        self.assertTrue(coreg.is_compatible)
        self.assertTrue(coreg.crs_match)
        self.assertGreaterEqual(coreg.spatial_overlap_pct, 90.0)
        print("[PASS] Co-registration verification passed:", coreg.message)

    def test_03_query_router(self):
        # Bi-temporal change query
        r1 = QueryRouter.route_query("What changed between these two dates?")
        self.assertEqual(r1["task_type"], TaskType.CHANGE_DETECTION)
        
        # Grounding query
        r2 = QueryRouter.route_query("Highlight the river and water body")
        self.assertEqual(r2["task_type"], TaskType.GROUNDING)
        
        # Optical + SAR query
        r3 = QueryRouter.route_query("Use optical and SAR to identify structures")
        self.assertEqual(r3["task_type"], TaskType.OPTICAL_SAR)
        print("[PASS] Intent classification and routing verified.")

    def test_04_agentic_controller_execution(self):
        req = AnalysisRequest(
            query="What changed between these two dates, and where did the change occur?",
            threshold=0.35
        )
        resp = controller.run_analysis(req, ["static/samples/mumbai_t1.tif", "static/samples/mumbai_t2.tif"])
        self.assertEqual(resp.task_type, "Change Detection (Bi-temporal)")
        self.assertGreaterEqual(resp.confidence_score, 85)
        self.assertTrue(len(resp.workflow_steps) == 6)
        self.assertTrue(len(resp.evidence_regions) > 0)
        self.assertTrue("Built-up area" in resp.headline_answer)
        print("[PASS] Agentic controller execution passed:", resp.headline_answer)

    def test_05_pdf_report_generation(self):
        sample_data = {
            "query": "What changed between these two dates?",
            "task_type": "Bi-temporal Change Analysis",
            "confidence_score": 92,
            "headline_answer": "Built-up area increased in the eastern section.",
            "bullet_points": ["Increase in structures (red).", "Riparian zone intact."]
        }
        out_pdf = "static/reports/test_report.pdf"
        MissionReportGenerator.generate_pdf(sample_data, out_pdf)
        self.assertTrue(os.path.exists(out_pdf))
        self.assertGreater(os.path.getsize(out_pdf), 1000)
        print("[PASS] Mission-grade PDF report generated successfully:", out_pdf)

if __name__ == "__main__":
    unittest.main()

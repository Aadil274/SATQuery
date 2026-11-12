import unittest
import os

# Enable fast, deterministic test harness mode
os.environ["SQAI_TEST_MODE"] = "1"

from fastapi.testclient import TestClient
from backend.app.main import app

class TestAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["system"], "SatQuery AI")
        print("[PASS] Health endpoint verified.")

    def test_samples(self):
        response = self.client.get("/api/samples")
        self.assertEqual(response.status_code, 200)
        samples = response.json()
        self.assertGreaterEqual(len(samples), 3)
        print(f"[PASS] Retrieved {len(samples)} benchmark scenarios.")

    def test_models_registry(self):
        response = self.client.get("/api/models")
        self.assertEqual(response.status_code, 200)
        models = response.json()
        self.assertTrue(any("BigEarthNet.txt" in m.get("adaptation_corpus", "") for m in models))
        print(f"[PASS] Model registry verified with {len(models)} models.")

    def test_analyze_bitemporal(self):
        payload = {
            "query": "What changed between these two dates, and where did the change occur?",
            "sample_id": "bi_temporal_mumbai",
            "threshold": 0.35
        }
        response = self.client.post("/api/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["task_type"], "Change Detection (Bi-temporal)")
        self.assertEqual(data["confidence_score"], 92)
        self.assertTrue(len(data["workflow_steps"]) == 6)
        self.assertTrue(len(data["image_cards"]) == 3)
        print("[PASS] /api/analyze bi-temporal analysis verified.")

    def test_analyze_optical_sar(self):
        payload = {
            "query": "Use the optical and SAR images together to identify built-up structures beneath cloud cover.",
            "sample_id": "optical_sar_gujarat"
        }
        response = self.client.post("/api/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["task_type"], "Optical + SAR Analysis")
        self.assertGreaterEqual(data["confidence_score"], 90)
        print("[PASS] /api/analyze Optical + SAR multimodal fusion verified.")

    def test_analyze_grounding(self):
        payload = {
            "query": "Highlight the water body and meandering river channel.",
            "sample_id": "grounding_port"
        }
        response = self.client.post("/api/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["task_type"], "Visual Grounding")
        self.assertTrue(len(data["evidence_regions"]) > 0)
        print("[PASS] /api/analyze Visual Grounding verified.")

    def test_report_pdf_download(self):
        # Trigger an analysis first to populate trace cache
        payload = {
            "query": "What changed between these two dates?",
            "sample_id": "bi_temporal_mumbai"
        }
        resp = self.client.post("/api/analyze", json=payload)
        trace_id = resp.json()["trace_id"]
        
        pdf_resp = self.client.get(f"/api/report/pdf/{trace_id}")
        self.assertEqual(pdf_resp.status_code, 200)
        self.assertEqual(pdf_resp.headers["content-type"], "application/pdf")
        print(f"[PASS] PDF report generated and downloaded for trace {trace_id}.")

    def test_report_geojson_download(self):
        payload = {
            "query": "Detect urban changes and generate vector boundaries",
            "sample_id": "bi_temporal_mumbai"
        }
        resp = self.client.post("/api/analyze", json=payload)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        trace_id = data["trace_id"]
        self.assertTrue("report_geojson_url" in data)
        self.assertTrue(data["report_geojson_url"].endswith(trace_id))

        geojson_resp = self.client.get(f"/api/report/geojson/{trace_id}")
        self.assertEqual(geojson_resp.status_code, 200)
        self.assertIn("application/geo+json", geojson_resp.headers["content-type"])
        geojson_data = geojson_resp.json()
        self.assertEqual(geojson_data["type"], "FeatureCollection")
        self.assertIn("features", geojson_data)
        print(f"[PASS] GeoJSON vector export verified with {len(geojson_data['features'])} features.")

    def test_report_kml_download(self):
        payload = {
            "query": "Export change polygons to Google Earth KML",
            "sample_id": "bi_temporal_mumbai"
        }
        resp = self.client.post("/api/analyze", json=payload)
        trace_id = resp.json()["trace_id"]

        kml_resp = self.client.get(f"/api/report/kml/{trace_id}")
        self.assertEqual(kml_resp.status_code, 200)
        self.assertIn("application/vnd.google-earth.kml+xml", kml_resp.headers["content-type"])
        self.assertIn(b"<kml", kml_resp.content)
        self.assertIn(b"SatQuery AI", kml_resp.content)
        print(f"[PASS] KML GIS export verified for trace {trace_id}.")

    def test_multilingual_indic_analysis(self):
        payload = {
            "query": "पानी और बाढ़ के प्रभाव की पहचान करें",
            "sample_id": "bi_temporal_mumbai",
            "language": "hi"
        }
        resp = self.client.post("/api/analyze", json=payload)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["language"], "hi")
        self.assertIn("actionable_advisory", data)
        self.assertIn("emergency_sms_brief", data)
        self.assertIn("hazard_level", data)
        print(f"[PASS] Multilingual Indic (Hindi) analysis verified with hazard level: {data['hazard_level']}.")

    def test_spa_serving(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue("html" in response.headers.get("content-type", ""))
        print("[PASS] Single-page React dashboard served at root URL.")

    def test_bigearthnet_dataset(self):
        response = self.client.get("/api/datasets/bigearthnet/stats")
        self.assertEqual(response.status_code, 200)
        stats = response.json()
        self.assertEqual(stats["total_samples"], 464044)
        self.assertEqual(stats["text_annotations"], 9600000)
        print("[PASS] BigEarthNet.txt (arXiv:2603.29630) official dataset verified.")

    def test_benchmarks_all(self):
        response = self.client.get("/api/datasets/benchmarks/all")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue("evaluation_matrix" in data)
        self.assertGreater(len(data["evaluation_matrix"]), 4)
        print("[PASS] Multi-benchmark evaluation matrix (BigEarthNet, VRSBench, RSVQA, CDVQA) verified.")

    def test_stac_presets(self):
        response = self.client.get("/api/stac/presets")
        self.assertEqual(response.status_code, 200)
        presets = response.json()
        self.assertGreaterEqual(len(presets), 5)
        self.assertTrue(any(p["id"] == "mumbai" for p in presets))
        print(f"[PASS] STAC preset locations verified with {len(presets)} global regions.")

    def test_stac_search_and_ingest(self):
        # 1. Search optical passes
        search_resp = self.client.post("/api/stac/search", json={
            "location": "mumbai",
            "modality": "optical",
            "limit": 4
        })
        self.assertEqual(search_resp.status_code, 200)
        data = search_resp.json()
        self.assertGreater(len(data.get("passes", [])), 0)
        first_pass = data["passes"][0]
        self.assertIn("id", first_pass)
        self.assertEqual(first_pass["modality"], "optical")
        print(f"[PASS] STAC search verified with {len(data['passes'])} passes.")

        # 2. Ingest selected pass
        ingest_resp = self.client.post("/api/stac/ingest", json=first_pass)
        self.assertEqual(ingest_resp.status_code, 200)
        slot = ingest_resp.json()
        self.assertEqual(slot["modality"], "optical")
        self.assertTrue(slot["preview"].startswith("/static/stac_cache/"))
        self.assertIn("meta", slot)
        print("[PASS] STAC pass ingested successfully as active workspace slot.")

if __name__ == "__main__":
    unittest.main()

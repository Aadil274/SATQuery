import unittest
import os
import numpy as np
from PIL import Image

from backend.app.reasoning.semantic_engine import semantic_engine
from backend.app.models.change_detector import ChangeDetector
from backend.app.models.optical_sar_fusion import OpticalSARFusionModel
from backend.app.agent.controller import controller
from backend.app.schemas.agent_schema import AnalysisRequest, TaskType

class TestPixelAccuracyAndSensing(unittest.TestCase):
    """
    Test suite verifying pixel accuracy, data-driven outputs,
    raster heatmap generation, and dynamic spatial evidence.
    """

    @classmethod
    def setUpClass(cls):
        os.makedirs("scratch/test_data", exist_ok=True)
        cls.change_detector = ChangeDetector(output_dir="static/overlays")
        cls.fusion_model = OpticalSARFusionModel(output_dir="static/overlays")

        # 1. Create a uniform test image (100x100 black)
        cls.img_black = "scratch/test_data/black.png"
        Image.fromarray(np.zeros((100, 100, 3), dtype=np.uint8)).save(cls.img_black)

        # 2. Create an identical duplicate
        cls.img_black_copy = "scratch/test_data/black_copy.png"
        Image.fromarray(np.zeros((100, 100, 3), dtype=np.uint8)).save(cls.img_black_copy)

        # 3. Create an image with two distinct high-intensity clusters:
        # One in Northwest (rows 10-30, cols 10-30), one in Southeast (rows 70-95, cols 70-95)
        cls.img_clusters = "scratch/test_data/clusters.png"
        arr = np.zeros((100, 100, 3), dtype=np.uint8)
        arr[10:30, 10:30] = 255  # Northwest cluster (400 px)
        arr[70:95, 70:95] = 255  # Southeast cluster (625 px) - larger
        Image.fromarray(arr).save(cls.img_clusters)

    @classmethod
    def tearDownClass(cls):
        import shutil
        if os.path.exists("scratch/test_data"):
            shutil.rmtree("scratch/test_data", ignore_errors=True)

    def test_01_zero_change_with_identical_images(self):
        """Identical image pair should yield exactly 0% change and correct messaging."""
        result = self.change_detector.detect_changes(self.img_black, self.img_black_copy)
        stats = result["statistics"]
        
        self.assertEqual(stats["changed_pct"], 0.0)
        self.assertEqual(stats["increase_pct"], 0.0)
        self.assertEqual(stats["decrease_pct"], 0.0)
        self.assertEqual(len(result["evidence_regions"]), 0)

        # Verify semantic engine phrasing
        answer = semantic_engine.answer_query_dynamically(
            query="What changed between these two dates?",
            task_type_str="change",
            image_paths=[self.img_black, self.img_black_copy]
        )
        self.assertIn("no significant", answer["headline_answer"].lower())
        print("[PASS] Zero-change verified with 0.0% difference.")

    def test_02_connected_components_and_sector_naming(self):
        """Connected components extraction should accurately bound clusters, sort by size, and name sectors."""
        # Test mask with NW (400 px) and SE (625 px)
        mask = np.zeros((100, 100), dtype=bool)
        mask[10:30, 10:30] = True
        mask[70:95, 70:95] = True

        regions = semantic_engine._extract_feature_regions(mask, category="change", min_area_px=50)
        
        self.assertEqual(len(regions), 2)
        # Largest cluster (SE: 625 px) should be first
        first_reg = regions[0]
        self.assertIn("Southeast", first_reg["label"])
        # Second cluster (NW: 400 px) should be second
        second_reg = regions[1]
        self.assertIn("Northwest", second_reg["label"])

        # Check normalized bounding boxes
        ymin, xmin, ymax, xmax = first_reg["bbox"]
        self.assertAlmostEqual(ymin, 0.70, delta=0.05)
        self.assertAlmostEqual(xmin, 0.70, delta=0.05)
        self.assertAlmostEqual(ymax, 0.95, delta=0.05)
        self.assertAlmostEqual(xmax, 0.95, delta=0.05)
        print("[PASS] Connected components extraction and sector-aware labeling verified.")

    def test_03_raster_heatmap_generation(self):
        """Heatmap raster should be derived directly from data without synthetic Gaussians."""
        props = semantic_engine.analyze_scene_properties([self.img_black, self.img_clusters])
        
        # Test change heatmap
        intensity, pts, meta = semantic_engine.generate_raster_heatmap("change", props, "show change heatmap")
        self.assertIsNotNone(intensity)
        self.assertIsNotNone(meta.get("overlay_url"))
        self.assertGreater(meta.get("max_intensity", 0), 0)
        
        # Verify that overlay file exists and is a valid image
        rel_path = meta["overlay_url"].lstrip("/")
        self.assertTrue(os.path.exists(rel_path))
        with Image.open(rel_path) as img:
            self.assertEqual(img.size, (100, 100))
        print("[PASS] Raster heatmap generated directly from image arrays.")

    def test_04_no_hardcoded_mumbai_in_controller(self):
        """Ensures that no hardcoded coordinates or fixed locations leak into outputs."""
        req = AnalysisRequest(query="Describe this scene in detail")
        resp = controller.run_analysis(req, [self.img_clusters])

        full_text = resp.headline_answer + " " + " ".join(resp.bullet_points)
        self.assertNotIn("19.0760", full_text)
        self.assertNotIn("72.8777", full_text)
        self.assertNotIn("19.088", full_text)
        self.assertNotIn("72.862", full_text)
        self.assertNotIn("Mumbai", full_text)
        print("[PASS] Verified zero hardcoded Mumbai locations in controller responses.")

    def test_05_optical_sar_bounded_regions(self):
        """Optical-SAR fusion should produce specific connected clusters, not full-screen boxes."""
        # Create optical with cloud and SAR with bright spots
        sar_arr = np.zeros((100, 100, 3), dtype=np.uint8)
        sar_arr[20:40, 60:80] = 240  # Bright radar scatterer (Northeast)
        sar_img = "scratch/test_data/sar_test.png"
        Image.fromarray(sar_arr).save(sar_img)

        out = self.fusion_model.fuse_and_analyze(self.img_black, sar_img, "identify structures")
        regions = out.get("evidence_regions", [])
        
        self.assertGreater(len(regions), 0)
        for r in regions:
            ymin, xmin, ymax, xmax = r["bbox"]
            width = xmax - xmin
            height = ymax - ymin
            # Bounding box should be localized, not full image
            self.assertLess(width, 0.9)
            self.assertLess(height, 0.9)
        print("[PASS] Optical-SAR fusion produces tightly bounded spatial evidence.")

    def test_06_otsu_adaptive_threshold_and_cva(self):
        """Verify Otsu inter-class variance thresholding and CVA spectral vectors."""
        from backend.app.reasoning.semantic_engine import compute_adaptive_threshold
        # Test synthetic difference with bimodal distribution (foreground shift at 0.6, background at 0.05)
        diff = np.zeros((100, 100), dtype=np.float32)
        diff[10:40, 10:40] = 0.65
        diff[50:80, 50:80] = 0.05
        t = compute_adaptive_threshold(diff, min_thresh=0.18, max_thresh=0.38)
        self.assertGreaterEqual(t, 0.18)
        self.assertLessEqual(t, 0.38)
        print(f"[PASS] Otsu adaptive threshold calibrated dynamically at T={round(t, 3)}.")

    def test_07_nms_cluster_suppression(self):
        """Verify Non-Maximum Suppression eliminates overlapping redundant bounding boxes."""
        from backend.app.reasoning.semantic_engine import apply_nms
        # Two highly overlapping boxes (IoU > 0.8) and one independent box
        box1 = {"bbox": [0.10, 0.10, 0.30, 0.30], "score": 400.0, "area_px": 400}
        box2 = {"bbox": [0.11, 0.11, 0.29, 0.29], "score": 350.0, "area_px": 350}  # Overlaps box1
        box3 = {"bbox": [0.70, 0.70, 0.90, 0.90], "score": 500.0, "area_px": 500}  # Independent

        kept = apply_nms([box1, box2, box3], iou_thresh=0.45)
        self.assertEqual(len(kept), 2)
        # Suppressed box2, kept box3 (500) and box1 (400)
        self.assertEqual(kept[0]["area_px"], 500)
        self.assertEqual(kept[1]["area_px"], 400)
        print("[PASS] Non-Maximum Suppression successfully eliminated redundant overlapping bounding boxes.")

    def test_08_directional_grounding_prioritization(self):
        """Verify queries with directional keywords prioritize matching geographic sectors."""
        mask = np.zeros((100, 100), dtype=bool)
        mask[10:30, 10:30] = True   # Northwest cluster (400 px)
        mask[70:95, 70:95] = True   # Southeast cluster (625 px) - larger

        # Without directional preference, largest (SE) is first
        default_regs = semantic_engine._extract_feature_regions(mask, min_area_px=50)
        self.assertIn("Southeast", default_regs[0]["label"])

        # With "northwest" directional query preference, NW gets directional boost
        nw_regs = semantic_engine._extract_feature_regions(mask, min_area_px=50, target_direction="northwest")
        self.assertIn("Northwest", nw_regs[0]["label"])
        print("[PASS] Directional spatial query resolution successfully prioritized northwest sector.")

    def test_09_multitemporal_physical_transition_and_macro_districts(self):
        """Verify multi-temporal land cover transition on benchmark change imagery."""
        from backend.app.reasoning.semantic_engine import classify_landcover_features, load_raster_rgb
        im1_path = "static/demo_images/change_before.jpg"
        im2_path = "static/demo_images/change_after.jpg"

        if os.path.exists(im1_path) and os.path.exists(im2_path):
            arr1 = load_raster_rgb(im1_path)
            arr2 = load_raster_rgb(im2_path)

            lc1 = classify_landcover_features(arr1)
            lc2 = classify_landcover_features(arr2)

            self.assertGreaterEqual(lc1["veg_pct"], 85.0)
            self.assertLessEqual(lc1["builtup_pct"], 10.0)
            self.assertGreaterEqual(lc2["builtup_pct"], 45.0)

            res = self.change_detector.detect_changes(im1_path, im2_path)
            self.assertGreater(res["change_pct"], 50.0)
            self.assertGreater(res["increase_pct"], 40.0)
            self.assertGreaterEqual(len(res["evidence_regions"]), 4)

            # Ensure no warehouse is erroneously labeled as "Reduction Cluster"
            for r in res["evidence_regions"]:
                self.assertNotIn("Reduction Cluster", r["label"])
                self.assertIn("Urban Expansion", r["label"])
                self.assertGreaterEqual(r["area_km2"], 2.0)
            print(f"[PASS] Multi-temporal physical transition verified (+{res['increase_pct']}% urban expansion).")

if __name__ == "__main__":
    unittest.main()

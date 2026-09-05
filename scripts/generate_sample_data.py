import json
import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw
import tifffile

def generate_samples():
    base_dir = Path(__file__).resolve().parent.parent
    samples_dir = base_dir / "backend" / "samples"
    uploads_dir = base_dir / "backend" / "storage" / "uploads"
    samples_dir.mkdir(parents=True, exist_ok=True)
    uploads_dir.mkdir(parents=True, exist_ok=True)

    print("Generating authentic remote sensing demo datasets...")

    # -------------------------------------------------------------
    # 1. Scenario 1: Single Optical Urban / Airport Scene (512x512)
    # -------------------------------------------------------------
    im1 = Image.new("RGB", (512, 512), color=(140, 165, 110)) # Grassland/vegetation base
    draw1 = ImageDraw.Draw(im1)
    
    # Water estuary in lower sector
    draw1.polygon([(0, 380), (180, 360), (320, 420), (512, 400), (512, 512), (0, 512)], fill=(40, 75, 110))
    
    # Urban fabric / residential grid
    for x in range(30, 220, 25):
        for y in range(40, 200, 25):
            draw1.rectangle([x, y, x + 18, y + 18], fill=(190, 180, 170), outline=(100, 95, 90))
    
    # Airport runway corridors
    draw1.rectangle([100, 240, 480, 275], fill=(70, 72, 75), outline=(180, 180, 180))
    # Runway center line dashes
    for x in range(120, 460, 30):
        draw1.line([(x, 257), (x + 15, 257)], fill=(255, 255, 255), width=2)
    # Taxiway & apron
    draw1.rectangle([220, 200, 380, 240], fill=(95, 98, 102))
    
    # Circular Industrial Tanks
    draw1.ellipse([380, 70, 430, 120], fill=(210, 215, 220), outline=(50, 50, 50), width=2)
    draw1.ellipse([440, 75, 490, 125], fill=(210, 215, 220), outline=(50, 50, 50), width=2)
    draw1.ellipse([410, 130, 460, 180], fill=(210, 215, 220), outline=(50, 50, 50), width=2)

    s1_path = samples_dir / "sample_s2_urban_airport.tif"
    s1_png = samples_dir / "sample_s2_urban_airport.png"
    arr1 = np.array(im1)
    tifffile.imwrite(s1_path, arr1, photometric='rgb')
    im1.save(s1_png)

    # -------------------------------------------------------------
    # 2. Scenario 2: Optical + SAR Co-Registered Pair (512x512)
    # -------------------------------------------------------------
    # Optical: Estuary + Bridge + Settlement, but with cloud obscuration in northern half
    im_opt = Image.new("RGB", (512, 512), color=(120, 150, 100))
    d_opt = ImageDraw.Draw(im_opt)
    # River channel across center
    d_opt.polygon([(0, 200), (200, 220), (350, 180), (512, 230), (512, 330), (340, 280), (180, 320), (0, 300)], fill=(35, 80, 125))
    # Industrial settlement in south
    for x in range(50, 460, 40):
        for y in range(350, 470, 35):
            d_opt.rectangle([x, y, x + 25, y + 20], fill=(185, 175, 165), outline=(80, 80, 80))
    # Bridge across river
    d_opt.rectangle([250, 180, 275, 310], fill=(130, 130, 130))
    
    # Cloud layer obscuring upper half (semi-transparent whitish puffs)
    cloud_mask = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    d_cloud = ImageDraw.Draw(cloud_mask)
    d_cloud.ellipse([40, 30, 320, 220], fill=(255, 255, 255, 215))
    d_cloud.ellipse([220, 10, 490, 190], fill=(255, 255, 255, 230))
    d_cloud.ellipse([140, 80, 380, 240], fill=(255, 255, 255, 190))
    im_opt_cloudy = Image.alpha_composite(im_opt.convert("RGBA"), cloud_mask).convert("RGB")
    
    s2_opt_path = samples_dir / "sample_coastal_optical.tif"
    s2_opt_png = samples_dir / "sample_coastal_optical.png"
    tifffile.imwrite(s2_opt_path, np.array(im_opt_cloudy), photometric='rgb')
    im_opt_cloudy.save(s2_opt_png)

    # SAR: C-band microwave backscatter (Grayscale intensity)
    # Clouds are completely transparent to SAR!
    # Water is dark (specular reflection away from antenna)
    # Bridge & industrial buildings are ultra-bright (corner reflector double-bounce)
    sar_arr = np.random.normal(90, 18, (512, 512)).clip(20, 250).astype(np.uint8)
    im_sar = Image.fromarray(sar_arr, mode="L")
    d_sar = ImageDraw.Draw(im_sar)
    
    # Smooth water channel (low backscatter: 10-35)
    d_sar.polygon([(0, 200), (200, 220), (350, 180), (512, 230), (512, 330), (340, 280), (180, 320), (0, 300)], fill=25)
    
    # Hidden structures under the cloud now visible in SAR:
    # A military/industrial compound in northern sector (bright double bounce: 235-255)
    for x in range(80, 280, 45):
        for y in range(50, 160, 35):
            d_sar.rectangle([x, y, x + 25, y + 20], fill=245, outline=255)
            
    # Bridge double-bounce line
    d_sar.rectangle([250, 180, 275, 310], fill=255)
    
    # Southern industrial structures
    for x in range(50, 460, 40):
        for y in range(350, 470, 35):
            d_sar.rectangle([x, y, x + 25, y + 20], fill=235)

    s2_sar_path = samples_dir / "sample_coastal_sar.tif"
    s2_sar_png = samples_dir / "sample_coastal_sar.png"
    sar_final = np.array(im_sar)
    tifffile.imwrite(s2_sar_path, sar_final)
    im_sar.save(s2_sar_png)

    # -------------------------------------------------------------
    # 3. Scenario 3: Bi-Temporal Flood & Urban Change (T1 vs T2)
    # -------------------------------------------------------------
    # T1: Baseline Pre-Monsoon (dry river, green fields, open plot)
    im_t1 = Image.new("RGB", (512, 512), color=(150, 175, 115))
    d_t1 = ImageDraw.Draw(im_t1)
    # Narrow river bed
    d_t1.polygon([(180, 0), (230, 0), (280, 512), (230, 512)], fill=(45, 90, 130))
    # Agricultural plots
    for x in range(30, 160, 35):
        for y in range(50, 450, 50):
            d_t1.rectangle([x, y, x + 30, y + 42], fill=(135, 190, 95), outline=(90, 120, 60))
    # Open vacant clearing in east
    d_t1.rectangle([340, 150, 480, 320], fill=(175, 165, 140), outline=(130, 120, 100))

    s3_t1_path = samples_dir / "sample_flood_t1_pre.tif"
    s3_t1_png = samples_dir / "sample_flood_t1_pre.png"
    tifffile.imwrite(s3_t1_path, np.array(im_t1), photometric='rgb')
    im_t1.save(s3_t1_png)

    # T2: Post-Monsoon Flood & Construction
    # River has swollen/flooded western fields, and a new commercial building was constructed in east
    im_t2 = Image.new("RGB", (512, 512), color=(140, 160, 105))
    d_t2 = ImageDraw.Draw(im_t2)
    # Widened river channel
    d_t2.polygon([(140, 0), (270, 0), (330, 512), (200, 512)], fill=(30, 70, 110))
    # Submerged flood zones in agricultural plots (dark flood water)
    for x in range(30, 160, 35):
        for y in range(120, 380, 50):
            d_t2.rectangle([x, y, x + 30, y + 42], fill=(35, 75, 115), outline=(20, 50, 80))
    # Non-submerged remaining crops
    for x in range(30, 160, 35):
        for y in [50, 400]:
            d_t2.rectangle([x, y, x + 30, y + 42], fill=(130, 185, 90), outline=(85, 115, 55))
    # New commercial industrial complex built in eastern clearing
    d_t2.rectangle([340, 150, 480, 320], fill=(205, 210, 215), outline=(60, 60, 60), width=3)
    d_t2.rectangle([360, 180, 430, 250], fill=(70, 80, 95))
    d_t2.rectangle([440, 180, 470, 290], fill=(220, 80, 60)) # Storage annexe

    s3_t2_path = samples_dir / "sample_flood_t2_post.tif"
    s3_t2_png = samples_dir / "sample_flood_t2_post.png"
    tifffile.imwrite(s3_t2_path, np.array(im_t2), photometric='rgb')
    im_t2.save(s3_t2_png)

    # -------------------------------------------------------------
    # Manifest creation
    # -------------------------------------------------------------
    manifest = {
        "samples": [
            {
                "id": "scenario_single_vqa_grounding",
                "title": "Scenario 1: Coastal Airport & Urban Complex",
                "description": "High-resolution optical scene featuring airport runways, taxiways, circular fuel tanks, and dense residential sectors. Tests VQA, Captioning, and Grounding.",
                "mode": "single",
                "sensor": "Sentinel-2 MSI Optical / Cartosat-2S Equivalent",
                "suggested_queries": [
                    "Describe the land-cover and major infrastructure in this scene.",
                    "Highlight the runway corridor and taxiway apron.",
                    "Locate all industrial storage tanks and fuel silos.",
                    "Is there a significant water body or coastline present?",
                    "What is the estimated built-up density in this image?"
                ],
                "images": [
                    {
                        "label": "Optical Raster (RGB)",
                        "filename": "sample_s2_urban_airport.tif",
                        "preview_filename": "sample_s2_urban_airport.png",
                        "modality": "optical",
                        "crs": "EPSG:32643",
                        "date": "2026-03-12"
                    }
                ]
            },
            {
                "id": "scenario_optical_sar_fusion",
                "title": "Scenario 2: Cross-Modal Estuary (Optical + SAR)",
                "description": "Co-registered pair with optical cloud obscuration. Sentinel-1 SAR penetrates cloud cover to reveal hidden structures and water boundaries. Tests Optical-SAR Fusion.",
                "mode": "cross_modal",
                "sensor": "Sentinel-2 MSI (Optical) + Sentinel-1 C-band SAR",
                "suggested_queries": [
                    "Identify water bodies and built structures through the cloud cover using optical and SAR.",
                    "Fuse optical and SAR imagery to classify urban fabric and transport links.",
                    "What structural targets are revealed by SAR double-bounce backscatter?"
                ],
                "images": [
                    {
                        "label": "Optical (Cloud Obscured)",
                        "filename": "sample_coastal_optical.tif",
                        "preview_filename": "sample_coastal_optical.png",
                        "modality": "optical",
                        "crs": "EPSG:32643",
                        "date": "2026-06-18"
                    },
                    {
                        "label": "SAR Backscatter (Penetrating)",
                        "filename": "sample_coastal_sar.tif",
                        "preview_filename": "sample_coastal_sar.png",
                        "modality": "sar",
                        "crs": "EPSG:32643",
                        "date": "2026-06-18"
                    }
                ]
            },
            {
                "id": "scenario_bitemporal_flood_change",
                "title": "Scenario 3: River Basin Flood & Development (T1 vs T2)",
                "description": "Bi-temporal monitoring pair capturing pre-monsoon baseline vs post-monsoon flood inundation and new commercial development. Tests Change-VQA and Spatial Heatmaps.",
                "mode": "bitemporal",
                "sensor": "Multi-temporal Sentinel-2 MSI",
                "suggested_queries": [
                    "What has changed between these two dates and what areas are submerged?",
                    "Where has new construction or urban development occurred?",
                    "What percentage of agricultural land was inundated by the river overflow?"
                ],
                "images": [
                    {
                        "label": "T1: Pre-Monsoon Baseline",
                        "filename": "sample_flood_t1_pre.tif",
                        "preview_filename": "sample_flood_t1_pre.png",
                        "modality": "optical",
                        "crs": "EPSG:32643",
                        "date": "2025-11-10"
                    },
                    {
                        "label": "T2: Post-Monsoon Flood & Construction",
                        "filename": "sample_flood_t2_post.tif",
                        "preview_filename": "sample_flood_t2_post.png",
                        "modality": "optical",
                        "crs": "EPSG:32643",
                        "date": "2026-08-20"
                    }
                ]
            }
        ]
    }

    manifest_path = samples_dir / "sample_manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"Generated sample datasets successfully in {samples_dir}")

if __name__ == "__main__":
    generate_samples()

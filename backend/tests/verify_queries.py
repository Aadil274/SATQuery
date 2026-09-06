import sys, os
sys.path.insert(0, os.path.abspath("."))

from fastapi.testclient import TestClient
from backend.app.main import app


client = TestClient(app)

queries = [
    ("Bi-temporal Change", "bi_temporal_mumbai", "What changed between these two dates, and where did the change occur?"),
    ("Vegetation Loss", "bi_temporal_mumbai", "Estimate the percentage of vegetation lost."),
    ("Flood Assessment", "grounding_port", "Which areas are inundated and roughly what fraction of the farmland is flooded?"),
    ("Counting Water Bodies", "grounding_port", "How many distinct water bodies are visible?"),
    ("Bridge & Infrastructure", "single_vqa_density", "Are there any vehicular bridges crossing the river?"),
    ("Optical + SAR Reasoning", "optical_sar_gujarat", "What does SAR reveal that optical does not?"),
    ("Structure Density", "single_vqa_density", "Describe this image and estimate the density of residential structures.")
]

print("=== TESTING QUERY REASONING & HEATMAP RESPONSES ===\n")
for label, sample_id, q in queries:
    resp = client.post("/api/analyze", json={"query": q, "sample_id": sample_id})
    assert resp.status_code == 200
    data = resp.json()
    headline = data["headline_answer"]
    bullets = data["bullet_points"]
    result = data.get("result") or {}
    heatmap = data.get("heatmap") or result.get("heatmap")
    regions = data.get("evidence_regions", [])
    
    print(f"[{label.upper()}]")
    print(f"Query: {q}")
    print(f"Headline: {headline}")
    print(f"Bullet count: {len(bullets)}")
    for b in bullets[:2]:
        print(f"  * {b}")
    h_title = heatmap.get("title") if heatmap else "None"
    h_pal = heatmap.get("palette") if heatmap else "None"
    print(f"Heatmap: {h_title} (Palette: {h_pal})")
    print(f"Regions: {len(regions)}")
    print("-" * 60)

print("\nAll diverse queries tested successfully!")

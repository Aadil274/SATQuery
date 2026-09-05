import re

with open("scratch_bundle.py", "r") as f:
    pass

url = "https://geo-query-flow.preview.emergentagent.com/static/js/bundle.js"
import urllib.request
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    content = resp.read().decode('utf-8', errors='ignore')

# Search for API endpoints
endpoints = set(re.findall(r'\"/(?:api/)[^\"]+\"', content))
print("Endpoints:", endpoints)

# Search for quotes with keywords
keywords = ['SatQuery', 'Query', 'Agentic', 'Workflow', 'Execution Summary', 'Change Detection', 'Optical', 'SAR', 'Grounding', 'BigEarthNet', 'RSVQA', 'VRSBench', 'CDVQA', 'Confidence', 'Trace', 'Model Registry', 'GeoTIFF']
found_phrases = set()
for kw in keywords:
    matches = re.findall(rf'\"([^\"]*?{kw}[^\"]*?)\"', content, re.IGNORECASE)
    for m in matches:
        if 4 < len(m) < 80:
            found_phrases.add(m)

print(f"\nFound {len(found_phrases)} phrases. Sample:")
for p in sorted(list(found_phrases))[:60]:
    print("  *", p)

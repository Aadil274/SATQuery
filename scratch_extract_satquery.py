with open("scratch_bundle.py", "r") as f:
    pass

url = "https://geo-query-flow.preview.emergentagent.com/static/js/bundle.js"
import urllib.request
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    content = resp.read().decode('utf-8', errors='ignore')

idx = content.find("./src/pages/SatQuery.jsx")
print("Found at index:", idx)
if idx != -1:
    snippet = content[idx:idx+25000]
    with open("extracted_satquery.js", "w", encoding="utf-8") as f_out:
        f_out.write(snippet)
    print("Saved 25000 chars of SatQuery.jsx to extracted_satquery.js")

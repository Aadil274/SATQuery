import re

with open("scratch_bundle.py", "r") as f:
    pass

url = "https://geo-query-flow.preview.emergentagent.com/static/js/bundle.js"
import urllib.request
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    content = resp.read().decode('utf-8', errors='ignore')

modules = set(re.findall(r'\"(\./src/[^\"]+)\"', content))
print("Found components in emergentagent bundle:")
for m in sorted(list(modules)):
    print(" ", m)

import os
import re
import urllib.request

url = "https://geo-query-flow.preview.emergentagent.com/static/js/bundle.js"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    content = resp.read().decode('utf-8', errors='ignore')

os.makedirs("reference_app", exist_ok=True)

pattern = re.compile(r'/\*\*\*/\s*\"(\./src/[^\"]+)\"')
matches = list(pattern.finditer(content))
print(f"Found {len(matches)} modules in bundle")

# Extract CSS
idx = content.find("sq-glass")
while idx != -1:
    if "backdrop-filter" in content[idx:idx+200]:
        break
    idx = content.find("sq-glass", idx + 100)

if idx != -1:
    s_idx = content.rfind('push([module.id, "', 0, idx)
    e_idx = content.find('", ""]', idx)
    if s_idx != -1 and e_idx != -1:
        raw_css = content[s_idx + len('push([module.id, "') : e_idx]
        # replace escaped newlines and quotes
        clean_css = raw_css.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
        with open("reference_app/extracted_styles.css", "w", encoding="utf-8") as f:
            f.write(clean_css)
        print(f"Extracted CSS: {len(clean_css)} chars")




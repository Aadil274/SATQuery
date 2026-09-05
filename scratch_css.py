import urllib.request
import re

url = "https://geo-query-flow.preview.emergentagent.com/static/js/bundle.js"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    content = resp.read().decode('utf-8', errors='ignore')

idx = content.find("./src/index.css")
if idx != -1:
    print(content[idx:idx+3000])

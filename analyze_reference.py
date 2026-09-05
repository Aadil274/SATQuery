import os
import re

files = [
    "components_Header.jsx",
    "components_LeftPanel.jsx",
    "components_RightPanel.jsx",
    "components_Viewer.jsx",
    "components_BottomDock.jsx",
    "components_CompareModal.jsx",
    "components_HistoryDrawer.jsx",
    "lib_demoData.js",
    "lib_report.js"
]

for fname in files:
    fpath = os.path.join("reference_app", fname)
    if os.path.exists(fpath):
        with open(fpath, "r", encoding="utf-8") as f:
            text = f.read()
        print("=" * 60)
        print("FILE:", fname, f"({len(text)} bytes)")
        # Extract readable string literals
        strings = re.findall(r'\"([A-Za-z0-9\s\-\:\.\,\/]{4,50})\"', text)
        print("Key strings:", list(set(strings))[:25])

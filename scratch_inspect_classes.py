import re

def inspect_file(filename):
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    print("=" * 60)
    print("FILE:", filename)
    # find className strings
    classes = re.findall(r'className:\s*\"([^\"]+)\"', content)
    print("ClassNames sample:", list(set(classes))[:15])

for fn in ["reference_app/components_Header.jsx", "reference_app/components_LeftPanel.jsx", "reference_app/components_Viewer.jsx", "reference_app/components_RightPanel.jsx", "reference_app/components_BottomDock.jsx"]:
    inspect_file(fn)

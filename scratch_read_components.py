import re

def clean_and_print(filename, max_lines=120):
    with open(filename, "r", encoding="utf-8") as f:
        text = f.read()
    
    # Extract string literals and JSX structure
    jsx_chunks = re.findall(r'children:\s*\[?(.*?)\]?,?\s*[\"\'\w\-]+:', text, re.DOTALL)
    print("=" * 60)
    print("FILE:", filename)
    print(text[:1500])

clean_and_print("reference_app/components_Header.jsx")
clean_and_print("reference_app/components_LeftPanel.jsx")

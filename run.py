import os
import sys
import uvicorn

# Ensure project root is in sys.path
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f'Starting SatQuery AI server on 0.0.0.0:{port}...')
    uvicorn.run('backend.app.main:app', host='0.0.0.0', port=port)

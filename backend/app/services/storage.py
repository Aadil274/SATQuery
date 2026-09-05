import json
from pathlib import Path
from typing import Dict, Any, Optional, List
from backend.app.core.config import STORAGE_DIR

class StorageService:
    """In-memory and JSON-backed persistence for images, queries, and traces."""
    
    def __init__(self):
        self.images: Dict[str, Dict[str, Any]] = {}
        self.queries: Dict[str, Dict[str, Any]] = {}
        self.history: List[Dict[str, Any]] = []
        self._db_file = STORAGE_DIR / "state_db.json"
        self._load_state()

    def _load_state(self):
        if self._db_file.exists():
            try:
                with open(self._db_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.images = data.get("images", {})
                    self.queries = data.get("queries", {})
                    self.history = data.get("history", [])
            except Exception:
                pass

    def _save_state(self):
        try:
            with open(self._db_file, "w", encoding="utf-8") as f:
                json.dump({
                    "images": self.images,
                    "queries": self.queries,
                    "history": self.history[-100:] # Keep latest 100
                }, f, indent=2)
        except Exception:
            pass

    def save_image(self, image_id: str, metadata: Dict[str, Any]):
        self.images[image_id] = metadata
        self._save_state()

    def get_image(self, image_id: str) -> Optional[Dict[str, Any]]:
        return self.images.get(image_id)

    def save_query(self, request_id: str, query_data: Dict[str, Any]):
        self.queries[request_id] = query_data
        # Prepend to history
        self.history.insert(0, {
            "request_id": request_id,
            "task_type": query_data.get("task_type"),
            "query_text": query_data.get("query_text"),
            "confidence_score": query_data.get("confidence", {}).get("score"),
            "created_at": query_data.get("created_at")
        })
        self._save_state()

    def get_query(self, request_id: str) -> Optional[Dict[str, Any]]:
        return self.queries.get(request_id)

    def get_history(self) -> List[Dict[str, Any]]:
        return self.history

storage_service = StorageService()

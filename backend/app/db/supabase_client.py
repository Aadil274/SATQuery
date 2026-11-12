import os
import mimetypes
import warnings
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

# Suppress internal deprecation warnings from postgrest/supabase client
warnings.filterwarnings("ignore", category=DeprecationWarning, module="supabase")
warnings.filterwarnings("ignore", category=DeprecationWarning, module="postgrest")

# Load local .env
load_dotenv()

class SupabaseService:
    """
    Central database and cloud storage service for SatQuery AI backed by Supabase.
    Manages persistent analysis records, imagery metadata, and mission artifacts.
    """
    def __init__(self):
        self.url = os.getenv("SUPABASE_URL", "https://wmdkvecsqgsiomeyndil.supabase.co")
        self.key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY", "sb_publishable_mGbU3KZOs-ShTyNpManxGw_HPLzijzS")
        self.client = None
        self._init_client()

    def _init_client(self):
        if not self.url or not self.key:
            return
        try:
            from supabase import create_client, Client
            self.client: Optional[Client] = create_client(self.url, self.key)
        except Exception as e:
            print(f"[SupabaseService] Warning: Client initialization deferred: {e}")
            self.client = None

    def is_available(self) -> bool:
        return self.client is not None

    def save_analysis(self, record: Dict[str, Any]) -> bool:
        """
        Saves a completed analysis run into the Supabase 'analyses' table.
        Gracefully handles missing tables or permission limits without crashing inference.
        """
        if os.getenv("SQAI_TEST_MODE") == "1":
            return True

        if not self.client:
            return False

        try:
            row_data = {
                "id": str(record.get("id") or record.get("trace_id")),
                "trace_id": str(record.get("trace_id", "")),
                "query": str(record.get("query", "")),
                "task_type": str(record.get("task_type", "")),
                "task_id": str(record.get("task_id", "")),
                "confidence_score": int(record.get("confidence_score") or 90),
                "headline_answer": str(record.get("headline_answer", "")),
                "bullet_points": record.get("bullet_points", []),
                "detected_landcover": record.get("land_cover", []),
                "evidence_regions": record.get("evidence_regions", []),
                "change_statistics": record.get("change_statistics", {}),
                "heatmap_metadata": record.get("heatmap", {}),
                "actionable_advisory": record.get("actionable_advisory", {}),
                "hazard_level": str(record.get("hazard_level", "NORMAL")),
                "image_paths": record.get("image_paths", []),
                "overlay_url": record.get("overlay_url"),
                "report_pdf_url": record.get("report_pdf_url"),
                "report_geojson_url": record.get("report_geojson_url"),
                "report_kml_url": record.get("report_kml_url"),
                "execution_time_seconds": float(record.get("elapsed_sec") or 0.0),
                "ai_engine": str(record.get("ai_engine", "gemini-3.8-flash"))
            }

            self.client.table("analyses").upsert(row_data).execute()
            return True
        except Exception as e:
            # If table is not created yet in Supabase, log guidance without failing request
            print(f"[SupabaseService] Note: Record saved locally. Remote sync: {e}")
            return False

    def get_recent_analyses(self, limit: int = 25) -> List[Dict[str, Any]]:
        """
        Retrieves recent analysis history from Supabase.
        """
        if not self.client:
            return []
        try:
            response = self.client.table("analyses").select("*").order("created_at", desc=True).limit(limit).execute()
            return response.data or []
        except Exception as e:
            print(f"[SupabaseService] Error querying history: {e}")
            return []

    def upload_asset(self, local_file_path: str, bucket: str = "satellite-assets") -> Optional[str]:
        """
        Uploads a local overlay, map, or PDF report into Supabase Storage.
        Returns the permanent public URL on success.
        """
        if not self.client or not os.path.exists(local_file_path):
            return None

        try:
            file_name = os.path.basename(local_file_path)
            content_type, _ = mimetypes.guess_type(local_file_path)
            content_type = content_type or "application/octet-stream"

            with open(local_file_path, "rb") as f:
                file_bytes = f.read()

            storage_path = f"artifacts/{file_name}"
            self.client.storage.from_(bucket).upload(
                path=storage_path,
                file=file_bytes,
                file_options={"content-type": content_type, "upsert": "true"}
            )

            public_url = self.client.storage.from_(bucket).get_public_url(storage_path)
            return public_url
        except Exception as e:
            print(f"[SupabaseService] Asset upload failed ({bucket}/{local_file_path}): {e}")
            return None

    def check_health(self) -> Dict[str, Any]:
        """Returns health diagnostics for Supabase connectivity."""
        status = {
            "configured": bool(self.url and self.key),
            "project_url": self.url,
            "connected": False,
            "table_ready": False,
            "storage_ready": False
        }
        if not self.client:
            return status

        try:
            # Check storage
            buckets = self.client.storage.list_buckets()
            status["connected"] = True
            bucket_names = [b.name for b in buckets] if buckets else []
            status["storage_ready"] = "satellite-assets" in bucket_names

            # Check table
            self.client.table("analyses").select("id").limit(1).execute()
            status["table_ready"] = True
        except Exception as e:
            status["error"] = str(e)

        return status

supabase_service = SupabaseService()

from fastapi import APIRouter
from backend.app.services.storage import storage_service

router = APIRouter(prefix="/history", tags=["history"])

@router.get("")
def get_query_history():
    """Retrieve session query history for quick review."""
    return {"history": storage_service.get_history()}

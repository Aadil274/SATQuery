from fastapi import APIRouter
from backend.app.controller.registry import get_registry_list

router = APIRouter(prefix="/registry", tags=["registry"])

@router.get("")
def list_models():
    """Lists all registered remote-sensing specialist models, capabilities, and benchmark scores."""
    return {"models": get_registry_list()}

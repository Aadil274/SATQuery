from fastapi import APIRouter, HTTPException
from backend.app.models_schema.query import QuerySubmitRequest, QueryResponse
from backend.app.services.storage import storage_service
from backend.app.controller.orchestrator import orchestrator

router = APIRouter(prefix="/query", tags=["query"])

@router.post("", response_model=QueryResponse)
def submit_query(req: QuerySubmitRequest):
    """Submits a natural language query for single-image, bi-temporal, or cross-modal satellite analysis."""
    metadata_list = []
    for img_id in req.image_ids:
        meta = storage_service.get_image(img_id)
        if not meta:
            raise HTTPException(status_code=404, detail=f"Image ID '{img_id}' not found in session storage")
        metadata_list.append(meta)

    # Dispatch to the Agentic Controller
    response = orchestrator.process_query(
        request=req,
        image_metadata_list=metadata_list
    )

    # Persist query and response for history/reports
    storage_service.save_query(response.request_id, response.model_dump())

    return response

@router.get("/{request_id}", response_model=QueryResponse)
def get_query_result(request_id: str):
    """Retrieve past query execution result and trace by request ID."""
    result = storage_service.get_query(request_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Query '{request_id}' not found")
    return QueryResponse(**result)

from pathlib import Path
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from backend.app.core.config import REPORTS_DIR
from backend.app.services.storage import storage_service
from backend.app.services.report_gen import generate_pdf_report

router = APIRouter(prefix="/report", tags=["report"])

@router.get("/{request_id}")
def download_report(request_id: str):
    """Download executive PDF briefing report for a specific query request."""
    query_data = storage_service.get_query(request_id)
    if not query_data:
        raise HTTPException(status_code=404, detail="Analysis record not found")

    pdf_filename = f"SatQuery_Report_{request_id}.pdf"
    pdf_path = str(REPORTS_DIR / pdf_filename)
    
    if not Path(pdf_path).exists():
        generate_pdf_report(query_data, pdf_path)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=pdf_filename
    )

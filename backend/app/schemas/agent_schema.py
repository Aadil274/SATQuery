from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class TaskType(str, Enum):
    CHANGE_DETECTION = "Change Detection (Bi-temporal)"
    SINGLE_IMAGE_VQA = "Single-Image VQA"
    CAPTIONING = "Land-Cover Captioning"
    GROUNDING = "Visual Grounding"
    OPTICAL_SAR = "Optical + SAR Analysis"

class WorkflowStepStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class WorkflowStep(BaseModel):
    step_num: int
    title: str
    description: str
    status: WorkflowStepStatus = WorkflowStepStatus.COMPLETED
    details: Optional[str] = None

class ExecutionSummary(BaseModel):
    task: str = "Pending"
    input_type: str = "Unknown"
    models_used: List[str] = Field(default_factory=lambda: [])
    parameters: Dict[str, Any] = Field(default_factory=lambda: {})
    confidence: str = "0%"
    confidence_value: float = 0.0
    time_taken: str = "0.00 seconds"
    status: str = "Pending"
    timestamp: str = ""

class EvidenceRegion(BaseModel):
    id: str
    label: str
    bbox: List[float] = Field(..., description="[ymin, xmin, ymax, xmax] normalized to [0, 1]")
    area_km2: float
    category: str = Field("increase", description="increase | decrease | moderate | feature")
    color: str = Field("#ef4444", description="Hex color")
    confidence: float = 0.92
    box: Optional[List[float]] = None  # [x, y, w, h]
    type: Optional[str] = None  # "change" | "object" | "water" | "builtup" | "target"
    note: Optional[str] = None

class ImageCardInfo(BaseModel):
    title: str
    date: str
    sensor_badge: str
    image_url: str
    modality: str

class InputInformation(BaseModel):
    before_image: Optional[Dict[str, str]] = None
    after_image: Optional[Dict[str, str]] = None
    location: str = "Unknown"
    resolution: str = "Unknown"
    area: str = "Unknown"

class AnalysisRequest(BaseModel):
    query: str
    sample_id: Optional[str] = None
    custom_images: Optional[List[str]] = None
    threshold: Optional[float] = 0.35
    min_area_km2: Optional[float] = 0.01
    task_override: Optional[TaskType] = None
    images: Optional[List[Dict[str, Any]]] = None

class AnalysisResponse(BaseModel):
    query: str
    task_type: str
    status: str = "Completed"
    input_count: str = "0 Images"
    headline_answer: str
    bullet_points: List[str]
    confidence_score: int
    workflow_steps: List[WorkflowStep]
    execution_summary: ExecutionSummary
    input_information: InputInformation
    image_cards: List[ImageCardInfo]
    evidence_regions: List[EvidenceRegion]
    change_statistics: Optional[Dict[str, Any]] = None
    trace_id: str
    report_pdf_url: str
    report_json_url: str
    # Reference format compatibility fields
    id: Optional[str] = None
    session_id: Optional[str] = None
    task: Optional[str] = None
    intent: Optional[str] = None
    validation: Optional[Dict[str, Any]] = None
    plan: Optional[Dict[str, Any]] = None
    result: Optional[Dict[str, Any]] = None
    confidence: Optional[Dict[str, Any]] = None
    trace: Optional[List[Dict[str, Any]]] = None
    elapsed_sec: Optional[float] = None
    heatmap: Optional[Dict[str, Any]] = None



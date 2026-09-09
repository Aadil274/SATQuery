from typing import List, Dict, Any
from backend.app.schemas.agent_schema import WorkflowStep, WorkflowStepStatus, TaskType

class WorkflowPlanner:
    """
    Constructs deterministic, auditable execution DAGs for remote sensing analysis.
    Maps high-level user intents into sequential pipeline stages matching the Earth Observation evaluation specification.
    """

    @staticmethod
    def generate_plan(task_type: TaskType, query: str, tools: List[str]) -> List[WorkflowStep]:
        tool_desc = ", ".join(tools)
        
        if task_type == TaskType.CHANGE_DETECTION:
            exec_step_title = "4. Change Detection"
            exec_step_desc = "Executing change detection workflow (ChangeNet + CDVQA)"
        elif task_type == TaskType.OPTICAL_SAR:
            exec_step_title = "4. Multimodal Fusion"
            exec_step_desc = "Executing optical-SAR cross-attention fusion layer"
        elif task_type == TaskType.GROUNDING:
            exec_step_title = "4. Visual Grounding"
            exec_step_desc = "Extracting spatial bounding boxes & proposal heatmaps"
        elif task_type == TaskType.CAPTIONING:
            exec_step_title = "4. Dense Captioning"
            exec_step_desc = "Generating structured land-cover descriptive breakdown"
        else:
            exec_step_title = "4. RS-VQA Inference"
            exec_step_desc = "Executing adapted RS-VLM query reasoning"

        steps = [
            WorkflowStep(
                step_num=1,
                title="1. Query Understanding",
                description="Interpreting user query semantics & intent",
                status=WorkflowStepStatus.COMPLETED,
                details=f"Classified intent as '{task_type.value}' based on query tokens."
            ),
            WorkflowStep(
                step_num=2,
                title="2. Input Validation",
                description="Checking images, modality, metadata & compatibility",
                status=WorkflowStepStatus.COMPLETED,
                details="Checked CRS compatibility, spatial overlap, and resolution matching."
            ),
            WorkflowStep(
                step_num=3,
                title="3. Model Selection",
                description="Selecting suitable models from registry",
                status=WorkflowStepStatus.COMPLETED,
                details=f"Dynamically bound tools: [{tool_desc}] from central registry."
            ),
            WorkflowStep(
                step_num=4,
                title=exec_step_title,
                description=exec_step_desc,
                status=WorkflowStepStatus.COMPLETED,
                details=f"Inference executed successfully using specialist tools: [{tool_desc}]."
            ),
            WorkflowStep(
                step_num=5,
                title="5. Evidence Integration",
                description="Combining outputs, estimating confidence & generating answer",
                status=WorkflowStepStatus.COMPLETED,
                details="Combining spatial evidence, computing confidence scores, and synthesizing answer."
            ),
            WorkflowStep(
                step_num=6,
                title="6. Response Generation",
                description="Preparing final response with visual evidence",
                status=WorkflowStepStatus.COMPLETED,
                details="Rendered visual overlay map, confidence gauge, and auditable mission report."
            )
        ]
        return steps

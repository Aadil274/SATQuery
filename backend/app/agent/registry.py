from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
import os

class Tuple_Validation:
    def __init__(self, valid: bool, message: str = ""):
        self.valid = valid
        self.message = message

class RemoteSensingTool(ABC):
    """
    Abstract base class for all SatQuery AI Remote Sensing Specialist Tools.
    Enforces a strict contract: validation, execution, confidence scoring, and spatial evidence extraction.
    """
    name: str = "base_tool"
    description: str = "Base remote sensing specialist tool"
    supported_inputs: List[str] = ["single", "bi_temporal", "optical_sar"]
    model_name: str = "RS-Specialist"

    @abstractmethod
    def validate(self, inputs: Dict[str, Any]) -> Tuple_Validation:
        """Validates that input rasters, parameters, and metadata meet tool criteria."""
        pass

    @abstractmethod
    def execute(self, inputs: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Executes the specialized remote-sensing inference or algorithm."""
        pass

    @abstractmethod
    def confidence(self, output: Dict[str, Any]) -> float:
        """Calculates quantitative confidence score (0.0 to 1.0) based on model logits and evidence consistency."""
        pass

    @abstractmethod
    def evidence(self, output: Dict[str, Any]) -> Dict[str, Any]:
        """Extracts spatial evidence (bounding boxes, change masks, heatmaps, region metrics)."""
        pass

class ToolRegistry:
    """
    Central dynamic Tool & Model Registry for SatQuery AI.
    Allows dynamic discovery, capability inspection, and execution by the Agentic Controller.
    """
    def __init__(self):
        self._tools: Dict[str, RemoteSensingTool] = {}

    def register(self, tool: RemoteSensingTool) -> None:
        self._tools[tool.name] = tool

    def get(self, name: str) -> Optional[RemoteSensingTool]:
        return self._tools.get(name)

    def list_tools(self) -> List[Dict[str, Any]]:
        return [
            {
                "name": tool.name,
                "description": tool.description,
                "supported_inputs": tool.supported_inputs,
                "model_name": tool.model_name
            }
            for tool in self._tools.values()
        ]

# Global singleton registry
tool_registry = ToolRegistry()

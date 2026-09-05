export interface ImageMetadata {
  image_id: string;
  filename: string;
  format: string;
  width: number;
  height: number;
  bands: number;
  modality: 'optical' | 'sar' | 'multispectral';
  crs?: string;
  bounds?: number[];
  acquisition_date?: string;
  checksum?: string;
  preview_url?: string;
}

export interface ModelInvoked {
  model_id: string;
  model_name: string;
  version: string;
  task_specialty: string;
  architecture: string;
  benchmark_score: Record<string, any>;
  endpoint_type: string;
}

export interface InputValidationTrace {
  input_count: number;
  modalities_detected: string[];
  crs_aligned: boolean;
  spatial_coverage_overlap: number;
  format_verified: boolean;
}

export interface ExecutionTrace {
  trace_id: string;
  timestamp: string;
  task_classified: string;
  classification_method: string;
  classification_confidence: number;
  input_validation: InputValidationTrace;
  routing_rationale: string;
  models_invoked: ModelInvoked[];
  permitted_parameters_used: Record<string, any>;
  execution_latency_ms: number;
  confidence_calibration: Record<string, any>;
}

export interface VisualEvidence {
  overlay_url?: string;
  overlay_type: 'grounding_boxes' | 'change_diff_heatmap' | 'sar_optical_fused' | 'scene_captioning' | 'vqa_focus';
  features?: any[];
  legend?: Record<string, string>;
  summary_stats?: Record<string, any>;
}

export interface ConfidenceDetail {
  score: number;
  level: 'HIGH' | 'MODERATE' | 'LOW';
  calibration_metric: string;
  low_confidence_warning: boolean;
  warning_message?: string;
  factors?: Record<string, number>;
}

export interface QueryResponse {
  request_id: string;
  status: string;
  task_type: string;
  query_text: string;
  answer_text: string;
  confidence: ConfidenceDetail;
  visual_evidence?: VisualEvidence;
  execution_trace: ExecutionTrace;
  report_url?: string;
  created_at: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  mode: 'single' | 'cross_modal' | 'bitemporal';
  sensor: string;
  suggested_queries: string[];
  images: {
    label: string;
    filename: string;
    preview_filename: string;
    modality: 'optical' | 'sar' | 'multispectral';
    crs: string;
    date: string;
  }[];
}

export interface ModelRegistryEntry {
  model_id: string;
  name: string;
  version: string;
  tasks: string[];
  input_modalities: string[];
  min_images: number;
  max_images: number;
  architecture: string;
  benchmark_scores: Record<string, any>;
  permitted_parameters: Record<string, any>;
}

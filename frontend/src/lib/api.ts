// API client for SatQuery AI backend
const API_BASE = '/api';

export function dimsFromUrl(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 512, height: img.naturalHeight || 512 });
    img.onerror = () => resolve({ width: 512, height: 512 });
    img.src = url;
  });
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = (reader.result as string) || '';
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function imageDims(base64: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 512, height: img.naturalHeight || 512 });
    img.onerror = () => resolve({ width: 512, height: 512 });
    img.src = `data:image/jpeg;base64,${base64}`;
  });
}

export interface ImageSlot {
  name: string;
  preview: string;
  url?: string;
  base64?: string | null;
  width?: number;
  height?: number;
  modality: 'optical' | 'sar';
  timestamp: string;
  meta: Record<string, string>;
}

export interface EvidenceRegionData {
  id: string;
  type: string;
  label: string;
  note?: string;
  box: [number, number, number, number]; // [x, y, w, h] normalized 0..1
  confidence: number;
}

export interface AnalysisResponseData {
  id: string;
  session_id?: string;
  query: string;
  task: 'vqa' | 'caption' | 'grounding' | 'change' | 'cross_modal' | string;
  task_type?: string;
  intent?: string;
  validation?: {
    valid: boolean;
    checks: Array<{ label: string; value: string; pass: boolean }>;
    count: number;
    modalities: string[];
    relationship: string;
  };
  plan?: {
    task: string;
    task_label: string;
    inputs: string[];
    models: string[];
    parameters: Record<string, any>;
  };
  result?: {
    answer?: string;
    caption?: string;
    fusion_insight?: string;
    primary_changes?: string[];
    land_cover?: string[];
    evidence_regions?: EvidenceRegionData[];
    change_percentage?: number;
    affected_area?: string;
  };
  confidence?: {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    percent: number;
    breakdown: Record<string, string>;
  };
  trace?: Array<{
    label: string;
    status: 'done' | 'warn' | 'error';
    detail?: string;
    ms: number;
  }>;
  elapsed_sec?: number;
  headline_answer?: string;
  bullet_points?: string[];
  confidence_score?: number;
  trace_id?: string;
  report_pdf_url?: string;
  report_json_url?: string;
  error?: string;
}

export async function analyze(payload: {
  query: string;
  images: Array<{
    name: string;
    modality: string;
    timestamp: string;
    base64?: string | null;
    url?: string;
    width?: number;
    height?: number;
  }>;
}): Promise<AnalysisResponseData> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Analysis failed (${res.status}): ${errorText}`);
  }
  return res.json();
}

export async function getRegistry(): Promise<{
  registry: Record<string, any>;
  model_info: any;
  models: any[];
}> {
  const res = await fetch(`${API_BASE}/registry`);
  if (!res.ok) {
    throw new Error('Failed to fetch registry');
  }
  return res.json();
}

export async function getBenchmarks(): Promise<any> {
  const res = await fetch(`${API_BASE}/datasets/benchmarks/all`);
  if (!res.ok) return null;
  return res.json();
}

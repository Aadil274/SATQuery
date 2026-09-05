import type { ImageMetadata, QueryResponse, Scenario, ModelRegistryEntry } from '../types';

const API_BASE = '/api';

export const api = {
  async fetchSamples(): Promise<Scenario[]> {
    const res = await fetch(`${API_BASE}/images/samples`);
    if (!res.ok) throw new Error('Failed to fetch demo scenarios');
    const data = await res.json();
    return data.samples || [];
  },

  async loadScenario(scenarioId: string): Promise<{ scenario: Scenario; loaded_images: ImageMetadata[] }> {
    const res = await fetch(`${API_BASE}/images/samples/load/${scenarioId}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to load scenario dataset');
    return res.json();
  },

  async uploadImage(file: File, modalityHint = 'optical'): Promise<ImageMetadata> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('modality_hint', modalityHint);

    const res = await fetch(`${API_BASE}/images/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    if (!data.is_valid) throw new Error(data.reasons?.join(', ') || 'Validation failed');
    return data.metadata;
  },

  async validatePair(img1Id: string, img2Id: string, pairType: string) {
    const res = await fetch(`${API_BASE}/images/validate-pair`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_id_1: img1Id,
        image_id_2: img2Id,
        pair_type: pairType,
      }),
    });
    if (!res.ok) throw new Error('Pair validation failed');
    return res.json();
  },

  async submitQuery(
    imageIds: string[],
    queryText: string,
    taskOverride?: string,
    parameters?: Record<string, any>
  ): Promise<QueryResponse> {
    const res = await fetch(`${API_BASE}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_ids: imageIds,
        query_text: queryText,
        task_override: taskOverride || null,
        parameters: parameters || {},
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Analysis failed' }));
      throw new Error(err.detail || 'Query processing failed');
    }
    return res.json();
  },

  async fetchRegistry(): Promise<ModelRegistryEntry[]> {
    const res = await fetch(`${API_BASE}/registry`);
    if (!res.ok) throw new Error('Failed to fetch model registry');
    const data = await res.json();
    return data.models || [];
  },

  async fetchHistory() {
    const res = await fetch(`${API_BASE}/history`);
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  },
};

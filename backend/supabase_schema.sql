-- ==============================================================================
-- SatQuery AI: Supabase Database & Storage Setup Schema
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- Project: wmdkvecsqgsiomeyndil
-- ==============================================================================

-- 1. Create Analyses Table
CREATE TABLE IF NOT EXISTS public.analyses (
    id TEXT PRIMARY KEY,
    trace_id TEXT,
    query TEXT NOT NULL,
    task_type TEXT NOT NULL,
    task_id TEXT NOT NULL,
    confidence_score INTEGER,
    headline_answer TEXT NOT NULL,
    bullet_points JSONB DEFAULT '[]'::jsonb,
    detected_landcover JSONB DEFAULT '[]'::jsonb,
    evidence_regions JSONB DEFAULT '[]'::jsonb,
    change_statistics JSONB DEFAULT '{}'::jsonb,
    heatmap_metadata JSONB DEFAULT '{}'::jsonb,
    actionable_advisory JSONB DEFAULT '{}'::jsonb,
    hazard_level TEXT DEFAULT 'NORMAL',
    image_paths JSONB DEFAULT '[]'::jsonb,
    overlay_url TEXT,
    report_pdf_url TEXT,
    report_geojson_url TEXT,
    report_kml_url TEXT,
    execution_time_seconds NUMERIC,
    ai_engine TEXT DEFAULT 'gemini-3.8-flash',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row-Level Security (RLS) on analyses
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous & authenticated users to read and insert analyses
CREATE POLICY "Allow public select on analyses"
    ON public.analyses
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow public insert on analyses"
    ON public.analyses
    FOR INSERT
    TO public
    WITH CHECK (true);

-- 3. Create Storage Bucket for Satellite Rasters & Mission Overlays
INSERT INTO storage.buckets (id, name, public)
VALUES ('satellite-assets', 'satellite-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read & write access to satellite-assets bucket
CREATE POLICY "Public Access to satellite-assets"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'satellite-assets');

CREATE POLICY "Public Upload to satellite-assets"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'satellite-assets');

CREATE POLICY "Public Update to satellite-assets"
    ON storage.objects
    FOR UPDATE
    TO public
    USING (bucket_id = 'satellite-assets');

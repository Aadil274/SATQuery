import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Download,
  FileText,
  Code
} from 'lucide-react';
import { ImageSlot, AnalysisResponseData } from '../lib/api';
import { SUGGESTED } from '../lib/demoData';
import { downloadReport } from '../lib/report';

interface RightPanelProps {
  slots: ImageSlot[];
  analysis: AnalysisResponseData | null;
  running: boolean;
  onAnalyze: (query: string) => void;
}

const CONF_STYLES = {
  HIGH: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-500/50',
    bar: '#00E676'
  },
  MEDIUM: {
    text: 'text-amber-400',
    bg: 'bg-amber-950/60',
    border: 'border-amber-500/50',
    bar: '#FFB300'
  },
  LOW: {
    text: 'text-rose-400',
    bg: 'bg-rose-950/60',
    border: 'border-rose-500/50',
    bar: '#FF1744'
  }
};

export const RightPanel: React.FC<RightPanelProps> = ({
  slots,
  analysis,
  running,
  onAnalyze
}) => {
  const [query, setQuery] = useState('');

  // Listen to global preset query events
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => setQuery(e.detail);
    window.addEventListener('sq-set-query' as any, handler);
    return () => window.removeEventListener('sq-set-query' as any, handler);
  }, []);

  const suggestions =
    slots.length < 2
      ? SUGGESTED.single
      : slots.some((s) => s.modality === 'sar')
      ? SUGGESTED.pair_modal
      : SUGGESTED.pair_optical;

  const handleSubmit = () => {
    if (query.trim() && slots.length && !running) {
      onAnalyze(query.trim());
    }
  };

  const r = analysis?.result;
  const c = analysis?.confidence || {
    level: ((analysis?.confidence_score || 90) >= 85 ? 'HIGH' : 'MEDIUM') as 'HIGH' | 'MEDIUM',
    percent: analysis?.confidence_score || 92,
    breakdown: {
      'Model agreement': '94%',
      'Grounding IoU': '89%',
      'Sensor resolution': '95%',
      'Temporal baseline': '92%'
    }
  };

  const confStyle = CONF_STYLES[c.level] || CONF_STYLES.HIGH;
  const answer = r?.answer || r?.caption || r?.fusion_insight || analysis?.headline_answer;

  return (
    <aside
      data-testid="right-panel"
      className="w-[380px] shrink-0 h-full sq-glass border-l border-cyan-500/15 flex flex-col select-none"
    >
      {/* SECTION 1: Natural-Language Query Input */}
      <div className="p-4 border-b border-cyan-500/15">
        <div className="telemetry mb-2 flex items-center gap-1.5 text-cyan-400/80">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7300]" />
          <span>NATURAL-LANGUAGE QUERY</span>
        </div>

        <div className="relative">
          <textarea
            data-testid="query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={2}
            placeholder={slots.length ? 'Ask about the imagery…' : 'Load imagery first…'}
            disabled={!slots.length}
            className="w-full resize-none rounded-lg bg-[#0B0E14] border border-cyan-500/25 focus:border-cyan-400 focus:sq-glow outline-none p-3 pr-11 text-xs text-slate-100 placeholder:text-slate-600 disabled:opacity-50 font-sans"
          />

          <button
            data-testid="analyze-button"
            onClick={handleSubmit}
            disabled={!query.trim() || !slots.length || running}
            className="sq-btn absolute right-2 bottom-2.5 w-7 h-7 rounded-md bg-[#FF7300] hover:bg-[#ff8826] text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {running ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Query Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {suggestions.map((s, i) => (
            <button
              key={i}
              data-testid={`suggestion-${i}`}
              onClick={() => setQuery(s)}
              className="sq-btn text-xs px-2.5 py-1 rounded-full border border-cyan-500/20 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/50 bg-cyan-500/5 transition-all text-left"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: Dynamic Findings & Execution Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* State A: Idle guidance */}
        {!analysis && !running && (
          <div className="text-center py-12 px-4">
            <Cpu className="w-10 h-10 text-cyan-500/25 mx-auto mb-3" />
            <h4 className="font-head text-sm font-bold text-slate-300">
              Autonomous Multimodal Agent Ready
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              SatQuery AI will parse your query, select specialized models, ground evidence bounding boxes, and deliver an auditable inference chain.
            </p>
          </div>
        )}

        {/* State B: Running animation */}
        {running && (
          <div className="flex items-center gap-2.5 text-cyan-300 text-xs sq-fade-up bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <Loader2 className="w-4 h-4 animate-spin text-[#FF7300]" />
            <span>Agent orchestrating specialist models & validating CRS…</span>
          </div>
        )}

        {/* State C: Analysis Complete */}
        {analysis && (
          <>
            {/* 1. Agentic Task Planner Card */}
            <div
              data-testid="task-planner"
              className="rounded-lg border border-cyan-500/20 bg-[#121824] p-3.5 sq-fade-up space-y-2 text-xs"
            >
              <div className="telemetry flex items-center gap-1.5 text-cyan-400">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>AGENTIC TASK PLANNER</span>
              </div>

              <div className="space-y-1 font-mono-x text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Intent:</span>
                  <span className="text-slate-200 font-semibold">{analysis.intent || analysis.task_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Task:</span>
                  <span className="text-cyan-300 font-semibold">{analysis.plan?.task_label || analysis.task_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Inputs:</span>
                  <span className="text-slate-300">{((analysis.plan?.inputs) || ['Optical Imagery']).join(', ')}</span>
                </div>
              </div>

              {/* Models Deployed */}
              <div className="pt-2 border-t border-cyan-500/15">
                <span className="text-xs text-cyan-500/70 font-mono-x tracking-wider uppercase">
                  DEPLOYED SPECIALIST MODELS
                </span>
                <div className="mt-1 space-y-1">
                  {((analysis.plan?.models) || ['SatQuery-RS-VLM']).map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-mono-x">
                      <ChevronRight className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. SatQuery-RS-VLM Answer Card */}
            <div
              data-testid="ai-answer"
              className="rounded-lg border border-[#FF7300]/30 bg-[#FF7300]/5 p-3.5 sq-fade-up space-y-2"
            >
              <div className="telemetry text-[#FF7300] flex items-center justify-between">
                <span>SATQUERY-RS-VLM · FINDINGS</span>
                <span className="text-[10.5px] px-2 py-0.5 rounded bg-[#FF7300]/20 text-[#FF7300] font-mono-x">
                  LoRA ADAPTED
                </span>
              </div>

              <p className="text-sm text-slate-100 leading-relaxed font-sans whitespace-pre-wrap">
                {answer}
              </p>

              {/* Primary Changes / Spatial Rationales Bullets */}
              {((r?.primary_changes && r.primary_changes.length > 0) ? r.primary_changes : (analysis.bullet_points || [])).length > 0 && (
                <ul className="mt-2 space-y-1.5 border-t border-cyan-500/15 pt-2">
                  {((r?.primary_changes && r.primary_changes.length > 0) ? r.primary_changes : (analysis.bullet_points || [])).map((change, i) => (
                    <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5 font-sans leading-relaxed">
                      <span className="text-[#FF7300] shrink-0 font-bold">▸</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Active Spatial Heatmap Telemetry Badge */}
              {(r?.heatmap || analysis.heatmap) && (
                <div className="mt-2 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-xs font-mono-x text-amber-300 bg-amber-500/10 px-2.5 py-1.5 rounded border border-amber-500/25">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF1744] sq-pulse" />
                    <span className="font-semibold">{(r?.heatmap || analysis.heatmap)?.title}</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono-x">
                    ACTIVE OVERLAY
                  </span>
                </div>
              )}

              {/* Land Cover Classification Badges */}
              {r?.land_cover && r.land_cover.length > 0 && (
                <div className="mt-2 pt-2 border-t border-cyan-500/15 flex flex-wrap gap-1">
                  {r.land_cover.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono-x"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Optical + SAR Complementary Insight */}
              {r?.fusion_insight && (
                <div className="mt-2 pt-2 border-t border-cyan-500/15 text-xs text-cyan-300/90 border-l-2 border-cyan-500/50 pl-2.5 font-sans italic leading-relaxed">
                  {r.fusion_insight}
                </div>
              )}
            </div>


            {/* 3. System Confidence Gauge */}
            <div
              data-testid="confidence-gauge"
              className={`rounded-lg border p-3.5 sq-fade-up space-y-2 ${confStyle.border} ${confStyle.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className="telemetry flex items-center gap-1.5">
                  <ShieldCheck className={`w-3.5 h-3.5 ${confStyle.text}`} />
                  <span className={confStyle.text}>SYSTEM CONFIDENCE</span>
                </div>
                <span className={`text-xs font-bold font-mono-x ${confStyle.text}`}>
                  {c.level} ({c.percent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${c.percent}%`, backgroundColor: confStyle.bar }}
                />
              </div>

              {/* Calibration Breakdown Table */}
              <div className="pt-2 border-t border-white/5 space-y-1 font-mono-x text-xs">
                {Object.entries(c.breakdown || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-slate-200">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Action Buttons: Download HTML / PDF / JSON */}
            <div className="space-y-2 pt-2 border-t border-cyan-500/15">
              <button
                data-testid="download-report-button"
                onClick={() => downloadReport(analysis)}
                className="sq-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-300 text-cyan-300 text-xs font-mono-x transition-all sq-glow"
              >
                <Download className="w-3.5 h-3.5 text-[#FF7300]" />
                <span>DOWNLOAD PRINTABLE REPORT (HTML)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-x">
                <a
                  href={analysis.report_pdf_url || `/api/report/pdf/${analysis.id || analysis.trace_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#182232] border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-center"
                >
                  <FileText className="w-3 h-3 text-rose-400" />
                  <span>EXPORT PDF</span>
                </a>
                <a
                  href={analysis.report_json_url || `/api/report/json/${analysis.id || analysis.trace_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#182232] border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-center"
                >
                  <Code className="w-3 h-3 text-amber-400" />
                  <span>GEOJSON / AUDIT</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

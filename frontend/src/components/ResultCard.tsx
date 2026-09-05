import React from 'react';
import type { QueryResponse } from '../types';
import { AlertTriangle, Download, Terminal, ShieldCheck, PieChart, Clock } from 'lucide-react';

interface ResultCardProps {
  result: QueryResponse;
  onOpenTrace: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onOpenTrace }) => {
  const { task_type, answer_text, confidence, visual_evidence, execution_trace, request_id } = result;

  const confPercent = Math.round(confidence.score * 100);
  const isHigh = confidence.level === 'HIGH';
  const isMod = confidence.level === 'MODERATE';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
      {/* Header: Task Classification Badge & Report Action */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-md border border-sky-500/30">
            {task_type.replace('_', ' ')}
          </span>
          <span className="text-xs text-slate-500 font-mono">ID: {request_id}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenTrace}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-sky-400 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Audit Execution Trace</span>
          </button>

          {result.report_url && (
            <a
              href={result.report_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg shadow-md shadow-indigo-600/20 font-medium transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Briefing</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Grounded Answer Text */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Grounded Remote-Sensing Assessment</span>
        </div>
        <p className="text-sm text-slate-100 leading-relaxed font-sans">{answer_text}</p>
      </div>

      {/* Analytical Evidence Stats & Confidence Gauge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Confidence Gauge */}
        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Analytical Confidence</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                isHigh
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : isMod
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}
            >
              {confidence.level} ({confPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-1.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isHigh ? 'bg-emerald-400' : isMod ? 'bg-amber-400' : 'bg-rose-500'
              }`}
              style={{ width: `${confPercent}%` }}
            ></div>
          </div>

          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Metric: Platt temperature scaling</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {execution_trace.execution_latency_ms} ms
            </span>
          </div>
        </div>

        {/* Quantitative Remote Sensing Metrics */}
        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300 mb-2">
            <PieChart className="w-3.5 h-3.5 text-sky-400" />
            <span>Extracted Quantitative Metrics</span>
          </div>

          {visual_evidence?.summary_stats ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(visual_evidence.summary_stats)
                .slice(0, 4)
                .map(([key, val]) => (
                  <div key={key} className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400 capitalize truncate">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="font-semibold text-slate-200">
                      {typeof val === 'number' ? `${val}%` : String(val)}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic">
              Spatial feature extraction grounded to optical spectral characteristics.
            </div>
          )}
        </div>
      </div>

      {/* Low Confidence Warning Alert if applicable */}
      {confidence.low_confidence_warning && (
        <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-xl flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200">
            <span className="font-semibold">Verification Alert: </span>
            {confidence.warning_message || 'Human analyst verification recommended.'}
          </div>
        </div>
      )}
    </div>
  );
};

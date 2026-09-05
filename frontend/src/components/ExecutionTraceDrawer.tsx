import React, { useState } from 'react';
import type { ExecutionTrace } from '../types';
import { Terminal, CheckCircle2, X, Copy, Check, Cpu, Clock } from 'lucide-react';

interface ExecutionTraceDrawerProps {
  trace: ExecutionTrace;
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutionTraceDrawer: React.FC<ExecutionTraceDrawerProps> = ({ trace, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'structured' | 'json'>('structured');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(trace, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const model = trace.models_invoked[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Auditable Execution Trace
                <span className="text-[11px] font-mono font-normal text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
                  {trace.trace_id}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Government/ISRO Audit Trail • Timestamp: {new Date(trace.timestamp).toLocaleTimeString()} UTC
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition cursor-pointer"
              title="Copy JSON Trace"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/80 flex space-x-2 text-xs">
          <button
            onClick={() => setViewMode('structured')}
            className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
              viewMode === 'structured'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Steps (Visual)
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
              viewMode === 'json'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw JSON (Machine-Evaluable)
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {viewMode === 'json' ? (
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-sky-300 overflow-x-auto leading-relaxed">
              {JSON.stringify(trace, null, 2)}
            </pre>
          ) : (
            <div className="space-y-4">
              {/* Step 1: Intent Classification */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-slate-200 font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] border border-sky-500/30">
                      1
                    </span>
                    <span>Task Intent Classification</span>
                  </div>
                  <span className="text-emerald-400 font-mono">
                    {(trace.classification_confidence * 100).toFixed(1)}% Conf
                  </span>
                </div>
                <div className="text-slate-400 pl-7">
                  <div>
                    Classified Task:{' '}
                    <span className="text-sky-300 font-semibold uppercase">{trace.task_classified}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Method: {trace.classification_method}</div>
                  <div className="text-[11px] text-slate-300 mt-1 italic">"{trace.routing_rationale}"</div>
                </div>
              </div>

              {/* Step 2: Input Pre-Flight Validation */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-slate-200 font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] border border-sky-500/30">
                      2
                    </span>
                    <span>Input Raster Pre-Flight Validation</span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-7 pt-1 text-slate-400">
                  <div>Rasters Count: <span className="text-slate-200">{trace.input_validation.input_count}</span></div>
                  <div>CRS Alignment: <span className="text-emerald-400">{trace.input_validation.crs_aligned ? 'Verified' : 'Reprojected'}</span></div>
                  <div>Spatial Overlap: <span className="text-slate-200">{trace.input_validation.spatial_coverage_overlap}%</span></div>
                  <div>Modalities: <span className="text-slate-200">{trace.input_validation.modalities_detected.join(', ')}</span></div>
                </div>
              </div>

              {/* Step 3: Model Registry Dispatch */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-slate-200 font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] border border-sky-500/30">
                      3
                    </span>
                    <span>Specialist Model Dispatched</span>
                  </div>
                  <span className="text-indigo-400 font-mono text-[11px]">{model?.version}</span>
                </div>
                <div className="pl-7 text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    {model?.model_name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">ID: {model?.model_id}</div>
                  <div className="text-[11px] text-slate-400">Architecture: {model?.architecture}</div>

                  {/* Certified Benchmark Scores */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-300 mb-1">
                      Certified Benchmark Performance:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(model?.benchmark_score || {}).map(([k, v]) => (
                        <span
                          key={k}
                          className="bg-slate-900 border border-slate-700/80 px-2 py-0.5 rounded text-[10px] text-sky-300 font-mono"
                        >
                          {k}: {String(v)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Permitted Parameters Applied */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-slate-200 font-semibold">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] border border-sky-500/30">
                    4
                  </span>
                  <span>Permitted Parameter Constraints</span>
                </div>
                <div className="pl-7 text-slate-400">
                  <pre className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-[10px] text-slate-300">
                    {JSON.stringify(trace.permitted_parameters_used, null, 2)}
                  </pre>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Enforced parameter schema boundaries protect against prompt injection and unauthorized execution.
                  </p>
                </div>
              </div>

              {/* Step 5: Calibration & Latency */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-slate-300">
                <div className="flex items-center space-x-2 font-semibold">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] border border-sky-500/30">
                    5
                  </span>
                  <span>Execution Latency</span>
                </div>
                <span className="font-mono text-emerald-400 text-sm font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {trace.execution_latency_ms} ms
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

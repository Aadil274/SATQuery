import React from 'react';
import { Clock, ShieldAlert, Cpu, Sliders, CheckCircle2 } from 'lucide-react';

interface ExecutionSummaryData {
  task: string;
  input_type: string;
  models_used: string[];
  parameters: { [key: string]: any };
  confidence: string;
  confidence_value: number;
  time_taken: string;
  status: string;
  timestamp: string;
}

interface ExecutionSummaryProps {
  summary: ExecutionSummaryData;
}

export const ExecutionSummary: React.FC<ExecutionSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-[#0b1020] border border-[#1e293b] rounded-2xl p-4 shadow-xl flex flex-col mt-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1e293b]">
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          EXECUTION SUMMARY
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          AUDIT READY
        </span>
      </div>

      {/* Metric Rows matching reference UI */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium">Task</span>
          <span className="text-slate-200 font-semibold text-right">{summary.task}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium">Input Type</span>
          <span className="text-slate-200 font-semibold text-right">{summary.input_type}</span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium shrink-0">Models Used</span>
          <div className="text-right space-y-0.5">
            {summary.models_used.map((m, idx) => (
              <div key={idx} className="text-slate-200 font-medium text-[11px]">
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium shrink-0">Parameters</span>
          <div className="text-right text-[11px] font-mono text-slate-300">
            {Object.entries(summary.parameters).map(([k, v], idx) => (
              <div key={idx}>
                {k}: <strong className="text-cyan-400">{String(v)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium">Confidence</span>
          <span className="text-cyan-400 font-bold font-mono text-sm">{summary.confidence}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium">Time Taken</span>
          <span className="text-slate-200 font-mono text-xs">{summary.time_taken}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
          <span className="text-slate-400 font-medium">Status</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{summary.status}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-400 font-medium">Timestamp</span>
          <span className="text-slate-400 font-mono text-[10px]">{summary.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

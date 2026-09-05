import React from 'react';
import { X, GitCompare, ArrowRight } from 'lucide-react';
import { HistoryItem } from './HistoryDrawer';

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  entries: HistoryItem[];
}

export const CompareModal: React.FC<CompareModalProps> = ({ open, onClose, entries }) => {
  if (!open || entries.length < 2) return null;

  const [a, b] = entries;
  const aConf = a.analysis.confidence?.percent || a.analysis.confidence_score || 90;
  const bConf = b.analysis.confidence?.percent || b.analysis.confidence_score || 90;
  const delta = bConf - aConf;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0B0E14] border border-cyan-500/30 rounded-xl shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden sq-fade-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-[#FF7300]" />
            <h3 className="font-head text-lg font-bold tracking-wide text-slate-100">
              SIDE-BY-SIDE ANALYSIS COMPARISON
            </h3>
          </div>
          <button
            onClick={onClose}
            className="sq-btn p-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Metrics Banner */}
          <div className="rounded-lg border border-cyan-500/20 bg-[#121824] p-3 flex items-center justify-around font-mono-x text-xs">
            <div className="text-center">
              <div className="text-slate-400 text-[10px]">ANALYSIS A CONFIDENCE</div>
              <div className="text-lg font-bold text-emerald-400">{aConf}%</div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className={`font-bold ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {delta >= 0 ? `+${delta}%` : `${delta}%`}
              </span>
            </div>
            <div className="text-center">
              <div className="text-slate-400 text-[10px]">ANALYSIS B CONFIDENCE</div>
              <div className="text-lg font-bold text-emerald-400">{bConf}%</div>
            </div>
          </div>

          {/* Side by Side Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Column A */}
            <div className="space-y-4 border-r border-cyan-500/15 pr-6">
              <div className="telemetry text-[#00F0FF]">ANALYSIS A</div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {a.slots.map((s, i) => (
                  <img
                    key={i}
                    src={s.preview}
                    alt=""
                    className="w-16 h-16 rounded object-cover border border-cyan-500/30"
                  />
                ))}
              </div>

              {/* Query */}
              <div className="rounded bg-[#121824] p-3 border border-cyan-500/15">
                <span className="text-[10px] text-cyan-400/70 font-mono-x uppercase block mb-1">Query</span>
                <p className="text-xs text-slate-200">"{a.query}"</p>
              </div>

              {/* Task */}
              <div className="text-xs font-mono-x space-y-1">
                <div className="text-slate-400">Task: <span className="text-cyan-300 font-bold">{a.analysis.plan?.task_label || a.analysis.task}</span></div>
                <div className="text-slate-400">Models: <span className="text-slate-200">{((a.analysis.plan?.models) || ['SatQuery-RS-VLM']).join(', ')}</span></div>
              </div>

              {/* Answer */}
              <div className="rounded bg-[#FF7300]/5 border border-[#FF7300]/20 p-3 text-xs leading-relaxed text-slate-200">
                <span className="telemetry text-[#FF7300] block mb-1">Answer / Findings</span>
                {a.analysis.result?.answer || a.analysis.result?.caption || a.analysis.headline_answer}
              </div>

              {/* Regions Count */}
              <div className="text-[11px] font-mono-x text-slate-400">
                Evidence Regions: <span className="text-emerald-400 font-bold">{a.analysis.result?.evidence_regions?.length || 0}</span> grounded
              </div>
            </div>

            {/* Column B */}
            <div className="space-y-4">
              <div className="telemetry text-[#FF7300]">ANALYSIS B</div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {b.slots.map((s, i) => (
                  <img
                    key={i}
                    src={s.preview}
                    alt=""
                    className="w-16 h-16 rounded object-cover border border-[#FF7300]/30"
                  />
                ))}
              </div>

              {/* Query */}
              <div className="rounded bg-[#121824] p-3 border border-cyan-500/15">
                <span className="text-[10px] text-cyan-400/70 font-mono-x uppercase block mb-1">Query</span>
                <p className="text-xs text-slate-200">"{b.query}"</p>
              </div>

              {/* Task */}
              <div className="text-xs font-mono-x space-y-1">
                <div className="text-slate-400">Task: <span className="text-cyan-300 font-bold">{b.analysis.plan?.task_label || b.analysis.task}</span></div>
                <div className="text-slate-400">Models: <span className="text-slate-200">{((b.analysis.plan?.models) || ['SatQuery-RS-VLM']).join(', ')}</span></div>
              </div>

              {/* Answer */}
              <div className="rounded bg-[#FF7300]/5 border border-[#FF7300]/20 p-3 text-xs leading-relaxed text-slate-200">
                <span className="telemetry text-[#FF7300] block mb-1">Answer / Findings</span>
                {b.analysis.result?.answer || b.analysis.result?.caption || b.analysis.headline_answer}
              </div>

              {/* Regions Count */}
              <div className="text-[11px] font-mono-x text-slate-400">
                Evidence Regions: <span className="text-emerald-400 font-bold">{b.analysis.result?.evidence_regions?.length || 0}</span> grounded
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/15 flex justify-end bg-[#121824]">
          <button
            onClick={onClose}
            className="sq-btn px-4 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono-x border border-cyan-500/30"
          >
            CLOSE COMPARISON
          </button>
        </div>
      </div>
    </div>
  );
};

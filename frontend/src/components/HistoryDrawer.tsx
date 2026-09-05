import React from 'react';
import {
  History,
  X,
  Play,
  GitCompare,
  Trash2,
  CheckSquare,
  Square
} from 'lucide-react';
import { ImageSlot, AnalysisResponseData } from '../lib/api';

export interface HistoryItem {
  id: string;
  query: string;
  analysis: AnalysisResponseData;
  slots: ImageSlot[];
  ts: number;
}

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onReplay: (item: HistoryItem) => void;
  onClear: () => void;
  compareSel: string[];
  onToggleCompare: (item: HistoryItem) => void;
  onOpenCompare: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  open,
  onClose,
  items,
  onReplay,
  onClear,
  compareSel,
  onToggleCompare,
  onOpenCompare
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-[420px] bg-[#0B0E14] border-l border-cyan-500/25 h-full flex flex-col z-10 select-none sq-fade-up">
        {/* Drawer Header */}
        <div className="px-4 py-3.5 border-b border-cyan-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#FF7300]" />
            <span className="font-head text-lg font-bold tracking-wide text-slate-100">
              ANALYSIS HISTORY
            </span>
            <span className="telemetry px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {items.length} RUNS
            </span>
          </div>
          <button
            onClick={onClose}
            className="sq-btn p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compare Toolbar */}
        {items.length > 0 && (
          <div className="px-4 py-2 border-b border-cyan-500/10 bg-[#121824] flex items-center justify-between text-xs font-mono-x">
            <div className="text-slate-400">
              Selected: <span className="text-cyan-300 font-bold">{compareSel.length}/2</span>
            </div>
            <div className="flex items-center gap-2">
              {compareSel.length === 2 && (
                <button
                  onClick={onOpenCompare}
                  className="sq-btn px-2.5 py-1 rounded bg-[#FF7300] hover:bg-[#ff8826] text-black font-bold flex items-center gap-1 sq-glow-orange"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>COMPARE RUNS</span>
                </button>
              )}
              <button
                onClick={onClear}
                className="text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Clear all history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>CLEAR</span>
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <History className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="text-xs">No analysis runs yet.</p>
              <p className="text-[11px] text-slate-600 mt-1 font-mono-x">
                Queries and findings will automatically be saved here.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const isPinned = compareSel.includes(item.id);
              const conf = item.analysis.confidence || { level: 'HIGH', percent: item.analysis.confidence_score || 92 };

              return (
                <div
                  key={item.id}
                  className={`rounded-lg border p-3 bg-[#121824] transition-all space-y-2 sq-fade-up ${
                    isPinned ? 'border-[#FF7300] sq-glow-orange' : 'border-cyan-500/20 hover:border-cyan-400/50'
                  }`}
                >
                  {/* Top Row: Thumbnails + Task Badge + Pin Button */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-1.5">
                      {item.slots.map((s, idx) => (
                        <img
                          key={idx}
                          src={s.preview}
                          alt=""
                          className="w-10 h-10 rounded object-cover border border-cyan-500/20"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        title={isPinned ? 'Unpin from compare' : 'Pin for comparison (select 2)'}
                        onClick={() => onToggleCompare(item)}
                        className={`sq-btn p-1.5 rounded transition-colors ${
                          isPinned
                            ? 'text-[#FF7300] bg-[#FF7300]/15'
                            : 'text-slate-500 hover:text-cyan-300'
                        }`}
                      >
                        {isPinned ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Query */}
                  <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                    "{item.query}"
                  </p>

                  {/* Metadata & Actions */}
                  <div className="flex items-center justify-between text-[10px] font-mono-x pt-1 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                        {item.analysis.plan?.task_label || item.analysis.task || 'Analysis'}
                      </span>
                      <span className="text-emerald-400">
                        {conf.percent}%
                      </span>
                    </div>

                    <button
                      onClick={() => onReplay(item)}
                      className="sq-btn flex items-center gap-1 text-cyan-300 hover:text-cyan-200 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>REPLAY</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

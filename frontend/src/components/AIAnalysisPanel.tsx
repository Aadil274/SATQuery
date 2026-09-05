import React from 'react';
import { Sparkles, Eye, Image as ImageIcon, FileText, Download, CheckCircle2 } from 'lucide-react';

interface AIAnalysisPanelProps {
  headline: string;
  bullets: string[];
  confidenceScore: number;
  onViewChangeMap: () => void;
  onViewEvidence: () => void;
  onViewTrace: () => void;
  onDownloadReport: () => void;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  headline,
  bullets,
  confidenceScore,
  onViewChangeMap,
  onViewEvidence,
  onViewTrace,
  onDownloadReport
}) => {
  // Format headline with highlighted keywords
  const renderFormattedHeadline = (text: string) => {
    // Highlight "increased" in green/red, "decreased", etc.
    const parts = text.split(/(increased|decreased|detected|stable)/gi);
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower === 'increased') {
        return <span key={i} className="text-emerald-400 font-bold underline decoration-emerald-500/40">{part}</span>;
      } else if (lower === 'decreased') {
        return <span key={i} className="text-amber-400 font-bold underline decoration-amber-500/40">{part}</span>;
      } else if (lower === 'detected') {
        return <span key={i} className="text-cyan-400 font-bold">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // SVG Circular Gauge calculation
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidenceScore / 100) * circumference;

  return (
    <div className="bg-[#0b1020] border border-[#1e293b] rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Sparkle */}
      <div className="flex items-center gap-2 mb-3">
        <div className="text-cyan-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
          AI Analysis
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Narrative & Bullet Points (9 columns) */}
        <div className="lg:col-span-9 space-y-3">
          <p className="text-base text-slate-100 font-medium leading-relaxed">
            {renderFormattedHeadline(headline)}
          </p>

          <ul className="space-y-1.5 pt-1">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Circular Confidence Score Gauge (3 columns) matching reference */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-3 rounded-xl bg-[#080d1a]/80 border border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 mb-1">
            Confidence Score
          </span>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              {/* Background Circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#1e293b"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Progress Stroke */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#06b6d4"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-white font-mono leading-none">
                {confidenceScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons matching reference UI */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-800/80 flex-wrap">
        <button
          onClick={onViewChangeMap}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 text-xs font-semibold shadow-sm transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Change Map</span>
        </button>

        <button
          onClick={onViewEvidence}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold transition-all"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>View Evidence</span>
        </button>

        <button
          onClick={onViewTrace}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold transition-all"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Execution Trace</span>
        </button>

        <button
          onClick={onDownloadReport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 text-xs font-semibold transition-all shadow-sm ml-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Report</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, Send, Sparkles, SlidersHorizontal, Loader2 } from 'lucide-react';

interface QueryBarProps {
  onQuerySubmit: (queryText: string, taskOverride?: string) => void;
  suggestedQueries: string[];
  isLoading: boolean;
  disabled: boolean;
}

export const QueryBar: React.FC<QueryBarProps> = ({
  onQuerySubmit,
  suggestedQueries,
  isLoading,
  disabled,
}) => {
  const [query, setQuery] = useState('');
  const [taskOverride, setTaskOverride] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || disabled || isLoading) return;
    onQuerySubmit(query.trim(), taskOverride || undefined);
  };

  const handleChipClick = (q: string) => {
    setQuery(q);
    onQuerySubmit(q, taskOverride || undefined);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6">
      {/* Search Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400">
          <Search className="w-5 h-5 text-sky-400" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled || isLoading}
          placeholder={
            disabled
              ? 'Load a satellite scenario above to start querying...'
              : 'Ask anything in plain English (e.g., "Describe the land cover", "Highlight runways", "What changed?")'
          }
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-11 pr-32 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition disabled:opacity-50"
        />

        <div className="absolute right-2 flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
              showFilters || taskOverride
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Task Override & Controller Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={disabled || isLoading || !query.trim()}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-sky-500/20 transition cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Orchestrating...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Ask Agent</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Controller Task Override Filter (Optional) */}
      {showFilters && (
        <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="font-semibold text-sky-400">Agentic Controller Routing:</span>
            <span>By default, the hybrid classifier automatically determines task intent.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Task Mode:</span>
            <select
              value={taskOverride}
              onChange={(e) => setTaskOverride(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Auto-Detect Intent (Recommended)</option>
              <option value="single_vqa">Single-Image VQA (RS-VLM)</option>
              <option value="captioning">Scene Captioning</option>
              <option value="grounding">Text-Guided Grounding (Localization)</option>
              <option value="bitemporal_change">Bi-Temporal Change Detection (CDVQA)</option>
              <option value="cross_modal_fusion">Optical-SAR Cross-Modal Fusion</option>
            </select>
          </div>
        </div>
      )}

      {/* Suggested Query Chips */}
      {suggestedQueries.length > 0 && (
        <div className="mt-3 flex items-center flex-wrap gap-2">
          <div className="flex items-center space-x-1 text-xs text-slate-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggested:</span>
          </div>
          {suggestedQueries.map((sQuery, i) => (
            <button
              key={i}
              onClick={() => handleChipClick(sQuery)}
              disabled={isLoading || disabled}
              className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-slate-700/70 transition cursor-pointer truncate max-w-xs md:max-w-md"
            >
              "{sQuery}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

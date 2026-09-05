import React, { useState } from 'react';
import { Sparkles, Mic, Send, Layers, Image as ImageIcon, CheckCircle, UploadCloud, RefreshCw } from 'lucide-react';

interface QueryBarProps {
  query: string;
  setQuery: (q: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  taskType: string;
  inputCount: string;
  status: string;
  onSelectSample: (sampleId: string) => void;
  currentSampleId: string;
  onOpenUploadModal: () => void;
  onOpenDatasets: () => void;
}

export const QueryBar: React.FC<QueryBarProps> = ({
  query,
  setQuery,
  onAnalyze,
  isLoading,
  taskType,
  inputCount,
  status,
  onSelectSample,
  currentSampleId,
  onOpenUploadModal,
  onOpenDatasets
}) => {
  const sampleScenarios = [
    { id: 'bi_temporal_mumbai', label: 'Bi-temporal Change (Mumbai)', query: 'What changed between these two dates, and where did the change occur?' },
    { id: 'optical_sar_gujarat', label: 'Optical + SAR Fusion (Gujarat)', query: 'Use the optical and SAR images together to identify built-up structures beneath cloud cover.' },
    { id: 'grounding_port', label: 'Visual Grounding (Hydrology)', query: 'Highlight the water body and meandering river channel.' },
    { id: 'single_vqa_density', label: 'Single-Image RS-VQA', query: 'Describe this image and estimate the density of residential structures.' }
  ];

  return (
    <div className="bg-[#0b1020]/90 border border-[#1e293b] rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-400">Your Query</label>
        {/* Quick Scenario Preset Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
          {sampleScenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                onSelectSample(sc.id);
                setQuery(sc.query);
              }}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
                currentSampleId === sc.id
                  ? 'bg-blue-600/20 text-cyan-300 border-blue-500/40 shadow-sm'
                  : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {sc.label}
            </button>
          ))}
          <button
            onClick={onOpenDatasets}
            className="text-[11px] px-2.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-1 transition-all"
            title="Explore official BigEarthNet.txt patches & benchmarks"
          >
            <span>🛰 BigEarthNet.txt Data</span>
          </button>
          <button
            onClick={onOpenUploadModal}
            className="text-[11px] px-2.5 py-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 flex items-center gap-1 transition-all"
            title="Upload custom GeoTIFF / TIFF rasters"
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload GeoTIFF</span>
          </button>
        </div>
      </div>

      {/* Input Box matching reference design */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-indigo-400 pointer-events-none">
          <Sparkles className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              onAnalyze();
            }
          }}
          placeholder="Ask natural language questions about your satellite imagery..."
          className="w-full bg-[#111827]/90 border border-slate-700/80 rounded-xl pl-12 pr-36 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-inner"
        />
        <div className="absolute right-3 flex items-center gap-2">
          <button 
            className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
            title="Voice query input"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={onAnalyze}
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Badges underneath matching reference UI */}
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-[11px] text-blue-300 font-medium">
          <Layers className="w-3 h-3 text-blue-400" />
          <span>Task Type: <strong className="text-white font-semibold">{taskType}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-800/50 text-[11px] text-emerald-300 font-medium">
          <ImageIcon className="w-3 h-3 text-emerald-400" />
          <span>Input: <strong className="text-white font-semibold">{inputCount}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-800/50 text-[11px] text-emerald-300 font-medium">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          <span>Status: <strong className="text-white font-semibold">{status}</strong></span>
        </div>
      </div>
    </div>
  );
};

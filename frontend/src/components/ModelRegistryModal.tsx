import React from 'react';
import type { ModelRegistryEntry } from '../types';
import { Cpu, X } from 'lucide-react';

interface ModelRegistryModalProps {
  models: ModelRegistryEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const ModelRegistryModal: React.FC<ModelRegistryModalProps> = ({ models, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Specialist Model Registry</h2>
              <p className="text-xs text-slate-400">
                Predefined catalog of domain-adapted remote-sensing models (BigEarthNet, VRSBench, RSVQA, CDVQA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Model Cards List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {models.map((m) => (
            <div
              key={m.model_id}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm text-slate-100">{m.name}</h3>
                    <span className="text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.5 rounded">
                      v{m.version}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">ID: {m.model_id}</div>
                </div>

                <div className="flex items-center space-x-1.5">
                  {m.tasks.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase font-semibold bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded"
                    >
                      {t.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture & Sensors */}
              <div className="text-xs text-slate-400 space-y-1">
                <div>
                  <span className="font-semibold text-slate-300">Architecture: </span>
                  {m.architecture}
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Sensors Supported: </span>
                  <span className="text-sky-300 uppercase">{m.input_modalities.join(', ')}</span> (
                  {m.min_images === m.max_images ? `${m.min_images} raster` : `${m.min_images}–${m.max_images} rasters`})
                </div>
              </div>

              {/* Benchmarks */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">Official Evaluation Metrics:</span>
                {Object.entries(m.benchmark_scores).map(([metric, score]) => (
                  <span
                    key={metric}
                    className="text-[11px] font-mono bg-slate-900 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded"
                  >
                    {metric}: <strong>{String(score)}</strong>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

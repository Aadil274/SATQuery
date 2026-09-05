import React from 'react';
import type { Scenario } from '../types';
import { Sparkles } from 'lucide-react';

interface ScenarioPickerProps {
  scenarios: Scenario[];
  activeScenarioId?: string;
  onSelectScenario: (scenarioId: string) => void;
  isLoading: boolean;
}

export const ScenarioPicker: React.FC<ScenarioPickerProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  isLoading,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">
            Evaluation Scenarios (1-Click Datasets)
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Pre-packaged GeoTIFF & co-registered rasters matching ISRO evaluation protocols
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const isActive = activeScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc.id)}
              disabled={isLoading}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-sky-950/40 border-sky-500/60 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/40'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      sc.mode === 'single'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : sc.mode === 'cross_modal'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {sc.mode.replace('_', ' ')}
                  </span>
                  {isActive && (
                    <span className="flex items-center text-[11px] text-sky-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-sm text-slate-100 mb-1">{sc.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {sc.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>{sc.sensor}</span>
                <span className="text-sky-400 font-medium hover:underline">
                  {isActive ? 'Loaded' : 'Click to Load →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

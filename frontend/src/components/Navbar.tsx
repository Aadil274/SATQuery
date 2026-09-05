import React from 'react';
import { Satellite, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenRegistry: () => void;
  activeMode: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegistry, activeMode }) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand & PS Badge */}
        <div className="flex items-center space-x-3.5">
          <div className="bg-gradient-to-tr from-sky-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-sky-500/20">
            <Satellite className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg tracking-tight text-white">SatQuery AI</h1>
              <span className="bg-sky-500/10 text-sky-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-sky-500/30">
                v1.0 ISRO / SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Vision-Language Assistant for Remote Sensing • PS ID 26167
            </p>
          </div>
        </div>

        {/* Center: Active Pipeline Mode Badge */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-slate-300 font-medium">Orchestrator Mode:</span>
          <span className="text-sky-400 font-semibold uppercase tracking-wider">
            {activeMode.replace('_', ' ')}
          </span>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenRegistry}
            className="flex items-center space-x-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Model Registry</span>
          </button>

          <div className="flex items-center space-x-2 bg-slate-800/60 border border-slate-700/70 pl-2 pr-3 py-1 rounded-lg">
            <div className="w-6 h-6 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-300">
              ISRO
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-semibold text-slate-200">Analyst</div>
              <div className="text-[10px] text-slate-400">SAC / Dept of Space</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

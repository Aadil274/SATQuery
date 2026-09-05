import React from 'react';
import { HelpCircle, Sun, User as UserIcon } from 'lucide-react';

interface TopBarProps {
  onOpenHelp: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenHelp }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#1e293b] bg-[#090d1a]/80 backdrop-blur-md sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Remote Sensing Analysis
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-blue-500/30">
            Mission Spec
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Ask natural language questions about your satellite imagery.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenHelp}
          className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
          title="Evaluation Specs & Documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button 
          className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
          title="Toggle Display Theme"
        >
          <Sun className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/70 text-slate-200 text-xs font-medium cursor-pointer hover:bg-slate-800 transition-colors">
          <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
            <UserIcon className="w-3.5 h-3.5" />
          </div>
          <span>User</span>
        </div>
      </div>
    </header>
  );
};

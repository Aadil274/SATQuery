import React, { useState, useEffect } from 'react';
import { Satellite, History, Radio, Activity, ALargeSmall, Home } from 'lucide-react';

interface HeaderProps {
  status: string;
  historyCount?: number;
  onOpenHistory: () => void;
  onOpenHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ status, historyCount = 0, onOpenHistory, onOpenHome }) => {
  const [utc, setUtc] = useState('');
  const [fontSize, setFontSize] = useState<'100' | '125' | '150' | '175'>(() => {
    const saved = localStorage.getItem('sq_font_size');
    if (saved === '175' || saved === '150' || saved === '125' || saved === '100') return saved;
    if (saved === 'xlarge') return '150';
    if (saved === 'large') return '125';
    return '100';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('sq_font_size', fontSize);
  }, [fontSize]);

  const cycleFontSize = () => {
    setFontSize((prev) => {
      if (prev === '100') return '125';
      if (prev === '125') return '150';
      if (prev === '150') return '175';
      return '100';
    });
  };

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setUtc(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isRunning = status === 'running';
  const isDone = status === 'done';

  return (
    <header
      data-testid="app-header"
      className="sq-glass flex items-center justify-between px-5 h-14 border-b border-cyan-500/20 relative z-30 select-none"
    >
      {/* Left: Brand & Home Navigation */}
      <div className="flex items-center gap-3">
        <button
          data-testid="header-home-brand-btn"
          onClick={onOpenHome}
          title="Return to Home & Galaxy Overview"
          className="flex items-center gap-3 hover:opacity-90 transition-all cursor-pointer text-left group"
        >
          <div className="relative">
            <Satellite className="w-6 h-6 text-[#FF7300] group-hover:rotate-6 transition-transform" strokeWidth={1.8} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00E676] sq-pulse" />
          </div>
          <div>
            <h1 className="font-head text-xl font-bold tracking-wide leading-none group-hover:text-[#00F0FF] transition-colors">
              SAT<span className="text-[#FF7300]">QUERY</span> <span className="text-[#00F0FF]">AI</span>
            </h1>
            <div className="telemetry leading-none mt-0.5">
              Agentic Earth-Observation Console
            </div>
          </div>
        </button>

        {onOpenHome && (
          <button
            data-testid="nav-home-btn"
            onClick={onOpenHome}
            title="Return to Mission Home & Galaxy Overview"
            className="sq-btn hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 text-cyan-300 text-xs font-mono-x transition-all ml-1 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>HOME</span>
          </button>
        )}
      </div>

      {/* Center: Live UTC Clock */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center telemetry">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300">
          <Radio className="w-3 h-3 text-[#FF7300] sq-pulse" />
          <span>{utc || 'LIVE TELEMETRY'}</span>
        </div>
      </div>

      {/* Right: Status Pill & History Drawer Trigger */}
      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono-x ${
            isRunning
              ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 sq-glow-orange'
              : isDone
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300'
          }`}
        >
          <Activity className={`w-3 h-3 ${isRunning ? 'animate-spin text-[#FF7300]' : ''}`} />
          <span className="tracking-wider uppercase">
            {isRunning ? 'PIPELINE ACTIVE' : isDone ? 'ANALYSIS READY' : 'SYSTEM IDLE'}
          </span>
        </div>

        {/* Font Size Adjuster Button */}
        <button
          data-testid="font-size-button"
          aria-label="Adjust font size"
          title={`Text Size: ${fontSize}% ${fontSize === '100' ? '(Standard)' : fontSize === '125' ? '(Medium)' : fontSize === '150' ? '(Large)' : '(Max Accessibility 175%)'} · Click to increase`}
          onClick={cycleFontSize}
          className="sq-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 text-cyan-300 text-xs font-mono-x transition-all"
        >
          <ALargeSmall className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>TEXT: {fontSize}%</span>
        </button>

        {/* History Button */}
        <button
          data-testid="history-button"
          aria-label="View history"
          onClick={onOpenHistory}
          className="sq-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 text-cyan-300 text-xs font-mono-x transition-all"
        >
          <History className="w-3.5 h-3.5 text-[#FF7300]" />
          <span>HISTORY</span>
          {historyCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#FF7300] text-black text-xs font-bold">
              {historyCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import {
  Satellite,
  Radio,
  ArrowRight,
  Layers,
  Crosshair,
  GitCompareArrows,
  ScanSearch,
  Waves,
  Sparkles,
  ShieldCheck,
  Activity,
  ChevronRight
} from 'lucide-react';
import { PRESETS, Preset } from '../lib/demoData';

interface HomePageProps {
  onOpenConsole: () => void;
  onLaunchPreset: (p: Preset) => void;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  dx: number;
  dy: number;
  len: number;
  life: number;
  maxLife: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsole, onLaunchPreset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [utcTime, setUtcTime] = useState('');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const nx = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const ny = (clientY / innerHeight - 0.5) * 2;
    setMouseOffset({ x: nx, y: ny });
  };

  // Canvas starfield and shooting stars animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starColors = ['#FFFFFF', '#A5F3FC', '#67E8F9', '#FDE68A', '#E0E7FF'];
    const starCount = Math.floor((width * height) / 7500);
    const stars: Star[] = Array.from({ length: Math.min(220, Math.max(100, starCount)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    }));

    // Meteors
    const meteors: Meteor[] = [];
    let lastMeteorTime = Date.now();

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        dx: (Math.random() * 4 + 4) * (Math.random() > 0.5 ? 1 : -1),
        dy: Math.random() * 3 + 2.5,
        len: Math.random() * 80 + 60,
        life: 0,
        maxLife: Math.random() * 45 + 35
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn meteor
      if (Date.now() - lastMeteorTime > 3500 && Math.random() < 0.02) {
        spawnMeteor();
        lastMeteorTime = Date.now();
      }

      // Draw stars
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const alpha = Math.max(0.15, Math.min(1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.35));

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for larger stars
        if (s.size > 1.6) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = s.color;
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw and update meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += m.dx;
        m.y += m.dy;

        const progress = m.life / m.maxLife;
        const meteorAlpha = Math.sin(progress * Math.PI);

        ctx.save();
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.dx * (m.len / 10), m.y - m.dy * (m.len / 10));
        grad.addColorStop(0, `rgba(0, 240, 255, ${meteorAlpha})`);
        grad.addColorStop(0.3, `rgba(255, 115, 0, ${meteorAlpha * 0.8})`);
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.dx * (m.len / 10), m.y - m.dy * (m.len / 10));
        ctx.stroke();
        ctx.restore();

        if (m.life >= m.maxLife) {
          meteors.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#07090E] text-slate-100 font-sans select-none flex flex-col"
    >
      {/* 1. PHOTOREALISTIC SATELLITE IN GALAXY BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(1.05) translate(${mouseOffset.x * -12}px, ${mouseOffset.y * -10}px)`
        }}
      >
        <img
          src="/satellite_galaxy.jpg"
          onError={(e) => {
            // Fallback to static path if needed
            (e.target as HTMLImageElement).src = '/static/satellite_galaxy.jpg';
          }}
          alt="Earth Observation Satellite in Deep Space Galaxy"
          className="w-full h-full object-cover object-center opacity-85"
        />
        {/* Cinematic Vignette & Deep Space Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#0B0E14]/65 to-[#07090E]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07090E]/45 to-[#07090E]/95" />
      </div>

      {/* 2. DYNAMIC CANVAS (Twinkling Stars, Meteors, Cosmic Dust) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-90"
      />

      {/* 3. AEROSPACE HUD GRID & SCANLINES */}
      <div className="absolute inset-0 pointer-events-none z-10 sq-grid-bg opacity-30" />
      <div className="sq-scanline z-10 opacity-25" />

      {/* 4. TOP NAVIGATION / TELEMETRY HEADER */}
      <header className="relative z-30 w-full px-6 py-4 flex items-center justify-between border-b border-cyan-500/20 sq-glass">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 sq-glow">
            <Satellite className="w-6 h-6 text-[#FF7300]" strokeWidth={2} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00E676] sq-pulse" />
          </div>
          <div>
            <div className="font-head text-2xl font-bold tracking-wider leading-none">
              SAT<span className="text-[#FF7300]">QUERY</span> <span className="text-[#00F0FF]">AI</span>
            </div>
            <div className="telemetry text-[10px] text-cyan-400/80 tracking-widest mt-0.5">
              AUTONOMOUS EARTH-OBSERVATION PLATFORM
            </div>
          </div>
        </div>

        {/* Orbit Telemetry Widget */}
        <div className="hidden md:flex items-center gap-6 telemetry text-[11px]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-[#121824]/80 text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-[#FF7300] sq-pulse" />
            <span>ORBIT: LEO 786 KM · 98.6° SSO</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span>PAYLOAD: S2 OPTICAL + S1 SAR</span>
          </div>
          <div className="text-slate-400 font-mono-x">
            {utcTime || 'LIVE TELEMETRY'}
          </div>
        </div>

        {/* Quick Header CTA */}
        <button
          data-testid="header-open-console-btn"
          onClick={onOpenConsole}
          className="sq-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-orange-600/30 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 hover:text-white font-mono-x text-xs tracking-wider uppercase sq-glow transition-all cursor-pointer"
        >
          <span>ENTER CONSOLE</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF]" />
        </button>
      </header>

      {/* 5. HERO STAGE */}
      <main className="relative z-20 flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-20 text-center max-w-6xl mx-auto">
        {/* Status Chip */}
        <div className="sq-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/35 bg-cyan-950/40 text-cyan-300 text-xs font-mono-x tracking-wider uppercase mb-6 sq-glow">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7300]" />
          <span>BigEarthNet.txt Grounded (arXiv:2603.29630) · 464K Co-Registered Scenes</span>
        </div>

        {/* Main Title */}
        <h1 className="sq-fade-up font-head text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl">
          Vision-Language Intelligence for{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-[#FF7300]">
            Earth Observation
          </span>
        </h1>

        {/* Description */}
        <p className="sq-fade-up mt-6 text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl leading-relaxed font-sans">
          SatQuery AI is an autonomous remote-sensing agent that ingests multi-spectral and synthetic aperture radar imagery, interprets natural-language intent, dynamically coordinates specialist models, and provides verifiable spatial evidence.
        </p>

        {/* MAIN CALL TO ACTION BUTTON */}
        <div className="sq-fade-up mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            data-testid="hero-launch-console-btn"
            onClick={onOpenConsole}
            className="sq-btn group relative px-8 py-4 rounded-xl font-head text-xl font-bold tracking-wider text-slate-900 bg-gradient-to-r from-[#00F0FF] via-cyan-300 to-[#FF7300] hover:from-cyan-300 hover:to-orange-400 shadow-[0_0_35px_rgba(0,240,255,0.45)] hover:shadow-[0_0_50px_rgba(255,115,0,0.65)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3 overflow-hidden cursor-pointer"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <Satellite className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
            <span>OPEN AGENTIC EO CONSOLE</span>
            <ChevronRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#mission-presets"
            className="sq-btn px-6 py-4 rounded-xl font-mono-x text-xs text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 bg-[#121824]/60 hover:bg-cyan-950/40 tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Mission Presets</span>
            <span className="text-[#FF7300]">↓</span>
          </a>
        </div>

        {/* Key Metrics Strip */}
        <div className="sq-fade-up mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="sq-glass rounded-xl p-4 border border-cyan-500/20 text-center">
            <div className="font-head text-2xl sm:text-3xl font-bold text-[#00F0FF]">464,044</div>
            <div className="telemetry text-[10px] text-slate-400 mt-1">S1/S2 PAIRS ADAPTED</div>
          </div>
          <div className="sq-glass rounded-xl p-4 border border-cyan-500/20 text-center">
            <div className="font-head text-2xl sm:text-3xl font-bold text-[#00E676]">9.6M</div>
            <div className="telemetry text-[10px] text-slate-400 mt-1">TEXT ANNOTATIONS</div>
          </div>
          <div className="sq-glass rounded-xl p-4 border border-cyan-500/20 text-center">
            <div className="font-head text-2xl sm:text-3xl font-bold text-[#FF7300]">+26.8%</div>
            <div className="telemetry text-[10px] text-slate-400 mt-1">RS BENCHMARK DELTA</div>
          </div>
          <div className="sq-glass rounded-xl p-4 border border-cyan-500/20 text-center">
            <div className="font-head text-2xl sm:text-3xl font-bold text-cyan-300">100%</div>
            <div className="telemetry text-[10px] text-slate-400 mt-1">AUDITABLE DAG TRACE</div>
          </div>
        </div>

        {/* 6. MISSION SCENARIO LAUNCHER CARDS */}
        <div id="mission-presets" className="sq-fade-up mt-20 w-full text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-cyan-500/20">
            <div>
              <div className="telemetry text-cyan-400">READY-TO-RUN BENCHMARK SCENARIOS</div>
              <h2 className="font-head text-2xl font-bold text-slate-100 mt-0.5">
                Direct Console Mission Launchers
              </h2>
            </div>
            <div className="telemetry text-xs text-slate-400 mt-2 sm:mt-0">
              Click any scenario to load imagery and open console
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESETS.map((p) => {
              const icon =
                p.icon === 'GitCompareArrows' ? (
                  <GitCompareArrows className="w-5 h-5 text-[#FF1744]" />
                ) : p.icon === 'Layers' ? (
                  <Layers className="w-5 h-5 text-[#FF7300]" />
                ) : p.icon === 'Crosshair' ? (
                  <Crosshair className="w-5 h-5 text-[#00E676]" />
                ) : p.icon === 'Waves' ? (
                  <Waves className="w-5 h-5 text-[#38BDF8]" />
                ) : (
                  <ScanSearch className="w-5 h-5 text-[#00F0FF]" />
                );

              return (
                <div
                  key={p.id}
                  data-testid={`preset-card-${p.id}`}
                  onClick={() => onLaunchPreset(p)}
                  className="sq-glass group rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-400/80 bg-[#121824]/75 hover:bg-[#182232]/90 transition-all cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,240,255,0.2)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/25">
                        {icon}
                      </div>
                      <span className="telemetry text-[10px] px-2 py-0.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                        {p.images.length} SCENE{p.images.length > 1 ? 'S' : ''}
                      </span>
                    </div>

                    <h3 className="font-head text-lg font-bold text-slate-100 group-hover:text-[#00F0FF] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono-x">
                      {p.subtitle}
                    </p>
                    <p className="text-xs text-slate-300 mt-3 line-clamp-2 italic bg-[#0B0E14]/60 p-2.5 rounded border border-white/5 font-sans">
                      "{p.query}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-xs font-mono-x text-cyan-400 group-hover:text-cyan-200">
                    <span>LAUNCH SCENARIO</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#FF7300]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. ARCHITECTURE HIGHLIGHTS */}
        <div className="sq-fade-up mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="sq-glass rounded-xl p-6 border border-cyan-500/20">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 w-fit mb-4 text-[#00F0FF]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-head text-xl font-bold text-slate-100">
              Optical + SAR Multimodal Fusion
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Synthesizes Sentinel-2 multispectral bands (B2, B3, B4, B8) with Sentinel-1 C-Band synthetic aperture radar backscatter (VV/VH) for cloud penetration and all-weather surface monitoring.
            </p>
          </div>

          <div className="sq-glass rounded-xl p-6 border border-cyan-500/20">
            <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30 w-fit mb-4 text-[#FF7300]">
              <GitCompareArrows className="w-6 h-6" />
            </div>
            <h3 className="font-head text-xl font-bold text-slate-100">
              Bi-Temporal Siamese ChangeNet
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Sub-pixel temporal diffing with Siamese attention encoders. Quantifies urban expansion, vegetation loss, and flood boundary shifts with sector-aware directional evidence proposals.
            </p>
          </div>

          <div className="sq-glass rounded-xl p-6 border border-cyan-500/20">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 w-fit mb-4 text-[#00E676]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-head text-xl font-bold text-slate-100">
              Auditable Deterministic DAG
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every inference step records input validation, co-registration verification, model routing, and spatial IoU confidence. Generates mission-grade PDF and JSON reports.
            </p>
          </div>
        </div>
      </main>

      {/* 8. FOOTER */}
      <footer className="relative z-20 w-full border-t border-cyan-500/15 py-6 px-6 sq-glass text-center telemetry text-[11px] text-slate-400">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-[#FF7300]" />
            <span>SATQUERY AI · MISSION ARCHITECTURE · LEO SUN-SYNCHRONOUS ORBIT</span>
          </div>
          <div>
            CRS: EPSG:4326 / EPSG:32644 · 10m / 5m GSD Grounding
          </div>
          <button
            onClick={onOpenConsole}
            className="text-cyan-400 hover:text-cyan-200 underline font-mono-x cursor-pointer"
          >
            Launch Console Cockpit →
          </button>
        </div>
      </footer>
    </div>
  );
};

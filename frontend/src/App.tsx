import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { Viewer } from './components/Viewer';
import { RightPanel } from './components/RightPanel';
import { BottomDock } from './components/BottomDock';
import { HistoryDrawer, HistoryItem } from './components/HistoryDrawer';
import { CompareModal } from './components/CompareModal';
import { HomePage } from './components/HomePage';
import {
  ImageSlot,
  AnalysisResponseData,
  dimsFromUrl,
  blobToBase64,
  imageDims,
  analyze,
  getRegistry
} from './lib/api';
import { Preset, generateLocalAnalysis } from './lib/demoData';


interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'console'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#console') {
      return 'console';
    }
    return 'home';
  });
  const [slots, setSlots] = useState<ImageSlot[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResponseData | null>(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [modelInfo, setModelInfo] = useState<any>(null);

  // Sync hash changes
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#console') setCurrentView('console');
      else if (window.location.hash === '#home') setCurrentView('home');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openConsole = () => {
    setCurrentView('console');
    window.location.hash = '#console';
  };

  const openHome = () => {
    setCurrentView('home');
    window.location.hash = '#home';
  };

  // History & Comparison state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [compareSel, setCompareSel] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  // Non-blocking toast notification system
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dispatchQuery = (q: string) => {
    window.dispatchEvent(new CustomEvent('sq-set-query', { detail: q }));
  };

  const loadPreset = async (p: Preset, showToast = true) => {
    if (showToast) {
      addToast(`Loading preset: ${p.title}…`, 'info');
      setAnalysis(null);
    }

    try {
      const built: ImageSlot[] = [];
      for (const img of p.images) {
        const { width, height } = await dimsFromUrl(img.url);
        built.push({
          name: img.name,
          preview: img.url,
          url: img.url,
          base64: null,
          width,
          height,
          modality: img.modality,
          timestamp: img.timestamp,
          meta: img.meta
        });
      }
      setSlots(built);
      dispatchQuery(p.query);
      if (showToast) addToast(`${p.title} loaded (${built.length} scenes)`, 'success');
    } catch {
      addToast('Failed to load preset imagery', 'error');
    }
  };

  const handleLaunchPreset = async (p: Preset) => {
    await loadPreset(p, true);
    openConsole();
  };

  // On mount: fetch model registry
  useEffect(() => {
    getRegistry()
      .then((d) => setModelInfo(d.model_info))
      .catch(() => {});
  }, []);

  const addFile = async (file: File) => {
    if (slots.length >= 2) {
      addToast('Maximum 2 scenes can be loaded for pair analysis', 'info');
      return;
    }
    try {
      const base64 = await blobToBase64(file);
      const { width, height } = await imageDims(base64);
      const isSar = file.name.toLowerCase().includes('sar') || file.name.toLowerCase().includes('vv') || file.name.toLowerCase().includes('vh');

      const slot: ImageSlot = {
        name: file.name,
        preview: `data:${file.type || 'image/jpeg'};base64,${base64}`,
        base64,
        modality: isSar ? 'sar' : 'optical',
        timestamp: new Date().toISOString().slice(0, 10),
        width,
        height,
        meta: {
          crs: 'EPSG:4326',
          resolution: '10 m/px',
          sensor: isSar ? 'SAR Sensor' : 'User Raster Upload'
        }
      };

      setSlots((prev) => [...prev, slot]);
      setAnalysis(null);
      addToast(`${file.name} uploaded successfully`, 'success');
    } catch {
      addToast('Failed to process uploaded file', 'error');
    }
  };

  const toggleModality = (idx: number) => {
    setSlots((prev) =>
      prev.map((s, i) =>
        i === idx ? { ...s, modality: s.modality === 'optical' ? 'sar' : 'optical' } : s
      )
    );
    addToast(`Toggled slot ${idx + 1} modality`, 'info');
  };

  const removeSlot = (idx: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== idx));
    setAnalysis(null);
  };

  const clearAll = () => {
    setSlots([]);
    setAnalysis(null);
    dispatchQuery('');
    addToast('Cleared all imagery slots', 'info');
  };

  const runAnalyze = async (query: string) => {
    if (!slots.length) {
      addToast('Please upload or select an imagery scene first', 'info');
      return;
    }
    setRunning(true);
    setStatus('running');
    setAnalysis(null);

    try {
      const payload = {
        query,
        images: slots.map((s) => ({
          name: s.name,
          modality: s.modality,
          timestamp: s.timestamp,
          base64: s.base64,
          url: s.url,
          width: s.width,
          height: s.height
        }))
      };

      const res = await analyze(payload);

      if (res.error) {
        addToast(res.error, 'error');
        setAnalysis(res);
      } else {
        setAnalysis(res);
        setHistory((h) => [
          {
            id: res.id || String(Date.now()),
            query,
            analysis: res,
            slots: [...slots],
            ts: Date.now()
          },
          ...h
        ].slice(0, 25));

        addToast(
          `${res.plan?.task_label || 'Analysis'} complete · ${res.confidence?.level || 'HIGH'} confidence`,
          'success'
        );
      }
      setStatus('done');
    } catch (e: any) {
      console.warn('Backend unavailable, engaging local demo reasoning engine:', e);
      const localRes = generateLocalAnalysis(query, slots);
      // Mark as offline/simulated
      (localRes as any)._offline = true;
      setAnalysis(localRes);
      setHistory((h) => [
        {
          id: localRes.id || String(Date.now()),
          query,
          analysis: localRes,
          slots: [...slots],
          ts: Date.now()
        },
        ...h
      ].slice(0, 25));
      addToast(
        '⚠ OFFLINE MODE: Backend unavailable — showing simulated demo analysis (not real AI inference)',
        'error'
      );
      setStatus('done');
    } finally {
      setRunning(false);
    }

  };

  const replay = (entry: HistoryItem) => {
    setSlots(entry.slots);
    setAnalysis(entry.analysis);
    dispatchQuery(entry.query);
    setStatus('done');
    setHistoryOpen(false);
    addToast('Replayed past analysis run', 'info');
  };

  const toggleCompare = (entry: HistoryItem) => {
    setCompareSel((sel) => {
      if (sel.includes(entry.id)) {
        return sel.filter((id) => id !== entry.id);
      }
      if (sel.length >= 2) {
        addToast('Two runs already pinned — unpin one first', 'info');
        return sel;
      }
      return [...sel, entry.id];
    });
  };

  const compareEntries = compareSel
    .map((id) => history.find((h) => h.id === id))
    .filter(Boolean) as HistoryItem[];

  if (currentView === 'home') {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-[#07090E] text-slate-100 antialiased font-sans">
        <HomePage
          onOpenConsole={openConsole}
          onLaunchPreset={handleLaunchPreset}
        />
        {/* Floating Toast Notifications */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`pointer-events-auto sq-glass rounded-lg px-4 py-2.5 text-xs font-mono-x border shadow-2xl flex items-center gap-2 sq-fade-up ${
                t.type === 'success'
                  ? 'border-emerald-500/50 text-emerald-300 bg-emerald-950/80'
                  : t.type === 'error'
                  ? 'border-rose-500/50 text-rose-300 bg-rose-950/80'
                  : 'border-cyan-500/40 text-cyan-300 bg-cyan-950/80'
              }`}
            >
              <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0B0E14] text-slate-100 antialiased select-none font-sans">
      {/* 1. Header Cockpit */}
      <Header
        status={status}
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenHome={openHome}
      />

      {/* 2. Main 3-Column Working Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Input imagery, Presets, GeoTIFF Upload */}
        <LeftPanel
          slots={slots}
          onLoadPreset={loadPreset}
          onAddFile={addFile}
          onRemove={removeSlot}
          onClear={clearAll}
          onToggleModality={toggleModality}
        />

        {/* Center: Geospatial Viewport + Bottom Dock */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Viewer
            key={slots.map((s) => s.preview).join('|')}
            slots={slots}
            analysis={analysis}
            running={running}
          />
          <BottomDock
            analysis={analysis}
            modelInfo={modelInfo}
            running={running}
          />
        </div>

        {/* Right: Natural-Language Query + Findings + Confidence */}
        <RightPanel
          slots={slots}
          analysis={analysis}
          running={running}
          onAnalyze={runAnalyze}
        />
      </div>

      {/* 3. Slide-over History Drawer */}
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        items={history}
        onReplay={replay}
        onClear={() => {
          setHistory([]);
          setCompareSel([]);
        }}
        compareSel={compareSel}
        onToggleCompare={toggleCompare}
        onOpenCompare={() => {
          setHistoryOpen(false);
          setCompareOpen(true);
        }}
      />

      {/* 4. Side-by-Side Comparison Modal */}
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        entries={compareEntries}
      />

      {/* 5. Floating Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto sq-glass rounded-lg px-4 py-2.5 text-xs font-mono-x border shadow-2xl flex items-center gap-2 sq-fade-up ${
              t.type === 'success'
                ? 'border-emerald-500/50 text-emerald-300 bg-emerald-950/80'
                : t.type === 'error'
                ? 'border-rose-500/50 text-rose-300 bg-rose-950/80'
                : 'border-cyan-500/40 text-cyan-300 bg-cyan-950/80'
            }`}
          >
            <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

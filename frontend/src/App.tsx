import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScenarioPicker } from './components/ScenarioPicker';
import { RasterViewer } from './components/RasterViewer';
import { QueryBar } from './components/QueryBar';
import { ResultCard } from './components/ResultCard';
import { ExecutionTraceDrawer } from './components/ExecutionTraceDrawer';
import { ModelRegistryModal } from './components/ModelRegistryModal';
import type { Scenario, ImageMetadata, QueryResponse, ModelRegistryEntry } from './types';
import { api } from './services/api';
import { AlertCircle, Compass } from 'lucide-react';

export const App: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [loadedImages, setLoadedImages] = useState<ImageMetadata[]>([]);
  const [queryResult, setQueryResult] = useState<QueryResponse | null>(null);
  const [models, setModels] = useState<ModelRegistryEntry[]>([]);

  const [isLoadingScenario, setIsLoadingScenario] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isTraceOpen, setIsTraceOpen] = useState(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize: fetch scenarios, model registry, and load Scenario 1 by default
  useEffect(() => {
    const initApp = async () => {
      try {
        const [scList, regList] = await Promise.all([
          api.fetchSamples(),
          api.fetchRegistry(),
        ]);
        setScenarios(scList);
        setModels(regList);

        // Load Scenario 1 by default
        if (scList.length > 0) {
          handleSelectScenario(scList[0].id);
        }
      } catch (err: any) {
        console.error('Initialization error:', err);
        setErrorMsg('Failed to connect to SatQuery AI backend. Please ensure the backend is running on port 8000.');
      }
    };
    initApp();
  }, []);

  const handleSelectScenario = async (scenarioId: string) => {
    setIsLoadingScenario(true);
    setErrorMsg(null);
    try {
      const res = await api.loadScenario(scenarioId);
      setActiveScenario(res.scenario);
      setLoadedImages(res.loaded_images);
      setQueryResult(null); // Reset query result on scenario switch
    } catch (err: any) {
      console.error('Failed to load scenario:', err);
      setErrorMsg(err.message || 'Error loading scenario dataset.');
    } finally {
      setIsLoadingScenario(false);
    }
  };

  const handleQuerySubmit = async (queryText: string, taskOverride?: string) => {
    if (loadedImages.length === 0) return;
    setIsQuerying(true);
    setErrorMsg(null);

    const imgIds = loadedImages.map((img) => img.image_id);
    try {
      const response = await api.submitQuery(imgIds, queryText, taskOverride);
      setQueryResult(response);
    } catch (err: any) {
      console.error('Query execution error:', err);
      setErrorMsg(err.message || 'Analysis failed. Please check input pairing.');
    } finally {
      setIsQuerying(false);
    }
  };

  const activeMode = activeScenario?.mode || 'single';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500/30">
      {/* Top Navigation */}
      <Navbar onOpenRegistry={() => setIsRegistryOpen(true)} activeMode={activeMode} />

      {/* Global Error Notification */}
      {errorMsg && (
        <div className="max-w-7xl mx-auto px-6 pt-4 w-full">
          <div className="bg-rose-950/40 border border-rose-500/50 rounded-xl p-3.5 flex items-center justify-between text-xs text-rose-200 shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-rose-400 hover:text-rose-200 font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6">
        {/* Scenario 1-Click Selectors */}
        <ScenarioPicker
          scenarios={scenarios}
          activeScenarioId={activeScenario?.id}
          onSelectScenario={handleSelectScenario}
          isLoading={isLoadingScenario}
        />

        {/* Studio Grid: Left Canvas (60%) + Right Intelligence Panel (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Raster Canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <RasterViewer
              images={loadedImages}
              evidence={queryResult?.visual_evidence}
              activeMode={activeMode}
            />
          </div>

          {/* Right Column: Query & Intelligence Results */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Natural Language Query Bar */}
            <QueryBar
              onQuerySubmit={handleQuerySubmit}
              suggestedQueries={activeScenario?.suggested_queries || []}
              isLoading={isQuerying}
              disabled={loadedImages.length === 0}
            />

            {/* Results or Idle Prompt */}
            {queryResult ? (
              <ResultCard
                result={queryResult}
                onOpenTrace={() => setIsTraceOpen(true)}
              />
            ) : (
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
                <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 border border-sky-500/20">
                  <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1">
                    Agentic Controller Standing By
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Select a suggested question chip above or type a custom natural language query to trigger specialist AI inference.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / System Status */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-3 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Agentic Multi-Model Registry: 4 Active Specialists</span>
          </div>
          <div>Smart India Hackathon 2026 • ISRO / Department of Space • Category: Software</div>
        </div>
      </footer>

      {/* Auditable Execution Trace Drawer */}
      {queryResult && (
        <ExecutionTraceDrawer
          trace={queryResult.execution_trace}
          isOpen={isTraceOpen}
          onClose={() => setIsTraceOpen(false)}
        />
      )}

      {/* Specialist Model Registry Modal */}
      <ModelRegistryModal
        models={models}
        isOpen={isRegistryOpen}
        onClose={() => setIsRegistryOpen(false)}
      />
    </div>
  );
};

export default App;

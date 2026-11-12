import React, { useState, useEffect } from 'react';
import {
  X,
  Globe,
  Satellite,
  Search,
  Calendar,
  Cloud,
  Sun,
  Radar,
  Loader2,
  CheckCircle2,
  Layers,
  ArrowRight,
  GitCompareArrows,
  Sparkles,
  MapPin,
  Zap,
  Clock
} from 'lucide-react';
import {
  StacPassItem,
  StacPresetLocation,
  StacSearchResult,
  ImageSlot,
  getStacPresets,
  searchStac,
  ingestStac,
  resolveAssetUrl
} from '../lib/api';

interface StacModalProps {
  open: boolean;
  onClose: () => void;
  onIngestSlot: (slot: ImageSlot, targetIndex?: 0 | 1) => void;
  onIngestPair?: (slot1: ImageSlot, slot2: ImageSlot, defaultQuery?: string) => void;
}

export const StacModal: React.FC<StacModalProps> = ({
  open,
  onClose,
  onIngestSlot,
  onIngestPair
}) => {
  const [presets, setPresets] = useState<StacPresetLocation[]>([]);
  const [locationQuery, setLocationQuery] = useState('Mumbai');
  const [modality, setModality] = useState<'optical' | 'sar'>('optical');
  const [maxCloud, setMaxCloud] = useState(20);
  const [dateRangeMode, setDateRangeMode] = useState<'180d' | '30d' | 'bitemporal'>('180d');
  const [loading, setLoading] = useState(false);
  const [ingestingId, setIngestingId] = useState<string | null>(null);
  const [ingestStatusMsg, setIngestStatusMsg] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<StacSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getDateParams = (mode: '180d' | '30d' | 'bitemporal') => {
    const now = new Date();
    const end_date = now.toISOString().slice(0, 10);
    let start_date = '';
    if (mode === '30d') {
      const d = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
      start_date = d.toISOString().slice(0, 10);
    } else if (mode === 'bitemporal') {
      start_date = '2024-01-01';
    } else {
      // 180d
      const d = new Date(now.getTime() - 180 * 24 * 3600 * 1000);
      start_date = d.toISOString().slice(0, 10);
    }
    return { start_date, end_date };
  };

  // Load presets on initial open
  useEffect(() => {
    if (open && presets.length === 0) {
      getStacPresets().then((data) => {
        if (data && data.length > 0) setPresets(data);
      });
      handleSearch('Mumbai', 'optical', 20, '180d');
    }
  }, [open]);

  const handleSearch = async (
    locText = locationQuery,
    mod = modality,
    cloudLimit = maxCloud,
    rangeMode = dateRangeMode
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { start_date, end_date } = getDateParams(rangeMode);
      const res = await searchStac({
        location: locText,
        modality: mod,
        max_cloud_cover: mod === 'optical' ? cloudLimit : 100,
        start_date,
        end_date,
        limit: 8
      });
      setSearchResult(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to search STAC satellite catalogs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (p: StacPresetLocation) => {
    setLocationQuery(p.name);
    handleSearch(p.name, modality, maxCloud, dateRangeMode);
  };

  const handleIngest = async (passItem: StacPassItem, targetIndex: 0 | 1 = 0) => {
    setIngestingId(passItem.id);
    setIngestStatusMsg(`Caching & streaming ${passItem.platform} (${passItem.resolution})…`);
    try {
      const slot = await ingestStac(passItem);
      onIngestSlot(slot, targetIndex);
      onClose();
    } catch (err: any) {
      alert(`Ingestion failed: ${err.message}`);
    } finally {
      setIngestingId(null);
      setIngestStatusMsg(null);
    }
  };

  const handleBiTemporalIngest = async (p1: StacPassItem, p2: StacPassItem) => {
    setIngestingId('pair');
    setIngestStatusMsg('Streaming bi-temporal satellite pair (T1 before & T2 after)…');
    try {
      // Sort chronologically (earlier first = T1, later = T2)
      const [earlier, later] = [p1, p2].sort((a, b) => a.datetime.localeCompare(b.datetime));
      const slot1 = await ingestStac(earlier);
      const slot2 = await ingestStac(later);
      if (onIngestPair) {
        onIngestPair(slot1, slot2, `What changed between ${slot1.name} and ${slot2.name}?`);
      } else {
        onIngestSlot(slot1, 0);
        onIngestSlot(slot2, 1);
      }
      onClose();
    } catch (err: any) {
      alert(`Pair ingestion failed: ${err.message}`);
    } finally {
      setIngestingId(null);
      setIngestStatusMsg(null);
    }
  };

  const handleFusionPairIngest = async () => {
    if (!searchResult || !searchResult.passes || searchResult.passes.length === 0) return;
    setIngestingId('fusion_pair');
    setIngestStatusMsg('Assembling Optical + SAR Cross-Modal Fusion Pair…');
    try {
      let optPass: StacPassItem | null = null;
      let sarPass: StacPassItem | null = null;

      if (modality === 'optical') {
        optPass = searchResult.passes[0];
        // Query matching SAR pass for this location
        const sarRes = await searchStac({
          location: locationQuery,
          modality: 'sar',
          limit: 3
        });
        if (sarRes.passes && sarRes.passes.length > 0) {
          sarPass = sarRes.passes[0];
        }
      } else {
        sarPass = searchResult.passes[0];
        // Query matching Optical pass for this location
        const optRes = await searchStac({
          location: locationQuery,
          modality: 'optical',
          max_cloud_cover: 30,
          limit: 3
        });
        if (optRes.passes && optRes.passes.length > 0) {
          optPass = optRes.passes[0];
        }
      }

      if (!optPass || !sarPass) {
        throw new Error('Unable to retrieve matching Optical and SAR passes for this coordinate.');
      }

      setIngestStatusMsg('Downloading Sentinel-2 MSI Optical raster (10m)…');
      const slotOpt = await ingestStac(optPass);
      setIngestStatusMsg('Downloading Sentinel-1 C-Band SAR radar raster (10m)…');
      const slotSar = await ingestStac(sarPass);

      if (onIngestPair) {
        onIngestPair(
          slotOpt,
          slotSar,
          'Use the optical and SAR images to identify built-up areas and infrastructure.'
        );
      } else {
        onIngestSlot(slotOpt, 0);
        onIngestSlot(slotSar, 1);
      }
      onClose();
    } catch (err: any) {
      alert(`Cross-modal fusion pair ingestion failed: ${err.message}`);
    } finally {
      setIngestingId(null);
      setIngestStatusMsg(null);
    }
  };

  if (!open) return null;

  const passes = searchResult?.passes || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#0B0E14] border border-cyan-500/35 rounded-2xl shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden sq-fade-up">
        {/* Modal Header Cockpit */}
        <div className="px-6 py-4 border-b border-cyan-500/20 bg-[#121824]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF] sq-glow-cyan">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-head text-lg font-bold text-slate-100 tracking-wide">
                  LIVE SATELLITE CATALOG · STAC INGESTION
                </h3>
                <span className="text-[10px] font-mono-x px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  COPERNICUS SENTINEL-1/2
                </span>
              </div>
              <div className="text-xs font-mono-x text-slate-400 mt-0.5">
                Query public SpatioTemporal Asset Catalogs (Planetary Computer & AWS STAC) for real 10m Earth observation passes.
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="sq-btn p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Preset Location Quick-Bar */}
        <div className="px-6 py-2.5 bg-[#0B0E14] border-b border-cyan-500/15 overflow-x-auto flex items-center gap-1.5 text-xs font-mono-x">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#FF7300]" />
            GLOBAL SITES:
          </span>
          {presets.map((p) => {
            const isMatch =
              locationQuery.toLowerCase().includes(p.id) ||
              locationQuery.toLowerCase().includes(p.name.split(',')[0].toLowerCase());
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`sq-btn px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isMatch
                    ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400 sq-glow'
                    : 'bg-[#182232] text-slate-300 hover:text-white border border-cyan-500/20 hover:border-cyan-400/50'
                }`}
              >
                <span>{p.flag}</span>
                <span>{p.name.split(',')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Search Query Controls */}
        <div className="px-6 py-4 bg-[#121824]/50 border-b border-cyan-500/15 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Location Input + Explicit Search Button */}
            <div className="md:col-span-5 relative">
              <div className="text-[10px] font-mono-x text-cyan-400 mb-1 flex items-center gap-1">
                <Search className="w-3 h-3 text-cyan-400" />
                <span>SEARCH CITY OR LAT, LON BOUNDS</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="e.g. Dubai, Valencia, 19.07, 72.87…"
                  className="flex-1 bg-[#0B0E14] border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:sq-glow font-mono-x"
                />
                <button
                  data-testid="stac-search-submit-btn"
                  onClick={() => handleSearch()}
                  disabled={loading}
                  className="sq-btn px-3.5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-[#00F0FF] border border-cyan-400 font-bold text-xs font-mono-x flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  <span>SEARCH</span>
                </button>
              </div>
            </div>

            {/* Sensor Modality Switcher */}
            <div className="md:col-span-4">
              <div className="text-[10px] font-mono-x text-cyan-400 mb-1 flex items-center gap-1">
                <Satellite className="w-3 h-3 text-[#FF7300]" />
                <span>SENSOR & MODALITY</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0B0E14] rounded-lg border border-cyan-500/30">
                <button
                  onClick={() => {
                    setModality('optical');
                    handleSearch(locationQuery, 'optical', maxCloud, dateRangeMode);
                  }}
                  className={`sq-btn py-1 rounded text-xs font-mono-x flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    modality === 'optical'
                      ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3 h-3 text-[#00F0FF]" />
                  <span>SENTINEL-2 (OPT)</span>
                </button>
                <button
                  onClick={() => {
                    setModality('sar');
                    handleSearch(locationQuery, 'sar', 100, dateRangeMode);
                  }}
                  className={`sq-btn py-1 rounded text-xs font-mono-x flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    modality === 'sar'
                      ? 'bg-[#FF7300]/20 text-[#FF7300] border border-[#FF7300] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Radar className="w-3 h-3 text-[#FF7300]" />
                  <span>SENTINEL-1 (SAR)</span>
                </button>
              </div>
            </div>

            {/* Max Cloud Cover Filter (Optical only) */}
            <div className="md:col-span-3">
              <div className="text-[10px] font-mono-x text-cyan-400 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  <span>MAX CLOUD COVER</span>
                </span>
                <span className="text-[#00F0FF] font-bold">
                  {modality === 'sar' ? 'ALL-WEATHER' : `≤ ${maxCloud}%`}
                </span>
              </div>
              {modality === 'optical' ? (
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={maxCloud}
                  onChange={(e) => setMaxCloud(Number(e.target.value))}
                  onMouseUp={() => handleSearch(locationQuery, modality, maxCloud, dateRangeMode)}
                  className="w-full h-2 accent-[#00F0FF] bg-slate-700/80 rounded-lg cursor-pointer"
                />
              ) : (
                <div className="text-[11px] font-mono-x text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded py-1.5 px-2 text-center">
                  Radar penetrates clouds & night
                </div>
              )}
            </div>
          </div>

          {/* Date Range Selector Bar */}
          <div className="flex items-center gap-2 pt-1 border-t border-cyan-500/10 text-xs font-mono-x">
            <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-wider">
              <Clock className="w-3 h-3 text-cyan-400" />
              TEMPORAL RANGE:
            </span>
            <div className="flex gap-1.5">
              {[
                { id: '180d', label: 'PAST 6 MONTHS (DEFAULT)' },
                { id: '30d', label: 'PAST 30 DAYS (RECENT)' },
                { id: 'bitemporal', label: 'BI-TEMPORAL (2024–2026 CHANGE)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    const mode = tab.id as any;
                    setDateRangeMode(mode);
                    handleSearch(locationQuery, modality, maxCloud, mode);
                  }}
                  className={`sq-btn px-2.5 py-0.5 rounded text-[10.5px] transition-all cursor-pointer ${
                    dateRangeMode === tab.id
                      ? 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400/80 font-bold'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Header Status & Multi-Pass Fusion Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono-x text-slate-400 pb-2 border-b border-cyan-500/15">
            <div>
              <span>SEARCH RESULTS: </span>
              <span className="text-cyan-300 font-bold">{searchResult?.location?.name || locationQuery}</span>
              <span className="text-slate-600 mx-2">|</span>
              <span className="text-emerald-400">{passes.length} live pass(es) discovered</span>
            </div>

            {/* Quick 1-Click Multi-Pass Ingestion Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* 1-Click Bi-temporal Pair */}
              {passes.length >= 2 && modality === 'optical' && (
                <button
                  onClick={() => handleBiTemporalIngest(passes[0], passes[Math.min(2, passes.length - 1)])}
                  disabled={Boolean(ingestingId)}
                  className="sq-btn px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF7300] to-amber-500 hover:from-amber-500 hover:to-[#FF7300] text-black font-bold flex items-center gap-1.5 sq-glow-orange transition-all disabled:opacity-50 cursor-pointer"
                  title="Ingests two optical passes across time for automated change detection"
                >
                  <GitCompareArrows className="w-3.5 h-3.5" />
                  <span>1-CLICK BI-TEMPORAL PAIR (T1 & T2)</span>
                </button>
              )}

              {/* 1-Click Optical + SAR Cross-Modal Fusion Pair */}
              {passes.length >= 1 && (
                <button
                  onClick={handleFusionPairIngest}
                  disabled={Boolean(ingestingId)}
                  className="sq-btn px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-emerald-400 hover:to-cyan-400 text-black font-bold flex items-center gap-1.5 sq-glow transition-all disabled:opacity-50 cursor-pointer"
                  title="Ingests matching Optical (Sentinel-2) and SAR (Sentinel-1) passes for multi-sensor fusion"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>1-CLICK OPTICAL + SAR FUSION</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Ingest Status Banner */}
          {ingestStatusMsg && (
            <div className="p-3 rounded-lg bg-cyan-950/60 border border-cyan-400/40 text-cyan-200 text-xs font-mono-x flex items-center gap-2 sq-fade-up">
              <Loader2 className="w-4 h-4 animate-spin text-[#00F0FF]" />
              <span>{ingestStatusMsg}</span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#00F0FF] mb-3" />
              <div className="font-head text-base font-bold text-slate-200">
                Querying Satellite Asset Catalogs…
              </div>
              <div className="text-xs font-mono-x text-slate-500 mt-1 max-w-sm">
                Resolving spatial bounding box and fetching Copernicus Sentinel passes via Planetary Computer STAC endpoint…
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono-x flex items-center gap-3">
              <X className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <div className="font-bold">Catalog Query Interrupted</div>
                <div className="text-slate-300 mt-0.5">{error}</div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && passes.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <Satellite className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <div className="font-head text-sm font-bold text-slate-300">
                No matching satellite passes found
              </div>
              <div className="text-xs font-mono-x text-slate-500 mt-1">
                Try widening your cloud cover threshold, extending the date range, or selecting one of the global sites above.
              </div>
            </div>
          )}

          {/* Satellite Passes Grid */}
          {!loading && !error && passes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {passes.map((p, idx) => {
                const isIngesting = ingestingId === p.id;
                const isOptical = p.modality === 'optical';
                return (
                  <div
                    key={p.id || idx}
                    className="rounded-xl border border-cyan-500/20 bg-[#121824] hover:border-cyan-400/60 transition-all flex flex-col overflow-hidden group shadow-lg relative"
                  >
                    {/* Active Ingesting Card Overlay */}
                    {isIngesting && (
                      <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                        <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin mb-2" />
                        <div className="font-mono-x text-xs font-bold text-cyan-200">
                          DOWNLOADING RASTER…
                        </div>
                        <div className="text-[10px] font-mono-x text-slate-400 mt-1">
                          Caching 10m GSD surface reflection to local pipeline
                        </div>
                      </div>
                    )}

                    {/* Thumbnail / High-Res Preview */}
                    <div className="relative aspect-video bg-[#0B0E14] overflow-hidden">
                      <img
                        src={resolveAssetUrl(p.preview_url || p.thumbnail_url)}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to static sample if external thumb expires
                          (e.currentTarget as HTMLImageElement).src = isOptical
                            ? '/static/demo_images/change_after.jpg'
                            : '/static/demo_images/sar_delta.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="telemetry bg-black/80 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded text-[10px]">
                          {p.platform}
                        </span>
                        {isOptical ? (
                          <span className="telemetry bg-black/80 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                            <Cloud className="w-2.5 h-2.5" />
                            <span>{p.cloud_cover_pct}% CLOUD</span>
                          </span>
                        ) : (
                          <span className="telemetry bg-black/80 border border-[#FF7300]/40 text-[#FF7300] px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                            <Radar className="w-2.5 h-2.5" />
                            <span>RADAR SAR</span>
                          </span>
                        )}
                      </div>

                      {/* Timestamp Tag */}
                      <div className="absolute bottom-2 left-2 text-[11px] font-mono-x font-bold text-slate-100 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#00F0FF]" />
                        <span>{p.date_formatted}</span>
                      </div>
                    </div>

                    {/* Card Content & Action Bar */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 font-mono-x text-xs">
                      <div className="space-y-1">
                        <div className="text-[11px] text-slate-300 truncate font-semibold">
                          {p.title}
                        </div>
                        <div className="flex justify-between text-[10.5px] text-slate-400">
                          <span>Sensor:</span>
                          <span className="text-cyan-300">{p.sensor}</span>
                        </div>
                        <div className="flex justify-between text-[10.5px] text-slate-400">
                          <span>Resolution:</span>
                          <span className="text-emerald-400">{p.resolution}</span>
                        </div>
                        <div className="flex justify-between text-[10.5px] text-slate-400">
                          <span>Catalog Source:</span>
                          <span className="text-slate-300 truncate max-w-[140px]">{p.source}</span>
                        </div>
                      </div>

                      {/* Ingestion Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-500/15">
                        <button
                          onClick={() => handleIngest(p, 0)}
                          disabled={Boolean(ingestingId)}
                          className="sq-btn py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-[#00F0FF] border border-cyan-400/40 text-[11px] font-bold flex items-center justify-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                          title="Load this scene into primary slot (T1 / Base Optical)"
                        >
                          {isIngesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Layers className="w-3 h-3" />}
                          <span>LOAD T1 (BASE)</span>
                        </button>

                        <button
                          onClick={() => handleIngest(p, 1)}
                          disabled={Boolean(ingestingId)}
                          className="sq-btn py-1.5 rounded-lg bg-[#FF7300]/20 hover:bg-[#FF7300]/30 text-[#FF7300] border border-[#FF7300]/40 text-[11px] font-bold flex items-center justify-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                          title="Load this scene into comparison slot (T2 / SAR)"
                        >
                          {isIngesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <GitCompareArrows className="w-3 h-3" />}
                          <span>LOAD T2 (COMP)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/20 bg-[#121824]/90 flex items-center justify-between text-[11px] font-mono-x text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 sq-pulse" />
            <span>STAC API: Planetary Computer & Earth Search Live Endpoints Active</span>
          </div>
          <button
            onClick={onClose}
            className="sq-btn px-4 py-1 rounded-lg border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-white cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};

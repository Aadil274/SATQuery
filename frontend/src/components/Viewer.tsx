import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  EyeOff,
  SplitSquareHorizontal,
  Flame,
  Sun,
  Radar,
  Crosshair,
  Layers,
  Crop,
  Sparkles,
  Copy,
  Check,
  X,
  Target,
  Trash2
} from 'lucide-react';
import { ImageSlot, AnalysisResponseData, EvidenceRegionData, resolveAssetUrl } from '../lib/api';
import { REGION_COLORS } from '../lib/demoData';

interface ViewerProps {
  slots: ImageSlot[];
  analysis: AnalysisResponseData | null;
  running: boolean;
  roi?: [number, number, number, number] | null;
  onRoiChange?: (roi: [number, number, number, number] | null) => void;
  selectedRegionId?: string | null;
  onSelectRegion?: (region: EvidenceRegionData | null) => void;
  onQueryRoi?: (roi: [number, number, number, number]) => void;
  onQueryRegion?: (region: EvidenceRegionData) => void;
}

function parseGsdMeters(resStr: string): number {
  const match = resStr.match(/(\d+\.?\d*)\s*m/i);
  return match ? parseFloat(match[1]) : 10.0;
}

function parseCenterCoords(locStr: string): { lat: number; lon: number } | null {
  const match = locStr.match(/([+-]?\d+\.?\d*)\s*°?\s*([NS])?.*?([+-]?\d+\.?\d*)\s*°?\s*([EW])?/i);
  if (!match) return null;
  let lat = parseFloat(match[1]);
  if (match[2] && match[2].toUpperCase() === 'S') lat = -lat;
  let lon = parseFloat(match[3]);
  if (match[4] && match[4].toUpperCase() === 'W') lon = -lon;
  return { lat, lon };
}

function computeSpatialMetrics(
  box: [number, number, number, number],
  gsd: number,
  imgW: number = 512,
  imgH: number = 512,
  centerCoords: { lat: number; lon: number } | null = null
) {
  const [x, y, w, h] = box;
  const wM = Math.max(1, Math.round(w * imgW * gsd));
  const hM = Math.max(1, Math.round(h * imgH * gsd));
  const areaM2 = wM * hM;
  const ha = Math.round((areaM2 / 10000) * 10) / 10;
  const km2 = Math.round((areaM2 / 1000000) * 1000) / 1000;

  let gpsStr = 'Scene Relative Grid';
  let centroid = { lat: 0, lon: 0 };
  if (centerCoords) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const deltaXm = (cx - 0.5) * (imgW * gsd);
    const deltaYm = -(cy - 0.5) * (imgH * gsd);
    const lat = centerCoords.lat + deltaYm / 111000;
    const lon = centerCoords.lon + deltaXm / (111000 * Math.cos((centerCoords.lat * Math.PI) / 180));
    centroid = { lat, lon };
    const latHemi = lat >= 0 ? 'N' : 'S';
    const lonHemi = lon >= 0 ? 'E' : 'W';
    gpsStr = `${Math.abs(lat).toFixed(4)}° ${latHemi}, ${Math.abs(lon).toFixed(4)}° ${lonHemi}`;
  }

  return {
    wM,
    hM,
    ha: ha > 0 ? ha : 0.1,
    km2: km2 > 0 ? km2 : 0.001,
    gpsStr,
    centroid
  };
}

export const Viewer: React.FC<ViewerProps> = ({
  slots,
  analysis,
  running,
  roi: controlledRoi,
  onRoiChange,
  selectedRegionId: controlledSelectedRegionId,
  onSelectRegion,
  onQueryRoi,
  onQueryRegion
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showRegions, setShowRegions] = useState(true);
  const [opacity] = useState(85);
  const [split, setSplit] = useState(50);
  const [splitMode, setSplitMode] = useState(true);
  const [layer, setLayer] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(85);

  // ROI interactive drawing states
  const [isDrawingRoi, setIsDrawingRoi] = useState(false);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [roiLive, setRoiLive] = useState<[number, number, number, number] | null>(null);
  const [internalRoi, setInternalRoi] = useState<[number, number, number, number] | null>(null);
  const activeRoi = controlledRoi !== undefined ? controlledRoi : internalRoi;
  const roiStart = useRef<{ x: number; y: number } | null>(null);

  // Evidence Region Selection state
  const [internalSelectedRegion, setInternalSelectedRegion] = useState<EvidenceRegionData | null>(null);
  const [copiedGeoJson, setCopiedGeoJson] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);

  const task = analysis?.task || (slots.length === 2 && slots.some((s) => s.modality === 'sar') ? 'cross_modal' : slots.length === 2 ? 'change' : 'vqa');
  const isPair = slots.length === 2;
  const primaryIdx = task === 'cross_modal' ? Math.max(0, slots.findIndex((s) => s.modality === 'optical')) : isPair ? 1 : 0;
  const primarySlot = slots[primaryIdx] || slots[0];
  const aspectW = primarySlot?.width || slots[0]?.width || 512;
  const aspectH = primarySlot?.height || slots[0]?.height || 512;
  const containerAspect = (aspectW && aspectH) ? `${aspectW} / ${aspectH}` : '1 / 1';
  const isWiderThanSquare = Boolean(aspectW && aspectH && aspectW > aspectH);

  const rawRegions = ((analysis?.result?.evidence_regions || analysis?.evidence_regions || []) as EvidenceRegionData[]).filter(
    (r) => r.type !== 'target' || r.id !== 'user_roi_focus'
  );
  const regions = showRegions ? rawRegions : [];
  const changeRegions = rawRegions.filter((r) => r.type === 'change');

  const heatmap = analysis?.result?.heatmap || analysis?.heatmap;
  const isHeatmapEligible = Boolean(
    heatmap ||
    task === 'change' ||
    task === 'flood' ||
    task === 'water' ||
    slots.length >= 2 ||
    changeRegions.length > 0 ||
    (analysis?.query && /heat|flood|water|inundat|change|densit|built|urban|diff/i.test(analysis.query))
  );

  const locationStr = analysis?.input_information?.location && !analysis.input_information.location.includes("Unknown")
    ? analysis.input_information.location
    : (slots[0]?.meta?.coordinates || slots[0]?.meta?.crs || "Center: 0.0000° N, 0.0000° E (Unreferenced)");

  const resolutionStr = analysis?.input_information?.resolution && !analysis.input_information.resolution.includes("Unknown")
    ? analysis.input_information.resolution
    : (slots[0]?.meta?.resolution || "10.0m / pixel (Sentinel-2)");

  const gsdMeters = parseGsdMeters(resolutionStr);
  const centerCoords = parseCenterCoords(locationStr);

  // Sync selected region
  const selectedRegion = controlledSelectedRegionId !== undefined
    ? rawRegions.find((r) => r.id === controlledSelectedRegionId) || null
    : internalSelectedRegion;

  // Cancel drawing on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawingRoi) {
        setIsDrawingRoi(false);
        setRoiLive(null);
        setIsDrawingActive(false);
        roiStart.current = null;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawingRoi]);

  // Zoom handlers
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.min(5, Math.max(1, z + (e.deltaY < 0 ? 0.2 : -0.2))));
  };

  const onDown = (e: React.MouseEvent) => {
    if (isDrawingRoi) return;
    setIsDragging(true);
    dragging.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };

  const onMove = (e: React.MouseEvent) => {
    if (!dragging.current || isDrawingRoi) return;
    setPan({
      x: e.clientX - dragging.current.x,
      y: e.clientY - dragging.current.y
    });
  };

  const onUp = () => {
    setIsDragging(false);
    dragging.current = null;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const zoomToBox = (box: [number, number, number, number]) => {
    const [x, y, w, h] = box;
    const targetZoom = Math.min(4.5, Math.max(1.8, 0.6 / Math.max(w, h)));
    setZoom(targetZoom);
    const cx = x + w / 2;
    const cy = y + h / 2;
    const boxRect = imageBoxRef.current?.getBoundingClientRect();
    const imgW = boxRect?.width || 600;
    const imgH = boxRect?.height || 600;
    const targetPanX = (0.5 - cx) * imgW * targetZoom;
    const targetPanY = (0.5 - cy) * imgH * targetZoom;
    setPan({ x: targetPanX, y: targetPanY });
  };

  // ROI Mouse Down on Image Container
  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (!isDrawingRoi) return;
    e.stopPropagation();
    e.preventDefault();
    const rect = imageBoxRef.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const startY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    roiStart.current = { x: startX, y: startY };
    setRoiLive([startX, startY, 0, 0]);
    setIsDrawingActive(true);

    const onWindowMove = (ev: MouseEvent) => {
      if (!roiStart.current || !imageBoxRef.current) return;
      const r = imageBoxRef.current.getBoundingClientRect();
      const curX = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
      const curY = Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height));
      const x = Math.min(roiStart.current.x, curX);
      const y = Math.min(roiStart.current.y, curY);
      const w = Math.abs(curX - roiStart.current.x);
      const h = Math.abs(curY - roiStart.current.y);
      setRoiLive([x, y, w, h]);
    };

    const onWindowUp = (ev: MouseEvent) => {
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseup', onWindowUp);
      if (!roiStart.current || !imageBoxRef.current) return;
      const r = imageBoxRef.current.getBoundingClientRect();
      const curX = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
      const curY = Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height));
      const x = Math.min(roiStart.current.x, curX);
      const y = Math.min(roiStart.current.y, curY);
      const w = Math.abs(curX - roiStart.current.x);
      const h = Math.abs(curY - roiStart.current.y);

      if (w > 0.02 && h > 0.02) {
        const finalBox: [number, number, number, number] = [
          Math.round(x * 1000) / 1000,
          Math.round(y * 1000) / 1000,
          Math.round(w * 1000) / 1000,
          Math.round(h * 1000) / 1000
        ];
        setInternalRoi(finalBox);
        onRoiChange?.(finalBox);
        setIsDrawingRoi(false);
      }
      setRoiLive(null);
      setIsDrawingActive(false);
      roiStart.current = null;
    };

    window.addEventListener('mousemove', onWindowMove);
    window.addEventListener('mouseup', onWindowUp);
  };

  const handleClearRoi = () => {
    setInternalRoi(null);
    onRoiChange?.(null);
  };

  const handleSelectRegion = (r: EvidenceRegionData | null) => {
    setInternalSelectedRegion(r);
    onSelectRegion?.(r);
  };

  const handleCopyGeoJsonFeature = () => {
    if (!selectedRegion) return;
    const metrics = computeSpatialMetrics(selectedRegion.box, gsdMeters, aspectW, aspectH, centerCoords);
    const [x, y, w, h] = selectedRegion.box;
    const feature = {
      type: "Feature",
      properties: {
        id: selectedRegion.id,
        label: selectedRegion.label,
        type: selectedRegion.type,
        confidence: selectedRegion.confidence,
        area_hectares: metrics.ha,
        area_km2: metrics.km2,
        dimensions_meters: `${metrics.wM}m x ${metrics.hM}m`,
        centroid_gps: metrics.gpsStr
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [x, y],
          [x + w, y],
          [x + w, y + h],
          [x, y + h],
          [x, y]
        ]]
      }
    };
    navigator.clipboard.writeText(JSON.stringify(feature, null, 2));
    setCopiedGeoJson(true);
    setTimeout(() => setCopiedGeoJson(false), 2000);
  };

  const leftImg = isPair
    ? (task === 'cross_modal'
        ? slots.find((s) => s.modality === 'optical') || slots[0]
        : slots[0])
    : slots[0];

  const rightImg = isPair
    ? (task === 'cross_modal'
        ? slots.find((s) => s.modality === 'sar') || slots[1] || slots[0]
        : slots[1] || slots[0])
    : slots[0];

  const singleView = !isPair || !splitMode;
  const shown = singleView ? slots[layer] || slots[0] : null;

  const roiMetrics = activeRoi ? computeSpatialMetrics(activeRoi, gsdMeters, aspectW, aspectH, centerCoords) : null;
  const selectedMetrics = selectedRegion ? computeSpatialMetrics(selectedRegion.box, gsdMeters, aspectW, aspectH, centerCoords) : null;
  const selectedRegionColor = selectedRegion ? (REGION_COLORS[selectedRegion.type] || REGION_COLORS.object) : null;

  return (
    <section
      data-testid="viewer"
      className="flex-1 relative flex flex-col bg-[#0B0E14] overflow-hidden select-none"
    >
      {/* Top Left: Viewport Badge */}
      <div className="absolute top-3 left-3 z-20 telemetry sq-glass rounded px-2.5 py-1 flex items-center gap-1.5 border border-cyan-500/20">
        <Crosshair className="w-3.5 h-3.5 text-[#FF7300]" />
        <span>GEOSPATIAL VIEWPORT · EPSG:4326</span>
      </div>

      {/* Top Center: ROI Drawing Banner */}
      {isDrawingRoi && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 sq-glass rounded-full px-4 py-1 text-xs font-mono-x border border-[#00F0FF]/50 bg-black/90 text-[#00F0FF] flex items-center gap-2 sq-fade-up shadow-2xl backdrop-blur-md">
          <Crop className="w-3.5 h-3.5 animate-pulse text-[#00F0FF]" />
          <span>ROI DRAWING ACTIVE · DRAG ON SATELLITE SCENE TO DEMARCATE PARCEL</span>
          <button
            onClick={() => setIsDrawingRoi(false)}
            className="text-slate-400 hover:text-white ml-2 text-xs font-bold"
            title="Cancel Drawing"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Right: Viewport Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
        <div className="sq-glass rounded-lg flex items-center gap-1 p-1 border border-cyan-500/20">
          <button
            data-testid="zoom-in"
            title="Zoom In"
            onClick={() => setZoom((z) => Math.min(5, z + 0.3))}
            className="sq-btn w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            data-testid="zoom-out"
            title="Zoom Out"
            onClick={() => setZoom((z) => Math.max(1, z - 0.3))}
            className="sq-btn w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            data-testid="reset-view"
            title="Reset View"
            onClick={resetView}
            className="sq-btn w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-cyan-500/20 mx-0.5" />

          {/* Draw ROI Toggle Button */}
          <button
            data-testid="toggle-draw-roi"
            title={isDrawingRoi ? 'Cancel ROI Drawing (Esc)' : 'Draw Region of Interest (ROI)'}
            onClick={() => setIsDrawingRoi((d) => !d)}
            disabled={!slots.length}
            className={`sq-btn px-2 h-7 rounded flex items-center gap-1.5 transition-all text-xs font-mono-x ${
              isDrawingRoi
                ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/50 sq-glow'
                : activeRoi
                ? 'bg-[#00F0FF]/15 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <Crop className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden sm:inline">{isDrawingRoi ? 'DRAWING…' : activeRoi ? 'ROI ACTIVE' : 'DRAW ROI'}</span>
          </button>

          <div className="w-px h-4 bg-cyan-500/20 mx-0.5" />

          {/* Toggle Evidence Bounding Boxes */}
          <button
            data-testid="toggle-regions"
            title={showRegions ? 'Hide Evidence Regions' : 'Show Evidence Regions'}
            onClick={() => setShowRegions((v) => !v)}
            className={`sq-btn w-7 h-7 rounded flex items-center justify-center transition-all ${
              showRegions
                ? 'bg-cyan-500/20 text-[#00F0FF] sq-glow'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            {showRegions ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Toggle Split-Screen Swipe */}
          {isPair && (
            <button
              data-testid="toggle-split"
              title="Toggle Swipe Split-Screen"
              onClick={() => setSplitMode((v) => !v)}
              className={`sq-btn w-7 h-7 rounded flex items-center justify-center transition-all ${
                splitMode
                  ? 'bg-[#FF7300]/20 text-[#FF7300] sq-glow-orange'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <SplitSquareHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* Toggle Spatial Intensity Heatmap */}
          {isHeatmapEligible && (
            <div className="flex items-center gap-1">
              <button
                data-testid="toggle-heatmap"
                title={showHeatmap ? 'Hide Intensity Heatmap' : 'Show Intensity Heatmap'}
                onClick={() => setShowHeatmap((v) => !v)}
                className={`sq-btn w-7 h-7 rounded flex items-center justify-center transition-all ${
                  showHeatmap
                    ? heatmap?.palette === 'water' || heatmap?.type === 'flood'
                      ? 'bg-cyan-500/20 text-[#00F0FF] sq-glow'
                      : 'bg-rose-500/20 text-rose-400 sq-glow'
                    : 'text-slate-400 hover:text-rose-300'
                }`}
              >
                <Flame className="w-4 h-4" />
              </button>
              {showHeatmap && (
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                  title={`Heatmap Opacity: ${heatmapOpacity}%`}
                  className="w-14 h-1.5 accent-[#00F0FF] bg-slate-700/80 rounded-lg cursor-pointer"
                />
              )}
            </div>
          )}

        </div>

        {/* Layer Switcher when split is off */}
        {isPair && !splitMode && (
          <div
            data-testid="layer-switch"
            className="sq-glass rounded-lg flex items-center p-1 gap-1 border border-cyan-500/20"
          >
            {slots.map((s, i) => (
              <button
                key={i}
                data-testid={`layer-${i}`}
                onClick={() => setLayer(i)}
                className={`sq-btn px-2.5 py-1 rounded text-[11px] font-mono-x flex items-center gap-1 ${
                  layer === i
                    ? 'bg-cyan-500/20 text-cyan-200 sq-glow'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {s.modality === 'sar' ? (
                  <Radar className="w-3 h-3 text-[#FF7300]" />
                ) : (
                  <Sun className="w-3 h-3 text-[#00F0FF]" />
                )}
                <span>
                  {task === 'change' ? (i === 0 ? 'T1 (BEFORE)' : 'T2 (AFTER)') : s.modality.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Zoom Telemetry */}
        <div className="sq-glass rounded-lg px-2.5 py-1 telemetry border border-cyan-500/20">
          ZOOM {zoom.toFixed(1)}×
        </div>
      </div>

      {/* Main Interactive Viewport Canvas */}
      <div
        ref={stageRef}
        className={`flex-1 relative sq-grid-bg overflow-hidden flex items-center justify-center ${
          isDrawingRoi ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
        onWheel={onWheel}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      >
        {/* Scanning line animation while model is orchestrating */}
        {running && <div className="sq-scanline z-30" />}

        {/* Empty State */}
        {!slots.length ? (
          <div className="text-center py-16 px-6 max-w-sm">
            <div className="w-16 h-16 rounded-full border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center mx-auto mb-4 sq-pulse">
              <Layers className="w-8 h-8 text-cyan-400/60" />
            </div>
            <h3 className="font-head text-lg font-bold text-slate-200">
              Awaiting Imagery Input
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select one of the benchmark presets on the left or upload your own GeoTIFF raster to begin interactive analysis.
            </p>
          </div>
        ) : (
          /* Image Container with Zoom & Pan */
          <div
            className="relative"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: isDragging || isDrawingActive ? 'none' : 'transform .12s ease'
            }}
          >
            <div
              ref={imageBoxRef}
              onMouseDown={handleImageMouseDown}
              className={`relative rounded-lg shadow-2xl overflow-hidden border border-cyan-500/30 select-none ${
                isDrawingRoi ? 'cursor-crosshair' : ''
              }`}
              style={{
                width: isWiderThanSquare ? 'min(82vw, 860px)' : 'min(66vh, 760px)',
                aspectRatio: containerAspect,
                maxHeight: '74vh',
                maxWidth: '90vw'
              }}
            >
              {/* Case 1: Single View */}
              {singleView ? (
                <img
                  src={resolveAssetUrl(shown?.preview)}
                  alt={shown?.name || 'satellite scene'}
                  draggable={false}
                  className="w-full h-full object-fill select-none pointer-events-none"
                />
              ) : (
                /* Case 2: Interactive Swipe Split Screen */
                <>
                  {/* Base Image (Underneath: visible on right side: T2 / SAR) */}
                  <img
                    src={resolveAssetUrl(rightImg.preview)}
                    alt={rightImg.name || "after observation"}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
                  />

                  {/* Overlaid Clipped Image (Top: visible on left side: T1 / Optical) */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
                  >
                    <img
                      src={resolveAssetUrl(leftImg.preview)}
                      alt={leftImg.name || "before observation"}
                      draggable={false}
                      className="w-full h-full object-fill select-none"
                    />
                  </div>

                  {/* Interactive Split Divider Line */}
                  {!isDrawingRoi && (
                    <div
                      className="absolute top-0 bottom-0 z-20 pointer-events-auto"
                      style={{ left: `${split}%` }}
                    >
                      <div className="w-0.5 h-full bg-[#FF7300] sq-glow-orange -translate-x-1/2" />
                      <div
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FF7300] flex items-center justify-center cursor-ew-resize shadow-lg border-2 border-[#0B0E14]"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          const rect = imageBoxRef.current?.getBoundingClientRect();
                          if (!rect) return;
                          const onMouseMove = (ev: MouseEvent) => {
                            const newPos = Math.min(95, Math.max(5, ((ev.clientX - rect.left) / rect.width) * 100));
                            setSplit(newPos);
                          };
                          const onMouseUp = () => {
                            window.removeEventListener('mousemove', onMouseMove);
                            window.removeEventListener('mouseup', onMouseUp);
                          };
                          window.addEventListener('mousemove', onMouseMove);
                          window.addEventListener('mouseup', onMouseUp);
                        }}
                      >
                        <SplitSquareHorizontal className="w-3.5 h-3.5 text-black" />
                      </div>
                    </div>
                  )}

                  {/* Split Labels */}
                  <span className="absolute top-2 left-2 telemetry bg-black/75 rounded px-2 py-0.5 z-10 border border-cyan-500/20 text-cyan-300 pointer-events-none">
                    {task === 'change'
                      ? `T1 · BEFORE${leftImg.timestamp ? ` (${leftImg.timestamp.slice(0, 10)})` : ''}`
                      : (leftImg.modality === 'sar' ? 'SAR (C-BAND)' : 'OPTICAL (MSI)')}
                  </span>
                  <span className="absolute top-2 right-2 telemetry bg-black/75 rounded px-2 py-0.5 z-10 border border-[#FF7300]/30 text-[#FF7300] pointer-events-none">
                    {task === 'change'
                      ? `T2 · AFTER${rightImg.timestamp ? ` (${rightImg.timestamp.slice(0, 10)})` : ''}`
                      : (rightImg.modality === 'sar' ? 'SAR (C-BAND)' : 'OPTICAL (MSI)')}
                  </span>
                </>
              )}

              {/* Geospatial Heatmap Layer */}
              {isHeatmapEligible && showHeatmap && (
                <div
                  data-testid="change-heatmap"
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ opacity: heatmapOpacity / 100 }}
                >
                  {heatmap?.overlay_url ? (
                    <img
                      src={resolveAssetUrl(heatmap.overlay_url)}
                      alt={heatmap.title || "Heatmap Overlay"}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-fill select-none"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ filter: 'blur(9px)' }}>
                      {(heatmap?.points && heatmap.points.length > 0
                        ? heatmap.points.map((pt, i) => {
                            const cx = pt.x * 100;
                            const cy = pt.y * 100;
                            const size = (pt.radius || 0.2) * 100 * 2.2;
                            const isWater = heatmap.palette === 'water' || heatmap.type === 'flood';
                            return (
                              <div
                                key={i}
                                className="absolute rounded-full sq-fade-up"
                                style={{
                                  left: `${cx}%`,
                                  top: `${cy}%`,
                                  width: `${size}%`,
                                  height: `${size}%`,
                                  transform: 'translate(-50%, -50%)',
                                  mixBlendMode: 'screen',
                                  background: isWater
                                    ? 'radial-gradient(circle, rgba(0,240,255,0.92) 0%, rgba(2,132,199,0.7) 35%, rgba(3,105,161,0.25) 65%, transparent 78%)'
                                    : 'radial-gradient(circle, rgba(255,23,68,0.95) 0%, rgba(255,115,0,0.7) 35%, rgba(255,214,0,0.25) 65%, transparent 78%)'
                                }}
                              />
                            );
                          })
                        : (changeRegions.length > 0 ? changeRegions : rawRegions).map((r, i) => {
                            const box = r.box || [0.2, 0.2, 0.2, 0.2];
                            const [x, y, w, h] = box;
                            const cx = (x + w / 2) * 100;
                            const cy = (y + h / 2) * 100;
                            const size = Math.max(w, h, 0.12) * 100 * 2.0;
                            const isWater = r.type === 'water';
                            return (
                              <div
                                key={i}
                                className="absolute rounded-full sq-fade-up"
                                style={{
                                  left: `${cx}%`,
                                  top: `${cy}%`,
                                  width: `${size}%`,
                                  height: `${size}%`,
                                  transform: 'translate(-50%, -50%)',
                                  mixBlendMode: 'screen',
                                  background: isWater
                                    ? 'radial-gradient(circle, rgba(0,240,255,0.92) 0%, rgba(2,132,199,0.65) 35%, rgba(3,105,161,0.2) 65%, transparent 75%)'
                                    : 'radial-gradient(circle, rgba(255,23,68,0.95) 0%, rgba(255,115,0,0.65) 35%, rgba(255,210,0,0.2) 65%, transparent 75%)'
                                }}
                              />
                            );
                          }))}
                    </div>
                  )}
                </div>
              )}

              {/* Live Drawing ROI Box */}
              {roiLive && (
                <div
                  className="absolute border-2 border-dashed border-[#FF7300] bg-[#FF7300]/20 rounded-sm pointer-events-none z-30"
                  style={{
                    left: `${roiLive[0] * 100}%`,
                    top: `${roiLive[1] * 100}%`,
                    width: `${roiLive[2] * 100}%`,
                    height: `${roiLive[3] * 100}%`
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-[#FF7300] text-black font-mono-x text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    DEMARCATING ROI · {computeSpatialMetrics(roiLive, gsdMeters, aspectW, aspectH).wM}m × {computeSpatialMetrics(roiLive, gsdMeters, aspectW, aspectH).hM}m
                  </span>
                </div>
              )}

              {/* Committed Active ROI Bounding Box */}
              {activeRoi && (
                <div
                  data-testid="active-roi-box"
                  className="absolute border-2 border-dashed border-[#00F0FF] bg-[#00F0FF]/15 rounded-sm pointer-events-auto z-25 sq-glow-cyan"
                  style={{
                    left: `${activeRoi[0] * 100}%`,
                    top: `${activeRoi[1] * 100}%`,
                    width: `${activeRoi[2] * 100}%`,
                    height: `${activeRoi[3] * 100}%`
                  }}
                >
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-[#00F0FF] border-2 border-black" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#00F0FF] border-2 border-black" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-[#00F0FF] border-2 border-black" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#00F0FF] border-2 border-black" />

                  <span className="absolute -top-6 left-0 bg-[#00F0FF] text-black font-mono-x text-[10.5px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-1 whitespace-nowrap">
                    <Crosshair className="w-3 h-3" />
                    <span>USER ROI · {computeSpatialMetrics(activeRoi, gsdMeters, aspectW, aspectH).ha} ha</span>
                  </span>
                </div>
              )}

              {/* Interactive Evidence Bounding Boxes */}
              {(singleView ? layer === primaryIdx || !isPair : true) &&
                regions.map((r, i) => {
                  const isSelected = selectedRegion?.id === r.id;
                  const c = REGION_COLORS[r.type] || REGION_COLORS.object;
                  const box = r.box || [0.2, 0.2, 0.2, 0.2];
                  const [x, y, w, h] = box;
                  return (
                    <div
                      key={r.id || i}
                      data-testid={`region-${i}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRegion(isSelected ? null : r);
                      }}
                      className={`absolute rounded-sm sq-fade-up transition-all duration-200 cursor-pointer pointer-events-auto group ${
                        isSelected ? 'z-30 ring-2 ring-white sq-pulse' : 'hover:scale-[1.01] hover:z-20'
                      }`}
                      style={{
                        left: `${x * 100}%`,
                        top: `${y * 100}%`,
                        width: `${w * 100}%`,
                        height: `${h * 100}%`,
                        border: `2px solid ${isSelected ? '#FFFFFF' : c.stroke}`,
                        background: isSelected ? `${c.stroke}33` : c.fill,
                        opacity: opacity / 100,
                        boxShadow: isSelected ? `0 0 25px ${c.stroke}` : `0 0 12px ${c.stroke}66`
                      }}
                    >
                      <span
                        className={`absolute -top-5 left-0 whitespace-nowrap text-[11px] font-mono-x font-bold px-1.5 py-0.5 rounded shadow transition-all ${
                          isSelected ? 'bg-white text-black ring-1 ring-black' : ''
                        }`}
                        style={!isSelected ? { background: c.stroke, color: '#0B0E14' } : {}}
                      >
                        {r.label}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Geospatial Evidence Inspector Card (Floating Overlay) */}
      {selectedRegion && selectedMetrics && selectedRegionColor && (
        <div
          data-testid="evidence-inspector-card"
          className="absolute top-12 left-3 z-30 sq-glass rounded-xl p-3.5 border border-cyan-500/40 w-[320px] max-w-[90vw] text-xs font-mono-x sq-fade-up shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20">
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: selectedRegionColor.stroke }}
              />
              <div className="truncate">
                <div className="text-slate-100 font-bold text-xs truncate">
                  {selectedRegion.label}
                </div>
                <div className="text-[10px] text-cyan-400/80">
                  {selectedRegion.type.toUpperCase()} · {(selectedRegion.confidence * 100).toFixed(0)}% CONFIDENCE
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSelectRegion(null)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10"
              title="Close Inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-[11px] mb-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Surface Area:</span>
              <span className="text-emerald-400 font-bold">
                {selectedMetrics.ha} ha <span className="text-slate-500 font-normal">({selectedMetrics.km2} km²)</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Ground Extent:</span>
              <span className="text-cyan-300 font-semibold">{selectedMetrics.wM}m × {selectedMetrics.hM}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">GPS Centroid:</span>
              <span className="text-amber-300 text-[10.5px] truncate max-w-[170px]" title={selectedMetrics.gpsStr}>
                {selectedMetrics.gpsStr}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bounding Box:</span>
              <span className="text-slate-300 text-[10px]">
                [{selectedRegion.box.map((v) => Math.round(v * 100) + '%').join(', ')}]
              </span>
            </div>
            {selectedRegion.note && (
              <div className="pt-1 text-[10.5px] text-slate-300 font-sans italic border-t border-white/5">
                {selectedRegion.note}
              </div>
            )}
          </div>

          <div className="space-y-1.5 pt-1 border-t border-cyan-500/20">
            <button
              onClick={() => onQueryRegion?.(selectedRegion)}
              className="sq-btn w-full py-1.5 rounded-lg bg-[#FF7300] hover:bg-[#ff8826] text-black font-bold text-[11px] flex items-center justify-center gap-1.5 sq-glow-orange transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ASK AI ABOUT THIS REGION</span>
            </button>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => zoomToBox(selectedRegion.box)}
                className="sq-btn py-1 px-2 rounded border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-[10.5px] flex items-center justify-center gap-1 hover:bg-cyan-500/10"
              >
                <Target className="w-3 h-3 text-[#00F0FF]" />
                <span>ZOOM TO FIT</span>
              </button>
              <button
                onClick={handleCopyGeoJsonFeature}
                className="sq-btn py-1 px-2 rounded border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-[10.5px] flex items-center justify-center gap-1 hover:bg-cyan-500/10"
              >
                {copiedGeoJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#00F0FF]" />}
                <span>{copiedGeoJson ? 'COPIED' : 'GEOJSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active User ROI Dock Card */}
      {activeRoi && roiMetrics && (
        <div
          data-testid="active-roi-dock"
          className="absolute bottom-12 right-3 z-20 sq-glass rounded-xl p-3 border border-[#00F0FF]/40 w-[300px] max-w-[90vw] text-xs font-mono-x sq-fade-up shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-cyan-500/20">
            <div className="flex items-center gap-1.5 text-[#00F0FF] font-bold">
              <Crosshair className="w-4 h-4 sq-pulse" />
              <span>ACTIVE USER ROI</span>
            </div>
            <button
              onClick={handleClearRoi}
              className="text-slate-400 hover:text-rose-400 text-[11px] flex items-center gap-0.5"
              title="Remove ROI"
            >
              <Trash2 className="w-3 h-3" />
              <span>CLEAR</span>
            </button>
          </div>

          <div className="space-y-1 text-[11px] mb-2.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Demarcated Area:</span>
              <span className="text-emerald-300 font-bold">{roiMetrics.ha} ha <span className="text-slate-500 font-normal">({roiMetrics.km2} km²)</span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Ground Scale:</span>
              <span className="text-cyan-300 font-semibold">{roiMetrics.wM}m × {roiMetrics.hM}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Centroid:</span>
              <span className="text-amber-300 text-[10.5px] truncate max-w-[160px]" title={roiMetrics.gpsStr}>
                {roiMetrics.gpsStr}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQueryRoi?.(activeRoi)}
              className="sq-btn flex-1 py-1.5 rounded-lg bg-[#00F0FF] hover:bg-cyan-300 text-black font-bold text-[11px] flex items-center justify-center gap-1 sq-glow-cyan transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANALYZE ROI</span>
            </button>
            <button
              onClick={() => zoomToBox(activeRoi)}
              className="sq-btn px-2.5 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-[11px] flex items-center gap-1 hover:bg-cyan-500/10 transition-all"
              title="Zoom and center view on this ROI"
            >
              <Target className="w-3.5 h-3.5" />
              <span>FOCUS</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Heatmap Telemetry Legend */}
      {isHeatmapEligible && showHeatmap && (
        <div className="absolute bottom-12 left-3 z-20 sq-glass rounded-lg p-2.5 border border-cyan-500/25 max-w-xs text-xs font-mono-x sq-fade-up shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-200 text-xs">
              <Flame className={`w-3.5 h-3.5 ${heatmap?.palette === 'water' || heatmap?.type === 'flood' ? 'text-[#00F0FF]' : 'text-[#FF1744]'}`} />
              <span>{heatmap?.title || (task === 'change' ? 'CHANGE INTENSITY HEATMAP' : 'SPATIAL DENSITY HEATMAP')}</span>
            </div>
            <button
              onClick={() => setHeatmapOpacity((o) => (o === 100 ? 40 : o === 40 ? 75 : 100))}
              className="text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20"
              title="Toggle Heatmap Opacity"
            >
              OPACITY: {heatmapOpacity}%
            </button>
          </div>
          <div className="space-y-1">
            <div
              className="w-full h-2 rounded"
              style={{
                background: heatmap?.palette === 'water' || heatmap?.type === 'flood'
                  ? 'linear-gradient(to right, rgba(3,105,161,0.3), rgba(2,132,199,0.8), #00F0FF)'
                  : 'linear-gradient(to right, rgba(255,214,0,0.4), #FF7300, #FF1744)'
              }}
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Low ({heatmap?.intensity_label?.includes('Inundat') ? 'Shallow' : 'Baseline'})</span>
              <span>High ({heatmap?.intensity_label?.includes('Inundat') ? 'Submerged' : 'Maximum'})</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Telemetry Bar */}
      <div className="sq-glass border-t border-cyan-500/15 px-4 py-2 flex items-center justify-between text-[11px] font-mono-x text-slate-400 z-20">
        <div className="flex items-center gap-4">
          <span>LOCATION: <span className="text-cyan-300">{locationStr}</span></span>
          <span className="text-cyan-500/30">|</span>
          <span>RESOLUTION: <span className="text-emerald-400">{resolutionStr}</span></span>
        </div>
        <div className="flex items-center gap-3">
          {slots.length > 0 && (
            <span>
              ACTIVE: <span className="text-[#FF7300]">{slots.length} scene(s) loaded</span>
            </span>
          )}
          <span className="text-cyan-500/30">|</span>
          <span>MODE: <span className="text-cyan-300">{task.toUpperCase()}</span></span>
        </div>
      </div>
    </section>
  );
};

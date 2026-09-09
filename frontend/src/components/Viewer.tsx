import React, { useState, useRef } from 'react';
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
  Layers
} from 'lucide-react';
import { ImageSlot, AnalysisResponseData, EvidenceRegionData } from '../lib/api';
import { REGION_COLORS } from '../lib/demoData';

interface ViewerProps {
  slots: ImageSlot[];
  analysis: AnalysisResponseData | null;
  running: boolean;
}

export const Viewer: React.FC<ViewerProps> = ({ slots, analysis, running }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showRegions, setShowRegions] = useState(true);
  const [opacity] = useState(85);
  const [split, setSplit] = useState(50);
  const [splitMode, setSplitMode] = useState(true);
  const [layer, setLayer] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(85);

  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const task = analysis?.task || (slots.length === 2 && slots.some((s) => s.modality === 'sar') ? 'cross_modal' : slots.length === 2 ? 'change' : 'vqa');
  const isPair = slots.length === 2;
  const primaryIdx = task === 'cross_modal' ? Math.max(0, slots.findIndex((s) => s.modality === 'optical')) : isPair ? 1 : 0;
  const primarySlot = slots[primaryIdx] || slots[0];
  const aspectW = primarySlot?.width || slots[0]?.width;
  const aspectH = primarySlot?.height || slots[0]?.height;
  const containerAspect = (aspectW && aspectH) ? `${aspectW} / ${aspectH}` : '1 / 1';
  const isWiderThanSquare = Boolean(aspectW && aspectH && aspectW > aspectH);

  const rawRegions = (analysis?.result?.evidence_regions || []) as EvidenceRegionData[];
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

  // Zoom handlers
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.min(5, Math.max(1, z + (e.deltaY < 0 ? 0.2 : -0.2))));
  };

  const onDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragging.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };

  const onMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
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
        className="flex-1 relative sq-grid-bg overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
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
              transition: isDragging ? 'none' : 'transform .12s ease'
            }}
          >
            <div
              className="relative rounded-lg shadow-2xl overflow-hidden border border-cyan-500/30"
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
                  src={shown?.preview}
                  alt={shown?.name || 'satellite scene'}
                  draggable={false}
                  className="w-full h-full object-fill select-none"
                />
              ) : (
                /* Case 2: Interactive Swipe Split Screen */
                <>
                  {/* Base Image (Underneath: visible on right side: T2 / SAR) */}
                  <img
                    src={rightImg.preview}
                    alt={rightImg.name || "after observation"}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-fill select-none"
                  />

                  {/* Overlaid Clipped Image (Top: visible on left side: T1 / Optical) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
                  >
                    <img
                      src={leftImg.preview}
                      alt={leftImg.name || "before observation"}
                      draggable={false}
                      className="w-full h-full object-fill select-none"
                    />
                  </div>

                  {/* Interactive Split Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 z-20 pointer-events-auto"
                    style={{ left: `${split}%` }}
                  >
                    {/* Vertical Glowing Line */}
                    <div className="w-0.5 h-full bg-[#FF7300] sq-glow-orange -translate-x-1/2" />

                    {/* Circular Drag Handle */}
                    <div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FF7300] flex items-center justify-center cursor-ew-resize shadow-lg border-2 border-[#0B0E14]"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        const parent = stageRef.current;
                        if (!parent) return;
                        const rect = (e.currentTarget.closest('.relative') as HTMLElement)?.getBoundingClientRect();
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

                  {/* Split Labels */}
                  <span className="absolute top-2 left-2 telemetry bg-black/75 rounded px-2 py-0.5 z-10 border border-cyan-500/20 text-cyan-300">
                    {task === 'change'
                      ? `T1 · BEFORE${leftImg.timestamp ? ` (${leftImg.timestamp.slice(0, 10)})` : ''}`
                      : (leftImg.modality === 'sar' ? 'SAR (C-BAND)' : 'OPTICAL (MSI)')}
                  </span>
                  <span className="absolute top-2 right-2 telemetry bg-black/75 rounded px-2 py-0.5 z-10 border border-[#FF7300]/30 text-[#FF7300]">
                    {task === 'change'
                      ? `T2 · AFTER${rightImg.timestamp ? ` (${rightImg.timestamp.slice(0, 10)})` : ''}`
                      : (rightImg.modality === 'sar' ? 'SAR (C-BAND)' : 'OPTICAL (MSI)')}
                  </span>

                </>
              )}

              {/* Geospatial Heatmap Layer (Bi-temporal Change / Flood Inundation / Density) */}
              {isHeatmapEligible && showHeatmap && (
                <div
                  data-testid="change-heatmap"
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ opacity: heatmapOpacity / 100 }}
                >
                  {/* High-fidelity raster heatmap overlay if present */}
                  {heatmap?.overlay_url ? (
                    <img
                      src={heatmap.overlay_url}
                      alt={heatmap.title || "Heatmap Overlay"}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-fill select-none"
                      style={{ mixBlendMode: 'normal' }}
                    />
                  ) : (
                    /* Multi-cluster thermal / hydrological gradient layer fallback when no raster overlay is available */
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


              {/* Evidence Bounding Boxes (Referring Grounding & Spatial Evidence) */}
              {(singleView ? layer === primaryIdx || !isPair : true) &&
                regions.map((r, i) => {
                  const c = REGION_COLORS[r.type] || REGION_COLORS.object;
                  const box = r.box || [0.2, 0.2, 0.2, 0.2];
                  const [x, y, w, h] = box;
                  return (
                    <div
                      key={r.id || i}
                      data-testid={`region-${i}`}
                      className="absolute rounded-sm sq-fade-up pointer-events-none"
                      style={{
                        left: `${x * 100}%`,
                        top: `${y * 100}%`,
                        width: `${w * 100}%`,
                        height: `${h * 100}%`,
                        border: `2px solid ${c.stroke}`,
                        background: c.fill,
                        opacity: opacity / 100,
                        boxShadow: `0 0 12px ${c.stroke}66`
                      }}
                    >
                      {/* BBox Label Tag */}
                      <span
                        className="absolute -top-5 left-0 whitespace-nowrap text-[11px] font-mono-x font-bold px-1.5 py-0.5 rounded shadow"
                        style={{
                          background: c.stroke,
                          color: '#0B0E14'
                        }}
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

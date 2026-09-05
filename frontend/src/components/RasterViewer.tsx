import React, { useState } from 'react';
import type { ImageMetadata, VisualEvidence } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Eye, MapPin } from 'lucide-react';

interface RasterViewerProps {
  images: ImageMetadata[];
  evidence?: VisualEvidence;
  activeMode: string;
}

export const RasterViewer: React.FC<RasterViewerProps> = ({ images, evidence, activeMode }) => {
  const [zoom, setZoom] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleReset = () => setZoom(1);

  const hasOverlay = Boolean(evidence?.overlay_url);
  const isPair = images.length >= 2;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-full">
      {/* Top Bar: View Mode Selector & Zoom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">Interactive Geospatial Canvas</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
            {images.length} {images.length === 1 ? 'Raster' : 'Co-Registered Pair'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Overlay Toggle Button if evidence is available */}
          {hasOverlay && (
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                showOverlay
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showOverlay ? 'Evidence Overlay: ON' : 'Evidence Overlay: OFF'}</span>
            </button>
          )}

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 space-x-1">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1 text-slate-400">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Raster Viewport */}
      <div className="relative flex-1 min-h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center p-2">
        {images.length === 0 ? (
          <div className="text-center text-slate-500 text-sm p-8">
            <Layers className="w-10 h-10 mx-auto mb-2 opacity-40 text-sky-400" />
            <p>No satellite imagery loaded in canvas.</p>
            <p className="text-xs text-slate-600 mt-1">Select an evaluation scenario or upload a GeoTIFF.</p>
          </div>
        ) : isPair ? (
          /* Dual Pair Canvas (Split or Overlay) */
          <div
            className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {/* Image 1 (T1 or Optical) */}
            <div className="relative rounded-lg overflow-hidden border border-slate-700/80 shadow-md bg-black">
              <img
                src={images[0].preview_url}
                alt={images[0].filename}
                className="w-full max-h-[340px] object-contain rounded"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-[11px] text-slate-200 font-medium px-2 py-1 rounded border border-slate-700">
                {activeMode === 'cross_modal' ? 'Optical Sensor (S2)' : 'T1: Baseline (Pre-Event)'}
              </div>
            </div>

            {/* Image 2 (T2 or SAR or Fused Evidence) */}
            <div className="relative rounded-lg overflow-hidden border border-slate-700/80 shadow-md bg-black">
              <img
                src={showOverlay && hasOverlay ? evidence?.overlay_url : images[1].preview_url}
                alt={images[1].filename}
                className="w-full max-h-[340px] object-contain rounded"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-[11px] font-medium px-2 py-1 rounded border border-slate-700">
                {showOverlay && hasOverlay ? (
                  <span className="text-sky-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    {activeMode === 'cross_modal' ? 'Cross-Modal Fused Layer' : 'Change Difference Heatmap'}
                  </span>
                ) : (
                  <span className="text-slate-200">
                    {activeMode === 'cross_modal' ? 'SAR Sensor (S1 Backscatter)' : 'T2: Post-Event Capture'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Single Image Canvas */
          <div
            className="relative rounded-lg overflow-hidden border border-slate-700/80 shadow-md bg-black transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            <img
              src={showOverlay && hasOverlay ? evidence?.overlay_url : images[0].preview_url}
              alt={images[0].filename}
              className="max-h-[360px] object-contain rounded"
            />
            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-[11px] font-medium px-2 py-1 rounded border border-slate-700">
              {showOverlay && hasOverlay ? (
                <span className="text-sky-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  Grounded Target Overlay
                </span>
              ) : (
                <span className="text-slate-200">Optical Raster (Level-2A)</span>
              )}
            </div>
          </div>
        )}

        {/* Floating Geospatial Telemetry Tag */}
        {images.length > 0 && (
          <div className="absolute bottom-2 left-2 bg-slate-900/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 flex items-center space-x-3 shadow-lg">
            <span className="flex items-center text-slate-300 font-mono">
              <MapPin className="w-3 h-3 text-sky-400 mr-1" />
              CRS: {images[0].crs || 'EPSG:4326'}
            </span>
            <span>Dims: {images[0].width}×{images[0].height}px</span>
            <span>Bands: {images[0].bands}</span>
          </div>
        )}
      </div>

      {/* Dynamic Evidence Legend */}
      {hasOverlay && showOverlay && evidence?.legend && (
        <div className="mt-3 p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl">
          <div className="text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-sky-400" />
            <span>Visual Evidence Legend & Spectral Layers</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {Object.entries(evidence.legend).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-1.5 text-xs text-slate-300">
                <span
                  className={`w-3 h-3 rounded-sm ${
                    key.includes('cyan')
                      ? 'bg-cyan-400'
                      : key.includes('red')
                      ? 'bg-rose-500'
                      : key.includes('green')
                      ? 'bg-emerald-400'
                      : key.includes('magenta') || key.includes('orange')
                      ? 'bg-amber-400'
                      : 'bg-slate-500'
                  }`}
                ></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

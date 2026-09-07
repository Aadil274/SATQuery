import React, { useRef } from 'react';
import {
  Upload,
  Plus,
  Trash2,
  ScanSearch,
  Crosshair,
  GitCompareArrows,
  Layers,
  Waves,
  Sun,
  Radar,
  CheckCircle2,
  FileImage
} from 'lucide-react';
import { PRESETS, Preset, ImageSlot } from '../lib/demoData';

interface LeftPanelProps {
  slots: ImageSlot[];
  onLoadPreset: (p: Preset) => void;
  onAddFile: (file: File) => void;
  onRemove: (idx: number) => void;
  onClear: () => void;
  onToggleModality: (idx: number) => void;
}

const PRESET_ICONS: Record<string, React.ReactNode> = {
  ScanSearch: <ScanSearch className="w-4 h-4 text-[#00F0FF]" />,
  Crosshair: <Crosshair className="w-4 h-4 text-[#00E676]" />,
  GitCompareArrows: <GitCompareArrows className="w-4 h-4 text-[#FF1744]" />,
  Layers: <Layers className="w-4 h-4 text-[#FF7300]" />,
  Waves: <Waves className="w-4 h-4 text-[#38BDF8]" />
};

export const LeftPanel: React.FC<LeftPanelProps> = ({
  slots,
  onLoadPreset,
  onAddFile,
  onRemove,
  onClear,
  onToggleModality
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onAddFile(files[0]);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <aside
      data-testid="left-panel"
      className="w-[340px] shrink-0 h-full sq-glass border-r border-cyan-500/15 flex flex-col select-none"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* SECTION 1: Input Imagery Slots */}
        <div>
          <div className="telemetry mb-2 text-cyan-400/80 flex items-center justify-between">
            <span>INPUT IMAGERY ({slots.length}/2 SCENES)</span>
            {slots.length > 0 && (
              <button
                onClick={onClear}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-mono-x transition-colors"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          {/* Upload Button */}
          <input
            ref={fileRef}
            type="file"
            accept=".tif,.tiff,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            data-testid="upload-image-button"
            onClick={() => fileRef.current?.click()}
            disabled={slots.length >= 2}
            className="sq-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400 text-cyan-300 text-xs font-mono-x disabled:opacity-40 disabled:cursor-not-allowed transition-all mb-3"
          >
            {slots.length > 0 ? (
              <>
                <Plus className="w-4 h-4 text-[#FF7300]" />
                <span>ADD SECOND SCENE ({slots.length}/2)</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-[#00F0FF]" />
                <span>UPLOAD GEOTIFF / RASTER</span>
              </>
            )}
          </button>

          {/* Slots List */}
          {slots.length === 0 ? (
            <div className="rounded-lg border border-cyan-500/15 bg-cyan-500/5 p-4 text-center">
              <FileImage className="w-8 h-8 text-cyan-500/30 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No imagery loaded.</p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono-x">
                Upload a GeoTIFF or select a preset below.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {slots.map((slot, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-cyan-500/25 bg-[#121824] p-2.5 flex gap-3 relative group sq-fade-up"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded overflow-hidden border border-cyan-500/30 shrink-0 bg-black">
                    <img
                      src={slot.preview}
                      alt={slot.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Modality toggle chip */}
                    <button
                      title="Click to toggle Modality (Optical / SAR)"
                      onClick={() => onToggleModality(idx)}
                      className={`absolute bottom-0 inset-x-0 py-0.5 text-[10px] font-mono-x font-bold flex items-center justify-center gap-0.5 ${
                        slot.modality === 'sar'
                          ? 'bg-[#FF7300] text-black'
                          : 'bg-[#00F0FF] text-black'
                      }`}
                    >
                      {slot.modality === 'sar' ? (
                        <>
                          <Radar className="w-2.5 h-2.5" /> SAR
                        </>
                      ) : (
                        <>
                          <Sun className="w-2.5 h-2.5" /> OPT
                        </>
                      )}
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0 text-xs font-mono-x">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">{slot.name}</span>
                      <button
                        onClick={() => onRemove(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove scene"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-slate-400 mt-1 space-y-0.5 text-[11px]">
                      <div className="text-cyan-300/80 truncate">
                        {slot.meta?.sensor || (slot.modality === 'sar' ? 'Sentinel-1 SAR' : 'Sentinel-2 MSI')}
                      </div>
                      <div className="text-slate-400 flex items-center gap-2">
                        <span>{slot.timestamp || '2026-03-02'}</span>
                        <span className="text-cyan-500/40">·</span>
                        <span>{slot.meta?.resolution || '10 m/px'}</span>
                      </div>
                      <div className="text-slate-500">
                        {slot.width && slot.height ? `${slot.width}×${slot.height} px` : '512×512 px'} · {slot.meta?.crs || 'EPSG:4326'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: Preset Scenarios */}
        <div>
          <div className="telemetry mb-2 text-cyan-400/80">
            BENCHMARK PRESETS (PROBLEM STATEMENT #26167)
          </div>
          <div className="space-y-2">
            {PRESETS.map((preset) => {
              const isSelected =
                slots.length === preset.images.length &&
                slots.every((s, i) => s.name === preset.images[i]?.name);

              return (
                <button
                  key={preset.id}
                  onClick={() => onLoadPreset(preset)}
                  className={`sq-btn w-full text-left p-2.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-[#FF7300] bg-[#FF7300]/10 sq-glow-orange'
                      : 'border-cyan-500/20 bg-[#121824]/80 hover:border-cyan-400/60 hover:bg-[#182232]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/20 shrink-0 mt-0.5">
                      {PRESET_ICONS[preset.icon] || <ScanSearch className="w-4 h-4 text-cyan-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200 truncate">
                          {preset.title}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="text-[11px] text-cyan-400/70 font-mono-x mt-0.5">
                        {preset.subtitle}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1 italic">
                        "{preset.query}"
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Technical Specifications Footer */}
        <div className="pt-2 border-t border-cyan-500/15 text-[11px] font-mono-x text-slate-400 space-y-1">
          <div>Raster Coregistration: <span className="text-emerald-400">Sub-pixel (0.04 px)</span></div>
          <div>CRS Transformation: <span className="text-cyan-300">WGS84 / EPSG:4326</span></div>
          <div>Formats: <span className="text-slate-300">GeoTIFF (.tif), PNG, JPG</span></div>
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, AlertTriangle, FileCode, Check } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUploaded: (filePath: string, url: string, validation: any) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setValidationResult(data.validation);
      setUploading(false);
      onUploaded(data.saved_path, data.url, data.validation);
    } catch (err) {
      setUploading(false);
      alert('Upload or validation failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0b1020] border border-slate-700/80 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1529]">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Raster Ingestion & GeoTIFF Validator
              </h3>
              <p className="text-[11px] text-slate-400">
                Upload GeoTIFF (.tif) or benchmark imagery (.png/.jpg)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-colors bg-[#080d1a]">
            <input
              type="file"
              accept=".tif,.tiff,.geotiff,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              id="raster-input"
              className="hidden"
            />
            <label htmlFor="raster-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <UploadCloud className="w-8 h-8 text-cyan-400" />
              <p className="text-xs font-semibold text-slate-200">
                {file ? file.name : 'Click to select GeoTIFF or drop file here'}
              </p>
              <p className="text-[10px] text-slate-400">
                Supports Multi-band GeoTIFF, Sentinel-1/2 rasters, EPSG:4326/EPSG:32644
              </p>
            </label>
          </div>

          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {uploading ? 'Ingesting & Validating Header Tags...' : 'Upload & Validate Raster'}
            </button>
          )}

          {/* Validation Report */}
          {validationResult && (
            <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Validation Passed ({validationResult.file_format})</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-blue-800">
                  {validationResult.modality}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>CRS: <strong className="text-white font-mono">{validationResult.metadata?.crs}</strong></div>
                <div>Resolution: <strong className="text-white font-mono">{validationResult.metadata?.resolution_m}m</strong></div>
                <div>Dimensions: <strong className="text-white font-mono">{validationResult.metadata?.width} x {validationResult.metadata?.height}</strong></div>
                <div>Bands: <strong className="text-white font-mono">{validationResult.metadata?.band_count} ({validationResult.metadata?.band_names?.join(', ')})</strong></div>
              </div>

              {validationResult.warnings?.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-amber-400">
                  {validationResult.warnings[0]}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

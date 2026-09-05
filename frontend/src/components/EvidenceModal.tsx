import React from 'react';
import { X, Layers, MapPin, CheckCircle } from 'lucide-react';

interface EvidenceRegion {
  id: string;
  label: string;
  bbox: number[];
  area_km2: number;
  category: string;
  color: string;
  confidence: number;
}

interface EvidenceModalProps {
  regions: EvidenceRegion[];
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ regions, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0b1020] border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1529]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Spatial Evidence & Regional Delineations
              </h3>
              <p className="text-[11px] text-slate-400">
                Segmented Clusters & Normalized Bounding Geometries
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {regions.map((reg, idx) => {
              const [ymin, xmin, ymax, xmax] = reg.bbox;
              return (
                <div
                  key={reg.id || idx}
                  className="p-4 rounded-xl bg-[#080d1a] border border-slate-800/90 flex flex-col gap-2 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: reg.color }}
                      ></span>
                      <h4 className="text-xs font-bold text-slate-200">
                        {reg.label}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      Confidence: {Math.round(reg.confidence * 100)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400">Category:</span>
                      <p className="font-semibold text-slate-200 uppercase text-[11px]">{reg.category}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400">Calculated Area:</span>
                      <p className="font-semibold text-white font-mono text-[11px]">{reg.area_km2} km²</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400">Normalized BBox:</span>
                      <p className="font-mono text-slate-400 text-[10px]">
                        [{ymin}, {xmin}, {ymax}, {xmax}]
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

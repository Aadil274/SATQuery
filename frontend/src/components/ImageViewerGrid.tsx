import React, { useState } from 'react';
import { Plus, Minus, Maximize2, Layers, Eye, EyeOff } from 'lucide-react';

interface ImageCardData {
  title: string;
  date: string;
  sensor_badge: string;
  image_url: string;
  modality: string;
}

interface EvidenceRegion {
  id: string;
  label: string;
  bbox: number[]; // [ymin, xmin, ymax, xmax]
  area_km2: number;
  category: string;
  color: string;
  confidence: number;
}

interface ImageViewerGridProps {
  cards: ImageCardData[];
  evidenceRegions: EvidenceRegion[];
  showEvidenceBBoxes: boolean;
  onToggleEvidence: () => void;
  taskType: string;
}

export const ImageViewerGrid: React.FC<ImageViewerGridProps> = ({
  cards,
  evidenceRegions,
  showEvidenceBBoxes,
  onToggleEvidence,
  taskType
}) => {
  const [zoomLevels, setZoomLevels] = useState<{ [key: number]: number }>({
    0: 1,
    1: 1,
    2: 1
  });

  const handleZoom = (idx: number, delta: number) => {
    setZoomLevels(prev => {
      const current = prev[idx] || 1;
      const next = Math.min(Math.max(current + delta, 1), 3);
      return { ...prev, [idx]: next };
    });
  };

  const handleResetZoom = (idx: number) => {
    setZoomLevels(prev => ({ ...prev, [idx]: 1 }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, idx) => {
        const isThirdCard = (idx === 2);
        const zoom = zoomLevels[idx] || 1;

        return (
          <div
            key={idx}
            className="bg-[#0b1020] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all group"
          >
            {/* Header matching reference */}
            <div className="px-4 py-3 border-b border-[#1e293b] flex items-center justify-between bg-[#0e1529]/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-wider">
                    {card.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {card.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  isThirdCard
                    ? 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                    : card.sensor_badge.includes('SAR')
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                }`}>
                  {card.sensor_badge}
                </span>
              </div>
            </div>

            {/* Image Canvas Container */}
            <div className="relative aspect-[4/3] w-full bg-[#050811] overflow-hidden select-none">
              {/* Floating Zoom & Pan Controls matching reference */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 bg-[#0b1020]/90 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-md">
                <button
                  onClick={() => handleZoom(idx, 0.25)}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors"
                  title="Zoom In"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleZoom(idx, -0.25)}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors"
                  title="Zoom Out"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleResetZoom(idx)}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors"
                  title="Fit to Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Satellite Image Element */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={card.image_url}
                  alt={card.title}
                  className="w-full h-full object-cover object-center pointer-events-none"
                  onError={(e) => {
                    // Fallback to sample image if path needs prefix
                    (e.target as HTMLImageElement).src = '/static/samples/mumbai_t1.jpg';
                  }}
                />

                {/* Spatial Grounding / Evidence Bounding Boxes Overlay on Third or First Card */}
                {isThirdCard && showEvidenceBBoxes && evidenceRegions.map((region) => {
                  const [ymin, xmin, ymax, xmax] = region.bbox;
                  return (
                    <div
                      key={region.id}
                      className="absolute border-2 transition-all group/box pointer-events-auto cursor-pointer"
                      style={{
                        top: `${ymin * 100}%`,
                        left: `${xmin * 100}%`,
                        height: `${(ymax - ymin) * 100}%`,
                        width: `${(xmax - xmin) * 100}%`,
                        borderColor: region.color,
                        backgroundColor: `${region.color}25`
                      }}
                      title={`${region.label} (${region.area_km2} km²)`}
                    >
                      <div
                        className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-bold text-white whitespace-nowrap shadow-md"
                        style={{ backgroundColor: region.color }}
                      >
                        {region.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Change Map Legend matching reference screenshot */}
              {isThirdCard && (
                <div className="absolute bottom-3 left-3 z-20 bg-[#070b16]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800/90 shadow-lg text-[10px]">
                  <div className="space-y-1 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#ef4444]"></span>
                      <span className="text-slate-300">Increase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]"></span>
                      <span className="text-slate-300">Decrease</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#64748b]"></span>
                      <span className="text-slate-300">No Change</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#eab308]"></span>
                      <span className="text-slate-300">Moderate Change</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Toggle Evidence Bounding Boxes Button */}
              {isThirdCard && evidenceRegions.length > 0 && (
                <button
                  onClick={onToggleEvidence}
                  className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded bg-[#070b16]/90 hover:bg-slate-800 border border-slate-700/80 text-[10px] text-cyan-300 font-medium flex items-center gap-1.5 transition-colors shadow-md"
                >
                  {showEvidenceBBoxes ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showEvidenceBBoxes ? 'Hide BBoxes' : 'Show BBoxes'}</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

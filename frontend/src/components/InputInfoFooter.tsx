import React from 'react';
import { Layers, MapPin, Grid, Maximize2 } from 'lucide-react';

interface InputInfoData {
  before_image?: { date: string; sensor: string } | null;
  after_image?: { date: string; sensor: string } | null;
  location: string;
  resolution: string;
  area: string;
}

interface InputInfoFooterProps {
  info: InputInfoData;
}

export const InputInfoFooter: React.FC<InputInfoFooterProps> = ({ info }) => {
  return (
    <div className="bg-[#0b1020] border border-[#1e293b] rounded-2xl p-4 shadow-xl mt-5">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
        INPUT INFORMATION
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Before Image */}
        {info.before_image && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/60 text-cyan-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Before Image</p>
              <p className="text-xs font-bold text-slate-200">{info.before_image.date}</p>
              <p className="text-[10px] text-slate-400">{info.before_image.sensor}</p>
            </div>
          </div>
        )}

        {/* After Image */}
        {info.after_image && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">After Image</p>
              <p className="text-xs font-bold text-slate-200">{info.after_image.date}</p>
              <p className="text-[10px] text-slate-400">{info.after_image.sensor}</p>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Location</p>
            <p className="text-xs font-bold text-slate-200">{info.location}</p>
          </div>
        </div>

        {/* Resolution */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-400 flex items-center justify-center shrink-0">
            <Grid className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Resolution</p>
            <p className="text-xs font-bold text-slate-200">{info.resolution}</p>
          </div>
        </div>

        {/* Area Footprint */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex items-center justify-center shrink-0">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Area</p>
            <p className="text-xs font-bold text-slate-200">{info.area}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

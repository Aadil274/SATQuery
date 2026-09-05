import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  Layers, 
  Radar, 
  FileText, 
  Boxes, 
  Settings, 
  HelpCircle, 
  Info,
  Satellite
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegistry: () => void;
  onOpenReportModal: () => void;
  onOpenDatasets: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegistry,
  onOpenReportModal,
  onOpenDatasets
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'image_analysis', label: 'Image Analysis', icon: Scan },
    { id: 'change_detection', label: 'Change Detection', icon: Layers },
    { id: 'optical_sar', label: 'Optical + SAR Analysis', icon: Radar },
    { id: 'datasets', label: 'BigEarthNet.txt Data', icon: Boxes, action: onOpenDatasets },
    { id: 'reports', label: 'Reports', icon: FileText, action: onOpenReportModal },
    { id: 'model_registry', label: 'Model Registry', icon: Boxes, action: onOpenRegistry },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help_docs', label: 'Help & Docs', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-[#1e293b] flex flex-col justify-between p-4 select-none shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">SatQuery</span>
              <span className="font-bold text-lg text-cyan-400">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide leading-tight">
              Vision-Language Assistant<br/>for Remote Sensing
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-cyan-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Supported Inputs Card matching reference */}
      <div className="mt-8 p-3.5 rounded-xl bg-[#0f172a]/70 border border-[#1e293b]/80">
        <div className="flex items-center justify-between text-slate-300 text-xs font-semibold mb-2">
          <span>Supported Inputs</span>
          <Info className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-400">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Single Image (Optical/SAR)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>Optical + SAR Pair</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Bi-temporal Pair</span>
          </li>
        </ul>
        <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] text-slate-400">
          <p className="font-medium text-slate-300">Formats: GeoTIFF, TIFF</p>
          <p className="text-slate-500">(PNG, JPG for benchmarks only)</p>
        </div>
      </div>
    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Database, Award, ArrowUpRight, CheckCircle2, Layers, MapPin, Eye } from 'lucide-react';

interface DatasetExplorerModalProps {
  onClose: () => void;
  onSelectSample: (query: string, images: string[]) => void;
}

export const DatasetExplorerModal: React.FC<DatasetExplorerModalProps> = ({
  onClose,
  onSelectSample
}) => {
  const [stats, setStats] = useState<any>(null);
  const [samples, setSamples] = useState<any[]>([]);
  const [benchmarks, setBenchmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'samples' | 'benchmarks'>('samples');

  useEffect(() => {
    fetch('/api/datasets/benchmarks/all')
      .then(res => res.json())
      .then(data => {
        setStats(data.bigearthnet);
        setBenchmarks(data.evaluation_matrix || []);
      })
      .catch(console.error);

    fetch('/api/datasets/bigearthnet/samples')
      .then(res => res.json())
      .then(data => {
        setSamples(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0b1020] border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1529]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                Official BigEarthNet.txt & Benchmark Explorer
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  arXiv:2603.29630
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                464,044 Co-Registered Sentinel-1 SAR + Sentinel-2 Multispectral Patches (9.6M Annotations)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sub-tab Switcher */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveSubTab('samples')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeSubTab === 'samples' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                BigEarthNet Patches
              </button>
              <button
                onClick={() => setActiveSubTab('benchmarks')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeSubTab === 'benchmarks' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Domain Adaptation Benchmarks
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Top KPI Banner */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Patches</span>
                <p className="text-lg font-bold text-white font-mono">464,044</p>
                <span className="text-[10px] text-cyan-400">Co-registered S1 + S2</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Text Annotations</span>
                <p className="text-lg font-bold text-white font-mono">9,600,000</p>
                <span className="text-[10px] text-emerald-400">Instruction-driven EO</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Sensors</span>
                <p className="text-xs font-bold text-white mt-1">Sentinel-1 (SAR) & Sentinel-2</p>
                <span className="text-[10px] text-indigo-400">C-Band + 12 MSI Bands</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Evaluated Tasks</span>
                <p className="text-lg font-bold text-white font-mono">15 Tasks</p>
                <span className="text-[10px] text-purple-400">VQA, Grounding, LULC</span>
              </div>
            </div>
          )}

          {activeSubTab === 'samples' ? (
            /* Patches Browser */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Verified BigEarthNet.txt Multi-Sensor Test Samples
                </h4>
                <span className="text-[11px] text-slate-400">
                  Click <strong>"Test with SatQuery Agent"</strong> to analyze any patch
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {samples.map((s, idx) => (
                  <div
                    key={s.ID || idx}
                    className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">{s.ID}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-medium">
                        {s.type}
                      </span>
                    </div>

                    {/* Side-by-side S1 SAR and S2 Optical Thumbnails */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-800 bg-black">
                        <img src={s.optical_preview} alt="Sentinel-2 Optical" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-bold text-emerald-400">
                          Sentinel-2 (MSI)
                        </span>
                      </div>
                      <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-800 bg-black">
                        <img src={s.sar_preview} alt="Sentinel-1 SAR" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-bold text-amber-400">
                          Sentinel-1 (SAR VV)
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div>
                        <strong className="text-slate-400 text-[11px]">Instruction (input):</strong>
                        <p className="text-slate-100 font-medium text-xs mt-0.5">"{s.input}"</p>
                      </div>
                      <div>
                        <strong className="text-slate-400 text-[11px]">Reference Ground Truth (output):</strong>
                        <p className="text-emerald-300 text-xs mt-0.5">{s.output}</p>
                      </div>
                      <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-400 font-mono">
                        <span>{s.country}</span>
                        <span>•</span>
                        <span>{s.latitude.toFixed(4)}° N, {s.longitude.toFixed(4)}° E</span>
                        <span>•</span>
                        <span>{s.season}</span>
                      </div>
                    </div>

                    {/* Test Button */}
                    <button
                      onClick={() => {
                        onSelectSample(s.input, [s.geotiff_path, s.optical_preview]);
                        onClose();
                      }}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Test with SatQuery Agent</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Benchmark Comparison Table */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-600/40 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-center gap-2 mb-1 text-cyan-400 font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Proving Remote-Sensing Adaptation vs Generic Vision-Language Models</span>
                </div>
                The table below presents the quantitative evaluation across <strong>BigEarthNet.txt</strong>, <strong>VRSBench</strong>, <strong>RSVQA-HR</strong>, and <strong>CDVQA</strong>. Fine-tuning our LoRA adapters on remote-sensing image-text pairs produces an average <strong>+26.8% relative accuracy gain</strong> compared to generic foundation models without domain adaptation.
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0e1529] text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Benchmark / Task</th>
                      <th className="px-4 py-3">Evaluation Metric</th>
                      <th className="px-4 py-3">Generic VLM (No RS Adapt)</th>
                      <th className="px-4 py-3 text-cyan-400">SatQuery RS-Adapted</th>
                      <th className="px-4 py-3 text-emerald-400">Gain (Delta)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-[#080d1a]">
                    {benchmarks.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white">{b.benchmark}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">{b.metric}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono">{b.generic_vlm}</td>
                        <td className="px-4 py-3 text-cyan-300 font-bold font-mono">{b.satquery_adapted}</td>
                        <td className="px-4 py-3 text-emerald-400 font-bold font-mono">{b.gain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

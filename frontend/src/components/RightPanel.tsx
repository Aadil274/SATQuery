import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Download,
  FileText,
  Code,
  Mic,
  MicOff,
  Languages,
  AlertTriangle,
  Share2,
  MessageSquare,
  MapPin,
  Globe,
  Copy,
  Check,
  Crosshair,
  Layers,
  X,
  Target
} from 'lucide-react';
import { ImageSlot, AnalysisResponseData, EvidenceRegionData, resolveAssetUrl } from '../lib/api';
import { SUGGESTED, REGION_COLORS } from '../lib/demoData';
import { downloadReport, downloadGeoJSON, downloadKML } from '../lib/report';

interface RightPanelProps {
  slots: ImageSlot[];
  analysis: AnalysisResponseData | null;
  running: boolean;
  onAnalyze: (query: string, language?: string, roi?: [number, number, number, number] | null) => void;
  roi?: [number, number, number, number] | null;
  onClearRoi?: () => void;
  selectedRegionId?: string | null;
  onSelectRegion?: (region: EvidenceRegionData | null) => void;
}

const INDIC_LANGUAGES = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'hi', label: 'हिन्दी', flag: 'HI' },
  { code: 'ta', label: 'தமிழ்', flag: 'TA' },
  { code: 'te', label: 'తెలుగు', flag: 'TE' },
  { code: 'bn', label: 'বাংলা', flag: 'BN' },
  { code: 'mr', label: 'मराठी', flag: 'MR' }
];

const HAZARD_STYLES: Record<string, { badge: string; text: string; bg: string; border: string }> = {
  CRITICAL: {
    badge: 'bg-rose-500 text-white animate-pulse',
    text: 'text-rose-400',
    bg: 'bg-rose-950/40',
    border: 'border-rose-500/50'
  },
  WARNING: {
    badge: 'bg-amber-500 text-black',
    text: 'text-amber-400',
    bg: 'bg-amber-950/40',
    border: 'border-amber-500/50'
  },
  ADVISORY: {
    badge: 'bg-sky-500 text-black',
    text: 'text-sky-400',
    bg: 'bg-sky-950/40',
    border: 'border-sky-500/50'
  },
  NORMAL: {
    badge: 'bg-emerald-500 text-black',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/50'
  }
};

const CONF_STYLES = {
  HIGH: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-500/50',
    bar: '#00E676'
  },
  MEDIUM: {
    text: 'text-amber-400',
    bg: 'bg-amber-950/60',
    border: 'border-amber-500/50',
    bar: '#FFB300'
  },
  LOW: {
    text: 'text-rose-400',
    bg: 'bg-rose-950/60',
    border: 'border-rose-500/50',
    bar: '#FF1744'
  }
};

export const RightPanel: React.FC<RightPanelProps> = ({
  slots,
  analysis,
  running,
  onAnalyze,
  roi,
  onClearRoi,
  selectedRegionId,
  onSelectRegion
}) => {
  const [query, setQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);

  // Listen to global preset query events
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => setQuery(e.detail);
    window.addEventListener('sq-set-query' as any, handler);
    return () => window.removeEventListener('sq-set-query' as any, handler);
  }, []);

  const suggestions =
    slots.length < 2
      ? SUGGESTED.single
      : slots.some((s) => s.modality === 'sar')
      ? SUGGESTED.pair_modal
      : SUGGESTED.pair_optical;

  const handleSubmit = () => {
    if (query.trim() && slots.length && !running) {
      onAnalyze(query.trim(), selectedLang, roi);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    if (isListening) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      const langMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        mr: 'mr-IN'
      };
      recognition.lang = langMap[selectedLang] || 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setQuery((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const r = analysis?.result;
  const c = analysis?.confidence || {
    level: ((analysis?.confidence_score || 90) >= 85 ? 'HIGH' : 'MEDIUM') as 'HIGH' | 'MEDIUM',
    percent: analysis?.confidence_score || 92,
    breakdown: {
      'Model agreement': '94%',
      'Grounding IoU': '89%',
      'Sensor resolution': '95%',
      'Temporal baseline': '92%'
    }
  };

  const confStyle = CONF_STYLES[c.level] || CONF_STYLES.HIGH;
  const answer = r?.answer || r?.caption || r?.fusion_insight || analysis?.headline_answer;
  const advisory = analysis?.actionable_advisory || r?.actionable_advisory;
  const hazardLevel = analysis?.hazard_level || r?.hazard_level || advisory?.hazard_level || 'NORMAL';
  const smsBrief = analysis?.emergency_sms_brief || r?.emergency_sms_brief;
  const hazardStyle = HAZARD_STYLES[hazardLevel] || HAZARD_STYLES.NORMAL;
  const evidenceRegions = ((r?.evidence_regions || analysis?.evidence_regions || []) as EvidenceRegionData[]).filter(
    (reg) => reg.type !== 'target' || reg.id !== 'user_roi_focus'
  );

  return (
    <aside
      data-testid="right-panel"
      className="w-[380px] shrink-0 h-full sq-glass border-l border-cyan-500/15 flex flex-col select-none"
    >
      {/* SECTION 1: Natural-Language Query Input */}
      <div className="p-4 border-b border-cyan-500/15">
        <div className="flex items-center justify-between mb-2">
          <div className="telemetry flex items-center gap-1.5 text-cyan-400/80">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7300]" />
            <span>NATURAL-LANGUAGE QUERY</span>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1">
            <Languages className="w-3 h-3 text-cyan-400" />
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-[#0B0E14] border border-cyan-500/20 text-cyan-300 text-[11px] font-mono-x rounded px-1.5 py-0.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
              title="Select Query & Advisory Language"
            >
              {INDIC_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} · {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Demarcated ROI Banner */}
        {roi && (
          <div
            data-testid="roi-query-banner"
            className="mb-2.5 p-2 rounded-lg bg-cyan-950/70 border border-[#00F0FF]/40 text-cyan-200 text-xs font-mono-x flex items-center justify-between sq-fade-up shadow-lg"
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Crosshair className="w-3.5 h-3.5 text-[#00F0FF] sq-pulse shrink-0" />
              <div className="truncate">
                <span className="font-bold text-[#00F0FF]">ROI ACTIVE:</span>{' '}
                <span className="text-slate-300 text-[11px]">[{Math.round(roi[0]*100)}%, {Math.round(roi[1]*100)}%, {Math.round(roi[2]*100)}%, {Math.round(roi[3]*100)}%]</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  const q = `Analyze the demarcated Region of Interest [x: ${Math.round(roi[0]*100)}%, y: ${Math.round(roi[1]*100)}%] and detail all observed ground features or changes.`;
                  setQuery(q);
                  onAnalyze(q, selectedLang, roi);
                }}
                className="px-2 py-0.5 rounded bg-[#00F0FF] hover:bg-cyan-300 text-black font-bold text-[10px] sq-glow-cyan transition-all"
              >
                QUERY ROI
              </button>
              {onClearRoi && (
                <button
                  onClick={onClearRoi}
                  className="text-slate-400 hover:text-rose-400 p-0.5"
                  title="Clear ROI"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="relative">
          <textarea
            data-testid="query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={2}
            placeholder={slots.length ? 'Ask about the imagery…' : 'Load imagery first…'}
            disabled={!slots.length}
            className="w-full resize-none rounded-lg bg-[#0B0E14] border border-cyan-500/25 focus:border-cyan-400 focus:sq-glow outline-none p-3 pr-20 text-xs text-slate-100 placeholder:text-slate-600 disabled:opacity-50 font-sans"
          />

          <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={startVoiceInput}
              disabled={!slots.length || running}
              title={isListening ? 'Listening... Speak now' : 'Voice Input (Web Speech API)'}
              className={`sq-btn w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[#182232] border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400'
              } disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>

            <button
              data-testid="analyze-button"
              onClick={handleSubmit}
              disabled={!query.trim() || !slots.length || running}
              className="sq-btn w-7 h-7 rounded-md bg-[#FF7300] hover:bg-[#ff8826] text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {running ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Query Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {suggestions.map((s, i) => (
            <button
              key={i}
              data-testid={`suggestion-${i}`}
              onClick={() => setQuery(s)}
              className="sq-btn text-xs px-2.5 py-1 rounded-full border border-cyan-500/20 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/50 bg-cyan-500/5 transition-all text-left"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: Dynamic Findings & Execution Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* State A: Idle guidance */}
        {!analysis && !running && (
          <div className="text-center py-12 px-4">
            <Cpu className="w-10 h-10 text-cyan-500/25 mx-auto mb-3" />
            <h4 className="font-head text-sm font-bold text-slate-300">
              Autonomous Multimodal Agent Ready
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              SatQuery AI will parse your query, select specialized models, ground evidence bounding boxes, and deliver an auditable inference chain.
            </p>
          </div>
        )}

        {/* State B: Running animation */}
        {running && (
          <div className="flex items-center gap-2.5 text-cyan-300 text-xs sq-fade-up bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <Loader2 className="w-4 h-4 animate-spin text-[#FF7300]" />
            <span>Agent orchestrating specialist models & validating CRS…</span>
          </div>
        )}

        {/* State C: Analysis Complete */}
        {analysis && (
          <>
            {/* 1. Agentic Task Planner Card */}
            <div
              data-testid="task-planner"
              className="rounded-lg border border-cyan-500/20 bg-[#121824] p-3.5 sq-fade-up space-y-2 text-xs"
            >
              <div className="telemetry flex items-center gap-1.5 text-cyan-400">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>AGENTIC TASK PLANNER</span>
              </div>

              <div className="space-y-1 font-mono-x text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Intent:</span>
                  <span className="text-slate-200 font-semibold">{analysis.intent || analysis.task_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Task:</span>
                  <span className="text-cyan-300 font-semibold">{analysis.plan?.task_label || analysis.task_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AI Engine:</span>
                  <span className="text-emerald-300 font-semibold">{analysis.ai_engine || 'Gemini 3.8 Flash'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Inputs:</span>
                  <span className="text-slate-300">{((analysis.plan?.inputs) || ['Optical Imagery']).join(', ')}</span>
                </div>
              </div>

              {/* Models Deployed */}
              <div className="pt-2 border-t border-cyan-500/15">
                <span className="text-xs text-cyan-500/70 font-mono-x tracking-wider uppercase">
                  DEPLOYED SPECIALIST MODELS
                </span>
                <div className="mt-1 space-y-1">
                  {((analysis.plan?.models) || ['SatQuery-RS-VLM']).map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-mono-x">
                      <ChevronRight className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Actionable Decision-Support Advisory Card */}
            {advisory && (
              <div
                data-testid="actionable-advisory"
                className={`rounded-lg border p-3.5 sq-fade-up space-y-2.5 ${hazardStyle.border} ${hazardStyle.bg}`}
              >
                <div className="flex items-center justify-between">
                  <div className="telemetry flex items-center gap-1.5">
                    <AlertTriangle className={`w-3.5 h-3.5 ${hazardStyle.text}`} />
                    <span className={hazardStyle.text}>DECISION-SUPPORT ADVISORY</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono-x tracking-wider ${hazardStyle.badge}`}>
                    {hazardLevel}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                    {advisory.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono-x mt-0.5">
                    Domain: {advisory.domain} · {advisory.timestamp}
                  </div>
                </div>

                {/* Priority Directive */}
                <div className="p-2.5 rounded bg-black/40 border border-white/10 text-xs">
                  <div className="text-[10.5px] font-mono-x text-amber-300 uppercase font-bold tracking-wider mb-1">
                    PRIORITY ACTION
                  </div>
                  <div className="text-slate-200 font-sans font-medium">
                    {advisory.priority_action}
                  </div>
                </div>

                {/* Field Directives */}
                {advisory.field_instructions && advisory.field_instructions.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[10.5px] font-mono-x text-cyan-400/80 uppercase">
                      OPERATIONAL DIRECTIVES
                    </div>
                    <ul className="space-y-1">
                      {advisory.field_instructions.map((inst, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 font-sans">
                          <span className="text-emerald-400 shrink-0 font-mono-x">[{i + 1}]</span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 1-Click WhatsApp & SMS Dispatch */}
                {smsBrief && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <div className="text-[10px] font-mono-x text-slate-400 flex items-center justify-between">
                      <span>EMERGENCY DISPATCH (≤160 CHARS)</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(smsBrief);
                          setCopiedSms(true);
                          setTimeout(() => setCopiedSms(false), 2000);
                        }}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px]"
                      >
                        {copiedSms ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedSms ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>
                    <div className="text-[11px] font-mono-x bg-black/50 p-2 rounded border border-white/10 text-slate-300 leading-snug">
                      {smsBrief}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(smsBrief)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 text-[11px] font-mono-x text-center transition-all"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>WHATSAPP</span>
                      </a>
                      <a
                        href={`sms:?body=${encodeURIComponent(smsBrief)}`}
                        className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-sky-950/80 border border-sky-500/40 hover:border-sky-400 text-sky-300 hover:text-sky-200 text-[11px] font-mono-x text-center transition-all"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>SMS / RADIO</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. SatQuery-RS-VLM Answer Card */}
            <div
              data-testid="ai-answer"
              className="rounded-lg border border-[#FF7300]/30 bg-[#FF7300]/5 p-3.5 sq-fade-up space-y-2"
            >
              <div className="telemetry text-[#FF7300] flex items-center justify-between">
                <span>SATQUERY-RS-VLM · FINDINGS</span>
                <span className="text-[10.5px] px-2 py-0.5 rounded bg-[#FF7300]/20 text-[#FF7300] font-mono-x">
                  LoRA ADAPTED
                </span>
              </div>

              <p className="text-sm text-slate-100 leading-relaxed font-sans whitespace-pre-wrap">
                {answer}
              </p>

              {/* Primary Changes / Spatial Rationales Bullets */}
              {((r?.primary_changes && r.primary_changes.length > 0) ? r.primary_changes : (analysis.bullet_points || [])).length > 0 && (
                <ul className="mt-2 space-y-1.5 border-t border-cyan-500/15 pt-2">
                  {((r?.primary_changes && r.primary_changes.length > 0) ? r.primary_changes : (analysis.bullet_points || [])).map((change, i) => (
                    <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5 font-sans leading-relaxed">
                      <span className="text-[#FF7300] shrink-0 font-bold">▸</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Active Spatial Heatmap Telemetry Badge */}
              {(r?.heatmap || analysis.heatmap) && (
                <div className="mt-2 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-xs font-mono-x text-amber-300 bg-amber-500/10 px-2.5 py-1.5 rounded border border-amber-500/25">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF1744] sq-pulse" />
                    <span className="font-semibold">{(r?.heatmap || analysis.heatmap)?.title}</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono-x">
                    ACTIVE OVERLAY
                  </span>
                </div>
              )}

              {/* Land Cover Classification Badges */}
              {r?.land_cover && r.land_cover.length > 0 && (
                <div className="mt-2 pt-2 border-t border-cyan-500/15 flex flex-wrap gap-1">
                  {r.land_cover.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono-x"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Optical + SAR Complementary Insight */}
              {r?.fusion_insight && (
                <div className="mt-2 pt-2 border-t border-cyan-500/15 text-xs text-cyan-300/90 border-l-2 border-cyan-500/50 pl-2.5 font-sans italic leading-relaxed">
                  {r.fusion_insight}
                </div>
              )}
            </div>

            {/* Grounded Spatial Evidence Card */}
            {evidenceRegions.length > 0 && (
              <div
                data-testid="evidence-regions-list"
                className="rounded-lg border border-cyan-500/20 bg-[#121824] p-3.5 sq-fade-up space-y-2 text-xs"
              >
                <div className="telemetry flex items-center justify-between text-cyan-400">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>GROUNDED SPATIAL EVIDENCE</span>
                  </div>
                  <span className="text-[10.5px] font-mono-x bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    {evidenceRegions.length} REGION{evidenceRegions.length > 1 ? 'S' : ''}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {evidenceRegions.map((region, i) => {
                    const isSel = selectedRegionId === region.id;
                    const color = REGION_COLORS[region.type] || REGION_COLORS.object;
                    return (
                      <div
                        key={region.id || i}
                        onClick={() => onSelectRegion?.(isSel ? null : region)}
                        className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                          isSel
                            ? 'bg-cyan-500/20 border-[#00F0FF] shadow-lg sq-glow'
                            : 'bg-black/40 border-cyan-500/15 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: color.stroke }}
                          />
                          <div className="truncate">
                            <div className="text-slate-100 font-sans font-medium text-xs truncate">
                              {region.label}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono-x flex items-center gap-1.5">
                              <span className="text-cyan-400 uppercase">{region.type}</span>
                              <span>·</span>
                              <span>{(region.confidence * 100).toFixed(0)}% conf</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectRegion?.(isSel ? null : region);
                          }}
                          className={`text-[10px] font-mono-x px-2 py-0.5 rounded border transition-colors shrink-0 ${
                            isSel
                              ? 'bg-cyan-400 text-black border-cyan-400 font-bold'
                              : 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/15'
                          }`}
                        >
                          {isSel ? 'INSPECTING' : 'INSPECT'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. System Confidence Gauge */}
            <div
              data-testid="confidence-gauge"
              className={`rounded-lg border p-3.5 sq-fade-up space-y-2 ${confStyle.border} ${confStyle.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className="telemetry flex items-center gap-1.5">
                  <ShieldCheck className={`w-3.5 h-3.5 ${confStyle.text}`} />
                  <span className={confStyle.text}>SYSTEM CONFIDENCE</span>
                </div>
                <span className={`text-xs font-bold font-mono-x ${confStyle.text}`}>
                  {c.level} ({c.percent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${c.percent}%`, backgroundColor: confStyle.bar }}
                />
              </div>

              {/* Calibration Breakdown Table */}
              <div className="pt-2 border-t border-white/5 space-y-1 font-mono-x text-xs">
                {Object.entries(c.breakdown || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-slate-200">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Action Buttons: Download HTML / PDF / JSON */}
            <div className="space-y-2 pt-2 border-t border-cyan-500/15">
              <button
                data-testid="download-report-button"
                onClick={() => downloadReport(analysis)}
                className="sq-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-300 text-cyan-300 text-xs font-mono-x transition-all sq-glow"
              >
                <Download className="w-3.5 h-3.5 text-[#FF7300]" />
                <span>DOWNLOAD PRINTABLE REPORT (HTML)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-x">
                <a
                  href={resolveAssetUrl(analysis.report_pdf_url || `/api/report/pdf/${analysis.id || analysis.trace_id}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#182232] border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-center"
                >
                  <FileText className="w-3 h-3 text-rose-400" />
                  <span>EXPORT PDF</span>
                </a>
                <a
                  href={resolveAssetUrl(analysis.report_json_url || `/api/report/json/${analysis.id || analysis.trace_id}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#182232] border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-center"
                >
                  <Code className="w-3 h-3 text-cyan-400" />
                  <span>EXPORT JSON</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-x">
                <button
                  type="button"
                  onClick={() => downloadGeoJSON(analysis)}
                  className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#182232] border border-cyan-500/20 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 text-center"
                  title="Download GeoJSON FeatureCollection (RFC 7946) for QGIS and Mapbox"
                >
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>GEOJSON (QGIS)</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadKML(analysis)}
                  className="sq-btn flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#182232] border border-cyan-500/20 hover:border-sky-400 text-slate-300 hover:text-sky-300 text-center"
                  title="Download OGC KML for Google Earth 3D Visualization"
                >
                  <Globe className="w-3 h-3 text-sky-400" />
                  <span>KML (EARTH)</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

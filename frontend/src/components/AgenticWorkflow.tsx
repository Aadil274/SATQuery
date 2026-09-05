import React from 'react';
import { Bot, Check, ArrowDown, Search, ShieldCheck, Cpu, GitCommit, Network, Layers } from 'lucide-react';

interface WorkflowStep {
  step_num: number;
  title: string;
  description: string;
  status: string;
  details?: string;
}

interface AgenticWorkflowProps {
  steps: WorkflowStep[];
  isLoading: boolean;
}

export const AgenticWorkflow: React.FC<AgenticWorkflowProps> = ({ steps, isLoading }) => {
  const getStepIcon = (num: number) => {
    switch (num) {
      case 1: return Search;
      case 2: return ShieldCheck;
      case 3: return Cpu;
      case 4: return Layers;
      case 5: return Network;
      case 6: return GitCommit;
      default: return Bot;
    }
  };

  const getStepColor = (num: number) => {
    switch (num) {
      case 1: return 'from-blue-600 to-indigo-600 text-blue-300';
      case 2: return 'from-cyan-600 to-blue-600 text-cyan-300';
      case 3: return 'from-emerald-600 to-teal-600 text-emerald-300';
      case 4: return 'from-amber-600 to-orange-600 text-amber-300';
      case 5: return 'from-purple-600 to-pink-600 text-purple-300';
      case 6: return 'from-blue-600 to-cyan-600 text-cyan-300';
      default: return 'from-slate-700 to-slate-800 text-slate-300';
    }
  };

  return (
    <div className="bg-[#0b1020] border border-[#1e293b] rounded-2xl p-4 shadow-xl flex flex-col">
      {/* Header matching reference */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#1e293b]">
        <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          AGENTIC WORKFLOW
        </span>
      </div>

      {/* Stepper Timeline */}
      <div className="space-y-2">
        {steps.map((step, idx) => {
          const StepIcon = getStepIcon(step.step_num);
          const colorClass = getStepColor(step.step_num);
          const isLast = (idx === steps.length - 1);

          return (
            <React.Fragment key={step.step_num}>
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-[#0e1529]/70 border border-slate-800/80 hover:border-slate-700 transition-all group">
                <div className="flex items-start gap-2.5">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-md shrink-0 mt-0.5`}>
                    <StepIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                      {step.description}
                    </p>
                    {step.details && (
                      <p className="text-[9px] text-slate-400 mt-1 font-mono hidden group-hover:block transition-all">
                        {step.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 ml-2 mt-0.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {!isLast && (
                <div className="flex justify-center -my-1 py-0.5 text-slate-600">
                  <ArrowDown className="w-3 h-3" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

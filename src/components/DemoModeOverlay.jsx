import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoModeOverlay({ onSetBudget, onClose }) {
  const demoSteps = [
    { budget: 50000, label: 'STAGE 1: Baseline Budget', desc: 'Starting baseline plan at ₹50,000 with balanced needs and leisure.' },
    { budget: 35000, label: 'STAGE 2: Moderate Cut (-₹15,000)', desc: 'Budget drops to ₹35,000. System shields essentials & emergency reserve while scaling back leisure.' },
    { budget: 20000, label: 'STAGE 3: Severe Cut (-₹15,000)', desc: 'Budget drops to ₹20,000. System locks reserve, cuts non-essentials to near 0%, protecting food & transport.' },
    { budget: 40000, label: 'STAGE 4: Budget Recovery (+₹20,000)', desc: 'Budget recovers to ₹40,000. System first tops up emergency fund before expanding flex categories.' },
  ];

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    // Apply current step budget to parent state
    onSetBudget(demoSteps[currentStepIdx].budget);

    const timer = setTimeout(() => {
      if (currentStepIdx < demoSteps.length - 1) {
        setCurrentStepIdx(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [currentStepIdx, isPlaying]);

  const step = demoSteps[currentStepIdx];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full glass-panel p-5 rounded-3xl border-2 border-brand-500 shadow-2xl animate-bounce-short">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-black uppercase text-brand-600 dark:text-cyan-400 tracking-wider">
            AUTOMATED ADAPTATION DEMO
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Current Step Banner */}
      <div className="p-3.5 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 mb-3">
        <span className="text-[10px] font-extrabold uppercase text-brand-700 dark:text-cyan-300 block">
          {step.label}
        </span>
        <span className="text-xl font-black text-slate-900 dark:text-white block my-0.5">
          ₹{step.budget.toLocaleString('en-IN')}
        </span>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
          "{step.desc}"
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-between gap-1 mb-3">
        {demoSteps.map((s, i) => (
          <div
            key={i}
            onClick={() => { setCurrentStepIdx(i); setIsPlaying(false); }}
            className={`h-2 flex-1 rounded-full cursor-pointer transition-all ${
              i === currentStepIdx
                ? 'bg-brand-500 shadow-glow'
                : i < currentStepIdx
                ? 'bg-emerald-500'
                : 'bg-slate-200 dark:bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? 'Pause' : 'Resume'}
        </button>

        <button
          onClick={() => { setCurrentStepIdx(0); setIsPlaying(true); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          RESET DEMO
        </button>
      </div>

    </div>
  );
}

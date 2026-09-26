import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PresentationModeModal({ activeMode, currentPlan, delta, healthScore, onClose }) {
  const [stepIdx, setStepIdx] = useState(0);

  const slides = [
    {
      title: 'STEP 1: Identify Planning Domain',
      subtitle: 'Universal Multi-Domain Budgeting',
      content: (
        <div className="space-y-4">
          <p className="text-base text-slate-300">
            Unlike static spreadsheets or simple calculators, SmartBudget AI adapts across <strong className="text-cyan-400">12 distinct planning domains</strong> (Travel, City Infrastructure, Education, Small Business, Emergency, etc.).
          </p>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
            <span className="text-5xl">{activeMode.icon}</span>
            <div>
              <h4 className="text-xl font-bold text-white">{activeMode.name}</h4>
              <p className="text-sm text-slate-400">{activeMode.tagline}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'STEP 2: Available Budget Input',
      subtitle: 'Instant Synchronized Budgeting',
      content: (
        <div className="space-y-4 text-center">
          <p className="text-base text-slate-300">
            Users specify their capital allocation. The engine instantly computes priority-weighted category shares without page reloads.
          </p>
          <div className="p-6 rounded-3xl bg-brand-950/60 border border-cyan-500/40 shadow-glow inline-block">
            <span className="text-sm uppercase font-bold text-cyan-400 tracking-widest block">ACTIVE CAPITAL</span>
            <span className="text-5xl font-black text-white">₹{currentPlan?.totalBudget.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )
    },
    {
      title: 'STEP 3: Priority Hierarchy Matrix',
      subtitle: 'Needs vs Wants vs Reserve Classification',
      content: (
        <div className="space-y-4">
          <p className="text-base text-slate-300">
            SmartBudget AI enforces a strict internal priority hierarchy:
          </p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-brand-500/20 border border-brand-500/40">
              <span className="text-sm font-bold text-brand-300 block">1. ESSENTIAL NEEDS</span>
              <span className="text-2xl font-black text-white mt-1 block">{currentPlan?.summary.needsPct}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40">
              <span className="text-sm font-bold text-amber-300 block">2. FLEXIBLE WANTS</span>
              <span className="text-2xl font-black text-white mt-1 block">{currentPlan?.summary.wantsPct}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40">
              <span className="text-sm font-bold text-emerald-300 block">3. SAFETY RESERVE</span>
              <span className="text-2xl font-black text-white mt-1 block">{currentPlan?.summary.reservePct}%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'STEP 4: The Main "WOW" Moment',
      subtitle: 'Real-Time Adaptive Budget Scaling',
      content: (
        <div className="space-y-4">
          <p className="text-base text-slate-300">
            When budget decreases (<strong className="text-rose-400">₹50k → ₹35k → ₹20k</strong>), the app does <em>NOT</em> cut categories by flat percentages. It intelligently protects essentials first!
          </p>
          <div className="p-4 rounded-2xl bg-slate-800 border border-cyan-500/30 font-mono text-sm space-y-1">
            <div className="text-cyan-400">₹50,000 baseline → Full category coverage</div>
            <div className="text-amber-400">₹35,000 drop → Trims flexible leisure (-60%), protects food/rent</div>
            <div className="text-rose-400">₹20,000 drop → Cuts leisure to 0%, locks emergency safety fund</div>
          </div>
        </div>
      )
    },
    {
      title: 'STEP 5: Dynamic "Why Changed?" Rationale',
      subtitle: 'Explainable AI Decision Engine',
      content: (
        <div className="space-y-4">
          <p className="text-base text-slate-300">
            Judges and users receive plain-English explanations detailing <em>why</em> each category was scaled or shielded:
          </p>
          <div className="p-5 rounded-2xl bg-brand-900/50 border border-cyan-400/30 text-slate-200">
            <h4 className="font-bold text-cyan-300 mb-1">{delta?.reasoningHeading || 'Adaptive Scaling Engaged'}</h4>
            <p className="text-sm font-medium">"{delta?.reasoningDetails || 'Essential categories were protected while flexible items absorbed the reduction.'}"</p>
          </div>
        </div>
      )
    },
    {
      title: 'STEP 6: Budget Health & Simulation',
      subtitle: '0-100 Score & What-If Lab',
      content: (
        <div className="space-y-4 flex items-center gap-6">
          <div className="w-32 h-32 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex flex-col items-center justify-center shrink-0">
            <span className="text-4xl font-black text-emerald-400">{healthScore?.score}</span>
            <span className="text-[10px] uppercase font-bold text-slate-300">HEALTH SCORE</span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{healthScore?.label}</h4>
            <p className="text-sm text-slate-300">
              Evaluates fixed coverage, reserve cushion, flexibility index, and financial resilience.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'STEP 7: Summary & Conclusion',
      subtitle: 'Plan Smarter. Adapt Faster.',
      content: (
        <div className="space-y-4 text-center">
          <div className="inline-block p-4 rounded-full bg-cyan-500/20 text-cyan-300 mb-2">
            <Sparkles className="w-10 h-10 animate-spin" />
          </div>
          <h3 className="text-2xl font-black text-white">SmartBudget AI</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            A real, production-ready adaptive budget planner built to solve real-world financial reallocation problems.
          </p>
        </div>
      )
    }
  ];

  const currentSlide = slides[stepIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg animate-fadeIn text-white">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
              COMPETITION JUDGE PRESENTATION
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
            {currentSlide.subtitle}
          </span>
          <h2 className="text-3xl font-black text-white mt-1 mb-6">
            {currentSlide.title}
          </h2>

          <div>
            {currentSlide.content}
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
          <span className="text-xs font-bold text-slate-500">
            Slide {stepIdx + 1} of {slides.length}
          </span>

          <div className="flex items-center gap-3">
            <button
              disabled={stepIdx === 0}
              onClick={() => setStepIdx(prev => Math.max(0, prev - 1))}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold flex items-center gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" /> PREV
            </button>

            {stepIdx < slides.length - 1 ? (
              <button
                onClick={() => setStepIdx(prev => Math.min(slides.length - 1, prev + 1))}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-glow"
              >
                NEXT SLIDE <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-glow"
              >
                FINISH PRESENTATION <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

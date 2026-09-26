import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Sliders,
  ArrowRight,
  Play,
  Presentation,
  Award,
  RefreshCw,
  BarChart3,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { PLANNING_MODES } from '../data/planningModes';
import { calculateAllocation, calculateBudgetHealth } from '../engine/adaptiveEngine';

export default function LandingPage({ onLaunchApp, onStartDemo, onStartPresentation }) {
  // Sandbox budget state for interactive mini-calculator right on landing page
  const [sandboxMode, setSandboxMode] = useState(PLANNING_MODES[0]); // Travel Planner
  const [sandboxBudget, setSandboxBudget] = useState(50000);
  const [activeTabMode, setActiveTabMode] = useState('travel');

  // Compute live allocation for sandbox preview
  const sandboxPlan = calculateAllocation(sandboxMode, sandboxBudget, 'EXPERIENCE');
  const sandboxHealth = calculateBudgetHealth(sandboxPlan, sandboxMode);

  return (
    <div className="space-y-28 pb-20 antialiased selection:bg-brand-500 selection:text-white">

      {/* 1. HERO SECTION - Clean, Bold & Impactful */}
      <section className="relative pt-10 pb-8 sm:pt-20 sm:pb-14 text-center">
        {/* Soft background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-brand-500/15 via-cyan-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-cyan-300 text-sm font-bold shadow-sm">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Class 10 Innovation Winner • Adaptive Financial AI</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Budgeting That <br />
            <span className="bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Adapts Instantly.
            </span>
          </h1>

          {/* Large Subtitle */}
          <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SmartBudget AI re-allocates your funds dynamically when budgets shift, protecting your essentials.
          </p>

          {/* Prominent CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onLaunchApp}
              className="px-9 py-5 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white font-black text-lg sm:text-xl shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
            >
              <span>LAUNCH APP NOW</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStartDemo}
              className="px-7 py-5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-base border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all flex items-center gap-2.5 shadow-md"
            >
              <Play className="w-5 h-5 text-emerald-500 fill-current" />
              <span>WATCH DEMO</span>
            </button>
          </div>

        </div>
      </section>


      {/* 2. INTERACTIVE DEMO CARD - Big Visual Slider */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-brand-500/20 dark:border-cyan-500/20 shadow-2xl space-y-8 bg-white/90 dark:bg-slate-900/90">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
                ⚡ LIVE INTERACTIVE PREVIEW
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                Drag Slider to Test Scaling
              </h2>
            </div>

            {/* Mode selection pills */}
            <div className="flex flex-wrap gap-2">
              {PLANNING_MODES.slice(0, 4).map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSandboxMode(m);
                    setSandboxBudget(m.defaultBudget);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                    sandboxMode.id === m.id
                      ? 'bg-brand-500 text-white shadow-md scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span>{m.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider & Big Number Display */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Selected Budget</span>
                <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-cyan-400">
                  ₹{sandboxBudget.toLocaleString('en-IN')}
                </div>
                
                <input
                  type="range"
                  min={sandboxMode.minBudget}
                  max={sandboxMode.maxBudget}
                  step={sandboxMode.step}
                  value={sandboxBudget}
                  onChange={(e) => setSandboxBudget(Number(e.target.value))}
                  className="w-full h-3 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 mt-2"
                />
                <div className="flex justify-between text-xs text-slate-400 font-bold pt-1">
                  <span>Min: ₹{sandboxMode.minBudget.toLocaleString('en-IN')}</span>
                  <span>Max: ₹{sandboxMode.maxBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Health Score Pill */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Budget Health</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white">
                    {sandboxHealth?.label || 'Healthy & Resilient'}
                  </div>
                </div>
                <div className="text-3xl font-black text-brand-500 dark:text-cyan-400">
                  {sandboxHealth?.score || 85}<span className="text-sm text-slate-400">/100</span>
                </div>
              </div>
            </div>

            {/* Visual Progress Category Cards */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                Real-Time Re-allocation
              </div>

              <div className="space-y-3">
                {sandboxPlan?.categories?.slice(0, 4).map((cat) => {
                  const isNeed = cat.type === 'NEED';
                  const isReserve = cat.type === 'RESERVE';
                  const percentage = cat.percentage || cat.allocatedPercentage || 0;
                  const amount = cat.amount ?? cat.allocatedAmount ?? 0;

                  return (
                    <div key={cat.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="text-base font-bold text-slate-900 dark:text-white">
                            {cat.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            ₹{amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Large visual progress bar */}
                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            isNeed ? 'bg-amber-500' : isReserve ? 'bg-emerald-500' : 'bg-brand-500'
                          }`}
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 3. 4 KEY HIGHLIGHT CARDS - Ultra Clean Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Why Choose SmartBudget AI?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-card p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-500 dark:text-cyan-400 flex items-center justify-center text-2xl font-bold">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Adaptive Delta Cuts
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Explains exact reasons for every adjustment with our signature "Why Did My Plan Change?" rationale card.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Essentials Floor Protection
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Protects food, shelter, and emergency funds first before scaling flexible wants.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center text-2xl font-bold">
              <Sliders className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              What-If Simulation Lab
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Simulate price spikes or emergency cutbacks in real-time before spending.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl font-bold">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Health Score (0 - 100)
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Evaluates emergency reserves and spending balance to keep your plan resilient.
            </p>
          </div>

        </div>
      </section>


      {/* 4. DOMAIN PLANNING TEMPLATES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-2 border-slate-200 dark:border-slate-800 space-y-8">
          
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              12 Specialized Planning Domains
            </h2>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PLANNING_MODES.slice(0, 5).map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTabMode(m.id)}
                className={`px-5 py-3 rounded-2xl text-base font-extrabold flex items-center gap-2 transition-all ${
                  activeTabMode === m.id
                    ? 'bg-brand-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>

          {/* Active Domain Preview */}
          {(() => {
            const activeM = PLANNING_MODES.find(m => m.id === activeTabMode) || PLANNING_MODES[0];
            return (
              <div className="bg-slate-100 dark:bg-slate-900/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{activeM.icon}</span>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {activeM.name}
                    </h3>
                    <p className="text-base text-brand-600 dark:text-cyan-400 font-bold mt-1">
                      Default Budget: ₹{activeM.defaultBudget.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeM.categories.map((c) => (
                    <div key={c.id} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-2xl">{c.icon}</span>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 truncate">
                        {c.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

        </div>
      </section>


      {/* 5. FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white text-center shadow-glow space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black">
            Ready to Try SmartBudget AI?
          </h2>
          <p className="text-lg sm:text-xl text-brand-100 font-medium max-w-xl mx-auto">
            100% free & local browser execution. Experience dynamic budget scaling right now.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={onLaunchApp}
              className="px-9 py-5 rounded-2xl bg-white text-brand-700 font-black text-lg shadow-xl hover:bg-brand-50 transition-all flex items-center gap-3"
            >
              <span>OPEN APP DASHBOARD NOW</span>
              <ArrowRight className="w-6 h-6 text-brand-600" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Award,
  ShieldCheck,
  Zap,
  Sliders,
  RefreshCw,
  Compass,
  CheckCircle2,
  TrendingUp,
  Globe,
  Lock,
  BarChart3
} from 'lucide-react';
import { simulateDecision, DEFAULT_USER_PROFILE } from '../engine/financialTwinEngine';

export default function FinancialTwinLanding({
  onLaunchApp,
  onStartDemo,
  privacyMode,
  formatCurrency,
  profile = DEFAULT_USER_PROFILE,
  onOpenStudio
}) {
  const [testItem, setTestItem] = useState('Laptop');
  const [testCost, setTestCost] = useState(80000);

  const activeProfile = profile || DEFAULT_USER_PROFILE;
  const sim = simulateDecision(activeProfile, testItem, testCost);

  return (
    <div className="space-y-28 pb-20 antialiased selection:bg-brand-500 selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-12 sm:pt-20 sm:pb-16 text-center">
        {/* Glowing Background Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-brand-500/20 via-cyan-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border-2 border-brand-500/30 text-brand-600 dark:text-cyan-300 text-sm font-extrabold shadow-sm animate-pulse">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Hackathon Innovation Winner • Financial Digital Twin</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Meet Your <br />
            <span className="bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Financial Twin.
            </span>
          </h1>

          {/* Core USP Subtitle */}
          <div className="space-y-2 max-w-3xl mx-auto">
            <p className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-cyan-300">
              “Your money has no Ctrl+Z. Your Financial Twin does.”
            </p>
            <p className="text-lg sm:text-xl font-bold text-slate-600 dark:text-slate-300">
              Simulate your decisions before you live with them. Replay your future.
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onLaunchApp}
              className="px-9 py-5 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white font-black text-lg sm:text-xl shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
            >
              <span>BUILD MY FINANCIAL TWIN</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStartDemo}
              className="px-7 py-5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-base border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all flex items-center gap-2.5 shadow-md"
            >
              <Play className="w-5 h-5 text-emerald-500 fill-current" />
              <span>TRY FINANCIAL CTRL+Z</span>
            </button>

            {onOpenStudio && (
              <button
                onClick={onOpenStudio}
                className="px-6 py-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-extrabold text-base hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 shadow-md"
              >
                <Sliders className="w-5 h-5" />
                <span>CUSTOMIZE MY SALARY & SAVINGS</span>
              </button>
            )}
          </div>

          {/* VISUAL PIPELINE FLOW DIAGRAM */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              How The Financial Digital Twin Works
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <span className="text-3xl">👤</span>
                <div className="text-sm font-black text-slate-900 dark:text-white">1. User Profile</div>
                <div className="text-xs text-slate-500 font-medium">Salary {formatCurrency(activeProfile.monthlyIncome)}</div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-b from-brand-500/10 to-brand-500/20 border-2 border-brand-500/40 shadow-sm space-y-1">
                <span className="text-3xl">🧬</span>
                <div className="text-sm font-black text-brand-600 dark:text-cyan-300">2. Financial Twin</div>
                <div className="text-xs text-slate-500 font-medium">Live AI Financial Model</div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <span className="text-3xl">🧪</span>
                <div className="text-sm font-black text-slate-900 dark:text-white">3. What-If Lab</div>
                <div className="text-xs text-slate-500 font-medium">Simulate Purchases & Trips</div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
                <span className="text-3xl">⚡</span>
                <div className="text-sm font-black text-slate-900 dark:text-white">4. Ctrl+Z Undo</div>
                <div className="text-xs text-slate-500 font-medium">Replay Future Consequence</div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. INTERACTIVE WHAT-IF SANDBOX DEMO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-brand-500/30 shadow-2xl space-y-8 bg-white/90 dark:bg-slate-900/90">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
                ⚡ SIGNATURE FEATURE DEMO
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                "What if I buy an {formatCurrency(testCost)} Laptop?"
              </h2>
            </div>

            <button
              onClick={onLaunchApp}
              className="px-5 py-3 rounded-2xl bg-brand-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:bg-brand-600 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Test in Full App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Before vs After Impact Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Simulate Purchase Amount</span>
                <div className="text-4xl font-black text-brand-600 dark:text-cyan-400">
                  {formatCurrency(testCost)}
                </div>
                
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={testCost}
                  onChange={(e) => setTestCost(Number(e.target.value))}
                  className="w-full h-3 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span>₹5,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              {/* Goal Delay Badge */}
              <div className="p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-rose-600 uppercase">Primary Goal Delay</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{activeProfile.goals?.[0]?.name || "Europe Vacation Fund"}</div>
                </div>
                <div className="text-2xl font-black text-rose-600">
                  +{sim.goalDelayDays} Days
                </div>
              </div>
            </div>

            {/* Before / After Comparison */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                Live Twin Consequences for {formatCurrency(activeProfile.monthlyIncome)}/mo Salary
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">BEFORE DECISION</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(activeProfile.currentSavings)}
                  </div>
                  <p className="text-xs text-slate-500">Available liquid savings pool</p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-400 dark:border-rose-800 space-y-2">
                  <span className="text-xs font-bold text-rose-500 uppercase">AFTER PURCHASE</span>
                  <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                    {formatCurrency(sim.newSavings)}
                  </div>
                  <p className="text-xs text-rose-500 font-bold">Recovery: {sim.recoveryMonths} Months</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-brand-500 shrink-0" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {sim.recommendation}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. REVOLUTIONARY USP SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider">
            ⚡ WHY WE ARE REVOLUTIONARY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Everything Existing Budget Apps Miss.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Traditional budget apps show where money went. Your Financial Twin simulates where money will go before you spend a single rupee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-3xl border-2 border-brand-500/30 space-y-4 hover:border-brand-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black text-xl">
              ⚡
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Financial Ctrl+Z</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Stack multiple life choices, see future cash consequences, and hit Ctrl+Z to undo decisions in reverse order.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-2 border-cyan-500/30 space-y-4 hover:border-cyan-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-black text-xl">
              🁢
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Domino Effect</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              One purchase triggers a 5-step financial reaction: savings drop, emergency buffer cracks, goals delay, stress spikes.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-2 border-violet-500/30 space-y-4 hover:border-violet-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-violet-500 text-white flex items-center justify-center font-black text-xl">
              ⏳
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">5-Year Time Machine</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Scrub a dynamic time slider from Today through 5 Years into the future. Watch compound interest and net worth delta live.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

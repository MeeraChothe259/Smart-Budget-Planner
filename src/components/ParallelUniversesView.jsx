import React, { useState } from 'react';
import { generateParallelUniverses } from '../engine/financialTwinEngine';
import { Globe, Sparkles, TrendingUp, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ParallelUniversesView({ profile, privacyMode, formatCurrency }) {
  const universes = generateParallelUniverses(profile);
  const [selectedUniv, setSelectedUniv] = useState(universes[1]); // Universe B default

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-violet-500/30 shadow-xl bg-gradient-to-r from-white via-violet-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white font-black shadow-md">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-black uppercase mb-1">
              MULTI-TIMELINE FUTURE SIMULATOR
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              FINANCIAL PARALLEL UNIVERSES
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Compare 5 possible financial futures over 1, 3, and 5 years. Switch between universes to see your wealth growth!
        </p>
      </div>

      {/* UNIVERSE CARDS SELECTOR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {universes.map((univ) => {
          const isSelected = selectedUniv.id === univ.id;

          return (
            <button
              key={univ.id}
              onClick={() => setSelectedUniv(univ)}
              className={`p-5 rounded-3xl border-2 text-left transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-b from-violet-600 to-brand-600 text-white border-violet-500 shadow-glow scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-violet-400'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider opacity-80">
                    {univ.name}
                  </span>
                  {isSelected && <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />}
                </div>
                <h3 className="text-base font-extrabold leading-tight">
                  {univ.tagline}
                </h3>
              </div>

              <div className="pt-4 border-t border-current/20 mt-4 space-y-1 text-xs font-bold">
                <div className="flex justify-between">
                  <span className="opacity-80">5-Yr Net Worth:</span>
                  <span>{formatCurrency(univ.yr5NetWorth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Goal Completion:</span>
                  <span>{univ.goalCompletionDate}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED UNIVERSE DETAILED COMPARISON PANEL */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-violet-500/40 shadow-2xl space-y-8 bg-white dark:bg-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-500">Selected Timeline</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {selectedUniv.name}: {selectedUniv.tagline}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-black border border-emerald-500/30">
              Monthly Free Savings: {formatCurrency(selectedUniv.monthlySavings)}
            </span>
          </div>
        </div>

        {/* 1-Yr, 3-Yr, 5-Yr Growth Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 space-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Year 1 Net Worth</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {formatCurrency(selectedUniv.yr1NetWorth)}
            </div>
            <p className="text-xs text-slate-500 font-medium">+1 Year compounding &amp; accumulated savings</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 space-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Year 3 Net Worth</span>
            <div className="text-3xl font-black text-brand-600 dark:text-cyan-400">
              {formatCurrency(selectedUniv.yr3NetWorth)}
            </div>
            <p className="text-xs text-slate-500 font-medium">+3 Years compounding &amp; accumulated savings</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-600 to-brand-600 text-white space-y-2 text-center shadow-lg">
            <span className="text-xs font-black uppercase tracking-wider opacity-80">Year 5 Net Worth</span>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {formatCurrency(selectedUniv.yr5NetWorth)}
            </div>
            <p className="text-xs opacity-90 font-medium">5-Year wealth trajectory</p>
          </div>

        </div>

        {/* Key Timeline Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400">Goal Completion Target</div>
              <div className="text-lg font-black text-slate-900 dark:text-white">{selectedUniv.goalCompletionDate}</div>
            </div>
            <Calendar className="w-6 h-6 text-brand-500" />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400">Emergency Fund Runway</div>
              <div className="text-lg font-black text-emerald-500">{selectedUniv.emergencyMonths} Months</div>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400">Monthly Free Cash Flow</div>
              <div className="text-lg font-black text-violet-500">{formatCurrency(selectedUniv.disposableIncome)}</div>
            </div>
            <TrendingUp className="w-6 h-6 text-violet-500" />
          </div>

        </div>

      </div>

    </div>
  );
}

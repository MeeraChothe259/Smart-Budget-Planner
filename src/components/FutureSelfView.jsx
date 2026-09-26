import React, { useState } from 'react';
import { Sparkles, Calendar, TrendingUp, Sliders, ArrowRight } from 'lucide-react';

export default function FutureSelfView({ profile, privacyMode, formatCurrency }) {
  const [extraMonthlySavings, setExtraMonthlySavings] = useState(5000);
  const [returnRate, setReturnRate] = useState(10); // 10% annual returns

  const currentTotal = profile.currentSavings + profile.investments;
  const baseMonthlySavings = profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses;
  const newMonthlySavings = baseMonthlySavings + extraMonthlySavings;
  const annualSavings = newMonthlySavings * 12;

  // 5-Year Compound Growth Calculation
  const r = returnRate / 100;
  const projected5YrNetWorth = Math.round(currentTotal * Math.pow(1 + r, 5) + annualSavings * ((Math.pow(1 + r, 5) - 1) / r));

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-violet-500/30 shadow-xl bg-gradient-to-r from-white via-violet-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white font-black shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-black uppercase mb-1">
              5-YEAR TRAJECTORY PROJECTION
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              ME, 5 YEARS FROM NOW
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          See your projected net worth and wealth trajectory 5 years into the future. Adjust sliders to change your future outcome!
        </p>
      </div>

      {/* 5-YEAR PROJECTED NET WORTH DISPLAY */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-violet-500/40 shadow-2xl text-center space-y-4 bg-gradient-to-b from-white to-violet-50/30 dark:from-slate-900 dark:to-slate-900">
        <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-violet-500">Projected 5-Year Net Worth (2031)</span>
        <div className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white bg-gradient-to-r from-violet-600 via-brand-500 to-cyan-400 bg-clip-text text-transparent">
          {formatCurrency(projected5YrNetWorth)}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-bold max-w-md mx-auto">
          Includes current liquid assets + accumulated monthly savings compounding at {returnRate}% annual return.
        </p>
      </div>

      {/* CHANGE MY FUTURE TRAJECTORY SLIDERS */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-violet-500" />
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            "Change My Future" Trajectory Modifiers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1: Extra Monthly Savings */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-600 dark:text-slate-300">Extra Monthly Savings</span>
              <span className="text-brand-600 dark:text-cyan-400 font-black text-lg">+{formatCurrency(extraMonthlySavings)}/mo</span>
            </div>
            <input
              type="range"
              min="0"
              max="25000"
              step="1000"
              value={extraMonthlySavings}
              onChange={(e) => setExtraMonthlySavings(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>

          {/* Slider 2: Investment Annual Return Rate */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-600 dark:text-slate-300">Est. Investment Return Rate</span>
              <span className="text-violet-500 font-black text-lg">{returnRate}% Annual</span>
            </div>
            <input
              type="range"
              min="6"
              max="16"
              step="1"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

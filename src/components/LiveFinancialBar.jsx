import React, { useState } from 'react';
import {
  Sliders,
  DollarSign,
  PiggyBank,
  Wallet,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Zap,
  TrendingUp,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function LiveFinancialBar({
  profile,
  onUpdateProfile,
  onOpenStudio,
  privacyMode,
  formatCurrency
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const salary = profile.monthlyIncome || 50000;
  const fixed = profile.fixedExpenses || 24000;
  const variable = profile.variableExpenses || 11000;
  const debt = profile.debtEmis || 0;
  const pool = profile.currentSavings || 120000;

  // Real-time monthly savings
  const monthlySavings = Math.max(0, salary - fixed - variable - debt);
  const savingsRate = salary > 0 ? Math.round((monthlySavings / salary) * 100) : 0;
  const runwayMonths = fixed > 0 ? (profile.emergencyFund / fixed).toFixed(1) : '99';

  // Quick Stepper Actions with immediate parent update
  const adjustSalary = (delta) => {
    const newSalary = Math.max(5000, salary + delta);
    onUpdateProfile({
      ...profile,
      monthlyIncome: newSalary,
      salarySources: [{ name: "Primary Salary", amount: newSalary }]
    });
  };

  const adjustSavings = (delta) => {
    // Shifting variable expenses to reflect savings adjustment
    const targetSavings = Math.max(0, monthlySavings + delta);
    const newVar = Math.max(0, salary - fixed - debt - targetSavings);
    onUpdateProfile({
      ...profile,
      variableExpenses: newVar
    });
  };

  const adjustPool = (delta) => {
    const newPool = Math.max(0, pool + delta);
    onUpdateProfile({
      ...profile,
      currentSavings: newPool
    });
  };

  return (
    <div className="w-full glass-card rounded-2xl border-2 border-brand-500/40 bg-white/95 dark:bg-slate-900/95 shadow-md transition-all duration-200 overflow-hidden">
      
      {/* COMPACT BAR (ALWAYS VISIBLE) */}
      <div className="p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Left: Real-time status badge & quick title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Live Financials
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Real-Time
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Changes reflect instantly across all views
            </p>
          </div>
        </div>

        {/* Center: Live Metrics with Quick +/- Steppers */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-between md:justify-center flex-1">
          
          {/* Salary Pill */}
          <div className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => adjustSalary(-5000)}
              className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-black text-xs transition-colors"
              title="Decrease Salary by ₹5,000"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="text-center px-1">
              <span className="text-[9px] uppercase font-black text-slate-400 block leading-tight">Salary</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                {formatCurrency(salary)}
              </span>
            </div>
            <button
              onClick={() => adjustSalary(5000)}
              className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-black text-xs transition-colors"
              title="Increase Salary by ₹5,000"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Monthly Savings Pill */}
          <div className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <button
              onClick={() => adjustSavings(-2000)}
              className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-black text-xs transition-colors"
              title="Decrease Monthly Savings by ₹2,000"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="text-center px-1">
              <span className="text-[9px] uppercase font-black text-emerald-700 dark:text-emerald-400 block leading-tight">
                Monthly Savings ({savingsRate}%)
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 leading-tight">
                {formatCurrency(monthlySavings)}/mo
              </span>
            </div>
            <button
              onClick={() => adjustSavings(2000)}
              className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-black text-xs transition-colors"
              title="Increase Monthly Savings by ₹2,000"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Liquid Savings Pool Pill */}
          <div className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => adjustPool(-10000)}
              className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-black text-xs transition-colors"
              title="Decrease Savings Pool by ₹10,000"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="text-center px-1">
              <span className="text-[9px] uppercase font-black text-slate-400 block leading-tight">Savings Pool</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                {formatCurrency(pool)}
              </span>
            </div>
            <button
              onClick={() => adjustPool(10000)}
              className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-black text-xs transition-colors"
              title="Increase Savings Pool by ₹10,000"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 justify-end shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            title={isExpanded ? "Collapse inline sliders" : "Expand inline sliders"}
          >
            <span>Sliders</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onOpenStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white shadow-sm hover:scale-105 transition-all"
            title="Open comprehensive Financial Studio"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Full Studio</span>
          </button>
        </div>

      </div>

      {/* EXPANDABLE QUICK SLIDERS TRAY */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          
          {/* Salary Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-300">Monthly Salary</span>
              <span className="font-black text-brand-600 dark:text-cyan-400">{formatCurrency(salary)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="300000"
              step="2500"
              value={salary}
              onChange={(e) => {
                const val = Number(e.target.value);
                onUpdateProfile({
                  ...profile,
                  monthlyIncome: val,
                  salarySources: [{ name: "Primary Salary", amount: val }]
                });
              }}
              className="w-full accent-brand-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Monthly Savings Target Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-300">Target Monthly Savings</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(monthlySavings)}/mo ({savingsRate}%)</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(10000, salary - fixed)}
              step="1000"
              value={monthlySavings}
              onChange={(e) => {
                const target = Number(e.target.value);
                const newVar = Math.max(0, salary - fixed - debt - target);
                onUpdateProfile({
                  ...profile,
                  variableExpenses: newVar
                });
              }}
              className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Savings Pool Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-300">Liquid Savings Pool</span>
              <span className="font-black text-slate-900 dark:text-white">{formatCurrency(pool)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="5000"
              value={pool}
              onChange={(e) => {
                const val = Number(e.target.value);
                onUpdateProfile({
                  ...profile,
                  currentSavings: val
                });
              }}
              className="w-full accent-cyan-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

        </div>
      )}

    </div>
  );
}

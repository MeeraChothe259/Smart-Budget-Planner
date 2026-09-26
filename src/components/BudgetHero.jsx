import React from 'react';
import { Minus, Plus, RotateCcw, Zap } from 'lucide-react';

export default function BudgetHero({
  budget,
  setBudget,
  activeMode,
  onReset
}) {
  const min = activeMode.minBudget || 5000;
  const max = activeMode.maxBudget || 500000;
  const step = activeMode.step || 2000;

  const handleInputChange = (e) => {
    const val = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (!isNaN(val)) {
      setBudget(val);
    }
  };

  const handleStep = (delta) => {
    setBudget(prev => Math.max(min, Math.min(max, prev + delta)));
  };

  const presets = [
    { label: '₹20,000', val: 20000 },
    { label: '₹35,000', val: 35000 },
    { label: '₹50,000', val: 50000 },
    { label: '₹1,00,000', val: 100000 },
    { label: '₹2,50,000', val: 250000 },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-10 border-2 border-brand-500/30 shadow-xl bg-gradient-to-br from-white via-slate-50 to-brand-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/40">
      
      {/* Background Decorative Accent Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Info Header - LARGE FONTS & EASY WORDS */}
        <div className="w-full md:w-1/2 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300 text-xs sm:text-sm font-extrabold tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Smart Money Helper ⚡</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How Much Money Do You Have?
          </h1>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            Move the slider or type your total money. Watch SmartBudget AI automatically divide it for you!
          </p>
          
          {/* Quick Presets */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 mr-1">Quick Pick:</span>
            {presets.map(p => (
              <button
                key={p.val}
                onClick={() => setBudget(p.val)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-extrabold rounded-xl border-2 transition-all ${
                  budget === p.val
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-105'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Input Display & Slider */}
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-md space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Budget Amount
            </span>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-brand-600 dark:hover:text-cyan-400 transition-colors"
              title="Reset to default budget"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Number Display & Step Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => handleStep(-step)}
              className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Decrease budget"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="relative flex-1 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-cyan-400 mr-1">
                ₹
              </span>
              <input
                type="text"
                value={budget.toLocaleString('en-IN')}
                onChange={handleInputChange}
                className="w-full text-3xl sm:text-4xl font-black text-slate-900 dark:text-white bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-brand-500/40 rounded-xl py-1"
                aria-label="Available budget amount"
              />
            </div>

            <button
              onClick={() => handleStep(step)}
              className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Increase budget"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-2 pt-1">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
              <span>Min: ₹{min.toLocaleString('en-IN')}</span>
              <span>Max: ₹{max.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

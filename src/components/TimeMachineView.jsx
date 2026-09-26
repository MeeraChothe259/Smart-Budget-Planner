import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Sparkles, TrendingUp, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { simulateDecision } from '../engine/financialTwinEngine';

export default function TimeMachineView({ profile, privacyMode, formatCurrency }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testedDecision, setTestedDecision] = useState('Buy ₹80,000 Laptop');
  const [testedAmount, setTestedAmount] = useState(80000);

  const timelineSteps = [
    { key: 'today', label: 'TODAY', months: 0 },
    { key: '1m', label: '1 MONTH', months: 1 },
    { key: '3m', label: '3 MONTHS', months: 3 },
    { key: '6m', label: '6 MONTHS', months: 6 },
    { key: '1y', label: '1 YEAR', months: 12 },
    { key: '3y', label: '3 YEARS', months: 36 },
    { key: '5y', label: '5 YEARS', months: 60 }
  ];

  const currentStep = timelineSteps[activeStepIndex];

  // Auto-play time machine scrubber
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        setActiveStepIndex(prev => (prev + 1) % timelineSteps.length);
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStepIndex]);

  // Calculate dynamic projected metrics at current step
  const months = currentStep.months;
  const monthlySavings = profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses;
  
  // Baseline without purchase
  const baselineSavings = profile.currentSavings + (monthlySavings * months);
  const baselineInvestments = Math.round(profile.investments * Math.pow(1.09, months / 12) + (monthlySavings * 0.4 * months));

  // With purchase decision
  const purchaseCost = testedAmount;
  const simSavings = Math.max(0, profile.currentSavings - purchaseCost) + (monthlySavings * months);
  const simInvestments = Math.round((profile.investments * Math.pow(1.09, months / 12)) + (Math.max(0, monthlySavings - 2000) * 0.4 * months));

  const baselineNetWorth = baselineSavings + baselineInvestments;
  const simNetWorth = simSavings + simInvestments;
  const deltaNetWorth = simNetWorth - baselineNetWorth;

  return (
    <div className="space-y-8 antialiased">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-[#090d16] text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
              ⏳
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black uppercase mb-1">
                DYNAMIC TIME SCRUBBER
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                FINANCIAL TIME MACHINE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-brand-500 hover:from-cyan-600 hover:to-brand-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'PAUSE TIMELINE' : 'PLAY TIMELINE SCRUB'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveStepIndex(0);
              }}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors"
              title="Reset Timeline to Today"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl">
          Scrub through time to see how today's financial decision compound or shift your net worth, savings, and goals over 1 month, 1 year, and 5 years!
        </p>

        {/* INPUT DECISION SELECTOR */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-slate-300">Tested Financial Decision</label>
            <input
              type="text"
              value={testedDecision}
              onChange={(e) => setTestedDecision(e.target.value)}
              className="px-3 py-1.5 bg-[#060911] border border-slate-700 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black text-slate-300 uppercase">
              <span>Purchase Amount</span>
              <span className="text-cyan-300 font-black">{formatCurrency(testedAmount)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="10000"
              value={testedAmount}
              onChange={(e) => setTestedAmount(Number(e.target.value))}
              className="w-full sm:w-64 h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>


      {/* HORIZONTAL TIMELINE SCRUBBER CONTROL */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-900/90 shadow-md">
        
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-cyan-400">
            Interactive Timeline Horizon
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Currently Viewing: <span className="text-brand-600 dark:text-cyan-300">{currentStep.label}</span> ({currentStep.months} Months Out)
          </h3>
        </div>

        {/* SCRUBBER BUTTONS PIPELINE */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {timelineSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.key}
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStepIndex(idx);
                }}
                className={`p-3 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-cyan-500 text-white border-cyan-400 shadow-glow scale-105'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                }`}
              >
                <span>{step.label}</span>
                <span className={`text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  +{step.months} Mo
                </span>
              </button>
            );
          })}
        </div>

        {/* RANGE SLIDER SCRUBBER */}
        <div className="pt-2">
          <input
            type="range"
            min="0"
            max={timelineSteps.length - 1}
            step="1"
            value={activeStepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setActiveStepIndex(Number(e.target.value));
            }}
            className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
        </div>
      </div>


      {/* DYNAMIC TIME MACHINE PROJECTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* BASELINE NO PURCHASE */}
        <div className="rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900/90 shadow-md">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-black text-slate-400 uppercase">Baseline Path</span>
            <h4 className="text-lg font-black text-slate-900 dark:text-white">WITHOUT PURCHASE</h4>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-500 font-bold block">Liquid Savings</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(baselineSavings)}</span>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-bold block">Investments</span>
              <span className="text-xl font-black text-emerald-500">{formatCurrency(baselineInvestments)}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-black uppercase block">Projected Net Worth</span>
              <span className="text-2xl font-black text-brand-600 dark:text-cyan-400">{formatCurrency(baselineNetWorth)}</span>
            </div>
          </div>
        </div>

        {/* WITH PURCHASE */}
        <div className="rounded-3xl p-6 border-2 border-brand-500/40 space-y-4 bg-gradient-to-br from-brand-500/5 via-cyan-500/5 to-transparent">
          <div className="border-b border-brand-500/30 pb-3">
            <span className="text-xs font-black text-brand-600 dark:text-cyan-300 uppercase">Simulated Path</span>
            <h4 className="text-lg font-black text-slate-900 dark:text-white">WITH "{testedDecision}"</h4>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-500 font-bold block">Liquid Savings</span>
              <span className="text-2xl font-black text-rose-500">{formatCurrency(simSavings)}</span>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-bold block">Investments</span>
              <span className="text-xl font-black text-emerald-500">{formatCurrency(simInvestments)}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-black uppercase block">Projected Net Worth</span>
              <span className="text-2xl font-black text-rose-500">{formatCurrency(simNetWorth)}</span>
            </div>
          </div>
        </div>

        {/* TIMELINE DELTA ANALYSIS */}
        <div className="rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900/90 text-center flex flex-col justify-between shadow-md">
          <div>
            <span className="text-xs font-black text-slate-400 uppercase block mb-1">Time Horizon Impact</span>
            <h4 className="text-lg font-black text-slate-900 dark:text-white">DELTA @ {currentStep.label}</h4>

            <div className="my-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 block">Total Net Worth Gap</span>
              <div className={`text-3xl font-black ${deltaNetWorth < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                {formatCurrency(deltaNetWorth)}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            {deltaNetWorth < 0 ? `At ${currentStep.label}, your wealth is lower by ${formatCurrency(Math.abs(deltaNetWorth))} due to lost liquidity & compounding.` : 'Positive wealth accumulation.'}
          </div>
        </div>

      </div>

    </div>
  );
}

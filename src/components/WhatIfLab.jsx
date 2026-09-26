import React, { useState } from 'react';
import { FlaskConical, Check, Sparkles } from 'lucide-react';
import { calculateAllocation } from '../engine/adaptiveEngine';

export default function WhatIfLab({ activeMode, currentPlan, activePriority, onApplyScenario }) {
  const [simBudget, setSimBudget] = useState(30000);

  // Preset Scenarios with student-friendly labels
  const presets = [
    { label: 'What if budget drops to ₹30,000?', budget: 30000 },
    { label: 'What if budget increases by ₹15,000?', budget: (currentPlan?.totalBudget || 50000) + 15000 },
    { label: 'What if budget drops to ₹20,000?', budget: 20000 },
    { label: 'What if budget expands to ₹1,00,000?', budget: 100000 },
  ];

  // Calculate simulated plan
  const simulatedPlan = calculateAllocation(activeMode, simBudget, activePriority);

  if (!currentPlan || !simulatedPlan) return null;

  const budgetDelta = simulatedPlan.totalBudget - currentPlan.totalBudget;

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-brand-500/30 shadow-lg bg-gradient-to-br from-white via-slate-50 to-brand-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/20 space-y-6">
      
      {/* Header - LARGE FONTS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-brand-500 flex items-center justify-center text-white shadow-md font-black text-2xl">
            🧪
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              What-If Money Simulator
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
              Test what happens when your money changes before actually spending!
            </p>
          </div>
        </div>

        {/* Apply Scenario Button */}
        <button
          onClick={() => onApplyScenario(simBudget)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-cyan-500 text-white font-black text-sm shadow-md hover:from-brand-700 hover:to-cyan-600 transition-all active:scale-95 shrink-0"
        >
          <Check className="w-5 h-5" />
          USE THIS SCENARIO AS PLAN
        </button>
      </div>

      {/* Interactive Scenario Presets */}
      <div>
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Test Quick Scenarios:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSimBudget(p.budget)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl border-2 transition-all ${
                simBudget === p.budget
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Slider Input */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-200">
            Simulated Money Amount: <span className="text-brand-600 dark:text-cyan-400 font-black text-xl sm:text-2xl">₹{simBudget.toLocaleString('en-IN')}</span>
          </span>
          <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-xl ${
            budgetDelta > 0 ? 'bg-emerald-500/10 text-emerald-600' : budgetDelta < 0 ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-100 text-slate-600'
          }`}>
            Difference: {budgetDelta >= 0 ? `+₹${budgetDelta.toLocaleString('en-IN')}` : `-₹${Math.abs(budgetDelta).toLocaleString('en-IN')}`}
          </span>
        </div>
        <input
          type="range"
          min={activeMode.minBudget || 5000}
          max={activeMode.maxBudget || 500000}
          step={activeMode.step || 2000}
          value={simBudget}
          onChange={(e) => setSimBudget(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
      </div>

      {/* Comparative Simulation Grid - LARGE FONTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current Plan Summary */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase text-slate-500 dark:text-slate-400">
            Current Active Plan (₹{currentPlan.totalBudget.toLocaleString('en-IN')})
          </h4>
          <div className="space-y-2 text-sm sm:text-base font-semibold">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Must-Haves:</span>
              <span className="font-black text-slate-900 dark:text-white">₹{currentPlan.summary.totalNeeds.toLocaleString('en-IN')} ({currentPlan.summary.needsPct}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300 font-semibold">Fun Stuff:</span>
              <span className="font-black text-slate-900 dark:text-white">₹{currentPlan.summary.totalWants.toLocaleString('en-IN')} ({currentPlan.summary.wantsPct}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300 font-semibold">Piggy Bank Reserve:</span>
              <span className="font-black text-slate-900 dark:text-white">₹{currentPlan.summary.totalReserve.toLocaleString('en-IN')} ({currentPlan.summary.reservePct}%)</span>
            </div>
          </div>
        </div>

        {/* Simulated Plan Summary */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 dark:from-brand-500/20 dark:to-cyan-500/10 border-2 border-brand-500/30 space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase text-brand-600 dark:text-cyan-400 flex items-center justify-between">
            <span>Simulated Result (₹{simulatedPlan.totalBudget.toLocaleString('en-IN')})</span>
            <Sparkles className="w-4 h-4" />
          </h4>
          <div className="space-y-2 text-sm sm:text-base font-semibold">
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">Simulated Must-Haves:</span>
              <span className="font-black text-slate-900 dark:text-white">₹{simulatedPlan.summary.totalNeeds.toLocaleString('en-IN')} ({simulatedPlan.summary.needsPct}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">Simulated Fun Stuff:</span>
              <span className="font-black text-slate-900 dark:text-white">₹{simulatedPlan.summary.totalWants.toLocaleString('en-IN')} ({simulatedPlan.summary.wantsPct}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">Simulated Piggy Bank:</span>
              <span className="font-black text-slate-900 dark:text-white">₹{simulatedPlan.summary.totalReserve.toLocaleString('en-IN')} ({simulatedPlan.summary.reservePct}%)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

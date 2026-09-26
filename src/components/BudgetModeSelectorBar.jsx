import React from 'react';
import { PLANNING_MODES } from '../data/planningModes';
import { Sparkles, Layers } from 'lucide-react';

export default function BudgetModeSelectorBar({ activeMode, onSelectMode }) {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-brand-500/30 space-y-4 shadow-md bg-gradient-to-r from-white via-brand-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              What budget do you want to plan today? 🎯
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
            Click any button below to pick a budget mode (Travel, Education, Daily Life, Tech, etc.)
          </p>
        </div>

        <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300 border border-brand-500/30 shrink-0">
          {PLANNING_MODES.length} Budget Types Available
        </span>
      </div>

      {/* Prominent Grid of 12 Budget Types */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {PLANNING_MODES.map((mode) => {
          const isSelected = activeMode.id === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode)}
              className={`p-3.5 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 group ${
                isSelected
                  ? 'bg-brand-500 text-white border-brand-500 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-brand-400'
              }`}
            >
              <span className="text-3xl transition-transform group-hover:scale-110">
                {mode.icon}
              </span>
              <span className="text-xs sm:text-sm font-extrabold leading-tight">
                {mode.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

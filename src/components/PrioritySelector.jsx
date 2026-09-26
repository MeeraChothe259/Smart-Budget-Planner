import React from 'react';
import { PRIORITIES } from '../data/planningModes';
import { Target } from 'lucide-react';

export default function PrioritySelector({ activePriority, onSelectPriority }) {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-500" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              What is your main goal? 🎯
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
            Pick what you want to focus on. SmartBudget AI will adjust your plan!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PRIORITIES.map(p => {
          const isSelected = activePriority === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPriority(p.id)}
              className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-200 group ${
                isSelected
                  ? 'bg-brand-500 text-white border-brand-500 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-400'
              }`}
            >
              <span className="text-3xl mb-2 transition-transform group-hover:scale-110">
                {p.icon}
              </span>
              <span className="text-sm font-extrabold leading-snug">
                {p.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

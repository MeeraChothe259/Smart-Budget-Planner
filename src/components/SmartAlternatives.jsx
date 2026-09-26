import React, { useState } from 'react';
import { Lightbulb, ArrowRight, CheckCircle, Compass } from 'lucide-react';

export default function SmartAlternatives({ activeMode, currentPlan }) {
  if (!activeMode || !activeMode.alternatives) return null;

  const alternativesObj = activeMode.alternatives;
  const categoryKeys = Object.keys(alternativesObj);
  const [selectedCatKey, setSelectedCatKey] = useState(categoryKeys[0] || '');

  if (categoryKeys.length === 0) return null;

  const selectedCat = currentPlan?.categories.find(c => c.id === selectedCatKey) || currentPlan?.categories[0];
  const optionList = alternativesObj[selectedCatKey] || [];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            💡 Smart Alternatives
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">
          Mode: {activeMode.name}
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categoryKeys.map(key => {
          const catDef = currentPlan?.categories.find(c => c.id === key);
          const name = catDef ? catDef.name : key;
          const icon = catDef ? catDef.icon : '🏷️';
          const isSelected = selectedCatKey === key;

          return (
            <button
              key={key}
              onClick={() => setSelectedCatKey(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </button>
          );
        })}
      </div>

      {/* Alternatives Stepper Options */}
      <div className="space-y-2">
        {optionList.map((opt, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-400 font-extrabold text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {opt.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Tier: {opt.level}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-extrabold text-brand-600 dark:text-cyan-400 block">
                ~{opt.thresholdPct}% of budget
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                {idx > 0 ? `Saves ~${idx * 15}%` : 'Standard'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

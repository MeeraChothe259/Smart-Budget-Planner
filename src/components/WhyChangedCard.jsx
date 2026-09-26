import React from 'react';
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';

export default function WhyChangedCard({ delta, prevBudget, currBudget }) {
  if (!delta || delta.isUnchanged) {
    return (
      <div className="glass-card rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-cyan-400 flex items-center justify-center font-bold text-2xl">
            ✨
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white">
              Budget Ready!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Budget locked at ₹{currBudget.toLocaleString('en-IN')}. Move the slider above to see real-time AI changes!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { budgetDelta, isDecrease, categoryDiffs, reasoningHeading, reasoningDetails } = delta;

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-gradient-to-br from-white via-brand-50/20 to-slate-50 dark:from-slate-900 dark:via-brand-950/20 dark:to-slate-900 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-600 text-white shadow-sm">
              ✨ SMART EXPLANATION
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Why Did My Plan Change? 💡
          </h3>
        </div>

        {/* Budget Delta Badge */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase">
              Money Difference
            </div>
            <div className="text-sm font-black text-slate-700 dark:text-slate-200">
              ₹{prevBudget.toLocaleString('en-IN')} → ₹{currBudget.toLocaleString('en-IN')}
            </div>
          </div>
          <div className={`flex items-center font-black text-base px-3 py-1.5 rounded-xl ${
            isDecrease
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
          }`}>
            {isDecrease ? <ArrowDownRight className="w-5 h-5 mr-0.5" /> : <ArrowUpRight className="w-5 h-5 mr-0.5" />}
            ₹{Math.abs(budgetDelta).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Simple Rationale Explanation Box */}
      <div className="p-5 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 border-2 border-brand-500/30 flex items-start gap-4">
        <div className="p-3 rounded-xl bg-brand-600 text-white shrink-0 shadow-md text-xl">
          💡
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-black text-brand-900 dark:text-cyan-200">
            {reasoningHeading}
          </h4>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 mt-1 font-medium leading-relaxed">
            "{reasoningDetails}"
          </p>
        </div>
      </div>

      {/* Itemized Category Changes Grid */}
      <div>
        <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Category Changes Breakdown
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoryDiffs.map(item => {
            let badgeColor = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
            let borderStyle = 'border-slate-200 dark:border-slate-800';

            if (item.status === 'PROTECTED') {
              badgeColor = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30';
              borderStyle = 'border-emerald-500/30';
            } else if (item.status === 'REDUCED') {
              badgeColor = 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30';
              borderStyle = 'border-rose-500/30';
            } else if (item.status === 'INCREASED') {
              badgeColor = 'bg-brand-500/10 text-brand-700 dark:text-cyan-400 border border-brand-500/30';
              borderStyle = 'border-brand-500/30';
            }

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 ${borderStyle} shadow-sm space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${badgeColor}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 line-through font-semibold">
                    ₹{item.prevAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="font-black text-slate-900 dark:text-slate-100">
                    ₹{item.currAmount.toLocaleString('en-IN')}
                  </span>
                  <span className={`font-bold ${item.diffAmount < 0 ? 'text-rose-500' : item.diffAmount > 0 ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {item.diffAmount > 0 ? `+₹${item.diffAmount.toLocaleString('en-IN')}` : item.diffAmount < 0 ? `-₹${Math.abs(item.diffAmount).toLocaleString('en-IN')}` : '0'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

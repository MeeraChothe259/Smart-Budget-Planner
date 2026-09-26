import React, { useState } from 'react';
import { Columns, ArrowRight } from 'lucide-react';
import { calculateAllocation } from '../engine/adaptiveEngine';

export default function PlanComparison({ activeMode, currentPlan, activePriority }) {
  const [budgetA, setBudgetA] = useState(20000);
  const [budgetB, setBudgetB] = useState(50000);

  const planA = calculateAllocation(activeMode, budgetA, activePriority);
  const planB = calculateAllocation(activeMode, budgetB, activePriority);

  if (!planA || !planB) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Columns className="w-5 h-5 text-brand-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            PLAN A VS PLAN B COMPARISON
          </h3>
        </div>

        {/* Inputs */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Plan A:</span>
            <input
              type="number"
              step="5000"
              value={budgetA}
              onChange={(e) => setBudgetA(Number(e.target.value))}
              className="w-24 px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-bold"
            />
          </div>

          <span className="font-black text-slate-400">VS</span>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Plan B:</span>
            <input
              type="number"
              step="5000"
              value={budgetB}
              onChange={(e) => setBudgetB(Number(e.target.value))}
              className="w-24 px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-extrabold text-[10px]">
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Plan A (₹{budgetA.toLocaleString('en-IN')})</th>
              <th className="py-2 px-3">Plan B (₹{budgetB.toLocaleString('en-IN')})</th>
              <th className="py-2 px-3">Delta Difference</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {planA.categories.map(catA => {
              const catB = planB.categories.find(c => c.id === catA.id);
              const amountB = catB ? catB.amount : 0;
              const diff = amountB - catA.amount;

              let statusText = 'UNCHANGED';
              let badgeStyle = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
              if (diff > 500) {
                statusText = 'INCREASED';
                badgeStyle = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
              } else if (diff < -500) {
                statusText = 'REDUCED';
                badgeStyle = 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
              } else if (catA.type === 'NEED') {
                statusText = 'PROTECTED';
                badgeStyle = 'bg-brand-500/10 text-brand-600 dark:text-cyan-400';
              }

              return (
                <tr key={catA.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{catA.icon}</span>
                    <span>{catA.name}</span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    ₹{catA.amount.toLocaleString('en-IN')} ({catA.percentage}%)
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    ₹{amountB.toLocaleString('en-IN')} ({catB?.percentage || 0}%)
                  </td>
                  <td className="py-2.5 px-3 font-bold">
                    {diff >= 0 ? `+₹${diff.toLocaleString('en-IN')}` : `-₹${Math.abs(diff).toLocaleString('en-IN')}`}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${badgeStyle}`}>
                      {statusText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

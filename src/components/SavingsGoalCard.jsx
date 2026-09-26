import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, Calendar, DollarSign } from 'lucide-react';

export default function SavingsGoalCard({ currentPlan }) {
  const [goalAmount, setGoalAmount] = useState(100000);
  const [months, setMonths] = useState(10);

  const reqMonthly = Math.round(goalAmount / Math.max(1, months));
  const currentReserve = currentPlan?.summary?.totalReserve || 0;
  const isTrack = currentReserve >= reqMonthly;
  const shortfall = Math.max(0, reqMonthly - currentReserve);

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              🎯 Savings Goal Tracker
            </h3>
          </div>
          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
            isTrack
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
          }`}>
            {isTrack ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            {isTrack ? 'ON TRACK' : 'NEEDS ADJUSTMENT'}
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Goal Target (INR)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-xs font-bold text-slate-400">₹</span>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value) || 0)}
                className="w-full pl-6 pr-2 py-1.5 text-xs font-extrabold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Target Duration (Months)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={months}
              onChange={(e) => setMonths(Math.max(1, Number(e.target.value) || 1))}
              className="w-full px-3 py-1.5 text-xs font-extrabold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Comparison Metrics */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Required Monthly Savings:</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              ₹{reqMonthly.toLocaleString('en-IN')}/mo
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Current Monthly Reserve:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{currentReserve.toLocaleString('en-IN')}/mo
            </span>
          </div>

          {!isTrack && (
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
              💡 Shortfall of ₹{shortfall.toLocaleString('en-IN')}/mo. Switch priority to "Save More" or trim flexible expenses to reach goal.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

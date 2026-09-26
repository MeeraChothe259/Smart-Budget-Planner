import React from 'react';
import { PieChart } from 'lucide-react';

export default function NeedsWantsCard({ summary }) {
  if (!summary) return null;

  const { totalNeeds, totalWants, totalReserve, needsPct, wantsPct, reservePct } = summary;

  return (
    <div className="glass-card rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-brand-500" />
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Where Is Money Going? 📊
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Money Division
          </span>
        </div>

        {/* Multi-Segment Stacked Progress Bar */}
        <div className="my-3">
          <div className="w-full h-5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-brand-500 transition-all duration-500 flex items-center justify-center text-xs text-white font-extrabold"
              style={{ width: `${needsPct}%` }}
              title={`Must-Haves: ${needsPct}%`}
            >
              {needsPct >= 15 && `${needsPct}%`}
            </div>
            <div
              className="h-full bg-amber-500 transition-all duration-500 flex items-center justify-center text-xs text-white font-extrabold"
              style={{ width: `${wantsPct}%` }}
              title={`Fun Stuff: ${wantsPct}%`}
            >
              {wantsPct >= 15 && `${wantsPct}%`}
            </div>
            <div
              className="h-full bg-emerald-500 transition-all duration-500 flex items-center justify-center text-xs text-white font-extrabold"
              style={{ width: `${reservePct}%` }}
              title={`Piggy Bank: ${reservePct}%`}
            >
              {reservePct >= 10 && `${reservePct}%`}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Component Cards */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        
        {/* Must-Haves */}
        <div className="p-3 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-center">
          <span className="text-xs font-black uppercase text-brand-700 dark:text-cyan-300 block">
            🏠 Must-Haves
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white block mt-0.5">
            {needsPct}%
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 block font-bold">
            ₹{totalNeeds.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Fun Stuff */}
        <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-center">
          <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-300 block">
            🛋️ Fun Stuff
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white block mt-0.5">
            {wantsPct}%
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 block font-bold">
            ₹{totalWants.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Piggy Bank */}
        <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-center">
          <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 block">
            🐷 Piggy Bank
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white block mt-0.5">
            {reservePct}%
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 block font-bold">
            ₹{totalReserve.toLocaleString('en-IN')}
          </span>
        </div>

      </div>

    </div>
  );
}

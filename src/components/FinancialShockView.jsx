import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Activity, Sparkles, CheckCircle2, TrendingDown } from 'lucide-react';
import { runStressTest } from '../engine/financialTwinEngine';

export default function FinancialShockView({ profile, privacyMode, formatCurrency }) {
  const [activeShock, setActiveShock] = useState('jobLoss'); // 'jobLoss' | 'medical' | 'salaryCut'

  const testResult = runStressTest(activeShock, profile);
  const totalReserve = profile.emergencyFund + profile.currentSavings;
  const survivalMonths = (totalReserve / Math.max(1000, profile.fixedExpenses)).toFixed(1);

  const shocks = [
    { id: 'jobLoss', name: '🚨 Total Job Loss (0 Income)', desc: 'Full income drop, relying solely on liquid emergency cash.' },
    { id: 'medical', name: '🩺 ₹1.5 Lakh Medical Emergency', desc: 'Instant lump-sum outflow for urgent health care.' },
    { id: 'salaryCut', name: '📉 30% Salary Reduction', desc: 'Pay cut reducing monthly disposable cushion.' }
  ];

  return (
    <div className="space-y-8 antialiased">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-rose-500/40 shadow-xl bg-[#090d16] text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase mb-1">
                CRISIS STRESS TEST
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                WHAT IF EVERYTHING GOES WRONG?
              </h2>
            </div>
          </div>

          <span className="text-xs font-extrabold text-rose-400">Emergency Financial Survival Meter</span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl">
          Simulate severe unexpected shocks — job loss, medical crises, or salary cuts — and test how many months your Financial Twin can survive on liquid reserves!
        </p>

        {/* SHOCK SCENARIO SELECTOR PIPELINE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {shocks.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveShock(s.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                activeShock === s.id
                  ? 'bg-rose-500 text-white border-rose-400 shadow-glow scale-105 font-black'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-rose-400 font-semibold'
              }`}
            >
              <h4 className="text-sm font-black mb-1">{s.name}</h4>
              <p className={`text-xs ${activeShock === s.id ? 'text-white/90' : 'text-slate-400'}`}>{s.desc}</p>
            </button>
          ))}
        </div>
      </div>


      {/* SURVIVAL RUNWAY DASHBOARD METER */}
      <div className="rounded-3xl p-6 sm:p-10 border-2 border-rose-500/30 space-y-8 bg-white dark:bg-slate-900/90 text-center shadow-md">
        
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Current Financial Twin Survival Runway
          </span>
          
          <div className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
            {testResult.survivalMonths}
          </div>

          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            Under <strong>"{testResult.shockTitle}"</strong>, your liquid safety net sustains your essential needs.
          </p>
        </div>

        {/* VISUAL RUNWAY METER BAR */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="flex justify-between text-xs font-black text-slate-500">
            <span>0 Months (Danger)</span>
            <span>3 Months (Target Safety)</span>
            <span>6+ Months (Robust Buffer)</span>
          </div>

          <div className="w-full h-5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-1 border border-slate-300 dark:border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                parseFloat(testResult.survivalMonths) < 2
                  ? 'bg-rose-500'
                  : parseFloat(testResult.survivalMonths) < 4
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (parseFloat(testResult.survivalMonths) / 6) * 100)}%` }}
            />
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Total Liquid Reserves</span>
            <div className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(totalReserve)}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Fixed Monthly Need</span>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400">{formatCurrency(profile.fixedExpenses)}/mo</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Shock Mitigation Tip</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{testResult.mitigationTip}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

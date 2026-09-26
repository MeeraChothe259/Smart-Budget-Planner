import React, { useState } from 'react';
import { runStressTest } from '../engine/financialTwinEngine';
import { Activity, ShieldCheck, AlertTriangle, RefreshCw, Zap, TrendingUp } from 'lucide-react';

export default function FinancialHealthView({ profile, privacyMode, formatCurrency }) {
  const [stressScenario, setStressScenario] = useState('jobLoss');

  const stressResult = runStressTest(stressScenario, profile);
  const survivalTimeMonths = (profile.emergencyFund / Math.max(1000, profile.fixedExpenses)).toFixed(1);

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-emerald-500/30 shadow-xl bg-gradient-to-r from-white via-emerald-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white font-black shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 text-xs font-black uppercase mb-1">
              COMMAND CENTER & STRESS TEST
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              FINANCIAL HEALTH & SHOCK SIMULATOR
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Comprehensive financial risk command center. Test your resilience against unexpected emergencies and job shocks!
        </p>
      </div>

      {/* EMERGENCY SURVIVAL METER */}
      <div className="glass-card rounded-3xl p-8 border-2 border-brand-500/40 shadow-2xl bg-gradient-to-r from-brand-600/10 via-cyan-500/10 to-violet-600/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-cyan-300">EMERGENCY SURVIVAL METER</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-brand-500" />
              HOW LONG CAN YOU SURVIVE?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Calculated based on your ₹{profile.emergencyFund.toLocaleString('en-IN')} emergency reserve vs ₹{profile.fixedExpenses.toLocaleString('en-IN')} essential monthly needs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-brand-500 shadow-lg text-center shrink-0">
            <span className="text-xs font-black text-slate-400 uppercase">SURVIVAL RUNWAY</span>
            <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-cyan-400">
              {survivalTimeMonths} MONTHS
            </div>
          </div>
        </div>
      </div>

      {/* FINANCIAL STRESS TEST / SHOCK SIMULATOR */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 bg-white dark:bg-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Financial Shock Simulator</span>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Simulate unexpected financial crises</p>
          </div>

          {/* Scenario Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStressScenario('jobLoss')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                stressScenario === 'jobLoss'
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Job Loss (3 Mo)
            </button>
            <button
              onClick={() => setStressScenario('salaryCut')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                stressScenario === 'salaryCut'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              30% Salary Cut
            </button>
            <button
              onClick={() => setStressScenario('medical')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                stressScenario === 'medical'
                  ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Medical Crisis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-black uppercase text-slate-400">Simulated Shock</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stressResult.shockTitle}
            </div>
            <div className="text-sm font-bold text-rose-500 pt-1">
              Survival Runway: <strong>{stressResult.survivalMonths}</strong>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-brand-500/10 border-2 border-brand-500/30 space-y-2">
            <span className="text-xs font-black uppercase text-brand-700 dark:text-cyan-300">AI Mitigation Recommendation</span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
              "{stressResult.mitigationTip}"
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

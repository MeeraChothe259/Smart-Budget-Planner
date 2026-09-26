import React, { useState } from 'react';
import { simulateDecision } from '../engine/financialTwinEngine';
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle, RefreshCw, CheckCircle2, FlaskConical } from 'lucide-react';

export default function WhatIfLabView({ profile, initialItem, initialPrice, privacyMode, formatCurrency }) {
  const [itemName, setItemName] = useState(initialItem || 'iPhone 15 Pro');
  const [price, setPrice] = useState(initialPrice || 80000);

  const sim = simulateDecision(profile, itemName, price);

  const presets = [
    { name: 'iPhone 15 Pro', price: 80000 },
    { name: 'Goa Beach Vacation', price: 35000 },
    { name: 'Designer Apparel', price: 15000 },
    { name: 'M3 MacBook Pro', price: 140000 },
    { name: 'Used Two-Wheeler', price: 45000 }
  ];

  return (
    <div className="space-y-8 antialiased">
      
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-gradient-to-r from-white via-brand-50/30 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-brand-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300 text-xs font-black uppercase mb-1">
              MAIN USP SIMULATOR
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              WHAT-IF LAB
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Test any purchase or life choice. See exact before/after financial consequences before spending!
        </p>
      </div>


      {/* Decision Input & Presets */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500">Item / Purchase Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-3 text-base font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase text-slate-500">Cost Amount</label>
              <span className="text-xl font-black text-brand-600 dark:text-cyan-400">{formatCurrency(price)}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="250000"
              step="2000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0">Quick Scenarios:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setItemName(p.name);
                setPrice(p.price);
              }}
              className={`px-3.5 py-1.5 text-xs font-extrabold rounded-full border-2 transition-all shrink-0 ${
                itemName === p.name && price === p.price
                  ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
              }`}
            >
              {p.name} ({formatCurrency(p.price)})
            </button>
          ))}
        </div>

      </div>

      {/* BEFORE vs AFTER VISUAL STORYTELLING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CURRENT STATE */}
        <div className="glass-card rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">
              Current Financial State
            </h3>
            <span className="text-xs font-bold text-slate-400">BEFORE PURCHASE</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Savings Balance</span>
                <span className="text-slate-900 dark:text-white">{formatCurrency(sim.currentSavings)}</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Emergency Fund</span>
                <span className="text-emerald-500">{formatCurrency(sim.currentEmergencyFund)}</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>
            </div>

            <div className="pt-2 text-xs font-bold text-slate-500">
              Primary Goal Target Date: <span className="text-slate-900 dark:text-white">December 2026</span>
            </div>
          </div>
        </div>

        {/* SIMULATED AFTER STATE */}
        <div className="glass-card rounded-3xl p-6 border-2 border-brand-500/40 space-y-4 bg-gradient-to-br from-brand-500/10 via-cyan-500/5 to-transparent">
          <div className="flex justify-between items-center border-b border-brand-500/30 pb-3">
            <h3 className="text-lg font-black text-brand-600 dark:text-cyan-300 uppercase flex items-center gap-2">
              <span>After Purchase</span>
              <Sparkles className="w-4 h-4 text-brand-500" />
            </h3>
            <span className="text-xs font-bold text-brand-600 dark:text-cyan-400">AFTER PURCHASE</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>New Savings Balance</span>
                <span className="text-brand-600 dark:text-cyan-300 font-extrabold">{formatCurrency(sim.newSavings)}</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((sim.newSavings / (sim.currentSavings || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>New Emergency Fund</span>
                <span className="text-emerald-500 font-extrabold">{formatCurrency(sim.newEmergencyFund)}</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((sim.newEmergencyFund / (sim.currentEmergencyFund || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 text-xs font-bold text-rose-500 flex items-center gap-1">
              <span>Goal Delayed:</span>
              <span className="font-extrabold text-sm">+{sim.goalDelayDays} Days</span>
            </div>
          </div>
        </div>

      </div>

      {/* METRICS METERS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1">
          <span className="text-xs font-extrabold text-slate-400 uppercase">Recovery Time</span>
          <div className="text-3xl font-black text-brand-600 dark:text-cyan-400">
            {sim.recoveryMonths} Months
          </div>
          <p className="text-xs text-slate-500 font-medium">To rebuild spent savings</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1">
          <span className="text-xs font-extrabold text-slate-400 uppercase">Financial Risk</span>
          <div className={`text-3xl font-black ${sim.riskScore >= 65 ? 'text-rose-500' : sim.riskScore >= 40 ? 'text-amber-500' : 'text-emerald-500'}`}>
            {sim.riskScore} / 100
          </div>
          <p className="text-xs text-slate-500 font-medium">Financial strain score</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1">
          <span className="text-xs font-extrabold text-slate-400 uppercase">5-Yr Opportunity Cost</span>
          <div className="text-3xl font-black text-violet-500">
            {formatCurrency(sim.opportunityCost.sip5Yr)}
          </div>
          <p className="text-xs text-slate-500 font-medium">Lost compounding in SIP</p>
        </div>

      </div>

      {/* AI RECOMMENDATION & ALTERNATIVE */}
      <div className="p-6 rounded-3xl bg-brand-500/10 border-2 border-brand-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <h4 className="text-base font-black text-brand-900 dark:text-cyan-200 uppercase">
            AI Financial Twin Verdict
          </h4>
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
          "{sim.recommendation}"
        </p>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <strong>Suggested Action:</strong> {sim.alternative}
        </div>
      </div>

    </div>
  );
}

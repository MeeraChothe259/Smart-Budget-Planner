import React, { useState } from 'react';
import { simulateDecision } from '../engine/financialTwinEngine';
import { Check, X, ArrowLeftRight, Sparkles, Scale } from 'lucide-react';

export default function WhatIfIDontView({ profile, privacyMode, formatCurrency }) {
  const [itemName, setItemName] = useState('₹75,000 Smartphone');
  const [itemCost, setItemCost] = useState(75000);

  const sim = simulateDecision(profile, itemName, itemCost);

  const metrics = [
    {
      label: 'Liquid Savings',
      buyValue: formatCurrency(sim.newSavings),
      dontBuyValue: formatCurrency(profile.currentSavings),
      buyHighlight: 'rose',
      dontBuyHighlight: 'emerald'
    },
    {
      label: 'Emergency Reserve',
      buyValue: `${(sim.newEmergencyFund / profile.fixedExpenses).toFixed(1)} Months`,
      dontBuyValue: `${(profile.emergencyFund / profile.fixedExpenses).toFixed(1)} Months`,
      buyHighlight: 'amber',
      dontBuyHighlight: 'emerald'
    },
    {
      label: 'Travel Goal Schedule',
      buyValue: `Delayed by +${sim.goalDelayDays} Days`,
      dontBuyValue: 'On Schedule (Dec 2026)',
      buyHighlight: 'rose',
      dontBuyHighlight: 'emerald'
    },
    {
      label: '1-Year Savings Trajectory',
      buyValue: formatCurrency((profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses) * 12 - itemCost),
      dontBuyValue: formatCurrency((profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses) * 12),
      buyHighlight: 'amber',
      dontBuyHighlight: 'emerald'
    },
    {
      label: '5-Year SIP Opportunity Cost',
      buyValue: `- ${formatCurrency(sim.opportunityCost.sip5Yr)} Gains Lost`,
      dontBuyValue: `+ ${formatCurrency(sim.opportunityCost.sip5Yr)} Potential Growth`,
      buyHighlight: 'rose',
      dontBuyHighlight: 'emerald'
    },
    {
      label: 'Immediate Satisfaction',
      buyValue: 'High (Instant Utility)',
      dontBuyValue: 'None (Delayed Gratification)',
      buyHighlight: 'emerald',
      dontBuyHighlight: 'slate'
    }
  ];

  return (
    <div className="space-y-8 antialiased">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-[#090d16] text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-xs font-black uppercase mb-1">
                SIDE-BY-SIDE EVALUATOR
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                WHAT IF I DON'T?
              </h2>
            </div>
          </div>

          <span className="text-xs font-extrabold text-slate-300">Objective Decision Consequence Matrix</span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl">
          We don't shame you or tell you "You can't afford this". We present the exact trade-offs of <strong className="text-brand-400">Buying</strong> versus <strong className="text-cyan-300">Not Buying</strong> side-by-side so you decide with total clarity!
        </p>

        {/* INPUT FORM */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-slate-300">Purchase Item</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-3 py-2 bg-[#060911] border border-slate-700 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black text-slate-300 uppercase">
              <span>Item Cost</span>
              <span className="text-cyan-300 font-black">{formatCurrency(itemCost)}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={itemCost}
              onChange={(e) => setItemCost(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>


      {/* SIDE-BY-SIDE COMPARISON TABLE */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-900/90 shadow-md">
        
        <div className="grid grid-cols-12 gap-4 text-center font-black text-sm uppercase pb-4 border-b-2 border-slate-100 dark:border-slate-800">
          <div className="col-span-4 text-left text-slate-400">Metric</div>
          <div className="col-span-4 p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
            BUY IT NOW ({formatCurrency(itemCost)})
          </div>
          <div className="col-span-4 p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            DON'T BUY (KEEP CASH)
          </div>
        </div>

        <div className="space-y-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-4 items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
            >
              <div className="col-span-4 font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                {m.label}
              </div>

              <div className="col-span-4 text-center font-extrabold text-xs sm:text-sm text-rose-600 dark:text-rose-400">
                {m.buyValue}
              </div>

              <div className="col-span-4 text-center font-extrabold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                {m.dontBuyValue}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          💡 <strong>Financial Twin Philosophy:</strong> Neither choice is right or wrong. If the item brings high daily value or career productivity, buying may be worth delaying your travel goal by {sim.goalDelayDays} days!
        </div>

      </div>

    </div>
  );
}

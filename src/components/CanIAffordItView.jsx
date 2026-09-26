import React, { useState } from 'react';
import { evaluateAffordability } from '../engine/financialTwinEngine';
import { CreditCard, Sparkles, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CanIAffordItView({ profile, privacyMode, formatCurrency }) {
  const [itemName, setItemName] = useState('Designer Sneakers');
  const [itemPrice, setItemPrice] = useState(6500);

  const evalResult = evaluateAffordability(profile, itemName, itemPrice);

  const sampleItems = [
    { name: '₹3,999 Shoes', item: 'Branded Shoes', price: 3999 },
    { name: '₹80,000 iPhone 15', item: 'iPhone 15', price: 80000 },
    { name: '₹20,000 Weekend Trip', item: 'Weekend Trip', price: 20000 },
    { name: '₹7,000 Fine Dining', item: 'Fine Dinner', price: 7000 }
  ];

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-gradient-to-r from-white via-brand-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-emerald-500 flex items-center justify-center text-white font-black shadow-md">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300 text-xs font-black uppercase mb-1">
              DECISION & REGRET EVALUATOR
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              "CAN I AFFORD THIS?" ENGINE
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Enter any item or expense. Financial Twin evaluates immediate savings impact, goal delay, and potential AI regret risk score!
        </p>
      </div>

      {/* Item Input Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500">What are you thinking of buying?</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-3 text-base font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase text-slate-500">Price Amount</label>
              <span className="text-xl font-black text-brand-600 dark:text-cyan-400">{formatCurrency(itemPrice)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="150000"
              step="1000"
              value={itemPrice}
              onChange={(e) => setItemPrice(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>
        </div>

        {/* Quick Sample Items */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0">Try item:</span>
          {sampleItems.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setItemName(s.item);
                setItemPrice(s.price);
              }}
              className="px-3.5 py-1.5 text-xs font-extrabold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-brand-500 hover:text-white border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* AFFORDABILITY ANALYSIS RESULT PANEL */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 bg-white dark:bg-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Evaluation Result</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Affordability Analysis: {evalResult.itemName}
            </h3>
          </div>

          <span className={`px-4 py-2 rounded-2xl text-sm font-black border-2 ${
            evalResult.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' :
            evalResult.statusColor === 'rose' ? 'bg-rose-500/10 text-rose-600 border-rose-500/30' :
            'bg-amber-500/10 text-amber-600 border-amber-500/30'
          }`}>
            {evalResult.status}
          </span>
        </div>

        {/* REGRET RISK METER & GOAL DELAY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Purchase Price</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {formatCurrency(evalResult.price)}
            </div>
            <p className="text-xs text-slate-500 font-medium">Immediate cash outflow</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Goal Target Delay</span>
            <div className="text-3xl font-black text-rose-500">
              +{evalResult.daysDelayed} Days
            </div>
            <p className="text-xs text-slate-500 font-medium">Delay on primary savings goal</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-brand-950 text-white border-2 border-brand-500/40 text-center space-y-1 shadow-lg">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">Regret Risk Score</span>
            <div className={`text-4xl font-black ${evalResult.regretRisk >= 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {evalResult.regretRisk}%
            </div>
            <p className="text-xs text-slate-300 font-medium">AI estimated regret probability</p>
          </div>

        </div>

        {/* WHY REGRET WAS FLAGGED */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase tracking-wider text-slate-400">
            Why We Detected This Score:
          </h4>
          <div className="space-y-2">
            {evalResult.reasons.map((r, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI ADVICE */}
        <div className="p-5 rounded-2xl bg-brand-500/10 border-2 border-brand-500/30 space-y-2">
          <span className="text-xs font-black uppercase text-brand-700 dark:text-cyan-300">Smart Twin Advice</span>
          <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
            "{evalResult.advice}"
          </p>
        </div>

      </div>

    </div>
  );
}

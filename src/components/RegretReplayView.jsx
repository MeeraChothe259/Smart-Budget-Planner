import React, { useState } from 'react';
import { Sparkles, Play, RotateCcw, ShieldCheck, AlertCircle, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { evaluateAffordability, simulateDecision } from '../engine/financialTwinEngine';

export default function RegretReplayView({ profile, privacyMode, formatCurrency }) {
  const [purchaseName, setPurchaseName] = useState('Luxury Designer Jacket');
  const [price, setPrice] = useState(18000);
  const [activeReplayOption, setActiveReplayOption] = useState('BUY'); // 'BUY' | 'WAIT' | 'SKIP'

  const evalResult = evaluateAffordability(profile, purchaseName, price);
  const simBuy = simulateDecision(profile, purchaseName, price);

  return (
    <div className="space-y-8 antialiased">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-[#090d16] text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-rose-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
              🔮
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-xs font-black uppercase mb-1">
                BEHAVIORAL SIMULATOR
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                REGRET REPLAY
              </h2>
            </div>
          </div>

          <span className="text-xs font-extrabold text-violet-300">Impulse & Pattern Predictor</span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl">
          Based on your spending history, we detect patterns of discretionary purchases and let you replay three alternative futures: <strong className="text-rose-400">Buy</strong>, <strong className="text-amber-300">Wait</strong>, or <strong className="text-emerald-400">Skip</strong>!
        </p>

        {/* INPUT FORM */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-slate-300">Purchase under Consideration</label>
            <input
              type="text"
              value={purchaseName}
              onChange={(e) => setPurchaseName(e.target.value)}
              className="w-full px-3 py-2 bg-[#060911] border border-slate-700 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-violet-400"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black text-slate-300 uppercase">
              <span>Price</span>
              <span className="text-violet-300 font-black">{formatCurrency(price)}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="100000"
              step="2000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-400"
            />
          </div>
        </div>
      </div>


      {/* HISTORICAL PATTERN DETECTION ALERT */}
      <div className="p-6 rounded-3xl bg-violet-500/10 border-2 border-violet-500/30 flex items-start gap-4">
        <AlertCircle className="w-7 h-7 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-base font-black text-slate-900 dark:text-white uppercase">Historical Spending Pattern Trigger</h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            "You have made <strong>3 similar discretionary purchases</strong> over ₹2,500 recently. Our Regret Risk predictor evaluates a <strong>{evalResult.regretRisk}% Regret Probability</strong> if bought immediately without cooling off."
          </p>
        </div>
      </div>


      {/* THE 3 REPLAY CHOICE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* OPTION 1: BUY */}
        <div
          onClick={() => setActiveReplayOption('BUY')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
            activeReplayOption === 'BUY'
              ? 'bg-rose-500/10 border-rose-500 shadow-lg scale-105'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl">🛍️</span>
            <span className="px-3 py-1 rounded-full bg-rose-500 text-white font-black text-xs uppercase">
              FUTURE A: BUY NOW
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Buy Today</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-4">Immediate gratification, cash leaves savings today.</p>

          <div className="space-y-2 text-xs font-extrabold border-t border-slate-200 dark:border-slate-700 pt-3">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Savings Impact</span>
              <span className="text-rose-600 dark:text-rose-400">- {formatCurrency(price)}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Goal Delay</span>
              <span className="text-rose-600 dark:text-rose-400">+{simBuy.goalDelayDays} Days</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Regret Risk</span>
              <span className="text-rose-600 dark:text-rose-400">{evalResult.regretRisk}%</span>
            </div>
          </div>
        </div>

        {/* OPTION 2: WAIT */}
        <div
          onClick={() => setActiveReplayOption('WAIT')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
            activeReplayOption === 'WAIT'
              ? 'bg-amber-500/10 border-amber-500 shadow-lg scale-105'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl">⏳</span>
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-xs uppercase">
              FUTURE B: WAIT 14 DAYS
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Wait 14-Day Cooling Off</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-4">Test whether purchase urge passes naturally.</p>

          <div className="space-y-2 text-xs font-extrabold border-t border-slate-200 dark:border-slate-700 pt-3">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Impulse Drop</span>
              <span className="text-amber-600 dark:text-amber-400">70% Drop in Regret</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Immediate Cash Saved</span>
              <span className="text-amber-600 dark:text-amber-400">{formatCurrency(price)}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Goal Impact</span>
              <span className="text-emerald-600 dark:text-emerald-400">Unchanged</span>
            </div>
          </div>
        </div>

        {/* OPTION 3: SKIP */}
        <div
          onClick={() => setActiveReplayOption('SKIP')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
            activeReplayOption === 'SKIP'
              ? 'bg-emerald-500/10 border-emerald-500 shadow-lg scale-105'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl">📈</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs uppercase">
              FUTURE C: SKIP & INVEST
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Skip & Put in SIP</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-4">Redirect price straight into compounding wealth.</p>

          <div className="space-y-2 text-xs font-extrabold border-t border-slate-200 dark:border-slate-700 pt-3">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>5-Year Value</span>
              <span className="text-emerald-600 dark:text-emerald-400">{formatCurrency(price * Math.pow(1.12, 5))}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Goal Acceleration</span>
              <span className="text-emerald-600 dark:text-emerald-400">Faster Goal Target</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Regret Risk</span>
              <span className="text-emerald-600 dark:text-emerald-400">0%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

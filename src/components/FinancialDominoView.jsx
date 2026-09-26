import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Layers, AlertTriangle, ShieldCheck, Play, RotateCcw, ChevronRight } from 'lucide-react';
import { simulateDecision } from '../engine/financialTwinEngine';

export default function FinancialDominoView({ profile, privacyMode, formatCurrency }) {
  const [purchaseAmount, setPurchaseAmount] = useState(60000);
  const [purchaseName, setPurchaseName] = useState('₹60,000 Tech Upgrade');
  const [dominoStep, setDominoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const sim = simulateDecision(profile, purchaseName, purchaseAmount);

  // Domino chain items
  const dominos = [
    {
      step: 1,
      title: "1. Purchase Made",
      icon: "💳",
      desc: `${purchaseName} executed`,
      detail: `Outflow of ${formatCurrency(purchaseAmount)} from liquid accounts.`
    },
    {
      step: 2,
      title: "2. Savings Decrease",
      icon: "📉",
      desc: "Liquid reserves shrink",
      detail: `Savings fall from ${formatCurrency(profile.currentSavings)} to ${formatCurrency(sim.newSavings)}.`
    },
    {
      step: 3,
      title: "3. Emergency Buffer Drops",
      icon: "🛡️",
      desc: "Crisis survival buffer reduced",
      detail: `Runway drops to ${(sim.newEmergencyFund / profile.fixedExpenses).toFixed(1)} months of essential safety.`
    },
    {
      step: 4,
      title: "4. Monthly Cash Flow Tightens",
      icon: "⏳",
      desc: "Cushion for unexpected bills tightens",
      detail: `Takes ${sim.recoveryMonths} months of zero discretionary spending to rebuild.`
    },
    {
      step: 5,
      title: "5. Primary Goal Delayed",
      icon: "🏖️",
      desc: "Travel / House goal target pushed back",
      detail: `Europe Vacation target date delayed by +${sim.goalDelayDays} days.`
    },
    {
      step: 6,
      title: "6. Lost Compounding Returns",
      icon: "📈",
      desc: "5-Year opportunity cost lost",
      detail: `Forfeited ${formatCurrency(sim.opportunityCost.sip5Yr)} in potential mutual fund gains.`
    },
    {
      step: 7,
      title: "7. Projected 5-Yr Net Worth Shift",
      icon: "🌌",
      desc: "Long-term future wealth trajectory shifts",
      detail: `Total 5-year wealth accumulation trajectory shifts downward.`
    }
  ];

  // Auto-play domino animation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (dominoStep < dominos.length) {
        timer = setTimeout(() => {
          setDominoStep(prev => prev + 1);
        }, 600);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, dominoStep]);

  const handleStartDomino = () => {
    setDominoStep(1);
    setIsPlaying(true);
  };

  const handleResetDomino = () => {
    setIsPlaying(false);
    setDominoStep(0);
  };

  return (
    <div className="space-y-8 antialiased">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-[#090d16] text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
              🁢
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase mb-1">
                SIGNATURE VISUALIZATION
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                FINANCIAL DOMINO EFFECT
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartDomino}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>TRIGGER DOMINO CHAIN</span>
            </button>

            <button
              onClick={handleResetDomino}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors"
              title="Reset Domino Chain"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl">
          One single financial decision triggers a cascading chain of consequences across your financial safety, goals, compounding investments, and future net worth!
        </p>

        {/* INPUT SELECTOR */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-slate-300">Trigger Event Amount</label>
            <div className="text-2xl font-black text-amber-300">{formatCurrency(purchaseAmount)}</div>
          </div>

          <input
            type="range"
            min="10000"
            max="200000"
            step="10000"
            value={purchaseAmount}
            onChange={(e) => {
              setPurchaseAmount(Number(e.target.value));
              setDominoStep(0);
            }}
            className="w-full sm:w-64 h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>


      {/* VISUAL ANIMATED DOMINO CHAIN */}
      <div className="rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 space-y-8 bg-white dark:bg-slate-900/90 shadow-md">
        
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Cascading Consequence Chain
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
            Step {dominoStep} of {dominos.length} Triggered
          </p>
        </div>

        {/* DOMINO CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dominos.map((item) => {
            const isFallen = dominoStep >= item.step;
            const isCurrent = dominoStep === item.step;
            return (
              <div
                key={item.step}
                className={`p-5 rounded-2xl border-2 transition-all duration-500 transform ${
                  isFallen
                    ? 'bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-amber-50 dark:from-amber-950/40 dark:via-rose-950/40 dark:to-slate-900 border-rose-400 dark:border-rose-600 shadow-md scale-100 rotate-1'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-60 scale-95'
                } ${isCurrent ? 'ring-4 ring-amber-400/50 shadow-glow animate-pulse' : ''}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isFallen ? 'bg-rose-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    {isFallen ? 'TRIGGERED' : 'WAITING'}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h4>

                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  {item.desc}
                </p>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY VERDICT */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center gap-4">
          <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
          <div>
            <h4 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase">Domino Effect Lesson</h4>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold">
              A single discretionary impulse spend doesn't just reduce your bank balance today — it ripples across your emergency safety net, delays your major life goals, and reduces your 5-year compounding wealth potential!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

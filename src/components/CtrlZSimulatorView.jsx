import React, { useState } from 'react';
import { simulateDecision } from '../engine/financialTwinEngine';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Zap,
  History,
  TrendingDown,
  TrendingUp,
  Layers,
  ArrowLeftRight,
  Play
} from 'lucide-react';

export default function CtrlZSimulatorView({ profile, privacyMode, formatCurrency }) {
  const [decisionText, setDecisionText] = useState('Buy a ₹60,000 laptop');
  const [amount, setAmount] = useState(60000);
  
  // Decision Stack History for Ctrl+Z undo feature
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [isUndoing, setIsUndoing] = useState(false);
  const [activeFutureTab, setActiveFutureTab] = useState('buy'); // 'buy' | 'invest' | 'wait'

  // Current simulation based on active input
  const currentSim = simulateDecision(profile, decisionText, amount);

  // Add decision to history stack
  const handleApplyDecision = () => {
    const newEntry = {
      id: Date.now(),
      text: decisionText,
      cost: amount,
      simResult: currentSim
    };
    setDecisionHistory([newEntry, ...decisionHistory]);
  };

  // UNDO LAST DECISION (Ctrl+Z)
  const handleUndoLast = () => {
    setIsUndoing(true);
    setTimeout(() => {
      setDecisionHistory(prev => prev.slice(1));
      setIsUndoing(false);
    }, 350);
  };

  // RESET ALL DECISIONS
  const handleResetAll = () => {
    setIsUndoing(true);
    setTimeout(() => {
      setDecisionHistory([]);
      setDecisionText('Buy a ₹60,000 laptop');
      setAmount(60000);
      setIsUndoing(false);
    }, 350);
  };

  // Predefined prompt triggers
  const promptTriggers = [
    { label: 'Buy a ₹60,000 laptop', cost: 60000 },
    { label: 'Buy a ₹90,000 phone', cost: 90000 },
    { label: 'Go on a ₹40,000 vacation', cost: 40000 },
    { label: 'Move to Pune', cost: 25000 },
    { label: 'Start investing ₹5,000/month', cost: 5000 }
  ];

  return (
    <div className="space-y-8 antialiased">
      
      {/* USP HERO BANNER - ALWAYS RICH DARK BLUE WITH WHITE TEXT */}
      <div className="rounded-3xl p-6 sm:p-10 border-2 border-brand-500/40 shadow-2xl bg-[#090d16] text-white relative overflow-hidden space-y-6">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-violet-600 flex items-center justify-center text-white font-black shadow-glow shrink-0">
              <Zap className="w-7 h-7 animate-pulse text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black uppercase mb-1">
                CORE USP FEATURE
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                ⚡ FINANCIAL CTRL+Z
              </h2>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400">Revolutionary Simulator</span>
            <p className="text-xs text-slate-300 font-bold">Your money has no Ctrl+Z. Your Financial Twin does.</p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-200 font-bold max-w-3xl leading-relaxed relative z-10">
          Simulate any spending or life decision, watch its future impact unfold, then <strong className="text-cyan-300">UNDO it</strong> and replay an alternative future before making the real-world decision!
        </p>

        {/* INPUT FORM: SIMULATE ANY DECISION */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 space-y-4 relative z-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-black text-slate-300 uppercase tracking-wider">What financial decision do you want to test?</label>
              <input
                type="text"
                value={decisionText}
                onChange={(e) => setDecisionText(e.target.value)}
                placeholder="e.g. Buy a ₹60,000 laptop"
                className="w-full px-4 py-3 bg-[#060911] border-2 border-slate-700 rounded-xl text-white font-bold text-base focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <div className="flex justify-between text-xs font-black text-slate-300 uppercase tracking-wider">
                <span>Amount</span>
                <span className="text-cyan-300 font-black">{formatCurrency(amount)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="md:col-span-2 pt-5">
              <button
                onClick={handleApplyDecision}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-glow transition-all flex items-center justify-center gap-1.5"
              >
                <span>SIMULATE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Triggers */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-xs font-bold text-slate-400">Quick Decisions:</span>
            {promptTriggers.map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDecisionText(t.label);
                  setAmount(t.cost);
                }}
                className="px-3 py-1 rounded-lg bg-[#060911] text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-400 text-xs font-semibold transition-all"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* BEFORE vs AFTER BUYING COMPARISON BOARD */}
      <div className={`transition-all duration-300 ${isUndoing ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
        
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
          <span>REAL-TIME BEFORE VS. AFTER CONSEQUENCE ANALYSIS</span>
          <span className="text-brand-600 dark:text-cyan-400 font-black">Active Decision: "{decisionText}"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BEFORE CARD */}
          <div className="rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-900/90 shadow-md">
            <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Baseline State</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">BEFORE DECISION</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-extrabold border border-slate-200 dark:border-slate-700">
                Current Me
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Liquid Savings</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(profile.currentSavings)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Emergency Fund Runway</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{(profile.emergencyFund / profile.fixedExpenses).toFixed(1)} Months</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Travel Goal (Europe)</span>
                <span className="text-base font-black text-slate-900 dark:text-white">On Target (10 Months)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Financial Risk Score</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">Low Strain (20/100)</span>
              </div>
            </div>
          </div>

          {/* AFTER BUYING CARD */}
          <div className="rounded-3xl p-6 sm:p-8 border-2 border-rose-400 dark:border-rose-800/60 space-y-6 bg-gradient-to-br from-rose-50/80 via-white to-brand-50/40 dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-900 shadow-lg">
            <div className="flex justify-between items-center border-b-2 border-rose-200 dark:border-rose-900/50 pb-4">
              <div>
                <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">Simulated Future</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>AFTER BUYING</span>
                  <TrendingDown className="w-5 h-5 text-rose-500" />
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-black border border-rose-500/30">
                Altered Timeline
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/40 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Remaining Savings</span>
                <span className="text-xl font-black text-rose-600 dark:text-rose-400">{formatCurrency(currentSim.newSavings)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/40 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Emergency Fund Runway</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                  {(currentSim.newEmergencyFund / profile.fixedExpenses).toFixed(1)} Months
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/40 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Travel Goal Delay</span>
                <span className="text-base font-black text-rose-600 dark:text-rose-400">Pushed +{currentSim.goalDelayDays} Days</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/40 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Financial Risk Score</span>
                <span className={`text-base font-black ${currentSim.riskScore >= 60 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {currentSim.riskScore} / 100 ({currentSim.riskScore >= 60 ? 'High Risk' : 'Moderate Strain'})
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* THE HUGE UNDO & ALTERNATIVE FUTURE CONTROL BAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white shadow-glow space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* UNDO BUTTON */}
          <button
            onClick={handleUndoLast}
            className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-lg sm:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group shrink-0"
          >
            <RotateCcw className="w-6 h-6 text-brand-600 group-hover:-rotate-90 transition-transform" />
            <span>↩ UNDO DECISION</span>
          </button>

          {/* TRY ANOTHER FUTURE OPTIONS */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-brand-100 shrink-0">OR REPLAY ALTERNATIVE:</span>
            
            <div className="w-full grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveFutureTab('invest')}
                className={`py-3 px-4 rounded-xl text-xs font-black transition-all border ${
                  activeFutureTab === 'invest'
                    ? 'bg-white text-brand-700 border-white shadow-md'
                    : 'bg-white/15 text-white hover:bg-white/25 border-white/20'
                }`}
              >
                🔄 What if I Invest ₹{amount.toLocaleString('en-IN')}?
              </button>

              <button
                onClick={() => setActiveFutureTab('wait')}
                className={`py-3 px-4 rounded-xl text-xs font-black transition-all border ${
                  activeFutureTab === 'wait'
                    ? 'bg-white text-brand-700 border-white shadow-md'
                    : 'bg-white/15 text-white hover:bg-white/25 border-white/20'
                }`}
              >
                🔄 Wait 6 Months & Save
              </button>
            </div>
          </div>

        </div>

        {/* ALTERNATIVE FUTURE DETAILS PANEL */}
        {activeFutureTab !== 'buy' && (
          <div className="p-5 rounded-2xl bg-black/25 border border-white/30 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
                Alternative Timeline Result ({activeFutureTab === 'invest' ? 'Invest in SIP' : 'Wait 6 Months'})
              </span>
              <button
                onClick={() => setActiveFutureTab('buy')}
                className="text-xs text-white/90 hover:text-white font-bold underline"
              >
                Close Alternative
              </button>
            </div>

            {activeFutureTab === 'invest' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-100 text-xs sm:text-sm font-bold">
                <div className="p-3 rounded-xl bg-white/15">
                  <span className="block text-[10px] uppercase text-white/80">5-Year Projected Value</span>
                  <span className="text-lg font-black text-emerald-300">{formatCurrency(amount * Math.pow(1.12, 5))}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/15">
                  <span className="block text-[10px] uppercase text-white/80">Emergency Fund</span>
                  <span className="text-lg font-black text-white">Maintained 100% Intact</span>
                </div>
                <div className="p-3 rounded-xl bg-white/15">
                  <span className="block text-[10px] uppercase text-white/80">Goal Delay</span>
                  <span className="text-lg font-black text-emerald-300">0 Days (On Schedule)</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-100 text-xs sm:text-sm font-bold">
                <div className="p-3 rounded-xl bg-white/15">
                  <span className="block text-[10px] uppercase text-white/80">Monthly Savings Contribution</span>
                  <span className="text-lg font-black text-white">{formatCurrency(Math.round(amount/6))}/mo</span>
                </div>
                <div className="p-3 rounded-xl bg-white/15">
                  <span className="block text-[10px] uppercase text-white/80">Discretionary Discount</span>
                  <span className="text-lg font-black text-emerald-300">Save 20-30% on Sale</span>
                </div>
                <div className="p-3 rounded-xl bg-white/15">
                  <span className="block text-[10px] uppercase text-white/80">Regret Score</span>
                  <span className="text-lg font-black text-emerald-300">Very Low (&lt;15%)</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>


      {/* DECISION HISTORY STACK & ENTIRE LIFE REWIND */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-900/90 shadow-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-cyan-400 flex items-center justify-center font-black">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">DECISION HISTORY STACK</h3>
              <p className="text-xs text-slate-500 font-medium">Stack decisions over time and rewind your entire life trajectory</p>
            </div>
          </div>

          {decisionHistory.length > 0 && (
            <button
              onClick={handleResetAll}
              className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white text-xs font-black transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>↩ RESET TO ORIGINAL LIFE</span>
            </button>
          )}
        </div>

        {decisionHistory.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-extrabold text-slate-600 dark:text-slate-400">No decisions stacked yet.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Type a decision above and click "Simulate" to add decisions to your life timeline stack.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {decisionHistory.map((dec, idx) => (
              <div
                key={dec.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-500/10 text-brand-600 font-black text-xs flex items-center justify-center">
                    #{decisionHistory.length - idx}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{dec.text}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Cost: {formatCurrency(dec.cost)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">Goal Delay: +{dec.simResult.goalDelayDays} Days</span>
                  <button
                    onClick={handleUndoLast}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-500 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-600"
                    title="Undo this specific decision"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

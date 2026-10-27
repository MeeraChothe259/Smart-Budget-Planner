import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Target,
  UserCheck,
  Dna,
  DollarSign,
  CreditCard,
  Building2,
  Calendar,
  Sliders
} from 'lucide-react';
import { calculateAllocation } from '../engine/adaptiveEngine';

export default function DigitalTwinOverview({ profile, onSelectView, privacyMode, formatCurrency, onOpenStudio }) {
  const disposable = Math.max(0, profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses - (profile.debtEmis || 0));

  const pipelineNodes = [
    { label: "Income", value: formatCurrency(profile.monthlyIncome), icon: DollarSign, color: "border-brand-500 text-brand-600 dark:text-cyan-400" },
    { label: "Spending", value: formatCurrency(profile.fixedExpenses + profile.variableExpenses + (profile.debtEmis || 0)), icon: CreditCard, color: "border-amber-500 text-amber-600" },
    { label: "Savings Pool", value: formatCurrency(profile.currentSavings), icon: Building2, color: "border-emerald-500 text-emerald-600" },
    { label: "Goals", value: `${profile.goals?.length || 3} Active`, icon: Target, color: "border-violet-500 text-violet-600" },
    { label: "Habits", value: "Goal Driven", icon: Dna, color: "border-cyan-500 text-cyan-600" },
    { label: "Risks", value: `${(profile.emergencyFund / Math.max(1000, profile.fixedExpenses)).toFixed(1)} Mo Buffer`, icon: ShieldCheck, color: "border-rose-500 text-rose-600" },
    { label: "Future", value: "+18% 5-Yr Growth", icon: Calendar, color: "border-emerald-500 text-emerald-600" }
  ];

  const quickQuestions = [
    { q: "Can I afford an ₹80,000 Laptop?", view: "whatIf" },
    { q: "What if I move to Mumbai or Pune?", view: "life" },
    { q: "What if I save ₹5,000 more every month?", view: "universes" },
    { q: "What if I lose my job for 3 months?", view: "shockTest" },
    { q: "Can I afford a ₹35,000 trip to Goa?", view: "afford" }
  ];

  return (
    <div className="space-y-8">

      {/* DIGITAL TWIN PIPELINE CARD */}
      <div className="rounded-3xl glass-card p-6 sm:p-10 border-2 border-brand-500/40 shadow-xl space-y-6 bg-white dark:bg-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black shadow-md">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                YOUR FINANCIAL TWIN
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Live AI Financial Model modeling your real-time financial condition
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              ● Live Model Active
            </span>
            {onOpenStudio && (
              <button
                onClick={onOpenStudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Salary & Savings</span>
              </button>
            )}
          </div>
        </div>

        {/* PIPELINE STAGES NODE DIAGRAM */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {pipelineNodes.map((node, idx) => {
            const IconComp = node.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 ${node.color} shadow-sm text-center space-y-1 transition-transform hover:scale-105`}
              >
                <div className="flex justify-center">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="text-xs font-black uppercase text-slate-400">{node.label}</div>
                <div className="text-base font-black truncate">{node.value}</div>
              </div>
            );
          })}
        </div>

        {/* PROFILE STATS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-1">
            <span className="text-xs font-black text-brand-700 dark:text-cyan-300 uppercase">Monthly Free Cash Flow</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {formatCurrency(disposable)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">Amount available for savings & new goals</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase">Total Liquid Reserves</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {formatCurrency(profile.currentSavings + profile.emergencyFund)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">Savings + Emergency safety fund</p>
          </div>

          <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/30 space-y-1">
            <span className="text-xs font-black text-violet-700 dark:text-violet-300 uppercase">Primary Target Goal</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {profile.goals?.[0]?.name || "Europe Vacation Fund"}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{formatCurrency(profile.goals?.[0]?.currentAmount || 0)} of {formatCurrency(profile.goals?.[0]?.targetAmount || 200000)}</p>
          </div>
        </div>

      </div>

      {/* INSTANT QUESTIONS YOUR TWIN CAN ANSWER */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Ask Your Twin Questions</span>
          <Sparkles className="w-5 h-5 text-brand-500" />
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectView(item.view)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all text-left flex items-center justify-between group shadow-sm"
            >
              <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500">
                "{item.q}"
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

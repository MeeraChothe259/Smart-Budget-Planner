import React from 'react';
import { classifyBudgetDNA } from '../engine/financialTwinEngine';
import { Sparkles, Dna, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function BudgetDNAView({ profile, privacyMode, formatCurrency }) {
  const dna = classifyBudgetDNA(profile);

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-cyan-500/30 shadow-xl bg-gradient-to-r from-white via-cyan-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-400 to-emerald-400 flex items-center justify-center text-white font-black shadow-md">
            <Dna className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs font-black uppercase mb-1">
              BEHAVIORAL FINANCIAL CLASSIFIER
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              YOUR BUDGET DNA
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Financial Twin analyzes your spending behavior and goal patterns to identify your unique Budget DNA personality.
        </p>
      </div>

      {/* DETECTED BUDGET DNA TAGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dna.tags.map((tag, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 space-y-3 hover:border-brand-500 transition-all shadow-sm"
          >
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {tag.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {tag.desc}
            </p>
          </div>
        ))}
      </div>

      {/* WHY WE DETECTED THIS (SPENDING EVIDENCE) */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 bg-white dark:bg-slate-900">
        
        <div className="border-b-2 border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Why We Detected This DNA</span>
            <Sparkles className="w-5 h-5 text-brand-500" />
          </h3>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Empirical evidence extracted from your recent financial transactions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-black uppercase text-slate-400">Monthly Savings Rate</span>
            <div className="text-3xl font-black text-emerald-500">{dna.savingsRate}%</div>
            <p className="text-xs text-slate-500 font-medium">Consistently saved from monthly salary</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-black uppercase text-slate-400">Emergency Fund Coverage</span>
            <div className="text-3xl font-black text-brand-600 dark:text-cyan-400">{dna.emergencyMonths} Months</div>
            <p className="text-xs text-slate-500 font-medium">Liquid runway covering essential needs</p>
          </div>
        </div>

        {/* Recent Transaction Evidence */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-400">Recent Spending Patterns</h4>
          <div className="space-y-2">
            {profile.recentPurchases.map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-bold">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300">{p.category}</span>
                  <span className="text-slate-900 dark:text-white">{p.name}</span>
                </div>
                <span className="text-slate-900 dark:text-white font-black">{formatCurrency(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendation */}
        <div className="p-6 rounded-3xl bg-brand-500/10 border-2 border-brand-500/30 space-y-2">
          <span className="text-xs font-black uppercase text-brand-700 dark:text-cyan-300">DNA Recommendation</span>
          <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            "{dna.recommendation}"
          </p>
        </div>

      </div>

    </div>
  );
}

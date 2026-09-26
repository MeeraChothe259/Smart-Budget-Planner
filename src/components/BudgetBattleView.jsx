import React from 'react';
import { Swords, Trophy, Flame, Award, Target, Zap } from 'lucide-react';

export default function BudgetBattleView({ profile, privacyMode, formatCurrency }) {
  const predictedSpend = 31200;
  const actualSpend = 27850;
  const savedDiff = predictedSpend - actualSpend;

  const badges = [
    { title: "7-Day No-Spend", icon: Flame, desc: "No impulse discretionary spend for 7 days in a row!", color: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
    { title: "\u20b910K Saved", icon: Trophy, desc: "Accumulated \u20b910,000 extra savings in piggy bank!", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" },
    { title: "Goal Crusher", icon: Target, desc: "Hit 50% milestone on Europe Vacation Goal!", color: "bg-brand-500/10 text-brand-600 border-brand-500/30" },
    { title: "Emergency Builder", icon: Award, desc: "Maintained 3+ months emergency liquid buffer!", color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30" }
  ];

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-amber-500/40 shadow-xl bg-gradient-to-r from-white via-amber-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-brand-500 to-violet-600 flex items-center justify-center text-white font-black shadow-md">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 text-xs font-black uppercase mb-1">
              GAMIFIED BUDGET ARENA
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              BUDGET BATTLE: YOU VS OLD SELF
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Compete against AI historical predictions! Beat your predicted spending to earn XP, streak flames, and level badges.
        </p>
      </div>

      {/* YOU VS YOUR OLD SELF MATCH CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-amber-500/40 shadow-2xl space-y-8 bg-white dark:bg-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Monthly Battle Result</span>
              <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <span>YOU BEAT YOUR PREDICTION BY {formatCurrency(savedDiff)}!</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-300 text-sm font-black border border-amber-500/30 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              7-DAY STREAK ACTIVE
            </span>
          </div>
        </div>

        {/* COMPARISON METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-xs font-black uppercase text-slate-400">AI Predicted Spending</span>
            <div className="text-3xl font-black text-slate-500 line-through">
              {formatCurrency(predictedSpend)}
            </div>
            <p className="text-xs text-slate-500 font-medium">Based on historical behavior</p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/40 text-center space-y-1">
            <span className="text-xs font-black uppercase text-emerald-600">Your Actual Spending</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {formatCurrency(actualSpend)}
            </div>
            <p className="text-xs text-emerald-600 font-bold">Smart discipline saved money!</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-brand-600 text-white text-center space-y-1 shadow-lg">
            <span className="text-xs font-black uppercase opacity-90">XP Earned</span>
            <div className="text-4xl font-black text-white">
              +450 XP
            </div>
            <p className="text-xs font-bold opacity-90">Level 4 Financial Wizard</p>
          </div>

        </div>

      </div>

      {/* BADGES & MILESTONES GRID */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Earned Achievements & Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => (
            <div key={idx} className={`p-5 rounded-3xl border-2 space-y-2 ${b.color}`}>
              <div className="flex items-center gap-2">
                <b.icon className="w-5 h-5" />
                <h4 className="text-base font-black">{b.title}</h4>
              </div>
              <p className="text-xs font-medium leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

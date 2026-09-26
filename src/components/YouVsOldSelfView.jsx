import React, { useState } from 'react';
import { Award, Zap, Flame, Trophy, TrendingUp, CheckCircle2, Star, Shield, ArrowUpRight } from 'lucide-react';

export default function YouVsOldSelfView({ profile, privacyMode, formatCurrency }) {
  const [userXp, setUserXp] = useState(1450);
  const [level, setLevel] = useState(4);
  const [streakDays, setStreakDays] = useState(12);

  const achievements = [
    { id: 1, title: 'Ctrl+Z Master', desc: 'Simulated 5 financial decisions before buying.', xp: 200, done: true },
    { id: 2, title: 'Emergency Fortress', desc: 'Maintained over 3.5 months of emergency runway.', xp: 300, done: true },
    { id: 3, title: 'Impulse Destroyer', desc: 'Used 14-day cooling off period on a ₹15,000 purchase.', xp: 250, done: true },
    { id: 4, title: '5-Year Visionary', desc: 'Explored 5 parallel financial universes in Multiverse mode.', xp: 150, done: true },
    { id: 5, title: 'Zero Impulse Week', desc: '7 consecutive days with zero non-essential spending.', xp: 350, done: false }
  ];

  return (
    <div className="space-y-8 antialiased">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-xl bg-[#090d16] text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase mb-1">
                GAMIFIED PROGRESS
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                YOU VS YOUR OLD SELF
              </h2>
            </div>
          </div>

          {/* STREAK & LEVEL BADGES */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-xs sm:text-sm">
              <Flame className="w-4 h-4 text-amber-400 fill-current" />
              <span>{streakDays} DAY STREAK</span>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-500/20 border border-brand-500/40 text-brand-300 font-black text-xs sm:text-sm">
              <Star className="w-4 h-4 text-cyan-300 fill-current" />
              <span>LEVEL {level} NAVIGATOR</span>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-3xl">
          Track your financial discipline evolution! Compare your current financial habits against your historical behavior and earn XP as you make smarter decisions.
        </p>

        {/* XP PROGRESS BAR */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-2">
          <div className="flex justify-between text-xs font-black text-slate-300">
            <span>Level {level} Experience</span>
            <span className="text-amber-400">{userXp} / 2000 XP</span>
          </div>

          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-brand-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${(userXp / 2000) * 100}%` }}
            />
          </div>
        </div>
      </div>


      {/* HISTORICAL COMPARISON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="rounded-3xl p-6 border-2 border-emerald-500/30 space-y-3 bg-gradient-to-br from-emerald-500/10 via-white to-transparent dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">Monthly Spend Delta</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            ₹2,400 LESS
          </div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Spent ₹2,400 less this month compared to your historical monthly baseline!
          </p>
        </div>

        <div className="rounded-3xl p-6 border-2 border-brand-500/30 space-y-3 bg-gradient-to-br from-brand-500/10 via-white to-transparent dark:from-brand-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-brand-600 dark:text-cyan-300 uppercase">Goal Acceleration</span>
            <Award className="w-5 h-5 text-brand-500" />
          </div>
          <div className="text-3xl font-black text-brand-600 dark:text-cyan-400">
            11 DAYS FASTER
          </div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Europe Vacation Goal target reached 11 days earlier due to optimized re-allocation.
          </p>
        </div>

        <div className="rounded-3xl p-6 border-2 border-violet-500/30 space-y-3 bg-gradient-to-br from-violet-500/10 via-white to-transparent dark:from-violet-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase">Emergency Safety</span>
            <Shield className="w-5 h-5 text-violet-500" />
          </div>
          <div className="text-3xl font-black text-violet-600 dark:text-violet-400">
            +₹8,000 BOOST
          </div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Emergency reserve buffer improved by ₹8,000 over the past 30 days.
          </p>
        </div>

      </div>


      {/* ACHIEVEMENTS & QUESTS */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-900/90 shadow-md">
        
        <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">FINANCIAL DISCIPLINE ACHIEVEMENTS</h3>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Earn XP & Level Up</span>
        </div>

        <div className="space-y-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                ach.done
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-white'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${ach.done ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'}`}>
                  {ach.done ? <CheckCircle2 className="w-5 h-5" /> : ach.id}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold">{ach.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{ach.desc}</p>
                </div>
              </div>

              <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 shrink-0">
                +{ach.xp} XP
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

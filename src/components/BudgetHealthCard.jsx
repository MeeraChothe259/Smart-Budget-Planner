import React, { useState } from 'react';
import { ChevronRight, X, Activity } from 'lucide-react';

export default function BudgetHealthCard({ health }) {
  const [showModal, setShowModal] = useState(false);

  if (!health) return null;

  const { score, label, components } = health;

  // SVG Circular progress math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // emerald
  if (score < 60) strokeColor = '#f43f5e'; // rose
  else if (score < 75) strokeColor = '#f59e0b'; // amber
  else if (score < 85) strokeColor = '#0c8ce9'; // brand

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="glass-card rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-500" />
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Money Health Score 🏥
            </h3>
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-cyan-400 group-hover:underline flex items-center gap-0.5">
            Details <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        <div className="flex items-center gap-5 my-2">
          
          {/* Circular SVG Gauge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="10"
                stroke={strokeColor}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {score}
              </span>
              <span className="text-xs font-bold text-slate-400">
                / 100
              </span>
            </div>
          </div>

          {/* Text Summary */}
          <div className="space-y-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold ${
              score >= 80 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
              score >= 65 ? 'bg-brand-500/10 text-brand-600 dark:text-cyan-400' :
              'bg-amber-500/10 text-amber-600 dark:text-amber-400'
            }`}>
              {label}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              How safe is your money? High scores mean your savings and essentials are protected!
            </p>
          </div>

        </div>

        {/* Quick Component Mini Bars */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {components.slice(0, 2).map((comp, idx) => (
            <div key={idx} className="text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400 mb-1 font-bold">
                <span className="truncate max-w-[100px]">{comp.name}</span>
                <span className="text-slate-800 dark:text-slate-200">{comp.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${comp.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal Breakdown */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-4">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-cyan-400 flex items-center justify-center font-black text-2xl">
                {score}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Money Health Details
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Easy breakdown of how your score was calculated
                </p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              {components.map((comp, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {comp.name}
                    </span>
                    <span className="text-sm font-black text-brand-600 dark:text-cyan-400">
                      {comp.score} / 100 ({comp.value})
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all duration-500"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-2xl bg-brand-600 text-white font-extrabold text-sm hover:bg-brand-700 transition-colors shadow-md"
            >
              Got it!
            </button>

          </div>
        </div>
      )}
    </>
  );
}

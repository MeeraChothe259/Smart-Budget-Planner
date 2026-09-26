import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Laptop, Plane, Smartphone, ShoppingBag, ShieldAlert } from 'lucide-react';

export default function OneDecisionBar({ onRunSimulation, privacyMode, formatCurrency }) {
  const [input, setInput] = useState('');

  const quickPrompts = [
    { label: 'Buying an ₹80,000 laptop', item: 'Laptop', price: 80000, icon: Laptop },
    { label: 'Taking a ₹35,000 trip to Goa', item: 'Goa Trip', price: 35000, icon: Plane },
    { label: 'Buying a ₹45,000 Smartphone', item: 'Smartphone', price: 45000, icon: Smartphone },
    { label: 'Buying ₹6,000 Sneakers', item: 'Sneakers', price: 6000, icon: ShoppingBag },
    { label: 'Job Loss for 3 Months', item: 'Emergency Job Cut', price: 90000, icon: ShieldAlert }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Parse price if entered in prompt or default to 25000
    const match = input.match(/\d+[\d,]*/);
    const amount = match ? Number(match[0].replace(/,/g, '')) : 25000;
    
    onRunSimulation(input, amount);
  };

  return (
    <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-brand-500/40 shadow-glow bg-gradient-to-r from-brand-600/10 via-cyan-500/10 to-violet-600/10 relative overflow-hidden space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 text-white flex items-center justify-center font-black text-xl shadow-md">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            "One Decision" Quick Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            Test any financial decision before you make it in the real world!
          </p>
        </div>
      </div>

      {/* Input Bar Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-extrabold">
            I'm thinking about...
          </span>
          <input
            type="text"
            placeholder="buying an ₹80,000 laptop, taking a ₹35,000 trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-44 pr-4 py-3.5 text-sm sm:text-base font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-brand-500 text-slate-900 dark:text-white shadow-inner"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white font-black text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span>SIMULATE FUTURE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 shrink-0">Try instantly:</span>
        {quickPrompts.map((p, idx) => {
          const IconComp = p.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                setInput(p.label);
                onRunSimulation(p.item, p.price);
              }}
              className="px-3 py-1.5 text-xs font-extrabold rounded-full bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-brand-500 hover:text-white transition-all border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-sm flex items-center gap-1.5"
            >
              <IconComp className="w-3.5 h-3.5 text-brand-500 group-hover:text-white" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


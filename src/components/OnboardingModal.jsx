import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, X } from 'lucide-react';
import { PLANNING_MODES, PRIORITIES } from '../data/planningModes';

export default function OnboardingModal({ onComplete, onSkip }) {
  const [step, setStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState(PLANNING_MODES[0]);
  const [budget, setBudget] = useState(50000);
  const [selectedPriority, setSelectedPriority] = useState('EXPERIENCE');

  const handleFinish = () => {
    onComplete(selectedMode, budget, selectedPriority);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        
        {/* Skip button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          Skip Intro
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step ? 'bg-brand-500 shadow-glow' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Planning Mode */}
        {step === 1 && (
          <div>
            <span className="text-xs font-bold uppercase text-brand-600 dark:text-cyan-400">Step 1 of 3</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              What are you planning?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Select a planning mode tailored to your specific budget goal.
            </p>

            <div className="grid grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {PLANNING_MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedMode(m); setBudget(m.defaultBudget); }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedMode.id === m.id
                      ? 'bg-brand-500/10 border-brand-500 text-brand-900 dark:text-cyan-200 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-xs font-bold truncate">{m.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow hover:bg-brand-700 transition-all"
            >
              Next: Enter Budget <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Budget Input */}
        {step === 2 && (
          <div>
            <span className="text-xs font-bold uppercase text-brand-600 dark:text-cyan-400">Step 2 of 3</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              What's your budget?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Enter the total available funds for {selectedMode.name}.
            </p>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center mb-6">
              <span className="text-3xl font-black text-brand-600 dark:text-cyan-400">
                ₹{budget.toLocaleString('en-IN')}
              </span>
              <input
                type="range"
                min={selectedMode.minBudget}
                max={selectedMode.maxBudget}
                step={selectedMode.step}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 mt-4"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow hover:bg-brand-700"
              >
                Next: Priority <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Priority Selection */}
        {step === 3 && (
          <div>
            <span className="text-xs font-bold uppercase text-brand-600 dark:text-cyan-400">Step 3 of 3</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              What matters most?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Select your primary objective to guide fund allocation.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {PRIORITIES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPriority(p.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedPriority === p.id
                      ? 'bg-brand-500/10 border-brand-500 text-brand-900 dark:text-cyan-200 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xl mb-1">{p.icon}</span>
                  <span className="text-xs font-extrabold">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow hover:from-brand-700 hover:to-cyan-600"
              >
                BUILD SMART PLAN <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

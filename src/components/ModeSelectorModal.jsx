import React, { useState } from 'react';
import { X, Search, Check, Layers } from 'lucide-react';
import { PLANNING_MODES } from '../data/planningModes';

export default function ModeSelectorModal({ activeMode, onSelectMode, onClose }) {
  const [search, setSearch] = useState('');

  const filteredModes = PLANNING_MODES.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-cyan-400 flex items-center justify-center font-extrabold text-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Choose Your Planning Mode
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                12 specialized AI allocation engines with distinct categories & rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search planning mode (e.g. Travel, City, Wedding, Technology)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Grid of 12 Modes */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pr-1">
          {filteredModes.map(mode => {
            const isSelected = activeMode.id === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => {
                  onSelectMode(mode);
                  onClose();
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-cyan-500/10 border-brand-500 shadow-glow'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                      {mode.icon}
                    </span>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-brand-600 text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {mode.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {mode.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-slate-400">
                    {mode.categories.length} Categories
                  </span>
                  <span className="font-bold text-brand-600 dark:text-cyan-400">
                    Default: ₹{mode.defaultBudget.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

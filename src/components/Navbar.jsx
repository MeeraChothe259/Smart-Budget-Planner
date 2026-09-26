import React from 'react';
import { Sparkles, Sun, Moon, Play, Presentation, Layers, LayoutDashboard, Home, ArrowRight } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  activeMode,
  onOpenModeModal,
  darkMode,
  setDarkMode,
  onStartDemo,
  onStartPresentation
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-brand-500 dark:from-white dark:via-brand-300 dark:to-cyan-400 bg-clip-text text-transparent">
                SMARTBUDGET
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950/80 dark:text-cyan-300 border border-brand-300/40 dark:border-cyan-500/30">
                AI
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Plan Smarter. Adapt Faster.
            </p>
          </div>
        </button>

        {/* Center: View Switcher Nav & Active Mode */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Navigation View Switcher */}
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50 flex items-center gap-1">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentView === 'landing'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            
            <button
              onClick={() => setCurrentView('app')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentView === 'app'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* Current Mode Selector Badge (Shown when on App dashboard or on larger screens) */}
          {currentView === 'app' && (
            <button
              onClick={onOpenModeModal}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-cyan-400 transition-all shadow-sm group"
            >
              <span className="text-base">{activeMode.icon}</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-cyan-300">
                {activeMode.name}
              </span>
              <Layers className="w-3 h-3 text-slate-400 group-hover:text-brand-500 transition-transform group-hover:rotate-12" />
            </button>
          )}

        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('app')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-extrabold rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white shadow-glow hover:opacity-95 transition-all"
            >
              <span>LAUNCH APP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            /* Demo Mode Button */
            <button
              onClick={onStartDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
              title="See automated budget adaptation demo"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden lg:inline">SEE ADAPTATION DEMO</span>
              <span className="lg:hidden">DEMO</span>
            </button>
          )}

          {/* Presentation Pitch Mode Button */}
          <button
            onClick={onStartPresentation}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-brand-600 text-white hover:opacity-95 shadow-md transition-all"
            title="Launch guided judge presentation mode"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>PITCH MODE</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

        </div>

      </div>
    </header>
  );
}

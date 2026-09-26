import React from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Shield,
  UserCheck,
  FlaskConical,
  Compass,
  CreditCard,
  Bot,
  Swords,
  Activity,
  Globe,
  Globe2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function FinancialTwinNavbar({
  currentView,
  setCurrentView,
  privacyMode,
  setPrivacyMode,
  darkMode,
  setDarkMode,
  onResetDemo
}) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-2 border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-xl transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Logo & Brand */}
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-brand-500 dark:from-white dark:via-cyan-300 dark:to-cyan-400 bg-clip-text text-transparent">
                FINANCIAL TWIN
              </span>
              <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300 border border-brand-500/30">
                AI SIMULATOR
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden md:block">
              Simulate your future before making today's decisions.
            </p>
          </div>
        </button>

        {/* Center: Main View Switcher Pills */}
        <div className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              currentView === 'landing'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-brand-500'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              currentView === 'dashboard'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-brand-500'
            }`}
          >
            Digital Twin Dashboard
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Privacy Mode Mask Toggle */}
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-xl border transition-all ${
              privacyMode
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-500'
            }`}
            title={privacyMode ? "Privacy Mode ON (Hiding values)" : "Toggle Privacy Masking"}
          >
            {privacyMode ? <EyeOff className="w-3.5 h-3.5 text-white" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{privacyMode ? 'PRIVACY ON' : 'PRIVACY OFF'}</span>
          </button>

          {/* Reset Demo User Profile Button */}
          <button
            onClick={onResetDemo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all"
            title="Reset to Demo User Profile (Mumbai, ₹50,000/mo)"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>DEMO USER</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-black rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white shadow-glow hover:scale-105 transition-all"
          >
            <span>OPEN APP</span>
          </button>

        </div>

      </div>
    </header>
  );
}

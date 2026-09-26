import React, { useState, useEffect } from 'react';
import FinancialTwinNavbar from './components/FinancialTwinNavbar';
import FinancialTwinLanding from './components/FinancialTwinLanding';
import OneDecisionBar from './components/OneDecisionBar';
import DigitalTwinOverview from './components/DigitalTwinOverview';
import CtrlZSimulatorView from './components/CtrlZSimulatorView';
import FinancialDominoView from './components/FinancialDominoView';
import TimeMachineView from './components/TimeMachineView';
import WhatIfLabView from './components/WhatIfLabView';
import WhatIfIDontView from './components/WhatIfIDontView';
import RegretReplayView from './components/RegretReplayView';
import FinancialShockView from './components/FinancialShockView';
import YouVsOldSelfView from './components/YouVsOldSelfView';
import ParallelUniversesView from './components/ParallelUniversesView';
import LifePlannersView from './components/LifePlannersView';
import CanIAffordItView from './components/CanIAffordItView';
import ReceiptAnalyzerView from './components/ReceiptAnalyzerView';
import BudgetDNAView from './components/BudgetDNAView';
import AIMoneyCoachView from './components/AIMoneyCoachView';
import BudgetBattleView from './components/BudgetBattleView';
import FinancialHealthView from './components/FinancialHealthView';
import FutureSelfView from './components/FutureSelfView';

import { DEFAULT_USER_PROFILE } from './engine/financialTwinEngine';
import {
  Sparkles,
  Dna,
  FlaskConical,
  Globe,
  Compass,
  CreditCard,
  Camera,
  ShieldCheck,
  Bot,
  Swords,
  Activity,
  Calendar,
  Menu,
  X,
  ChevronRight,
  Zap,
  RotateCcw,
  Clock,
  Layers,
  Scale,
  ShieldAlert,
  Trophy,
  Eye,
  EyeOff,
  UserCheck
} from 'lucide-react';

export default function App() {
  // Navigation View ('landing' | 'dashboard')
  const [currentView, setCurrentView] = useState('landing');

  // Dashboard Sub-View
  const [dashboardSubView, setDashboardSubView] = useState('ctrlZ');

  // Mobile sidebar open state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Privacy Masking Mode
  const [privacyMode, setPrivacyMode] = useState(false);

  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Profile State initialized to default demo profile
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);

  // Simulation parameters from OneDecisionBar
  const [simItem, setSimItem] = useState('Laptop');
  const [simPrice, setSimPrice] = useState(80000);

  // Sync dark class on body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Currency Formatter respecting Privacy Masking Mode
  const formatCurrency = (amount) => {
    if (privacyMode) return '₹•••••';
    return `₹${Math.round(amount || 0).toLocaleString('en-IN')}`;
  };

  const handleRunSimulation = (item, price) => {
    setSimItem(item);
    setSimPrice(price);
    setDashboardSubView('ctrlZ');
    setCurrentView('dashboard');
  };

  const handleResetDemo = () => {
    setProfile(DEFAULT_USER_PROFILE);
    setSimItem('Laptop');
    setSimPrice(80000);
    setDashboardSubView('ctrlZ');
  };

  // Categorized Sidebar Navigation Items with Lucide SVG Icons
  const sidebarGroups = [
    {
      groupName: "⚡ REVOLUTIONARY USP",
      items: [
        { id: 'ctrlZ', name: '⚡ Financial Ctrl+Z', icon: RotateCcw, badge: 'CORE USP' },
        { id: 'domino', name: '🁢 Domino Effect', icon: Layers, badge: 'Chain' },
        { id: 'timeMachine', name: '⏳ Time Machine', icon: Clock, badge: '5-Yr Scrub' },
        { id: 'universes', name: '🌌 Multiverse Mode', icon: Globe, badge: '5 Timelines' }
      ]
    },
    {
      groupName: "CORE TWIN & FUTURES",
      items: [
        { id: 'twin', name: 'Digital Twin Overview', icon: Dna, badge: 'Live' },
        { id: 'future', name: 'Future Me (5-Year)', icon: Calendar, badge: 'Projection' },
        { id: 'health', name: 'Health & Stress Test', icon: Activity, badge: 'Meter' },
        { id: 'shockTest', name: '🚨 Financial Shock Test', icon: ShieldAlert, badge: 'Survival' }
      ]
    },
    {
      groupName: "SIMULATORS & EVALUATORS",
      items: [
        { id: 'whatIf', name: 'What-If Lab', icon: FlaskConical, badge: 'Simulate' },
        { id: 'whatIfIDont', name: 'What If I Don\'t?', icon: Scale, badge: 'Compare' },
        { id: 'regretReplay', name: '🔮 Regret Replay', icon: RotateCcw, badge: 'Behavior' },
        { id: 'afford', name: 'Can I Afford It?', icon: CreditCard, badge: 'Risk Score' }
      ]
    },
    {
      groupName: "INTELLIGENCE & GAMIFICATION",
      items: [
        { id: 'life', name: 'Life Planners', icon: Compass, badge: '8 Modes' },
        { id: 'receipt', name: 'Receipt Analyzer', icon: Camera, badge: 'Scanner' },
        { id: 'dna', name: 'Budget DNA', icon: ShieldCheck, badge: 'Behavioral' },
        { id: 'coach', name: 'AI Money Coach', icon: Bot, badge: 'Interactive' },
        { id: 'youVsOld', name: '🏆 You vs Old Self', icon: Trophy, badge: 'XP & Levels' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300 pb-20 selection:bg-brand-500 selection:text-white">
      
      {/* Navigation Header */}
      <FinancialTwinNavbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        privacyMode={privacyMode}
        setPrivacyMode={setPrivacyMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onResetDemo={handleResetDemo}
      />

      {/* VIEW CONDITIONAL RENDERING */}
      {currentView === 'landing' ? (
        <main className="pt-6">
          <FinancialTwinLanding
            onLaunchApp={() => {
              setDashboardSubView('ctrlZ');
              setCurrentView('dashboard');
            }}
            onStartDemo={() => {
              setCurrentView('dashboard');
              setDashboardSubView('ctrlZ');
            }}
            privacyMode={privacyMode}
            formatCurrency={formatCurrency}
          />
        </main>
      ) : (
        /* DASHBOARD LAYOUT WITH SIDEBAR + MAIN CONTENT */
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6">
          
          {/* MOBILE SIDEBAR TOGGLE BAR */}
          <div className="lg:hidden mb-4 flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-500 text-white font-bold text-sm"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span>{mobileSidebarOpen ? 'Close Navigation' : 'Dashboard Features'}</span>
            </button>
            <span className="text-xs font-black text-slate-500 uppercase">
              Current: <strong className="text-brand-600 dark:text-cyan-400">{dashboardSubView}</strong>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION PANEL */}
            <aside
              className={`w-full lg:w-72 xl:w-80 shrink-0 glass-card p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-lg space-y-6 sticky top-24 z-30 ${
                mobileSidebarOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">FINANCIAL TWIN</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Interactive Navigation</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              {/* Sidebar Navigation Groups */}
              <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 scrollbar-none">
                {sidebarGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2">
                    <div className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase px-2">
                      {group.groupName}
                    </div>

                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = dashboardSubView === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setDashboardSubView(item.id);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-between transition-all group ${
                              isActive
                                ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white shadow-md scale-[1.02]'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent
                                className={`w-4 h-4 ${
                                  isActive
                                    ? 'text-white'
                                    : 'text-slate-500 dark:text-slate-400 group-hover:text-brand-500'
                                }`}
                              />
                              <span>{item.name}</span>
                            </div>

                            {item.badge && (
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                  isActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer User Info */}
              <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 space-y-3">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs font-bold">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Monthly Salary:</span>
                    <span className="text-slate-900 dark:text-white font-black">{formatCurrency(profile.monthlyIncome)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Savings Pool:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black">{formatCurrency(profile.currentSavings)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPrivacyMode(!privacyMode)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    {privacyMode ? <EyeOff className="w-3.5 h-3.5 text-violet-500" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{privacyMode ? 'Privacy ON' : 'Privacy OFF'}</span>
                  </button>
                </div>
              </div>

            </aside>

            {/* MAIN DASHBOARD CONTENT AREA */}
            <main className="flex-1 w-full space-y-8">
              
              {/* ONE DECISION QUICK PROMPT BAR */}
              <OneDecisionBar
                onRunSimulation={handleRunSimulation}
                privacyMode={privacyMode}
                formatCurrency={formatCurrency}
              />

              {/* SUB-VIEW CONTENT RENDERING */}
              {dashboardSubView === 'ctrlZ' && (
                <CtrlZSimulatorView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'domino' && (
                <FinancialDominoView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'timeMachine' && (
                <TimeMachineView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'twin' && (
                <DigitalTwinOverview
                  profile={profile}
                  onSelectView={(v) => setDashboardSubView(v)}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'whatIf' && (
                <WhatIfLabView
                  profile={profile}
                  initialItem={simItem}
                  initialPrice={simPrice}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'whatIfIDont' && (
                <WhatIfIDontView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'regretReplay' && (
                <RegretReplayView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'shockTest' && (
                <FinancialShockView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'youVsOld' && (
                <YouVsOldSelfView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'universes' && (
                <ParallelUniversesView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'life' && (
                <LifePlannersView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'afford' && (
                <CanIAffordItView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'receipt' && (
                <ReceiptAnalyzerView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'dna' && (
                <BudgetDNAView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'coach' && (
                <AIMoneyCoachView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'battle' && (
                <BudgetBattleView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'health' && (
                <FinancialHealthView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

              {dashboardSubView === 'future' && (
                <FutureSelfView
                  profile={profile}
                  privacyMode={privacyMode}
                  formatCurrency={formatCurrency}
                />
              )}

            </main>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 mt-16 text-center border-t-2 border-slate-200 dark:border-slate-800 pt-8 text-sm text-slate-600 dark:text-slate-400 font-medium">
        <div className="flex items-center justify-center gap-3 font-black text-slate-800 dark:text-slate-200 text-base">
          <span>FINANCIAL TWIN</span>
          <span>•</span>
          <span>Your money has no Ctrl+Z. Your Financial Twin does.</span>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Simulate your decisions before you live with them. Replay your future.
        </p>
      </footer>

    </div>
  );
}

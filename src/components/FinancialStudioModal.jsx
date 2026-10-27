import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  RotateCcw,
  Sliders,
  DollarSign,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Building,
  CreditCard,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_USER_PROFILE } from '../engine/financialTwinEngine';

export const CAREER_PRESETS = [
  {
    id: 'fresher',
    title: 'Fresher / Intern',
    badge: '₹25k/mo',
    icon: '🎓',
    salary: 25000,
    monthlySavings: 5000,
    fixedExpenses: 14000,
    variableExpenses: 6000,
    currentSavings: 30000,
    emergencyFund: 25000,
    investments: 10000,
    debtEmis: 0,
    desc: 'Entry level budget'
  },
  {
    id: 'junior',
    title: 'Junior Pro (Demo)',
    badge: '₹50k/mo',
    icon: '💼',
    salary: 50000,
    monthlySavings: 15000,
    fixedExpenses: 24000,
    variableExpenses: 11000,
    currentSavings: 120000,
    emergencyFund: 60000,
    investments: 45000,
    debtEmis: 0,
    desc: 'Healthy 30% savings rate'
  },
  {
    id: 'mid',
    title: 'Mid-Level Specialist',
    badge: '₹95k/mo',
    icon: '🚀',
    salary: 95000,
    monthlySavings: 35000,
    fixedExpenses: 40000,
    variableExpenses: 20000,
    currentSavings: 350000,
    emergencyFund: 150000,
    investments: 180000,
    debtEmis: 0,
    desc: 'Wealth accumulation mode'
  },
  {
    id: 'senior',
    title: 'Senior / Tech Lead',
    badge: '₹1.8L/mo',
    icon: '🌟',
    salary: 180000,
    monthlySavings: 75000,
    fixedExpenses: 65000,
    variableExpenses: 40000,
    currentSavings: 800000,
    emergencyFund: 350000,
    investments: 550000,
    debtEmis: 0,
    desc: 'High compounding power'
  },
  {
    id: 'high',
    title: 'High Earner / Director',
    badge: '₹3.2L/mo',
    icon: '⚡',
    salary: 320000,
    monthlySavings: 160000,
    fixedExpenses: 90000,
    variableExpenses: 70000,
    currentSavings: 1800000,
    emergencyFund: 600000,
    investments: 1400000,
    debtEmis: 0,
    desc: '50% aggressive savings'
  },
  {
    id: 'fire',
    title: 'Frugal FIRE Saver',
    badge: '₹80k/mo',
    icon: '🧘',
    salary: 80000,
    monthlySavings: 48000,
    fixedExpenses: 22000,
    variableExpenses: 10000,
    currentSavings: 400000,
    emergencyFund: 150000,
    investments: 300000,
    debtEmis: 0,
    desc: '60% savings rate for early exit'
  }
];

export default function FinancialStudioModal({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetDemo,
  formatCurrency
}) {
  if (!isOpen) return null;

  // Active editable form state
  const [salary, setSalary] = useState(profile.monthlyIncome || 50000);
  const [fixedExpenses, setFixedExpenses] = useState(profile.fixedExpenses || 24000);
  const [variableExpenses, setVariableExpenses] = useState(profile.variableExpenses || 11000);
  const [currentSavings, setCurrentSavings] = useState(profile.currentSavings || 120000);
  const [emergencyFund, setEmergencyFund] = useState(profile.emergencyFund || 60000);
  const [investments, setInvestments] = useState(profile.investments || 45000);
  const [debtEmis, setDebtEmis] = useState(profile.debtEmis || 0);

  // Sync internal state when external profile prop updates
  useEffect(() => {
    setSalary(profile.monthlyIncome || 50000);
    setFixedExpenses(profile.fixedExpenses || 24000);
    setVariableExpenses(profile.variableExpenses || 11000);
    setCurrentSavings(profile.currentSavings || 120000);
    setEmergencyFund(profile.emergencyFund || 60000);
    setInvestments(profile.investments || 45000);
    setDebtEmis(profile.debtEmis || 0);
  }, [profile]);

  // Derived Real-Time Monthly Savings
  const monthlySavings = Math.max(0, salary - fixedExpenses - variableExpenses - debtEmis);
  const savingsRate = salary > 0 ? Math.round((monthlySavings / salary) * 100) : 0;
  const fixedRate = salary > 0 ? Math.round((fixedExpenses / salary) * 100) : 0;
  const variableRate = salary > 0 ? Math.round((variableExpenses / salary) * 100) : 0;
  const debtRate = salary > 0 ? Math.round((debtEmis / salary) * 100) : 0;

  // Key derived metrics
  const emergencyRunwayMonths = fixedExpenses > 0 ? (emergencyFund / fixedExpenses).toFixed(1) : '99';
  const projected1YrSavings = monthlySavings * 12;
  const projected5YrNetWorth = Math.round(
    (currentSavings + investments + emergencyFund) * Math.pow(1.09, 5) +
      monthlySavings * 12 * ((Math.pow(1.09, 5) - 1) / 0.09)
  );

  // Instant Real-Time Profile Dispatcher (updates parent app immediately)
  const syncLiveChanges = (updatedFields) => {
    const updated = {
      ...profile,
      monthlyIncome: updatedFields.salary !== undefined ? updatedFields.salary : salary,
      fixedExpenses: updatedFields.fixedExpenses !== undefined ? updatedFields.fixedExpenses : fixedExpenses,
      variableExpenses: updatedFields.variableExpenses !== undefined ? updatedFields.variableExpenses : variableExpenses,
      currentSavings: updatedFields.currentSavings !== undefined ? updatedFields.currentSavings : currentSavings,
      emergencyFund: updatedFields.emergencyFund !== undefined ? updatedFields.emergencyFund : emergencyFund,
      investments: updatedFields.investments !== undefined ? updatedFields.investments : investments,
      debtEmis: updatedFields.debtEmis !== undefined ? updatedFields.debtEmis : debtEmis,
      salarySources: [
        { name: "Primary Salary", amount: updatedFields.salary !== undefined ? updatedFields.salary : salary }
      ]
    };
    onUpdateProfile(updated);
  };

  // Handlers for inputs with immediate live sync
  const handleSalaryChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setSalary(val);
    syncLiveChanges({ salary: val });
  };

  // Adjust Monthly Savings directly by shifting variable expenses
  const handleMonthlySavingsChange = (newSavingsTarget) => {
    const target = Math.max(0, Number(newSavingsTarget) || 0);
    // Variable expenses = salary - fixed - debt - target savings
    const newVar = Math.max(0, salary - fixedExpenses - debtEmis - target);
    setVariableExpenses(newVar);
    syncLiveChanges({ variableExpenses: newVar });
  };

  const handleFixedChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setFixedExpenses(val);
    syncLiveChanges({ fixedExpenses: val });
  };

  const handleVariableChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setVariableExpenses(val);
    syncLiveChanges({ variableExpenses: val });
  };

  const handleSavingsPoolChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setCurrentSavings(val);
    syncLiveChanges({ currentSavings: val });
  };

  const handleEmergencyFundChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setEmergencyFund(val);
    syncLiveChanges({ emergencyFund: val });
  };

  const handleInvestmentsChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setInvestments(val);
    syncLiveChanges({ investments: val });
  };

  const handleDebtChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setDebtEmis(val);
    syncLiveChanges({ debtEmis: val });
  };

  // Apply Career Preset
  const handleApplyPreset = (preset) => {
    setSalary(preset.salary);
    setFixedExpenses(preset.fixedExpenses);
    setVariableExpenses(preset.variableExpenses);
    setCurrentSavings(preset.currentSavings);
    setEmergencyFund(preset.emergencyFund);
    setInvestments(preset.investments);
    setDebtEmis(preset.debtEmis);

    const updated = {
      ...profile,
      monthlyIncome: preset.salary,
      fixedExpenses: preset.fixedExpenses,
      variableExpenses: preset.variableExpenses,
      currentSavings: preset.currentSavings,
      emergencyFund: preset.emergencyFund,
      investments: preset.investments,
      debtEmis: preset.debtEmis,
      salarySources: [{ name: "Primary Salary", amount: preset.salary }]
    };
    onUpdateProfile(updated);
  };

  // 50/30/20 Standard Rule Auto-Allocation
  const handleApply503020Rule = () => {
    const newFixed = Math.round(salary * 0.5);
    const newVar = Math.round(salary * 0.3);
    setFixedExpenses(newFixed);
    setVariableExpenses(newVar);
    setDebtEmis(0);
    syncLiveChanges({ fixedExpenses: newFixed, variableExpenses: newVar, debtEmis: 0 });
  };

  // 50/20/30 Aggressive Wealth Allocation
  const handleApplyAggressiveSavingsRule = () => {
    const newFixed = Math.round(salary * 0.5);
    const newVar = Math.round(salary * 0.2);
    setFixedExpenses(newFixed);
    setVariableExpenses(newVar);
    syncLiveChanges({ fixedExpenses: newFixed, variableExpenses: newVar });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#0c1222] border-2 border-brand-500/40 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-emerald-500 text-white flex items-center justify-center shadow-glow">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Real-Time Financial Customizer
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Edit salary, monthly savings, expenses, and reserves — all simulators update instantly!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDemo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="Reset to default demo values"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 pr-4">

          {/* 1. CAREER & INCOME PRESETS (1-CLICK LOAD) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                Quick 1-Click Career & Income Presets
              </span>
              <span className="text-[11px] text-slate-400">Click any preset to instant-populate</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {CAREER_PRESETS.map((p) => {
                const isActive = salary === p.salary && currentSavings === p.currentSavings;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleApplyPreset(p)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all group ${
                      isActive
                        ? 'bg-brand-500/10 dark:bg-brand-500/20 border-brand-500 shadow-md scale-[1.02]'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-brand-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl">{p.icon}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {p.badge}
                      </span>
                    </div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                      {p.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Save {formatCurrency(p.monthlySavings)}/mo
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. LIVE CASH FLOW WATERFALL & HEALTH BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-cyan-500/10 to-emerald-500/10 border-2 border-brand-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-black uppercase text-brand-600 dark:text-cyan-300 tracking-wider">
                  Live Cash Flow Breakdown
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Salary: {formatCurrency(salary)}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Net Savings: {formatCurrency(monthlySavings)}/mo ({savingsRate}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleApply503020Rule}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Auto balance: 50% Needs, 30% Wants, 20% Savings"
                >
                  ⚡ Auto 50/30/20
                </button>
                <button
                  onClick={handleApplyAggressiveSavingsRule}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Auto balance: 50% Needs, 20% Wants, 30% Savings"
                >
                  🚀 Aggressive 30% Save
                </button>
              </div>
            </div>

            {/* Visual Stacked Cash Flow Bar */}
            <div className="space-y-1.5">
              <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${Math.min(100, fixedRate)}%` }}
                  className="bg-rose-500 h-full transition-all duration-300"
                  title={`Fixed Needs: ${formatCurrency(fixedExpenses)} (${fixedRate}%)`}
                />
                <div
                  style={{ width: `${Math.min(100 - fixedRate, variableRate)}%` }}
                  className="bg-amber-500 h-full transition-all duration-300"
                  title={`Variable Spending: ${formatCurrency(variableExpenses)} (${variableRate}%)`}
                />
                {debtRate > 0 && (
                  <div
                    style={{ width: `${Math.min(100 - fixedRate - variableRate, debtRate)}%` }}
                    className="bg-purple-500 h-full transition-all duration-300"
                    title={`Debt EMI: ${formatCurrency(debtEmis)} (${debtRate}%)`}
                  />
                )}
                <div
                  style={{ width: `${Math.max(0, 100 - fixedRate - variableRate - debtRate)}%` }}
                  className="bg-emerald-500 h-full transition-all duration-300 animate-pulse"
                  title={`Monthly Savings: ${formatCurrency(monthlySavings)} (${savingsRate}%)`}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-between text-xs font-bold pt-1 gap-2">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Fixed Needs: {formatCurrency(fixedExpenses)} ({fixedRate}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Variable Wants: {formatCurrency(variableExpenses)} ({variableRate}%)</span>
                </div>
                {debtEmis > 0 && (
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Debt EMIs: {formatCurrency(debtEmis)} ({debtRate}%)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Monthly Savings: {formatCurrency(monthlySavings)} ({savingsRate}%)</span>
                </div>
              </div>
            </div>

            {/* Live Health KPI Mini-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400">Savings Rate</span>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {savingsRate}%
                  <span className="text-xs font-semibold text-emerald-500 ml-1">
                    {savingsRate >= 30 ? '★ Prime' : savingsRate >= 20 ? 'Good' : 'Tight'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400">Emergency Runway</span>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {emergencyRunwayMonths} Mo
                  <span className="text-xs font-semibold text-emerald-500 ml-1">
                    {Number(emergencyRunwayMonths) >= 3 ? 'Safe' : 'Fragile'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400">1-Yr Cash Added</span>
                <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  +{formatCurrency(projected1YrSavings)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400">5-Yr Net Wealth</span>
                <div className="text-base font-black text-brand-600 dark:text-cyan-400 truncate">
                  {formatCurrency(projected5YrNetWorth)}
                </div>
              </div>
            </div>
          </div>

          {/* 3. CORE INPUTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT COLUMN: MONTHLY CASH FLOW (SALARY & MONTHLY SAVINGS & EXPENSES) */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <DollarSign className="w-5 h-5 text-brand-500" />
                <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Monthly Cash Flow Controls
                </h3>
              </div>

              {/* Monthly Salary Input & Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Monthly Take-Home Salary:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="1000"
                      min="5000"
                      max="1000000"
                      value={salary}
                      onChange={(e) => handleSalaryChange(e.target.value)}
                      className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="400000"
                  step="2500"
                  value={salary}
                  onChange={(e) => handleSalaryChange(e.target.value)}
                  className="w-full accent-brand-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>₹10,000</span>
                  <span>₹1,00,000</span>
                  <span>₹2,50,000</span>
                  <span>₹4,00,000+</span>
                </div>
              </div>

              {/* Monthly Target Savings Slider */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <PiggyBank className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Target Monthly Savings:
                    </label>
                    <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">
                      Auto-balances discretionary spending
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-emerald-500">₹</span>
                    <input
                      type="number"
                      step="1000"
                      min="0"
                      max={salary}
                      value={monthlySavings}
                      onChange={(e) => handleMonthlySavingsChange(e.target.value)}
                      className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(10000, salary - fixedExpenses)}
                  step="1000"
                  value={monthlySavings}
                  onChange={(e) => handleMonthlySavingsChange(e.target.value)}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span>₹0 (0%)</span>
                  <span>₹{Math.round(salary * 0.2).toLocaleString('en-IN')} (20%)</span>
                  <span>₹{Math.round(salary * 0.4).toLocaleString('en-IN')} (40%)</span>
                  <span>₹{Math.round(salary * 0.6).toLocaleString('en-IN')} (60%)</span>
                </div>
              </div>

              {/* Fixed Expenses (Needs) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Fixed Living Needs (Rent, Bills, Food):
                    </label>
                    <p className="text-[10px] text-slate-400">Essential monthly burn rate</p>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="500"
                      min="0"
                      max={salary}
                      value={fixedExpenses}
                      onChange={(e) => handleFixedChange(e.target.value)}
                      className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="5000"
                  max={Math.max(10000, salary)}
                  step="1000"
                  value={fixedExpenses}
                  onChange={(e) => handleFixedChange(e.target.value)}
                  className="w-full accent-rose-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Variable Expenses (Wants) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Variable Discretionary (Dining, Shopping):
                    </label>
                    <p className="text-[10px] text-slate-400">Fun & leisure spend</p>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="500"
                      min="0"
                      max={salary}
                      value={variableExpenses}
                      onChange={(e) => handleVariableChange(e.target.value)}
                      className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(5000, salary - fixedExpenses)}
                  step="500"
                  value={variableExpenses}
                  onChange={(e) => handleVariableChange(e.target.value)}
                  className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Debt EMI Outflow */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Monthly Loan / Debt EMIs:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="500"
                      min="0"
                      max={salary}
                      value={debtEmis}
                      onChange={(e) => handleDebtChange(e.target.value)}
                      className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: WEALTH, ASSETS & RESERVES (SAVINGS POOL & SAFETY) */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Wallet className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Wealth, Reserves & Balances
                </h3>
              </div>

              {/* Total Liquid Savings Pool */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Total Liquid Savings Pool:
                    </label>
                    <p className="text-[10px] text-slate-400">Cash in bank accounts</p>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="5000"
                      min="0"
                      max="10000000"
                      value={currentSavings}
                      onChange={(e) => handleSavingsPoolChange(e.target.value)}
                      className="w-40 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500000"
                  step="5000"
                  value={currentSavings}
                  onChange={(e) => handleSavingsPoolChange(e.target.value)}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>₹0</span>
                  <span>₹2,50,000</span>
                  <span>₹7,50,000</span>
                  <span>₹15,00,000+</span>
                </div>
              </div>

              {/* Emergency Fund */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Emergency Safety Reserve:
                    </label>
                    <p className="text-[10px] text-slate-400">Used for shock test & crises</p>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="5000"
                      min="0"
                      max="2000000"
                      value={emergencyFund}
                      onChange={(e) => handleEmergencyFundChange(e.target.value)}
                      className="w-40 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={emergencyFund}
                  onChange={(e) => handleEmergencyFundChange(e.target.value)}
                  className="w-full accent-cyan-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>0 Months</span>
                  <span>3 Months (~₹{(fixedExpenses * 3).toLocaleString('en-IN')})</span>
                  <span>6 Months (~₹{(fixedExpenses * 6).toLocaleString('en-IN')})</span>
                </div>
              </div>

              {/* Investments & SIPs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Investments (Mutual Funds, SIPs, Stocks):
                    </label>
                    <p className="text-[10px] text-slate-400">Compounding portfolio</p>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      step="5000"
                      min="0"
                      max="10000000"
                      value={investments}
                      onChange={(e) => handleInvestmentsChange(e.target.value)}
                      className="w-40 pl-7 pr-3 py-1.5 text-right font-black text-base rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={investments}
                  onChange={(e) => handleInvestmentsChange(e.target.value)}
                  className="w-full accent-violet-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Quick Summary Pill */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Total Liquid Reserves:</span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {formatCurrency(currentSavings + emergencyFund)}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Total Net Worth:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(currentSavings + emergencyFund + investments)}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Changes sync in real-time across all views & save automatically to your browser</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 text-white shadow-glow hover:scale-105 transition-all"
            >
              Done & Return to App
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

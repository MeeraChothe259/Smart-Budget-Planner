import React, { useState } from 'react';
import { calculateLifePlan, CITIES_DATA } from '../engine/financialTwinEngine';
import { Compass, Sparkles, ArrowRight, Building, GraduationCap, Briefcase, Plane, Home, Car, BookOpen, Heart, Lightbulb, MapPin } from 'lucide-react';

export default function LifePlannersView({ profile, privacyMode, formatCurrency }) {
  const [activePlanner, setActivePlanner] = useState('city');

  // Input states for planners
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [travelDest, setTravelDest] = useState('Goa Beach Trip');
  const [travelDays, setTravelDays] = useState(5);
  const [travelStyle, setTravelStyle] = useState('Moderate');
  const [homeValue, setHomeValue] = useState(6000000);
  const [carPrice, setCarPrice] = useState(1000000);
  const [mbaTuition, setMbaTuition] = useState(2500000);
  const [weddingGuests, setWeddingGuests] = useState(250);

  // Compute active life plan
  const planResult = calculateLifePlan(
    activePlanner,
    {
      city: selectedCity,
      income: profile.monthlyIncome,
      destination: travelDest,
      days: travelDays,
      style: travelStyle,
      homeValue,
      carPrice,
      tuition: mbaTuition,
      guests: weddingGuests
    },
    profile
  );

  const plannerTabs = [
    { id: 'city', name: 'City Relocate', icon: Building },
    { id: 'student', name: 'Student Life', icon: GraduationCap },
    { id: 'firstSalary', name: 'First Salary', icon: Briefcase },
    { id: 'travel', name: 'Travel Planner', icon: Plane },
    { id: 'home', name: 'Home Buying', icon: Home },
    { id: 'vehicle', name: 'Vehicle TCO', icon: Car },
    { id: 'mba', name: 'MBA Abroad', icon: BookOpen },
    { id: 'wedding', name: 'Wedding Event', icon: Heart }
  ];

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-emerald-500/30 shadow-xl bg-gradient-to-r from-white via-emerald-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 text-xs font-black uppercase mb-1">
              8 DOMAIN LIFE SIMULATORS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              LIFE MODE PLANNER SUITE
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Simulate major life decisions: moving cities, buying a home or car, studying abroad, planning a trip, or budgeting your first salary!
        </p>
      </div>

      {/* TABS GRID SELECTOR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {plannerTabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activePlanner === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePlanner(tab.id)}
              className={`px-5 py-3 rounded-2xl text-sm font-extrabold flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* PLANNER DISPLAY RESULT CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 bg-white dark:bg-slate-900">
        
        {/* PLANNER 1: CITY RELOCATE */}
        {activePlanner === 'city' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Building className="w-6 h-6 text-brand-500" />
                  <span>City Relocation Simulator</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Simulate moving to top tier cities in India</p>
              </div>

              {/* City Selector */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(CITIES_DATA).map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => setSelectedCity(cityName)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                      selectedCity === cityName
                        ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400">Est. 1BHK Rent</span>
                <div className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(planResult.rent)}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400">Monthly Food</span>
                <div className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(planResult.food)}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400">Transport & Commute</span>
                <div className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(planResult.transport)}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400">Total Living Cost</span>
                <div className="text-xl font-black text-brand-600 dark:text-cyan-400">{formatCurrency(planResult.totalCost)}</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-brand-700 dark:text-cyan-300">Moving Feasibility Verdict</span>
                <div className="text-lg font-black text-slate-900 dark:text-white">{planResult.movingFeasibility}</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500">Suggested Salary Target</span>
                <div className="text-lg font-black text-emerald-500">{formatCurrency(planResult.requiredSalary)}/mo</div>
              </div>
            </div>
          </div>
        )}

        {/* PLANNER 2: STUDENT MODE */}
        {activePlanner === 'student' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-brand-500" />
              <span>Student Life Budget Calculator</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Hostel/PG</span><div className="text-lg font-black">{formatCurrency(planResult.hostel)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Mess/Food</span><div className="text-lg font-black">{formatCurrency(planResult.food)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">College Fees</span><div className="text-lg font-black">{formatCurrency(planResult.collegeFees)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Books/Material</span><div className="text-lg font-black">{formatCurrency(planResult.books)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Outings/Fun</span><div className="text-lg font-black">{formatCurrency(planResult.entertainment)}</div></div>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center font-black text-lg text-emerald-600">
              Total Student Monthly Budget: {formatCurrency(planResult.totalCost)} (Suggested Allowance: {formatCurrency(planResult.suggestedAllowance)})
            </div>
          </div>
        )}

        {/* PLANNER 3: FIRST SALARY */}
        {activePlanner === 'firstSalary' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-brand-500" />
              <span>First Paycheck Distribution</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-brand-500/10 border"><span className="text-xs font-bold text-slate-400">Needs (50%)</span><div className="text-xl font-black text-brand-600">{formatCurrency(planResult.needs)}</div></div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border"><span className="text-xs font-bold text-slate-400">Wants (30%)</span><div className="text-xl font-black text-amber-600">{formatCurrency(planResult.wants)}</div></div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border"><span className="text-xs font-bold text-slate-400">Savings (12%)</span><div className="text-xl font-black text-emerald-600">{formatCurrency(planResult.savings)}</div></div>
              <div className="p-4 rounded-2xl bg-violet-500/10 border"><span className="text-xs font-bold text-slate-400">Emergency (8%)</span><div className="text-xl font-black text-violet-600">{formatCurrency(planResult.emergency)}</div></div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
              <span>{planResult.investmentTip}</span>
            </div>
          </div>
        )}

        {/* PLANNER 4: TRAVEL PLANNER */}
        {activePlanner === 'travel' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Plane className="w-6 h-6 text-brand-500" />
              <span>Travel & Vacation Budget</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Stay & Hotel</span><div className="text-xl font-black">{formatCurrency(planResult.stay)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Flights/Transport</span><div className="text-xl font-black">{formatCurrency(planResult.transport)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Food & Dining</span><div className="text-xl font-black">{formatCurrency(planResult.food)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Buffer Reserve</span><div className="text-xl font-black text-emerald-500">{formatCurrency(planResult.emergencyBuffer)}</div></div>
            </div>
            <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Total Trip Budget: <strong className="text-xl font-black text-brand-600">{formatCurrency(planResult.totalCost)}</strong></span>
              <span className="text-sm font-extrabold text-brand-600">Daily Cap: {formatCurrency(planResult.dailyLimit)}/day</span>
            </div>
          </div>
        )}

        {/* PLANNER 5: HOME PLANNER */}
        {activePlanner === 'home' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-6 h-6 text-brand-500" />
              <span>Home Rent vs Buying</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Target Home Value</span><div className="text-xl font-black">{formatCurrency(planResult.homeValue)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">20% Down Payment</span><div className="text-xl font-black text-brand-600">{formatCurrency(planResult.downPayment)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Est. Loan EMI</span><div className="text-xl font-black text-rose-500">{formatCurrency(planResult.estEmi)}/mo</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Current Rent</span><div className="text-xl font-black">{formatCurrency(planResult.currentRent)}/mo</div></div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{planResult.rentVsBuyTip}</span>
            </div>
          </div>
        )}

        {/* PLANNER 6: VEHICLE TCO */}
        {activePlanner === 'vehicle' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="w-6 h-6 text-brand-500" />
              <span>Vehicle Total Ownership Cost</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Car Price</span><div className="text-xl font-black">{formatCurrency(planResult.carPrice)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Monthly EMI</span><div className="text-xl font-black text-brand-600">{formatCurrency(planResult.emi)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Fuel & Charging</span><div className="text-xl font-black">{formatCurrency(planResult.fuel)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Insurance & Maintenance</span><div className="text-xl font-black">{formatCurrency(planResult.insurance)}</div></div>
            </div>
            <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-center font-black text-lg text-violet-600">
              Total Monthly Ownership Cost: {formatCurrency(planResult.totalMonthlyTco)} / month
            </div>
          </div>
        )}

        {/* PLANNER 7: MBA ABROAD */}
        {activePlanner === 'mba' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-500" />
              <span>MBA / MS Abroad Calculator</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Tuition & Fees</span><div className="text-xl font-black">{formatCurrency(planResult.tuition)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Living Costs</span><div className="text-xl font-black">{formatCurrency(planResult.living)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Education Loan Needed</span><div className="text-xl font-black text-rose-500">{formatCurrency(planResult.loanNeeded)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Post-Grad Salary Est.</span><div className="text-xl font-black text-emerald-500">{formatCurrency(planResult.postGradSalaryEst)}/yr</div></div>
            </div>
            <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-500 shrink-0" />
              <span>Estimated Loan Payback Period: <strong>{planResult.paybackYears} Years</strong></span>
            </div>
          </div>
        )}

        {/* PLANNER 8: WEDDING PLANNER */}
        {activePlanner === 'wedding' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500" />
              <span>Wedding Event Budget</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Venue</span><div className="text-lg font-black">{formatCurrency(planResult.venue)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Catering ({planResult.guests} Guests)</span><div className="text-lg font-black">{formatCurrency(planResult.food)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Apparel</span><div className="text-lg font-black">{formatCurrency(planResult.apparel)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Photo & Video</span><div className="text-lg font-black">{formatCurrency(planResult.photo)}</div></div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border"><span className="text-xs font-bold text-slate-400">Decor</span><div className="text-lg font-black">{formatCurrency(planResult.decor)}</div></div>
            </div>
            <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-center font-black text-xl text-violet-600">
              Total Wedding Budget: {formatCurrency(planResult.totalCost)}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

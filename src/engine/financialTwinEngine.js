// Financial Twin - AI Financial Modeling Engine

export const DEFAULT_USER_PROFILE = {
  name: "Demo User",
  age: 24,
  city: "Mumbai",
  monthlyIncome: 50000,
  salarySources: [
    { name: "Primary Salary", amount: 50000 }
  ],
  fixedExpenses: 24000, // Rent, Bills, Groceries
  variableExpenses: 11000, // Dining out, Shopping, Fun
  currentSavings: 120000,
  investments: 45000, // Mutual funds, SIPs
  debtEmis: 0,
  emergencyFund: 60000,
  dependents: 0,
  lifestyle: "Moderate", // Budget, Moderate, Premium
  riskTolerance: "Moderate",
  goals: [
    { id: "g1", name: "Europe Vacation Fund", targetAmount: 200000, currentAmount: 85000, category: "Travel", targetMonths: 10 },
    { id: "g2", name: "Workstation Upgrade", targetAmount: 80000, currentAmount: 42000, category: "Tech", targetMonths: 5 },
    { id: "g3", name: "6-Month Emergency Fund", targetAmount: 180000, currentAmount: 60000, category: "Safety", targetMonths: 12 }
  ],
  recentPurchases: [
    { date: "2026-09-20", name: "Dining Out & Party", amount: 4500, category: "Food & Fun" },
    { date: "2026-09-15", name: "Branded Apparel", amount: 5200, category: "Shopping" },
    { date: "2026-09-10", name: "Electronics Accessory", amount: 2800, category: "Tech" },
    { date: "2026-09-02", name: "Weekend Getaway", amount: 7500, category: "Travel" }
  ]
};

// CITIES DATA FOR CITY PLANNER & RELOCATION SIMULATOR
export const CITIES_DATA = {
  Mumbai: { rentIndex: 1.4, foodIndex: 1.2, transportIndex: 1.1, avgRent1BHK: 22000, tag: "Financial Hub" },
  Bangalore: { rentIndex: 1.25, foodIndex: 1.1, transportIndex: 1.2, avgRent1BHK: 18000, tag: "Tech Capital" },
  Pune: { rentIndex: 0.9, foodIndex: 0.95, transportIndex: 0.9, avgRent1BHK: 13000, tag: "Student & Tech City" },
  Delhi: { rentIndex: 1.15, foodIndex: 1.05, transportIndex: 1.0, avgRent1BHK: 16000, tag: "Capital Region" },
  Hyderabad: { rentIndex: 0.95, foodIndex: 0.9, transportIndex: 0.95, avgRent1BHK: 14000, tag: "IT & Pharma" },
  Chennai: { rentIndex: 0.85, foodIndex: 0.85, transportIndex: 0.85, avgRent1BHK: 12000, tag: "Automotive Hub" }
};

/**
 * 1. SIMULATE SINGLE DECISION (WHAT-IF LAB CORE USP)
 */
export function simulateDecision(profile, itemName, costAmount) {
  const cost = Math.max(100, Number(costAmount) || 0);
  const monthlyDisposable = profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses - profile.debtEmis;
  const currentTotalLiquid = profile.currentSavings + profile.emergencyFund;
  const newSavings = Math.max(0, profile.currentSavings - cost);
  
  // If savings insufficient, dip into emergency fund
  const emergencyDip = cost > profile.currentSavings ? cost - profile.currentSavings : 0;
  const newEmergencyFund = Math.max(0, profile.emergencyFund - emergencyDip);
  const newTotalLiquid = newSavings + newEmergencyFund;

  // Calculate recovery time in months
  const monthlySavingsRate = Math.max(1000, monthlyDisposable);
  const recoveryMonths = (cost / monthlySavingsRate).toFixed(1);

  // Goal delay calculation
  const primaryGoal = profile.goals[0];
  const goalRemaining = primaryGoal ? (primaryGoal.targetAmount - primaryGoal.currentAmount) : 100000;
  const origMonthsToGoal = goalRemaining / monthlySavingsRate;
  const newMonthsToGoal = (goalRemaining + cost) / monthlySavingsRate;
  const goalDelayDays = Math.round((newMonthsToGoal - origMonthsToGoal) * 30);

  // Financial Risk Score (0 - 100)
  let riskScore = 20;
  if (cost > currentTotalLiquid * 0.5) riskScore += 45;
  else if (cost > currentTotalLiquid * 0.25) riskScore += 25;
  if (emergencyDip > 0) riskScore += 30;
  if (cost > monthlyDisposable * 3) riskScore += 20;
  riskScore = Math.min(99, Math.max(10, riskScore));

  // Opportunity Cost
  const fdReturns5Yr = Math.round(cost * (Math.pow(1.07, 5) - 1));
  const sipReturns5Yr = Math.round(cost * (Math.pow(1.12, 5) - 1));

  // Recommendation & Alternative
  let recommendation = "Affordable with low financial strain.";
  let alternative = `Save ₹${Math.round(cost / 3).toLocaleString('en-IN')}/month for 3 months instead of buying immediately.`;
  if (riskScore >= 70) {
    recommendation = "High financial strain! This purchase consumes over half your savings and delays major goals.";
    alternative = `Consider looking for a refurbished or tier-2 alternative around ₹${Math.round(cost * 0.4).toLocaleString('en-IN')}.`;
  } else if (riskScore >= 45) {
    recommendation = "Moderate impact. Purchase is doable but will delay your " + (primaryGoal ? primaryGoal.name : "goals") + ".";
  }

  return {
    itemName,
    cost,
    currentSavings: profile.currentSavings,
    newSavings,
    currentEmergencyFund: profile.emergencyFund,
    newEmergencyFund,
    emergencyDip,
    recoveryMonths,
    goalDelayDays,
    riskScore,
    opportunityCost: {
      fd5Yr: fdReturns5Yr,
      sip5Yr: sipReturns5Yr
    },
    recommendation,
    alternative
  };
}

/**
 * 2. PARALLEL UNIVERSES GENERATOR (5 MULTI-TIMELINE PROJECTIONS)
 */
export function generateParallelUniverses(profile) {
  const baseIncome = profile.monthlyIncome;
  const baseSavingsRate = baseIncome - profile.fixedExpenses - profile.variableExpenses;

  // Universe A: Current Trajectory
  const univA = buildUniverseTimeline(profile, "Universe A", "Current Baseline", 0, 0, 0);

  // Universe B: Save ₹5,000 more / month
  const univB = buildUniverseTimeline(profile, "Universe B", "Save +₹5,000 / month", 0, 5000, 0);

  // Universe C: Reduce Food Delivery & Impulse Spend (-₹4,000/mo)
  const univC = buildUniverseTimeline(profile, "Universe C", "Cut Food & Impulse Spend", 0, 4000, 0);

  // Universe D: +₹10,000 Income Boost (Promotion/Freelance)
  const univD = buildUniverseTimeline(profile, "Universe D", "+₹10,000 Income Growth", 10000, 6000, 0);

  // Universe E: Relocate to Cheaper City (Pune/Hyderabad - Rent & Cost Savings)
  const univE = buildUniverseTimeline(profile, "Universe E", "Relocate to Low-Cost City", 0, 8000, -5000);

  return [univA, univB, univC, univD, univE];
}

function buildUniverseTimeline(profile, name, tagline, incomeBoost, extraSavings, rentChange) {
  const currentTotal = profile.currentSavings + profile.investments;
  const monthlySavings = (profile.monthlyIncome + incomeBoost - (profile.fixedExpenses + rentChange) - profile.variableExpenses) + extraSavings;
  const annualSavings = monthlySavings * 12;

  // Compound growth at 8% annual return on investments
  const yr1 = Math.round(currentTotal * 1.08 + annualSavings);
  const yr3 = Math.round(currentTotal * Math.pow(1.08, 3) + annualSavings * 3.24);
  const yr5 = Math.round(currentTotal * Math.pow(1.08, 5) + annualSavings * 5.86);

  const mainGoal = profile.goals[0];
  const goalTarget = mainGoal ? (mainGoal.targetAmount - mainGoal.currentAmount) : 100000;
  const goalMonths = Math.max(1, Math.round(goalTarget / Math.max(1000, monthlySavings)));
  const goalDate = new Date();
  goalDate.setMonth(goalDate.getMonth() + goalMonths);
  const goalDateStr = goalDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  const emergencyMonths = ((profile.emergencyFund + monthlySavings * 6) / Math.max(1000, profile.fixedExpenses)).toFixed(1);

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    tagline,
    monthlySavings,
    yr1NetWorth: yr1,
    yr3NetWorth: yr3,
    yr5NetWorth: yr5,
    goalCompletionDate: goalDateStr,
    emergencyMonths,
    disposableIncome: Math.max(0, monthlySavings)
  };
}

/**
 * 3. LIFE MODE PLANNERS CALCULATOR
 */
export function calculateLifePlan(modeType, inputs, profile) {
  switch (modeType) {
    case 'city': {
      const city = CITIES_DATA[inputs.city] || CITIES_DATA.Mumbai;
      const rent = inputs.rent || city.avgRent1BHK;
      const food = Math.round(8000 * city.foodIndex);
      const transport = Math.round(3500 * city.transportIndex);
      const misc = 6000;
      const totalCost = rent + food + transport + misc;
      const requiredSalary = Math.round(totalCost / 0.65);
      const savingsPotential = Math.max(0, (inputs.income || profile.monthlyIncome) - totalCost);
      const movingFeasibility = savingsPotential > 10000 ? "High Feasibility" : savingsPotential > 3000 ? "Moderate" : "Tight Budget Risk";

      return {
        modeType,
        cityName: inputs.city,
        rent,
        food,
        transport,
        misc,
        totalCost,
        requiredSalary,
        savingsPotential,
        movingFeasibility
      };
    }
    case 'student': {
      const hostel = inputs.hostel || 12000;
      const food = inputs.food || 5000;
      const collegeFees = inputs.fees || 6000;
      const books = inputs.books || 2000;
      const entertainment = inputs.fun || 3000;
      const totalCost = hostel + food + collegeFees + books + entertainment;

      return {
        modeType,
        hostel,
        food,
        collegeFees,
        books,
        entertainment,
        totalCost,
        suggestedAllowance: Math.round(totalCost * 1.1)
      };
    }
    case 'firstSalary': {
      const income = inputs.income || profile.monthlyIncome;
      const needs = Math.round(income * 0.50);
      const wants = Math.round(income * 0.30);
      const savings = Math.round(income * 0.12);
      const emergency = Math.round(income * 0.08);

      return {
        modeType,
        income,
        needs,
        wants,
        savings,
        emergency,
        investmentTip: "Start an automated ₹3,000 monthly Index Fund SIP immediately on your 1st payday!"
      };
    }
    case 'travel': {
      const days = inputs.days || 5;
      const dest = inputs.destination || "Goa Beach Trip";
      const stay = (inputs.style === 'Luxury' ? 6000 : inputs.style === 'Budget' ? 1500 : 3500) * days;
      const transport = inputs.style === 'Luxury' ? 15000 : 6000;
      const food = 1200 * days;
      const activities = 1500 * days;
      const emergencyBuffer = 4000;
      const totalCost = stay + transport + food + activities + emergencyBuffer;
      const dailyLimit = Math.round((food + activities) / days);

      return {
        modeType,
        dest,
        days,
        stay,
        transport,
        food,
        activities,
        emergencyBuffer,
        totalCost,
        dailyLimit
      };
    }
    case 'home': {
      const homeValue = inputs.homeValue || 6000000;
      const downPayment = Math.round(homeValue * 0.20);
      const loanAmount = homeValue - downPayment;
      const estEmi = Math.round((loanAmount * 0.085) / 12);
      const currentRent = inputs.currentRent || 22000;
      const rentVsBuyTip = estEmi > currentRent * 1.8 ? "Renting & Investing the difference is financially wiser right now." : "Buying is viable if you have down payment saved.";

      return {
        modeType,
        homeValue,
        downPayment,
        loanAmount,
        estEmi,
        currentRent,
        rentVsBuyTip
      };
    }
    case 'vehicle': {
      const carPrice = inputs.carPrice || 1000000;
      const downPayment = Math.round(carPrice * 0.20);
      const loanAmount = carPrice - downPayment;
      const emi = Math.round((loanAmount * 0.09) / 12 / 5 * 1.2);
      const fuel = 6000;
      const insurance = 2500;
      const totalMonthlyTco = emi + fuel + insurance;

      return {
        modeType,
        carPrice,
        downPayment,
        emi,
        fuel,
        insurance,
        totalMonthlyTco
      };
    }
    case 'mba': {
      const tuition = inputs.tuition || 2500000;
      const living = 1200000;
      const totalCost = tuition + living;
      const loanNeeded = Math.max(0, totalCost - (inputs.savings || profile.currentSavings));
      const postGradSalaryEst = 1800000;

      return {
        modeType,
        tuition,
        living,
        totalCost,
        loanNeeded,
        postGradSalaryEst,
        paybackYears: (loanNeeded / (postGradSalaryEst * 0.4)).toFixed(1)
      };
    }
    case 'wedding': {
      const guests = inputs.guests || 250;
      const venue = 300000;
      const food = guests * 900;
      const apparel = 150000;
      const photo = 100000;
      const decor = 120000;
      const totalCost = venue + food + apparel + photo + decor;

      return {
        modeType,
        guests,
        venue,
        food,
        apparel,
        photo,
        decor,
        totalCost
      };
    }
    default:
      return null;
  }
}

/**
 * 4. AFFORDABILITY & REGRET PREDICTOR ENGINE
 */
export function evaluateAffordability(profile, itemName, priceAmount) {
  const price = Math.max(100, Number(priceAmount) || 0);
  const monthlyDisposable = profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses;
  const currentSavings = profile.currentSavings;
  const primaryGoal = profile.goals[0];

  // Regret Risk Calculation (0 - 100%)
  let regretRisk = 30;
  
  // Frequency check against recent purchases
  const similarPurchases = profile.recentPurchases.filter(p => p.amount > 2500);
  if (similarPurchases.length >= 2) regretRisk += 25;
  if (price > monthlyDisposable) regretRisk += 20;
  if (price > currentSavings * 0.3) regretRisk += 15;
  if (primaryGoal && (primaryGoal.targetAmount - primaryGoal.currentAmount < 50000)) regretRisk += 10;

  regretRisk = Math.min(95, Math.max(12, regretRisk));

  // Goal Impact (Days Delayed)
  const daysDelayed = Math.round((price / Math.max(500, monthlyDisposable)) * 30);

  // Status & Guidance
  let status = "Moderate Impact";
  let statusColor = "amber";
  if (price <= monthlyDisposable * 0.3 && regretRisk < 40) {
    status = "Safely Affordable";
    statusColor = "emerald";
  } else if (regretRisk >= 65 || price > currentSavings * 0.5) {
    status = "High Regret Risk & Financial Strain";
    statusColor = "rose";
  }

  const advice = regretRisk > 60
    ? `Wait 14 days before purchasing. Similar purchases were made recently, and buying now delays your ${primaryGoal?.name || 'goals'} by ${daysDelayed} days.`
    : `Purchase is within your means. Ensure you maintain your ₹${profile.emergencyFund.toLocaleString('en-IN')} emergency reserve intact.`;

  return {
    itemName,
    price,
    regretRisk,
    daysDelayed,
    status,
    statusColor,
    advice,
    reasons: [
      similarPurchases.length > 0 ? `Made ${similarPurchases.length} discretionary purchases over ₹2,500 recently.` : "Discretionary spending is moderate.",
      price > monthlyDisposable ? "Price exceeds 1 month's free cash flow." : "Price fits within monthly free cash flow.",
      `Will push back ${primaryGoal?.name || 'primary goal'} target by ~${daysDelayed} days.`
    ]
  };
}

/**
 * 5. BUDGET DNA CLASSIFIER
 */
export function classifyBudgetDNA(profile) {
  const savingsRate = Math.round(((profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses) / profile.monthlyIncome) * 100);
  const emergencyMonths = (profile.emergencyFund / Math.max(1000, profile.fixedExpenses)).toFixed(1);

  const tags = [];
  
  if (savingsRate >= 30) tags.push({ title: "🎯 Goal Driven", color: "emerald font-extrabold", desc: "Consistently prioritizes long-term wealth building & goal allocation." });
  if (profile.variableExpenses > profile.monthlyIncome * 0.25) tags.push({ title: "🍔 Convenience Spender", color: "amber font-extrabold", desc: "Higher propensity for dining out, food delivery, and quick comforts." });
  if (emergencyMonths >= 5) tags.push({ title: "🛡️ Emergency Conscious", color: "cyan font-extrabold", desc: "Maintains a robust multi-month liquidity buffer against shocks." });
  if (profile.goals.some(g => g.category === 'Travel')) tags.push({ title: "✈️ Experience First", color: "brand font-extrabold", desc: "Values life experiences, travel, and memories over material hoarding." });
  if (profile.investments > profile.currentSavings * 0.5) tags.push({ title: "📈 Investment Focused", color: "violet font-extrabold", desc: "Actively puts money to work in compounding investment assets." });
  if (tags.length === 0) tags.push({ title: "⚖️ Balanced Navigator", color: "brand font-extrabold", desc: "Maintains standard baseline balance between needs and wants." });

  return {
    savingsRate,
    emergencyMonths,
    tags,
    recommendation: "Your Budget DNA shows high goal momentum. Automate 15% of your income into mutual fund SIPs right on salary day!"
  };
}

/**
 * 6. FINANCIAL STRESS TEST & SHOCK SIMULATOR
 */
export function runStressTest(scenarioType, profile) {
  const fixed = profile.fixedExpenses;
  const currentReserve = profile.emergencyFund + profile.currentSavings;

  let shockTitle = "3-Month Job Loss";
  let shockIncome = 0;
  let shockExpense = fixed;

  if (scenarioType === 'medical') {
    shockTitle = "₹1.5 Lakh Unexpected Medical Crisis";
    const emergencyDip = Math.min(currentReserve, 150000);
    const remainingReserve = currentReserve - emergencyDip;
    const months = (remainingReserve / fixed).toFixed(1);

    return {
      shockTitle,
      remainingReserve,
      survivalMonths: months,
      mitigationTip: "Ensure top-up health insurance of ₹10 Lakhs (costing ~₹600/mo) to protect your liquid savings."
    };
  } else if (scenarioType === 'salaryCut') {
    shockTitle = "30% Salary Reduction";
    shockIncome = profile.monthlyIncome * 0.7;
    const monthlyDeficit = fixed - shockIncome;
    const months = monthlyDeficit > 0 ? (currentReserve / monthlyDeficit).toFixed(1) : 99;

    return {
      shockTitle,
      shockIncome,
      survivalMonths: months > 50 ? "Infinite (Income covers fixed needs)" : `${months} Months`,
      mitigationTip: "Cut variable discretionary spend (dining/shopping) to maintain positive monthly cash flow."
    };
  }

  // Job Loss Default
  const months = (currentReserve / fixed).toFixed(1);
  return {
    shockTitle,
    survivalMonths: `${months} Months`,
    monthlyBurn: fixed,
    mitigationTip: "Immediately pause all non-essential subscriptions and shift to zero-based essential spending."
  };
}

/**
 * 7. AI MONEY COACH RESPONSE GENERATOR
 */
export function generateCoachResponse(query, profile) {
  const q = query.toLowerCase();
  const disposable = profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses;

  if (q.includes("macbook") || q.includes("laptop") || q.includes("phone") || q.includes("iphone")) {
    const sim = simulateDecision(profile, "Gadget Purchase", 85000);
    return `**Financial Simulation Result for Gadget Purchase (₹85,000):**\n\n- **Immediate Savings Impact**: Savings drop from ₹${profile.currentSavings.toLocaleString('en-IN')} to ₹${sim.newSavings.toLocaleString('en-IN')}.\n- **Goal Delay**: Pushes your ${profile.goals[0]?.name || 'primary goal'} back by **${sim.goalDelayDays} days**.\n- **Recovery Time**: Takes **${sim.recoveryMonths} months** of disciplined savings to rebuild.\n\n💡 **Smart Alternative**: Save ₹7,000/month into a dedicated 12-month zero-interest bucket instead of buying outright today!`;
  }

  if (q.includes("mumbai") || q.includes("move") || q.includes("relocate")) {
    const citySim = calculateLifePlan('city', { city: 'Mumbai', income: profile.monthlyIncome }, profile);
    return `**Relocation Simulation (Moving to Mumbai):**\n\n- **Estimated Monthly Rent (1BHK)**: ₹${citySim.rent.toLocaleString('en-IN')}\n- **Total Monthly Living Cost**: ₹${citySim.totalCost.toLocaleString('en-IN')}\n- **Savings Potential**: ₹${citySim.savingsPotential.toLocaleString('en-IN')}/month.\n\n📍 **Verdict**: ${citySim.movingFeasibility}. To live comfortably in Mumbai, target a salary of ₹${citySim.requiredSalary.toLocaleString('en-IN')}/month.`;
  }

  if (q.includes("goa") || q.includes("vacation") || q.includes("trip") || q.includes("travel")) {
    const travelSim = calculateLifePlan('travel', { destination: 'Goa', days: 5, style: 'Moderate' }, profile);
    return `**Travel Simulation (5-Day Goa Trip):**\n\n- **Total Estimated Cost**: ₹${travelSim.totalCost.toLocaleString('en-IN')}\n- **Daily Spending Limit**: ₹${travelSim.dailyLimit.toLocaleString('en-IN')}/day\n\n✈️ **Action Plan**: Allocate ₹${Math.round(travelSim.totalCost / 3).toLocaleString('en-IN')}/month for the next 3 months to fund this trip without touching your emergency reserve!`;
  }

  return `Based on your Financial Twin model (Income: ₹${profile.monthlyIncome.toLocaleString('en-IN')}/mo, Free Cash Flow: ₹${disposable.toLocaleString('en-IN')}/mo):\n\nYou currently have **${(profile.emergencyFund / profile.fixedExpenses).toFixed(1)} months** of emergency survival runway and **₹${profile.currentSavings.toLocaleString('en-IN')}** in liquid savings. Let me know what scenario or purchase you want to simulate!`;
}

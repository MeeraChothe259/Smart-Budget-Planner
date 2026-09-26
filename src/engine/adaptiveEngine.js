import { PRIORITIES } from '../data/planningModes';

/**
 * Calculates adaptive budget allocation for a given planning mode, budget, and priority.
 */
export function calculateAllocation(mode, budget, priorityId = 'COMFORT') {
  if (!mode || !mode.categories || mode.categories.length === 0) return null;
  const safeBudget = Math.max(1000, Number(budget) || 0);

  const priorityObj = PRIORITIES.find(p => p.id === priorityId) || PRIORITIES[1];

  // Raw weight calculation per category
  let totalWeightedFactor = 0;
  const rawCategoryFactors = mode.categories.map(cat => {
    let multiplier = 1.0;
    if (cat.type === 'RESERVE') {
      multiplier = priorityObj.reserveBoost;
    } else if (cat.type === 'WANT') {
      multiplier = priorityObj.wantMultiplier;
    } else if (cat.type === 'NEED') {
      multiplier = priorityObj.needMultiplier;
    }

    // Additional boost if priority targets this category
    if (priorityObj.priorityCategoryType && cat.id.includes(priorityObj.priorityCategoryType)) {
      multiplier *= 1.4;
    }

    // Lower budget scaling: boost NEEDs and RESERVEE even more when budget is low relative to mode default
    const budgetRatio = safeBudget / mode.defaultBudget;
    if (budgetRatio < 0.7) {
      if (cat.type === 'NEED') multiplier *= (1.3 - budgetRatio * 0.3);
      if (cat.type === 'RESERVE') multiplier *= 1.2;
      if (cat.type === 'WANT') multiplier *= Math.max(0.15, budgetRatio);
    } else if (budgetRatio > 1.3) {
      if (cat.type === 'WANT') multiplier *= 1.25;
      if (cat.type === 'RESERVE') multiplier *= 1.3;
    }

    const factor = cat.basePercentage * multiplier;
    totalWeightedFactor += factor;
    return { ...cat, factor };
  });

  // Calculate preliminary amounts
  let allocatedSum = 0;
  let allocatedCategories = rawCategoryFactors.map(cat => {
    const share = cat.factor / totalWeightedFactor;
    let amount = Math.round(safeBudget * share);
    
    // Ensure minAmount for needs
    if (cat.type === 'NEED' && cat.minAmount && safeBudget > mode.minBudget) {
      amount = Math.max(amount, Math.min(cat.minAmount, Math.round(safeBudget * 0.15)));
    }
    
    allocatedSum += amount;
    return {
      ...cat,
      amount,
      sharePct: (share * 100).toFixed(1)
    };
  });

  // Re-normalize exact sum to match total budget
  const diff = safeBudget - allocatedSum;
  if (diff !== 0 && allocatedCategories.length > 0) {
    // Distribute diff to highest flexible or reserve category if positive, or lowest flexible if negative
    if (diff > 0) {
      const reserveOrFlex = allocatedCategories.find(c => c.type === 'RESERVE') || allocatedCategories[0];
      reserveOrFlex.amount += diff;
    } else {
      // Subtract excess from flexible items first
      let remainingSub = Math.abs(diff);
      for (let i = allocatedCategories.length - 1; i >= 0 && remainingSub > 0; i--) {
        if (allocatedCategories[i].type === 'WANT') {
          const deduct = Math.min(allocatedCategories[i].amount - 100, remainingSub);
          if (deduct > 0) {
            allocatedCategories[i].amount -= deduct;
            remainingSub -= deduct;
          }
        }
      }
      if (remainingSub > 0) {
        allocatedCategories[0].amount = Math.max(100, allocatedCategories[0].amount - remainingSub);
      }
    }
  }

  // Recalculate percentages & summary totals
  let totalNeeds = 0;
  let totalWants = 0;
  let totalReserve = 0;

  allocatedCategories = allocatedCategories.map(cat => {
    const finalPct = Math.round((cat.amount / safeBudget) * 100);
    if (cat.type === 'NEED') totalNeeds += cat.amount;
    else if (cat.type === 'WANT') totalWants += cat.amount;
    else if (cat.type === 'RESERVE') totalReserve += cat.amount;

    return {
      ...cat,
      percentage: finalPct
    };
  });

  const needsPct = Math.round((totalNeeds / safeBudget) * 100);
  const wantsPct = Math.round((totalWants / safeBudget) * 100);
  const reservePct = 100 - needsPct - wantsPct;

  return {
    totalBudget: safeBudget,
    modeId: mode.id,
    priorityId,
    categories: allocatedCategories,
    summary: {
      totalNeeds,
      totalWants,
      totalReserve,
      needsPct,
      wantsPct,
      reservePct
    }
  };
}

/**
 * Computes difference between previous plan and current plan to explain adaptation.
 */
export function computePlanDelta(prevPlan, currentPlan, mode) {
  if (!prevPlan || !currentPlan) return null;

  const budgetDelta = currentPlan.totalBudget - prevPlan.totalBudget;
  const isDecrease = budgetDelta < 0;
  const isIncrease = budgetDelta > 0;
  const isUnchanged = budgetDelta === 0;

  const categoryDiffs = currentPlan.categories.map(curr => {
    const prev = prevPlan.categories.find(c => c.id === curr.id);
    const prevAmount = prev ? prev.amount : 0;
    const diffAmount = curr.amount - prevAmount;
    const pctChange = prevAmount > 0 ? ((diffAmount / prevAmount) * 100).toFixed(0) : 0;

    let status = 'UNCHANGED';
    if (diffAmount > 50) status = 'INCREASED';
    else if (diffAmount < -50) status = 'REDUCED';
    else if (curr.type === 'NEED' && isDecrease && Math.abs(diffAmount) <= 1000) status = 'PROTECTED';
    else if (curr.type === 'RESERVE' && isDecrease && diffAmount >= 0) status = 'PROTECTED';

    return {
      id: curr.id,
      name: curr.name,
      icon: curr.icon,
      type: curr.type,
      prevAmount,
      currAmount: curr.amount,
      diffAmount,
      pctChange,
      status
    };
  });

  // Build Natural Language Reasoning
  let reasoningHeading = '';
  let reasoningDetails = '';

  if (isDecrease) {
    const cutWants = categoryDiffs.filter(d => d.type === 'WANT' && d.diffAmount < 0);
    const protectedNeeds = categoryDiffs.filter(d => (d.type === 'NEED' || d.type === 'RESERVE') && d.status === 'PROTECTED');
    
    reasoningHeading = `Your budget decreased by ₹${Math.abs(budgetDelta).toLocaleString('en-IN')}.`;
    
    if (cutWants.length > 0) {
      const highestCut = [...cutWants].sort((a, b) => a.diffAmount - b.diffAmount)[0];
      reasoningDetails = `Essential expenses and emergency reserves were prioritized first. Flexible expenses like ${highestCut.name} were reduced (${highestCut.pctChange}%) to absorb the shortfall.`;
    } else {
      reasoningDetails = `Essential categories were proportionally adjusted while maintaining minimum emergency safety thresholds.`;
    }
  } else if (isIncrease) {
    reasoningHeading = `Your budget increased by ₹${budgetDelta.toLocaleString('en-IN')}.`;
    const reserveDiff = categoryDiffs.find(d => d.type === 'RESERVE');
    if (reserveDiff && reserveDiff.diffAmount > 0) {
      reasoningDetails = `Funds were first routed to strengthen your Emergency Reserve (+₹${reserveDiff.diffAmount.toLocaleString('en-IN')}), followed by boosting flexible upgrades.`;
    } else {
      reasoningDetails = `Additional funds were distributed to enhance comfort and scale flexible categories without risking essentials.`;
    }
  } else {
    reasoningHeading = `Budget locked at ₹${currentPlan.totalBudget.toLocaleString('en-IN')}.`;
    reasoningDetails = `Plan is optimized according to the selected "${mode.name}" guidelines and priority rules.`;
  }

  return {
    budgetDelta,
    isDecrease,
    isIncrease,
    isUnchanged,
    categoryDiffs,
    reasoningHeading,
    reasoningDetails
  };
}

/**
 * Calculates Budget Health Score (0 - 100) and breakdown components.
 */
export function calculateBudgetHealth(plan, mode) {
  if (!plan) return { score: 75, label: 'Good', components: [] };

  const { needsPct, wantsPct, reservePct } = plan.summary;
  const budgetRatio = plan.totalBudget / mode.defaultBudget;

  // 1. Essential Coverage score (Ideal: needs <= 60% of total)
  let essentialScore = 100;
  if (needsPct > 70) essentialScore = Math.max(40, 100 - (needsPct - 70) * 3);
  else if (needsPct < 30) essentialScore = 85;

  // 2. Reserve / Savings Score (Ideal: reserve >= 15%)
  let reserveScore = Math.min(100, Math.round((reservePct / 15) * 100));

  // 3. Needs vs Wants Balance Score (Ideal: wants between 15% and 35%)
  let balanceScore = 90;
  if (wantsPct > 45) balanceScore = 65;
  else if (wantsPct < 10) balanceScore = 75;

  // 4. Flexibility Index
  let flexScore = Math.min(100, Math.round((wantsPct + reservePct) * 1.5));

  // Overall Weighted Score
  const overallScore = Math.min(99, Math.max(25, Math.round(
    essentialScore * 0.35 +
    reserveScore * 0.30 +
    balanceScore * 0.20 +
    flexScore * 0.15
  )));

  let label = 'Healthy & Resilient';
  let color = 'emerald';
  if (overallScore >= 85) { label = 'Optimal & Robust'; color = 'emerald'; }
  else if (overallScore >= 70) { label = 'Healthy & Balanced'; color = 'brand'; }
  else if (overallScore >= 50) { label = 'Constrained Budget'; color = 'amber'; }
  else { label = 'Emergency Pressure'; color = 'rose'; }

  const components = [
    { name: 'Essential Coverage', score: Math.round(essentialScore), value: `${100 - needsPct}% Safe`, desc: 'Measures how comfortably non-negotiable expenses are funded.' },
    { name: 'Savings / Reserve', score: Math.round(reserveScore), value: `${reservePct}% Reserve`, desc: 'Evaluates your financial buffer against unexpected expenses.' },
    { name: 'Needs vs Wants Balance', score: Math.round(balanceScore), value: `${needsPct}/${wantsPct} Ratio`, desc: 'Measures standard 50/30/20 financial rule alignment.' },
    { name: 'Flexibility Index', score: Math.round(flexScore), value: `${wantsPct}% Flexible`, desc: 'Indicates how easily your plan can absorb future budget drops.' },
  ];

  return {
    score: overallScore,
    label,
    color,
    components
  };
}

/**
 * Generates contextual smart insights based on plan state.
 */
export function generateSmartInsights(plan, mode, delta) {
  if (!plan) return [];
  const insights = [];

  const { needsPct, wantsPct, reservePct, totalReserve } = plan.summary;

  if (reservePct >= 20) {
    insights.push({
      type: 'positive',
      icon: '🛡️',
      title: 'Strong Safety Net',
      message: `Your reserve of ₹${totalReserve.toLocaleString('en-IN')} (${reservePct}%) provides exceptional security against unexpected costs.`
    });
  } else if (reservePct < 10) {
    insights.push({
      type: 'warning',
      icon: '⚠️',
      title: 'Thin Reserve Margin',
      message: `Reserve is currently at ${reservePct}%. Consider lowering optional wants to protect against contingencies.`
    });
  }

  if (needsPct > 65) {
    insights.push({
      type: 'warning',
      icon: '📊',
      title: 'High Fixed Obligations',
      message: `Essential categories consume ${needsPct}% of your budget, making your plan vulnerable to price inflation.`
    });
  } else {
    insights.push({
      type: 'info',
      icon: '✨',
      title: 'Balanced Fixed Costs',
      message: `Essential expenses are under control at ${needsPct}%, leaving ample room for custom priorities.`
    });
  }

  if (delta && delta.isDecrease) {
    const cutItem = delta.categoryDiffs.find(d => d.status === 'REDUCED');
    if (cutItem) {
      insights.push({
        type: 'adaptive',
        icon: '⚡',
        title: 'Adaptive Buffer Engaged',
        message: `System scaled back ${cutItem.name} by ₹${Math.abs(cutItem.diffAmount).toLocaleString('en-IN')} to prevent essential default.`
      });
    }
  }

  // Alternative tip
  const highestWant = plan.categories.filter(c => c.type === 'WANT').sort((a,b) => b.amount - a.amount)[0];
  if (highestWant) {
    insights.push({
      type: 'opportunity',
      icon: '💡',
      title: 'Optimization Opportunity',
      message: `${highestWant.name} is your largest flexible expense (₹${highestWant.amount.toLocaleString('en-IN')}). Check Smart Alternatives to trim costs.`
    });
  }

  return insights;
}

/**
 * Generates AI Copilot response for interactive queries.
 */
export function generateCopilotAnswer(query, plan, mode, delta, healthScore, savingsGoal) {
  const q = query.toLowerCase();

  if (q.includes('save') || q.includes('cut') || q.includes('reduce')) {
    const wants = plan.categories.filter(c => c.type === 'WANT').sort((a,b) => b.amount - a.amount);
    if (wants.length > 0) {
      return `To save money quickly in **${mode.name}**, target your top flexible category: **${wants[0].name}** (currently ₹${wants[0].amount.toLocaleString('en-IN')}). Reducing it by 30% frees up ₹${Math.round(wants[0].amount * 0.3).toLocaleString('en-IN')} for savings!`;
    }
    return `Your plan is already lean with essentials consuming most of the budget. Look into Smart Alternatives for core categories to negotiate lower rates.`;
  }

  if (q.includes('change') || q.includes('why') || q.includes('adapt')) {
    if (delta && delta.reasoningHeading) {
      return `**${delta.reasoningHeading}**\n${delta.reasoningDetails}`;
    }
    return `When your budget changes, SmartBudget AI ranks categories by priority. Essential costs & emergency funds are shielded, while flexible expenses scale dynamically.`;
  }

  if (q.includes('goal') || q.includes('reach') || q.includes('target')) {
    if (savingsGoal && savingsGoal.targetAmount) {
      const reqMonthly = Math.round(savingsGoal.targetAmount / (savingsGoal.months || 1));
      const currentReserve = plan.summary.totalReserve;
      const isTrack = currentReserve >= reqMonthly;

      if (isTrack) {
        return `🎉 **You are ON TRACK!** Your current monthly reserve (₹${currentReserve.toLocaleString('en-IN')}) exceeds your target requirement of ₹${reqMonthly.toLocaleString('en-IN')}/month to hit ₹${savingsGoal.targetAmount.toLocaleString('en-IN')} in ${savingsGoal.months} months.`;
      } else {
        return `⚠️ **Needs Adjustment.** Your goal requires ₹${reqMonthly.toLocaleString('en-IN')}/month, but current monthly reserve is ₹${currentReserve.toLocaleString('en-IN')}. Shortfall: ₹${(reqMonthly - currentReserve).toLocaleString('en-IN')}/month. Switch priority to "Save More" to bridge the gap.`;
      }
    }
    return `Set a Savings Goal in the **🎯 Savings Goal** panel to compare your monthly target against your current plan reserve!`;
  }

  if (q.includes('improve') || q.includes('score') || q.includes('health')) {
    return `Your current Budget Health score is **${healthScore.score}/100** (${healthScore.label}). To boost your score above 90, aim for an emergency reserve of at least 15-20% and keep essential expenses under 60%.`;
  }

  return `I evaluated your **${mode.name}** plan of ₹${plan.totalBudget.toLocaleString('en-IN')}. Essentials take ${plan.summary.needsPct}%, flexible spending is ${plan.summary.wantsPct}%, and your reserve is ${plan.summary.reservePct}%. Let me know if you want to optimize specific categories!`;
}

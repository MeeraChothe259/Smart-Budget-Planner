import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BarChart3 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AllocationCharts({ plan }) {
  if (!plan || !plan.categories) return null;

  const categories = plan.categories;

  // Chart dataset colors
  const colors = [
    '#0c8ce9', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e',
    '#06b6d4', '#ec4899', '#84cc16', '#eab308', '#6366f1'
  ];

  const chartData = {
    labels: categories.map(c => `${c.icon} ${c.name}`),
    datasets: [
      {
        data: categories.map(c => c.amount),
        backgroundColor: colors.slice(0, categories.length),
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const val = context.raw || 0;
            const pct = Math.round((val / plan.totalBudget) * 100);
            return ` ₹${val.toLocaleString('en-IN')} (${pct}%)`;
          }
        }
      }
    },
    cutout: '68%',
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-cyan-400 flex items-center justify-center font-bold text-2xl">
            📊
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Category Money Charts
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Visual breakdown of how your money is divided
            </p>
          </div>
        </div>
        <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
          {categories.length} Active Categories
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Doughnut Chart */}
        <div className="lg:col-span-5 relative h-64 flex items-center justify-center">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Total Money
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ₹{plan.totalBudget.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Itemized Category Progress Bars - LARGE FONTS */}
        <div className="lg:col-span-7 space-y-3">
          {categories.map((cat, idx) => {
            const barColor = colors[idx % colors.length];

            return (
              <div key={cat.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {cat.name}
                    </span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                      cat.type === 'NEED' ? 'bg-brand-500/10 text-brand-600 dark:text-cyan-400' :
                      cat.type === 'WANT' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {cat.type === 'NEED' ? 'Must-Have' : cat.type === 'WANT' ? 'Fun Stuff' : 'Piggy Bank'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-black">
                    <span className="text-slate-900 dark:text-white">
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 font-extrabold">
                      ({cat.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: barColor
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, Sparkles, FileText, ArrowRight, Lightbulb } from 'lucide-react';

export default function ReceiptAnalyzerView({ profile, privacyMode, formatCurrency }) {
  const [analyzedReceipt, setAnalyzedReceipt] = useState({
    title: "Gourmet Dinner & Outing Receipt",
    totalAmount: 8420,
    items: [
      { name: "Fine Dining & Drinks", amount: 4200, category: "Food & Dining" },
      { name: "Retail Shopping", amount: 2100, category: "Shopping" },
      { name: "Cab & Transport", amount: 720, category: "Transport" },
      { name: "Movie Tickets & Snacks", amount: 1400, category: "Entertainment" }
    ]
  });

  const sampleReceipts = [
    {
      title: "Gourmet Dinner & Outing Receipt",
      totalAmount: 8420,
      items: [
        { name: "Fine Dining & Drinks", amount: 4200, category: "Food & Dining" },
        { name: "Retail Shopping", amount: 2100, category: "Shopping" },
        { name: "Cab & Transport", amount: 720, category: "Transport" },
        { name: "Movie Tickets & Snacks", amount: 1400, category: "Entertainment" }
      ]
    },
    {
      title: "Electronics Store Cart Screenshot",
      totalAmount: 14990,
      items: [
        { name: "Wireless Headphones", amount: 9990, category: "Electronics" },
        { name: "High-Speed Powerbank", amount: 2500, category: "Tech Accessories" },
        { name: "Braided Charging Cables", amount: 2500, category: "Tech Accessories" }
      ]
    },
    {
      title: "Supermarket Weekly Groceries",
      totalAmount: 3850,
      items: [
        { name: "Organic Vegetables & Fruit", amount: 1450, category: "Groceries" },
        { name: "Dairy & Bakery Items", amount: 900, category: "Groceries" },
        { name: "Household Supplies", amount: 1500, category: "Supplies" }
      ]
    }
  ];

  const handleSimulateUpload = (e) => {
    // Simulated upload pick
    if (e.target.files && e.target.files[0]) {
      setAnalyzedReceipt({
        title: `Uploaded: ${e.target.files[0].name}`,
        totalAmount: 6800,
        items: [
          { name: "Extracted Item 1", amount: 4500, category: "Shopping" },
          { name: "Extracted Item 2", amount: 2300, category: "Misc" }
        ]
      });
    }
  };

  const monthlyFreeCashFlow = profile.monthlyIncome - profile.fixedExpenses - profile.variableExpenses;

  return (
    <div className="space-y-8 antialiased">

      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border-2 border-cyan-500/30 shadow-xl bg-gradient-to-r from-white via-cyan-50/20 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-brand-500 to-violet-600 flex items-center justify-center text-white font-black shadow-md">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs font-black uppercase mb-1">
              AI VISION RECEIPT & INVOICE ANALYZER
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              RECEIPT & CART ANALYZER
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Upload any shopping receipt, invoice, or online cart screenshot. AI extracts prices, categories, and runs instant budget impact analysis!
        </p>
      </div>

      {/* UPLOAD DROPZONE & SAMPLE PRESETS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Upload Dropzone */}
        <div className="md:col-span-6 glass-card rounded-3xl p-8 border-2 border-dashed border-brand-500/40 text-center space-y-4 bg-slate-50/50 dark:bg-slate-800/40 relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleSimulateUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-cyan-400 flex items-center justify-center mx-auto text-3xl">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Click or Drag Receipt Image Here
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Supports JPG, PNG, Screenshots & PDF Invoices
            </p>
          </div>
        </div>

        {/* Sample Presets */}
        <div className="md:col-span-6 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Or Click a Sample Receipt:
          </span>
          <div className="space-y-2">
            {sampleReceipts.map((rec, idx) => (
              <button
                key={idx}
                onClick={() => setAnalyzedReceipt(rec)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                  analyzedReceipt.title === rec.title
                    ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-extrabold">{rec.title}</span>
                </div>
                <span className="text-sm font-black">{formatCurrency(rec.totalAmount)}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* EXTRACTED ANALYSIS BREAKDOWN */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 bg-white dark:bg-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-cyan-400">AI Extraction Result</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {analyzedReceipt.title}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-400">Total Receipt Amount</span>
            <div className="text-3xl font-black text-brand-600 dark:text-cyan-400">
              {formatCurrency(analyzedReceipt.totalAmount)}
            </div>
          </div>
        </div>

        {/* Itemized Extracted Items Grid */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">
            Extracted Items & Categories ({analyzedReceipt.items.length} Items)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {analyzedReceipt.items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-cyan-300">
                  {item.category}
                </span>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {item.name}
                </div>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Impact Comparison */}
        <div className="p-6 rounded-3xl bg-brand-500/10 border-2 border-brand-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <h4 className="text-base font-black text-brand-900 dark:text-cyan-200 uppercase">
              Financial Impact Analysis
            </h4>
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
            This receipt represents <strong>{Math.round((analyzedReceipt.totalAmount / (monthlyFreeCashFlow || 1)) * 100)}%</strong> of your monthly free cash flow ({formatCurrency(monthlyFreeCashFlow)}).
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span><strong>Smart Twin Tip:</strong> Categorizing these items under variable spending will preserve your ₹{profile.emergencyFund.toLocaleString('en-IN')} emergency fund intact.</span>
          </p>
        </div>

      </div>

    </div>
  );
}

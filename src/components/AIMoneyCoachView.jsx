import React, { useState } from 'react';
import { generateCoachResponse } from '../engine/financialTwinEngine';
import { Bot, Send, User, Sparkles } from 'lucide-react';

export default function AIMoneyCoachView({ profile, privacyMode, formatCurrency }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I am your AI Financial Twin Coach. Ask me anything about your money, decision trade-offs, moving cities, or buying gadgets!`
    }
  ]);
  const [input, setInput] = useState('');

  const suggestedQuestions = [
    'Can I afford a MacBook?',
    'What if I move to Mumbai?',
    'How much can I spend on Goa trip?',
    'How can I save ₹50,000?'
  ];

  const handleSend = (textToSend) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    const answer = generateCoachResponse(q, profile);
    const botMsg = { sender: 'bot', text: answer };

    setMessages(prev => [...prev, userMsg, botMsg]);
    if (!textToSend) setInput('');
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-brand-500/30 shadow-xl flex flex-col justify-between h-[520px] bg-white dark:bg-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-400 to-violet-500 text-white flex items-center justify-center font-bold shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              AI Money Coach
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to Digital Twin Model
            </span>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 text-sm sm:text-base font-medium">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm ${
              m.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-brand-500 text-white'
            }`}>
              {m.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div className={`p-4 rounded-3xl max-w-[85%] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-brand-600 text-white rounded-tr-none font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Question Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-4 py-2 text-xs sm:text-sm font-extrabold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-brand-500 hover:text-white whitespace-nowrap transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Text Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center gap-2 pt-3 border-t-2 border-slate-200 dark:border-slate-800"
      >
        <input
          type="text"
          placeholder="Ask coach about laptops, trip budgets, moving cities..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 text-sm sm:text-base bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-brand-500 text-slate-900 dark:text-white font-semibold"
        />
        <button
          type="submit"
          className="p-3.5 rounded-2xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
}

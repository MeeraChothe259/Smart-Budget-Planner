import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { generateCopilotAnswer } from '../engine/adaptiveEngine';

export default function SmartCopilot({ plan, mode, delta, healthScore, savingsGoal }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hi! I am your AI Budget Helper 🤖. Ask me anything about your ${mode?.name || 'budget'} in simple words!`
    }
  ]);
  const [input, setInput] = useState('');

  const suggestedQuestions = [
    'Where can I save?',
    'What changed in my plan?',
    'What should I cut first?',
    'How to improve score?'
  ];

  const handleSend = (textToSend) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    const answer = generateCopilotAnswer(q, plan, mode, delta, healthScore, savingsGoal);
    const botMsg = { sender: 'bot', text: answer };

    setMessages(prev => [...prev, userMsg, botMsg]);
    if (!textToSend) setInput('');
  };

  return (
    <div className="glass-card rounded-3xl p-6 border-2 border-brand-500/30 shadow-md flex flex-col justify-between h-[450px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 text-white flex items-center justify-center font-bold text-xl shadow-md">
            🤖
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              AI Helper Assistant
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Online & Ready
            </span>
          </div>
        </div>
      </div>

      {/* Message Chat Feed - LARGE FONTS */}
      <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 text-sm font-medium">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              m.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-brand-500 text-white'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-brand-600 text-white rounded-tr-none font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 text-xs font-extrabold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-brand-500 hover:text-white whitespace-nowrap transition-colors border border-slate-200 dark:border-slate-700"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Text Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center gap-2 pt-2 border-t-2 border-slate-200 dark:border-slate-800"
      >
        <input
          type="text"
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand-500 text-slate-900 dark:text-white font-medium"
        />
        <button
          type="submit"
          className="p-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
}

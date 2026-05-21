import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, User, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

export default function ContactAiChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Welcome, recruiter! I am Akash's Interactive Representative. Ask me about his extensive full-stack engineering skills, certifications, django REST experience, or his flagship projects like **Issue Resolve Hub**.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Suggested questions optimized for recruiter workflows
  const recommendationChips = [
    { label: 'Technical Tech Stack', query: 'Show me your complete frontend and backend tech stack keys.' },
    { label: 'Smart Grievance Platform', query: 'Explain the architecture, features, and database of the Issue Resolve Hub project.' },
    { label: 'Contact Details', query: 'What are Akash Khadanga\'s phone number, email, locations, and LinkedIn addresses?' },
    { label: 'Certifications', query: 'List your verified developer certificates and badges.' },
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Neural proxy failed');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: data.text || "Apologies! Akash's AI partner suffered a neural disconnect. Akash is highly skilled in React.js, Python Django, and NoSQL. Connect with him at akashkhadaanga123@gmail.com!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Error fetching chat:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: "I'm having trouble retrieving Akash's live database indices, but let me summarize: Akash is an expert in React.js, Python Django frameworks, and Firestore databases. You can reach him directly at akashkhadaanga123@gmail.com or via phone at +91-7207174517!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (viewportRef.current) {
      // Save current scroll position to lock window scroll during update scroll
      const scrollY = window.scrollY;
      
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth'
      });

      // Temporary scroll locking listener to absorb browser-forced focus/scrolling jumps
      const preventWindowScroll = () => {
        if (window.scrollY !== scrollY) {
          window.scrollTo(0, scrollY);
        }
      };

      window.addEventListener('scroll', preventWindowScroll, { passive: true });
      const timer = setTimeout(() => {
        window.removeEventListener('scroll', preventWindowScroll);
      }, 500);

      return () => {
        window.removeEventListener('scroll', preventWindowScroll);
        clearTimeout(timer);
      };
    }
  }, [messages, isLoading]);

  // Clean custom formatter for basic markdown output (bolding, lists, linebreaks)
  const formatContent = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Handle bold styling (**text**)
      let lineWithBold: React.ReactNode[] = [];
      const parts = line.split('**');
      
      parts.forEach((part, partIdx) => {
        if (partIdx % 2 === 1) {
          lineWithBold.push(<strong key={partIdx} className="font-bold text-white bg-white/5 px-1 py-0.5 rounded text-blue-300">{part}</strong>);
        } else {
          lineWithBold.push(part);
        }
      });

      // Handle list items starting with '-'
      if (line.trim().startsWith('-')) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-xs text-slate-300 my-1 leading-relaxed">
            {lineWithBold.slice(1)}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-xs text-slate-300 leading-relaxed mb-1.5">
          {lineWithBold}
        </p>
      );
    });
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'model',
        content: "Reset complete. Contact channels recalibrated. Ask me any details regarding Akash's development qualifications!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[460px] relative select-none">
      {/* Dynamic Backlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Connection status header */}
      <div className="pb-3 border-b border-white/5 flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">// SECURE INTERACTION PORT LINKED</span>
        </div>
        <button 
          type="button"
          onClick={handleReset}
          title="Reset neural session"
          className="text-slate-500 hover:text-white hover:bg-white/5 p-1 rounded transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages viewport */}
      <div 
        ref={viewportRef}
        className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[290px] min-h-[200px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => {
            const isModel = m.role === 'model';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isModel ? 'justify-start' : 'justify-end'} gap-2.5 items-start`}
              >
                {isModel && (
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                  </div>
                )}
                <div className="max-w-[85%] space-y-1">
                  <div
                    className={`p-3 rounded-2xl border transition-all ${
                      isModel
                        ? 'bg-white/[0.02] border-white/5 text-slate-300 rounded-tl-sm'
                        : 'bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border-blue-500/20 text-slate-200 rounded-tr-sm'
                    }`}
                  >
                    {isModel ? formatContent(m.content) : <p className="text-xs text-white select-text">{m.content}</p>}
                  </div>
                  <div className="flex justify-between items-center px-1 text-[8px] font-mono text-slate-500">
                    <span>{isModel ? 'AI_AGENT' : 'RECRUITER_CLIENT'}</span>
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start gap-2.5 items-center"
          >
            <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center animate-spin shrink-0">
              <Loader2 className="w-3 h-3 text-blue-400" />
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl rounded-tl-sm text-[10px] font-mono text-slate-400">
              ST_SYNC_PROCESSING...
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggested Quick Chips */}
      {!isLoading && (
        <div className="flex gap-1.5 overflow-x-auto py-2.5 select-none hide-scroll border-t border-white/5">
          {recommendationChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(chip.query)}
              className="text-[9px] font-mono px-2.5 py-1 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-full flex items-center gap-1 shrink-0 cursor-pointer transition-all duration-200"
            >
              <span>{chip.label}</span>
              <ChevronRight className="w-2.5 h-2.5 text-blue-400" />
            </button>
          ))}
        </div>
      )}

      {/* Smart interactive input field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="mt-2"
      >
        <div className="relative group/field rounded-xl overflow-visible">
          {/* Glowing backdrop layer activated on focus within */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 blur-[6px] transition-all duration-300 pointer-events-none z-0" />
          {/* Sharp gradient border border layer */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-focus-within/field:opacity-100 transition-all duration-300 pointer-events-none z-0" />
          
          <div className="relative z-10 flex items-center gap-2 bg-[#090d1a] border border-white/10 rounded-xl p-1.5 pl-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query Akash's qualifications..."
              className="flex-1 bg-transparent text-slate-200 text-xs focus:outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer border-0"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, X, Send, User, ChevronRight, HelpCircle, Loader } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Hello! I am Akash's AI Career Representative. Recruiters can ask me about his credentials, django/react experience, issue-tracker platform structures, or competition records. What would you like to review?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Suggested Quick Chips questions for recruiters
  const quickQuestions = [
    { text: 'Skills in Django?', query: 'Tell me about Akash\'s Django backend and web API skills.' },
    { text: 'smart grievance project?', query: 'Explain his Smart Grievance Tracking system. What are the key features and database implementation?' },
    { text: 'Achievements & Awards?', query: 'What certifications and competition awards does Akash hold?' },
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      if (!response.ok) {
        throw new Error('API server failed');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: data.text || "I apologize, but I couldn't reach Akash's profile server right now. He is highly proficient in full-stack Python architectures, React frameworks, and Firebase setups!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: "I am having trouble synchronizing with the profile database. Alternatively, Akash is expert in React components, Python Django framework, and NoSQL databases. Feel free to contact him at akashkhadaanga123@gmail.com!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-90 select-none">
      <AnimatePresence>
        {/* Toggle bubble button */}
        {!isOpen && (
          <motion.button
            key="chat-trigger"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 through-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-cyan-950/40 border border-cyan-400/50 cursor-pointer relative group"
          >
            {/* Pulsing indicator ring */}
            <span className="absolute -inset-1 bg-cyan-400 rounded-full blur-[8px] opacity-15 group-hover:opacity-30 transition-opacity" />
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-frame"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 180 }}
            className="w-[330px] sm:w-[380px] h-[500px] bg-[#070810]/95 border border-slate-900 rounded-2xl flex flex-col shadow-2xl shadow-black overflow-hidden relative"
          >
            {/* Backglow accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none" />

            {/* Chatbot Header */}
            <div className="bg-[#0b0c14] border-b border-slate-900/60 p-4 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-gradient-to-b from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center border border-cyan-400/30">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-100 flex items-center gap-1.5">
                    Akash AI Partner
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">MODEL: GEMINI-3.5-FLASH</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Pane */}
            <div 
              ref={viewportRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#020206]/40 relative"
            >
              {messages.map((m, idx) => {
                const isModel = m.role === 'model';
                return (
                  <div key={idx} className={`flex ${isModel ? 'justify-start' : 'justify-end'} gap-2.5`}>
                    {isModel && (
                      <div className="h-7 w-7 bg-indigo-950/50 border border-indigo-900/40 rounded-lg flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                    )}
                    <div className="max-w-[78%] flex flex-col gap-1">
                      <div
                        className={`p-3 text-xs leading-relaxed rounded-2xl font-sans ${
                          isModel
                            ? 'bg-slate-950/80 border border-slate-900/50 text-slate-300 rounded-tl-sm'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                        }`}
                      >
                        {m.content}
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 px-1">
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loading Neural indicator */}
              {isLoading && (
                <div className="flex justify-start gap-2.5">
                  <div className="h-7 w-7 bg-indigo-950/50 border border-indigo-900/40 rounded-lg flex items-center justify-center shrink-0 animate-spin">
                    <Loader className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="bg-slate-950/80 border border-slate-900/50 p-3 rounded-2xl text-[10px] text-slate-500 font-mono tracking-wide">
                    ST_SYNC_PROCESSING...
                  </div>
                </div>
              )}
            </div>

            {/* Quick suggested chips track (only visible when not loading) */}
            {!isLoading && (
              <div className="px-4 py-2 bg-[#05060c] flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-slate-900/30 hide-scroll">
                {quickQuestions.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => handleSendMessage(q.query)}
                    className="text-[10px] font-mono px-3 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                  >
                    <span>{q.text}</span>
                    <ChevronRight className="w-3 h-3 text-cyan-500" />
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="bg-[#0b0c14] border-t border-slate-900/60 p-3 flex gap-2 relative z-10"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask representing AI recruiter questions..."
                className="flex-1 bg-slate-950 border border-slate-900 text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600 font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

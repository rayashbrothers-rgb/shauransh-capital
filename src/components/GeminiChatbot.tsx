import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, Bot, User, Loader2, ArrowUpRight, HelpCircle, RotateCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SUGGESTIONS = [
  "How to apply for a Business Loan?",
  "Calculate an elegant Home Loan EMI",
  "How fast can an advisor contact me?",
  "What is the CIBIL requirement for Personal Loans?"
];

// Helper to format basic markdown (bold, italic, bullets, links) safely in React
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-white/90 text-sm font-light leading-relaxed">
      {lines.map((line, lineIndex) => {
        let trimmed = line.trim();
        
        // Bullet points
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const content = trimmed.substring(2);
          return (
            <div key={lineIndex} className="flex gap-2 pl-2">
              <span className="text-brand-gold mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span>{parseInline(content)}</span>
            </div>
          );
        }

        // Ordered/numbered lists
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+)\.\s(.*)/);
          if (match) {
            return (
              <div key={lineIndex} className="flex gap-2 pl-2">
                <span className="text-brand-gold font-mono text-xs font-bold shrink-0">{match[1]}.</span>
                <span>{parseInline(match[2])}</span>
              </div>
            );
          }
        }

        // Headers
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={lineIndex} className="text-xs font-black uppercase tracking-wider text-brand-gold mt-4 mb-1">
              {parseInline(trimmed.substring(4))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={lineIndex} className="text-sm font-bold text-white mt-4 mb-2 border-b border-white/5 pb-1">
              {parseInline(trimmed.substring(3))}
            </h3>
          );
        }

        if (trimmed === '') {
          return <div key={lineIndex} className="h-2" />;
        }

        return <p key={lineIndex}>{parseInline(line)}</p>;
      })}
    </div>
  );
}

// Inline formatting (*italic*, **bold**)
function parseInline(str: string) {
  const parts = [];
  let index = 0;
  
  // Highlighting regex for bold patterns
  const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
  let match;

  while ((match = regex.exec(str)) !== null) {
    // text before match
    if (match.index > index) {
      parts.push(str.substring(index, match.index));
    }
    
    // bold match
    if (match[1]) {
      parts.push(<strong key={match.index} className="font-bold text-brand-gold">{match[2]}</strong>);
    } 
    // italic match
    else if (match[3]) {
      parts.push(<em key={match.index} className="italic text-white">{match[4]}</em>);
    }
    
    index = regex.lastIndex;
  }

  if (index < str.length) {
    parts.push(str.substring(index));
  }

  return parts.length > 0 ? parts : str;
}

export default function GeminiChatbot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('shauransh_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved chat history:', e);
      }
    }
    return [
      {
        role: 'model',
        parts: [{ text: "Greetings. Welcome to Shauransh Capital's High-Intelligence wealth portal. I am your specialized AI Assistant. How may I engineer your financial growth today?" }]
      }
    ];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);
  
  // Chat lead ID for persistent Firestore logging
  const [chatLeadId, setChatLeadId] = useState<string | null>(() => {
    return localStorage.getItem('shauransh_chat_lead_id');
  });

  // Callback Form Integration States
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackEmail, setCallbackEmail] = useState('');
  const [callbackService, setCallbackService] = useState('AI Chatbot Consultation');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Hide the chatbot on admin layout pages
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    localStorage.setItem('shauransh_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatLeadId) {
      localStorage.setItem('shauransh_chat_lead_id', chatLeadId);
    } else {
      localStorage.removeItem('shauransh_chat_lead_id');
    }
  }, [chatLeadId]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleClearHistory = () => {
    if (window.confirm('Do you want to reset your asset intelligence session?')) {
      const initialMsg: ChatMessage[] = [
        {
          role: 'model',
          parts: [{ text: "Greetings. Welcome to Shauransh Capital's High-Intelligence wealth portal. I am your specialized AI Assistant. How may I engineer your financial growth today?" }]
        }
      ];
      setMessages(initialMsg);
      localStorage.setItem('shauransh_chat_history', JSON.stringify(initialMsg));
      setChatLeadId(null);
      localStorage.removeItem('shauransh_chat_lead_id');
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;

    setIsSubmittingCallback(true);
    try {
      const { db } = await import('../lib/firebase');
      const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');

      if (chatLeadId) {
        // Link callback information directly to the running conversation log!
        await updateDoc(doc(db, 'leads', chatLeadId), {
          name: callbackName,
          phone: callbackPhone,
          email: callbackEmail || '---',
          service: callbackService,
          status: 'New',
          updatedAt: serverTimestamp()
        });
      } else {
        const newLeadRef = await addDoc(collection(db, 'leads'), {
          name: callbackName,
          phone: callbackPhone,
          email: callbackEmail || '---',
          service: callbackService,
          amount: '0',
          city: 'Online Chat',
          status: 'New',
          formSource: 'chat',
          createdAt: serverTimestamp(),
          chatHistory: [
            { role: 'model', text: "Greetings. Welcome to Shauransh Capital's High-Intelligence wealth portal. I am your specialized AI Assistant..." },
            { role: 'user', text: `[Triggered Callback Portal Request for ${callbackService}]` }
          ]
        });
        setChatLeadId(newLeadRef.id);
      }

      setCallbackSuccess(true);
      setCallbackName('');
      setCallbackPhone('');
      setCallbackEmail('');
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowCallbackForm(false);
        setCallbackSuccess(false);
      }, 3500);

    } catch (err: any) {
      console.error('Error submitting chat callback lead:', err);
      alert('Handshake latency detected. Please retry or contact us directly.');
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: textToSend }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setHasError(null);

    // Prepare message history formatted for Gemini API (contents schema)
    const updatedHistory = [...messages, userMessage];

    // Create or append to a live conversation lead in Firestore under leads
    let currentLeadId = chatLeadId;
    try {
      const { db } = await import('../lib/firebase');
      const { collection, addDoc, doc, updateDoc, arrayUnion, serverTimestamp } = await import('firebase/firestore');

      if (!currentLeadId) {
        // Create initial anonymous chat lead
        const newLeadRef = await addDoc(collection(db, 'leads'), {
          name: 'Anonymous Chat Client',
          phone: '---',
          email: '---',
          service: textToSend.length > 50 ? `${textToSend.substring(0, 50)}...` : textToSend,
          amount: '0',
          city: 'Online Chat',
          status: 'New',
          formSource: 'chat',
          createdAt: serverTimestamp(),
          chatHistory: [
            { role: 'model', text: messages[0]?.parts[0]?.text || "Welcome to Shauransh Capital." },
            { role: 'user', text: textToSend }
          ]
        });
        currentLeadId = newLeadRef.id;
        setChatLeadId(newLeadRef.id);
      } else {
        // Append user reply to the existing chat lead
        await updateDoc(doc(db, 'leads', currentLeadId), {
          chatHistory: arrayUnion({ role: 'user', text: textToSend }),
          updatedAt: serverTimestamp()
        });
      }
    } catch (dbErr) {
      console.error("Firestore Logging (User message) failed:", dbErr);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedHistory })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reach Shauransh AI Operations.");
      }

      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: data.text }]
      }]);

      // Log model's response to Firestore
      try {
        if (currentLeadId) {
          const { db } = await import('../lib/firebase');
          const { doc, updateDoc, arrayUnion, serverTimestamp } = await import('firebase/firestore');
          await updateDoc(doc(db, 'leads', currentLeadId), {
            chatHistory: arrayUnion({ role: 'model', text: data.text }),
            updatedAt: serverTimestamp()
          });
        }
      } catch (dbErr) {
        console.error("Firestore Logging (Model message) failed:", dbErr);
      }

    } catch (err: any) {
      console.error(err);
      setHasError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdminPage) {
    return null;
  }

  return (
    <div id="gemini-chatbot-root" className="fixed bottom-8 left-8 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[360px] sm:w-[400px] h-[550px] rounded-3xl border border-white/10 bg-[#061633]/97 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-brand-blue/80 to-[#0c244c]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold relative">
                  <Sparkles size={20} className="animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-brand-blue" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white">SHAURANSH AI</span>
                  <span className="text-[9px] text-brand-gold/80 italic tracking-wider">Automated Capital Counsel</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handleClearHistory}
                  title="Clear Conversation"
                  className="p-2 text-white/40 hover:text-brand-gold hover:bg-white/5 rounded-xl transition-all"
                >
                  <RotateCcw size={15} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Priority Callback Request Invitation */}
            <div className="bg-brand-gold/10 border-b border-white/5 px-5 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-brand-gold animate-pulse" />
                <span className="text-[10px] tracking-wide uppercase font-bold text-white/80">Need private wealth guidance?</span>
              </div>
              <button 
                onClick={() => setShowCallbackForm(true)}
                className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold border border-brand-gold/30 hover:bg-brand-gold hover:text-brand-blue px-2.5 py-1 rounded transition-all"
              >
                Connect Advisor
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-gradient-to-b from-[#061633] via-black/10 to-[#061633]">
              {messages.map((message, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'model' && (
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/10 shrink-0 flex items-center justify-center text-brand-gold">
                      <Bot size={15} />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-brand-gold text-brand-blue rounded-tr-none font-medium shadow-lg shadow-brand-gold/5' 
                      : 'bg-white/5 border border-white/5 text-white rounded-tl-none'
                  }`}>
                    {message.role === 'user' ? (
                      <p className="text-sm">{message.parts[0].text}</p>
                    ) : (
                      <SimpleMarkdown text={message.parts[0].text} />
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/10 shrink-0 flex items-center justify-center text-brand-gold">
                    <Bot size={15} />
                  </div>
                  <div className="bg-white/5 border border-white/5 text-white/50 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-gold" />
                    <span className="text-xs tracking-wider uppercase font-black text-[9px] text-white/30">Analyzing portfolio indexes...</span>
                  </div>
                </div>
              )}

              {hasError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 space-y-2">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                    <HelpCircle size={14} />
                    System Handshake Alert
                  </div>
                  <p className="font-light leading-relaxed">{hasError}</p>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions - Shown only when not loading */}
            {!isLoading && messages.length === 1 && (
              <div className="px-5 py-3 bg-black/10 border-t border-white/5 space-y-2 shrink-0">
                <span className="text-[9px] font-black uppercase tracking-wider text-white/20">Client Queries</span>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTIONS.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-left text-[11px] text-white/50 hover:text-brand-gold hover:bg-white/5 border border-white/5 px-3 py-2 rounded-xl transition-all duration-300 flex items-center justify-between group"
                    >
                      <span>{suggestion}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="p-4 border-t border-white/5 bg-[#061633] flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message AI Advisor..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold/50 text-white placeholder:text-white/30 focus:bg-white/[0.07] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="w-10 h-10 rounded-xl bg-brand-gold text-brand-blue flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Callback Request Overlay Form */}
            <AnimatePresence>
              {showCallbackForm && (
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="absolute bottom-0 left-0 right-0 bg-[#061633] border-t border-white/10 p-5 space-y-4 z-50 rounded-t-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-brand-gold" />
                      <span className="text-xs uppercase font-black tracking-widest text-white">Callback Request Gateway</span>
                    </div>
                    <button 
                      onClick={() => {
                        setShowCallbackForm(false);
                        setCallbackSuccess(false);
                      }}
                      className="p-1 hover:bg-white/5 rounded text-white/40 hover:text-white transition-all animate-none block"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {callbackSuccess ? (
                    <div className="text-center py-6 space-y-3">
                      <span className="inline-block w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 p-2.5 border border-emerald-500/20 text-center text-sm italic font-serif leading-none">S</span>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Gateway Transmission Success</p>
                      <p className="text-[11px] text-white/40 leading-relaxed font-light">
                        Your credentials have been securely transmitted to the Shauransh Master CRM. A premium private wealth advisor will contact you within 2 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleCallbackSubmit} className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Your Entity / Full Name</label>
                        <input 
                          type="text"
                          required
                          value={callbackName}
                          onChange={(e) => setCallbackName(e.target.value)}
                          placeholder="e.g. Yash Malhotra"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold/50 placeholder:text-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Secure Contact Number</label>
                        <input 
                          type="tel"
                          required
                          value={callbackPhone}
                          onChange={(e) => setCallbackPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold/50 placeholder:text-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Official Email (Optional)</label>
                        <input 
                          type="email"
                          value={callbackEmail}
                          onChange={(e) => setCallbackEmail(e.target.value)}
                          placeholder="e.g. client@shauransh.capital"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold/50 placeholder:text-white/20"
                        />
                      </div>
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Target Portfolio Segment</label>
                        <select
                          value={callbackService}
                          onChange={(e) => setCallbackService(e.target.value)}
                          className="w-full bg-[#061633] text-white border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold/50 appearance-none cursor-pointer"
                        >
                          <option value="AI Chatbot Consultation">AI Consultation</option>
                          <option value="Personal Loan">Personal Loans</option>
                          <option value="Business Loan">Business Assets</option>
                          <option value="Home Loan">Home Loans</option>
                          <option value="Vehicle Loan">Vehicle Portfolio</option>
                          <option value="Insurance">Asset Insurance</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingCallback}
                        className="w-full mt-2 py-3 bg-brand-gold text-brand-blue font-bold text-xs uppercase tracking-wider rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/10 disabled:opacity-50"
                      >
                        {isSubmittingCallback ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />
                            Encrypting Packet...
                          </>
                        ) : (
                          'Submit to Advisor'
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-500 ${
          isOpen 
            ? 'bg-white text-brand-blue border-white/20 rotate-90' 
            : 'bg-brand-blue text-brand-gold border-brand-gold/30 hover:border-brand-gold'
        }`}
      >
        {isOpen ? <X size={26} /> : <Sparkles size={26} className="animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-gold"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}

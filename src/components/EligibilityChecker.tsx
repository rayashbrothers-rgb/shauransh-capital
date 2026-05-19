import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function EligibilityChecker() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [data, setData] = useState({
    salary: 50000,
    cibil: 750,
    loanAmount: 1000000,
    fullName: '',
    email: '',
    phone: ''
  });

  const checkEligibility = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Instant Approval Logic
    const approved = data.cibil >= 750 && data.salary >= 50000;
    setIsApproved(approved);

    try {
      await addDoc(collection(db, 'leads'), {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        service: 'Eligibility Assessment',
        amount: data.loanAmount.toString(),
        salary: data.salary,
        cibil: data.cibil,
        status: approved ? 'Instant Approved' : 'Under Review',
        type: 'eligibility',
        formSource: 'assessment',
        createdAt: serverTimestamp()
      });
      setStep(3);
    } catch (error) {
      console.error('Error saving eligibility lead:', error);
      alert('Assessment failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-black/10" id="eligibility">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-[40px] overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 md:p-16 border-r border-white/5 flex flex-col justify-center">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4">Precision Analysis</span>
            <h2 className="text-4xl font-serif font-bold mb-8 leading-tight">
              Instant <span className="italic gold-text-gradient">Eligibility Assurance</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <CheckCircle size={14} />
                </div>
                <p className="text-white/60 text-sm">Real-time credit policy matching across 50+ lenders.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <CheckCircle size={14} />
                </div>
                <p className="text-white/60 text-sm">Confidential assessment with no impact on your CIBIL score.</p>
              </div>
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 inline-flex items-center gap-4">
              <ShieldCheck className="text-brand-gold" size={32} />
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">Verified Institutional Access</div>
            </div>
          </div>

          <div className="p-8 md:p-16 bg-white/[0.02]">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-white/40">
                      <span>Monthly Net Salary</span>
                      <span className="text-brand-gold">₹{data.salary.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="10000" max="500000" step="5000"
                      className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-brand-gold"
                      value={data.salary}
                      onChange={(e) => setData({...data, salary: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-white/40">
                      <span>Current CIBIL Score</span>
                      <span className="text-brand-gold">{data.cibil}</span>
                    </div>
                    <input 
                      type="range" min="300" max="900" step="1"
                      className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-brand-gold"
                      value={data.cibil}
                      onChange={(e) => setData({...data, cibil: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-white/40">
                      <span>Desired Loan Amount</span>
                      <span className="text-brand-gold">₹{(data.loanAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <input 
                      type="range" min="100000" max="20000000" step="100000"
                      className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-brand-gold"
                      value={data.loanAmount}
                      onChange={(e) => setData({...data, loanAmount: Number(e.target.value)})}
                    />
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-5 gold-gradient rounded-xl font-bold flex items-center justify-center gap-2 mt-4"
                  >
                    Next Step <ArrowRight size={20} />
                  </button>
                </motion.div>
              ) : step === 2 ? (
                <motion.form 
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={checkEligibility}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      placeholder="Enter your name"
                      value={data.fullName}
                      onChange={(e) => setData({...data, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      placeholder="email@example.com"
                      value={data.email}
                      onChange={(e) => setData({...data, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Mobile Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      placeholder="+91 00000 00000"
                      value={data.phone}
                      onChange={(e) => setData({...data, phone: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 gold-gradient rounded-xl font-bold flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>Analyzing... <Loader2 size={20} className="animate-spin" /></>
                    ) : (
                      <>Get Assessment <Sparkles size={20} /></>
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Back to parameters
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isApproved ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold'} animate-pulse`}>
                    <CheckCircle size={56} />
                  </div>
                  <h3 className="text-3xl font-serif italic mb-4">
                    {isApproved ? 'Instant Approval Granted!' : 'Assessment Complete!'}
                  </h3>
                  <p className="text-white/40 text-sm mb-8 leading-relaxed">
                    {isApproved 
                      ? 'Congratulations! You qualify for our high-speed processing track with Tier-1 banking partners.'
                      : `We have identified Potential Lenders matching your requirements. Our specialists will contact you shortly.`}
                  </p>
                  
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl w-full mb-8 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">Assessment Summary</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-white/30">Max Potential</p>
                        <p className="text-brand-gold font-bold">₹{(data.loanAmount * 1.2 / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/30">Int. Rates from</p>
                        <p className="text-brand-gold font-bold">{isApproved ? '8.4%' : '10.5%'}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(1)}
                    className="text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-4"
                  >
                    New Analysis
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

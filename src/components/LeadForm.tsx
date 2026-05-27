import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2, ChevronRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface LeadFormProps {
  defaultLoanType?: string;
  defaultAmount?: string;
  formSource?: string;
}

export default function LeadForm({ defaultLoanType, defaultAmount, formSource = 'consultation' }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    loanType: defaultLoanType || 'Personal Loan',
    monthlyIncome: '',
    desiredAmount: defaultAmount || '',
    city: ''
  });

  useEffect(() => {
    if (defaultLoanType) {
      setFormData(prev => ({ ...prev, loanType: defaultLoanType }));
    }
    if (defaultAmount) {
      setFormData(prev => ({ ...prev, desiredAmount: defaultAmount }));
    }
  }, [defaultLoanType, defaultAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        service: formData.loanType,
        income: formData.monthlyIncome,
        amount: formData.desiredAmount,
        city: formData.city,
        status: 'New',
        formSource,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        loanType: 'Personal Loan',
        monthlyIncome: '',
        desiredAmount: '',
        city: ''
      });
      setTimeout(() => setIsSubmitted(false), 8000);
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loanTypes = [
    'Personal Loan',
    'Business Loan',
    'Home Loan',
    'Vehicle Loan',
    'Loan Against Property',
    'Insurance',
    'Financial Solutions'
  ];

  return (
    <section className="py-32 relative overflow-hidden" id="lead-form">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]"
              >
                Direct Advisory
              </motion.span>
              <h2 className="text-5xl md:text-6xl lg:text-[70px] font-serif font-medium leading-[0.9] tracking-tight text-white mb-4">
                Begin Your <br />
                <span className="gold-text-gradient italic font-semibold">Financial Success</span>
              </h2>
              <p className="text-xl text-white/40 leading-relaxed max-w-lg font-light">
                Submit your details and let our expert advisors curate the perfect financial solution for your specific needs.
              </p>
            </div>
            
            <div className="flex flex-col gap-10 mt-6">
              {[
                { title: 'Personalized Advisory', desc: 'Expert guidance tailored to your specific goals.' },
                { title: 'Swift Processing', desc: 'Institutional-grade documentation and rapid approvals.' },
                { title: 'Global Network', desc: 'Exclusive priority access to top-tier banking partners.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shrink-0 transition-all duration-500 group-hover:bg-brand-gold group-hover:text-brand-blue group-hover:scale-110 shadow-xl">
                    <CheckCircle2 size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <h4 className="text-lg font-bold text-white transition-colors group-hover:text-brand-gold">{item.title}</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-10 lg:p-14 rounded-[28px] sm:rounded-[50px] relative border-brand-gold/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Form Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-20 gap-8"
              >
                <div className="w-24 h-24 rounded-full bg-brand-gold flex items-center justify-center text-brand-blue shadow-[0_0_50px_rgba(212,164,55,0.4)]">
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-3xl font-serif font-bold text-white">Application Received</h3>
                  <p className="text-lg text-white/40 font-light max-w-xs">Our senior advisor will reach out to you within 24 business hours.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3.5 border-2 border-brand-gold/30 text-brand-gold rounded-full font-black uppercase tracking-[0.2em] text-[12px] hover:bg-brand-gold hover:text-brand-blue transition-all duration-500 hover:border-brand-gold"
                >
                  New Consultation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Full Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. Shaurya Agrawal"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white placeholder:text-white/20 font-light"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Email Identity</label>
                    <input 
                      required
                      type="email"
                      placeholder="identity@domain.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white placeholder:text-white/20 font-light"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Financial Category</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white appearance-none cursor-pointer font-light"
                        value={formData.loanType}
                        onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                      >
                        {loanTypes.map(type => <option key={type} value={type} className="bg-brand-blue text-white py-4">{type}</option>)}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                        <Send size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Mobile Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="+91"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white placeholder:text-white/20 font-mono tracking-widest"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Monthly Income (INR)</label>
                    <input 
                      required
                      type="number"
                      placeholder="e.g. 250000"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white placeholder:text-white/20 font-light"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Desired Loan Amount</label>
                    <input 
                      required
                      type="number"
                      placeholder="e.g. 1000000"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white placeholder:text-white/20 font-light"
                      value={formData.desiredAmount}
                      onChange={(e) => setFormData({...formData, desiredAmount: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Metro Residence (City)</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Mumbai"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all duration-500 text-white placeholder:text-white/20 font-light"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>

                <div className="pt-6">
                  <motion.button 
                    whileHover={{ y: -4, boxShadow: '0 25px 50px rgba(212, 164, 55, 0.3)' }}
                    whileTap={{ y: 0 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 gold-gradient rounded-2xl font-black flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(212,164,55,0.2)] text-[13px] uppercase tracking-[0.3em] text-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
                    id="lead-submit"
                  >
                    {isSubmitting ? (
                      <>Processing Consultation... <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      <>Request Priority Consultation <ChevronRight size={18} strokeWidth={4} /></>
                    )}
                  </motion.button>
                  <p className="text-[10px] text-center text-white/20 mt-6 uppercase tracking-[0.2em] font-medium italic">
                    Institutional Privacy Standards • Absolute Confidentiality Guaranteed
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

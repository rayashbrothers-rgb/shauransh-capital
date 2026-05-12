import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    loanType: 'Personal Loan',
    monthlyIncome: '',
    city: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        service: formData.loanType,
        amount: formData.monthlyIncome,
        city: formData.city,
        status: 'New',
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        loanType: 'Personal Loan',
        monthlyIncome: '',
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
    <section className="py-24 relative overflow-hidden" id="lead-form">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Begin Your Journey to <br />
              <span className="gold-text-gradient">Financial Success</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-lg font-light">
              Submit your details and let our expert advisors curate the perfect financial solution for your specific needs.
            </p>
            
            <div className="flex flex-col gap-8 mt-4">
              {[
                { title: 'Personalized Advisory', desc: 'Expert guidance tailored to your goals.' },
                { title: 'Swift Processing', desc: 'Minimal documentation, faster approvals.' },
                { title: 'Global Network', desc: 'Access to top-tier banking partners.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90">{item.title}</h4>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-[40px] relative"
          >
            <div className="absolute top-0 right-12 w-24 h-24 bg-brand-gold/10 blur-3xl rounded-full" />
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-brand-gold flex items-center justify-center text-brand-blue">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-white/60">Our advisor will reach out to you within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 border border-brand-gold/50 text-brand-gold rounded-lg hover:bg-brand-gold/10 transition-all"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      placeholder="name@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Mobile Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all font-mono"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Loan Type</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all appearance-none text-white/80"
                      value={formData.loanType}
                      onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                    >
                      {loanTypes.map(type => <option key={type} value={type} className="bg-brand-blue">{type}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Monthly Income (₹)</label>
                    <input 
                      required
                      type="number"
                      placeholder="e.g. 50000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">City</label>
                    <input 
                      required
                      type="text"
                      placeholder="Enter your city"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-all"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 gold-gradient rounded-xl font-bold flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(212,164,55,0.2)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  id="lead-submit"
                >
                  {isSubmitting ? (
                    <>Processing... <Loader2 size={20} className="animate-spin" /></>
                  ) : (
                    <>Submit Consultation Request <Send size={20} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

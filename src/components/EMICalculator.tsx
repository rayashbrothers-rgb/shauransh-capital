import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import { getSettings } from '../lib/settings';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    async function loadRates() {
      const rates = await getSettings('emi_rates');
      if (rates && rates.homeLoan) {
        setInterestRate(Number(rates.homeLoan));
      }
    }
    loadRates();
  }, []);

  useEffect(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    
    let emiValue = 0;
    if (r === 0) {
      emiValue = P / n;
    } else {
      emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - P;
    
    setResults({
      emi: Math.round(emiValue),
      totalInterest: Math.round(totalInterestValue),
      totalPayment: Math.round(totalPaymentValue)
    });
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-24" id="emi-calculator">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 inline-block"
          >
            Planning Tools
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Interactive <span className="italic gold-text-gradient">EMI Analysis</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-10 md:p-14 rounded-[50px] space-y-16 border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Loan Amount */}
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Capital Required</label>
                  <h3 className="text-xl font-bold text-white tracking-tight">Loan Amount</h3>
                </div>
                <div className="text-3xl font-serif font-black gold-text-gradient italic tracking-tighter">{formatCurrency(loanAmount)}</div>
              </div>
              <div className="relative pt-2">
                <input 
                  type="range" 
                  min="100000" 
                  max="10000000" 
                  step="50000"
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
                <div className="absolute top-1/2 left-0 h-1.5 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2" style={{ width: `${((loanAmount - 100000) / (10000000 - 100000)) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-white/20 uppercase font-black tracking-[0.2em]">
                <span>1 Lakh</span>
                <span>100 Lakhs</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Interest Yield</label>
                  <h3 className="text-xl font-bold text-white tracking-tight">Annual Percentage Rate</h3>
                </div>
                <div className="text-3xl font-serif font-black gold-text-gradient italic tracking-tighter">{interestRate}%</div>
              </div>
              <div className="relative pt-2">
                <input 
                  type="range" 
                  min="5" 
                  max="25" 
                  step="0.1"
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
                <div className="absolute top-1/2 left-0 h-1.5 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2" style={{ width: `${((interestRate - 5) / (25 - 5)) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-white/20 uppercase font-black tracking-[0.2em]">
                <span>5%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Amortization Period</label>
                  <h3 className="text-xl font-bold text-white tracking-tight">Tenure in Years</h3>
                </div>
                <div className="text-3xl font-serif font-black gold-text-gradient italic tracking-tighter">{tenure} <span className="text-sm font-sans tracking-normal opacity-60">Years</span></div>
              </div>
              <div className="relative pt-2">
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
                <div className="absolute top-1/2 left-0 h-1.5 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2" style={{ width: `${((tenure - 1) / (30 - 1)) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-white/20 uppercase font-black tracking-[0.2em]">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 h-full"
          >
            <div className="relative h-full p-[2px] rounded-[50px] bg-gradient-to-br from-brand-gold via-brand-gold/20 to-transparent group overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative bg-[#061633] rounded-[48px] p-10 lg:p-12 h-full flex flex-col justify-between border-white/5">
                <div className="flex flex-col gap-10">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 rounded-[24px] bg-brand-gold/10 flex items-center justify-center text-brand-gold shadow-[0_10px_30px_rgba(212,164,55,0.1)] border border-brand-gold/20">
                      <Calculator size={36} strokeWidth={1.5} />
                    </div>
                    <div className="px-5 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold italic">Premium Estimator</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/30">Monthly Installment</h3>
                    <motion.div 
                      key={results.emi}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl lg:text-7xl font-serif font-black italic gold-text-gradient tracking-tighter"
                    >
                      {formatCurrency(results.emi)}
                    </motion.div>
                    <p className="text-sm text-white/30 font-light max-w-[240px]">Estimated monthly obligations based on institutional interest structures.</p>
                  </div>
                </div>
                
                <div className="mt-16 space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-[11px] uppercase font-black tracking-[0.2em] text-white/30">Total Interest Payable</span>
                    <span className="text-lg font-serif font-bold text-white italic tracking-tight">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-[11px] uppercase font-black tracking-[0.2em] text-white/30">Total Repayment Sum</span>
                    <span className="text-lg font-serif font-bold text-white italic tracking-tight">{formatCurrency(results.totalPayment)}</span>
                  </div>
                  
                  <motion.button 
                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(212, 164, 55, 0.3)' }}
                    whileTap={{ y: 0 }}
                    onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-6 gold-gradient rounded-3xl font-black mt-10 text-[13px] uppercase tracking-[0.3em] text-brand-blue shadow-[0_15px_30px_rgba(212,164,55,0.2)] transition-all duration-500"
                  >
                    Lock This Rate
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

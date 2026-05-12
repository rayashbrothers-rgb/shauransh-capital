import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info } from 'lucide-react';

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
            className="lg:col-span-8 glass-card p-8 md:p-12 rounded-[40px] space-y-12"
          >
            {/* Loan Amount */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Loan Amount</label>
                <div className="text-2xl font-bold font-mono gold-text-gradient">{formatCurrency(loanAmount)}</div>
              </div>
              <input 
                type="range" 
                min="100000" 
                max="10000000" 
                step="50000"
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-white/30 uppercase font-bold tracking-widest">
                <span>₹1 Lakh</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Interest Rate (% p.a)</label>
                <div className="text-2xl font-bold font-mono gold-text-gradient">{interestRate}%</div>
              </div>
              <input 
                type="range" 
                min="5" 
                max="25" 
                step="0.1"
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-white/30 uppercase font-bold tracking-widest">
                <span>5%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Tenure (Years)</label>
                <div className="text-2xl font-bold font-mono gold-text-gradient">{tenure} Years</div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1"
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-white/30 uppercase font-bold tracking-widest">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 gold-gradient p-1 rounded-[40px] shadow-2xl relative group"
          >
            <div className="bg-brand-blue rounded-[38px] p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8">
                  <Calculator size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Monthly EMI</h3>
                <p className="text-white/40 text-sm mb-6 font-light">Estimated monthly repayment for your selected loan parameters.</p>
                <div className="text-5xl font-bold font-serif italic mb-8 gold-text-gradient">
                  {formatCurrency(results.emi)}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm py-3 border-b border-white/5">
                  <span className="text-white/40">Total Interest</span>
                  <span className="font-bold">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-sm py-3 border-b border-white/5">
                  <span className="text-white/40">Total Repayment</span>
                  <span className="font-bold">{formatCurrency(results.totalPayment)}</span>
                </div>
                
                <button className="w-full py-4 gold-gradient rounded-xl font-bold mt-6 shadow-lg">
                  Instant Approval
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

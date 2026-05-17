import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Search, 
  Truck, 
  Clock, 
  Gem, 
  ChevronRight, 
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { getSettings } from '../lib/settings';

export default function VehicleLoans() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.9);
  const [tenure, setTenure] = useState(5);
  const [showFormWithAmount, setShowFormWithAmount] = useState<string | undefined>(undefined);
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings('emi_rates');
      if (data && data.vehicleLoan) {
        setInterestRate(Number(data.vehicleLoan));
      }
    }
    load();
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

  const categories = [
    {
      icon: <Car className="w-10 h-10" />,
      title: "Private Passenger",
      desc: "Premium financing for luxury sedans, performance SUVs, and modern electric vehicles with flexible ownership models."
    },
    {
      icon: <Gem className="w-10 h-10" />,
      title: "Exotic & Luxury",
      desc: "Specialized credit lines for high-tier marques and limited edition automotive assets with bespoke residual value terms."
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Commercial Fleet",
      desc: "Scalable funding solutions for logistics, transport enterprises, and institutional fleet expansions with tax-efficient structures."
    }
  ];

  const benefits = [
    {
      icon: <Zap />,
      title: "Instant Verification",
      desc: "Our digital validation engine provides indicative approvals within hours, not days."
    },
    {
      icon: <TrendingUp />,
      title: "Optimal Yields",
      desc: "Access the market's most competitive interest regimes through our Tier-1 institutional channel."
    },
    {
      icon: <ShieldCheck />,
      title: "Secure Processing",
      desc: "Bank-level security protocols ensure your financial data remains encrypted throughout the lifecycle."
    },
    {
      icon: <RotateCcw />,
      title: "Flexible Repayment",
      desc: "Customize your cash flow with step-up/step-down EMI options and balloon payment structures."
    }
  ];

  const faqs = [
    {
      q: "What is the maximum financing percentage available?",
      a: "Depending on the vehicle category and your financial profile, we facilitate up to 100% on-road funding for selected premium marques."
    },
    {
      q: "Are there special rates for Electric Vehicles (EVs)?",
      a: "Yes, we offer 'Green Finance' incentives with preferential interest rates and lower processing fees for approved electric and hybrid assets."
    },
    {
      q: "Can I get funding for a pre-owned luxury vehicle?",
      a: "Absolutely. We provide structured loans for certified pre-owned luxury vehicles up to 5 years old with competitive valuation-based limits."
    },
    {
      q: "What is the average turnaround time for disbursement?",
      a: "Upon submission of digital documents, we aim for disbursement within 48 business hours, provided all technical evaluations are satisfied."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-brand-blue min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2400" 
            alt="Luxury Sports Car in Modern Setting" 
            className="w-full h-full object-cover opacity-20 grayscale-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent" />
          
          {/* Light Streaks Animation */}
          <motion.div 
            animate={{ x: [-1000, 2000], opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 left-0 w-[500px] h-[1px] bg-brand-gold/60 blur-[60px] rotate-[-15deg] pointer-events-none"
          />
          <motion.div 
            animate={{ x: [-1500, 1500], opacity: [0, 0.2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute top-1/2 left-0 w-[800px] h-[1px] bg-brand-gold/40 blur-[80px] rotate-[-10deg] pointer-events-none"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-20 items-center">
            <div className="flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em]">Automotive Liquidity</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-7xl lg:text-[100px] font-serif font-medium leading-[0.9] tracking-tight"
              >
                Drive Forward <br />
                <span className="italic gold-text-gradient font-semibold">With Confidence.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-white/40 leading-relaxed max-w-xl font-light italic"
              >
                A premium automotive financing ecosystem designed for modern mobility and institutional-grade luxury asset acquisition.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <button 
                  onClick={() => document.getElementById('vehicle-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 bg-brand-gold text-brand-blue font-black uppercase tracking-[0.3em] text-[13px] rounded-full shadow-[0_20px_40px_rgba(212,164,55,0.2)] hover:scale-105 transition-all duration-500"
                >
                  Fund Your Drive
                </button>
                <button 
                  onClick={() => document.getElementById('vehicle-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 border-2 border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.3em] text-[13px] rounded-full transition-all duration-500"
                >
                  Asset Consulting
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-12 rounded-[60px] border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 blur-[80px] rounded-full" />
                 
                 <div className="flex flex-col gap-12">
                    <div className="flex justify-between items-start">
                       <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Real-time Approval</span>
                          <p className="text-3xl font-serif font-black italic text-white tracking-tight leading-none">Instant Decision</p>
                       </div>
                       <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20 shadow-lg">
                          <Clock size={32} strokeWidth={1.5} />
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex justify-between items-center py-4 border-b border-white/5">
                          <span className="text-[11px] uppercase font-black tracking-[0.3em] text-white/30 text-center">Market Interest</span>
                          <span className="text-xl font-serif font-bold text-white italic">From 8.9%</span>
                       </div>
                       <div className="flex justify-between items-center py-4 border-b border-white/5">
                          <span className="text-[11px] uppercase font-black tracking-[0.3em] text-white/30 text-center">Processing Window</span>
                          <span className="text-xl font-serif font-bold text-white italic">48 Hours</span>
                       </div>
                       <div className="flex justify-between items-center py-4">
                          <span className="text-[11px] uppercase font-black tracking-[0.3em] text-white/30 text-center">Financing Cap</span>
                          <span className="text-xl font-serif font-bold text-white italic">100% On-road</span>
                       </div>
                    </div>

                    <div className="p-10 bg-brand-gold/5 rounded-[40px] border border-brand-gold/10 text-center">
                       <p className="text-[11px] uppercase font-black tracking-[0.4em] text-white/40 mb-3">Priority Sanction</p>
                       <p className="text-3xl font-serif font-black italic gold-text-gradient">Tier-1 Status</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Financing Spectrum</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1] tracking-tight">
                High-Velocity <br /> <span className="italic font-semibold gold-text-gradient">Automotive Credit.</span>
              </h2>
            </div>
            <p className="text-lg text-white/40 font-light max-w-sm border-l border-white/10 pl-8">
              Engineered solutions for every automotive aspiration, from daily precision to weekend luxury performance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-12 lg:p-16 rounded-[60px] border-white/5 hover:border-brand-gold/20 group relative overflow-hidden transition-all duration-700"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[50px] rounded-full" />
                <div className="w-20 h-20 rounded-[32px] bg-brand-gold/5 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-xl">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-brand-gold transition-colors">{cat.title}</h3>
                <p className="text-lg text-white/40 font-light leading-relaxed italic">{cat.desc}</p>
                
                <div className="mt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-brand-gold font-black uppercase tracking-[0.3em] text-[10px]">
                   View Terms <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: "500+", label: "Vehicles Funded" },
              { val: "2h", label: "Verification Time" },
              { val: "100%", label: "Max Financing" },
              { val: "50+", label: "Dealer Networks" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <span className="text-5xl font-serif font-black italic gold-text-gradient leading-none tracking-tighter">{stat.val}</span>
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/30">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-32 relative overflow-hidden">
        {/* Abstract Speed Decor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Precision Analytics</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight text-white">Interactive <br /> <span className="italic font-semibold gold-text-gradient">Drive Simulator.</span></h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-12 glass-card p-10 md:p-20 rounded-[80px] border-white/5 relative overflow-hidden bg-[#061633]/50">
               {/* Dashboard Glow */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
               
               <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 relative z-10">
                 <div className="flex flex-col gap-12">
                    {/* Loan Amount */}
                    <div className="space-y-8 group">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-brand-gold transition-colors">Vehicle Valuation</label>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Loan Amount</h3>
                        </div>
                        <div className="text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{formatCurrency(loanAmount)}</div>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="300000" 
                          max="20000000" 
                          step="50000"
                          className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                        />
                        <div className="absolute top-1/2 left-0 h-1.5 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2 shadow-[0_0_15px_rgba(212,164,55,0.6)]" style={{ width: `${((loanAmount - 300000) / (20000000 - 300000)) * 100}%` }} />
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-8 group">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-brand-gold transition-colors">Yield Optimization</label>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Interest Rate (% p.a)</h3>
                        </div>
                        <div className="text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{interestRate}%</div>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="8" 
                          max="15" 
                          step="0.1"
                          className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                        <div className="absolute top-1/2 left-0 h-1.5 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2 shadow-[0_0_15px_rgba(212,164,55,0.6)]" style={{ width: `${((interestRate - 8) / (15 - 8)) * 100}%` }} />
                      </div>
                    </div>

                    {/* Tenure */}
                    <div className="space-y-8 group">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-brand-gold transition-colors">Ownership Duration</label>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Tenure in Years</h3>
                        </div>
                        <div className="text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{tenure} <span className="text-sm font-sans tracking-normal opacity-30">Yrs</span></div>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="1" 
                          max="7" 
                          step="1"
                          className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                          value={tenure}
                          onChange={(e) => setTenure(Number(e.target.value))}
                        />
                        <div className="absolute top-1/2 left-0 h-1.5 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2 shadow-[0_0_15px_rgba(212,164,55,0.6)]" style={{ width: `${((tenure - 1) / (7 - 1)) * 100}%` }} />
                      </div>
                    </div>
                 </div>

                 <div className="flex flex-col justify-center">
                    <motion.div 
                      key={results.emi}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-14 lg:p-20 rounded-[70px] bg-[#030d1d] border-brand-gold/20 shadow-[0_60px_150px_rgba(0,0,0,0.7)] relative overflow-hidden group/card"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-50" />
                       
                       <div className="flex flex-col gap-14 relative z-10">
                          <div className="flex flex-col gap-6">
                             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 group-hover/card:text-brand-gold/50 transition-colors">Monthly Obligation</span>
                             <div className="text-7xl lg:text-8xl font-serif font-black italic gold-text-gradient tracking-tighter leading-none glow-text">
                                {formatCurrency(results.emi)}
                             </div>
                             <p className="text-sm text-white/30 font-light max-w-xs italic">Estimated repayment sum based on Tier-1 institutional benchmarks.</p>
                          </div>

                          <div className="space-y-6">
                             <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Funding Cap</span>
                                <span className="text-xl font-serif font-bold text-white italic">{formatCurrency(results.totalPayment)}</span>
                             </div>
                             <div className="flex justify-between items-center py-4">
                                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Cost of Capital</span>
                                <span className="text-xl font-serif font-bold text-white italic">{formatCurrency(results.totalInterest)}</span>
                             </div>
                          </div>

                          <motion.button 
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setShowFormWithAmount(loanAmount.toString());
                              document.getElementById('vehicle-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full py-8 gold-gradient rounded-[40px] font-black text-[14px] uppercase tracking-[0.4em] text-brand-blue shadow-[0_20px_50px_rgba(212,164,55,0.3)] transition-all duration-500"
                          >
                             Approve This Limit
                          </motion.button>
                       </div>
                    </motion.div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Icons Grid */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center lg:items-start gap-6 group"
              >
                <div className="w-16 h-16 rounded-[22px] bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-lg">
                  {benefit.icon}
                </div>
                <div className="space-y-3 text-center lg:text-left">
                  <h4 className="text-xl font-bold text-white tracking-tight italic group-hover:text-brand-gold transition-colors">{benefit.title}</h4>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Directives</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">Service Protocol base</h2>
          </div>

          <div className="flex flex-col gap-6">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-[32px] border-white/5 overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-xl font-bold transition-all duration-500 ${openFaq === i ? 'text-brand-gold italic' : 'text-white/80 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-brand-gold border-brand-gold text-brand-blue rotate-45' : 'text-white/30 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                    <Plus size={24} strokeWidth={3} />
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-10 pt-0 text-lg text-white/40 font-light leading-relaxed border-t border-white/5 mx-10">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10 text-center">
           <div className="glass-card p-24 lg:p-36 rounded-[120px] border-brand-gold/10 flex flex-col items-center gap-12 shadow-[0_100px_200px_rgba(0,0,0,0.6)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="flex flex-col gap-10 relative z-10">
                 <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="w-24 h-24 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-4 bg-brand-gold/5"
                 >
                    <Car className="text-brand-gold" size={40} strokeWidth={1} />
                 </motion.div>
                 
                 <div className="flex flex-col gap-8">
                    <span className="text-brand-gold text-xs font-black uppercase tracking-[0.6em] animate-pulse">Action Directive</span>
                    <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.85] tracking-tighter text-white">
                       Accelerate Your <br /> <span className="italic font-semibold gold-text-gradient">Financial Velocity.</span>
                    </h2>
                 </div>
              </div>
              
              <p className="text-2xl text-white/40 font-light max-w-2xl leading-relaxed italic relative z-10">
                 Experience a private automotive financing ecosystem crafted for the high-velocity modern professional. Let's structure your drive.
              </p>

              <div className="flex flex-wrap justify-center gap-8 mt-10 relative z-10">
                 <motion.button 
                   whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(212, 164, 55, 0.4)' }}
                   whileTap={{ y: 0 }}
                   onClick={() => document.getElementById('vehicle-form')?.scrollIntoView({ behavior: 'smooth' })}
                   className="px-20 py-8 gold-gradient rounded-full text-brand-blue font-black uppercase tracking-[0.4em] text-[15px] shadow-2xl transition-all duration-500"
                 >
                    Apply Now
                 </motion.button>
                 <motion.button 
                   whileHover={{ y: -5 }}
                   whileTap={{ y: 0 }}
                   onClick={() => document.getElementById('vehicle-form')?.scrollIntoView({ behavior: 'smooth' })}
                   className="px-20 py-8 border-2 border-white/10 hover:border-brand-gold/50 rounded-full text-white font-black uppercase tracking-[0.4em] text-[15px] transition-all duration-500"
                 >
                    Book Consultation
                 </motion.button>
              </div>
           </div>
        </div>
      </section>

      <div id="vehicle-form">
        <LeadForm defaultLoanType="Vehicle Loan" defaultAmount={showFormWithAmount} />
      </div>

      <Footer />
    </div>
  );
}

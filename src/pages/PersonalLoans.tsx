import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Clock, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Users, 
  Banknote,
  ArrowRight,
  Plus,
  Minus,
  Calculator
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { getSettings } from '../lib/settings';

export default function PersonalLoans() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(3);
  const [showFormWithAmount, setShowFormWithAmount] = useState<string | undefined>(undefined);
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings('emi_rates');
      if (data && data.personalLoan) {
        setInterestRate(Number(data.personalLoan));
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

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapid Approvals",
      desc: "Our automated decision engine ensures your application is processed with institutional speed, often within 24 hours."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Minimal Documentation",
      desc: "We've streamlined the bureaucracy. Experience a truly digital journey with only the most essential verification requirements."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Processing",
      desc: "Bank-grade encryption and strict privacy protocols protect your financial data throughout the lifecycle of your loan."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Competitive Yields",
      desc: "Leveraging our network of 50+ banking partners to secure the most favorable interest rates available in the current market."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Guidance",
      desc: "Every loan is assigned a senior financial advisor to ensure the structure aligns perfectly with your long-term wealth goals."
    },
    {
      icon: <Banknote className="w-8 h-8" />,
      title: "Flexible EMI Options",
      desc: "Structure your repayments to match your cash flow, with customizable tenures and bullet payment possibilities."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Consultation",
      desc: "A brief session to understand your capital requirements and financial baseline."
    },
    {
      number: "02",
      title: "Eligibility Check",
      desc: "Instant assessment across our expansive network of Tier-1 banking partners."
    },
    {
      number: "03",
      title: "Document Review",
      desc: "Digital submission and rapid verification of essential financial records."
    },
    {
      number: "04",
      title: "Loan Structuring",
      desc: "Our experts engineer the optimal repayment schedule and interest model for you."
    },
    {
      number: "05",
      title: "Disbursement",
      desc: "Swift execution and transfer of funds to your primary financial account."
    }
  ];

  const eligibility = [
    { label: "Minimum Salary", value: "₹25,000 / Month", sub: "For Metro Cities" },
    { label: "Age Requirement", value: "21 - 60 Years", sub: "At Loan Maturity" },
    { label: "Employment Type", value: "Salaried / Self-Employed", sub: "Minimum 2 Years Experience" },
    { label: "Credit Score", value: "750+", sub: "Preferred for Best Rates" }
  ];

  const faqs = [
    {
      q: "What is the maximum loan amount available for personal needs?",
      a: "We facilitate capital ranging from ₹1 Lakh up to ₹1 Crore. The specific limit is mathematically determined based on your verified income, professional stability, and existing Debt-to-Income (DTI) ratio."
    },
    {
      q: "How fast can I expect the funds in my account?",
      a: "Our priority processing engine allows for approvals in as little as 4 hours. Once the digital contract is executed, disbursement typically occurs within 24 to 48 business hours."
    },
    {
      q: "Are there any prepayment or foreclosure charges?",
      a: "To provide maximum financial agility, we offer plans with zero foreclosure charges after the first 12 EMIs. Standard bank foreclosure rates (1-4%) apply for early exits, depending on the chosen partner."
    },
    {
      q: "What are the primary documents required for application?",
      a: "Our digital-first approach requires only essential documentation: KYC (PAN & Aadhar), the last 3 months' salary slips, 6 months' bank statements, and current address proof. No physical copies are needed."
    },
    {
      q: "What is the standard processing fee for these loans?",
      a: "Processing fees typically range from 1% to 2.5% of the loan amount. We negotiate with our banking partners to secure the lowest possible administration costs for our premium clientele."
    },
    {
      q: "Does applying through Shauransh Capital affect my credit score?",
      a: "Our initial consultation and eligibility assessment involve a 'soft inquiry' which has zero impact on your credit score. A formal hard pull is only initiated once you provide consent to move forward with a specific offer."
    },
    {
      q: "Can I apply for a personal loan jointly with a co-applicant?",
      a: "Yes. Adding a co-applicant (spouse or parent) can significantly enhance your eligibility and help you secure a higher loan amount or a more competitive interest rate by combining metabolic income streams."
    },
    {
      q: "Is there a minimum and maximum tenure for repayment?",
      a: "We offer high flexibility with tenures ranging from 12 months up to 84 months (7 years), allowing you to structure EMIs that align perfectly with your monthly cash flow."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-brand-blue min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400" 
            alt="Luxury Office Detail" 
            className="w-full h-full object-cover opacity-20 grayscale scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,164,55,0.08)_0%,transparent_60%)]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
            <div className="flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em]">Executive Lending</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-7xl lg:text-[100px] font-serif font-medium leading-[0.9] tracking-tight"
              >
                Personal Loans <br />
                <span className="italic gold-text-gradient font-semibold">Designed for Ambition.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-white/40 leading-relaxed max-w-xl font-light"
              >
                Flexible funding solutions with institutional-grade guidance, rapid approvals, and transparent financial structuring tailored for the modern professional.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <button 
                  onClick={() => document.getElementById('personal-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 bg-brand-gold text-brand-blue font-black uppercase tracking-[0.3em] text-[13px] rounded-full shadow-[0_20px_40px_rgba(212,164,55,0.2)] hover:scale-105 transition-all duration-500"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => document.getElementById('personal-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 border-2 border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.3em] text-[13px] rounded-full transition-all duration-500"
                >
                  Speak to Advisor
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative glass-card p-4 rounded-[60px] overflow-hidden aspect-[4/5] shadow-2xl border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                  alt="High-rise Architecture" 
                  className="w-full h-full object-cover rounded-[44px] grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent" />
                
                {/* Floating Meta Card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[80%] glass-card p-8 rounded-3xl border-brand-gold/20 backdrop-blur-3xl text-center"
                >
                  <p className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-gold mb-2">Instant Elastic Credit</p>
                  <p className="text-3xl font-serif font-black italic gold-text-gradient leading-none">Limit Up To ₹1 Cr</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-20 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: "1000+", label: "Capital Successes" },
              { val: "99%", label: "Approval Delta" },
              { val: "50+", label: "Banking Vectors" },
              { val: "24h", label: "Priority Response" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 rounded-[40px] border-white/5 text-center flex flex-col gap-2 group hover:border-brand-gold/20 transition-all duration-500"
              >
                <div className="text-4xl lg:text-5xl font-serif font-black italic gold-text-gradient leading-none group-hover:scale-110 transition-transform duration-500">
                  {stat.val}
                </div>
                <div className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Strategic Advantage</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1] tracking-tight">
                Architectural <span className="italic font-semibold gold-text-gradient">Lending Standards.</span>
              </h2>
            </div>
            <p className="text-lg text-white/40 font-light max-w-sm border-l border-white/10 pl-8">
              Every facet of our personal lending engine is refined for elite efficiency and institutional trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 lg:p-12 rounded-[50px] border-white/5 hover:border-brand-gold/20 group relative overflow-hidden transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[60px] rounded-full group-hover:bg-brand-gold/10 transition-all" />
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-gold transition-colors">{benefit.title}</h3>
                <p className="text-white/40 font-light leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Execution Logic</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">The Priority Journey</h2>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                >
                  <div className="relative mb-10">
                    <div className="w-20 h-20 rounded-full bg-brand-blue border-2 border-white/10 flex items-center justify-center text-3xl font-serif font-black italic gold-text-gradient group-hover:border-brand-gold transition-all duration-500 shadow-2xl z-10 relative">
                      {step.number}
                    </div>
                    <div className="absolute inset-0 bg-brand-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white">{step.title}</h4>
                  <p className="text-sm text-white/30 font-light leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Institutional Screening</span>
                <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[0.9] tracking-tight">
                  Qualified <br /> <span className="gold-text-gradient font-semibold italic">Market Entry.</span>
                </h2>
              </div>
              <p className="text-xl text-white/40 leading-relaxed font-light max-w-md">
                We prioritize clients with established financial tracks and professional stability to ensure rapid institutional clearance.
              </p>
              <div className="flex items-center gap-6 p-10 glass-card rounded-[40px] border-brand-gold/20 bg-brand-gold/5">
                <div className="w-16 h-16 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-blue shadow-lg">
                  <ShieldCheck size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-gold">Compliance Rating</p>
                  <p className="text-2xl font-serif font-bold text-white italic">Elite Tier-1 Verified</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {eligibility.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-10 rounded-[50px] border-white/5 flex flex-col gap-1 hover:border-brand-gold/20 transition-all duration-500"
                >
                  <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 mb-2">{item.label}</p>
                  <p className="text-2xl font-bold text-white tracking-tight">{item.value}</p>
                  <p className="text-[11px] font-medium text-brand-gold/60">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMI Estimator Widget */}
      <section className="py-32 relative overflow-hidden" id="personal-emi">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Precision Analytics</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">Interactive <span className="italic font-semibold gold-text-gradient">Capital Estimator.</span></h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-12 glass-card p-10 md:p-20 rounded-[80px] border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.03)_0%,transparent_70%)] pointer-events-none" />
               
               <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 relative z-10">
                  <div className="flex flex-col gap-12">
                    {/* Loan Amount */}
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Desired Funding</label>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Loan Amount</h3>
                        </div>
                        <div className="text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{formatCurrency(loanAmount)}</div>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="100000" 
                          max="5000000" 
                          step="50000"
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                        />
                        <div className="absolute top-1/2 left-0 h-2 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2" style={{ width: `${((loanAmount - 100000) / (5000000 - 100000)) * 100}%` }} />
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Interest Matrix</label>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Rate of Interest (% p.a)</h3>
                        </div>
                        <div className="text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{interestRate}%</div>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="10" 
                          max="20" 
                          step="0.1"
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                        <div className="absolute top-1/2 left-0 h-2 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2" style={{ width: `${((interestRate - 10) / (20 - 10)) * 100}%` }} />
                      </div>
                    </div>

                    {/* Tenure */}
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Time Vector</label>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Tenure (Years)</h3>
                        </div>
                        <div className="text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{tenure} <span className="text-sm font-sans tracking-normal opacity-40">Years</span></div>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="1" 
                          max="7" 
                          step="1"
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                          value={tenure}
                          onChange={(e) => setTenure(Number(e.target.value))}
                        />
                        <div className="absolute top-1/2 left-0 h-2 bg-brand-gold rounded-full pointer-events-none -translate-y-1/2" style={{ width: `${((tenure - 1) / (7 - 1)) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center h-full">
                    <motion.div 
                      key={results.emi}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-12 lg:p-16 rounded-[60px] bg-[#061633] border-brand-gold/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 blur-[80px] rounded-full" />
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                          <span className="text-[11px] uppercase font-black tracking-[0.4em] text-white/30">Contractual Monthly EMI</span>
                          <div className="text-6xl lg:text-7xl font-serif font-black italic gold-text-gradient tracking-tighter">
                            {formatCurrency(results.emi)}
                          </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                              <span className="text-[11px] uppercase font-black tracking-[0.2em] text-white/30">Total Interest Sum</span>
                              <span className="text-xl font-serif font-bold text-white italic">{formatCurrency(results.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between items-center py-4">
                              <span className="text-[11px] uppercase font-black tracking-[0.2em] text-white/30">Gross Repayment Sum</span>
                              <span className="text-xl font-serif font-bold text-white italic">{formatCurrency(results.totalPayment)}</span>
                            </div>
                        </div>
                        <button 
                          onClick={() => {
                            setShowFormWithAmount(loanAmount.toString());
                            document.getElementById('personal-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-6 gold-gradient rounded-3xl font-black text-[13px] uppercase tracking-[0.3em] text-brand-blue shadow-2xl hover:scale-[1.02] transition-all duration-500"
                        >
                          Secure This Quote
                        </button>
                      </div>
                    </motion.div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/5 blur-[150px] rounded-full translate-y-1/2 scale-150" />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="glass-card p-12 lg:p-24 rounded-[80px] border-brand-gold/20 flex flex-col items-center text-center gap-10 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative">
            <div className="absolute top-0 right-1/4 w-32 h-32 bg-brand-gold/10 blur-[60px] rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />

            <div className="flex flex-col gap-6">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em] animate-pulse">Action Directive</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1] tracking-tight">
                Structure Your <br /> <span className="italic font-semibold gold-text-gradient">Financial Next Step.</span>
              </h2>
            </div>
            <p className="text-xl text-white/40 font-light max-w-2xl leading-relaxed">
              Elevate your capital position with institutional precision. Our senior advisors are ready to architect your personal funding strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              <motion.button 
                whileHover={{ y: -5, boxShadow: '0 25px 50px rgba(212, 164, 55, 0.3)' }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('personal-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-16 py-6 gold-gradient rounded-full text-brand-blue font-black uppercase tracking-[0.3em] text-[14px] shadow-2xl transition-all duration-500"
              >
                Apply Now
              </motion.button>
              <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('personal-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-16 py-6 border-2 border-white/10 hover:border-brand-gold/50 rounded-full text-white font-black uppercase tracking-[0.3em] text-[14px] transition-all duration-500"
              >
                Book Consultation
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <div id="personal-form">
        <LeadForm defaultLoanType="Personal Loan" defaultAmount={showFormWithAmount} />
      </div>

      {/* FAQ Section */}
      <section className="py-32 relative bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block"
            >
              Intelligence Base
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight"
            >
              Strategic Inquiries
            </motion.h2>
          </div>

          <div className="flex flex-col gap-6">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-[32px] border-white/5 overflow-hidden transition-all duration-500"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 lg:p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-xl font-bold transition-all duration-500 ${openFaq === i ? 'text-brand-gold italic' : 'text-white/80 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-brand-gold border-brand-gold text-brand-blue rotate-45' : 'text-white/30 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                    <Plus size={20} strokeWidth={3} />
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: openFaq === i ? 'auto' : 0, 
                    opacity: openFaq === i ? 1 : 0 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
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
        
        {/* Subtle background decoration for the bottom FAQ */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(212,164,55,0.05)_0%,transparent_50%)] pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
}

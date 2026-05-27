import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  FileText, 
  TrendingDown, 
  Gem, 
  Users, 
  Calculator,
  Plus,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { getSettings } from '../lib/settings';
import { useNavigation } from '../context/NavigationContext';

export default function HomeLoans() {
  const { setActiveView } = useNavigation();
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [showFormWithAmount, setShowFormWithAmount] = useState<string | undefined>(undefined);
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings('emi_rates');
      if (data && data.homeLoan) {
        setInterestRate(Number(data.homeLoan));
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
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Optimized Interest Rates",
      desc: "We leverage our institutional network to secure the most competitive home finance rates, ensuring your wealth remains protected."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Seamless Documentation",
      desc: "Our expert advisors navigate the complexities of property paperwork, title deeds, and legal clearances on your behalf."
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Luxury Property Focus",
      desc: "Specialized funding structures for premium residential assets, high-rise penthouses, and bespoke estate developments."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Stable Repayment Models",
      desc: "Flexible EMI planning and tenure extensions up to 30 years to maintain your lifestyle while building your heritage."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Portfolio Guidance",
      desc: "Integrating your home acquisition into your broader financial roadmap with precision and foresight."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Priority Legal Clearance",
      desc: "Accelerated technical and legal evaluation of properties through our pre-approved institutional channels."
    }
  ];

  const steps = [
    { number: "01", title: "Property Sourcing & Consultation", desc: "Aligning your real estate aspirations with a robust financial strategy." },
    { number: "02", title: "Pre-Approval Phase", desc: "Instant eligibility assessment and digital sanction of your capital limit." },
    { number: "03", title: "Technical & Legal Review", desc: "Extensive verification of the asset's security and regulatory compliance." },
    { number: "04", title: "Contract Finalization", desc: "Structuring the optimal interest model and repayment vectors for your signature." },
    { number: "05", title: "Disbursement & Handover", desc: "Swift execution of funds and transition to your new architectural address." }
  ];

  const faqs = [
    {
      q: "What is the maximum tenure available for home loans?",
      a: "We offer extended amortization periods of up to 30 years, allowing for lower EMIs and greater financial flexibility over the long term."
    },
    {
      q: "Can I get a loan for a property under construction?",
      a: "Yes, we facilitate construction-linked funding for premium projects, ensuring disbursements are aligned with the building's progress."
    },
    {
      q: "Are there tax benefits associated with these loans?",
      a: "Home loans in India offer significant tax deductions under Section 80C and Section 24(b). Our advisors can help you optimize these benefits."
    },
    {
      q: "Do you assist with balance transfers from other banks?",
      a: "We specialize in Home Loan Balance Transfers, enabling you to move your debt to a lower interest regime and reduce your overall outflow."
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
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2400" 
            alt="Luxury Modern Villa" 
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,164,55,0.05)_0%,transparent_50%)]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10 w-full">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveView('home')}
            className="mb-8 flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-brand-gold/40 hover:bg-white/5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all w-fit cursor-pointer"
          >
            <ArrowLeft size={14} className="text-brand-gold" /> Back to Main Portal
          </motion.button>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
            <div className="flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em]">Residential Heritage</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-7xl lg:text-[85px] font-serif font-medium leading-[1.1] md:leading-[0.95] tracking-tight"
              >
                Turning Aspirations <br />
                <span className="italic gold-text-gradient font-semibold">Into Addresses.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-white/40 leading-relaxed max-w-xl font-light italic"
              >
                Premium home financing experiences built on trust, long-term security, and architectural stability. Your journey to an elite address begins here.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <button 
                  onClick={() => document.getElementById('home-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 bg-brand-gold text-brand-blue font-black uppercase tracking-[0.3em] text-[13px] rounded-full shadow-[0_20px_40px_rgba(212,164,55,0.2)] hover:scale-105 transition-all duration-500"
                >
                  Begin Application
                </button>
                <button 
                  onClick={() => document.getElementById('home-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 border-2 border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.3em] text-[13px] rounded-full transition-all duration-500"
                >
                  Property Consulting
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-4 rounded-[60px] border-white/5 shadow-2xl relative overflow-hidden aspect-[4/5] group">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Home Architecture" 
                  className="w-full h-full object-cover rounded-[44px] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[85%] text-center p-8 glass-card rounded-3xl border-brand-gold/10 backdrop-blur-3xl">
                   <p className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-gold mb-2">Heritage Capital</p>
                   <p className="text-2xl font-serif font-black italic gold-text-gradient leading-none">Low Impact Interest</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Home Advantage</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1] tracking-tight">
                Refined Financing for <span className="italic font-semibold gold-text-gradient">Elite Residency.</span>
              </h2>
            </div>
            <p className="text-lg text-white/40 font-light max-w-sm border-l border-white/10 pl-8">
              Every address carries a legacy. We ensure your financial structure is as robust as the architecture you occupy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 sm:p-10 lg:p-14 glass-card rounded-[28px] sm:rounded-[60px] border-white/5 hover:border-brand-gold/20 group relative overflow-hidden transition-all duration-700"
              >
                <div className="w-20 h-20 rounded-[28px] bg-brand-gold/5 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-xl border border-brand-gold/10 group-hover:scale-110 group-hover:shadow-brand-gold/30">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-brand-gold transition-colors">{benefit.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg italic">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
           <div className="text-center mb-24">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Amortization Engine</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">Residential <span className="italic font-semibold gold-text-gradient">Wealth Simulator.</span></h2>
           </div>

            <div className="grid lg:grid-cols-12 gap-6 sm:gap-12 items-stretch">
             <div className="lg:col-span-12 glass-card p-5 sm:p-10 md:p-20 rounded-[28px] sm:rounded-[80px] border-white/5 relative overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 relative z-10">
                   <div className="flex flex-col gap-8 sm:gap-14">
                      {/* Loan Amount */}
                      <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                          <div className="flex flex-col gap-1 sm:gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Total Outlay Required</label>
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Loan Amount</h3>
                          </div>
                          <div className="text-2xl sm:text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{formatCurrency(loanAmount)}</div>
                        </div>
                        <div className="relative pt-2">
                          <input 
                            type="range" 
                            min="1000000" 
                            max="100000000" 
                            step="500000"
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                          <div className="flex flex-col gap-1 sm:gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Contractual Yield</label>
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Interest Rate (% p.a)</h3>
                          </div>
                          <div className="text-2xl sm:text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{interestRate}%</div>
                        </div>
                        <div className="relative pt-2">
                          <input 
                            type="range" 
                            min="7" 
                            max="12" 
                            step="0.1"
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Tenure */}
                      <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                          <div className="flex flex-col gap-1 sm:gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Stability Horizon</label>
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Tenure in Years</h3>
                          </div>
                          <div className="text-2xl sm:text-4xl font-serif font-black gold-text-gradient italic tracking-tighter">{tenure} <span className="text-sm font-sans tracking-normal opacity-40">Yrs</span></div>
                        </div>
                        <div className="relative pt-2">
                          <input 
                            type="range" 
                            min="5" 
                            max="30" 
                            step="1"
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold relative z-10"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                          />
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-col justify-center">
                     <motion.div 

                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 sm:p-14 lg:p-20 rounded-[32px] sm:rounded-[70px] bg-[#061633] border-brand-gold/15 shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative"
                      >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] rounded-full" />
                        <div className="flex flex-col gap-8 sm:gap-12 text-center lg:text-left">
                          <div className="flex flex-col gap-3 sm:gap-4">
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Amortized Monthly Installment</span>
                            <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-black italic gold-text-gradient tracking-tighter leading-none">
                              {formatCurrency(results.emi)}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 text-left sm:text-center lg:text-left">
                            <div className="flex flex-col gap-1 sm:gap-2">
                              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Total Repayment</span>
                              <span className="text-xl sm:text-2xl font-serif font-bold text-white italic tracking-tight">{formatCurrency(results.totalPayment)}</span>
                            </div>
                            <div className="flex flex-col gap-1 sm:gap-2">
                              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Interest Outflow</span>
                              <span className="text-xl sm:text-2xl font-serif font-bold text-white italic tracking-tight">{formatCurrency(results.totalInterest)}</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => {
                              setShowFormWithAmount(loanAmount.toString());
                              document.getElementById('home-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full py-4 sm:py-7 gold-gradient rounded-xl sm:rounded-[32px] font-black text-xs sm:text-[14px] uppercase tracking-[0.4em] text-brand-blue shadow-2xl hover:scale-[1.02] transition-all duration-500"
                          >
                             Seal Interest Agreement
                          </button>
                        </div>
                     </motion.div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6">Execution Protocol</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1] tracking-tight">The Heritage Path</h2>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-10">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                >
                  <div className="w-24 h-24 rounded-full border-2 border-white/5 bg-brand-blue flex items-center justify-center text-3xl font-serif font-black italic gold-text-gradient group-hover:border-brand-gold/40 transition-all duration-500 shadow-2xl relative mb-10">
                     <div className="absolute inset-0 bg-brand-gold/5 blur-xl group-hover:opacity-100 transition-opacity" />
                     {step.number}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-white transition-colors group-hover:text-brand-gold">{step.title}</h4>
                  <p className="text-sm text-white/30 font-light leading-relaxed max-w-xs">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-20 text-center">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Strategic Inquiries</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">Home Finance Directives</h2>
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
                  className="w-full p-6 sm:p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-base sm:text-xl font-bold transition-all duration-500 ${openFaq === i ? 'text-brand-gold italic' : 'text-white/80 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${openFaq === i ? 'bg-brand-gold border-brand-gold text-brand-blue rotate-45' : 'text-white/30 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                    <Plus size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 sm:p-10 pt-0 text-base sm:text-lg text-white/40 font-light leading-relaxed border-t border-white/5 mx-0 sm:mx-10 animate-fade-in">
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
          <div className="glass-card p-6 sm:p-20 lg:p-32 rounded-[32px] sm:rounded-[100px] border-brand-gold/10 flex flex-col items-center gap-12 shadow-[0_80px_160px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex flex-col gap-8 relative z-10">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.6em] animate-pulse">Legacy Acquisition Directive</span>
              <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tighter text-white">
                Secure Your <br /> <span className="italic font-semibold gold-text-gradient">Architectural Future.</span>
              </h2>
            </div>
            
            <p className="text-2xl text-white/40 font-light max-w-2xl leading-relaxed italic relative z-10">
              Your home is more than an asset; it's the foundation of your family's heritage. Let us engineer the capital that makes it possible.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-6 relative z-10">
              <motion.button 
                whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(212, 164, 55, 0.4)' }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('home-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-20 py-7 gold-gradient rounded-full text-brand-blue font-black uppercase tracking-[0.4em] text-[14px] shadow-2xl transition-all duration-500"
              >
                Claim Priority Funding
              </motion.button>
              <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('home-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-20 py-7 border-2 border-white/10 hover:border-brand-gold/50 rounded-full text-white font-black uppercase tracking-[0.4em] text-[14px] transition-all duration-500"
              >
                Inquire Property Terms
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <div id="home-form">
        <LeadForm defaultLoanType="Home Loan" defaultAmount={showFormWithAmount} />
      </div>

      <Footer />
    </div>
  );
}

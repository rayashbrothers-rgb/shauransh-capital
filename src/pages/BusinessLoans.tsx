import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe, 
  Building2, 
  LineChart,
  PieChart,
  ArrowUpRight,
  ChevronRight,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { useNavigation } from '../context/NavigationContext';

const growthData = [
  { month: 'Jan', expansion: 1000, capital: 800 },
  { month: 'Feb', expansion: 1200, capital: 900 },
  { month: 'Mar', expansion: 1100, capital: 1100 },
  { month: 'Apr', expansion: 1300, capital: 1200 },
  { month: 'May', expansion: 1500, capital: 1400 },
  { month: 'Jun', expansion: 1800, capital: 1600 },
];

export default function BusinessLoans() {
  const { setActiveView } = useNavigation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const solutions = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "MSME Support",
      desc: "Tailored financial vehicles designed to empower small and medium enterprises with the liquidity needed for operational stability."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Working Capital",
      desc: "Optimize your cash flow cycles with flexible credit lines and short-term capital injections for day-to-day excellence."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Expansion Financing",
      desc: "Strategically structured long-term debt to fund new facilities, market entry, or large-scale infrastructure acquisition."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Growth Consultation",
      desc: "Beyond capital, we provide institutional-grade advisory to ensure your financial structure aligns with your scaling roadmap."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Strategic Banking",
      desc: "Direct access to our network of 50+ banking partners, ensuring your enterprise receives the most favorable institutional terms."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Risk Mitigation",
      desc: "Advanced structuring techniques to manage financial exposure while maximizing your enterprise's leveraging power."
    }
  ];

  const features = [
    {
      title: "Higher Loan Limits",
      value: "Up to ₹10 Cr",
      desc: "Substantial capital reserves for high-impact industrial and corporate requirements."
    },
    {
      title: "Structured Financing",
      value: "Bespoke Models",
      desc: "Custom repayment schedules designed around your unique business revenue cycles."
    },
    {
      title: "Rapid Approvals",
      value: "Priority Track",
      desc: "Institutional decision-making engine optimized for time-sensitive commercial opportunities."
    },
    {
      title: "Expert Advisory",
      value: "Senior Consultants",
      desc: "Direct partnership with experienced financial architects for complex credit needs."
    }
  ];

  const faqs = [
    {
      q: "What is the maximum turnover required for expansion financing?",
      a: "Requirements vary by industry sector, but we typically look for established revenue tracks of at least ₹1 Crore per annum for high-limit expansion capital."
    },
    {
      q: "How does Shauransh Capital assist in the documentation process?",
      a: "We provide a dedicated case manager who handles the heavy lifting of institutional paperwork, ensuring your application meets every compliance checkbox for Tier-1 banks."
    },
    {
      q: "Can we get funding for tech-based startups?",
      a: "Yes, we have specialized 'Innovation Credit' lines for tech-driven companies with proven unit economics and scalability, even with relatively short operational histories."
    },
    {
      q: "What are the collateral requirements for business loans?",
      a: "We facilitate both secured and unsecured business credit. Collateral requirements depend on the loan size, business rating, and the specific banking partner selected."
    }
  ];

  return (
    <div className="bg-brand-blue min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 overflow-hidden min-h-[95vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=2400" 
            alt="Boardroom" 
            className="w-full h-full object-cover opacity-15 grayscale scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue via-brand-blue/90 to-brand-blue" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,164,55,0.1)_0%,transparent_60%)]" />
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
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em]">Enterprise Growth</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-7xl lg:text-[90px] font-serif font-medium leading-[1.1] md:leading-[0.9] tracking-tight"
              >
                Capital Solutions <br />
                <span className="italic gold-text-gradient font-semibold">Built for Expansion.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-white/40 leading-relaxed max-w-xl font-light"
              >
                Strategic funding vehicles and institutional advisory designed to navigate the complexities of corporate scaling and industrial growth.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <button 
                  onClick={() => document.getElementById('business-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 bg-brand-gold text-brand-blue font-black uppercase tracking-[0.3em] text-[13px] rounded-full shadow-[0_20px_40px_rgba(212,164,55,0.2)] hover:scale-105 transition-all duration-500"
                >
                  Initiate Growth
                </button>
                <button 
                  onClick={() => document.getElementById('business-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 border-2 border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.3em] text-[13px] rounded-full transition-all duration-500"
                >
                  Expansion Advisory
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-10 rounded-[60px] border-white/5 relative overflow-hidden bg-[#061633]/80 backdrop-blur-3xl shadow-2xl">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Capital Trajectory</span>
                      <h3 className="text-2xl font-serif font-bold text-white italic">Growth Simulation</h3>
                   </div>
                   <div className="px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold">+12.4% yield</span>
                   </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="colorExpansion" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4A437" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#D4A437" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 700 }}
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0A1A35', border: '1px solid #D4A43733', borderRadius: '12px', fontSize: '12px' }}
                        itemStyle={{ color: '#D4A437' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expansion" 
                        stroke="#D4A437" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorExpansion)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-10 pt-10 border-t border-white/5">
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 text-center">Capital Utilization</span>
                      <div className="flex justify-center items-end gap-2">
                         <span className="text-3xl font-serif font-black italic gold-text-gradient">84%</span>
                         <ArrowUpRight size={18} className="text-brand-gold mb-1" />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 text-center">Market Authority</span>
                      <div className="flex justify-center items-end gap-2">
                         <span className="text-3xl font-serif font-black italic gold-text-gradient">Global</span>
                         <Globe size={18} className="text-brand-gold mb-1" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Decorative nodes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Enterprise Ecosystem</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1] tracking-tight">
                Funding Modern <span className="italic font-semibold gold-text-gradient">Commerce Architecture.</span>
              </h2>
            </div>
            <p className="text-lg text-white/40 font-light max-w-sm border-l border-white/10 pl-8">
              A precise suite of financial instruments designed for the high-velocity requirements of modern industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 sm:p-10 lg:p-14 rounded-[28px] sm:rounded-[60px] border-white/5 hover:border-brand-gold/20 group relative overflow-hidden transition-all duration-700"
              >
                <div className="w-16 h-16 rounded-[24px] bg-brand-gold/5 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-xl border border-brand-gold/10 group-hover:scale-110 group-hover:shadow-brand-gold/30">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    {solution.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-brand-gold transition-colors">{solution.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg">{solution.desc}</p>
                <div className="mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.3em] text-[10px]">
                    Explore Protocol <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Billboard */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-6 text-center lg:text-left"
              >
                <div className="flex flex-col gap-2">
                   <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-gold">{feature.title}</h4>
                   <p className="text-4xl font-serif font-black italic text-white">{feature.value}</p>
                </div>
                <p className="text-sm text-white/30 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MSME Focus Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative"
             >
                <div className="aspect-square rounded-[32px] sm:rounded-[80px] overflow-hidden border-2 border-white/5 shadow-2xl relative group">
                   <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                    alt="Corporate Tower" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent opacity-80" />
                   
                   {/* Overlay Detail */}
                   <div className="absolute bottom-6 left-6 right-6 sm:bottom-16 sm:left-16 sm:right-16 glass-card p-4 sm:p-10 rounded-[20px] sm:rounded-[40px] border-brand-gold/20 backdrop-blur-2xl">
                      <div className="flex items-center gap-6">
                         <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-brand-gold flex items-center justify-center text-brand-blue shadow-lg shrink-0">
                            <TrendingUp size={20} className="sm:w-8 sm:h-8" strokeWidth={2.5} />
                         </div>
                         <div>
                            <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Industrial Velocity</p>
                            <p className="text-sm sm:text-2xl font-serif font-bold text-white italic">Aggressive MSME Scaling</p>
                         </div>
                      </div>
                   </div>
                </div>
                {/* Floating decor */}
                <div className="absolute -top-10 -left-10 w-40 h-40 border border-brand-gold/10 rounded-full animate-pulse" />
                <div className="absolute bottom-20 -right-10 w-20 h-20 bg-brand-gold/5 blur-2xl flex items-center justify-center text-brand-gold">
                   <LineChart size={40} strokeWidth={1} />
                </div>
             </motion.div>

             <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Regional Dominance</span>
                  <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[0.95] tracking-tight text-white">
                    Fueling the Next <br /> <span className="italic font-semibold gold-text-gradient">Industrial Corridor.</span>
                  </h2>
                </div>
                <p className="text-xl text-white/40 leading-relaxed font-light">
                  We specialize in high-value capital intervention for businesses positioned in the heart of Greater Noida's economic expansion, providing the leveraged fuel for true market leadership.
                </p>
                <div className="space-y-6">
                   {[
                     "Direct Access to Institutional Liquidity",
                     "Strategic Working Capital Optimization",
                     "MSME Specialized Credit Frameworks",
                     "Private Growth Consultation"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-4 text-white/80 group">
                        <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-300">
                           <ChevronRight size={14} strokeWidth={3} />
                        </div>
                        <span className="text-lg font-medium">{item}</span>
                     </div>
                   ))}
                </div>
                <button className="mt-6 px-12 py-5 bg-white/5 border border-white/10 hover:border-brand-gold/40 hover:bg-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 text-white w-fit">
                   Request Institutional Overview
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-20">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Directives</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">Enterprise Query Base</h2>
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
                  className="w-full p-6 sm:p-8 lg:p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg sm:text-xl font-bold transition-all duration-500 ${openFaq === i ? 'text-brand-gold italic' : 'text-white/80 group-hover:text-white'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${openFaq === i ? 'bg-brand-gold border-brand-gold text-brand-blue rotate-45' : 'text-white/30 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                    <Plus size={20} strokeWidth={3} />
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 sm:p-10 pt-0 text-base sm:text-lg text-white/40 font-light leading-relaxed border-t border-white/5 mx-0 sm:mx-10">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="glass-card p-6 sm:p-16 lg:p-28 rounded-[32px] sm:rounded-[80px] border-brand-gold/20 flex flex-col items-center text-center gap-12 shadow-[0_60px_120px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex flex-col gap-6 relative z-10">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em] tracking-[0.6em]">Growth Partner Directive</span>
              <h2 className="text-5xl md:text-7xl lg:text-[100px] font-serif font-medium leading-[0.9] tracking-tighter text-white">
                Launch Your <br /> <span className="italic font-semibold gold-text-gradient">Next Expansion Vector.</span>
              </h2>
            </div>
            
            <p className="text-2xl text-white/40 font-light max-w-3xl leading-relaxed relative z-10 italic">
              Experience a private institutional partnership crafted for the ambitious modern business. Let's engineering your financial future.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-10 relative z-10">
              <motion.button 
                whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(212, 164, 55, 0.4)' }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('business-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-16 py-6 gold-gradient rounded-full text-brand-blue font-black uppercase tracking-[0.3em] text-[14px] shadow-2xl transition-all duration-500"
              >
                Apply for Priority Funding
              </motion.button>
              <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('business-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-16 py-6 border-2 border-white/10 hover:border-brand-gold/50 rounded-full text-white font-black uppercase tracking-[0.3em] text-[14px] transition-all duration-500"
              >
                Book Strategic Consultation
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <div id="business-form">
        <LeadForm defaultLoanType="Business Loan" />
      </div>

      <Footer />
    </div>
  );
}

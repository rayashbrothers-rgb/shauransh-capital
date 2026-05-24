import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Network, 
  Layers, 
  Zap, 
  ArrowUpRight,
  Database,
  LineChart,
  PieChart,
  Activity,
  ChevronRight,
  Maximize2,
  ArrowLeft
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart as RechartsLineChart
} from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { useNavigation } from '../context/NavigationContext';

const performanceData = [
  { name: '2020', value: 4000, trend: 2400 },
  { name: '2021', value: 3000, trend: 1398 },
  { name: '2022', value: 2000, trend: 9800 },
  { name: '2023', value: 2780, trend: 3908 },
  { name: '2024', value: 1890, trend: 4800 },
  { name: '2025', value: 2390, trend: 3800 },
  { name: '2026', value: 3490, trend: 4300 },
];

export default function FinancialSolutions() {
  const { setActiveView } = useNavigation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const solutions = [
    {
      title: "Wealth Structuring",
      desc: "Architecting intergenerational wealth transfer through sophisticated legal and fiscal frameworks tailored for global high-net-worth foundations.",
      icon: <Layers />,
      metrics: ["Tax Efficiency", "Succession Planning", "Jurisdiction Optimization"]
    },
    {
      title: "Investment Guidance",
      desc: "Quantitative and qualitative analysis across traditional and alternative asset classes, targeting alpha through proprietary risk-adjusted models.",
      icon: <TrendingUp />,
      metrics: ["Private Equity", "Hedge Funds", "ESG Integration"]
    },
    {
      title: "Institutional Advisory",
      desc: "Strategic consulting for corporate treasuries, endowments, and family offices, ensuring structural resilience and capital liquidity.",
      icon: <Globe />,
      metrics: ["Mergers & Acquisitions", "Debt Restructuring", "Corporate Finance"]
    },
    {
      title: "Financial Planning",
      desc: "Holistic life-cycle capital allocation strategies, integrating liquidity requirements with long-term retirement and legacy objectives.",
      icon: <LineChart />,
      metrics: ["Cashflow Analysis", "Risk Profiling", "Asset Allocation"]
    },
    {
      title: "Strategic Consultation",
      desc: "Direct access to our senior partners for bespoke advisory on special-purpose vehicles and complex cross-border financial engineering.",
      icon: <Activity />,
      metrics: ["Venture Capital", "Real Estate Funds", "Direct Investments"]
    },
    {
      title: "Capital Intelligence",
      desc: "Harnessing real-time market data and machine learning to identify structural arbitrage and emerging macroeconomic opportunities.",
      icon: <Cpu />,
      metrics: ["Data Analytics", "Market Sentiment", "Predictive Modeling"]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-slate-200 overflow-x-hidden">
      <Navbar />

      {/* Hero: Strategic Financial Intelligence */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,164,55,0.05)_0%,transparent_70%)]" />
          
          {/* Animated Data Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(rgba(212,164,55,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Glowing Web/Network Visual */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full pt-20 lg:pt-0">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveView('home')}
            className="mb-8 flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-brand-gold/40 hover:bg-white/5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all w-fit cursor-pointer"
          >
            <ArrowLeft size={14} className="text-brand-gold" /> Back to Main Portal
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-4 py-2 px-6 rounded-full bg-brand-gold/10 border border-brand-gold/20"
              >
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[10px] uppercase font-black tracking-[0.5em] text-brand-gold">Global Intelligence Network</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-8xl font-serif font-medium leading-[1.1] md:leading-[0.9] tracking-tighter"
              >
                Strategic <br />
                Financial <span className="italic gold-text-gradient font-black">Intelligence</span> <br />
                <span className="text-2xl md:text-5xl text-white/40 block mt-4 font-light italic">for Modern Wealth.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xl text-slate-400 font-light max-w-xl leading-relaxed italic"
              >
                Navigating the complexities of global markets through institutional-grade advisory and data-driven wealth preservation strategies.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-wrap gap-8"
              >
                <button 
                  onClick={() => document.getElementById('fs-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-6 bg-brand-gold text-[#021021] font-black uppercase tracking-[0.4em] text-[13px] rounded-full shadow-[0_20px_50px_rgba(212,164,55,0.2)] hover:scale-105 transition-all duration-500 group overflow-hidden relative"
                >
                   <span className="relative z-10">Commission Advisory</span>
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <button 
                  onClick={() => document.getElementById('fs-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-6 border border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.4em] text-[13px] rounded-full transition-all duration-500 backdrop-blur-md"
                >
                   Review Portfolio
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-12 pt-8"
              >
                 <div className="flex flex-col gap-1">
                    <span className="text-3xl font-serif font-black gold-text-gradient italic">$2.4B</span>
                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Capital Managed</span>
                 </div>
                 <div className="w-[1px] h-12 bg-white/10" />
                 <div className="flex flex-col gap-1">
                    <span className="text-3xl font-serif font-black text-white italic">14+</span>
                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Jurisdictions</span>
                 </div>
              </motion.div>
            </div>

            {/* Interactive Data Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-12 rounded-[60px] border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-xl">
                 <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
                 
                 <div className="flex justify-between items-center mb-12">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Global Market Index</span>
                      <p className="text-2xl font-serif font-bold text-white italic">Capital Flow Analysis</p>
                   </div>
                   <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/20 text-brand-gold">
                      <BarChart3 size={24} />
                   </div>
                 </div>

                 <div className="h-[300px] w-full mb-12">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={performanceData}>
                       <defs>
                         <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#D4A437" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#D4A437" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                       <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis hide />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(212,164,55,0.2)', borderRadius: '12px' }}
                         itemStyle={{ color: '#D4A437' }}
                       />
                       <Area type="monotone" dataKey="value" stroke="#D4A437" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>

                 <div className="grid grid-cols-3 gap-8">
                    {[
                      { l: "Volatility", v: "1.2%" },
                      { l: "Yield", v: "12.4%" },
                      { l: "Security", v: "AA+" }
                    ].map((idx, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-center flex flex-col gap-1">
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30">{idx.l}</span>
                        <span className="text-xl font-serif font-black italic gold-text-gradient">{idx.v}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
             <div className="space-y-6">
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em] block">Structural Integrity</span>
                <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1] tracking-tighter">
                   Institutional <br /> <span className="italic font-black gold-text-gradient">Wealth Architecture.</span>
                </h2>
             </div>
             <p className="text-xl text-slate-400 font-light max-w-md border-l border-brand-gold/30 pl-8 leading-relaxed italic">
                Our bespoke advisory model integrates multi-jurisdictional compliance with aggressive growth strategies for the modern capital era.
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {solutions.map((sol, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="p-10 lg:p-14 rounded-[50px] bg-white/[0.02] border border-white/5 hover:border-brand-gold/30 group transition-all duration-700 relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                 
                 <div className="w-20 h-20 rounded-3xl bg-brand-gold/5 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-[#020617] transition-all duration-500 shadow-xl border border-brand-gold/10 group-hover:scale-110 group-hover:shadow-brand-gold/30">
                   <div className="transition-transform duration-500 group-hover:scale-110">
                    {sol.icon}
                   </div>
                 </div>

                 <h3 className="text-2xl font-serif font-black text-white italic mb-6 group-hover:text-brand-gold transition-colors">{sol.title}</h3>
                 <p className="text-slate-400 font-light leading-relaxed mb-10 text-lg italic">{sol.desc}</p>
                 
                 <div className="space-y-4">
                    {sol.metrics.map((m, j) => (
                      <div key={j} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        {m}
                      </div>
                    ))}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Intelligence Dashboard Visual */}
      <section className="py-40 relative bg-[#010411]">
        <div className="max-w-7xl mx-auto px-8 overflow-hidden">
           <div className="glass-card p-12 md:p-24 rounded-[100px] border-white/5 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-24 items-center">
                 <div className="space-y-16">
                    <div className="space-y-6">
                       <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Real-time Ecosystem</span>
                       <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1] tracking-tighter">
                          Autonomous <br /> <span className="italic font-black gold-text-gradient">Capital Flow.</span>
                       </h2>
                       <p className="text-xl text-slate-400 font-light max-w-xl italic leading-relaxed pt-4">
                          Our intelligence layer monitors global structural shifts, identifying early alpha opportunities across 40+ liquid markets.
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="flex items-center gap-2">
                             <Database className="text-brand-gold" size={16} />
                             <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40">Data Throughput</span>
                          </div>
                          <div className="text-4xl font-serif font-black italic gold-text-gradient tracking-tighter">1.2 PB/d</div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: '85%' }}
                               transition={{ duration: 2 }}
                               className="h-full bg-brand-gold/60" 
                             />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-2">
                             <Maximize2 className="text-brand-gold" size={16} />
                             <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40">Arbitrage Nodes</span>
                          </div>
                          <div className="text-4xl font-serif font-black italic text-white tracking-tighter">4,000+</div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: '92%' }}
                               transition={{ duration: 2, delay: 0.2 }}
                               className="h-full bg-brand-gold/60" 
                             />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="relative">
                    <div className="aspect-square rounded-[80px] bg-[#020818] border border-white/5 shadow-inner p-10 flex flex-col gap-8 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(212,164,55,0.05)_0%,transparent_25%,transparent_75%,rgba(212,164,55,0.05)_100%)] animate-[spin_10s_linear_infinite]" />
                       
                       <div className="flex justify-between items-center relative z-10 px-4">
                         <span className="text-[10px] uppercase font-black underline underline-offset-8 decoration-brand-gold/50 tracking-[0.2em] text-white/30 italic">L1 Security Layer</span>
                         <Zap className="text-brand-gold animate-pulse" size={16} />
                       </div>

                       <div className="flex-1 flex flex-col justify-center gap-12 relative z-10">
                          <div className="text-center space-y-2">
                             <p className="text-[11px] uppercase font-black tracking-[0.6em] text-brand-gold/60">Risk Protocol</p>
                             <h4 className="text-7xl font-serif font-black italic text-white tracking-tighter">99.9<span className="text-brand-gold text-4xl">%</span></h4>
                             <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Operational Resilience</p>
                          </div>
                          
                          <div className="flex justify-center gap-4">
                             {[...Array(5)].map((_, i) => (
                               <motion.div 
                                 key={i}
                                 animate={{ 
                                   height: [20, 50, 30, 60, 20],
                                   backgroundColor: ['rgba(212,164,55,0.2)', 'rgba(212,164,55,0.8)', 'rgba(212,164,55,0.2)']
                                 }}
                                 transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                 className="w-2 rounded-full"
                               />
                             ))}
                          </div>
                       </div>

                       <button className="w-full py-6 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-[10px] uppercase font-black tracking-[0.4em] text-brand-gold hover:bg-brand-gold hover:text-[#020617] transition-all duration-500 relative z-10">
                          Access Intelligence
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Advisory Tiers */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8">
           <div className="text-center mb-24">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.6em] mb-6 block">Engagement Protocols</span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1.2] tracking-tighter">Strategic Partnerships</h2>
           </div>

           <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {[
                {
                  tier: "Institutional",
                  price: "Bespoke Equity",
                  features: ["Full Capital Architecture", "L1 Intelligence Access", "Regulatory Interface", "Senior Partner Council", "Bespoke Fund Structuring"],
                  cta: "Initiate Discovery",
                  featured: true
                },
                {
                  tier: "Private Wealth",
                  price: "Retainer-based",
                  features: ["Alpha-focused Allocation", "Tax & Legacy Structuring", "Quarterly Risk Audits", "Investment Committee Seat", "24/7 Priority Protocol"],
                  cta: "Request Invitation",
                  featured: false
                }
              ].map((tier, i) => (
                <div key={i} className={`p-16 rounded-[80px] flex flex-col items-center text-center gap-10 transition-all duration-700 relative overflow-hidden ${
                  tier.featured 
                    ? 'bg-brand-gold text-[#020617] shadow-[0_50px_100px_rgba(212,164,55,0.2)]' 
                    : 'bg-white/[0.02] border border-white/5 text-slate-200'
                }`}>
                   <div className="flex flex-col gap-4">
                      <span className={`text-[11px] uppercase font-black tracking-[0.5em] ${tier.featured ? 'text-[#020617]/50' : 'text-brand-gold'}`}>{tier.tier}</span>
                      <h3 className="text-4xl font-serif font-black italic tracking-tighter">{tier.price}</h3>
                   </div>

                   <div className="w-full h-px bg-current opacity-10" />

                   <ul className="space-y-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className={`text-sm font-bold uppercase tracking-widest ${tier.featured ? 'opacity-80' : 'opacity-40'}`}>{f}</li>
                      ))}
                   </ul>

                   <button className={`mt-4 px-12 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[12px] transition-all duration-500 ${
                     tier.featured 
                       ? 'bg-[#020617] text-brand-gold shadow-2xl hover:scale-105' 
                       : 'border border-white/10 text-white hover:border-brand-gold/50'
                   }`}>
                      {tier.cta}
                   </button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Global Intelligence Stats */}
      <section className="py-40 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
              {[
                { label: "Assets Under Intel", val: "$2.4B" },
                { label: "Predictive Edge", val: "94%" },
                { label: "Liquid Markets", val: "40+" },
                { label: "Global Partners", val: "120" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group">
                   <div className="text-6xl md:text-8xl font-serif font-black italic gold-text-gradient tracking-tighter leading-none group-hover:scale-110 transition-transform duration-700">{stat.val}</div>
                   <div className="text-[10px] uppercase font-black tracking-[0.6em] text-white/20 text-center">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Flagship CTA */}
      <section className="py-40 relative">
         <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="glass-card p-24 md:p-40 rounded-[120px] mb-20 border-brand-gold/10 relative overflow-hidden group text-center flex flex-col items-center gap-16 shadow-[0_100px_200px_rgba(0,0,0,0.8)]">
               <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-3xl" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.1)_0%,transparent_70%)]" />
               
               <div className="relative z-10 flex flex-col items-center gap-10">
                  <div className="w-32 h-32 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-gold/5 shadow-2xl">
                     <Network className="text-brand-gold" size={48} strokeWidth={1} />
                  </div>
                  <div className="space-y-6">
                    <span className="text-brand-gold text-xs font-black uppercase tracking-[0.8em] animate-pulse block">Strategic Mandate</span>
                    <h2 className="text-6xl md:text-8xl lg:text-[120px] font-serif font-medium leading-[0.8] tracking-tighter text-white">
                       Secure Your <br /> <span className="italic font-black gold-text-gradient">Financial Future.</span>
                    </h2>
                  </div>
                  <p className="text-2xl text-slate-400 font-light max-w-3xl leading-relaxed italic">
                     Our institutional-grade advisory is now available for select global clients. Let's engineer your legacy.
                  </p>
               </div>

               <div className="flex flex-wrap justify-center gap-12 relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => document.getElementById('fs-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-20 py-8 gold-gradient text-[#020617] font-black uppercase tracking-[0.4em] text-[15px] rounded-full shadow-[0_40px_80px_rgba(212,164,55,0.3)] transition-all duration-500"
                  >
                     Initiate Protocol
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => document.getElementById('fs-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-20 py-8 border-2 border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.4em] text-[15px] rounded-full transition-all duration-500"
                  >
                     Consult Partner
                  </motion.button>
               </div>
            </div>
         </div>
      </section>

      <div id="fs-form">
        <LeadForm defaultLoanType="Financial Solutions" />
      </div>

      <Footer />
    </div>
  );
}

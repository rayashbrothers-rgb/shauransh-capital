import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Heart, 
  Briefcase, 
  Umbrella, 
  HeartHandshake, 
  FileText, 
  ChevronRight, 
  Plus,
  ArrowRight,
  ShieldAlert,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

export default function Insurance() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const insuranceTypes = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Life Insurance",
      desc: "Architecting a secure legacy for your beneficiaries through comprehensive term and whole-life protection strategies.",
      features: ["Wealth Transfer", "Estate Protection", "Critical Illness Riders"]
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Health Insurance",
      desc: "Premium access to global medical care, ensuring your physical wellbeing is never compromised by financial constraints.",
      features: ["Global Coverage", "Priority Treatment", "Cashless Hospitalization"]
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Business Insurance",
      desc: "Safeguarding your enterprise against operational liabilities, property damage, and unforeseen market disruptions.",
      features: ["Liability Guard", "Asset Protection", "Employee Benefits"]
    },
    {
      icon: <Umbrella className="w-10 h-10" />,
      title: "Financial Protection",
      desc: "Advanced risk mitigation for your investment portfolios and liquid assets against extreme market volatility.",
      features: ["Portfolio Hedging", "Capital Guarantee", "Income Protection"]
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      title: "Claim Assistance",
      desc: "A dedicated institutional partner to navigate the complexities of claim settlement with speed and authority.",
      features: ["Priority Processing", "Expert Advocacy", "End-to-End Handling"]
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Policy Advisory",
      desc: "Strategic review of your existing coverage to identify optimization opportunities and closure of protection gaps.",
      features: ["Gap Analysis", "Premium Optimization", "Annual Reviews"]
    }
  ];

  const faqs = [
    {
      q: "How do you determine the optimal insurance coverage for high-net-worth individuals?",
      a: "Our experts conduct a deep-dive analysis of your asset base, liability profile, and lifestyle requirements to engineer a bespoke protection framework."
    },
    {
      q: "Does Shauransh Capital assist in claim settlements directly?",
      a: "Yes, we providing a dedicated advocacy team that coordinates with underwriters to ensure your claims are processed with institutional priority."
    },
    {
      q: "Can I consolidate multiple policies into one financial protection plan?",
      a: "While policies remain distinct, we provide a unified management dashboard and a singular advisory point-of-contact for your entire protection ecosystem."
    },
    {
      q: "Do you offer international health coverage?",
      a: "We specialize in premium global health tiers that provide access to Tier-1 medical facilities worldwide, including medical evacuation and concierge services."
    }
  ];

  return (
    <div className="bg-brand-blue min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=2400" 
            alt="Secure Lifestyle" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,164,55,0.03)_0%,transparent_50%)]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
            <div className="flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold text-xs font-black uppercase tracking-[0.5em]">Risk Mitigation</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-7xl lg:text-[100px] font-serif font-medium leading-[0.9] tracking-tight"
              >
                Protecting What <br />
                <span className="italic gold-text-gradient font-semibold">Matters Most.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-white/40 leading-relaxed max-w-xl font-light italic"
              >
                A trusted financial protection partner architecting long-term security and peace of mind for the elite professional and their legacy.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <button 
                  onClick={() => document.getElementById('ins-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 bg-brand-gold text-brand-blue font-black uppercase tracking-[0.3em] text-[13px] rounded-full shadow-[0_20px_40px_rgba(212,164,55,0.2)] hover:scale-105 transition-all duration-500"
                >
                  Secure Protection
                </button>
                <button 
                  onClick={() => document.getElementById('ins-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-5 border-2 border-white/10 hover:border-brand-gold/50 text-white font-black uppercase tracking-[0.3em] text-[13px] rounded-full transition-all duration-500"
                >
                  Risk Audit
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-4 rounded-[60px] border-white/5 relative overflow-hidden aspect-[4/5] group bg-[#061633]/50">
                 <img 
                  src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1200" 
                  alt="Elite Trust" 
                  className="w-full h-full object-cover rounded-[44px] grayscale-[0.2] opacity-60 group-hover:opacity-80 transition-all duration-1000 scale-105 group-hover:scale-100"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent" />
                 
                 <div className="absolute bottom-12 left-12 right-12 p-10 glass-card rounded-3xl border-brand-gold/10 backdrop-blur-3xl text-center">
                    <ShieldCheck className="mx-auto text-brand-gold mb-4" size={48} />
                    <p className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-gold mb-2">Institutional Grade</p>
                    <p className="text-2xl font-serif font-black italic gold-text-gradient leading-none">Security Guaranteed</p>
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
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">Integrated Safety</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1] tracking-tight">
                Architecting <span className="italic font-semibold gold-text-gradient">Financial Resilience.</span>
              </h2>
            </div>
            <p className="text-lg text-white/40 font-light max-w-sm border-l border-white/10 pl-8 italic">
              Advanced protection models tailored for the preservation of multi-generational wealth and commercial stability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 lg:p-14 glass-card rounded-[60px] border-white/5 hover:border-brand-gold/20 group relative overflow-hidden transition-all duration-700"
              >
                <div className="w-20 h-20 rounded-[28px] bg-brand-gold/5 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-xl border border-brand-gold/10">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-brand-gold transition-colors italic">{type.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-lg mb-8">{type.desc}</p>
                
                <div className="space-y-3">
                   {type.features.map((feat, j) => (
                     <div key={j} className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        {feat}
                     </div>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: "99%", label: "Claim Delta" },
              { val: "24h", label: "Advocacy Response" },
              { val: "500+", label: "Policy Audits" },
              { val: "Tier-1", label: "Underwriter Status" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-2"
              >
                 <span className="text-4xl lg:text-5xl font-serif font-black italic gold-text-gradient leading-none">{stat.val}</span>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">Directives</span>
            <h2 className="text-5xl md:text-6xl font-serif font-medium leading-[1.2] tracking-tight">Financial Shield Inquiries</h2>
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

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10 text-center">
          <div className="glass-card p-20 lg:p-32 rounded-[100px] border-brand-gold/10 flex flex-col items-center gap-12 shadow-[0_80px_160px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex flex-col gap-8 relative z-10">
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.6em] animate-pulse">Legacy Protection Directive</span>
              <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tighter text-white">
                Structure Your <br /> <span className="italic font-semibold gold-text-gradient">Total Security.</span>
              </h2>
            </div>
            
            <p className="text-2xl text-white/40 font-light max-w-2xl leading-relaxed italic relative z-10">
              Every heritage building requires a foundation of absolute trust. Let us architect the protection that ensures your family's future stays precisely as intended.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-6 relative z-10">
              <motion.button 
                whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(212, 164, 55, 0.4)' }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('ins-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-20 py-7 gold-gradient rounded-full text-brand-blue font-black uppercase tracking-[0.4em] text-[14px] shadow-2xl transition-all duration-500"
              >
                Inquire Protection
              </motion.button>
              <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('ins-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-20 py-7 border-2 border-white/10 hover:border-brand-gold/50 rounded-full text-white font-black uppercase tracking-[0.4em] text-[14px] transition-all duration-500"
              >
                Request Risk Audit
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <div id="ins-form">
        <LeadForm defaultLoanType="Insurance" />
      </div>

      <Footer />
    </div>
  );
}

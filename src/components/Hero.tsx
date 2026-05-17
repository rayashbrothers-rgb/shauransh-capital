import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, TrendingUp, Users, Award, User } from 'lucide-react';
import FintechParticles from './FintechParticles';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="hero">
      {/* Cinematic Background Image with Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=2400" 
            alt="Premium Metropolitan Night" 
            className="w-full h-full object-cover grayscale-[0.3] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-brand-blue/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,164,55,0.05)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-brand-blue/20" />
          <FintechParticles />
        </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-16 text-left">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm shadow-xl group hover:border-brand-gold/30 transition-all">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-brand-gold/40 bg-white p-0.5 shadow-lg ring-4 ring-brand-gold/10 flex-shrink-0">
                    <img 
                      src="/src/assets/images/official_shauransh_logo_v2_1779023780680.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[14px] uppercase font-black tracking-[0.3em] text-brand-gold">
                    SHAURANSH CAPITAL SERVICES
                  </span>
                </div>
              </motion.div>
              
              <div className="relative">
                <motion.h1 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="text-7xl md:text-8xl lg:text-[130px] xl:text-[145px] font-serif font-medium leading-[0.85] tracking-tight text-white"
                >
                  Building Trust. <br />
                  <span className="gold-text-gradient font-serif italic font-semibold">Creating Value.</span> <br />
                  Growing Together.
                </motion.h1>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="text-lg lg:text-xl text-white/50 max-w-xl leading-relaxed font-light tracking-wide"
              >
                Premium financial solutions engineered for long-term growth, security, and intelligent wealth management. Elevating your capital with institutional precision.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-5"
            >
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 gold-gradient rounded-md font-bold flex items-center gap-2 group transition-all text-[13px] uppercase tracking-[0.2em] shadow-2xl" 
                id="hero-explore"
              >
                Explore Services <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-transparent border border-white/20 hover:bg-white/5 rounded-md font-bold transition-all text-[13px] uppercase tracking-[0.2em]" 
                id="hero-contact"
              >
                Contact Us
              </button>
            </motion.div>
          </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="flex justify-center lg:justify-end relative mt-20 lg:mt-0"
            >
              <div className="relative group w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <div className="absolute -inset-10 bg-brand-gold/10 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
                
                <div className="relative glass-card p-3 rounded-[60px] overflow-hidden aspect-[4/5] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border-white/5">
                  <img 
                    src="https://kommodo.ai/i/cYdbMuGbmE8PMjSLk853" 
                    alt="Shaurya Agrawal" 
                    referrerPolicy="no-referrer"
                    className="rounded-[44px] w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 scale-[1.02] hover:scale-105"
                  />
                  <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-brand-gold/50 rounded-tl-2xl" />
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-brand-gold/50 rounded-br-2xl" />
                </div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="absolute -right-8 lg:-right-12 top-1/4 glass-card p-6 lg:p-8 rounded-[32px] border-brand-gold/20 backdrop-blur-3xl shadow-2xl z-20 max-w-[240px] lg:max-w-[280px]"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                        <TrendingUp size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-brand-gold/60">Portfolio Yield</p>
                        <p className="text-xl lg:text-2xl font-serif font-bold text-white tracking-tight">+18.4% <span className="text-xs font-sans font-medium text-emerald-400">YOY</span></p>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-white/10" />
                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 italic">Global AUM Growth</p>
                      <div className="flex gap-1 items-end h-12 lg:h-16">
                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 1.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                            className="flex-1 bg-gradient-to-t from-brand-gold/10 via-brand-gold/40 to-brand-gold rounded-t-sm"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30 text-center font-medium">Institutional Grade Analytics</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1 }}
                  className="absolute -left-6 lg:-left-10 bottom-12 py-4 px-6 glass-card rounded-2xl border-white/10 backdrop-blur-2xl z-20 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-white/40">Advisor Excellence</p>
                    <p className="text-xs font-black text-white uppercase tracking-wider">A+++ Elite</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
        </div>
      </div>

    </section>
  );
}

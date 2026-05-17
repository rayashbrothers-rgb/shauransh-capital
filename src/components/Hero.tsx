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
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/80 to-transparent" />
        <div className="absolute inset-0 bg-brand-blue/30" />
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
              
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="text-7xl md:text-8xl lg:text-[140px] font-serif font-medium leading-[0.9] tracking-tight text-white space-y-4"
              >
                Building Trust. <br />
                <span className="gold-text-gradient font-serif italic font-semibold">Creating Value.</span> <br />
                Growing <br />
                Together.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="text-lg text-white/70 max-w-lg leading-relaxed font-light"
              >
                Premium financial solutions engineered for long-term growth, security, and intelligent wealth management. Partnering your financial journey with expert guidance.
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

          {/* Professional Financial Expert Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center lg:justify-end relative mt-16 lg:mt-0"
          >
            <div className="relative group w-full max-w-sm lg:max-w-md">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-[44px] blur-2xl group-hover:bg-brand-gold/20 transition-all duration-700" />
              
              <div className="relative glass-card p-2 rounded-[40px] overflow-hidden aspect-[4/5]">
                <img 
                  src="https://kommodo.ai/i/cYdbMuGbmE8PMjSLk853" 
                  alt="Shaurya Agrawal" 
                  referrerPolicy="no-referrer"
                  className="rounded-[32px] w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

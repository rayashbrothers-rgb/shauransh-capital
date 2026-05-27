import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Network, 
  Zap, 
  Focus, 
  MapPin, 
  GraduationCap, 
  RefreshCcw,
  Sparkles
} from 'lucide-react';

function CountingNumber({ value, suffix = '', duration = 1200, trigger = false }: { value: number; suffix?: string; duration?: number; trigger?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    let timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, trigger]);

  return <>{count}{suffix}</>;
}

export default function WhyChooseUs() {
  const [triggerCount, setTriggerCount] = useState(false);

  const points = [
    {
      title: 'Multiple Bank Tie-ups',
      desc: 'Exclusive access to 50+ banking institutions for the best rates.',
      icon: <Network className="w-6 h-6" />
    },
    {
      title: 'Quick Processing',
      desc: 'Institutional-grade agility for rapid approvals and funding.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Low CIBIL Assistance',
      desc: 'Expert restructuring services for credit-impaired profiles.',
      icon: <Focus className="w-6 h-6" />
    },
    {
      title: 'Doorstep Documentation',
      desc: 'Premium concierge service for seamless paperwork collection.',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: 'Expert Advisors',
      desc: 'Dedicated financial consultants for end-to-end guidance.',
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: 'Insurance Renewal Support',
      desc: 'Continuous asset protection with timely renewal assistance.',
      icon: <RefreshCcw className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="why-choose-us">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-10 order-2 lg:order-1 relative">
            {/* Background Typography */}
            <div className="absolute -top-10 -left-10 text-[100px] md:text-[180px] font-serif italic text-white/[0.015] select-none pointer-events-none font-black leading-none hidden sm:block">
              Premium
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[32px] glass-card border border-white/[0.03] hover:border-brand-gold/25 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/[0.01] rounded-full blur-[20px] group-hover:bg-brand-gold/[0.03] transition-all duration-500" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-md group-hover:scale-110 group-hover:shadow-brand-gold/20">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {point.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-white group-hover:text-brand-gold transition-colors">{point.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 order-1 lg:order-2">
            <div className="flex flex-col gap-6">
              <motion.span 
                initial={{ opacity: 0, tracking: '0.2em' }}
                whileInView={{ opacity: 1, tracking: '0.4em' }}
                transition={{ duration: 1 }}
                className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]"
              >
                The Shauransh Advantage
              </motion.span>
              <h2 className="text-4xl md:text-6xl lg:text-[70px] font-serif font-medium leading-[1.1] md:leading-[1.0] tracking-tight text-white transition-all duration-500">
                Why <span className="italic gold-text-gradient font-semibold">Institutional Leaders</span> Partner With Us
              </h2>
            </div>

            <div className="space-y-6 text-lg text-white/50 font-light leading-relaxed max-w-xl">
              <p>
                At Shauransh Capital Services, we transcend traditional lending. We act as your strategic financial partners, bridging the gap between your aspirations and capital.
              </p>
              <p>
                Under the visionary leadership of <span className="text-brand-gold font-medium italic">Shaurya Agrawal</span>, we have architected a system that prioritizes speed, trust, and absolute transparency.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onViewportEnter={() => setTriggerCount(true)}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative p-10 md:p-12 lg:p-14 glass-card rounded-[40px] border border-brand-gold/20 bg-gradient-to-br from-brand-gold/[0.04] to-transparent overflow-hidden shadow-2xl group hover:border-brand-gold/35"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-brand-gold/15 rounded-full blur-[80px] group-hover:bg-brand-gold/25 transition-all duration-700" />
              
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-4 text-brand-gold/30 group-hover:text-brand-gold/70 transition-colors duration-500">
                  <Sparkles size={20} className="animate-pulse" />
                  <span className="text-[10px] uppercase font-black tracking-[0.3em]">Quantum Credential</span>
                </div>
                
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 80, delay: 0.5 }}
                  className="text-7xl md:text-9xl font-serif italic gold-text-gradient font-black tracking-tighter leading-none"
                >
                  <CountingNumber value={99} suffix="%" trigger={triggerCount} />
                </motion.div>
                
                <div className="flex flex-col gap-2 mt-2">
                  <div className="text-sm uppercase font-black tracking-[0.3em] text-white group-hover:text-brand-gold transition-colors duration-500">
                    Approval Success Rate
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium">
                    Institutional Standard in Capital Acquisition
                  </div>
                </div>
              </div>

              {/* Animated Line Accent */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80%' }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-gold to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

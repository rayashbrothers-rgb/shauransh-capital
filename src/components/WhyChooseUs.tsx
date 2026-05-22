import { motion } from 'motion/react';
import { 
  Network, 
  Zap, 
  Focus, 
  MapPin, 
  GraduationCap, 
  RefreshCcw 
} from 'lucide-react';

export default function WhyChooseUs() {
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
    <section className="py-24" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-10 order-2 lg:order-1 relative">
            {/* Background Typography */}
            <div className="absolute -top-10 -left-10 text-[100px] md:text-[180px] font-serif italic text-white/[0.02] select-none pointer-events-none font-black leading-none hidden sm:block">
              Services
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
                  className="p-8 rounded-[32px] glass-card border-white/5 hover:border-brand-gold/20 transition-all duration-500 group"
                >
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:shadow-brand-gold/30">
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
              <h2 className="text-4xl md:text-6xl lg:text-[70px] font-serif font-medium leading-[1.1] md:leading-[0.9] tracking-tight text-white transition-all duration-500">
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
              transition={{ duration: 1, delay: 0.5 }}
              className="relative p-8 md:p-10 lg:p-12 glass-card rounded-[32px] md:rounded-[40px] border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-[60px]" />
              
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                  className="text-6xl md:text-9xl font-serif italic gold-text-gradient font-black tracking-tighter leading-none"
                >
                  99%
                </motion.div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm uppercase font-black tracking-[0.3em] text-white">
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
                whileInView={{ width: '60%' }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-gold to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

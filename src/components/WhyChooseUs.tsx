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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="grid md:grid-cols-2 gap-6">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ backgroundColor: 'rgba(212,164,55,0.05)' }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4">
                    {point.icon}
                  </div>
                  <h4 className="font-bold mb-2">{point.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em]"
            >
              The Shauransh Advantage
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Why <span className="italic gold-text-gradient">Leaders & Innovators</span> Choose Us
            </h2>
            <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
              <p>
                At Shauransh Capital Services, we transcend traditional lending. We act as your strategic financial partners, bridging the gap between your aspirations and capital.
              </p>
              <p>
                With the directorship of <span className="text-brand-gold font-medium italic">Shaurya Agrawal</span>, we have architected a system that prioritizes speed, trust, and absolute transparency.
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/10 mt-4 h-full">
              <div className="flex flex-col gap-2">
                <div className="text-6xl font-serif italic gold-text-gradient font-bold tracking-tighter">
                  99%
                </div>
                <div className="text-xs uppercase font-bold tracking-[0.3em] text-white/40">
                  Success Rate in Funding Approvals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

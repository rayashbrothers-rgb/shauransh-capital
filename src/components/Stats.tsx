import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export default function Stats() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const stats = [
    { label: 'Happy Customers', value: '1000+', suffix: '' },
    { label: 'Banking Partners', value: '50+', suffix: '' },
    { label: 'Success Rate', value: '99%', suffix: '' },
    { label: 'Customer Rating', value: '4.8/5', suffix: '' }
  ];

  return (
    <section ref={containerRef} className="py-24 relative bg-brand-gold/[0.02]" id="stats">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="text-4xl md:text-6xl font-serif font-bold italic gold-text-gradient tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                {stat.label}
              </div>
              <div className="w-8 h-[1px] bg-brand-gold/30 mt-4"></div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10 group-hover:bg-brand-gold/20 transition-colors"></div>
    </section>
  );
}

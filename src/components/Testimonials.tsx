import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Amit Sharma",
      role: "Business Owner",
      content: "Shauransh Capital redefined my approach to business scaling. Their advisors handled everything with institutional precision and helped me secure 5 Cr funding effortlessly.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Priyanka Verma",
      role: "Tech Professional",
      content: "The home loan process was incredibly smooth. I was impressed by their transparency and the way they negotiated the lowest interest rates across multiple bank partners.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Vikram Agrawal",
      role: "Real Estate Investor",
      content: "Shauransh is the only consultancy I trust for my property-backed financing needs. Their expertise in LAP (Loan Against Property) is unmatched in the region.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden" id="testimonials">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]"
            >
              Institutional Legacy
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-[70px] font-serif font-medium leading-[0.9] tracking-tight text-white italic">
              Trusted by <span className="gold-text-gradient font-semibold not-italic">Captains of Industry</span>
            </h2>
          </div>
          <p className="text-lg text-white/40 font-light max-w-sm border-l border-white/10 pl-6">
            Our commitment to excellence is reflected in the journeys of those we serve.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:pb-16">
          {reviews.map((review, i) => {
            const offsetStyle = i === 1 ? 'lg:translate-y-12' : i === 2 ? 'lg:translate-y-6' : 'lg:translate-y-0';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`glass-card p-8 md:p-12 lg:p-14 rounded-[40px] md:rounded-[60px] relative group border-white/[0.03] hover:border-brand-gold/30 shadow-2xl transition-all duration-700 ${offsetStyle}`}
              >
                <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-5 text-brand-gold group-hover:opacity-20 transition-all duration-700 group-hover:scale-125 rotate-12 group-hover:rotate-0">
                  <Quote size={60} className="md:w-20 md:h-20" strokeWidth={1} />
                </div>
                
                <div className="flex gap-2 mb-8 md:mb-10 text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-700">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                
                <p className="text-xl lg:text-2xl text-white/70 mb-12 leading-relaxed font-serif italic tracking-wide group-hover:text-white transition-colors duration-700">
                  "{review.content}"
                </p>
                
                <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                  <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-16 h-16 rounded-[20px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-white/5 group-hover:border-brand-gold/30" 
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center text-brand-blue shadow-lg scale-0 group-hover:scale-100 transition-transform duration-500 delay-200">
                      <Star size={10} fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-bold text-white tracking-tight">{review.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold/60">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

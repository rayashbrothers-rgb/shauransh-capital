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
    <section className="py-24 bg-black/20" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 inline-block">Voices of Trust</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold italic gold-text-gradient">Client Experiences</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[40px] relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 text-brand-gold group-hover:opacity-20 transition-opacity">
                <Quote size={48} />
              </div>
              
              <div className="flex gap-1 mb-6 text-brand-gold">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              
              <p className="text-white/60 mb-8 leading-relaxed font-light italic">"{review.content}"</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                <div>
                  <h4 className="font-bold text-white/90">{review.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

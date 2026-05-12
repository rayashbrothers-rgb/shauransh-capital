import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-12 bg-black/40 border-t border-white/5 relative overflow-hidden" id="footer">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-serif font-bold gold-text-gradient tracking-tight">
                SHAURANSH
              </span>
              <span className="text-[12px] uppercase tracking-[0.3em] font-medium text-white/60">
                CAPITAL SERVICES
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Premium financial solutions engineered for long-term growth and security. Guided by the vision of Shaurya Agrawal, we build trust and create value.
            </p>
            <div className="flex gap-4 mt-4">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#D4A437' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-gold transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Company</h4>
            <ul className="space-y-4">
              {['About', 'Careers', 'Partners', 'News'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Services</h4>
            <ul className="space-y-4">
              {['Personal Loans', 'Business Loans', 'Home Loans', 'LAP'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Stay Informed</h4>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-white/40">Subscribe to receive institutional financial updates.</p>
              <div className="flex gap-2 p-1 border border-white/10 rounded-xl bg-white/5">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="bg-transparent border-none focus:ring-0 text-sm px-4 flex-grow placeholder:text-white/20"
                />
                <button className="px-5 py-2 gold-gradient rounded-lg text-xs font-bold uppercase tracking-widest">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 text-center md:text-left">
            © {currentYear} Shauransh Capital Services. All rights reserved. <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> Regulatory Disclosures | Privacy Policy | <a href="/admin" className="hover:text-brand-gold transition-colors underline decoration-brand-gold/30">Admin Portal</a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-white/20 hover:text-brand-gold transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-gold transition-colors">
              <ArrowUp size={18} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest">To Top</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-gold/5 to-transparent pointer-events-none" />
    </footer>
  );
}

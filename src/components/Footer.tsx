import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function Footer() {
  const { setActiveView } = useNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 md:pt-32 pb-12 bg-[#030d1d] border-t border-white/5 relative overflow-hidden" id="footer">
      {/* Cinematic End-Cap Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/50 to-brand-blue opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-brand-gold/10 to-transparent pointer-events-none opacity-50" />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-brand-gold/30 bg-white shadow-2xl p-1 shrink-0"
              >
                <img 
                  src="/src/assets/images/official_shauransh_logo_v2_1779023780680.png" 
                  alt="Shauransh Capital Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl md:text-3xl font-sans font-black text-white tracking-[0.1em]">
                  SHAURANSH
                </span>
                <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black italic gold-text-gradient mt-0.5">
                  CAPITAL SERVICES
                </span>
              </div>
            </div>
            
            <p className="text-lg text-white/40 leading-relaxed max-w-md font-light italic">
              Premium financial solutions engineered for long-term growth and security. Guided by the visionary leadership of Shaurya Agrawal, we bridge the gap between aspirations and institutional capital.
            </p>
            
            <div className="flex gap-6 items-center">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: 'rgba(212,164,55,0.1)', borderColor: 'rgba(212,164,55,0.5)' }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold transition-all duration-500 shadow-xl"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-3 gap-12 pt-4">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold border-l-2 border-brand-gold/50 pl-4 py-1">Ecosystem</h4>
              <ul className="space-y-4">
                {['About Us', 'Case Studies', 'Partnerships', 'Global News'].map(item => (
                  <li key={item}>
                    <motion.a 
                      href="#" 
                      whileHover={{ x: 5, color: '#D4A437' }}
                      className="text-sm font-medium text-white/30 transition-all duration-300 block"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold border-l-2 border-brand-gold/50 pl-4 py-1">Directives</h4>
              <ul className="space-y-4">
                {['Personal Banking', 'Enterprise Fund', 'Estate Realty', 'Wealth Management'].map(item => (
                  <li key={item}>
                    <motion.a 
                      href="#" 
                      whileHover={{ x: 5, color: '#D4A437' }}
                      className="text-sm font-medium text-white/30 transition-all duration-300 block"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold border-l-2 border-brand-gold/50 pl-4 py-1">Updates</h4>
              <div className="flex flex-col gap-6">
                <p className="text-xs text-white/30 font-medium leading-relaxed">Subscribe to receive institutional financial updates and private market insights.</p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Institutional Email"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-gold/40 text-xs text-white placeholder:text-white/20 transition-all"
                  />
                  <button className="w-full py-3.5 gold-gradient rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue shadow-lg">
                    Join Network
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">
              © {currentYear} SHAURANSH CAPITAL SERVICES. Institutional Standards Applied.
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[9px] uppercase font-bold tracking-[0.2em] text-white/20">
              <a href="#" className="hover:text-brand-gold transition-colors">Regulatory Disclosures</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Terms of Engagement</a>
              <button onClick={() => setActiveView('authorized')} className="text-brand-gold/40 hover:text-brand-gold transition-colors underline decoration-brand-gold/20 cursor-pointer text-left">Authorized Gateway</button>
            </div>
          </div>
          
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-3 text-white/20 hover:text-brand-gold transition-all duration-500 group"
          >
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all duration-500 shadow-2xl">
              <ArrowUp size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.4em]">To Top</span>
          </motion.button>
        </div>
      </div>
    </footer>

  );
}

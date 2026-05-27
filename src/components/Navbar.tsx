import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, User } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function Navbar() {
  const { activeView, setActiveView } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'EMI Calculator', href: '#emi-calculator' },
    { name: 'Contact', href: '#contact' },
  ];

  const [activeLink, setActiveLink] = useState('Home');

  const handleNavClick = (href: string, name: string) => {
    setActiveLink(name);
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'py-3 bg-brand-blue/60 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
          : 'py-8 bg-transparent'
      }`}
      id="main-nav"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div onClick={() => handleNavClick('#', 'Home')} className="cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 lg:gap-5 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-brand-gold/30 bg-white shadow-2xl transition-all duration-500 group-hover:border-brand-gold/60 group-hover:shadow-brand-gold/20 p-0.5">
                <img 
                  src="/src/assets/images/official_shauransh_logo_v2_1779023780680.png" 
                  alt="Shauransh Capital Logo" 
                  className="w-full h-full object-contain scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-lg lg:text-2xl font-sans font-black tracking-[0.1em] lg:tracking-[0.15em] text-white leading-none animate-pulse-slow">
                  SHAURANSH
                </span>
                <div className="flex flex-col mt-0.5 lg:mt-1.5">
                  <span className="text-[7px] lg:text-[11px] uppercase tracking-[0.3em] lg:tracking-[0.4em] font-bold text-brand-gold/90">
                    CAPITAL
                  </span>
                  <span className="text-[6px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.3em] font-medium text-white/40 mt-[-1px]">
                    SERVICES
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          <div className="flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.name)}
                className={`text-[11px] lg:text-[12px] uppercase tracking-[0.25em] font-black transition-all duration-300 relative py-2 group cursor-pointer ${
                  activeLink === link.name ? 'text-brand-gold' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.name}
                <motion.span 
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-gold rounded-full transition-all duration-300 ${
                    activeLink === link.name ? 'w-full' : 'w-0 group-hover:w-1/2'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="h-8 w-[1px] bg-white/10 hidden lg:block" />

          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(212, 164, 55, 0.25)' }}
              whileTap={{ y: 0 }}
              onClick={() => {
                const el = document.getElementById('eligibility');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-brand-gold rounded-full text-[12px] lg:text-[13px] font-black uppercase tracking-[0.2em] text-[#061633] flex items-center gap-3 shadow-[0_10px_20px_rgba(212, 164, 55, 0.15)] transition-all duration-500 cursor-pointer"
              id="nav-apply-now"
            >
              Apply Now <ChevronRight size={14} strokeWidth={4} />
            </motion.button>
            
            <button 
              onClick={() => setActiveView('authorized')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-white/5 transition-all duration-500 cursor-pointer"
              title="Authorized Login"
            >
              <User size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-blue/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.name)}
                  className="text-left py-2 text-lg font-medium text-white/80 hover:text-brand-gold cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById('eligibility');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-brand-gold text-brand-blue rounded-xl font-bold flex items-center justify-center gap-2"
              >
                Apply Now <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveView('authorized');
                }}
                className="w-full py-4 border border-white/10 rounded-xl font-bold text-center text-white/50 hover:text-brand-gold transition-colors cursor-pointer"
              >
                Authorized Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

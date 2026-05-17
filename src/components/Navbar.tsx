import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, User } from 'lucide-react';

export default function Navbar() {
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-brand-blue/80 backdrop-blur-lg border-bottom border-white/5 shadow-2xl' : 'py-6 bg-transparent'
      }`}
      id="main-nav"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold/30 bg-white shadow-xl transition-all group-hover:border-brand-gold/60 group-hover:shadow-brand-gold/20">
              <img 
                src="/src/assets/images/official_shauransh_logo_v2_1779023780680.png" 
                alt="Shauransh Capital Logo" 
                className="w-full h-full object-contain scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-sans font-black tracking-widest text-white leading-none">
                SHAURANSH
              </span>
              <div className="flex flex-col mt-1">
                <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-brand-gold/80">
                  CAPITAL
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-white/40 mt-[-1px]">
                  SERVICES
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[13px] uppercase tracking-widest font-bold transition-colors relative group ${
                link.name === 'Home' ? 'text-brand-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
              {link.name === 'Home' && (
                <motion.span 
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 w-8 h-[2px] bg-brand-gold rounded-full" 
                />
              )}
            </a>
          ))}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => {
              const el = document.getElementById('eligibility');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-5 bg-brand-gold rounded-lg text-[13px] font-black uppercase tracking-widest text-[#061633] flex items-center gap-3 shadow-[6px_6px_0px_rgba(212,164,55,0.2)] hover:shadow-[4px_4px_0px_rgba(212,164,55,0.3)] transition-all"
            id="nav-apply-now"
          >
            Apply Now <ChevronRight size={14} strokeWidth={4} />
          </motion.button>
          
          <a 
            href="/admin" 
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all"
            title="Admin Login"
          >
            <User size={18} />
          </a>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white/80 hover:text-brand-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById('eligibility');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 gold-gradient rounded-xl font-bold flex items-center justify-center gap-2"
              >
                Apply Now <ChevronRight size={18} />
              </button>
              <a href="/admin" className="w-full py-4 border border-white/10 rounded-xl font-bold text-center text-white/50 hover:text-brand-gold transition-colors">
                Admin Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

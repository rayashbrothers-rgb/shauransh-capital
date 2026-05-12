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
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-brand-gold/40 flex items-center justify-center relative overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-xl font-serif font-bold text-white leading-none">S</span>
                <div className="flex gap-0.5 mt-[-2px]">
                  <div className="w-[1.5px] h-2 bg-brand-gold/80 rounded-full" />
                  <div className="w-[1.5px] h-3 bg-brand-gold rounded-full" />
                  <div className="w-[1.5px] h-1.5 bg-brand-gold/60 rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-sans font-extrabold tracking-tight text-white leading-none">
                SHAURANSH
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/50 mt-1">
                CAPITAL SERVICES
              </span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                link.name === 'Home' ? 'text-brand-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
              {link.name === 'Home' && (
                <motion.span 
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 w-full h-[1.5px] bg-brand-gold rounded-full" 
                />
              )}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const el = document.getElementById('eligibility');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 gold-gradient rounded-md text-[13px] font-bold flex items-center gap-2 shadow-lg transition-all"
            id="nav-apply-now"
          >
            Apply Now <ChevronRight size={16} strokeWidth={3} />
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

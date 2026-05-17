import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Globe, User, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Director',
      value: 'Shaurya Agrawal',
      href: null
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 95990 34002',
      href: 'tel:+919599034002'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'info@shauranshcapital.com',
      href: 'mailto:info@shauranshcapital.com'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Website',
      value: 'www.shauranshcapital.com',
      href: 'https://www.shauranshcapital.com'
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-stretch">
          <div className="flex flex-col gap-12 py-10">
            <div className="flex flex-col gap-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]"
              >
                Institutional Access
              </motion.span>
              <h2 className="text-5xl md:text-6xl lg:text-[70px] font-serif font-medium leading-[0.9] tracking-tight text-white">
                Connect with Our <br />
                <span className="italic gold-text-gradient font-semibold">Leadership Hub</span>
              </h2>
              <p className="text-xl text-white/40 max-w-lg leading-relaxed font-light">
                Secure established channels for high-value consulting and strategic capital acquisition.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                  className="group flex flex-col gap-3"
                >
                  <div className="flex items-center gap-4 text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-500">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                      {info.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{info.label}</span>
                  </div>
                  {info.href ? (
                    <a href={info.href} className="text-xl font-bold text-white hover:text-brand-gold transition-all duration-500 tracking-tighter">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-xl font-bold text-white tracking-tighter">{info.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-10 rounded-[40px] glass-card border-brand-gold/10 flex flex-col md:flex-row md:items-center gap-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[40px] rounded-full" />
              
              <div className="w-20 h-20 rounded-[28px] bg-brand-gold flex items-center justify-center text-brand-blue shadow-[0_15px_30px_rgba(212,164,55,0.2)] shrink-0 group-hover:scale-105 transition-transform duration-500">
                <MapPin size={32} strokeWidth={2.5} />
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-brand-gold uppercase tracking-[0.4em] text-[10px]">Regional Headquarters</h4>
                <p className="text-2xl font-serif font-bold text-white leading-tight italic">
                  Greater Noida, Uttar Pradesh,<br /> India — 201310
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative group min-h-[500px]">
            <div className="absolute -inset-1 bg-brand-gold/20 rounded-[60px] blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-1000" />
            <div className="relative h-full rounded-[55px] overflow-hidden glass-card border-white/5 flex flex-col justify-center items-center text-center p-12 lg:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              
              {/* Cinematic Background Visual */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#061633] opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.15)_0%,transparent_70%)]" />
                {/* Simulated Grid/Map network */}
                <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
                
                {/* Floating Particles/Nodes */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -30, 0],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    className="absolute w-1 h-1 bg-brand-gold rounded-full"
                    style={{ 
                      top: `${Math.random() * 80 + 10}%`, 
                      left: `${Math.random() * 80 + 10}%` 
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 rounded-full border-2 border-brand-gold/30 flex items-center justify-center mb-10 relative"
                >
                  <div className="absolute inset-0 border border-brand-gold/20 rounded-full animate-ping" />
                  <div className="w-6 h-6 rounded-full bg-brand-gold shadow-[0_0_30px_rgba(212,164,55,0.8)]" />
                </motion.div>
                
                <h3 className="text-4xl lg:text-5xl font-serif font-black italic gold-text-gradient mb-6 tracking-tight">Strategic Connectivity</h3>
                <p className="text-xl text-white/40 font-light leading-relaxed max-w-md italic mb-12">
                  Expanding the horizons of wealth management across the Greater Noida industrial corridor.
                </p>
                
                <motion.a 
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                  whileTap={{ y: 0 }}
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-white/5 border border-white/10 hover:border-brand-gold/40 hover:bg-white/10 rounded-full text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-500 text-white flex items-center gap-4"
                >
                  Locate Headquaters <ArrowUpRight size={18} strokeWidth={3} className="text-brand-gold" />
                </motion.a>
              </div>

              {/* Technical Detail Overlays */}
              <div className="absolute bottom-10 left-10 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] transform -rotate-90 origin-left">
                Network:Established_2024
              </div>
              <div className="absolute top-10 right-10 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
                COORD: 28.4744° N, 77.5040° E
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

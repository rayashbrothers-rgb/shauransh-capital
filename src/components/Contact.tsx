import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Globe, User } from 'lucide-react';

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
    <section className="py-24" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 inline-block">Direct Access</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Connect with Our <span className="italic gold-text-gradient">Institutional Core</span></h2>
              <p className="text-white/50 max-w-lg leading-relaxed">Reach out for high-value financial consulting or to begin your application process with absolute confidentiality.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3 text-brand-gold">
                    {info.icon}
                    <span className="text-xs font-bold uppercase tracking-widest">{info.label}</span>
                  </div>
                  {info.href ? (
                    <a href={info.href} className="text-xl font-bold text-white/90 hover:text-brand-gold transition-colors block">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-xl font-bold text-white/90 block">{info.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-[32px] glass-card flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                <MapPin size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-brand-gold uppercase tracking-[0.2em] text-xs">Headquarters</h4>
                <p className="text-lg font-medium text-white/80 leading-relaxed">
                  Greater Noida, Uttar Pradesh,<br /> India - 201310
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-brand-gold/20 rounded-[42px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full min-h-[400px] rounded-[40px] overflow-hidden glass-card">
              {/* Using a placeholder map visual for institutional look */}
              <div className="absolute inset-0 bg-[#0A1A35] flex items-center justify-center opacity-60">
                 <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-12">
                <div className="w-20 h-20 rounded-full border border-brand-gold/20 flex items-center justify-center mb-6 animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-brand-gold" />
                </div>
                <h3 className="text-2xl font-serif font-bold italic gold-text-gradient mb-4">Strategic Location</h3>
                <p className="text-white/40 text-sm max-w-xs">Serving the Greater Noida region and beyond with premium financial solutions.</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

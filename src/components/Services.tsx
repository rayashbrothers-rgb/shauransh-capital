import { motion } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Home, 
  Car, 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  CircleUserRound,
  ArrowUpRight 
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Personal Loans',
      desc: 'Flexible funding for your personal aspirations with minimal documentation.',
      icon: <User className="w-8 h-8" />,
    },
    {
      title: 'Business Loans',
      desc: 'Engineered for scalability and capital growth of your enterprise.',
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      title: 'Home Loans',
      desc: 'Step into your dream residence with attractive rates and terms.',
      icon: <Home className="w-8 h-8" />,
    },
    {
      title: 'Vehicle Loans',
      desc: 'Accelerate your travel lifestyle with quick approval automobile financing.',
      icon: <Car className="w-8 h-8" />,
    },
    {
      title: 'Loan Against Property',
      desc: 'Unlock the hidden equity in your real estate assets for your needs.',
      icon: <Building2 className="w-8 h-8" />,
    },
    {
      title: 'Insurance',
      desc: 'Comprehensive protection strategies for your assets, life, and legacy.',
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: 'Financial Solutions',
      desc: 'Bespoke wealth management and investment strategies for high-net-worth individuals.',
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: 'Expert Advisors',
      desc: 'Direct access to institutional-grade consulting from industry veterans.',
      icon: <CircleUserRound className="w-8 h-8" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-black/20" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4"
          >
            Our Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Institutional <span className="italic gold-text-gradient">Financial Engineering</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white/50 font-light"
          >
            Premium financial services designed to preserve wealth, enable growth, and provide security in an ever-evolving market landscape.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => {
                const el = document.getElementById('eligibility');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-card p-10 rounded-[32px] group relative cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-brand-gold" />
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-brand-blue transition-colors duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 flex items-baseline gap-2">
                {service.title}
              </h3>
              
              <p className="text-sm text-white/50 leading-relaxed font-light">
                {service.desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                Learn More <span>→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

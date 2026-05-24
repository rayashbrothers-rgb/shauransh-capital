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
import { useNavigation, ActiveView } from '../context/NavigationContext';

export default function Services() {
  const { setActiveView } = useNavigation();

  const services: { title: string; desc: string; icon: any; view?: ActiveView }[] = [
    {
      title: 'Personal Loans',
      desc: 'Flexible funding for your personal aspirations with minimal documentation.',
      icon: <User className="w-8 h-8" />,
      view: 'personal-loan'
    },
    {
      title: 'Business Loans',
      desc: 'Engineered for scalability and capital growth of your enterprise.',
      icon: <Briefcase className="w-8 h-8" />,
      view: 'business-loan'
    },
    {
      title: 'Home Loans',
      desc: 'Step into your dream residence with attractive rates and terms.',
      icon: <Home className="w-8 h-8" />,
      view: 'home-loan'
    },
    {
      title: 'Vehicle Loans',
      desc: 'Accelerate your travel lifestyle with quick approval automobile financing.',
      icon: <Car className="w-8 h-8" />,
      view: 'vehicle-loan'
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
      view: 'insurance'
    },
    {
      title: 'Financial Solutions',
      desc: 'Bespoke wealth management and investment strategies for high-net-worth individuals.',
      icon: <BarChart3 className="w-8 h-8" />,
      view: 'financial-solutions'
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service, i) => {
            const isFeatured = service.title === 'Financial Solutions';
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -12, scale: isFeatured ? 1.02 : 1.01 }}
                onClick={() => {
                  if (service.view) {
                    setActiveView(service.view);
                  } else {
                    const el = document.getElementById('eligibility');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`glass-card p-10 rounded-[40px] group relative cursor-pointer transition-all duration-500 overflow-hidden ${
                  isFeatured 
                    ? 'lg:col-span-2 lg:row-span-1 bg-gradient-to-br from-brand-gold/20 via-white/5 to-transparent border-brand-gold/30 shadow-[0_30px_60px_rgba(212,164,55,0.1)]' 
                    : 'border-white/5 hover:border-brand-gold/20 shadow-2xl'
                }`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight className="text-brand-gold w-6 h-6" />
                </div>
                
                {/* Background Accent for featured */}
                {isFeatured && (
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-[80px]" />
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:shadow-brand-gold/30 group-hover:ring-brand-gold/50 ${
                  isFeatured 
                    ? 'bg-brand-gold text-brand-blue ring-4 ring-brand-gold/20' 
                    : 'bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-blue group-hover:shadow-[0_0_20px_rgba(212,164,55,0.4)]'
                }`}>
                  <motion.div 
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  >
                    {service.icon}
                  </motion.div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className={`font-bold transition-colors ${
                    isFeatured ? 'text-2xl lg:text-3xl font-serif text-white tracking-tight' : 'text-xl text-white/90 group-hover:text-brand-gold'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`leading-relaxed font-light ${
                    isFeatured ? 'text-lg text-white/60 max-w-md' : 'text-sm text-white/40'
                  }`}>
                    {service.desc}
                  </p>
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                  Investigate Solution <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

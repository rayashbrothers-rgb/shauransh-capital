import { motion } from 'motion/react';

export default function PartnerBanks() {
  const partners = [
    'HDFC Bank',
    'ICICI Bank',
    'Bajaj Finserv',
    'Tata Capital',
    'Kotak Mahindra',
    'IDFC First Bank',
    'IndusInd Bank',
    'Yes Bank',
    'Axis Bank'
  ];

  return (
    <section className="py-16 border-y border-white/5 opacity-80" id="partners">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
            Trusted by Leaders & Institutions
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-16 gap-y-10">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-serif font-medium text-white/30 hover:text-white transition-colors cursor-default grayscale hover:grayscale-0"
            >
              <div className="flex flex-col items-center">
                <span>{partner}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

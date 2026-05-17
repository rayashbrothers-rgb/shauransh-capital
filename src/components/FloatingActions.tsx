import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "919876543210"; // Replace with actual number
  const phoneNumber = "+919876543210"; // Replace with actual number
  const message = "Hello, I am interested in Shauransh Capital's services.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const callUrl = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="flex flex-col gap-4 mb-2"
          >
            {/* WhatsApp Button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-2xl shadow-xl hover:shadow-[#25D366]/20 transition-all duration-300 group"
            >
              <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">WhatsApp Us</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <MessageSquare size={24} fill="currentColor" />
              </div>
            </motion.a>

            {/* Call Button */}
            <motion.a
              href={callUrl}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 bg-brand-gold text-brand-blue px-5 py-3 rounded-2xl shadow-xl hover:shadow-brand-gold/20 transition-all duration-300 group"
            >
              <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Call Now</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <Phone size={24} fill="currentColor" />
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-white text-brand-blue rotate-90' : 'bg-brand-blue text-brand-gold border border-brand-gold/30'
        }`}
      >
        {isOpen ? <X size={28} /> : <Phone size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-gold"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}

import { motion } from 'motion/react';

export default function FintechParticles() {
  // Generate a set of random particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 30,
    delay: Math.random() * -30,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-gold/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px]">
        {/* Connection Glints */}
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 4 
            }}
            className="absolute w-1.5 h-1.5 bg-brand-gold blur-[3px] rounded-full shadow-[0_0_15px_#D4A437]"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
          />
        ))}
      </div>
      
      {/* Slow Moving Lens Flare */}
      <motion.div 
        animate={{ 
          x: [-200, 200],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent rotate-12 blur-sm"
      />
    </div>
  );
}

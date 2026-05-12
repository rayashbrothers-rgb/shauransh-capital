import { motion } from 'motion/react';
import { 
  Save, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  MoveVertical, 
  Settings,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

export default function WebsiteManagement() {
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'testimonials'>('hero');

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif font-bold text-white"
          >
            Digital Asset Management
          </motion.h1>
          <p className="text-white/40 text-sm tracking-wide">
            Control the visual and structural components of the public interface.
          </p>
        </div>
        <button className="px-8 py-3 gold-gradient rounded-lg text-[13px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl hover:-translate-y-0.5 transition-all">
          <Save size={18} /> Push To Production
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {(['hero', 'services', 'testimonials'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
              activeTab === tab ? 'text-brand-gold' : 'text-white/30 hover:text-white'
            }`}
          >
            {tab} Section
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10">
        {/* Editor Side */}
        <div className="space-y-8">
          {activeTab === 'hero' && <HeroEditor />}
          {activeTab === 'services' && <ServicesEditor />}
          {activeTab === 'testimonials' && <TestimonialsEditor />}
        </div>

        {/* Live Preview Side */}
        <div className="sticky top-28 h-[calc(100vh-200px)] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Real-time Preview</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-emerald-400/80">Active Session</span>
            </div>
          </div>
          <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col relative group">
             {/* Preview Placeholder */}
             <div className="absolute inset-0 bg-[#061633] overflow-y-auto custom-scrollbar">
                <div className="p-10 text-center opacity-40 h-full flex flex-col items-center justify-center">
                   <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center mb-6">
                      <Eye size={32} strokeWidth={1} />
                   </div>
                   <h4 className="text-xl font-serif font-bold text-white mb-2">Section Simulation</h4>
                   <p className="text-sm max-w-sm font-light">Changes made in the editor will synchronize instantly across all institutional instances.</p>
                </div>
             </div>
             {/* Preview Controls Overlay */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-6">
                <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-gold">Desktop</button>
                <div className="w-[1px] h-3 bg-white/20" />
                <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-gold">Tablet</button>
                <div className="w-[1px] h-3 bg-white/20" />
                <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-gold">Mobile</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroEditor() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-10 space-y-10"
    >
      <div className="space-y-6">
        <div>
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-3 block">Primary Headline</label>
          <textarea 
            defaultValue="Building Trust. Creating Value. Growing Together."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-lg font-serif focus:outline-none focus:border-brand-gold/50 transition-colors resize-none h-32"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-3 block">Sub-headline Description</label>
          <textarea 
            defaultValue="Premium financial solutions engineered for long-term growth, security, and intelligent wealth management."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-sm font-light focus:outline-none focus:border-brand-gold/50 transition-colors resize-none h-24"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-3 block">Primary CTA Text</label>
          <input 
            type="text" 
            defaultValue="Explore Services"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-3 block">Secondary CTA Text</label>
          <input 
            type="text" 
            defaultValue="Contact Us"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
          />
        </div>
      </div>

      <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer group">
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-brand-gold transition-colors">
          <Upload size={24} />
        </div>
        <div className="text-center">
            <p className="text-sm font-bold text-white mb-1">Replace Cinematic Background</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">Recommended: 2400x1600px | Max 5MB</p>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesEditor() {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((service) => (
          <div key={service} className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center gap-8 group">
            <div className="cursor-grab text-white/20 hover:text-brand-gold transition-colors">
              <MoveVertical size={20} />
            </div>
            <div className="w-16 h-16 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
               <ImageIcon size={24} />
            </div>
            <div className="flex-1 space-y-1">
               <h4 className="text-lg font-serif font-bold text-white">Investment Advisory {service}</h4>
               <p className="text-sm text-white/40 font-light truncate max-w-md">Institutional grade strategies for high-net-worth portfolio optimization.</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white transition-all">
                  <Settings size={16} />
               </button>
               <button className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={16} />
               </button>
            </div>
          </div>
        ))}
        <button className="w-full py-6 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] hover:border-brand-gold/30 transition-all group flex items-center justify-center gap-3">
           <Plus size={20} className="text-white/20 group-hover:text-brand-gold transition-colors" />
           <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Add New Financial Service</span>
        </button>
      </div>
    );
}

function TestimonialsEditor() {
    return (
        <div className="space-y-6">
            <p className="text-sm text-white/40 italic font-light px-2 border-l-2 border-brand-gold/30">Select and curate client testimonials to display on the institutional grid.</p>
            <div className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                 <RefreshCw size={40} strokeWidth={1} className="text-brand-gold/20 mb-4 animate-spin-slow" />
                 <p className="text-sm font-medium text-white/60">Module undergoing maintenance</p>
            </div>
        </div>
    );
}

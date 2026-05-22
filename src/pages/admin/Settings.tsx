import { motion } from 'motion/react';
import { Settings as SettingsIcon, Globe, Phone, Mail, MapPin, Palette, Shield, CreditCard, Save, Plus } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif font-bold text-white"
          >
            System Configuration
          </motion.h1>
          <p className="text-white/40 text-sm tracking-wide">
            Global parameters and institutional identity settings.
          </p>
        </div>
        <button className="px-8 py-3 gold-gradient rounded-lg text-[13px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl hover:-translate-y-0.5 transition-all">
          <Save size={18} /> Update Core Settings
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_0.6fr] gap-12">
        <div className="space-y-10">
          {/* Company Info */}
          <section className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-10 space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Company Identity</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <InputGroup label="Entity Name" defaultValue="Shauransh Capital Services" />
              <InputGroup label="Registration Number" defaultValue="SCS-2026-X884" />
              <InputGroup label="Official Email" defaultValue="management@shauransh.capital" icon={Mail} />
              <InputGroup label="Priority Phone" defaultValue="+91 98765 43210" icon={Phone} />
            </div>
            <div className="pt-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-3 block">Headquarters Address</label>
              <textarea 
                defaultValue="Unit 104, Signature Tower, Financial District, Gurugram, IN"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors resize-none h-24"
              />
            </div>
          </section>

          {/* Localization & Preferences */}
          <section className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-10 space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Institutional Preferences</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 block">Base Currency</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white text-sm focus:outline-none focus:border-brand-gold/50 appearance-none">
                     <option value="INR">Indian Rupee (INR)</option>
                     <option value="USD">US Dollar (USD)</option>
                     <option value="EUR">Euro (EUR)</option>
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 block">Time Zone</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white text-sm focus:outline-none focus:border-brand-gold/50 appearance-none">
                     <option value="IST">Asia/Kolkata (IST)</option>
                     <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar Settings Panel */}
        <div className="space-y-8">
            <div className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-10">
               <div className="flex items-center gap-4 text-brand-gold">
                  <Palette size={24} />
                  <h4 className="text-xl font-serif font-bold text-white">Visual Branding</h4>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-bold text-white">Institutional Dark Mode</p>
                        <p className="text-[10px] text-white/30 uppercase mt-1">Force system-wide aesthetic</p>
                     </div>
                     <div className="w-12 h-6 rounded-full bg-brand-gold/20 relative cursor-pointer border border-brand-gold/40">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-brand-gold rounded-full" />
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-bold text-white">Animated Background</p>
                        <p className="text-[10px] text-white/30 uppercase mt-1">Enable particle network</p>
                     </div>
                     <div className="w-12 h-6 rounded-full bg-brand-gold/20 relative cursor-pointer border border-brand-gold/40">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-brand-gold rounded-full" />
                     </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Primary Identity Color</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#D4A437] border-2 border-white ring-2 ring-brand-gold" title="Active: Brand Gold" />
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/40 hover:bg-emerald-500 transition-colors" />
                        <div className="w-8 h-8 rounded-lg bg-blue-500/40 hover:bg-blue-500 transition-colors" />
                        <div className="w-8 h-8 rounded-lg bg-purple-500/40 hover:bg-purple-500 transition-colors" />
                        <div className="w-8 h-8 rounded-lg border-2 border-dashed border-white/10 hover:border-white/30 transition-all flex items-center justify-center text-white/20">
                           <Plus size={14} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group overflow-hidden relative">
               <Shield size={60} className="absolute -bottom-4 -right-4 text-white/[0.03] group-hover:text-brand-gold/[0.05] transition-all duration-700" />
               <h4 className="text-sm font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Security Protocol</h4>
               <p className="text-xs text-white/40 leading-relaxed mb-6">Your authorized interface is protected by multi-layered institutional encryption protocols.</p>
               <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Globe size={14} /> Domain Intelligence
               </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, defaultValue, icon: Icon }: { label: string, defaultValue: string, icon?: any }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 block leading-none">{label}</label>
      <div className="relative group">
        {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={18} />}
        <input 
          type="text" 
          defaultValue={defaultValue}
          className={`w-full bg-white/5 border border-white/10 rounded-xl ${Icon ? 'pl-14' : 'px-6'} pr-6 py-3 text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors`}
        />
      </div>
    </div>
  );
}

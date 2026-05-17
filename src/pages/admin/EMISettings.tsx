import { motion } from 'motion/react';
import { 
  Calculator, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../../lib/settings';

export default function EMISettings() {
  const [rates, setRates] = useState({
    homeLoan: '8.4',
    personalLoan: '10.5',
    businessLoan: '9.2'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSettings('emi_rates');
      if (data) {
        setRates({
          homeLoan: data.homeLoan?.toString() || '8.4',
          personalLoan: data.personalLoan?.toString() || '10.5',
          businessLoan: data.businessLoan?.toString() || '9.2'
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await saveSettings('emi_rates', rates);
    setSaving(false);
  };

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
           <Loader2 className="text-brand-gold animate-spin" size={40} />
           <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Accessing Algorithms...</p>
        </div>
     );
  }

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
            Calculator Algorithms
          </motion.h1>
          <p className="text-white/40 text-sm tracking-wide">
            Configure loan plans, interest rate formulas, and mathematical models.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 gold-gradient rounded-lg text-[13px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl disabled:opacity-50"
        >
           {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
           {saving ? 'Updating...' : 'Update Matrix'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
         <div className="space-y-8">
            {/* Global Interest Rates */}
            <div className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
               <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-8">Basel III Compliant Interest Matrix</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  <RateInput 
                    label="Home Loan Base" 
                    value={rates.homeLoan} 
                    onChange={(val) => setRates({...rates, homeLoan: val})} 
                  />
                  <RateInput 
                    label="Personal Loan" 
                    value={rates.personalLoan} 
                    onChange={(val) => setRates({...rates, personalLoan: val})}
                  />
                  <RateInput 
                    label="Business Sector" 
                    value={rates.businessLoan} 
                    onChange={(val) => setRates({...rates, businessLoan: val})}
                  />
               </div>
            </div>

            {/* Active Loan Plans */}
            <div className="space-y-4">
               <div className="flex items-center justify-between px-2">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Tiered Structuring Plans</h3>
                   <button className="text-[10px] uppercase font-bold text-brand-gold hover:text-white transition-colors flex items-center gap-2">
                      <Plus size={14} /> Add Structure
                   </button>
               </div>
               {[
                  { name: 'Institutional Prime', tenure: '30Y', rates: '7.9% - 9.2%', status: 'Active' },
                  { name: 'SME Express', tenure: '10Y', rates: '9.5% - 11.2%', status: 'Active' },
                  { name: 'Ultra HNI Portfolio', tenure: 'Custom', rates: '6.5% - 8.0%', status: 'Premium' },
               ].map((plan) => (
                  <div key={plan.name} className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:border-brand-gold/30 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-gold">
                           <Calculator size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                           <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Tenure: {plan.tenure} | {plan.rates}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                           plan.status === 'Premium' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/40' : 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                        }`}>
                           {plan.status}
                        </span>
                        <div className="flex gap-2">
                           <button className="p-2 text-white/20 hover:text-brand-gold transition-colors"><RefreshCw size={14} /></button>
                           <button className="p-2 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Configuration Side */}
         <div className="space-y-8">
             <div className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                 <h3 className="text-xl font-serif font-bold text-white mb-2">Algorithm Integrity</h3>
                 <p className="text-xs text-white/40 mb-8 leading-relaxed">Ensure the mathematical foundation of the Shauransh Capital engine aligns with current fiscal policies.</p>
                 
                 <ul className="space-y-6">
                    <li className="flex gap-4">
                       <Percent className="text-brand-gold shrink-0" size={20} />
                       <div>
                          <p className="text-sm font-bold text-white">Dynamic Amortization</p>
                          <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider mt-1">Automated recalculation of principal-interest ratios based on floating rates.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Calendar className="text-brand-gold shrink-0" size={20} />
                       <div>
                          <p className="text-sm font-bold text-white">Fiscal Period Synchronization</p>
                          <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider mt-1">Aligning payment schedules with financial quarter reporting cycles.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <ShieldCheck className="text-brand-gold shrink-0" size={20} />
                       <div>
                          <p className="text-sm font-bold text-white">Regulatory Guardrails</p>
                          <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider mt-1">Automatic interest rate floor/ceiling enforcement per institutional guidelines.</p>
                       </div>
                    </li>
                 </ul>

                 <div className="mt-12 bg-white/5 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">Intelligence Matrix Status</p>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-white/60">Verified Algorithms</span>
                       <span className="text-emerald-400 text-xs font-bold font-mono">OK</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-white/60">Network Latency</span>
                       <span className="text-brand-gold text-xs font-bold font-mono">14ms</span>
                    </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}

function RateInput({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
   return (
      <div className="space-y-3">
         <label className="text-[9px] uppercase tracking-widest font-bold text-white/40 block leading-none">{label}</label>
         <div className="relative group">
            <input 
               type="text" 
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white font-serif text-lg focus:outline-none focus:border-brand-gold group-hover:border-white/20 transition-all text-center"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold font-bold text-sm">%</span>
         </div>
      </div>
   );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Clock,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Loader2,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { db, auth } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp, limit } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  income?: string;
  amount: string;
  city: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Instant Approved' | 'Under Review';
  type?: 'eligibility';
  salary?: number;
  cibil?: number;
  interest?: string;
  tenure?: string;
  emi?: string;
  formSource?: 'consultation' | 'assessment' | 'rate_lock';
  createdAt: any;
}

export default function CRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'consultation' | 'assessment' | 'rate_lock'>('all');
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'leads'), 
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    
    let retryTimeout: NodeJS.Timeout;

    const startListener = () => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Lead[];
        setLeads(leadsData);
        setLoading(false);
        setIsOffline(false);
      }, (error) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('offline') || errorMessage.includes('Could not reach')) {
          setIsOffline(true);
        } else {
          handleFirestoreError(error, OperationType.LIST, 'leads');
        }
        setLoading(false);
      });
      return unsubscribe;
    };

    const unsubscribe = startListener();

    return () => {
      unsubscribe();
      clearTimeout(retryTimeout);
    };
  }, []);

  const updateStatus = async (id: string, newStatus: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', id), { 
        status: newStatus,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.status || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || (lead.formSource || 'consultation') === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const formatDate = (date: any) => {
    if (!date) return '---';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'all', label: 'All Intelligence', icon: Filter },
    { id: 'consultation', label: 'Consultations', icon: ArrowUpRight },
    { id: 'assessment', label: 'Assessments', icon: CheckCircle2 },
    { id: 'rate_lock', label: 'Rate Locks', icon: Clock },
  ] as const;

  return (
    <div className="space-y-10 pb-20">
      {/* Offline Alert */}
      <AnimatePresence>
        {isOffline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-4 flex items-center justify-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <p className="text-brand-gold text-[10px] uppercase font-black tracking-widest">
              Connectivity latency detected. Attempting secure reconnection...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif font-bold text-white tracking-tight"
          >
            Institutional CRM
          </motion.h1>
          <p className="text-white/40 text-sm tracking-wide font-light">
            Manage institutional inquiries and client relationship pipelines.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:border-brand-gold/30 transition-all bg-white/5">
              <Download size={14} /> Export Logic
           </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row gap-6">
         <div className="flex bg-brand-blue/50 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-brand-gold text-brand-blue shadow-lg' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
         </div>
         <div className="flex-1 relative group">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" />
            <input 
               type="text" 
               placeholder="Filter records..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-brand-blue/30 backdrop-blur-md border border-white/10 focus:border-brand-gold/50 rounded-2xl pl-14 pr-6 py-4 text-white text-sm focus:outline-none transition-all"
            />
         </div>
      </div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden min-h-[400px] shadow-2xl"
      >
        <div className="overflow-x-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="text-brand-gold animate-spin" size={40} />
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Accessing Secure Records...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">No intelligence found matching your query.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                  <th className="py-8 pl-10">Client Entity</th>
                  <th className="py-8">Institutional Source</th>
                  <th className="py-8">Financial Intelligence</th>
                  <th className="py-8">Lifecycle Status</th>
                  <th className="py-8">Registry Date</th>
                  <th className="py-8 pr-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 pl-10">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-[11px] ring-1 transition-all group-hover:scale-105 ${lead.status === 'Instant Approved' ? 'bg-green-500/10 text-green-500 ring-green-500/20' : 'bg-brand-gold/10 text-brand-gold ring-brand-gold/20'}`}>
                           {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">{lead.name}</span>
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] text-white/30 font-light truncate max-w-[120px]">{lead.email}</span>
                              <span className="w-1 h-1 rounded-full bg-white/10" />
                              <span className="text-[10px] text-white/30 font-mono tracking-tighter">{lead.phone}</span>
                           </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-8">
                       <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                             <span className={`w-1.5 h-1.5 rounded-full ${
                                lead.formSource === 'assessment' ? 'bg-purple-500' :
                                lead.formSource === 'rate_lock' ? 'bg-cyan-500' :
                                'bg-brand-gold'
                             }`} />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                {lead.formSource === 'assessment' ? 'Digital Assessment' :
                                 lead.formSource === 'rate_lock' ? 'Rate Lock System' :
                                 'Priority Consultation'}
                             </span>
                          </div>
                          <span className="text-sm font-medium text-white/40">{lead.service}</span>
                       </div>
                    </td>
                    <td className="py-8">
                      <div className="flex flex-col gap-2">
                        {lead.formSource === 'rate_lock' ? (
                          <>
                            <span className="text-sm font-serif text-brand-gold font-bold italic tracking-tight">EMI: {lead.emi}</span>
                            <div className="flex gap-3 text-[9px] text-white/30 uppercase font-black tracking-widest">
                                <span>{lead.interest}</span>
                                <span>•</span>
                                <span>{lead.tenure}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-serif text-brand-gold font-bold italic tracking-tight">Cap: {lead.amount ? `₹${Number(lead.amount).toLocaleString()}` : '---'}</span>
                            {lead.income && (
                              <span className="text-[9px] text-white/30 uppercase font-black tracking-tighter">
                                yield: ₹{Number(lead.income).toLocaleString()}
                              </span>
                            )}
                            {lead.formSource === 'assessment' && (
                              <div className="flex gap-3 text-[9px] text-white/30 uppercase font-black tracking-widest">
                                <span>CIBIL: {lead.cibil}</span>
                                <span>•</span>
                                <span className="text-green-500/50">Salary: ₹{lead.salary?.toLocaleString()}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-8">
                      <div className="relative group/select">
                        <select 
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                          className={`appearance-none bg-brand-blue/50 text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none hover:border-brand-gold/40 transition-all cursor-pointer w-40 ${
                            lead.status === 'Instant Approved' ? 'text-green-400 border-green-500/20' : 
                            lead.status === 'New' ? 'text-brand-gold border-brand-gold/20' :
                            'text-white/60'
                          }`}
                        >
                          <option value="New" className="bg-brand-blue">New Registry</option>
                          <option value="In Progress" className="bg-brand-blue">In Pipeline</option>
                          <option value="Under Review" className="bg-brand-blue">Review Process</option>
                          <option value="Instant Approved" className="bg-brand-blue">Approved Track</option>
                          <option value="Completed" className="bg-brand-blue">Lifecycle Exit</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none group-hover/select:text-brand-gold transition-colors" />
                      </div>
                    </td>
                    <td className="py-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-white/40">{formatDate(lead.createdAt).split(',')[0]}</span>
                        <span className="text-[9px] font-medium text-white/20 uppercase tracking-widest">{formatDate(lead.createdAt).split(',')[1]}</span>
                      </div>
                    </td>
                    <td className="py-8 pr-10 text-right">
                      <div className="flex items-center justify-end gap-3">
                         <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/20 hover:text-brand-gold hover:border-brand-gold/30 transition-all shadow-lg group/btn">
                            <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                         </button>
                         <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500/30 hover:text-red-500 hover:bg-red-500/10 transition-all shadow-lg"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}

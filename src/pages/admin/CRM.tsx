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
  ChevronDown, 
  Sparkles,
  X
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
  formSource?: 'consultation' | 'assessment' | 'rate_lock' | 'chat';
  chatHistory?: { role: 'user' | 'model'; text: string }[];
  createdAt: any;
}

export default function CRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'consultation' | 'assessment' | 'rate_lock' | 'chat'>('all');
  const [isOffline, setIsOffline] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleInitializeSampleData = async () => {
    setIsSeeding(true);
    try {
      const { addDoc, collection, Timestamp } = await import('firebase/firestore');
      const now = new Date();
      
      const sampleLeads = [
        {
          name: 'Yash Malhotra',
          email: 'rayashbrothers@gmail.com',
          phone: '+91 95990 34002',
          service: 'Business Loan',
          amount: '12000000',
          income: '250000',
          status: 'In Progress',
          formSource: 'consultation',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 10, 30))
        },
        {
          name: 'Amit Sharma',
          email: 'amit.sharma@gmail.com',
          phone: '+91 98111 22233',
          service: 'Home Loan',
          amount: '8500000',
          income: '150000',
          status: 'Under Review',
          formSource: 'consultation',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 14, 15))
        },
        {
          name: 'Priya Patel',
          email: 'priya.patel@corporate.in',
          phone: '+91 97722 00456',
          service: 'Personal Loan',
          amount: '1500000',
          salary: 95000,
          cibil: 790,
          status: 'Instant Approved',
          formSource: 'assessment',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 1, 12, 11, 45))
        },
        {
          name: 'Vikram Aditya',
          email: 'vikram.aditya@rediffmail.com',
          phone: '+91 91234 56789',
          service: 'Vehicle Loan',
          amount: '2500000',
          status: 'New',
          formSource: 'consultation',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 2, 8, 16, 20))
        },
        {
          name: 'Neha Gupta',
          email: 'neha.gupta@yahoo.com',
          phone: '+91 98989 89898',
          service: 'Personal Loan',
          amount: '800000',
          status: 'New',
          formSource: 'chat',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 3, 24, 9, 10))
        },
        {
          name: 'Rohan Verma',
          email: 'rohan.v@techcorp.com',
          phone: '+91 94444 33333',
          service: 'Home Loan',
          amount: '4500000',
          emi: '₹42,500',
          interest: '8.4%',
          tenure: '20 Years',
          status: 'Completed',
          formSource: 'rate_lock',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 4, 18, 15, 30))
        },
        {
          name: 'Kabir Singh',
          email: 'kabir@singhwealth.in',
          phone: '+91 92222 11111',
          service: 'Business Loan',
          amount: '12000000',
          status: 'Under Review',
          formSource: 'chat',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 1, 5, 17, 8))
        },
        {
          name: 'Shalini Iyer',
          email: 'shalini.iyer@outlook.com',
          phone: '+91 93333 44444',
          service: 'Insurance',
          amount: '0',
          status: 'New',
          formSource: 'chat',
          createdAt: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() - 2, 19, 12, 12))
        }
      ];

      for (const lead of sampleLeads) {
        await addDoc(collection(db, 'leads'), lead);
      }
    } catch (e) {
      console.error('Failed to seed sample data in CRM:', e);
    } finally {
      setIsSeeding(false);
    }
  };

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
    { id: 'chat', label: 'Chat Inquiries', icon: Sparkles },
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

      {/* Empty Database State Notice & Seed Option */}
      {!loading && leads.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-gold/5 border border-brand-gold/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[40px] rounded-full pointer-events-none" />
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-serif font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
              Empty CRM Database Container
            </h4>
            <p className="text-xs text-white/50 max-w-2xl leading-relaxed font-light">
              Your Shauransh Capital master pipeline currently records zero active inquiries. Initialize secure institutional demo assets (Loan consultations, digital credit assessments, rate locks, and AI chatbot inquiries spanning the past 6 months) to test real-time graphs and CRM state controls.
            </p>
          </div>
          <button
            onClick={handleInitializeSampleData}
            disabled={isSeeding}
            className="w-full md:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold/90 text-[#020817] font-black text-[10px] uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-brand-gold/10 disabled:opacity-50 shrink-0"
          >
            {isSeeding ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            {isSeeding ? "Provisioning Ledger..." : "Initialize Demo Registry"}
          </button>
        </motion.div>
      )}

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row gap-6">
         <div className="flex bg-brand-blue/50 p-1 rounded-2xl border border-white/5 backdrop-blur-md overflow-x-auto max-w-full whitespace-nowrap scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
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
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
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
                                lead.formSource === 'chat' ? 'bg-emerald-500' :
                                'bg-brand-gold'
                             }`} />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                {lead.formSource === 'assessment' ? 'Digital Assessment' :
                                 lead.formSource === 'rate_lock' ? 'Rate Lock System' :
                                 lead.formSource === 'chat' ? 'AI Bot Callback' :
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
                      <div className="relative group/select" onClick={(e) => e.stopPropagation()}>
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
                    <td className="py-8 pr-10 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-3">
                         <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/20 hover:text-brand-gold hover:border-brand-gold/30 transition-all shadow-lg group/btn"
                         >
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

      {/* Lead Details & Chat History Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#020817]/85 backdrop-blur-md z-[110] flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#061633] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ring-1 ${selectedLead.status === 'Instant Approved' ? 'bg-green-500/10 text-green-500 ring-green-500/20' : 'bg-brand-gold/10 text-brand-gold ring-brand-gold/20'}`}>
                    {selectedLead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white leading-tight">{selectedLead.name}</h3>
                    <p className="text-white/40 text-[10px] mt-0.5 tracking-wider uppercase font-black">
                      {selectedLead.formSource === 'chat' ? 'AI Chatbot Transcript Log' : 
                       selectedLead.formSource === 'assessment' ? 'Digital Valuation Check' :
                       selectedLead.formSource === 'rate_lock' ? 'Secured EMI Lock' : 'VIP Consultation'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                {/* Visual Status Grid & Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Secure Phone</span>
                    <span className="text-xs text-white font-mono">{selectedLead.phone || '---'}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Registered Email</span>
                    <span className="text-xs text-white truncate font-light" title={selectedLead.email}>{selectedLead.email || '---'}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Target Segment</span>
                    <span className="text-xs text-brand-gold font-medium">{selectedLead.service}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Creation Date</span>
                    <span className="text-xs text-white/70 font-light">{formatDate(selectedLead.createdAt)}</span>
                  </div>
                </div>

                {/* Specific details by Lead source */}
                {selectedLead.formSource === 'rate_lock' && (
                  <div className="bg-brand-gold/5 border border-brand-gold/10 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-brand-gold font-extrabold">Instant Locked Rate Details</h4>
                    <div className="grid grid-cols-3 gap-6 text-center md:text-left">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-black">Monthly EMI</span>
                        <span className="text-lg font-serif font-black text-white">{selectedLead.emi}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-black">Interest Rate</span>
                        <span className="text-lg font-bold text-brand-gold font-mono">{selectedLead.interest}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-black">Contract Tenure</span>
                        <span className="text-lg text-white/70 font-light">{selectedLead.tenure}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLead.formSource === 'assessment' && (
                  <div className="bg-[#102a45]/40 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-[#5ca2e0] font-extrabold">Digital Credit Assessment Report</h4>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-black">Requested Capital</span>
                        <span className="text-md font-bold text-white">₹{Number(selectedLead.amount).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-black">Client CIBIL Score</span>
                        <span className={`text-md font-black font-mono ${selectedLead.cibil && selectedLead.cibil >= 750 ? 'text-emerald-400' : 'text-brand-gold'}`}>{selectedLead.cibil || '---'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-black">Monthly Take Home</span>
                        <span className="text-md font-mono text-white/70">₹{selectedLead.salary?.toLocaleString() || '---'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Chat Interaction History (Chatbot specific) */}
                {selectedLead.formSource === 'chat' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="text-xs uppercase tracking-widest font-black text-brand-gold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Conversational Ledger Transcript
                      </h4>
                      <span className="text-[10px] text-white/30 uppercase font-bold tracking-wider">Secure Audit Trail</span>
                    </div>

                    {selectedLead.chatHistory && selectedLead.chatHistory.length > 0 ? (
                      <div className="border border-white/5 rounded-2xl bg-[#020c1e]/60 p-4 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
                        {selectedLead.chatHistory.map((chat, cIdx) => (
                          <div
                            key={cIdx}
                            className={`flex flex-col max-w-[85%] mb-2 ${chat.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                          >
                            <span className="text-[8px] text-white/20 uppercase tracking-widest font-bold mb-1">
                              {chat.role === 'user' ? 'Client' : 'AI Assistant'}
                            </span>
                            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                              chat.role === 'user'
                                ? 'bg-brand-gold text-brand-blue font-medium rounded-tr-none shadow-md shadow-brand-gold/5'
                                : 'bg-white/5 border border-white/5 text-white/95 rounded-tl-none font-light'
                            }`}>
                              {chat.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2">
                        <p className="text-white/40 text-xs font-light">No dialog ledger is recorded for this customer yet.</p>
                        <p className="text-white/20 text-[10px] font-mono tracking-tight">This lead was triggered directly via chatbot Callback Form handshake.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Controls & Updates in Modal */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-black uppercase text-white/30 tracking-widest">Update Lifecycle Stage:</span>
                    <div className="relative">
                      <select
                        value={selectedLead.status}
                        onChange={(e) => {
                          updateStatus(selectedLead.id, e.target.value as Lead['status']);
                          setSelectedLead(prev => prev ? { ...prev, status: e.target.value as Lead['status'] } : null);
                        }}
                        className={`appearance-none bg-[#020c1e] text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 rounded-xl px-4 py-2.5 pr-10 focus:outline-none hover:border-brand-gold/40 transition-all cursor-pointer w-48 ${
                          selectedLead.status === 'Instant Approved' ? 'text-green-400 border-green-500/20' : 
                          selectedLead.status === 'New' ? 'text-brand-gold border-brand-gold/10' :
                          'text-white/60'
                        }`}
                      >
                        <option value="New">New Registry</option>
                        <option value="In Progress">In Pipeline</option>
                        <option value="Under Review">Review Process</option>
                        <option value="Instant Approved">Approved Track</option>
                        <option value="Completed">Lifecycle Exit</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      deleteLead(selectedLead.id);
                      setSelectedLead(null);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/25 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <Trash2 size={13} /> Delete Reference
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

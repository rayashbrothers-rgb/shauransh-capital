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
  Trash2
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
  createdAt: any;
}

export default function CRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.status || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: any) => {
    if (!date) return '---';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

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
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif font-bold text-white"
          >
            Institutional CRM
          </motion.h1>
          <p className="text-white/40 text-sm tracking-wide">
            Manage institutional inquiries and client relationship pipelines.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all">
              <Download size={16} /> Export Intelligence
           </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-6">
         <div className="flex-1 relative group">
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" />
            <input 
               type="text" 
               placeholder="Filter intelligence by client name, email, or service type..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-brand-blue/30 backdrop-blur-md border border-white/10 focus:border-brand-gold/50 rounded-xl pl-14 pr-6 py-4 text-white text-sm focus:outline-none transition-all"
            />
         </div>
      </div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-h-[400px]"
      >
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="text-brand-gold animate-spin" size={40} />
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Accessing Secure Records...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">No intelligence found matching your query.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                  <th className="py-6 pl-8">Client Entity</th>
                  <th className="py-6">Financial Request</th>
                  <th className="py-6">Financial Data</th>
                  <th className="py-6">Pipeline Status</th>
                  <th className="py-6">Registry Date</th>
                  <th className="py-6 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ring-1 ${lead.status === 'Instant Approved' ? 'bg-green-500/10 text-green-500 ring-green-500/20' : 'bg-brand-gold/10 text-brand-gold ring-brand-gold/20'}`}>
                           {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">{lead.name}</span>
                           <span className="text-[10px] text-white/30 font-light truncate max-w-[150px]">{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                       <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-white/70">{lead.service}</span>
                          <span className="text-[10px] text-white/30 font-light uppercase tracking-widest">{lead.city || 'Premium Sector'}</span>
                       </div>
                    </td>
                    <td className="py-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-serif text-brand-gold/80">Req: ₹{lead.amount || '---'}</span>
                        {lead.income && (
                          <span className="text-[9px] text-white/40 uppercase tracking-tighter">
                            Income: ₹{lead.income}
                          </span>
                        )}
                        {lead.type === 'eligibility' && (
                          <span className="text-[9px] text-white/40 uppercase tracking-tighter">
                            CIBIL: {lead.cibil} | Salary: ₹{lead.salary?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-6">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className={`bg-transparent text-[9px] font-bold uppercase tracking-widest border border-white/10 rounded-full px-3 py-1 focus:outline-none hover:border-brand-gold/40 transition-all cursor-pointer ${lead.status === 'Instant Approved' ? 'text-green-500 border-green-500/20' : ''}`}
                      >
                        <option value="New" className="bg-brand-blue">New</option>
                        <option value="In Progress" className="bg-brand-blue">In Progress</option>
                        <option value="Completed" className="bg-brand-blue">Completed</option>
                        <option value="Instant Approved" className="bg-brand-blue">Instant Approved</option>
                        <option value="Under Review" className="bg-brand-blue">Under Review</option>
                      </select>
                    </td>
                    <td className="py-6">
                      <span className="text-[11px] font-bold text-white/40">{formatDate(lead.createdAt)}</span>
                    </td>
                    <td className="py-6 pr-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-2.5 bg-red-400/5 border border-red-400/10 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
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

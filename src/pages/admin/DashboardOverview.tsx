import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  MessageSquare,
  Activity,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  const [leadCount, setLeadCount] = useState(0);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [newTodayCount, setNewTodayCount] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [conversionData, setConversionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(1000));
    const unsubscribeLeads = onSnapshot(qLeads, (snapshot) => {
      const docs = snapshot.docs.map(doc => doc.data());
      setLeadCount(snapshot.size);
      setIsOffline(false);

      // Calculate New Today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newToday = docs.filter(lead => {
        if (lead.createdAt?.toDate) {
          return lead.createdAt.toDate() >= today;
        }
        return false;
      }).length;
      setNewTodayCount(newToday);

      // Aggregate data for conversion chart
      const services = docs.map(d => d.service).filter(Boolean);
      const counts: {[key: string]: number} = {};
      services.forEach(s => {
        counts[s] = (counts[s] || 0) + 1;
      });
      const topServices = Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setConversionData(topServices);

      // Aggregate data for growth chart
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const last6Months = [];
      const now = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        last6Months.push({
          name: months[d.getMonth()],
          monthNum: d.getMonth(),
          year: d.getFullYear(),
          value: 0
        });
      }

      docs.forEach(lead => {
        if (lead.createdAt?.toDate) {
          const date = lead.createdAt.toDate();
          const m = date.getMonth();
          const y = date.getFullYear();
          const dataPoint = last6Months.find(p => p.monthNum === m && p.year === y);
          if (dataPoint) {
            dataPoint.value++;
          }
        }
      });

      setChartData(last6Months);
    });

    const qRecent = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribeRecent = onSnapshot(qRecent, (snapshot) => {
      setRecentLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setIsOffline(false);
    }, (error) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('offline') || errorMessage.includes('Could not reach')) {
        setIsOffline(true);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeLeads();
      unsubscribeRecent();
    };
  }, []);

  const stats = [
    { label: 'Total Inquiries', value: leadCount.toString(), grow: 'Live', icon: MessageSquare, color: '#D4A437' },
    { label: 'New Intelligence', value: newTodayCount.toString(), grow: 'Today', icon: Activity, color: '#D4A437' },
  ];

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
      <div className="flex flex-col gap-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-serif font-bold text-white"
        >
          Institutional Overview
        </motion.h1>
        <p className="text-white/40 text-sm tracking-wide">
          Real-time metrics for Shauransh Capital Services intelligence.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-gold/10 to-transparent rounded-2xl blur-sm group-hover:bg-brand-gold/20 transition-all duration-500" />
            <div className="relative bg-brand-blue/30 backdrop-blur-xl border border-white/10 px-8 py-10 rounded-2xl h-full flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                  <stat.icon size={26} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full text-emerald-400 bg-emerald-400/10">
                  {stat.grow}
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2 leading-none">{stat.label}</p>
                <h3 className="text-3xl font-serif font-bold text-white tracking-tight">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:border-brand-gold/20 transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Inquiry Growth</h3>
              <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Real-time Lead Analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-gold" />
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Inquiries</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A437" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#D4A437" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#061633', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#D4A437', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D4A437" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Lead Statistics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:border-brand-gold/20 transition-all duration-500"
        >
          <div className="mb-10">
            <h3 className="text-xl font-serif font-bold text-white">Lead Conversion</h3>
            <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Service Demand Metrics</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#061633', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#D4A437' : '#D4A43740'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <Activity className="text-brand-gold" size={18} />
              <div className="leading-none">
                <p className="text-[11px] font-bold text-white tracking-widest uppercase">Avg Conversion</p>
                <p className="text-lg font-serif text-white/60">52.8%</p>
              </div>
            </div>
            <button className="text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:text-white transition-colors">Details</button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden min-h-[300px]"
      >
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-serif font-bold text-white">Recent Intelligent Inquiry</h3>
          <Link to="/admin/contacts" className="px-6 py-2 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:border-brand-gold/40 transition-all">View All CRM</Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20">
               <Loader2 className="text-brand-gold animate-spin" size={32} />
            </div>
          ) : recentLeads.length === 0 ? (
            <p className="text-center py-20 text-white/30 text-sm font-bold uppercase tracking-widest">No recent intelligence registry.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                  <th className="pb-4 pl-4">Client Name</th>
                  <th className="pb-4">Service Required</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Applied On</th>
                  <th className="pb-4 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xs font-bold">
                           {lead.name?.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium">{lead.name}</span>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-white/60 font-light">{lead.service}</td>
                    <td className="py-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        lead.status === 'New' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 
                        lead.status === 'In Progress' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 
                        'bg-white/5 text-white/40 border-white/10'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-5 text-sm text-white/30">
                       {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : '---'}
                    </td>
                    <td className="py-5 pr-4 text-right">
                      <Link to="/admin/contacts" className="p-2 text-white/30 hover:text-brand-gold transition-colors inline-block">
                        <ArrowUpRight size={18} />
                      </Link>
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

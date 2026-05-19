import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { motion } from 'motion/react';
import { Lock, LogIn, Loader2 } from 'lucide-react';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const authSession = localStorage.getItem('shauransh_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'yash' && password === 'yash') {
      setIsAuthenticated(true);
      localStorage.setItem('shauransh_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <Loader2 className="text-brand-gold animate-spin" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[100px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 lg:p-12 text-center relative z-10 mx-auto"
        >
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brand-gold/10 rounded-[24px] lg:rounded-3xl flex items-center justify-center text-brand-gold mx-auto mb-6 lg:mb-8 border border-brand-gold/20">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4 tracking-tight">Institutional Access</h1>
          <p className="text-white/40 text-[13px] mb-8 lg:mb-10 leading-relaxed font-light">
            Authorized personnel only. Please verify your identity via the secure systems gateway to manage Shauransh Capital assets.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold/50 transition-all text-sm text-white"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold/50 transition-all text-sm text-white"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs font-bold mb-4"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full py-4 gold-gradient rounded-xl font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,164,55,0.2)] hover:-translate-y-1 active:translate-y-0 transition-all mt-6 text-sm uppercase tracking-widest text-brand-blue"
            >
              <LogIn size={18} /> Authenticate System
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-8">
             <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Encrypted System v2.1</p>
             <button onClick={() => navigate('/')} className="text-xs text-white/40 hover:text-white transition-colors underline decoration-white/10 underline-offset-4">Return to Public Interface</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative transition-all duration-500 lg:ml-72">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-brand-gold/5 blur-[100px] lg:blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-brand-gold/5 blur-[80px] lg:blur-[120px] rounded-full" />
        </div>

        <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="p-4 md:p-8 lg:p-10 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

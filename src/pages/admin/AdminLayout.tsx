import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { motion } from 'motion/react';
import { Lock, LogIn, Loader2, ArrowLeft, Eye, EyeOff, ShieldAlert, KeyRound, User } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

// Import our subviews
import DashboardOverview from './DashboardOverview';
import CRM from './CRM';
import AdminSettings from './Settings';

export default function AdminLayout() {
  const { 
    activeView, 
    setActiveView, 
    adminSubView, 
    user, 
    isAdmin, 
    authLoading, 
    loginWithCredentials, 
    logout 
  } = useNavigation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError('Please enter both Secure ID and Passkey.');
      return;
    }

    try {
      setIsSubmitting(true);
      setLoginError('');
      await loginWithCredentials(username, password);
    } catch (err: any) {
      console.error("Login failure:", err);
      setLoginError(err.message || 'Invalid parameters specified. Authorization Refused.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSubview = () => {
    switch (adminSubView) {
      case 'dashboard':
      case 'analytics':
        return <DashboardOverview />;
      case 'crm':
        return <CRM />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-brand-gold animate-spin" size={40} />
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-gold/60 animate-pulse">
            Verifying Clearance Gateways...
          </p>
        </div>
      </div>
    );
  }

  // If not logged in as Admin, show user credential form
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Ambient Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[100px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full bg-brand-blue/30 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 lg:p-12 relative z-10 mx-auto shadow-2xl"
        >
          {/* Header branding */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brand-gold/10 rounded-[24px] lg:rounded-3xl flex items-center justify-center text-brand-gold mx-auto mb-6 border border-brand-gold/20 shadow-[0_10px_30px_rgba(212,164,55,0.05)]">
              <Lock size={28} className="animate-pulse" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">Institutional Terminal</h1>
            <p className="text-white/40 text-[12px] leading-relaxed font-light mt-2 uppercase tracking-widest">
              Shauransh Capital Controller Access
            </p>
          </div>

          <form onSubmit={handleCredentialsLogin} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-white/50 block">Secure Operator ID</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Secure Username (yash)"
                  className="w-full bg-white/5 border border-white/15 focus:border-brand-gold/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-white/50 block">Passkey</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password (yash)"
                  className="w-full bg-white/5 border border-white/15 focus:border-brand-gold/50 rounded-xl py-3.5 pl-12 pr-12 text-sm text-white focus:outline-none transition-all placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 font-bold flex items-center gap-2"
              >
                <ShieldAlert size={16} className="shrink-0 text-red-400" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 gold-gradient rounded-xl font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,164,55,0.15)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(212,164,55,0.25)] active:translate-y-0 transition-all text-sm uppercase tracking-widest text-brand-blue cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin text-brand-blue" />
                  Decrypting Gateway...
                </>
              ) : (
                <>
                  <LogIn size={18} strokeWidth={2.5} /> Confirm Authorized Entry
                </>
              )}
            </button>
          </form>

          {/* Institutional Footer */}
          <div className="pt-6 mt-8 border-t border-white/5 flex flex-col gap-4 text-center">
             <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">Encrypted Multi-Channel Authentication</p>
             <button 
               onClick={() => setActiveView('home')} 
               className="text-xs text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer inline-flex"
             >
               <ArrowLeft size={12} /> Return to Public Portal
             </button>
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
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[#020817]">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-brand-gold/5 blur-[100px] lg:blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-brand-gold/5 blur-[80px] lg:blur-[120px] rounded-full" />
        </div>

        <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="p-4 md:p-8 lg:p-10 relative z-10">
          <motion.div
            key={adminSubView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderSubview()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

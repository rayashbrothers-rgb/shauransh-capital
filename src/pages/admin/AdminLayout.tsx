import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { motion } from 'motion/react';
import { Lock, LogIn, Loader2, ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
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
    loginWithGoogle, 
    logout 
  } = useNavigation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      const loggedInUser = await loginWithGoogle();
      if (loggedInUser && loggedInUser.email !== 'rayashbrothers@gmail.com') {
        setLoginError(`Account mismatch. ${loggedInUser.email} is not authorized.`);
      }
    } catch (err: any) {
      console.error("Login failure:", err);
      setLoginError(err.message || 'Authentication failed. Please check connection and try again.');
    }
  };

  // Render subview based on our state instead of router dynamic outlet
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

  // Not authenticated OR not the required single admin account "rayashbrothers@gmail.com"
  if (!user || !isAdmin) {
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
          {user && !isAdmin ? (
            // User signed in but with wrong email
            <div className="space-y-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-500/10 rounded-[24px] lg:rounded-3xl flex items-center justify-center text-red-400 mx-auto mb-6 lg:mb-8 border border-red-500/20">
                <ShieldAlert size={28} />
              </div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">Access Prohibited</h1>
              <p className="text-white/50 text-[13px] leading-relaxed font-light">
                Your account <strong className="text-red-400 font-medium">{user.email}</strong> is not registered as an authorized controller of Shauransh Capital.
              </p>
              
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[11px] text-red-300 font-mono text-left space-y-1">
                <div>SYSTEM LOG: AUTH_DENIED</div>
                <div>REQUIRED: rayashbrothers@gmail.com</div>
              </div>

              <div className="space-y-3 pt-4">
                <button 
                  onClick={logout}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 rounded-xl font-bold flex items-center justify-center gap-3 text-sm uppercase tracking-widest text-white transition-all cursor-pointer"
                >
                  <LogOut size={16} /> Disconnect & Switch Account
                </button>
                <button 
                  onClick={() => setActiveView('home')} 
                  className="w-full py-4 border border-white/10 hover:border-brand-gold/40 rounded-xl text-xs text-white/60 hover:text-white transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ArrowLeft size={16} /> Return to Home
                </button>
              </div>
            </div>
          ) : (
            // Not signed in at all
            <div className="space-y-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brand-gold/10 rounded-[24px] lg:rounded-3xl flex items-center justify-center text-brand-gold mx-auto mb-6 lg:mb-8 border border-brand-gold/20">
                <Lock size={28} />
              </div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">Institutional Access</h1>
              <p className="text-white/40 text-[13px] leading-relaxed font-light">
                Authorized controllers only. Please verify your identity via Gmail Single-Sign-On gateway.
              </p>
              
              {loginError && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 font-bold"
                >
                  {loginError}
                </motion.div>
              )}

              <button 
                onClick={handleGoogleLogin}
                className="w-full py-4 gold-gradient rounded-xl font-bold flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,164,55,0.2)] hover:-translate-y-1 active:translate-y-0 transition-all text-sm uppercase tracking-widest text-brand-blue cursor-pointer"
              >
                <LogIn size={18} strokeWidth={2.5} /> Google SSO Authentication
              </button>

              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                 <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Encrypted Security SSO Protocol</p>
                 <button 
                   onClick={() => setActiveView('home')} 
                   className="text-xs text-white/40 hover:text-white transition-colors underline decoration-white/10 underline-offset-4 cursor-pointer"
                 >
                   Return to Public Interface
                 </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Fully authenticated and verified as 'rayashbrothers@gmail.com'
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

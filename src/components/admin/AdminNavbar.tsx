import { motion } from 'motion/react';
import { 
  Bell, 
  Search, 
  Calendar,
  User as UserIcon,
  ExternalLink,
  LogOut,
  Menu
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';

interface AdminNavbarProps {
  onMenuClick: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const [time, setTime] = useState(new Date());
  const { user, logout, setActiveView } = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="h-20 bg-brand-blue/30 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-white/70 hover:text-brand-gold transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Search Box - Hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-lg md:w-96 group focus-within:border-brand-gold/50 transition-all">
          <Search size={18} className="text-white/30 group-focus-within:text-brand-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-8">
        {/* Live Date & Time */}
        <div className="hidden lg:flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
            <Calendar size={14} className="text-brand-gold" />
            {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
          <div className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">
            {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 text-white/50 hover:text-brand-gold transition-colors">
            <Bell size={22} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full ring-2 ring-brand-blue animate-pulse" />
          </button>

          {/* View Website */}
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 group px-4 py-2 border border-white/10 hover:border-brand-gold/40 rounded-lg text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-all cursor-pointer"
          >
            Live Site
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 p-1 rounded-xl group relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/20 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerpolicy="no-referrer" />
              ) : (
                <UserIcon size={20} className="text-brand-gold" />
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors truncate max-w-[150px]">
                {user?.displayName || 'Yash Malhotra'}
              </span>
              <span className="text-[10px] text-white/40 tracking-wide font-light truncate max-w-[150px]">
                {user?.email || 'rayashbrothers@gmail.com'}
              </span>
            </div>
            
            <button 
              onClick={logout}
              className="p-2 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

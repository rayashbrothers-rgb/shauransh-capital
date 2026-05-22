import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  MessageSquare, 
  Calculator, 
  PieChart, 
  Bell, 
  LogOut,
  ChevronRight,
  Image as ImageIcon,
  Star,
  Users2,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/authorized' },
  { icon: MessageSquare, label: 'Contact Requests', path: '/authorized/contacts' },
  { icon: PieChart, label: 'Analytics', path: '/authorized/analytics' },
  { icon: Settings, label: 'Settings', path: '/authorized/settings' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside className={cn(
        "w-72 bg-brand-blue border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-[70] transition-transform duration-500 ease-[0.22, 1, 0.36, 1]",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Sidebar Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-gold flex items-center justify-center font-serif font-extrabold text-brand-blue text-xl">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-lg leading-tight">SHAURANSH</span>
              <span className="text-[9px] text-brand-gold uppercase tracking-[0.3em] font-medium">AUTHORIZED SECTION</span>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-white/40 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-1 custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/authorized'}
            className={({ isActive }) => cn(
              "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group",
              isActive 
                ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={cn(
                "transition-transform group-hover:scale-110",
                "group-[.active]:text-brand-gold"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-white/5 bg-brand-blue/50">
        <button 
          onClick={() => {
            localStorage.removeItem('shauransh_admin_auth');
            window.location.reload();
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 164, 55, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </aside>
    </>
  );
}

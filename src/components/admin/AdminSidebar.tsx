import { 
  LayoutDashboard, 
  Settings, 
  PieChart, 
  MessageSquare, 
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigation, AdminSubView } from '../../context/NavigationContext';

const menuItems: { icon: any; label: string; view: AdminSubView }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
  { icon: MessageSquare, label: 'Contact Requests', view: 'crm' },
  { icon: PieChart, label: 'Analytics', view: 'analytics' },
  { icon: Settings, label: 'Settings', view: 'settings' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const { adminSubView, setAdminSubView, logout } = useNavigation();

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
          {menuItems.map((item) => {
            const isActive = adminSubView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setAdminSubView(item.view);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group text-left",
                  isActive 
                    ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-brand-gold" : "text-white/50 group-hover:text-white"
                  )} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight size={14} className={cn(
                  "transition-all",
                  isActive ? "opacity-100 text-brand-gold" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                )} />
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/5 bg-brand-blue/50">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all group hover:bg-red-500/5 text-left"
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

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';
import GeminiChatbot from './components/GeminiChatbot';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AnimatePresence, motion } from 'motion/react';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PersonalLoans = lazy(() => import('./pages/PersonalLoans'));
const BusinessLoans = lazy(() => import('./pages/BusinessLoans'));
const HomeLoans = lazy(() => import('./pages/HomeLoans'));
const VehicleLoans = lazy(() => import('./pages/VehicleLoans'));
const FinancialSolutions = lazy(() => import('./pages/FinancialSolutions'));
const Insurance = lazy(() => import('./pages/Insurance'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));

// Loading Fallback
const PageLoader = () => (
  <div className="fixed inset-0 bg-[#061633] flex items-center justify-center z-[1000]">
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-t-2 border-brand-gold rounded-full animate-spin" />
        <div className="absolute inset-2 border-r-2 border-brand-gold/40 rounded-full animate-spin-slow" />
      </div>
      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-gold/60 animate-pulse">
        Shauransh Capital
      </p>
    </div>
  </div>
);

function AppContent() {
  const { activeView } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <LandingPage />;
      case 'personal-loan':
        return <PersonalLoans />;
      case 'business-loan':
        return <BusinessLoans />;
      case 'home-loan':
        return <HomeLoans />;
      case 'vehicle-loan':
        return <VehicleLoans />;
      case 'financial-solutions':
        return <FinancialSolutions />;
      case 'insurance':
        return <Insurance />;
      case 'authorized':
        return <AdminLayout />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeView}
        initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(8px)', y: -15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-screen bg-[#061633] overflow-x-hidden"
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <NavigationProvider>
        <Suspense fallback={<PageLoader />}>
          <AppContent />
        </Suspense>
        <FloatingActions />
        <GeminiChatbot />
      </NavigationProvider>
    </Router>
  );
}

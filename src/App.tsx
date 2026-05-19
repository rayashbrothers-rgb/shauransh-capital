import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PersonalLoans = lazy(() => import('./pages/PersonalLoans'));
const BusinessLoans = lazy(() => import('./pages/BusinessLoans'));
const HomeLoans = lazy(() => import('./pages/HomeLoans'));
const VehicleLoans = lazy(() => import('./pages/VehicleLoans'));
const FinancialSolutions = lazy(() => import('./pages/FinancialSolutions'));
const Insurance = lazy(() => import('./pages/Insurance'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));
const WebsiteManagement = lazy(() => import('./pages/admin/WebsiteManagement'));
const CRM = lazy(() => import('./pages/admin/CRM'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

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

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services/personal-loan" element={<PersonalLoans />} />
          <Route path="/services/business-loan" element={<BusinessLoans />} />
          <Route path="/services/home-loan" element={<HomeLoans />} />
          <Route path="/services/vehicle-loan" element={<VehicleLoans />} />
          <Route path="/services/financial-solutions" element={<FinancialSolutions />} />
          <Route path="/services/insurance" element={<Insurance />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="contacts" element={<CRM />} />
            <Route path="analytics" element={<DashboardOverview />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <FloatingActions />
    </Router>
  );
}

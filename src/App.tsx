import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PersonalLoans from './pages/PersonalLoans';
import BusinessLoans from './pages/BusinessLoans';
import HomeLoans from './pages/HomeLoans';
import VehicleLoans from './pages/VehicleLoans';
import FinancialSolutions from './pages/FinancialSolutions';
import Insurance from './pages/Insurance';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import WebsiteManagement from './pages/admin/WebsiteManagement';
import CRM from './pages/admin/CRM';
import EMISettings from './pages/admin/EMISettings';
import AdminSettings from './pages/admin/Settings';

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}

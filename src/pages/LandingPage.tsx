import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PartnerBanks from '../components/PartnerBanks';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import LeadForm from '../components/LeadForm';
import EMICalculator from '../components/EMICalculator';
import EligibilityChecker from '../components/EligibilityChecker';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-brand-blue selection:bg-brand-gold selection:text-brand-blue overflow-x-hidden antialiased">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-[100px] rounded-full animate-pulse-slow" />
      </div>

      <div className="relative z-10 font-sans">
        <Navbar />
        
        <Hero />
        
        <div className="space-y-0">
          <PartnerBanks />
          <Services />
          <Stats />
          <WhyChooseUs />
          <LeadForm />
          <EligibilityChecker />
          <EMICalculator />
          <Testimonials />
          <Contact />
        </div>
        
        <Footer />
      </div>

      {/* Decorative Custom Scrollbar (Visual only for modern browsers) */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #061633;
        }
        ::-webkit-scrollbar-thumb {
          background: #D4A437;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #B88A2D;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}

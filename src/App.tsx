import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionFlow from './components/SolutionFlow';
import ModulesGrid from './components/ModulesGrid';
import KpiDashboard from './components/KpiDashboard';
import PrivacySection from './components/PrivacySection';
import UseCasesSection from './components/UseCasesSection';
import ComparisonSection from './components/ComparisonSection';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionFlow />
        <ModulesGrid />
        <KpiDashboard />
        <PrivacySection />
        <UseCasesSection />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

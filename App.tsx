import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CarbonCalculator from './components/CarbonCalculator';
import Optimization from './components/Optimization';
import RenewableIntelligence from './components/RenewableIntelligence';
import Reports from './components/Reports';
import Assistant from './components/Assistant';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import { ViewState, AppStage } from './types';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LANDING);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Flow Handlers
  const handleGetStarted = () => setStage(AppStage.AUTH);
  const handleAuthComplete = () => setStage(AppStage.ONBOARDING);
  const handleOnboardingFinish = () => setStage(AppStage.APP);
  const handleLogout = () => setStage(AppStage.LANDING);

  // Navigation Logic
  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return <Dashboard />;
      case ViewState.CALCULATOR: return <CarbonCalculator />;
      case ViewState.OPTIMIZATION: return <Optimization />;
      case ViewState.RENEWABLE: return <RenewableIntelligence />;
      case ViewState.REPORTS: return <Reports />;
      case ViewState.ALERTS: return <Dashboard />; // Reuse dashboard for alerts for now
      default: return <Dashboard />;
    }
  };

  // 1. Landing Stage
  if (stage === AppStage.LANDING) {
      return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // 2. Auth Stage
  if (stage === AppStage.AUTH) {
      return (
        <div className="relative min-h-screen overflow-hidden">
             {/* Background Decor */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none z-0"></div>
            <Auth onComplete={handleAuthComplete} />
        </div>
      );
  }

  // 3. Onboarding Stage
  if (stage === AppStage.ONBOARDING) {
      return (
        <div className="relative min-h-screen overflow-hidden">
             {/* Background Decor */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none z-0"></div>
            <Onboarding onFinish={handleOnboardingFinish} />
        </div>
      );
  }

  // 4. Main App Stage
  return (
    <div className="min-h-screen relative overflow-hidden text-[#1F4E79]">
      
      {/* Background Decor */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none z-0"></div>

      {/* Sidebar (Desktop) */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="md:pl-64 min-h-screen relative z-10 transition-all duration-300">
        
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/40 backdrop-blur-md sticky top-0 z-30 border-b border-white/50">
           <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-[#1F4E79] flex items-center justify-center text-white">
                   <span className="font-bold text-lg">G</span>
               </div>
               <span className="font-bold text-xl text-[#1F4E79]">GreenAI</span>
           </div>
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#1F4E79]">
               <Menu />
           </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
             <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl p-6 flex flex-col gap-4 md:hidden animate-fade-in">
                <button onClick={() => setMobileMenuOpen(false)} className="self-end p-2 mb-4">Close</button>
                <button onClick={() => { setCurrentView(ViewState.DASHBOARD); setMobileMenuOpen(false); }} className="text-xl font-bold py-4 border-b border-gray-100">Dashboard</button>
                <button onClick={() => { setCurrentView(ViewState.CALCULATOR); setMobileMenuOpen(false); }} className="text-xl font-bold py-4 border-b border-gray-100">Carbon Engine</button>
                <button onClick={() => { setCurrentView(ViewState.OPTIMIZATION); setMobileMenuOpen(false); }} className="text-xl font-bold py-4 border-b border-gray-100">Optimization</button>
                <button onClick={() => { setCurrentView(ViewState.RENEWABLE); setMobileMenuOpen(false); }} className="text-xl font-bold py-4 border-b border-gray-100">Renewable Intel</button>
                <button onClick={() => { setCurrentView(ViewState.REPORTS); setMobileMenuOpen(false); }} className="text-xl font-bold py-4 border-b border-gray-100">Reports</button>
                <button onClick={handleLogout} className="text-xl font-bold py-4 text-red-500 mt-auto">Sign Out</button>
             </div>
        )}

        {/* Dynamic View */}
        <div className="max-w-7xl mx-auto">
             {renderView()}
        </div>
      </main>

      {/* Chat Assistant */}
      <Assistant />

    </div>
  );
};

export default App;
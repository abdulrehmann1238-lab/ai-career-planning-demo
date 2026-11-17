import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { InitialLoadingScreen } from './components/loading/InitialLoadingScreen';
import { PublicNavbar } from './components/navigation/PublicNavbar';
import { LandingPage } from './pages/public/LandingPage';
import { AuthModal } from './pages/auth/AuthModal';
import { MultiStepOnboarding } from './pages/onboarding/MultiStepOnboarding';

// User App Components
import { DesktopSidebar } from './components/navigation/DesktopSidebar';
import { TopNavbar } from './components/navigation/TopNavbar';
import { MobileBottomNav } from './components/navigation/MobileBottomNav';
import { OverviewDashboard } from './pages/dashboard/OverviewDashboard';
import { AICareerCoach } from './pages/coach/AICareerCoach';
import { InterviewWorkspace } from './pages/interview/InterviewWorkspace';
import { JobApplicationsPage } from './pages/applications/JobApplicationsPage';
import { WeeklyPlanPage } from './pages/planner/WeeklyPlanPage';
import { ProgressAnalyticsPage } from './pages/progress/ProgressAnalyticsPage';
import { SavedItemsPage } from './pages/saved/SavedItemsPage';
import { SubscriptionPage } from './pages/subscription/SubscriptionPage';
import { SettingsPage } from './pages/settings/SettingsPage';

// Admin Components
import { AdminSidebar } from './components/navigation/AdminSidebar';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Global UI
import { ToastContainer } from './components/ui/ToastContainer';
import { Compass, Shield, Globe } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    mainView, 
    setMainView, 
    appSubpage, 
    setAppSubpage, 
    isOnboardingOpen, 
    setIsOnboardingOpen 
  } = useApp();

  const [isLoadingIntro, setIsLoadingIntro] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');

  if (isLoadingIntro) {
    return <InitialLoadingScreen onComplete={() => setIsLoadingIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary selection:bg-brand-soft selection:text-brand flex flex-col">
      {/* Global Toast Container */}
      <ToastContainer />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
      />

      {/* Multi-step Onboarding Modal / Overlay */}
      {isOnboardingOpen && <MultiStepOnboarding />}

      {/* VIEW A: PUBLIC MARKETING LANDING PAGE */}
      {mainView === 'landing' && (
        <>
          <PublicNavbar
            onSignInClick={() => {
              setAuthInitialMode('signin');
              setAuthModalOpen(true);
            }}
            onGetStartedClick={() => {
              setIsOnboardingOpen(true);
            }}
          />
          <LandingPage
            onOpenAuth={(mode = 'signin') => {
              setAuthInitialMode(mode);
              setAuthModalOpen(true);
            }}
            onStartOnboarding={() => {
              setIsOnboardingOpen(true);
            }}
          />
        </>
      )}

      {/* VIEW B: USER APPLICATION */}
      {mainView === 'app' && (
        <div className="flex h-screen overflow-hidden bg-background">
          {/* Desktop Left Sidebar */}
          <DesktopSidebar />

          {/* Main App Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <TopNavbar />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8">
              {appSubpage === 'dashboard' && <OverviewDashboard />}
              {appSubpage === 'coach' && <AICareerCoach />}
              {appSubpage === 'interview' && <InterviewWorkspace />}
              {appSubpage === 'applications' && <JobApplicationsPage />}
              {appSubpage === 'weekly-plan' && <WeeklyPlanPage />}
              {appSubpage === 'progress' && <ProgressAnalyticsPage />}
              {appSubpage === 'saved' && <SavedItemsPage />}
              {appSubpage === 'subscription' && <SubscriptionPage />}
              {appSubpage === 'settings' && <SettingsPage />}
            </main>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </div>
      )}

      {/* VIEW C: ADMINISTRATIVE DASHBOARD */}
      {mainView === 'admin' && (
        <div className="flex h-screen overflow-hidden bg-[#181C20] text-white">
          <AdminSidebar />

          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-background text-text-primary">
            {/* Admin Header */}
            <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-surface-border px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">SaaS Operations</span>
                <h1 className="text-lg font-bold text-text-primary">Administrative Operations Console</h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMainView('app');
                    setAppSubpage('dashboard');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand bg-brand-soft hover:bg-brand hover:text-white transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Return to Candidate App</span>
                </button>
              </div>
            </header>

            <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
              <AdminDashboard />
            </main>
          </div>
        </div>
      )}

    </div>
  );
};

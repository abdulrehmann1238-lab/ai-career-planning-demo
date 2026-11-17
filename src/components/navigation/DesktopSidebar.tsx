import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Award, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Bookmark, 
  Settings, 
  LogOut, 
  Compass, 
  Shield, 
  Crown,
  RotateCcw
} from 'lucide-react';
import { useApp, AppSubpage } from '../../context/AppContext';

export const DesktopSidebar: React.FC = () => {
  const { 
    appSubpage, 
    setAppSubpage, 
    setMainView, 
    userProfile, 
    logout, 
    resetAllDemoData,
    applications,
    weeklyTasks
  } = useApp();

  const navItems: { id: AppSubpage; label: string; icon: any; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'coach', label: 'AI Career Coach', icon: Sparkles, badge: 'AI' },
    { id: 'interview', label: 'Interview Practice', icon: Award },
    { id: 'applications', label: 'Job Applications', icon: Briefcase, badge: applications.length },
    { id: 'weekly-plan', label: 'Weekly Plan', icon: Calendar, badge: `${weeklyTasks.filter(t => t.completed).length}/${weeklyTasks.length}` },
    { id: 'progress', label: 'Progress Analytics', icon: TrendingUp },
    { id: 'saved', label: 'Saved Items', icon: Bookmark },
    { id: 'subscription', label: 'Subscription', icon: Crown, badge: userProfile.planTier === 'premium' ? 'PRO' : undefined },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-surface-border sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-surface-border flex items-center justify-between">
        <div 
          onClick={() => setAppSubpage('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shadow-soft group-hover:bg-brand-hover transition-colors">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-text-primary tracking-tight font-sans block leading-none">
              Career Planning
            </span>
            <span className="text-[10px] text-text-muted font-secondary mt-0.5 block">
              Personal AI Assistant
            </span>
          </div>
        </div>

        {/* Public Website Back Link */}
        <button
          onClick={() => setMainView('landing')}
          title="Return to Marketing Landing Page"
          className="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface-hover text-xs transition-colors"
        >
          Site
        </button>
      </div>

      {/* Main Navigation Destinations */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2">
          Career Workspace
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = appSubpage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAppSubpage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-brand-soft text-brand shadow-soft'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand' : 'text-text-muted'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white text-brand' : 'bg-surface-hover text-text-muted'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Admin Console Switcher Link */}
        <div className="pt-4 mt-4 border-t border-surface-border">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2">
            Operations
          </div>
          <button
            onClick={() => setMainView('admin')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-text-secondary hover:text-terracotta hover:bg-terracotta-soft/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-terracotta" />
              <span>Admin Console</span>
            </div>
            <span className="text-[10px] bg-terracotta-soft text-terracotta px-1.5 py-0.5 rounded font-bold">
              Owner
            </span>
          </button>
        </div>
      </div>

      {/* Bottom User Profile Card */}
      <div className="p-3 border-t border-surface-border bg-background-soft/40 space-y-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-surface-border shadow-soft">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center shrink-0">
              {userProfile.avatar || 'AM'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-text-primary truncate leading-tight">
                {userProfile.name}
              </div>
              <div className="text-[10px] text-text-muted truncate">
                {userProfile.email}
              </div>
            </div>
          </div>

          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-brand text-white shrink-0">
            {userProfile.planTier}
          </span>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] text-text-muted">
          <button
            onClick={resetAllDemoData}
            title="Restore sample demo data to defaults"
            className="flex items-center gap-1 hover:text-text-primary transition-colors py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={logout}
            title="Log out of demo session"
            className="flex items-center gap-1 hover:text-status-danger transition-colors py-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

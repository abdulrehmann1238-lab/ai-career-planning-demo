import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Shield, 
  Globe, 
  Check, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Calendar
} from 'lucide-react';
import { useApp, AppSubpage } from '../../context/AppContext';

export const TopNavbar: React.FC = () => {
  const { 
    appSubpage, 
    setAppSubpage, 
    setMainView, 
    userProfile, 
    notifications, 
    unreadNotificationCount, 
    markNotificationRead, 
    markAllNotificationsRead, 
    clearNotifications,
    logout
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Dynamic date formatting
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  const pageTitles: Record<AppSubpage, { title: string; subtitle: string }> = {
    'dashboard': { title: 'Career Dashboard', subtitle: 'Overview & Today’s Priorities' },
    'coach': { title: 'AI Career Coach', subtitle: 'Specialized Career Intelligence' },
    'interview': { title: 'Interview Practice', subtitle: 'Calibrated AI Rubric Simulation' },
    'applications': { title: 'Job Applications', subtitle: 'Opportunity Kanban & Table' },
    'weekly-plan': { title: 'Weekly Career Plan', subtitle: 'Personalized Action Roadmap' },
    'progress': { title: 'Progress Analytics', subtitle: 'Readiness & Activity Trends' },
    'saved': { title: 'Saved Items', subtitle: 'Coaching Library & Recommendations' },
    'subscription': { title: 'Subscription & Membership', subtitle: 'Manage Plan & Benefits' },
    'settings': { title: 'Account Settings', subtitle: 'Preferences & Career Profile' },
  };

  const currentMeta = pageTitles[appSubpage] || { title: 'Career Planning', subtitle: 'Workspace' };

  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-surface-border px-4 sm:px-8 py-3.5 flex items-center justify-between">
      
      {/* Left: Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-medium">
          <span>Career</span>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-brand font-semibold capitalize">{appSubpage.replace('-', ' ')}</span>
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight leading-tight mt-0.5">
          {currentMeta.title}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Dynamic Live Date display (hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-hover/80 border border-surface-border text-xs text-text-secondary">
          <Calendar className="w-3.5 h-3.5 text-text-muted" />
          <span>{todayFormatted}</span>
        </div>

        {/* Quick Review Navigation Switchers */}
        <button
          onClick={() => setMainView('landing')}
          title="Return to Public Landing Page"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-text-secondary bg-white border border-surface-border hover:bg-surface-hover transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-brand" />
          <span>Website</span>
        </button>

        <button
          onClick={() => setMainView('admin')}
          title="Switch to Admin Console"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-terracotta bg-terracotta-soft/60 border border-terracotta/20 hover:bg-terracotta-soft transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-terracotta" />
          <span>Admin</span>
        </button>

        {/* Notification Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl bg-white border border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-soft transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-status-danger text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notification Tray Modal / Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-card bg-white border border-surface-border shadow-soft-lg z-50 p-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wider">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-soft text-brand">
                      {unreadNotificationCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-brand hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                  <span className="text-text-muted">·</span>
                  <button
                    onClick={clearNotifications}
                    className="text-text-muted hover:text-status-danger transition-colors"
                    title="Clear tray"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Notification items list */}
              <div className="divide-y divide-surface-border max-h-80 overflow-y-auto my-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-text-muted">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.actionUrl) {
                          const sub = n.actionUrl.replace('/', '') as AppSubpage;
                          setAppSubpage(sub);
                          setNotificationsOpen(false);
                        }
                      }}
                      className={`p-3 text-xs cursor-pointer transition-colors hover:bg-surface-hover/70 flex gap-2.5 ${
                        n.read ? 'opacity-70' : 'bg-brand-soft/20 font-medium'
                      }`}
                    >
                      <div className="pt-0.5">
                        <span className={`w-2 h-2 rounded-full block ${n.read ? 'bg-transparent' : 'bg-brand'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-text-primary text-[11px] truncate">{n.title}</span>
                          <span className="text-[10px] text-text-muted shrink-0 ml-1">{n.timestamp}</span>
                        </div>
                        <p className="text-text-secondary text-[11px] leading-snug mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-surface-border text-center">
                <button
                  onClick={() => {
                    setAppSubpage('settings');
                    setNotificationsOpen(false);
                  }}
                  className="text-[11px] text-brand font-semibold hover:underline"
                >
                  Configure Notification Preferences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar with Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-hover transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center shadow-soft">
              {userProfile.avatar || 'AM'}
            </div>
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-card bg-white border border-surface-border shadow-soft-lg z-50 p-2 text-xs animate-in fade-in zoom-in-95">
              <div className="p-3 border-b border-surface-border">
                <div className="font-bold text-text-primary">{userProfile.name}</div>
                <div className="text-[11px] text-text-muted truncate">{userProfile.email}</div>
                <div className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-soft text-brand uppercase">
                  {userProfile.planTier} Plan
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setAppSubpage('settings');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-text-muted" />
                  <span>Profile & Preferences</span>
                </button>
                <button
                  onClick={() => {
                    setAppSubpage('subscription');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  <span>Membership & Billing</span>
                </button>
              </div>

              <div className="pt-1 border-t border-surface-border">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-status-danger hover:bg-status-danger-soft text-left font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

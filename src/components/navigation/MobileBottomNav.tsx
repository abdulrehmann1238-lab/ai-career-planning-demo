import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Briefcase, 
  Calendar, 
  MoreHorizontal, 
  Award, 
  TrendingUp, 
  Bookmark, 
  Settings, 
  Crown, 
  Shield, 
  Globe, 
  LogOut, 
  X 
} from 'lucide-react';
import { useApp, AppSubpage } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { appSubpage, setAppSubpage, setMainView, logout } = useApp();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const primaryItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'coach', label: 'Coach', icon: Sparkles },
    { id: 'applications', label: 'Jobs', icon: Briefcase },
    { id: 'weekly-plan', label: 'Plan', icon: Calendar },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border px-2 py-2 flex items-center justify-around shadow-soft-lg">
        {primaryItems.map(item => {
          const Icon = item.icon;
          const isActive = appSubpage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setAppSubpage(item.id as AppSubpage);
                setMoreDrawerOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-brand font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-text-muted'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* 5th Button: More */}
        <button
          onClick={() => setMoreDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            moreDrawerOpen ? 'text-brand font-bold' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>

      {/* Slide-up Drawer for "More" destinations */}
      {moreDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-t-card-lg border-t border-surface-border p-5 space-y-4 shadow-soft-lg animate-in slide-in-from-bottom duration-200 max-h-[80vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">More Destinations</span>
              <button 
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setAppSubpage('interview');
                  setMoreDrawerOpen(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-hover/80 text-text-primary hover:bg-brand-soft hover:text-brand"
              >
                <Award className="w-4 h-4 text-terracotta" />
                <span>Interview Studio</span>
              </button>

              <button
                onClick={() => {
                  setAppSubpage('progress');
                  setMoreDrawerOpen(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-hover/80 text-text-primary hover:bg-brand-soft hover:text-brand"
              >
                <TrendingUp className="w-4 h-4 text-status-success" />
                <span>Progress Trends</span>
              </button>

              <button
                onClick={() => {
                  setAppSubpage('saved');
                  setMoreDrawerOpen(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-hover/80 text-text-primary hover:bg-brand-soft hover:text-brand"
              >
                <Bookmark className="w-4 h-4 text-brand" />
                <span>Saved Items</span>
              </button>

              <button
                onClick={() => {
                  setAppSubpage('subscription');
                  setMoreDrawerOpen(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-hover/80 text-text-primary hover:bg-brand-soft hover:text-brand"
              >
                <Crown className="w-4 h-4 text-status-warning" />
                <span>Subscription</span>
              </button>

              <button
                onClick={() => {
                  setAppSubpage('settings');
                  setMoreDrawerOpen(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-hover/80 text-text-primary hover:bg-brand-soft hover:text-brand col-span-2"
              >
                <Settings className="w-4 h-4 text-text-muted" />
                <span>Settings & Profile</span>
              </button>
            </div>

            <div className="pt-3 border-t border-surface-border flex flex-col gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setMoreDrawerOpen(false);
                  setMainView('admin');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-terracotta-soft text-terracotta flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Admin Console</span>
                </div>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold">Manage</span>
              </button>

              <button
                onClick={() => {
                  setMoreDrawerOpen(false);
                  setMainView('landing');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-surface-hover text-text-secondary flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Marketing Website</span>
              </button>

              <button
                onClick={() => {
                  setMoreDrawerOpen(false);
                  logout();
                }}
                className="w-full py-2.5 px-3 rounded-xl text-status-danger hover:bg-status-danger-soft flex items-center gap-2 justify-center"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

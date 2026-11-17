import React from 'react';
import { 
  Shield, 
  Users, 
  Terminal, 
  Crown, 
  BarChart3, 
  Settings, 
  ArrowLeft, 
  Compass, 
  Sparkles,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { useApp, AdminSubpage } from '../../context/AppContext';

export const AdminSidebar: React.FC = () => {
  const { adminSubpage, setAdminSubpage, setMainView, setAppSubpage, adminUsers, adminPrompts } = useApp();

  const navItems: { id: AdminSubpage; label: string; icon: any; badge?: string | number }[] = [
    { id: 'overview', label: 'Console Overview', icon: BarChart3 },
    { id: 'users', label: 'User Directory', icon: Users, badge: adminUsers.length },
    { id: 'prompts', label: 'AI Prompts Manager', icon: Terminal, badge: adminPrompts.length },
    { id: 'subscriptions', label: 'Subscriptions & MRR', icon: Crown },
    { id: 'reporting', label: 'System Analytics', icon: TrendingUp },
    { id: 'settings', label: 'SaaS Config', icon: Sliders }
  ];

  return (
    <aside className="w-64 h-screen bg-[#1F2429] text-white/90 border-r border-white/10 flex flex-col shrink-0 sticky top-0 z-30 select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-terracotta text-white flex items-center justify-center shadow-soft">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-white block leading-none">
              Platform Admin
            </span>
            <span className="text-[10px] text-white/40 mt-0.5 block">
              SaaS Operations Console
            </span>
          </div>
        </div>

        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-terracotta/30 text-terracotta border border-terracotta/40">
          Superadmin
        </span>
      </div>

      {/* Admin Nav Destinations */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-3 mb-2">
          Management
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = adminSubpage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAdminSubpage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-white/15 text-white shadow-soft'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-terracotta' : 'text-white/40'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-terracotta text-white' : 'bg-white/10 text-white/50'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Switchers back to App and Website */}
        <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-3 mb-2">
            Switch View
          </div>

          <button
            onClick={() => {
              setMainView('app');
              setAppSubpage('dashboard');
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Compass className="w-4 h-4 text-brand" />
            <span>Open User App Demo</span>
          </button>

          <button
            onClick={() => setMainView('landing')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white/40" />
            <span>Public Landing Page</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 text-[11px] text-white/40 bg-black/20">
        <div className="flex justify-between">
          <span>Environment:</span>
          <span className="text-status-success font-semibold">Demo Sandbox</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Platform v2.4</span>
          <span>1,420 Users</span>
        </div>
      </div>

    </aside>
  );
};

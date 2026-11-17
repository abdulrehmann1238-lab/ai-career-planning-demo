import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  RotateCcw, 
  Trash2, 
  Check, 
  LogOut,
  Save,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateUserProfile, resetAllDemoData, logout, addToast } = useApp();

  // Tab state
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile');

  // Profile form state
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [targetRole, setTargetRole] = useState(userProfile.targetRoles[0] || 'Senior Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState(userProfile.experienceLevel);
  const [location, setLocation] = useState(userProfile.preferredLocation);
  const [salary, setSalary] = useState(userProfile.expectedSalaryRange);
  const [workArrangement, setWorkArrangement] = useState(userProfile.workArrangement);

  // Notification toggles
  const [notifInterviews, setNotifInterviews] = useState(true);
  const [notifFollowups, setNotifFollowups] = useState(true);
  const [notifWeeklyPlan, setNotifWeeklyPlan] = useState(true);
  const [notifDailyTasks, setNotifDailyTasks] = useState(true);

  // Account password form state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      targetRoles: [targetRole],
      experienceLevel: experienceLevel as any,
      preferredLocation: location,
      expectedSalaryRange: salary,
      workArrangement
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      addToast('warning', 'Missing Password', 'Please enter your current and new password.');
      return;
    }
    if (newPass !== confirmPass) {
      addToast('danger', 'Mismatch', 'New passwords do not match.');
      return;
    }
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    addToast('success', 'Password Updated', 'Your security password has been changed.');
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Account & Platform Settings</h2>
        <p className="text-xs text-text-secondary mt-0.5 font-secondary">
          Manage your personal details, career preferences, notification toggles, and mock workspace data.
        </p>
      </div>

      {/* 2. TABS BAR */}
      <div className="flex border-b border-surface-border gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'profile' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Career</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'account' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security & Account</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'notifications' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'privacy' ? 'border-brand text-brand' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Data</span>
        </button>
      </div>

      {/* 3. TAB CONTENTS */}
      <div className="max-w-3xl">
        {/* TAB: PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="p-7 rounded-card bg-white border border-surface-border shadow-soft space-y-5 text-xs animate-in fade-in">
            <div className="flex items-center gap-4 pb-4 border-b border-surface-border">
              <div className="w-14 h-14 rounded-full bg-brand text-white font-bold text-lg flex items-center justify-center shadow-soft">
                {userProfile.avatar || 'AM'}
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">{userProfile.name}</h3>
                <p className="text-text-secondary text-[11px]">{userProfile.email} · {userProfile.planTier.toUpperCase()} Plan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-text-primary mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Primary Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={e => setExperienceLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-brand"
                >
                  <option value="Entry level">Entry level</option>
                  <option value="1–3 years">1–3 years</option>
                  <option value="3–5 years">3–5 years</option>
                  <option value="5–10 years">5–10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Target Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Expected Salary Band</label>
                <input
                  type="text"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-text-primary mb-1">Work Arrangement</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Remote', 'Hybrid', 'On-site'] as const).map(arr => (
                  <button
                    key={arr}
                    type="button"
                    onClick={() => setWorkArrangement(arr)}
                    className={`py-2 rounded-lg border font-semibold text-center transition-all ${
                      workArrangement === arr
                        ? 'bg-brand text-white border-brand'
                        : 'hover:bg-surface-hover border-surface-border'
                    }`}
                  >
                    {arr}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-surface-border flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-soft transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: ACCOUNT */}
        {activeTab === 'account' && (
          <div className="space-y-6 animate-in fade-in">
            <form onSubmit={handlePasswordSubmit} className="p-7 rounded-card bg-white border border-surface-border shadow-soft space-y-4 text-xs">
              <h3 className="text-sm font-bold text-text-primary">Change Password</h3>
              <p className="text-text-secondary text-[11px]">Keep your local mock credentials secure.</p>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPass}
                    onChange={e => setCurrentPass(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-soft"
                >
                  Update Password
                </button>
              </div>
            </form>

            <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-text-primary">Sign Out of Session</h4>
                <p className="text-xs text-text-secondary">End your current demonstration session on this device.</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl text-status-danger hover:bg-status-danger-soft font-bold text-xs border border-status-danger/30"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {/* TAB: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft space-y-5 text-xs animate-in fade-in">
            <h3 className="text-sm font-bold text-text-primary">Notification Preferences</h3>
            <p className="text-text-secondary text-[11px]">
              Simulated notification toggles across key interview deadlines and application follow-ups.
            </p>

            <div className="divide-y divide-surface-border space-y-4">
              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-text-primary block">Interview Reminders</span>
                  <p className="text-text-secondary text-[11px]">Alerts 24 hours prior to scheduled interview loops.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifInterviews}
                  onChange={e => {
                    setNotifInterviews(e.target.checked);
                    addToast('info', 'Preference Updated', 'Interview alerts toggled.');
                  }}
                  className="w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-text-primary block">Application Follow-up Reminders</span>
                  <p className="text-text-secondary text-[11px]">Alerts when an application has been in review over 7 days.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifFollowups}
                  onChange={e => {
                    setNotifFollowups(e.target.checked);
                    addToast('info', 'Preference Updated', 'Follow-up alerts toggled.');
                  }}
                  className="w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-text-primary block">Weekly Planning Alerts</span>
                  <p className="text-text-secondary text-[11px]">Sunday notifications to synthesize the upcoming sprint plan.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifWeeklyPlan}
                  onChange={e => {
                    setNotifWeeklyPlan(e.target.checked);
                    addToast('info', 'Preference Updated', 'Weekly planner alerts toggled.');
                  }}
                  className="w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-text-primary block">Daily Priority Reminders</span>
                  <p className="text-text-secondary text-[11px]">Morning summary of your 3 key actionable milestones.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifDailyTasks}
                  onChange={e => {
                    setNotifDailyTasks(e.target.checked);
                    addToast('info', 'Preference Updated', 'Daily reminders toggled.');
                  }}
                  className="w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRIVACY & DATA RESET */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft space-y-3 text-xs">
              <h3 className="text-sm font-bold text-text-primary">Data Privacy & Sandbox Overview</h3>
              <p className="text-text-secondary leading-relaxed font-secondary">
                This platform is currently operating in local demonstration mode. All profile data, interview responses, job tracking records, and AI coaching dialogues are maintained strictly within your client browser local storage.
              </p>
              <div className="p-3.5 rounded-xl bg-surface-hover/80 border border-surface-border text-[11px] space-y-1">
                <span className="font-bold text-text-primary block">Production Roadmap Guarantee:</span>
                <p className="text-text-secondary">
                  In future production phases, all data will be isolated with enterprise row-level security (RLS), encrypted at rest (AES-256), and compliant with GDPR/CCPA standards.
                </p>
              </div>
            </div>

            {/* Reset Demo Data Card */}
            <div className="p-6 rounded-card bg-sand/30 border border-sand space-y-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-terracotta" />
                <h4 className="text-sm font-bold text-text-primary">Reset Demo Workspace</h4>
              </div>
              <p className="text-xs text-text-secondary font-secondary">
                Restore all 12 job applications, 3 mock interviews, weekly tasks, and AI discussions back to Alex Morgan’s pristine starting state.
              </p>
              <button
                onClick={resetAllDemoData}
                className="px-4 py-2 rounded-xl bg-white border border-sand text-xs font-bold text-terracotta hover:bg-sand transition-colors"
              >
                Reset Demo Data Now
              </button>
            </div>

            {/* Simulated Delete Account */}
            <div className="p-6 rounded-card bg-white border border-status-danger/30 space-y-3">
              <h4 className="text-sm font-bold text-status-danger">Delete Account UI</h4>
              <p className="text-xs text-text-secondary">
                Permanently purge all local profile history, application cards, and interview records.
              </p>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-status-danger text-white text-xs font-bold hover:bg-status-danger/90"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Account Deletion Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 space-y-4 animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-status-danger-soft text-status-danger flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary">Confirm Account Deletion</h3>
              <p className="text-xs text-text-secondary mt-1">
                Are you sure? This mock action will clear your local storage and log you out.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllDemoData();
                  logout();
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-status-danger text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

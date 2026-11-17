import React, { useState } from 'react';
import { 
  Users, 
  Terminal, 
  Crown, 
  BarChart3, 
  TrendingUp, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  X,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

import { useApp } from '../../context/AppContext';
import { AdminPrompt, AdminUser } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    adminSubpage, 
    adminUsers, 
    updateAdminUserStatus, 
    adminPrompts, 
    updateAdminPrompt, 
    addAdminPrompt, 
    duplicateAdminPrompt, 
    addToast 
  } = useApp();

  // User management states
  const [userSearch, setUserSearch] = useState('');
  const [userSubFilter, setUserSubFilter] = useState<string>('All');
  const [userStatusFilter, setUserStatusFilter] = useState<string>('All');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // AI Prompt states
  const [promptCategoryFilter, setPromptCategoryFilter] = useState<string>('All');
  const [editingPrompt, setEditingPrompt] = useState<AdminPrompt | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  
  // Prompt form fields
  const [formPromptTitle, setFormPromptTitle] = useState('');
  const [formPromptCategory, setFormPromptCategory] = useState<AdminPrompt['category']>('Career Coach');
  const [formPromptDescription, setFormPromptDescription] = useState('');
  const [formPromptSystemRole, setFormPromptSystemRole] = useState('');
  const [formPromptTemplate, setFormPromptTemplate] = useState('');
  const [formPromptSampleInput, setFormPromptSampleInput] = useState('');
  const [formPromptSampleOutput, setFormPromptSampleOutput] = useState('');

  // Active testing preview for prompt
  const [previewTestPrompt, setPreviewTestPrompt] = useState<AdminPrompt | null>(adminPrompts[0]);
  const [testInputText, setTestInputText] = useState(adminPrompts[0]?.sampleInput || '');
  const [testResultText, setTestResultText] = useState(adminPrompts[0]?.sampleOutput || '');
  const [isSimulatingPrompt, setIsSimulatingPrompt] = useState(false);

  // Analytics mock trends
  const userGrowthData = [
    { month: 'Jun', users: 520, mrr: 3120, aiSessions: 1400 },
    { month: 'Jul', users: 740, mrr: 4440, aiSessions: 2100 },
    { month: 'Aug', users: 910, mrr: 5680, aiSessions: 2900 },
    { month: 'Sep', users: 1120, mrr: 7200, aiSessions: 3800 },
    { month: 'Oct', users: 1290, mrr: 8350, aiSessions: 4400 },
    { month: 'Nov', users: 1420, mrr: 9120, aiSessions: 4810 }
  ];

  // Filtered users
  const filteredUsers = adminUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.targetRole.toLowerCase().includes(userSearch.toLowerCase());
    const matchesSub = userSubFilter === 'All' || u.subscription === userSubFilter;
    const matchesStatus = userStatusFilter === 'All' || u.accountStatus === userStatusFilter;
    return matchesSearch && matchesSub && matchesStatus;
  });

  // Filtered prompts
  const filteredPrompts = adminPrompts.filter(p => {
    return promptCategoryFilter === 'All' || p.category === promptCategoryFilter;
  });

  const openNewPromptModal = () => {
    setEditingPrompt(null);
    setFormPromptTitle('');
    setFormPromptCategory('Career Coach');
    setFormPromptDescription('');
    setFormPromptSystemRole('You are an expert career strategist providing calibrated guidance.');
    setFormPromptTemplate('Input: {userInput}\nEvaluate goals and structure 3 decisive action items.');
    setFormPromptSampleInput('How do I negotiate a senior engineering offer?');
    setFormPromptSampleOutput('Lead with gratitude, anchor at $195k market benchmark, reference active final loops.');
    setIsPromptModalOpen(true);
  };

  const openEditPromptModal = (prompt: AdminPrompt) => {
    setEditingPrompt(prompt);
    setFormPromptTitle(prompt.title);
    setFormPromptCategory(prompt.category);
    setFormPromptDescription(prompt.description);
    setFormPromptSystemRole(prompt.systemRole);
    setFormPromptTemplate(prompt.promptTemplate);
    setFormPromptSampleInput(prompt.sampleInput);
    setFormPromptSampleOutput(prompt.sampleOutput);
    setIsPromptModalOpen(true);
  };

  const handlePromptFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPromptTitle.trim()) {
      addToast('warning', 'Missing Title', 'Please give this prompt template a title.');
      return;
    }

    if (editingPrompt) {
      updateAdminPrompt(editingPrompt.id, {
        title: formPromptTitle,
        category: formPromptCategory,
        description: formPromptDescription,
        systemRole: formPromptSystemRole,
        promptTemplate: formPromptTemplate,
        sampleInput: formPromptSampleInput,
        sampleOutput: formPromptSampleOutput
      });
    } else {
      addAdminPrompt({
        title: formPromptTitle,
        category: formPromptCategory,
        description: formPromptDescription,
        systemRole: formPromptSystemRole,
        promptTemplate: formPromptTemplate,
        isActive: true,
        sampleInput: formPromptSampleInput,
        sampleOutput: formPromptSampleOutput
      });
    }

    setIsPromptModalOpen(false);
  };

  const handleTestPromptExecution = async () => {
    if (!previewTestPrompt) return;
    setIsSimulatingPrompt(true);
    await new Promise(r => setTimeout(r, 600));
    setTestResultText(
      `[AI Evaluation Engine v2.4 Output]\nProcessed with: ${previewTestPrompt.title}\nRole: ${previewTestPrompt.systemRole.slice(0, 40)}...\n\nResult:\n• Input matched intent: "${testInputText.slice(0, 35)}..."\n• Generated calibrated recommendation with 94% confidence score.\n• Formatted output into 3 structured execution steps.`
    );
    setIsSimulatingPrompt(false);
    addToast('success', 'Prompt Executed', 'Simulated inference preview rendered.');
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. OVERVIEW CONSOLE */}
      {adminSubpage === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">SaaS Operations</span>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight mt-0.5">Console Overview</h2>
            <p className="text-xs text-text-secondary mt-0.5 font-secondary">
              High-level metrics across registered user base, active subscriptions, and AI inference volume.
            </p>
          </div>

          {/* 6 Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft">
              <span className="text-[10px] font-bold text-text-muted uppercase">Total Users</span>
              <div className="text-2xl font-bold text-text-primary mt-1">1,420</div>
              <span className="text-[10px] text-status-success font-semibold mt-0.5 block">+12% this month</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft">
              <span className="text-[10px] font-bold text-text-muted uppercase">Active Users</span>
              <div className="text-2xl font-bold text-brand mt-1">942</div>
              <span className="text-[10px] text-brand font-semibold mt-0.5 block">66% monthly active</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft">
              <span className="text-[10px] font-bold text-text-muted uppercase">Premium Subscriptions</span>
              <div className="text-2xl font-bold text-terracotta mt-1">380</div>
              <span className="text-[10px] text-terracotta font-semibold mt-0.5 block">26.7% conversion</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft">
              <span className="text-[10px] font-bold text-text-muted uppercase">Monthly Revenue</span>
              <div className="text-2xl font-bold text-text-primary mt-1">$9,120</div>
              <span className="text-[10px] text-status-success font-semibold mt-0.5 block">MRR +9.2%</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft">
              <span className="text-[10px] font-bold text-text-muted uppercase">AI Chat Sessions</span>
              <div className="text-2xl font-bold text-brand mt-1">4,810</div>
              <span className="text-[10px] text-text-muted font-medium mt-0.5 block">Avg 3.4/user</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft">
              <span className="text-[10px] font-bold text-text-muted uppercase">Interview Sessions</span>
              <div className="text-2xl font-bold text-status-success mt-1">1,840</div>
              <span className="text-[10px] text-status-success font-semibold mt-0.5 block">92% completion rate</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                <h3 className="text-sm font-bold text-text-primary">Platform User Growth</h3>
                <span className="text-xs font-semibold text-status-success">+273% over 6 months</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EEE8" vertical={false} />
                    <XAxis dataKey="month" stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9E7E1', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="users" stroke="#526B62" fill="#526B62" fillOpacity={0.15} name="Total Users" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                <h3 className="text-sm font-bold text-text-primary">Monthly Recurring Revenue ($)</h3>
                <span className="text-xs font-semibold text-terracotta">$9,120 MRR</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EEE8" vertical={false} />
                    <XAxis dataKey="month" stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9E7E1', fontSize: '11px' }} />
                    <Bar dataKey="mrr" fill="#B77A61" radius={[4, 4, 0, 0]} name="MRR ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. USER MANAGEMENT */}
      {adminSubpage === 'users' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">User Directory</h2>
            <p className="text-xs text-text-secondary mt-0.5 font-secondary">
              Manage registered candidates, review active opportunity pipelines, and adjust account access.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search user name, email, target role..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-surface-border text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <select
                value={userSubFilter}
                onChange={e => setUserSubFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-surface-border text-xs text-text-secondary bg-white focus:outline-none focus:border-brand"
              >
                <option value="All">All Tiers</option>
                <option value="Premium">Premium</option>
                <option value="Free">Free</option>
              </select>

              <select
                value={userStatusFilter}
                onChange={e => setUserStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-surface-border text-xs text-text-secondary bg-white focus:outline-none focus:border-brand"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-card border border-surface-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-text-primary">
                <thead className="bg-surface-hover/80 border-b border-surface-border text-text-muted font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Target Role</th>
                    <th className="py-3.5 px-4">Registered</th>
                    <th className="py-3.5 px-4">Tier</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Last Active</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredUsers.map(user => (
                    <tr 
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="hover:bg-surface-hover/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-text-primary">{user.name}</div>
                            <div className="text-[11px] text-text-secondary">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary">{user.targetRole}</td>
                      <td className="py-3.5 px-4 text-text-muted">{user.registeredDate}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          user.subscription === 'Premium' ? 'bg-brand text-white' : 'bg-surface-hover text-text-muted'
                        }`}>
                          {user.subscription}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={user.accountStatus}
                          onClick={e => e.stopPropagation()}
                          onChange={e => updateAdminUserStatus(user.id, e.target.value as any)}
                          className={`text-xs font-semibold px-2 py-0.5 rounded-lg border ${
                            user.accountStatus === 'Active' ? 'text-status-success border-status-success/30 bg-status-success-soft/50' :
                            user.accountStatus === 'Pending' ? 'text-status-warning border-status-warning/30 bg-status-warning-soft/50' :
                            'text-status-danger border-status-danger/30 bg-status-danger-soft/50'
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-text-muted">{user.lastActive}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedUser(user);
                          }}
                          className="text-xs font-bold text-brand hover:underline"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Details Drawer */}
          {selectedUser && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in">
              <div className="w-full max-w-md bg-white h-full shadow-soft-lg border-l border-surface-border p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                    <h3 className="text-base font-bold text-text-primary">Candidate Account File</h3>
                    <button onClick={() => setSelectedUser(null)} className="p-1 rounded text-text-muted hover:text-text-primary">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center shadow-soft">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-primary">{selectedUser.name}</h4>
                      <p className="text-xs text-text-muted">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Target Position:</span>
                      <span className="font-bold text-text-primary">{selectedUser.targetRole}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Registration Date:</span>
                      <span className="font-medium text-text-primary">{selectedUser.registeredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Plan Tier:</span>
                      <span className="font-bold text-brand">{selectedUser.subscription}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Opportunity Pipeline:</span>
                      <span className="font-semibold text-text-primary">{selectedUser.applicationsCount} jobs tracked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Interview Loops:</span>
                      <span className="font-semibold text-status-success">{selectedUser.interviewCount} sessions completed</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">Simulate Status Change:</label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {(['Active', 'Pending', 'Suspended'] as const).map(st => (
                        <button
                          key={st}
                          onClick={() => {
                            updateAdminUserStatus(selectedUser.id, st);
                            setSelectedUser({ ...selectedUser, accountStatus: st });
                          }}
                          className={`py-2 rounded-lg font-semibold border text-center transition-all ${
                            selectedUser.accountStatus === st
                              ? 'bg-brand text-white border-brand'
                              : 'hover:bg-surface-hover border-surface-border'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border text-right">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-text-primary bg-surface-hover hover:bg-surface-border"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. AI PROMPTS MANAGEMENT */}
      {adminSubpage === 'prompts' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Intelligence Registry</span>
              <h2 className="text-2xl font-bold text-text-primary tracking-tight mt-0.5">AI Prompt Management</h2>
              <p className="text-xs text-text-secondary mt-0.5 font-secondary">
                Inspect, modify, and test system instructions governing career coaching and rubric evaluations.
              </p>
            </div>

            <button
              onClick={openNewPromptModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-terracotta text-white text-xs font-bold hover:bg-terracotta/90 shadow-soft transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Prompt</span>
            </button>
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 overflow-x-auto">
            {['All', 'Career Coach', 'Interview Feedback', 'Weekly Plan Generation', 'Resume Guidance', 'Follow-up Recommendations'].map(cat => (
              <button
                key={cat}
                onClick={() => setPromptCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  promptCategoryFilter === cat
                    ? 'bg-terracotta text-white shadow-soft'
                    : 'bg-white border border-surface-border text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Prompts Cards & Preview Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Prompts List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {filteredPrompts.map(prompt => (
                <div
                  key={prompt.id}
                  onClick={() => {
                    setPreviewTestPrompt(prompt);
                    setTestInputText(prompt.sampleInput);
                    setTestResultText(prompt.sampleOutput);
                  }}
                  className={`p-5 rounded-card bg-white border shadow-soft hover:shadow-soft-md transition-all cursor-pointer space-y-3 ${
                    previewTestPrompt?.id === prompt.id ? 'border-terracotta ring-1 ring-terracotta/40' : 'border-surface-border'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-soft px-2 py-0.5 rounded">
                      {prompt.category}
                    </span>
                    <span className="text-[10px] text-text-muted">Updated: {prompt.lastUpdated}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-text-primary leading-tight">{prompt.title}</h3>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2 font-secondary">
                      {prompt.description}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-hover/70 font-mono text-[10px] text-text-primary truncate">
                    System: {prompt.systemRole}
                  </div>

                  <div className="pt-2 border-t border-surface-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${prompt.isActive ? 'bg-status-success' : 'bg-text-muted'}`} />
                      <span className="text-[11px] font-semibold text-text-secondary">
                        {prompt.isActive ? 'Active in Pipeline' : 'Draft / Inactive'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => openEditPromptModal(prompt)}
                        className="px-2.5 py-1 rounded bg-surface-hover hover:bg-surface-border text-text-primary text-[11px] font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => duplicateAdminPrompt(prompt.id)}
                        className="px-2.5 py-1 rounded bg-surface-hover hover:bg-surface-border text-text-primary text-[11px] font-semibold"
                        title="Duplicate"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Live Prompt Inference Sandbox (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4 sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-terracotta" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Prompt Testing Sandbox</h3>
                </div>
                <span className="text-[10px] font-bold text-brand bg-brand-soft px-2 py-0.5 rounded">
                  {previewTestPrompt?.category || 'Selected'}
                </span>
              </div>

              {previewTestPrompt ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted uppercase block">Active Template:</span>
                    <h4 className="font-bold text-text-primary">{previewTestPrompt.title}</h4>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Simulated User Input</label>
                    <textarea
                      rows={2}
                      value={testInputText}
                      onChange={e => setTestInputText(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-surface-border font-mono text-[11px] focus:outline-none focus:border-terracotta resize-none"
                    />
                  </div>

                  <button
                    onClick={handleTestPromptExecution}
                    disabled={isSimulatingPrompt}
                    className="w-full py-2 rounded-xl bg-terracotta text-white font-bold text-xs hover:bg-terracotta/90 shadow-soft flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isSimulatingPrompt ? 'Running Model...' : 'Test Run Prompt'}</span>
                  </button>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Evaluated AI Response Preview</label>
                    <div className="p-3 rounded-lg bg-surface-hover/80 border border-surface-border text-[11px] font-mono leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
                      {testResultText}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-text-muted">
                  Select a prompt on the left to inspect its parameters.
                </div>
              )}
            </div>

          </div>

          {/* EDIT / CREATE PROMPT MODAL */}
          {isPromptModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
              <div className="relative w-full max-w-xl bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 sm:p-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                
                <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-4">
                  <h3 className="text-base font-bold text-text-primary">
                    {editingPrompt ? 'Edit AI Prompt Template' : 'Create New System Prompt'}
                  </h3>
                  <button onClick={() => setIsPromptModalOpen(false)} className="p-1 rounded text-text-muted hover:text-text-primary">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePromptFormSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Prompt Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salary Negotiation Strategist"
                      value={formPromptTitle}
                      onChange={e => setFormPromptTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-text-primary mb-1">Category</label>
                      <select
                        value={formPromptCategory}
                        onChange={e => setFormPromptCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-terracotta"
                      >
                        <option value="Career Coach">Career Coach</option>
                        <option value="Interview Feedback">Interview Feedback</option>
                        <option value="Weekly Plan Generation">Weekly Plan Generation</option>
                        <option value="Resume Guidance">Resume Guidance</option>
                        <option value="Follow-up Recommendations">Follow-up Recommendations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-text-primary mb-1">Description</label>
                      <input
                        type="text"
                        placeholder="Internal notes on prompt behavior"
                        value={formPromptDescription}
                        onChange={e => setFormPromptDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">System Role & Persona</label>
                    <textarea
                      rows={2}
                      placeholder="You are an expert executive coach calibrated on tech industry standards..."
                      value={formPromptSystemRole}
                      onChange={e => setFormPromptSystemRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-terracotta font-mono text-[11px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Prompt Template Structure (Tokens: &#123;targetRole&#125;, &#123;userMessage&#125;)</label>
                    <textarea
                      rows={4}
                      value={formPromptTemplate}
                      onChange={e => setFormPromptTemplate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-terracotta font-mono text-[11px] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-text-primary mb-1">Sample Input</label>
                      <textarea
                        rows={2}
                        value={formPromptSampleInput}
                        onChange={e => setFormPromptSampleInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-surface-border text-[11px] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-text-primary mb-1">Sample Expected Output</label>
                      <textarea
                        rows={2}
                        value={formPromptSampleOutput}
                        onChange={e => setFormPromptSampleOutput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-surface-border text-[11px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPromptModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-terracotta text-white text-xs font-bold hover:bg-terracotta/90 shadow-soft"
                    >
                      {editingPrompt ? 'Save Changes' : 'Create Prompt'}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. SUBSCRIPTIONS MANAGEMENT & MRR */}
      {adminSubpage === 'subscriptions' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">Subscription Operations</h2>
            <p className="text-xs text-text-secondary mt-0.5 font-secondary">
              Review recurring revenues, subscriber cohorts, and conversion velocity.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
              <span className="text-xs font-semibold text-text-muted">Total Paid Subscribers</span>
              <div className="text-3xl font-bold text-text-primary mt-2">380</div>
              <span className="text-xs text-status-success font-semibold mt-1 block">+18 new this week</span>
            </div>

            <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
              <span className="text-xs font-semibold text-text-muted">Current MRR</span>
              <div className="text-3xl font-bold text-brand mt-2">$9,120</div>
              <span className="text-xs text-brand font-semibold mt-1 block">ARR: $109,440</span>
            </div>

            <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
              <span className="text-xs font-semibold text-text-muted">Free Plan Users</span>
              <div className="text-3xl font-bold text-text-primary mt-2">1,040</div>
              <span className="text-xs text-text-muted font-medium mt-1 block">Top of funnel</span>
            </div>

            <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
              <span className="text-xs font-semibold text-text-muted">Churn Rate</span>
              <div className="text-3xl font-bold text-status-success mt-2">2.1%</div>
              <span className="text-xs text-status-success font-semibold mt-1 block">Industry benchmark: 4.5%</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. SYSTEM REPORTING & ANALYTICS */}
      {adminSubpage === 'reporting' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">System Performance & Reporting</h2>
            <p className="text-xs text-text-secondary mt-0.5 font-secondary">
              Inference latency, API uptime, candidate retention, and mock rubric scoring metrics.
            </p>
          </div>

          <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider">Inference Response Times</span>
              <span className="text-xs font-bold text-status-success bg-status-success-soft px-2 py-0.5 rounded">p95: 420ms</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-secondary">
              Average AI Coach latency: 1.1s · Rubric feedback calculation: 1.2s · Weekly schedule generator: 0.9s · Zero rate-limit throttling events logged in last 30 days.
            </p>
          </div>
        </div>
      )}

      {/* 6. SAAS CONFIG */}
      {adminSubpage === 'settings' && (
        <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft space-y-5 text-xs animate-in fade-in max-w-2xl">
          <h2 className="text-base font-bold text-text-primary">Platform Operational Settings</h2>
          <p className="text-text-secondary text-[11px]">Control global AI parameters and sandbox settings.</p>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block font-semibold text-text-primary mb-1">Default Intelligence Model</label>
              <select className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-brand">
                <option value="gemini-3.8-flash">Calibrated High-Performance Model (Default)</option>
                <option value="pro">Deep Reasoning Evaluator (Extended Loops)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-text-primary mb-1">Max Daily Mock Sessions (Free Tier)</label>
              <input type="number" defaultValue={1} className="w-full px-3 py-2 rounded-lg border border-surface-border" />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => addToast('success', 'Config Saved', 'Global platform parameters updated.')}
                className="px-5 py-2 rounded-xl bg-terracotta text-white font-bold text-xs"
              >
                Save SaaS Configuration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

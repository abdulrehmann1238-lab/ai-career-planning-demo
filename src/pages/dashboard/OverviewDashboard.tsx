import React, { useState } from 'react';
import { 
  Briefcase, 
  Award, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  MessageSquare, 
  ChevronRight, 
  Building2, 
  ExternalLink,
  Target,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';

import { useApp } from '../../context/AppContext';
import { mockHistoricalAnalytics } from '../../data/mockData';

export const OverviewDashboard: React.FC = () => {
  const { 
    userProfile, 
    setAppSubpage, 
    applications, 
    weeklyTasks, 
    toggleTaskCompletion, 
    addTask,
    interviewSessions,
    addToast,
    setSelectedApplication
  } = useApp();

  const [aiInsightAdded, setAiInsightAdded] = useState(false);

  // Dynamic calculations tied directly to application state
  const completedTasks = weeklyTasks.filter(t => t.completed).length;
  const totalTasks = weeklyTasks.length;
  const taskPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const activeApps = applications.filter(a => a.status === 'Applied' || a.status === 'In Review' || a.status === 'Interview');
  const interviewApps = applications.filter(a => a.status === 'Interview');

  // Today's priorities: 3 most immediate active tasks
  const todaysTasks = weeklyTasks.slice(0, 3);

  // Today's date formatted
  const formattedToday = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const handleAddAiInsightToPlan = () => {
    if (aiInsightAdded) {
      addToast('info', 'Already Added', 'This recommendation is already on your weekly schedule.');
      return;
    }
    addTask({
      day: 'Thursday',
      title: 'Practice Stripe System Design: Distributed Ledger Idempotency',
      category: 'Interview Prep',
      priority: 'High',
      dueTime: '2:00 PM',
      notes: 'Focus on financial consistency, rollback mechanics, and optimistic client UI.',
      relatedCompany: 'Stripe'
    });
    setAiInsightAdded(true);
    addToast('success', 'Added to Weekly Plan', 'Scheduled for Thursday 2:00 PM.');
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. GREETING & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Good morning, {userProfile.name.split(' ')[0] || 'Alex'}.
          </h2>
          <p className="text-sm text-text-secondary mt-1 font-secondary">
            Let's make meaningful progress toward your next opportunity · {formattedToday}
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setAppSubpage('interview')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand text-white text-xs font-semibold hover:bg-brand-hover shadow-soft transition-all"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Practice Interview</span>
          </button>

          <button
            onClick={() => setAppSubpage('applications')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-surface-border text-text-primary text-xs font-semibold hover:bg-surface-hover shadow-soft transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-brand" />
            <span>Add Job Application</span>
          </button>

          <button
            onClick={() => setAppSubpage('coach')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sand/60 border border-sand text-text-primary text-xs font-semibold hover:bg-sand transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Ask Career Coach</span>
          </button>
        </div>
      </div>

      {/* 2. TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1 */}
        <div 
          onClick={() => setAppSubpage('applications')}
          className="p-5 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Active Applications</span>
            <div className="w-8 h-8 rounded-lg bg-softblue text-text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mt-2">{applications.length}</div>
          <div className="mt-2 text-xs text-text-secondary flex items-center gap-1">
            <span className="font-semibold text-brand">{activeApps.length} active</span>
            <span className="text-text-muted">· {applications.filter(a => a.status === 'Offer').length} offer</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => setAppSubpage('applications')}
          className="p-5 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Interviews Scheduled</span>
            <div className="w-8 h-8 rounded-lg bg-sand text-terracotta flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mt-2">{interviewApps.length}</div>
          <div className="mt-2 text-xs text-status-success font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Next: Stripe (Tomorrow)</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => setAppSubpage('weekly-plan')}
          className="p-5 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Tasks Completed</span>
            <div className="w-8 h-8 rounded-lg bg-brand-soft text-brand flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mt-2">
            {completedTasks} <span className="text-sm font-normal text-text-muted">of {totalTasks}</span>
          </div>
          <div className="mt-2 text-xs text-text-secondary flex items-center justify-between">
            <span>{taskPercentage}% of weekly target</span>
            <span className="text-brand font-bold">{totalTasks - completedTasks} left</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => setAppSubpage('progress')}
          className="p-5 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Career Readiness</span>
            <div className="w-8 h-8 rounded-lg bg-status-success-soft text-status-success flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-text-primary mt-2">84%</div>
          <div className="mt-2 text-xs text-status-success font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+6% over past 7 days</span>
          </div>
        </div>

      </div>

      {/* 3. AI CAREER COACH PROMINENT INSIGHT CARD */}
      <div className="p-6 rounded-card bg-gradient-to-r from-brand-light via-white to-sand/20 border border-brand/25 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand text-white flex items-center justify-center shrink-0 shadow-soft">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Career Intelligence Alert</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
              </div>
              <h3 className="text-base font-bold text-text-primary">
                Your career coach noticed something
              </h3>
              <p className="text-xs text-text-secondary max-w-2xl leading-relaxed font-secondary">
                "You have been consistently applying for senior software engineering positions with active interview rounds scheduled at Stripe and Linear. This week, prioritize practicing financial transaction idempotency, decoupled state rollbacks, and STAR storytelling."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setAppSubpage('coach')}
              className="px-4 py-2.5 rounded-xl bg-white border border-surface-border text-xs font-bold text-text-primary hover:bg-surface-hover shadow-soft transition-colors"
            >
              Explore Recommendation
            </button>
            <button
              onClick={handleAddAiInsightToPlan}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-soft flex items-center gap-1.5 ${
                aiInsightAdded
                  ? 'bg-status-success text-white'
                  : 'bg-brand text-white hover:bg-brand-hover'
              }`}
            >
              {aiInsightAdded ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{aiInsightAdded ? 'Added to Plan' : 'Add to Weekly Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. TWO-COLUMN WORKSPACE: TODAY'S PRIORITIES & UPCOMING INTERVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Today's Priorities (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-surface-border">
              <div>
                <h3 className="text-base font-bold text-text-primary">Today's Priorities</h3>
                <p className="text-xs text-text-secondary">High-leverage tasks scheduled for immediate action</p>
              </div>
              <button
                onClick={() => setAppSubpage('weekly-plan')}
                className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
              >
                <span>View Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-surface-border mt-3">
              {todaysTasks.map(task => (
                <div 
                  key={task.id}
                  className="py-3.5 flex items-start gap-3.5 group transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-4 h-4 rounded text-brand focus:ring-brand border-surface-border mt-1 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${
                        task.completed ? 'line-through text-text-muted' : 'text-text-primary'
                      }`}>
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        task.priority === 'High' ? 'bg-terracotta-soft text-terracotta' :
                        task.priority === 'Medium' ? 'bg-sand text-[#8A5A36]' :
                        'bg-surface-hover text-text-muted'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-text-muted" />
                        <span>{task.dueTime || 'Today'}</span>
                      </span>
                      {task.relatedCompany && (
                        <span className="flex items-center gap-1 font-medium text-brand">
                          <Building2 className="w-3 h-3" />
                          <span>{task.relatedCompany}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-surface-border flex items-center justify-between text-xs">
              <span className="text-text-muted">{completedTasks} of {totalTasks} tasks finished this week</span>
              <button
                onClick={() => setAppSubpage('weekly-plan')}
                className="text-xs font-bold text-brand hover:underline"
              >
                + Add Action Item
              </button>
            </div>
          </div>

          {/* Mini Weekly Activity Chart */}
          <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-text-primary">Weekly Action Momentum</h3>
                <p className="text-xs text-text-secondary">Daily completed milestones & application touchpoints</p>
              </div>
              <span className="text-xs font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-full">
                On Track
              </span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockHistoricalAnalytics.timelineDays}>
                  <XAxis dataKey="day" stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9E7E1', fontSize: '11px' }}
                  />
                  <Bar dataKey="completedTasks" fill="#526B62" radius={[4, 4, 0, 0]} name="Tasks Done" />
                  <Bar dataKey="applications" fill="#B77A61" radius={[4, 4, 0, 0]} name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Interviews & Deadlines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upcoming Interviews Card */}
          <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-terracotta" />
                <h3 className="text-base font-bold text-text-primary">Upcoming Interviews</h3>
              </div>
              <span className="text-xs font-bold text-brand bg-brand-soft px-2 py-0.5 rounded-full">
                {interviewApps.length} Scheduled
              </span>
            </div>

            <div className="space-y-3">
              {interviewApps.map(app => (
                <div 
                  key={app.id}
                  onClick={() => {
                    setSelectedApplication(app);
                    setAppSubpage('applications');
                  }}
                  className="p-3.5 rounded-xl border border-surface-border bg-surface-hover/50 hover:bg-surface-hover transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 rounded flex items-center justify-center text-white font-bold text-[10px]"
                        style={{ backgroundColor: app.logoBg || '#526B62' }}
                      >
                        {app.company[0]}
                      </div>
                      <span className="font-bold text-xs text-text-primary">{app.company}</span>
                    </div>
                    <span className="text-[10px] font-bold text-status-success bg-status-success-soft px-2 py-0.5 rounded">
                      {app.interviewDate ? new Date(app.interviewDate).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Upcoming'}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary truncate">{app.role}</p>
                  
                  {app.interviewType && (
                    <div className="text-[11px] text-brand font-medium pt-0.5">
                      Round: {app.interviewType}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setAppSubpage('interview')}
              className="w-full py-2.5 rounded-xl bg-surface-hover hover:bg-brand-soft hover:text-brand text-xs font-bold text-text-secondary transition-colors text-center block"
            >
              Start Practice Session for Upcoming Loops
            </button>
          </div>

          {/* Upcoming Deadlines & Recruiter Follow-ups */}
          <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand" />
                <h3 className="text-base font-bold text-text-primary">Upcoming Deadlines</h3>
              </div>
              <span className="text-xs text-text-muted">Follow-ups</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-hover/70 border border-surface-border">
                <AlertCircle className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-text-primary">Shopify Follow-up</div>
                  <p className="text-text-secondary text-[11px] mt-0.5">Application viewed 8 days ago. Send polite check-in note to David.</p>
                  <span className="text-[10px] text-text-muted mt-1 block">Due: Tomorrow Nov 19</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-hover/70 border border-surface-border">
                <Clock className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-text-primary">HubSpot Offer Decision Window</div>
                  <p className="text-text-secondary text-[11px] mt-0.5">Decision deadline Nov 30. Complete counter-proposal discussions by Nov 25.</p>
                  <span className="text-[10px] text-text-muted mt-1 block">Due: Nov 25</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

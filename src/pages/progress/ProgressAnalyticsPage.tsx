import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Calendar, 
  Filter, 
  Clock,
  ArrowUpRight,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { useApp } from '../../context/AppContext';
import { mockHistoricalAnalytics } from '../../data/mockData';

export const ProgressAnalyticsPage: React.FC = () => {
  const { applications, weeklyTasks, interviewSessions } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const completedTasks = weeklyTasks.filter(t => t.completed).length;
  const interviewCount = applications.filter(a => a.status === 'Interview').length;

  const getChartData = () => {
    if (timeRange === '7d') return mockHistoricalAnalytics.timelineDays;
    if (timeRange === '90d') return mockHistoricalAnalytics.ninetyDaysData;
    return mockHistoricalAnalytics.thirtyDaysData;
  };

  const chartData = getChartData();
  const xDataKey = timeRange === '7d' ? 'day' : 'period';

  const categoryData = mockHistoricalAnalytics.categoryBreakdown;

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. HEADER & TIME FILTER TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Progress & Hiring Analytics</h2>
          <p className="text-xs text-text-secondary mt-0.5 font-secondary">
            Measurable pipeline momentum, interview readiness calibration, and weekly goal consistency.
          </p>
        </div>

        {/* 7d / 30d / 90d Filter */}
        <div className="inline-flex p-1 rounded-xl bg-white border border-surface-border shadow-soft">
          {(['7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === range
                  ? 'bg-brand text-white shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
          <span className="text-xs font-semibold text-text-muted">Total Applications</span>
          <div className="text-3xl font-bold text-text-primary mt-2">{applications.length}</div>
          <span className="text-xs text-brand font-semibold mt-1 block">Active pipeline</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
          <span className="text-xs font-semibold text-text-muted">Interviews Scheduled</span>
          <div className="text-3xl font-bold text-text-primary mt-2">{interviewCount}</div>
          <span className="text-xs text-status-success font-semibold mt-1 block">25% conversion rate</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
          <span className="text-xs font-semibold text-text-muted">Goal Completion</span>
          <div className="text-3xl font-bold text-text-primary mt-2">
            {Math.round((completedTasks / (weeklyTasks.length || 1)) * 100)}%
          </div>
          <span className="text-xs text-text-secondary font-medium mt-1 block">{completedTasks} tasks completed</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft">
          <span className="text-xs font-semibold text-text-muted">Interview Readiness</span>
          <div className="text-3xl font-bold text-text-primary mt-2">84%</div>
          <span className="text-xs text-status-success font-semibold mt-1 block">+18% over 30 days</span>
        </div>
      </div>

      {/* 3. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Interview Readiness Trend (Line Chart) */}
        <div className="lg:col-span-7 p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div>
              <h3 className="text-base font-bold text-text-primary">Interview Readiness Score Trend</h3>
              <p className="text-xs text-text-secondary">Calibrated rubric trajectory across mock sessions</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-soft text-brand">
              Target: 90%+
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EEE8" vertical={false} />
                <XAxis dataKey={xDataKey} stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[50, 100]} stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9E7E1', fontSize: '11px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="readiness" 
                  stroke="#526B62" 
                  strokeWidth={3} 
                  dot={{ fill: '#526B62', strokeWidth: 2, r: 4 }}
                  name="Readiness %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Focus Distribution / Application Velocity */}
        <div className="lg:col-span-5 p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div>
              <h3 className="text-base font-bold text-text-primary">Effort Allocation Breakdown</h3>
              <p className="text-xs text-text-secondary">Distribution of hours across career pillars</p>
            </div>
            <PieIcon className="w-4 h-4 text-brand" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9E7E1', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-surface-border">
            {categoryData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-text-secondary font-medium">{item.name}:</span>
                <span className="font-bold text-text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. ACTIVITY TIMELINE & MILESTONES */}
      <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
        <h3 className="text-base font-bold text-text-primary">Recent Career Milestones</h3>
        
        <div className="divide-y divide-surface-border text-xs">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
              <div>
                <span className="font-bold text-text-primary">Completed Stripe Technical Architecture Round</span>
                <p className="text-text-secondary text-[11px]">Scored 88/100 on distributed state reconciliation</p>
              </div>
            </div>
            <span className="text-text-muted text-[11px]">Nov 16, 2026</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
              <div>
                <span className="font-bold text-text-primary">Received Formal Offer from HubSpot</span>
                <p className="text-text-secondary text-[11px]">$185k base salary + $65k RSUs package</p>
              </div>
            </div>
            <span className="text-text-muted text-[11px]">Nov 15, 2026</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
              <div>
                <span className="font-bold text-text-primary">Optimized Resume using Google X-Y-Z Formula</span>
                <p className="text-text-secondary text-[11px]">Quantified performance improvements across 1.2M users</p>
              </div>
            </div>
            <span className="text-text-muted text-[11px]">Nov 12, 2026</span>
          </div>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Award,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CinematicHeroProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onGetStarted, onExplore }) => {
  const { setMainView, setAppSubpage, applications, weeklyTasks } = useApp();
  const [activeCardHover, setActiveCardHover] = useState<number | null>(null);

  const completedCount = weeklyTasks.filter(t => t.completed).length;
  const totalTasks = weeklyTasks.length;
  const activeAppsCount = applications.filter(a => a.status === 'Applied' || a.status === 'Interview' || a.status === 'In Review').length;

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Cinematic Workspace Ambiance Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft sunlight gradient moving across the workspace desk */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[700px] bg-gradient-to-b from-brand-soft/30 via-sand/40 to-transparent blur-3xl opacity-80" />
        
        {/* Layered workspace geometric shadows */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-softblue/60 blur-3xl" />
        <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] rounded-full bg-sand/70 blur-3xl" />
        
        {/* Subtle grid lines giving editorial structure */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#262B32 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-surface-border shadow-soft backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Designed for ambitious professionals navigating their next opportunity
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-text-primary tracking-tight leading-[1.12]">
            Your next career move starts with a{' '}
            <span className="relative inline-block text-brand">
              clearer plan.
              <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-brand/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Supporting Subheading */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-xl font-secondary leading-relaxed">
            Prepare for interviews, organize every opportunity, and build a career plan that keeps you moving forward. Your personal AI career assistant brings everything together.
          </p>

          {/* Core Philosophy badge */}
          <div className="p-3 rounded-xl bg-sand/40 border border-sand max-w-lg">
            <p className="text-xs font-medium text-text-primary italic">
              "Your career deserves a plan, not another open browser tab."
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand text-white font-medium text-sm shadow-soft-md hover:bg-brand-hover hover:shadow-soft-lg active:scale-[0.99] transition-all group"
            >
              <span>Build My Career Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/90 border border-surface-border text-text-primary font-medium text-sm hover:bg-surface-hover hover:border-text-secondary/30 transition-all shadow-soft"
            >
              <span>Explore the Platform</span>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          {/* Feature Highlights beneath CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-text-secondary border-t border-surface-border/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Personalized AI Guidance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-status-success" />
              <span>Realistic Mock Interview Rubrics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-terracotta" />
              <span>Full Pipeline Tracker</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Interactive Floating UI Components */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
            
            {/* Card 1: Weekly Career Plan preview */}
            <div 
              onMouseEnter={() => setActiveCardHover(1)}
              onMouseLeave={() => setActiveCardHover(null)}
              className="p-5 rounded-card bg-white border border-surface-border shadow-soft-md hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center text-brand">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">Weekly Career Plan</h3>
                    <p className="text-xs text-text-secondary">{completedCount} of {totalTasks} milestones completed</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-soft text-brand">
                  {Math.round((completedCount / totalTasks) * 100)}% on track
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-surface-hover overflow-hidden mb-3">
                <div 
                  className="h-full bg-brand rounded-full transition-all duration-500" 
                  style={{ width: `${(completedCount / totalTasks) * 100}%` }}
                />
              </div>

              {/* Sample Task list */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-hover/70 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                  <span className="line-through text-text-muted flex-1 truncate">Research target company engineering culture</span>
                  <span className="text-[10px] text-text-muted">Mon</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-sand/30 border border-sand text-xs">
                  <Clock className="w-4 h-4 text-terracotta shrink-0" />
                  <span className="text-text-primary font-medium flex-1 truncate">Stripe System Design Preparation</span>
                  <span className="text-[10px] font-semibold text-terracotta bg-white px-1.5 py-0.5 rounded">High</span>
                </div>
              </div>
            </div>

            {/* Grid of Two Smaller Floating Cards: Interview Readiness & Job Applications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 2: Interview Readiness */}
              <div className="p-4 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-sand flex items-center justify-center text-terracotta">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-brand">+6% this week</span>
                </div>
                <div className="text-2xl font-bold text-text-primary">84/100</div>
                <p className="text-xs text-text-secondary mt-0.5 font-medium">Interview Readiness Score</p>
                <div className="mt-2.5 text-[11px] text-text-muted flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-status-success" />
                  <span>STAR Rubrics Calibrated</span>
                </div>
              </div>

              {/* Card 3: Active Job Applications */}
              <div className="p-4 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-softblue flex items-center justify-center text-text-primary">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-status-success">3 Interviews</span>
                </div>
                <div className="text-2xl font-bold text-text-primary">{activeAppsCount}</div>
                <p className="text-xs text-text-secondary mt-0.5 font-medium">Active Opportunities</p>
                <div className="mt-2.5 text-[11px] text-text-muted flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#635BFF]" />
                  <span>Stripe</span>
                  <span className="w-2 h-2 rounded-full bg-[#5E6AD2]" />
                  <span>Linear</span>
                  <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                  <span>HubSpot</span>
                </div>
              </div>

            </div>

            {/* Card 4: AI Career Coach Insight snippet */}
            <div className="p-4 rounded-card bg-gradient-to-r from-brand-light to-white border border-brand/20 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand uppercase tracking-wider">AI Career Coach</span>
                    <span className="text-[10px] text-text-muted">Just now</span>
                  </div>
                  <p className="text-xs text-text-primary mt-1 leading-snug">
                    "You have 3 technical interviews scheduled. Focus on distributed state trade-offs and STAR storytelling."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Target, 
  Compass, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  ChevronDown, 
  MessageSquare, 
  Send,
  Star,
  Users,
  Clock,
  ShieldCheck,
  Check,
  ArrowUpRight
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import { CinematicHero } from '../../components/hero/CinematicHero';

interface LandingPageProps {
  onOpenAuth: (initialMode?: 'signin' | 'signup') => void;
  onStartOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onStartOnboarding }) => {
  const { setMainView, setAppSubpage, setAdminSubpage, addToast } = useApp();

  // Interactive Product Preview Tab state
  const [activePreviewTab, setActivePreviewTab] = useState<'dashboard' | 'interview' | 'tracker' | 'planner'>('dashboard');

  // Interactive Interview practice feedback toggle state
  const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);

  // Pricing billing period toggle state
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // FAQ Accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      addToast('warning', 'Missing Fields', 'Please complete all fields before sending.');
      return;
    }
    setContactSubmitted(true);
    addToast('success', 'Message Received', 'Thank you for reaching out! We will be in touch shortly.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const faqs = [
    {
      q: 'How does the AI career assistant work?',
      a: 'The platform analyzes your career goals, target roles, experience level, and active pipeline. Rather than generic open-ended chat, it provides structured weekly roadmaps, calibrated interview scoring with STAR rubrics, and intelligent next-step recommendations.'
    },
    {
      q: 'Can I track multiple job applications simultaneously?',
      a: 'Yes. You can manage unlimited applications through both an intuitive drag-and-drop Kanban board and a clean table view. Each card tracks custom stages, interview dates, follow-up deadlines, salary notes, and historical timeline logs.'
    },
    {
      q: 'How are weekly career plans generated?',
      a: 'Weekly plans are algorithmically synthesized based on your onboarding preferences and active applications. If you have an interview in two days, your plan automatically prioritizes technical review and behavioral storytelling.'
    },
    {
      q: 'Can I practice different interview types?',
      a: 'Absolutely. You can choose from Behavioral, Technical, Situational, Leadership, and General HR formats across Beginner, Intermediate, and Advanced difficulty tiers tailored to your target role.'
    },
    {
      q: 'Is my career information private?',
      a: 'Yes. In this demonstration prototype, all information resides strictly in your local browser sandbox. No private career details are ever sold or harvested for third-party advertising.'
    },
    {
      q: 'What is included in the Premium plan?',
      a: 'Premium unlocks extended AI interview practice rounds, in-depth multi-dimensional rubric scoring, customized weekly plan generation, advanced progress trends, and priority mock strategy.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-brand-soft selection:text-brand">
      
      {/* 1. CINEMATIC WORKSPACE HERO */}
      <CinematicHero
        onGetStarted={onStartOnboarding}
        onExplore={() => {
          const el = document.getElementById('interactive-preview');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. SECTION: THE PROBLEM */}
      <section className="py-20 bg-background-soft border-y border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider">The Challenge</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 tracking-tight">
              Job searching shouldn't feel like a full-time job without a plan.
            </h2>
            <p className="text-base text-text-secondary mt-3 font-secondary">
              Most candidates cycle through disorienting spreadsheets, tab overload, and unstructured anxiety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-terracotta-soft text-terracotta flex items-center justify-center mb-5">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Too many opportunities to track</h3>
                <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                  Important deadlines get lost between email threads, LinkedIn tabs, and scattered bookmarks, leading to missed recruiter follow-ups.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-border text-xs text-text-muted font-medium">
                Symptom: Tab overload & missed deadlines
              </div>
            </div>

            {/* Problem 2 */}
            <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sand text-[#8A5A36] flex items-center justify-center mb-5">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Interviewing without structured feedback</h3>
                <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                  Practicing alone in front of a mirror or asking friends rarely reveals whether your technical trade-offs and STAR answers meet committee standards.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-border text-xs text-text-muted font-medium">
                Symptom: Unclear rejection reasons
              </div>
            </div>

            {/* Problem 3 */}
            <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-softblue text-brand flex items-center justify-center mb-5">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">No clear direction or accountability</h3>
                <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                  Without prioritized daily objectives, weeks evaporate in unstructured browsing without steady compound progress toward offers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-border text-xs text-text-muted font-medium">
                Symptom: Chronic job search burnout
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: THE SOLUTION */}
      <section id="features" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">The Solution</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 tracking-tight">
            Everything you need to move your career forward.
          </h2>
          <p className="text-base text-text-secondary mt-3 font-secondary">
            A cohesive ecosystem that combines intelligent coaching, active tracking, and deliberate skill preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Solution 1: AI Interview Practice */}
          <div className="p-8 rounded-card-lg bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2.5">AI Interview Practice</h3>
            <p className="text-sm text-text-secondary font-secondary mb-6 leading-relaxed">
              Practice realistic behavioral and technical interviews. Receive multi-dimensional scoring (Communication, Relevance, Structure, Specificity) and STAR sample responses.
            </p>
            <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border text-xs space-y-2 font-mono">
              <div className="flex justify-between font-sans">
                <span className="font-semibold text-text-primary">Rubric Calibration</span>
                <span className="text-status-success font-bold">86/100 Score</span>
              </div>
              <div className="text-text-secondary font-sans leading-normal">
                "Identified concrete metrics; suggested reinforcing long-term team velocity impact."
              </div>
            </div>
          </div>

          {/* Solution 2: Job Application Tracker */}
          <div className="p-8 rounded-card-lg bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sand text-brand flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2.5">Job Application Tracker</h3>
            <p className="text-sm text-text-secondary font-secondary mb-6 leading-relaxed">
              Keep applications, deadlines, interview dates, and notes organized. Toggle between an interactive Kanban board and a compact table view with one click.
            </p>
            <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#635BFF]" />
                <span className="font-semibold text-text-primary">Stripe</span>
                <span className="text-text-muted">· Senior Frontend</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-soft text-brand">
                Interview Loop
              </span>
            </div>
          </div>

          {/* Solution 3: Personalized Career Plans */}
          <div className="p-8 rounded-card-lg bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-softblue text-text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2.5">Personalized Career Plans</h3>
            <p className="text-sm text-text-secondary font-secondary mb-6 leading-relaxed">
              Turn your career goals into realistic weekly action plans. Prioritize tasks by impact (High, Medium, Low) and adapt dynamically as interview invites arrive.
            </p>
            <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span className="font-medium text-text-primary">8 of 12 weekly goals completed</span>
              </div>
              <span className="text-[11px] font-semibold text-text-muted">Mon–Sun Roadmap</span>
            </div>
          </div>

          {/* Solution 4: Career Progress Insights */}
          <div className="p-8 rounded-card-lg bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-terracotta-soft text-terracotta flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2.5">Career Progress Insights</h3>
            <p className="text-sm text-text-secondary font-secondary mb-6 leading-relaxed">
              Understand your application conversion funnel, identify skill gaps, track interview readiness trends over 7, 30, and 90 days, and maintain consistency.
            </p>
            <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand" />
                <span className="font-semibold text-text-primary">Readiness Trend</span>
              </div>
              <span className="text-status-success font-bold">+18% over 30 days</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION: HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-background-soft border-t border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 tracking-tight">
              A clear, structured path to your next offer.
            </h2>
            <p className="text-base text-text-secondary mt-3 font-secondary">
              Three connected steps that transform job searching from anxious chaos into a predictable workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-card bg-white border border-surface-border shadow-soft relative">
              <div className="text-3xl font-extrabold text-brand/30 mb-4 font-mono">01</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Tell us where you want to go</h3>
              <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                Complete a fast 7-step guided onboarding to specify target roles, salary bands, experience level, and preferred industries.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand">
                <span>Personalized profile onboarding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-card bg-white border border-surface-border shadow-soft relative">
              <div className="text-3xl font-extrabold text-brand/30 mb-4 font-mono">02</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Get your personalized roadmap</h3>
              <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                Our intelligence engine generates an actionable weekly schedule prioritizing application outreach, resume polish, and mock interviews.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand">
                <span>Dynamic Monday–Sunday planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-card bg-white border border-surface-border shadow-soft relative">
              <div className="text-3xl font-extrabold text-brand/30 mb-4 font-mono">03</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Make progress every week</h3>
              <p className="text-sm text-text-secondary font-secondary leading-relaxed">
                Track opportunities on your Kanban board, complete practice sessions with calibrated feedback, and convert interviews into offers.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-brand">
                <span>Measurable readiness growth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION: INTERACTIVE PRODUCT PREVIEW */}
      <section id="interactive-preview" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-terracotta uppercase tracking-wider">Hands-on Experience</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 tracking-tight">
            See the platform in action.
          </h2>
          <p className="text-base text-text-secondary mt-3 font-secondary">
            Switch between core workspaces to preview the actual interface architecture.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-surface-hover border border-surface-border gap-1 overflow-x-auto max-w-full">
            <button
              onClick={() => setActivePreviewTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                activePreviewTab === 'dashboard'
                  ? 'bg-white text-text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Career Dashboard
            </button>
            <button
              onClick={() => setActivePreviewTab('interview')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                activePreviewTab === 'interview'
                  ? 'bg-white text-text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Interview Practice
            </button>
            <button
              onClick={() => setActivePreviewTab('tracker')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                activePreviewTab === 'tracker'
                  ? 'bg-white text-text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Job Tracker
            </button>
            <button
              onClick={() => setActivePreviewTab('planner')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                activePreviewTab === 'planner'
                  ? 'bg-white text-text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Weekly Plan
            </button>
          </div>
        </div>

        {/* Preview Content Container */}
        <div className="p-6 sm:p-8 rounded-card-lg bg-white border border-surface-border shadow-soft-lg transition-all duration-300">
          {activePreviewTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-surface-border gap-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Good morning, Alex</h3>
                  <p className="text-xs text-text-secondary">Here is your career pipeline summary for today</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-soft text-brand">
                    Active Demo State
                  </span>
                  <button
                    onClick={() => {
                      setMainView('app');
                      setAppSubpage('dashboard');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand text-white hover:bg-brand-hover"
                  >
                    <span>Open Live Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <span className="text-xs text-text-muted font-medium">Active Applications</span>
                  <div className="text-2xl font-bold text-text-primary mt-1">12</div>
                  <span className="text-[11px] text-brand font-medium">Across 8 target firms</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <span className="text-xs text-text-muted font-medium">Interviews Scheduled</span>
                  <div className="text-2xl font-bold text-text-primary mt-1">3</div>
                  <span className="text-[11px] text-status-success font-medium">Stripe, Linear, Figma</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <span className="text-xs text-text-muted font-medium">Tasks Completed</span>
                  <div className="text-2xl font-bold text-text-primary mt-1">8 of 12</div>
                  <span className="text-[11px] text-text-secondary font-medium">67% weekly goal</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <span className="text-xs text-text-muted font-medium">Career Readiness</span>
                  <div className="text-2xl font-bold text-text-primary mt-1">84%</div>
                  <span className="text-[11px] text-status-success font-medium">+6% this week</span>
                </div>
              </div>

              {/* Priorities & AI Insight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-surface-border">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Today's Priorities</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-hover/80">
                      <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                      <span className="line-through text-text-muted flex-1">Follow up with David at Shopify</span>
                      <span className="text-[10px] text-text-muted">Done</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-sand/30 border border-sand">
                      <Clock className="w-4 h-4 text-terracotta shrink-0" />
                      <span className="text-text-primary font-medium flex-1">Stripe System Design Preparation</span>
                      <span className="text-[10px] font-bold text-terracotta bg-white px-1.5 py-0.5 rounded">High</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-brand-light to-white border border-brand/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand" />
                    <h4 className="text-xs font-bold text-brand uppercase tracking-wider">Career Coach Insight</h4>
                  </div>
                  <p className="text-xs text-text-primary leading-relaxed">
                    "You have been consistently applying for senior software positions. Focus on practicing distributed ledger idempotency and strengthening your project explanations for your Thursday Stripe round."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePreviewTab === 'interview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-surface-border gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-soft text-brand">Behavioral</span>
                    <span className="text-xs text-text-muted">Question 1 of 5 · Intermediate</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mt-1">
                    "Tell me about a challenging technical problem you solved and how you approached it."
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setMainView('app');
                    setAppSubpage('interview');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand text-white hover:bg-brand-hover"
                >
                  <span>Launch Practice Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sample Answer and Feedback */}
              <div className="p-4 rounded-xl bg-surface-hover/80 border border-surface-border text-xs leading-relaxed text-text-primary">
                <span className="font-bold text-text-muted uppercase text-[10px] tracking-wider block mb-1">Candidate Answer (STAR):</span>
                "During our TypeScript migration, I noticed frequent nullish runtime regressions. I created an automated benchmark showing 60% of our bugs stemmed from unchecked object access. Rather than forcing an immediate breaking rewrite, I proposed an incremental burn-down backlog with strict null checks for new pull requests..."
              </div>

              <div className="p-4 rounded-xl bg-white border border-brand/20 shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">AI Evaluation Score:</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-status-success-soft text-status-success">86/100</span>
                  </div>
                  <button
                    onClick={() => setShowDetailedFeedback(!showDetailedFeedback)}
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    {showDetailedFeedback ? 'Hide Breakdown' : 'View Full Rubric Breakdown'}
                  </button>
                </div>

                {showDetailedFeedback ? (
                  <div className="space-y-3 pt-2 border-t border-surface-border text-xs animate-in fade-in">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2 rounded bg-surface-hover text-center">
                        <div className="text-[10px] text-text-muted">Communication</div>
                        <div className="font-bold text-text-primary">88/100</div>
                      </div>
                      <div className="p-2 rounded bg-surface-hover text-center">
                        <div className="text-[10px] text-text-muted">Relevance</div>
                        <div className="font-bold text-text-primary">90/100</div>
                      </div>
                      <div className="p-2 rounded bg-surface-hover text-center">
                        <div className="text-[10px] text-text-muted">Structure</div>
                        <div className="font-bold text-text-primary">84/100</div>
                      </div>
                      <div className="p-2 rounded bg-surface-hover text-center">
                        <div className="text-[10px] text-text-muted">Specificity</div>
                        <div className="font-bold text-text-primary">82/100</div>
                      </div>
                    </div>
                    <div className="text-text-secondary leading-relaxed">
                      <strong className="text-status-success">Strength:</strong> Excellent use of objective benchmarks rather than emotional argumentation.
                    </div>
                    <div className="text-text-secondary leading-relaxed">
                      <strong className="text-terracotta">Area to Improve:</strong> Quantify the final impact on team sprint velocity over the subsequent quarter.
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-text-secondary">
                    Click "View Full Rubric Breakdown" to inspect the multidimensional scoring and coaching critique.
                  </p>
                )}
              </div>
            </div>
          )}

          {activePreviewTab === 'tracker' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-surface-border gap-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Opportunity Pipeline</h3>
                  <p className="text-xs text-text-secondary">Kanban & Table management across 6 workflow stages</p>
                </div>
                <button
                  onClick={() => {
                    setMainView('app');
                    setAppSubpage('applications');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand text-white hover:bg-brand-hover"
                >
                  <span>Open Full Tracker</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Kanban Column Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-surface-hover/70 border border-surface-border space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                    <span>In Review</span>
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px]">2</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-surface-border shadow-soft text-xs space-y-1">
                    <div className="font-semibold text-text-primary">Shopify</div>
                    <div className="text-text-secondary text-[11px]">Senior Frontend Developer</div>
                    <div className="text-[10px] text-text-muted">Applied Nov 09 · Remote</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-surface-border shadow-soft text-xs space-y-1">
                    <div className="font-semibold text-text-primary">Notion</div>
                    <div className="text-text-secondary text-[11px]">Core Workspace Engineer</div>
                    <div className="text-[10px] text-text-muted">Applied Nov 10</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-soft/40 border border-brand/20 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-brand">
                    <span>Interview Scheduled</span>
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px]">3</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-surface-border shadow-soft text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-text-primary">Stripe</span>
                      <span className="text-[10px] font-bold text-status-success">Nov 19</span>
                    </div>
                    <div className="text-text-secondary text-[11px]">Senior Frontend Engineer</div>
                    <div className="text-[10px] text-brand font-medium">Architecture Round</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-surface-border shadow-soft text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-text-primary">Linear</span>
                      <span className="text-[10px] font-bold text-status-success">Nov 21</span>
                    </div>
                    <div className="text-text-secondary text-[11px]">Product Engineer</div>
                    <div className="text-[10px] text-brand font-medium">Pair Programming</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-status-success-soft/40 border border-status-success/20 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-status-success">
                    <span>Offer Extended</span>
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px]">1</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-surface-border shadow-soft text-xs space-y-1">
                    <div className="font-semibold text-text-primary">HubSpot</div>
                    <div className="text-text-secondary text-[11px]">Staff Frontend Engineer</div>
                    <div className="text-[10px] font-semibold text-status-success">$185k base + $65k RSUs</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePreviewTab === 'planner' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-surface-border gap-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Monday through Sunday Schedule</h3>
                  <p className="text-xs text-text-secondary">AI-generated career tasks adapted to your interview dates</p>
                </div>
                <button
                  onClick={() => {
                    setMainView('app');
                    setAppSubpage('weekly-plan');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand text-white hover:bg-brand-hover"
                >
                  <span>Open Interactive Planner</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <div className="text-xs font-bold text-text-muted mb-2">Monday</div>
                  <div className="p-2 rounded bg-white text-xs space-y-1 border border-surface-border">
                    <span className="line-through text-text-muted">Research 5 target firms</span>
                    <span className="block text-[10px] text-status-success font-medium">Completed</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <div className="text-xs font-bold text-text-muted mb-2">Tuesday</div>
                  <div className="p-2 rounded bg-white text-xs space-y-1 border border-surface-border">
                    <span className="line-through text-text-muted">Submit 2 applications</span>
                    <span className="block text-[10px] text-status-success font-medium">Completed</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sand/30 border border-sand">
                  <div className="text-xs font-bold text-terracotta mb-2">Thursday</div>
                  <div className="p-2 rounded bg-white text-xs space-y-1 border border-surface-border shadow-soft">
                    <span className="font-semibold text-text-primary">Stripe Architecture Prep</span>
                    <span className="block text-[10px] font-bold text-terracotta">2:00 PM Round</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <div className="text-xs font-bold text-text-muted mb-2">Friday</div>
                  <div className="p-2 rounded bg-white text-xs space-y-1 border border-surface-border">
                    <span className="text-text-primary font-medium">Follow up with recruiters</span>
                    <span className="block text-[10px] text-brand font-medium">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. SECTION: AI INTERVIEW PRACTICE SPOTLIGHT */}
      <section id="interview-practice" className="py-24 bg-background-soft border-t border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">Interview Mastery</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                Walk into your next interview prepared.
              </h2>
              <p className="text-base text-text-secondary font-secondary leading-relaxed">
                Generic practice doesn't teach you what hiring committees actually look for. Our AI breaks down your responses with the same rigor used by engineering managers and calibrated interviewers.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-soft text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">STAR Method Calibration</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Ensures Situation, Task, Action, and Result are balanced within crisp 2-minute limits.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-soft text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Constructive Weak-Spot Identification</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Flags missing metrics, uncredited teamwork, and vague trade-off explanations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-soft text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Instant High-Caliber Sample Answers</h4>
                    <p className="text-xs text-text-secondary mt-0.5">See how a staff-level candidate would structure the same response.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMainView('app');
                    setAppSubpage('interview');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-medium text-sm hover:bg-brand-hover shadow-soft transition-all"
                >
                  <span>Practice an Interview Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Spotlight Interactive Card */}
            <div className="lg:col-span-6 p-6 sm:p-7 rounded-card-lg bg-white border border-surface-border shadow-soft-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-terracotta" />
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wide">AI Rubric Evaluation</span>
                </div>
                <span className="text-xs font-bold text-status-success bg-status-success-soft px-2.5 py-0.5 rounded-full">
                  Overall Score: 84/100
                </span>
              </div>

              <div className="text-xs space-y-2">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Question:</span>
                <p className="font-semibold text-text-primary">
                  "Tell me about a challenging technical problem you solved and how you approached it."
                </p>
              </div>

              {/* Rubric Meters */}
              <div className="space-y-2 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-medium">
                    <span className="text-text-secondary">Communication</span>
                    <span className="font-bold text-text-primary">88%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-medium">
                    <span className="text-text-secondary">Structure (STAR)</span>
                    <span className="font-bold text-text-primary">84%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-medium">
                    <span className="text-text-secondary">Specificity & Metrics</span>
                    <span className="font-bold text-text-primary">82%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                    <div className="h-full bg-terracotta rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>

              {/* Feedback Points */}
              <div className="p-3.5 rounded-xl bg-surface-hover/70 text-xs space-y-2">
                <div>
                  <span className="font-bold text-status-success block mb-0.5">What you did well:</span>
                  <p className="text-text-secondary">Clear explanation of the core problem, good technical reasoning, and relevant example.</p>
                </div>
                <div>
                  <span className="font-bold text-terracotta block mb-0.5">Areas to improve:</span>
                  <p className="text-text-secondary">Explain measurable outcomes and provide more context about your personal contribution.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SECTION: TESTIMONIALS */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Candidate Experiences</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 tracking-tight">
            Designed for thoughtful career transitions.
          </h2>
          <p className="text-xs text-text-muted mt-2">
            Illustrative demonstration profiles representing common user workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft flex flex-col justify-between">
            <p className="text-sm text-text-secondary font-secondary italic leading-relaxed mb-6">
              "Instead of drowning in 40 open browser tabs, the weekly plan gave me 2 high-impact tasks a day. I practiced system design trade-offs with the AI Coach and landed a senior role at a fintech company."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
              <div className="w-10 h-10 rounded-full bg-brand-soft text-brand font-bold flex items-center justify-center text-sm">
                DL
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">David Lin</h4>
                <p className="text-xs text-text-secondary">Senior Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft flex flex-col justify-between">
            <p className="text-sm text-text-secondary font-secondary italic leading-relaxed mb-6">
              "The STAR rubric evaluation completely changed how I answer behavioral questions. It immediately pointed out where my answers were too theoretical and pushed me to quantify the business outcome."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
              <div className="w-10 h-10 rounded-full bg-sand text-terracotta font-bold flex items-center justify-center text-sm">
                MK
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Maya Kapoor</h4>
                <p className="text-xs text-text-secondary">Lead Product Designer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-7 rounded-card bg-white border border-surface-border shadow-soft flex flex-col justify-between">
            <p className="text-sm text-text-secondary font-secondary italic leading-relaxed mb-6">
              "Having the Kanban tracker synchronized with interview dates and follow-up reminders kept me completely calm during a transition when I was balancing four active final rounds."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
              <div className="w-10 h-10 rounded-full bg-softblue text-text-primary font-bold flex items-center justify-center text-sm">
                JW
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Jordan Wright</h4>
                <p className="text-xs text-text-secondary">Product Operations Lead</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: PRICING */}
      <section id="pricing" className="py-24 bg-background-soft border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand uppercase tracking-wider">Transparent Membership</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2 tracking-tight">
              Invest in your next career leap.
            </h2>
            <p className="text-sm text-text-secondary mt-2">
              Illustrative demonstration pricing. Free trial available for all features.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-xl bg-white border border-surface-border">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  billingPeriod === 'monthly' ? 'bg-brand text-white shadow-soft' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingPeriod === 'yearly' ? 'bg-brand text-white shadow-soft' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-sand text-brand px-1.5 py-0.5 rounded-full font-bold">Save 25%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Free Plan */}
            <div className="p-8 rounded-card-lg bg-white border border-surface-border shadow-soft flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-text-muted uppercase tracking-wider">Free Starter</div>
                <div className="text-4xl font-extrabold text-text-primary mt-3">$0</div>
                <p className="text-xs text-text-secondary mt-1">Free forever, no credit card required.</p>

                <div className="space-y-3.5 mt-8 text-xs text-text-primary">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                    <span>Basic career profile setup</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                    <span>Up to 10 job applications tracked</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                    <span>Basic weekly action planning</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                    <span>1 mock interview session per month</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onStartOnboarding}
                className="mt-8 w-full py-3 rounded-xl border border-surface-border font-semibold text-sm text-text-primary hover:bg-surface-hover transition-colors"
              >
                Start Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="p-8 rounded-card-lg bg-white border-2 border-brand shadow-soft-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand text-white">
                  Most Popular
                </span>
              </div>

              <div>
                <div className="text-sm font-bold text-brand uppercase tracking-wider">Premium Career Pro</div>
                <div className="text-4xl font-extrabold text-text-primary mt-3">
                  {billingPeriod === 'monthly' ? '$24' : '$18'}
                  <span className="text-sm font-normal text-text-secondary">/month</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {billingPeriod === 'yearly' ? 'Billed annually ($216/yr)' : 'Billed monthly, cancel anytime'}
                </p>

                <div className="space-y-3.5 mt-8 text-xs text-text-primary">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span className="font-semibold">Unlimited job application tracking</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span className="font-semibold">Unlimited AI interview practice & rubric scoring</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Personalized weekly plan dynamic generation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Multi-round STAR feedback & sample answers</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Detailed historical readiness trends (90 days)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onStartOnboarding}
                className="mt-8 w-full py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-hover shadow-soft transition-colors"
              >
                Start 14-Day Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION: FAQ ACCORDION */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-3xl font-bold text-text-primary mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-surface-border bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-text-primary hover:text-brand transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-text-secondary font-secondary leading-relaxed border-t border-surface-border/50 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-20 bg-brand text-white text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-soft">Ready for Clarity?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Your next opportunity deserves your best preparation.
          </h2>
          <p className="text-base text-brand-soft/90 max-w-xl mx-auto font-secondary">
            Start building a more organized, confident approach to your job search today.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onStartOnboarding}
              className="px-8 py-4 rounded-xl bg-white text-brand font-bold text-sm shadow-soft-lg hover:bg-sand-light transition-all hover:scale-105"
            >
              Create My Career Plan
            </button>
            <button
              onClick={() => {
                setMainView('app');
                setAppSubpage('dashboard');
              }}
              className="px-6 py-4 rounded-xl bg-brand-hover text-white font-medium text-sm border border-white/20 hover:bg-white/10 transition-colors"
            >
              Explore Demo Workspace
            </button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER / CONTACT SECTION */}
      <footer id="contact" className="py-16 bg-[#1F2429] text-white/80 border-t border-white/10 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight">Career Planning</span>
            </div>
            <p className="text-white/60 leading-relaxed font-secondary">
              An intelligent career management ecosystem combining AI-powered interview practice, job tracking, and structured weekly guidance.
            </p>
            <p className="text-white/40 text-[11px]">
              "Your career deserves a plan, not another open browser tab."
            </p>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Product</h4>
              <ul className="space-y-2 text-white/60">
                <li><button onClick={() => { setMainView('app'); setAppSubpage('dashboard'); }} className="hover:text-white transition-colors">Career Dashboard</button></li>
                <li><button onClick={() => { setMainView('app'); setAppSubpage('coach'); }} className="hover:text-white transition-colors">AI Career Coach</button></li>
                <li><button onClick={() => { setMainView('app'); setAppSubpage('interview'); }} className="hover:text-white transition-colors">Interview Studio</button></li>
                <li><button onClick={() => { setMainView('app'); setAppSubpage('applications'); }} className="hover:text-white transition-colors">Job Tracker</button></li>
                <li><button onClick={() => { setMainView('app'); setAppSubpage('weekly-plan'); }} className="hover:text-white transition-colors">Weekly Planner</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Company & Admin</h4>
              <ul className="space-y-2 text-white/60">
                <li><button onClick={() => { setMainView('admin'); setAdminSubpage('overview'); }} className="hover:text-white transition-colors">Admin Console</button></li>
                <li><button onClick={() => { setMainView('admin'); setAdminSubpage('prompts'); }} className="hover:text-white transition-colors">AI Prompt Manager</button></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Membership Pricing</a></li>
                <li><span className="text-white/40">Privacy Policy (Demo)</span></li>
                <li><span className="text-white/40">Terms of Service</span></li>
              </ul>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-4 bg-white/5 p-5 rounded-xl border border-white/10 space-y-3">
            <h4 className="font-bold text-white text-sm">Have questions about your career journey?</h4>
            <p className="text-white/60 text-[11px] font-secondary">
              Send our advisory team a note. We reply within one business day.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-2.5">
              <input
                type="text"
                placeholder="Your Full Name"
                value={contactForm.name}
                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-brand"
              />
              <input
                type="email"
                placeholder="Work Email"
                value={contactForm.email}
                onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-brand"
              />
              <textarea
                placeholder="How can we assist your job search?"
                rows={2}
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-brand resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-brand text-white font-semibold text-xs hover:bg-brand-hover transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Send Message</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white/40 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} Career Planning Platform. Interactive Demonstration Prototype.</p>
          <p>Local browser mock state · No live external billing or API dependencies</p>
        </div>
      </footer>

    </div>
  );
};

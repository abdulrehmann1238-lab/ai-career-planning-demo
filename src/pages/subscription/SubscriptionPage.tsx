import React, { useState } from 'react';
import { 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SubscriptionPage: React.FC = () => {
  const { userProfile, updateUserProfile, addToast } = useApp();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const isPremium = userProfile.planTier === 'premium';

  const handleTogglePlan = (targetTier: 'free' | 'premium') => {
    updateUserProfile({
      planTier: targetTier,
      subscriptionStatus: 'active',
      renewalDate: targetTier === 'premium' ? 'Dec 18, 2026' : undefined
    });
    setIsUpgradeModalOpen(false);
    addToast('success', 'Subscription Updated', `Your plan is now ${targetTier.toUpperCase()}. (Simulated demo change)`);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. CURRENT SUBSCRIPTION STATUS CARD */}
      <div className="p-7 rounded-card-lg bg-white border border-surface-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
              isPremium ? 'bg-brand text-white' : 'bg-surface-hover text-text-secondary'
            }`}>
              {isPremium ? 'Premium Career Pro' : 'Free Starter Tier'}
            </span>
            <span className="text-xs font-medium text-status-success">
              Status: {userProfile.subscriptionStatus || 'Active'}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            {isPremium ? 'Full Career Intelligence Active' : 'Basic Membership Active'}
          </h2>

          <p className="text-xs text-text-secondary font-secondary leading-relaxed max-w-xl">
            {isPremium 
              ? `Your membership auto-renews on ${userProfile.renewalDate || 'Nov 28, 2026'}. You have unrestricted access to unlimited mock interviews, customized weekly planning, and STAR feedback.`
              : 'Upgrade to Premium to unlock unlimited interview practice rounds, advanced multidimensional rubric evaluations, and dynamic weekly roadmap generation.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft transition-all flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            <span>{isPremium ? 'Manage Membership' : 'Upgrade to Premium'}</span>
          </button>
        </div>
      </div>

      {/* 2. PLAN COMPARISON MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Free Plan Card */}
        <div className={`p-8 rounded-card-lg bg-white border transition-all flex flex-col justify-between ${
          !isPremium ? 'border-2 border-brand shadow-soft-md' : 'border-surface-border shadow-soft'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Free Starter</span>
              {!isPremium && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-hover text-text-primary">
                  Current Tier
                </span>
              )}
            </div>

            <div className="text-4xl font-extrabold text-text-primary mt-3">$0</div>
            <p className="text-xs text-text-secondary mt-1">Free forever for exploring job searches.</p>

            <div className="space-y-3.5 mt-8 text-xs text-text-primary">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0" />
                <span>Basic Career Profile & Goals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0" />
                <span>Job Tracker (Up to 10 opportunities)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0" />
                <span>Manual Weekly Task Planning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-status-success shrink-0" />
                <span>1 Mock Interview Session per month</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <X className="w-4 h-4 text-text-muted shrink-0" />
                <span>No automated weekly plan generation</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-muted">
                <X className="w-4 h-4 text-text-muted shrink-0" />
                <span>Limited 7-day progress history only</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleTogglePlan('free')}
            disabled={!isPremium}
            className={`mt-8 w-full py-3 rounded-xl text-xs font-bold transition-colors ${
              !isPremium 
                ? 'bg-surface-hover text-text-muted cursor-default'
                : 'border border-surface-border hover:bg-surface-hover text-text-primary'
            }`}
          >
            {!isPremium ? 'Currently Active' : 'Switch to Free Tier'}
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className={`p-8 rounded-card-lg bg-white border transition-all flex flex-col justify-between relative overflow-hidden ${
          isPremium ? 'border-2 border-brand shadow-soft-lg' : 'border-surface-border shadow-soft'
        }`}>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand text-white">
              {isPremium ? 'Current Plan' : 'Recommended'}
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">Premium Career Pro</div>
            <div className="text-4xl font-extrabold text-text-primary mt-3">
              $24
              <span className="text-sm font-normal text-text-secondary">/month</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">Unlimited career intelligence & practice tools.</p>

            <div className="space-y-3.5 mt-8 text-xs text-text-primary">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" />
                <span className="font-semibold">Unlimited Job Applications Tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" />
                <span className="font-semibold">Unlimited AI Mock Interviews & Rubrics</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" />
                <span className="font-semibold">Dynamic Weekly Plan Synthesis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" />
                <span>Multi-round STAR Rubric Breakdown</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" />
                <span>Historical 90-Day Trend Insights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" />
                <span>Unlimited Saved Conversations & Notes</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleTogglePlan('premium')}
            disabled={isPremium}
            className={`mt-8 w-full py-3 rounded-xl text-xs font-bold transition-all shadow-soft ${
              isPremium
                ? 'bg-brand text-white cursor-default'
                : 'bg-brand text-white hover:bg-brand-hover'
            }`}
          >
            {isPremium ? 'Currently Active' : 'Upgrade to Premium ($24/mo)'}
          </button>
        </div>

      </div>

      {/* 3. SIMULATED BILLING MODAL */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 sm:p-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-4">
              <h3 className="text-base font-bold text-text-primary">Manage Subscription Tier</h3>
              <button onClick={() => setIsUpgradeModalOpen(false)} className="p-1 rounded text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-sand/30 border border-sand text-xs text-text-primary space-y-1 mb-5">
              <span className="font-bold block">Prototype Demonstration Notice</span>
              <p className="text-[11px] text-text-secondary leading-snug">
                This is a local simulation. No real Stripe transactions or payment details are collected. Switching tiers updates local state instantly.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleTogglePlan('premium')}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isPremium ? 'bg-brand-soft border-brand' : 'hover:bg-surface-hover border-surface-border'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-text-primary">Premium Career Pro ($24/mo)</div>
                  <div className="text-[11px] text-text-secondary">Unlimited AI interviews, weekly roadmaps & rubrics</div>
                </div>
                {isPremium && <Check className="w-4 h-4 text-brand" />}
              </button>

              <button
                onClick={() => handleTogglePlan('free')}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                  !isPremium ? 'bg-brand-soft border-brand' : 'hover:bg-surface-hover border-surface-border'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-text-primary">Free Starter ($0/mo)</div>
                  <div className="text-[11px] text-text-secondary">Basic tracking and limited interview practice</div>
                </div>
                {!isPremium && <Check className="w-4 h-4 text-brand" />}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border text-right">
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-text-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

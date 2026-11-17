import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldCheck, UserCheck, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const { loginDemoUser, addToast, updateUserProfile } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  // Password strength calculator
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strength = calculateStrength(password);
  const strengthLabels = ['Too weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-status-danger', 'bg-status-warning', 'bg-brand', 'bg-status-success'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!email.trim()) {
        addToast('warning', 'Missing Email', 'Please enter your email address.');
        return;
      }
      addToast('success', 'Reset Link Sent', `Simulated reset instructions dispatched to ${email}`);
      setMode('signin');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim() || !email.trim() || !password.trim()) {
        addToast('warning', 'Missing Fields', 'Please complete all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        addToast('danger', 'Password Mismatch', 'Passwords do not match.');
        return;
      }
      if (!termsAccepted) {
        addToast('warning', 'Terms Required', 'Please accept the terms of service to proceed.');
        return;
      }

      // Create new user profile in context
      updateUserProfile({
        name: fullName,
        email: email,
        avatar: fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      });
      addToast('success', 'Account Created', `Welcome to Career Planning, ${fullName}!`);
      loginDemoUser();
      onClose();
      return;
    }

    // Sign in mode
    if (!email.trim() || !password.trim()) {
      addToast('warning', 'Missing Credentials', 'Please enter your email and password.');
      return;
    }

    addToast('success', 'Welcome Back', `Signed in successfully as ${email}`);
    loginDemoUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Get Started'}
            {mode === 'forgot' && 'Reset Password'}
          </span>
          <h2 className="text-2xl font-bold text-text-primary mt-1">
            {mode === 'signin' && 'Sign in to your plan'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Recover your account'}
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            {mode === 'signin' && 'Access your active career applications and interview prep.'}
            {mode === 'signup' && 'Join ambitious professionals building deliberate career paths.'}
            {mode === 'forgot' && 'Enter your email to receive a password reset link.'}
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-brand-soft/60 border border-brand/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-brand shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-text-primary block">Instant Demo Access</span>
              <span className="text-text-secondary">Explore with Alex Morgan’s populated pipeline</span>
            </div>
          </div>
          <button
            onClick={() => {
              loginDemoUser();
              onClose();
            }}
            className="px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft shrink-0"
          >
            1-Click Demo
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-surface-border" />
          <span className="absolute bg-white px-3 text-[11px] font-medium text-text-muted">or continue with form</span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Alex Morgan"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Email Address</label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-text-primary">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-brand hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicator for signup */}
              {mode === 'signup' && password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full ${
                          i <= strength - 1 ? strengthColors[strength - 1] : 'bg-surface-hover'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Password Strength:</span>
                    <span className="font-semibold text-text-primary">
                      {strength > 0 ? strengthLabels[strength - 1] : 'Too short'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand"
              />
            </div>
          )}

          {mode === 'signin' && (
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-brand focus:ring-brand border-surface-border"
              />
              <label htmlFor="rememberMe" className="ml-2 text-xs text-text-secondary select-none">
                Remember me on this browser
              </label>
            </div>
          )}

          {mode === 'signup' && (
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 rounded text-brand focus:ring-brand border-surface-border mt-0.5"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-text-secondary select-none leading-tight">
                I agree to the demonstration terms of service & mock data privacy policy.
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-hover shadow-soft transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {mode === 'signin' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Link'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer switcher */}
        <div className="mt-6 pt-4 border-t border-surface-border text-center text-xs text-text-secondary">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-brand hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="font-bold text-brand hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

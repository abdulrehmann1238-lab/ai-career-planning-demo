import React, { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface InitialLoadingScreenProps {
  onComplete: () => void;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const steps = [
    'Preparing your workspace...',
    'Organizing your career goals...',
    'Getting your plan ready...'
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const finishTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 400);
    }, 1900);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F7F4] text-text-primary px-6 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background subtle ambient shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-soft/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sand/60 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Brand Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-white border border-surface-border shadow-soft flex items-center justify-center text-brand">
            <Compass className="w-8 h-8 animate-pulse text-brand" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-soft border-2 border-[#F8F7F4] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-bold tracking-tight text-text-primary font-sans">
          Career Planning
        </h1>
        <p className="text-sm text-text-secondary mt-1 font-secondary">
          Clarity for your next career move.
        </p>

        {/* Animated circular loader & progress sequence */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative w-8 h-8 mb-3">
            <div className="w-8 h-8 rounded-full border-2 border-surface-border border-t-brand animate-spin" />
          </div>

          <div className="h-6 flex items-center justify-center">
            <p className="text-xs font-medium text-brand transition-all duration-300">
              {steps[stepIndex]}
            </p>
          </div>
        </div>

        {/* Quick Skip button so it never blocks user testing */}
        <button
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 200);
          }}
          className="mt-8 text-xs text-text-muted hover:text-text-secondary underline underline-offset-4 transition-colors"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
};

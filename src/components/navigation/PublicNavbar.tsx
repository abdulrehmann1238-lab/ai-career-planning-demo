import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, LayoutDashboard, Shield, Menu, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PublicNavbarProps {
  onSignInClick: () => void;
  onGetStartedClick: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onSignInClick, onGetStartedClick }) => {
  const { setMainView, setAppSubpage, setAdminSubpage } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-surface-border shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Product Name */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-soft group-hover:bg-brand-hover transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-text-primary tracking-tight font-sans">
                Career Planning
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-medium text-brand bg-brand-soft px-2 py-0.5 rounded-full">
                AI Platform
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-text-primary transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-text-primary transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('interactive-preview')}
              className="hover:text-text-primary transition-colors"
            >
              Interactive Preview
            </button>
            <button
              onClick={() => scrollToSection('interview-practice')}
              className="hover:text-text-primary transition-colors"
            >
              Interview Practice
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="hover:text-text-primary transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Demo Switchers for Client Review */}
            <button
              onClick={() => {
                setMainView('app');
                setAppSubpage('dashboard');
              }}
              title="Jump directly to User Application"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary bg-surface-hover hover:text-text-primary hover:bg-sand/60 transition-colors border border-surface-border"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand" />
              <span>App Demo</span>
            </button>

            <button
              onClick={() => {
                setMainView('admin');
                setAdminSubpage('overview');
              }}
              title="Jump to SaaS Operations Console"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary bg-surface-hover hover:text-text-primary hover:bg-sand/60 transition-colors border border-surface-border"
            >
              <Shield className="w-3.5 h-3.5 text-terracotta" />
              <span>Admin Console</span>
            </button>

            <div className="h-4 w-px bg-surface-border mx-1" />

            <button
              onClick={onSignInClick}
              className="px-3.5 py-2 text-sm font-medium text-text-primary hover:text-brand transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={onGetStartedClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white font-medium text-sm hover:bg-brand-hover shadow-soft transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => {
                setMainView('app');
                setAppSubpage('dashboard');
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-soft text-brand"
            >
              App
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-primary hover:bg-surface-hover"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-surface-border px-4 py-5 space-y-4 shadow-soft-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 font-medium text-sm text-text-secondary">
            <button onClick={() => scrollToSection('how-it-works')} className="text-left py-1 hover:text-text-primary">How It Works</button>
            <button onClick={() => scrollToSection('features')} className="text-left py-1 hover:text-text-primary">Features</button>
            <button onClick={() => scrollToSection('interactive-preview')} className="text-left py-1 hover:text-text-primary">Interactive Preview</button>
            <button onClick={() => scrollToSection('interview-practice')} className="text-left py-1 hover:text-text-primary">Interview Practice</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left py-1 hover:text-text-primary">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-1 hover:text-text-primary">Contact</button>
          </div>
          <div className="pt-4 border-t border-surface-border flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSignInClick();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-surface-border text-text-primary"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStartedClick();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-brand text-white shadow-soft"
            >
              Build My Career Plan
            </button>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMainView('app');
                }}
                className="py-2 text-xs font-semibold text-center rounded-lg bg-surface-hover text-text-secondary"
              >
                Open User App
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMainView('admin');
                }}
                className="py-2 text-xs font-semibold text-center rounded-lg bg-surface-hover text-text-secondary"
              >
                Admin Console
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

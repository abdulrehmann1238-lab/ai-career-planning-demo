import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Briefcase, 
  Target, 
  Compass, 
  Building2, 
  DollarSign, 
  MapPin, 
  Award,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProfessionalStatus, ExperienceLevel, WorkArrangement } from '../../types';

export const MultiStepOnboarding: React.FC = () => {
  const { userProfile, completeOnboarding, setIsOnboardingOpen } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form states initialized from userProfile
  const [fullName, setFullName] = useState(userProfile.name || 'Alex Morgan');
  const [professionalStatus, setProfessionalStatus] = useState<ProfessionalStatus>(userProfile.professionalStatus || 'Employed');
  const [careerGoals, setCareerGoals] = useState<string[]>(userProfile.careerGoals || ['Finding a better job', 'Preparing for interviews']);
  const [targetRoles, setTargetRoles] = useState<string[]>(userProfile.targetRoles || ['Senior Software Engineer']);
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(userProfile.experienceLevel || '3–5 years');
  const [preferredIndustries, setPreferredIndustries] = useState<string[]>(userProfile.preferredIndustries || ['Technology']);
  const [workArrangement, setWorkArrangement] = useState<WorkArrangement>(userProfile.workArrangement || 'Remote');
  const [preferredLocation, setPreferredLocation] = useState(userProfile.preferredLocation || 'San Francisco, CA / Remote');
  const [expectedSalaryRange, setExpectedSalaryRange] = useState(userProfile.expectedSalaryRange || '$165,000 – $195,000');
  const [careerChallenges, setCareerChallenges] = useState<string[]>(userProfile.careerChallenges || ['System design interviews']);

  // Processing state during generation
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingPhase, setProcessingPhase] = useState(0);

  const processingMessages = [
    'Understanding your career goals...',
    'Identifying your next high-impact opportunities...',
    'Synthesizing interview preparation rubrics...',
    'Preparing your personalized 7-day roadmap...'
  ];

  const toggleArrayItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      if (list.length > 1) {
        setter(list.filter(i => i !== item));
      }
    } else {
      setter([...list, item]);
    }
  };

  const handleAddCustomRole = () => {
    if (customRoleInput.trim() && !targetRoles.includes(customRoleInput.trim())) {
      setTargetRoles([...targetRoles, customRoleInput.trim()]);
      setCustomRoleInput('');
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalGenerate = async () => {
    setIsProcessing(true);

    // Staged processing animation steps
    for (let i = 0; i < processingMessages.length; i++) {
      setProcessingPhase(i);
      await new Promise(r => setTimeout(r, 650));
    }

    await completeOnboarding({
      name: fullName,
      professionalStatus,
      careerGoals,
      targetRoles,
      experienceLevel,
      preferredIndustries,
      workArrangement,
      preferredLocation,
      expectedSalaryRange,
      careerChallenges
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background selection:bg-brand-soft overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 sm:p-10 my-8">
        
        {/* Top Header & Step Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-3">
            <span className="text-brand uppercase tracking-wider font-bold">Personalized Onboarding</span>
            <span>Step {currentStep} of {totalSteps}</span>
          </div>

          <div className="w-full h-2 rounded-full bg-surface-hover overflow-hidden">
            <div 
              className="h-full bg-brand rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* PROCESSING SCREEN */}
        {isProcessing ? (
          <div className="py-16 text-center space-y-6 animate-in fade-in">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-brand-soft border border-brand/20 flex items-center justify-center text-brand">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Generating Your Career Plan</h3>
              <p className="text-sm font-medium text-brand animate-pulse">
                {processingMessages[processingPhase]}
              </p>
            </div>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              Synthesizing custom Monday–Sunday schedule aligned with {targetRoles[0] || 'your target role'} and salary band.
            </p>
          </div>
        ) : (
          <div>
            {/* STEP 1: Professional Profile */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Tell us about your professional background</h2>
                  <p className="text-xs text-text-secondary mt-1">This helps tailor your roadmap to your current career momentum.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">What is your full name?</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl border border-surface-border text-sm focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-2">What is your current professional status?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(['Student', 'Employed', 'Recently unemployed', 'Career changer', 'Freelancer', 'Returning to work'] as ProfessionalStatus[]).map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setProfessionalStatus(status)}
                          className={`p-3.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                            professionalStatus === status
                              ? 'bg-brand-soft border-brand text-brand shadow-soft'
                              : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                          }`}
                        >
                          <span>{status}</span>
                          {professionalStatus === status && <Check className="w-4 h-4 text-brand" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Career Goals */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">What are you working toward?</h2>
                  <p className="text-xs text-text-secondary mt-1">Select all goals that apply to your current search cycle.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Finding my first job',
                    'Finding a better job',
                    'Changing careers',
                    'Getting promoted',
                    'Preparing for interviews',
                    'Exploring new opportunities'
                  ].map(goal => {
                    const isSelected = careerGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleArrayItem(careerGoals, goal, setCareerGoals)}
                        className={`p-4 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-brand-soft border-brand text-brand shadow-soft'
                            : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-brand" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Target Roles */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">What roles are you targeting?</h2>
                  <p className="text-xs text-text-secondary mt-1">Select standard positions or add your exact custom title.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    'Software Engineer',
                    'Senior Software Engineer',
                    'Product Manager',
                    'UX Designer',
                    'Data Analyst',
                    'Marketing Manager',
                    'Business Analyst',
                    'Cybersecurity Analyst'
                  ].map(role => {
                    const isSelected = targetRoles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleArrayItem(targetRoles, role, setTargetRoles)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-brand text-white border-brand shadow-soft'
                            : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        <span>{role}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Role */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1">Add a custom role:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Staff Platform Architect"
                      value={customRoleInput}
                      onChange={e => setCustomRoleInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomRole(); } }}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomRole}
                      className="px-4 py-2 rounded-xl bg-surface-hover border border-surface-border text-xs font-bold text-text-primary hover:bg-brand-soft hover:text-brand"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Currently selected roles tags */}
                <div className="p-3 rounded-xl bg-surface-hover/70 border border-surface-border">
                  <span className="text-[10px] font-bold uppercase text-text-muted tracking-wider block mb-1.5">Selected Target Roles:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {targetRoles.map(r => (
                      <span key={r} className="px-2.5 py-1 rounded-lg bg-white border border-surface-border text-xs font-semibold text-text-primary">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Experience Level */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">What is your experience level?</h2>
                  <p className="text-xs text-text-secondary mt-1">This sets the calibration standard for interview question difficulty.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['No professional experience', 'Entry level', '1–3 years', '3–5 years', '5–10 years', '10+ years'] as ExperienceLevel[]).map(exp => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setExperienceLevel(exp)}
                      className={`p-4 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                        experienceLevel === exp
                          ? 'bg-brand-soft border-brand text-brand shadow-soft'
                          : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <span>{exp}</span>
                      {experienceLevel === exp && <Check className="w-4 h-4 text-brand" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Preferred Industries */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Preferred Industries</h2>
                  <p className="text-xs text-text-secondary mt-1">Select the sectors where you are actively submitting applications.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Consulting', 'E-commerce', 'Other'].map(ind => {
                    const isSelected = preferredIndustries.includes(ind);
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => toggleArrayItem(preferredIndustries, ind, setPreferredIndustries)}
                        className={`p-3.5 rounded-xl text-center text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-brand text-white border-brand shadow-soft'
                            : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        {ind}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: Career Preferences */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Work arrangement & salary range</h2>
                  <p className="text-xs text-text-secondary mt-1">Specify your logistics so your plan sets realistic application targets.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-text-primary mb-2">Preferred Work Arrangement</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Remote', 'Hybrid', 'On-site'] as WorkArrangement[]).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setWorkArrangement(mode)}
                          className={`py-3 rounded-xl font-semibold border text-center transition-all ${
                            workArrangement === mode
                              ? 'bg-brand text-white border-brand shadow-soft'
                              : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Target Location</label>
                    <input
                      type="text"
                      value={preferredLocation}
                      onChange={e => setPreferredLocation(e.target.value)}
                      placeholder="e.g. San Francisco, CA / Remote"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Expected Salary Range</label>
                    <input
                      type="text"
                      value={expectedSalaryRange}
                      onChange={e => setExpectedSalaryRange(e.target.value)}
                      placeholder="e.g. $165,000 – $195,000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Final Review */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">Everything Look Accurate?</span>
                  <h2 className="text-2xl font-bold text-text-primary mt-1">Your Career Profile Summary</h2>
                  <p className="text-xs text-text-secondary mt-1">Review your selections before our AI synthesizes your personalized plan.</p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-hover/80 border border-surface-border space-y-3.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-surface-border">
                    <span className="text-text-muted font-medium">Candidate Name:</span>
                    <span className="font-bold text-text-primary">{fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-border">
                    <span className="text-text-muted font-medium">Status & Experience:</span>
                    <span className="font-bold text-text-primary">{professionalStatus} · {experienceLevel}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-border">
                    <span className="text-text-muted font-medium">Target Roles:</span>
                    <span className="font-bold text-brand">{targetRoles.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-border">
                    <span className="text-text-muted font-medium">Preferred Industries:</span>
                    <span className="font-semibold text-text-primary">{preferredIndustries.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-border">
                    <span className="text-text-muted font-medium">Arrangement & Location:</span>
                    <span className="font-semibold text-text-primary">{workArrangement} ({preferredLocation})</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-text-muted font-medium">Target Salary Band:</span>
                    <span className="font-bold text-status-success">{expectedSalaryRange}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div className="mt-8 pt-5 border-t border-surface-border flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsOnboardingOpen(false)}
                  className="text-xs font-semibold text-text-muted hover:text-text-primary"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft transition-all"
              >
                <span>{currentStep === totalSteps ? 'Generate My Career Plan' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

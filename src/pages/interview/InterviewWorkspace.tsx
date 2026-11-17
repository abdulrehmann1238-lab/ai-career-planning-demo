import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Bookmark, 
  Clock, 
  ChevronRight, 
  Layers, 
  Play, 
  Check, 
  SkipForward, 
  StopCircle,
  TrendingUp,
  BarChart3,
  Calendar
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

import { useApp } from '../../context/AppContext';
import { InterviewType, InterviewDifficulty } from '../../types';

export const InterviewWorkspace: React.FC = () => {
  const { 
    userProfile, 
    interviewSessions, 
    activeSession, 
    startNewInterview, 
    submitInterviewAnswer, 
    finishInterviewSession, 
    saveFeedbackToItems,
    addToast 
  } = useApp();

  // Setup form states
  const [selectedType, setSelectedType] = useState<InterviewType>('Behavioral');
  const [selectedRole, setSelectedRole] = useState(userProfile.targetRoles[0] || 'Senior Software Engineer');
  const [selectedDifficulty, setSelectedDifficulty] = useState<InterviewDifficulty>('Intermediate');

  // Active answer input
  const [answerInput, setAnswerInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active session helper
  const currentQuestionIndex = activeSession?.completedQuestions ?? 0;
  const currentQuestion = activeSession?.questions[currentQuestionIndex];
  const lastEvaluatedQuestion = activeSession && currentQuestionIndex > 0 ? activeSession.questions[currentQuestionIndex - 1] : null;

  const handleStart = () => {
    startNewInterview(selectedType, selectedRole, selectedDifficulty);
    setAnswerInput('');
  };

  const handleSubmit = async () => {
    if (!answerInput.trim() || isSubmitting) {
      addToast('warning', 'Empty Answer', 'Please formulate a response before submitting for evaluation.');
      return;
    }
    setIsSubmitting(true);
    await submitInterviewAnswer(answerInput);
    setIsSubmitting(false);
    setAnswerInput('');
  };

  const handleSkip = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await submitInterviewAnswer('Skipped response. No answer submitted by candidate.');
    setIsSubmitting(false);
    setAnswerInput('');
    addToast('info', 'Question Skipped', 'Moved to next round question.');
  };

  // Historical readiness chart data
  const historyChartData = interviewSessions.map((sess, idx) => ({
    session: `Session ${idx + 1}`,
    score: sess.overallScore,
    type: sess.interviewType
  }));

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* If No Active Session: Show Interview Setup & Historical Results */}
      {!activeSession && (
        <div className="space-y-8">
          
          {/* Studio Hero Banner */}
          <div className="p-7 rounded-card-lg bg-white border border-surface-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">AI Practice Studio</span>
              <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                Simulated Hiring Committee Practice
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-secondary">
                Select your target round format. Receive multidimensional rubric evaluation (Communication, Relevance, Structure, Specificity) and calibrated STAR model answers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-4 rounded-xl bg-brand-soft/60 border border-brand/20 text-center">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Average Score</span>
                <div className="text-2xl font-bold text-brand mt-0.5">
                  {interviewSessions.length > 0 
                    ? Math.round(interviewSessions.reduce((acc, s) => acc + s.overallScore, 0) / interviewSessions.length)
                    : 84}/100
                </div>
              </div>
              <div className="p-4 rounded-xl bg-sand/40 border border-sand text-center">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Sessions</span>
                <div className="text-2xl font-bold text-terracotta mt-0.5">{interviewSessions.length}</div>
              </div>
            </div>
          </div>

          {/* Interactive Setup Form */}
          <div className="p-7 rounded-card-lg bg-white border border-surface-border shadow-soft space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
              <Sparkles className="w-4 h-4 text-brand" />
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Configure New Mock Session</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Option 1: Interview Type */}
              <div className="space-y-2">
                <label className="font-semibold text-text-primary block">1. Interview Format</label>
                {(['Behavioral', 'Technical', 'Situational', 'Leadership', 'General HR'] as InterviewType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`w-full p-3 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
                      selectedType === type
                        ? 'bg-brand text-white border-brand shadow-soft'
                        : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <span>{type}</span>
                    {selectedType === type && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>

              {/* Option 2: Target Role */}
              <div className="space-y-2">
                <label className="font-semibold text-text-primary block">2. Target Role</label>
                {[
                  'Senior Software Engineer',
                  'Staff Frontend Engineer',
                  'Product Manager',
                  'UI Platform Engineer',
                  'Data & Systems Analyst'
                ].map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`w-full p-3 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
                      selectedRole === role
                        ? 'bg-brand text-white border-brand shadow-soft'
                        : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <span className="truncate">{role}</span>
                    {selectedRole === role && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                ))}
              </div>

              {/* Option 3: Difficulty & Start */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <label className="font-semibold text-text-primary block mb-2">3. Difficulty Calibration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as InterviewDifficulty[]).map(diff => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`py-3 rounded-xl font-semibold border text-center transition-all ${
                          selectedDifficulty === diff
                            ? 'bg-brand text-white border-brand shadow-soft'
                            : 'bg-white border-surface-border text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-hover/70 border border-surface-border mt-4 space-y-1 text-text-secondary">
                    <span className="font-bold text-text-primary block">Session Overview</span>
                    <p>• 5 calibrated questions tailored to {selectedRole}</p>
                    <p>• Multi-dimensional scoring on each answer</p>
                    <p>• Actionable recommendations added to progress history</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full py-3.5 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-hover shadow-soft-md transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Mock Interview Session</span>
                </button>
              </div>

            </div>
          </div>

          {/* Practice History & Score Trends */}
          <div className="p-7 rounded-card-lg bg-white border border-surface-border shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div>
                <h3 className="text-base font-bold text-text-primary">Practice History & Readiness Trend</h3>
                <p className="text-xs text-text-secondary">Calibrated performance scores across past sessions</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-status-success-soft text-status-success">
                Consistent Improvement
              </span>
            </div>

            {/* Historical Score Chart */}
            {historyChartData.length > 0 && (
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyChartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#526B62" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#526B62" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="session" stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[60, 100]} stroke="#9A9D9F" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E9E7E1', fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#526B62" strokeWidth={2.5} fillOpacity={1} fill="url(#colorScore)" name="Score" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Past Session Cards */}
            <div className="divide-y divide-surface-border">
              {interviewSessions.map(session => (
                <div key={session.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary text-sm">{session.interviewType} Interview</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-soft text-brand">
                        {session.difficulty}
                      </span>
                      <span className="text-text-muted">· {session.date}</span>
                    </div>
                    <p className="text-text-secondary font-secondary">
                      Target Role: {session.targetRole} · {session.questions.length} questions evaluated
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-text-muted block font-medium">Final Rubric Score</span>
                      <span className="text-lg font-bold text-status-success">{session.overallScore}/100</span>
                    </div>
                    <button
                      onClick={() => {
                        const firstQ = session.questions[0];
                        if (firstQ?.evaluation) {
                          saveFeedbackToItems(`${session.interviewType} Practice Summary`, firstQ.evaluation.suggestedAnswer);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg border border-surface-border hover:bg-surface-hover text-text-secondary text-xs font-semibold flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Feedback</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ACTIVE INTERVIEW SESSION WORKSPACE */}
      {activeSession && (
        <div className="space-y-6">
          
          {/* Active Session Header & Progress */}
          <div className="p-5 rounded-card bg-white border border-surface-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-soft text-brand uppercase">
                  {activeSession.interviewType}
                </span>
                <span className="text-xs text-text-secondary font-medium">
                  {activeSession.targetRole} · {activeSession.difficulty}
                </span>
              </div>
              <h2 className="text-xl font-bold text-text-primary mt-1">
                Question {currentQuestion?.questionNumber || activeSession.completedQuestions} of {activeSession.totalQuestions}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-text-muted block">Current Score</span>
                <span className="text-base font-bold text-status-success">
                  {activeSession.overallScore > 0 ? `${activeSession.overallScore}/100` : 'Pending'}
                </span>
              </div>

              <button
                onClick={finishInterviewSession}
                className="px-3.5 py-2 rounded-xl border border-surface-border text-xs font-bold text-status-danger hover:bg-status-danger-soft transition-colors flex items-center gap-1.5"
              >
                <StopCircle className="w-4 h-4" />
                <span>Finish Session</span>
              </button>
            </div>
          </div>

          {/* Current Question & Answer Input (If not finished) */}
          {activeSession.status === 'in_progress' && currentQuestion && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Question & Answer Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
                  <div className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Question Prompt:
                  </div>
                  <h3 className="text-lg font-bold text-text-primary leading-snug">
                    "{currentQuestion.questionText}"
                  </h3>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-text-secondary mb-1.5">
                      <label>Your Structured Response (STAR):</label>
                      <span className="text-text-muted text-[11px] font-normal">
                        {answerInput.trim().split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={answerInput}
                      onChange={e => setAnswerInput(e.target.value)}
                      placeholder="Situation: Context of the challenge...\nTask: Your direct responsibility...\nAction: Key decisions, trade-offs, and technical implementation...\nResult: Measurable outcome (latency %, conversion, metrics)..."
                      className="w-full p-4 rounded-xl border border-surface-border text-xs text-text-primary placeholder-text-muted leading-relaxed focus:outline-none focus:border-brand resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handleSkip}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      <span>Skip Question</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !answerInput.trim()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft disabled:opacity-50 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>Evaluating Rubrics...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Answer</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Feedback or Previous Question Rubric (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {lastEvaluatedQuestion ? (
                  <div className="p-6 rounded-card bg-white border border-brand/30 shadow-soft space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand">
                        Feedback for Q{lastEvaluatedQuestion.questionNumber}
                      </span>
                      <span className="text-xs font-bold text-status-success bg-status-success-soft px-2.5 py-0.5 rounded-full">
                        Score: {lastEvaluatedQuestion.evaluation.overallScore}/100
                      </span>
                    </div>

                    {/* Rubric Breakdown Grid */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-surface-hover">
                        <div className="text-[10px] text-text-muted">Communication</div>
                        <div className="font-bold text-text-primary">{lastEvaluatedQuestion.evaluation.communicationScore}%</div>
                      </div>
                      <div className="p-2 rounded bg-surface-hover">
                        <div className="text-[10px] text-text-muted">Relevance</div>
                        <div className="font-bold text-text-primary">{lastEvaluatedQuestion.evaluation.relevanceScore}%</div>
                      </div>
                      <div className="p-2 rounded bg-surface-hover">
                        <div className="text-[10px] text-text-muted">Structure</div>
                        <div className="font-bold text-text-primary">{lastEvaluatedQuestion.evaluation.structureScore}%</div>
                      </div>
                      <div className="p-2 rounded bg-surface-hover">
                        <div className="text-[10px] text-text-muted">Specificity</div>
                        <div className="font-bold text-text-primary">{lastEvaluatedQuestion.evaluation.specificityScore}%</div>
                      </div>
                    </div>

                    <div className="text-xs space-y-2">
                      <div>
                        <span className="font-bold text-status-success block">What you did well:</span>
                        <ul className="list-disc pl-4 text-text-secondary text-[11px] space-y-0.5">
                          {lastEvaluatedQuestion.evaluation.strengths.map((str, i) => (
                            <li key={i}>{str}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-terracotta block">Areas to improve:</span>
                        <ul className="list-disc pl-4 text-text-secondary text-[11px] space-y-0.5">
                          {lastEvaluatedQuestion.evaluation.areasToImprove.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-surface-border">
                        <span className="font-bold text-brand block mb-1">Model STAR Answer:</span>
                        <p className="text-[11px] text-text-secondary bg-surface-hover/70 p-2.5 rounded-lg leading-relaxed italic">
                          "{lastEvaluatedQuestion.evaluation.suggestedAnswer}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => saveFeedbackToItems(`Feedback for Q${lastEvaluatedQuestion.questionNumber}`, lastEvaluatedQuestion.evaluation.suggestedAnswer)}
                      className="w-full py-2 rounded-lg bg-surface-hover hover:bg-brand-soft hover:text-brand text-xs font-semibold text-text-secondary transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Question Feedback</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-card bg-surface-hover/60 border border-surface-border text-center space-y-3">
                    <Award className="w-8 h-8 text-brand/40 mx-auto" />
                    <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                      Awaiting First Answer
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-secondary">
                      Type your answer on the left and submit. The AI evaluation rubric will analyze your communication clarity, STAR structure, and technical depth.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Session Finished Summary Screen */}
          {activeSession.status === 'completed' && (
            <div className="p-8 rounded-card-lg bg-white border border-surface-border shadow-soft-lg space-y-6 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-status-success-soft text-status-success flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-brand uppercase tracking-wider">Session Complete</span>
                <h3 className="text-2xl font-bold text-text-primary mt-1">Outstanding Practice Run!</h3>
                <p className="text-xs text-text-secondary mt-1 font-secondary">
                  You completed all 5 questions for {activeSession.targetRole} ({activeSession.interviewType}).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-hover/70 border border-surface-border max-w-sm mx-auto text-center">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Overall Session Score</span>
                <div className="text-4xl font-extrabold text-status-success mt-1">
                  {activeSession.overallScore}/100
                </div>
                <span className="text-xs text-brand font-semibold mt-1 block">Calibrated Hiring Readiness</span>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <button
                  onClick={finishInterviewSession}
                  className="px-6 py-3 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-soft transition-colors"
                >
                  Save Results to History
                </button>
                <button
                  onClick={() => {
                    finishInterviewSession();
                    startNewInterview('Technical', selectedRole, 'Advanced');
                  }}
                  className="px-5 py-3 rounded-xl border border-surface-border hover:bg-surface-hover font-semibold text-xs text-text-primary transition-colors"
                >
                  Start Another Round
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export type ProfessionalStatus = 
  | 'Student'
  | 'Employed'
  | 'Recently unemployed'
  | 'Career changer'
  | 'Freelancer'
  | 'Returning to work';

export type ExperienceLevel = 
  | 'No professional experience'
  | 'Entry level'
  | '1–3 years'
  | '3–5 years'
  | '5–10 years'
  | '10+ years';

export type WorkArrangement = 'Remote' | 'Hybrid' | 'On-site';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  professionalStatus: ProfessionalStatus;
  careerGoals: string[];
  targetRoles: string[];
  experienceLevel: ExperienceLevel;
  preferredIndustries: string[];
  workArrangement: WorkArrangement;
  preferredLocation: string;
  expectedSalaryRange: string;
  careerChallenges?: string[];
  onboardingCompleted: boolean;
  planTier: 'free' | 'premium';
  subscriptionStatus: 'active' | 'trialing' | 'cancelled';
  renewalDate?: string;
}

export type ApplicationStatus = 'Saved' | 'Applied' | 'In Review' | 'Interview' | 'Offer' | 'Rejected';

export interface ApplicationTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'status_change' | 'interview' | 'note' | 'follow_up';
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  jobUrl?: string;
  salaryRange?: string;
  applicationDate: string;
  status: ApplicationStatus;
  notes: string;
  followUpDate?: string;
  interviewDate?: string;
  interviewType?: string;
  logoBg?: string;
  timeline: ApplicationTimelineEvent[];
}

export type TaskPriority = 'High' | 'Medium' | 'Low';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface WeeklyTask {
  id: string;
  day: DayOfWeek;
  title: string;
  category: 'Applications' | 'Interview Prep' | 'Networking' | 'Skill Building' | 'Reflection';
  priority: TaskPriority;
  dueTime?: string;
  completed: boolean;
  notes?: string;
  relatedCompany?: string;
}

export type InterviewType = 'Behavioral' | 'Technical' | 'Situational' | 'Leadership' | 'General HR';
export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface AnswerEvaluation {
  overallScore: number;
  communicationScore: number;
  relevanceScore: number;
  structureScore: number;
  specificityScore: number;
  strengths: string[];
  areasToImprove: string[];
  suggestedAnswer: string;
  followUpQuestion: string;
}

export interface QuestionFeedbackItem {
  id: string;
  questionNumber: number;
  questionText: string;
  category: InterviewType;
  difficulty: InterviewDifficulty;
  userAnswer: string;
  evaluation: AnswerEvaluation;
}

export interface InterviewSession {
  id: string;
  date: string;
  interviewType: InterviewType;
  targetRole: string;
  difficulty: InterviewDifficulty;
  totalQuestions: number;
  completedQuestions: number;
  overallScore: number;
  questions: QuestionFeedbackItem[];
  status: 'in_progress' | 'completed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; actionType: 'add_task' | 'start_interview' | 'open_jobs' | 'copy'; payload?: string }[];
  isSaved?: boolean;
}

export interface SavedConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  previewSnippet: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'interview' | 'followup' | 'plan' | 'achievement' | 'reminder';
  actionUrl?: string;
}

export interface SavedItem {
  id: string;
  category: 'conversation' | 'interview_feedback' | 'recommendation' | 'task' | 'note';
  title: string;
  content: string;
  createdAt: string;
  meta?: Record<string, string | number>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  registeredDate: string;
  subscription: 'Free' | 'Premium';
  accountStatus: 'Active' | 'Suspended' | 'Pending';
  lastActive: string;
  targetRole: string;
  applicationsCount: number;
  interviewCount: number;
}

export interface AdminPrompt {
  id: string;
  title: string;
  category: 'Career Coach' | 'Interview Feedback' | 'Weekly Plan Generation' | 'Resume Guidance' | 'Follow-up Recommendations';
  description: string;
  promptTemplate: string;
  systemRole: string;
  isActive: boolean;
  lastUpdated: string;
  sampleInput: string;
  sampleOutput: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message?: string;
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  JobApplication,
  WeeklyTask,
  InterviewSession,
  SavedConversation,
  NotificationItem,
  SavedItem,
  AdminUser,
  AdminPrompt,
  ToastMessage,
  ApplicationStatus,
  DayOfWeek,
  TaskPriority
} from '../types';

import { StorageService } from '../services/storage';
import { ApiSimulation } from '../services/apiSimulation';
import { initialUserProfile, initialWeeklyTasks, initialJobApplications } from '../data/mockData';

export type MainView = 'landing' | 'app' | 'admin';
export type AppSubpage = 
  | 'dashboard' 
  | 'coach' 
  | 'interview' 
  | 'applications' 
  | 'weekly-plan' 
  | 'progress' 
  | 'saved' 
  | 'subscription' 
  | 'settings';

export type AdminSubpage = 
  | 'overview' 
  | 'users' 
  | 'prompts' 
  | 'subscriptions' 
  | 'reporting' 
  | 'settings';

interface AppContextType {
  // Navigation & View
  mainView: MainView;
  setMainView: (view: MainView) => void;
  appSubpage: AppSubpage;
  setAppSubpage: (subpage: AppSubpage) => void;
  adminSubpage: AdminSubpage;
  setAdminSubpage: (subpage: AdminSubpage) => void;
  
  // Auth & Onboarding
  isLoggedIn: boolean;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  loginDemoUser: () => void;
  logout: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: (answers: Partial<UserProfile>) => Promise<void>;

  // Job Applications
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id' | 'timeline'>) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  updateApplicationStatus: (id: string, newStatus: ApplicationStatus) => void;
  deleteApplication: (id: string) => void;
  selectedApplication: JobApplication | null;
  setSelectedApplication: (app: JobApplication | null) => void;

  // Weekly Plan
  weeklyTasks: WeeklyTask[];
  addTask: (task: Omit<WeeklyTask, 'id' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<WeeklyTask>) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  moveTaskToDay: (id: string, newDay: DayOfWeek) => void;
  isGeneratingPlan: boolean;
  generateAIPlan: () => Promise<void>;

  // Interview Practice
  interviewSessions: InterviewSession[];
  activeSession: InterviewSession | null;
  setActiveSession: (session: InterviewSession | null) => void;
  startNewInterview: (type: any, role: string, difficulty: any) => void;
  submitInterviewAnswer: (answer: string) => Promise<void>;
  finishInterviewSession: () => void;
  saveFeedbackToItems: (title: string, content: string) => void;

  // AI Coach Chat
  conversations: SavedConversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  activeConversation: SavedConversation | undefined;
  sendMessageToCoach: (text: string) => Promise<void>;
  startNewConversation: (initialTitle?: string) => string;
  renameConversation: (id: string, newTitle: string) => void;
  deleteConversation: (id: string) => void;
  isCoachTyping: boolean;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Saved Items
  savedItems: SavedItem[];
  addSavedItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  removeSavedItem: (id: string) => void;

  // Admin Data
  adminUsers: AdminUser[];
  updateAdminUserStatus: (id: string, status: 'Active' | 'Suspended' | 'Pending') => void;
  adminPrompts: AdminPrompt[];
  updateAdminPrompt: (id: string, updates: Partial<AdminPrompt>) => void;
  addAdminPrompt: (prompt: Omit<AdminPrompt, 'id' | 'lastUpdated'>) => void;
  duplicateAdminPrompt: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'danger', title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Reset Demo
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation states
  const [mainView, setMainView] = useState<MainView>('landing');
  const [appSubpage, setAppSubpage] = useState<AppSubpage>('dashboard');
  const [adminSubpage, setAdminSubpage] = useState<AdminSubpage>('overview');

  // Auth & Profile
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Pre-logged in for Alex Morgan demo
  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.getUserProfile());
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  // Applications
  const [applications, setApplications] = useState<JobApplication[]>(() => StorageService.getApplications());
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  // Tasks
  const [weeklyTasks, setWeeklyTasks] = useState<WeeklyTask[]>(() => StorageService.getWeeklyTasks());
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);

  // Interviews
  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>(() => StorageService.getInterviewSessions());
  const [activeSession, setActiveSession] = useState<InterviewSession | null>(null);

  // Coach & Conversations
  const [conversations, setConversations] = useState<SavedConversation[]>(() => StorageService.getSavedConversations());
  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    const list = StorageService.getSavedConversations();
    return list.length > 0 ? list[0].id : '';
  });
  const [isCoachTyping, setIsCoachTyping] = useState<boolean>(false);

  // Notifications & Saved
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => StorageService.getNotifications());
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => StorageService.getSavedItems());

  // Admin
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => StorageService.getAdminUsers());
  const [adminPrompts, setAdminPrompts] = useState<AdminPrompt[]>(() => StorageService.getAdminPrompts());

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to storage on change
  useEffect(() => { StorageService.saveUserProfile(userProfile); }, [userProfile]);
  useEffect(() => { StorageService.saveApplications(applications); }, [applications]);
  useEffect(() => { StorageService.saveWeeklyTasks(weeklyTasks); }, [weeklyTasks]);
  useEffect(() => { StorageService.saveInterviewSessions(interviewSessions); }, [interviewSessions]);
  useEffect(() => { StorageService.saveSavedConversations(conversations); }, [conversations]);
  useEffect(() => { StorageService.saveNotifications(notifications); }, [notifications]);
  useEffect(() => { StorageService.saveSavedItems(savedItems); }, [savedItems]);
  useEffect(() => { StorageService.saveAdminUsers(adminUsers); }, [adminUsers]);
  useEffect(() => { StorageService.saveAdminPrompts(adminPrompts); }, [adminPrompts]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'danger', title: string, message?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
    addToast('success', 'Profile Updated', 'Your career preferences have been saved.');
  };

  const loginDemoUser = () => {
    setIsLoggedIn(true);
    setMainView('app');
    setAppSubpage('dashboard');
    addToast('success', 'Welcome, Alex Morgan', 'Signed in with demo profile.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setMainView('landing');
    addToast('info', 'Signed Out', 'You have been signed out of your demo session.');
  };

  const completeOnboarding = async (answers: Partial<UserProfile>) => {
    setIsGeneratingPlan(true);
    const updated = {
      ...userProfile,
      ...answers,
      onboardingCompleted: true
    };
    setUserProfile(updated);

    // Generate personalized plan
    const generatedTasks = await ApiSimulation.generateWeeklyPlan(updated);
    setWeeklyTasks(generatedTasks);

    setIsGeneratingPlan(false);
    setIsOnboardingOpen(false);
    setMainView('app');
    setAppSubpage('dashboard');
    addToast('success', 'Plan Ready', `Personalized career roadmap generated for ${updated.targetRoles[0] || 'your goal'}.`);
  };

  // Job Application Handlers
  const addApplication = (appData: Omit<JobApplication, 'id' | 'timeline'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app_${Date.now()}`,
      timeline: [
        {
          id: `tl_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          title: 'Application Created',
          description: `Added ${appData.role} position at ${appData.company} as ${appData.status}.`,
          type: 'status_change'
        }
      ]
    };
    setApplications(prev => [newApp, ...prev]);
    addToast('success', 'Application Added', `${newApp.role} at ${newApp.company}`);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== id) return app;
      const updated = { ...app, ...updates };
      if (selectedApplication?.id === id) {
        setSelectedApplication(updated);
      }
      return updated;
    }));
    addToast('info', 'Application Updated', 'Changes saved successfully.');
  };

  const updateApplicationStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== id) return app;
      const timelineEvent = {
        id: `tl_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: `Status changed to ${newStatus}`,
        description: `Opportunity moved from ${app.status} to ${newStatus}.`,
        type: 'status_change' as const
      };
      const updated = {
        ...app,
        status: newStatus,
        timeline: [timelineEvent, ...app.timeline]
      };
      if (selectedApplication?.id === id) {
        setSelectedApplication(updated);
      }
      return updated;
    }));
    addToast('success', 'Status Changed', `Moved to "${newStatus}"`);
  };

  const deleteApplication = (id: string) => {
    const target = applications.find(a => a.id === id);
    setApplications(prev => prev.filter(app => app.id !== id));
    if (selectedApplication?.id === id) setSelectedApplication(null);
    addToast('info', 'Application Removed', target ? `${target.company} removed` : 'Removed');
  };

  // Weekly Task Handlers
  const addTask = (taskData: Omit<WeeklyTask, 'id' | 'completed'>) => {
    const newTask: WeeklyTask = {
      ...taskData,
      id: `task_${Date.now()}`,
      completed: false
    };
    setWeeklyTasks(prev => [...prev, newTask]);
    addToast('success', 'Task Added', newTask.title);
  };

  const updateTask = (id: string, updates: Partial<WeeklyTask>) => {
    setWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addToast('info', 'Task Updated', 'Task details saved.');
  };

  const toggleTaskCompletion = (id: string) => {
    setWeeklyTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextCompleted = !t.completed;
      if (nextCompleted) {
        addToast('success', 'Task Completed', t.title);
      }
      return { ...t, completed: nextCompleted };
    }));
  };

  const deleteTask = (id: string) => {
    setWeeklyTasks(prev => prev.filter(t => t.id !== id));
    addToast('info', 'Task Deleted', 'Action item removed from your plan.');
  };

  const moveTaskToDay = (id: string, newDay: DayOfWeek) => {
    setWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, day: newDay } : t));
    addToast('info', 'Task Rescheduled', `Moved to ${newDay}`);
  };

  const generateAIPlan = async () => {
    setIsGeneratingPlan(true);
    const newTasks = await ApiSimulation.generateWeeklyPlan(userProfile);
    setWeeklyTasks(newTasks);
    setIsGeneratingPlan(false);
    addToast('success', 'Weekly Plan Generated', 'New 7-day career schedule ready.');
  };

  // Interview Handlers
  const startNewInterview = (type: any, role: string, difficulty: any) => {
    const defaultQuestions: Record<string, string> = {
      'Behavioral': 'Tell me about a challenging technical problem you solved and how you approached it.',
      'Technical': 'How would you architect a fault-tolerant distributed cache with sub-millisecond read latency?',
      'Situational': 'You realize two days before a key client demo that a critical dependency has a severe bug. What do you do?',
      'Leadership': 'Describe a time you coached a team member through persistent performance blockers.',
      'General HR': 'Why are you looking to leave your current role, and what are your must-haves for your next company?'
    };

    const newSession: InterviewSession = {
      id: `sess_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      interviewType: type,
      targetRole: role || userProfile.targetRoles[0] || 'Software Engineer',
      difficulty: difficulty,
      totalQuestions: 5,
      completedQuestions: 0,
      overallScore: 0,
      status: 'in_progress',
      questions: [
        {
          id: `q_${Date.now()}`,
          questionNumber: 1,
          questionText: defaultQuestions[type] || 'Describe a major professional accomplishment.',
          category: type,
          difficulty: difficulty,
          userAnswer: '',
          evaluation: {
            overallScore: 0,
            communicationScore: 0,
            relevanceScore: 0,
            structureScore: 0,
            specificityScore: 0,
            strengths: [],
            areasToImprove: [],
            suggestedAnswer: '',
            followUpQuestion: ''
          }
        }
      ]
    };
    setActiveSession(newSession);
    setAppSubpage('interview');
  };

  const submitInterviewAnswer = async (answer: string) => {
    if (!activeSession) return;
    const currentQ = activeSession.questions[activeSession.completedQuestions];
    if (!currentQ) return;

    const evaluation = await ApiSimulation.evaluateInterviewAnswer(
      currentQ.questionText,
      answer,
      activeSession.interviewType,
      activeSession.difficulty,
      activeSession.targetRole
    );

    const updatedQuestions = [...activeSession.questions];
    updatedQuestions[activeSession.completedQuestions] = {
      ...currentQ,
      userAnswer: answer,
      evaluation
    };

    const nextCompleted = activeSession.completedQuestions + 1;
    const isFinished = nextCompleted >= activeSession.totalQuestions;

    // Calculate running score
    const completedList = updatedQuestions.slice(0, nextCompleted);
    const avgScore = Math.round(
      completedList.reduce((acc, q) => acc + q.evaluation.overallScore, 0) / completedList.length
    );

    // If not finished, add the next question (or use the followUp)
    if (!isFinished && updatedQuestions.length === nextCompleted) {
      updatedQuestions.push({
        id: `q_${Date.now()}_${nextCompleted + 1}`,
        questionNumber: nextCompleted + 1,
        questionText: evaluation.followUpQuestion || `Next question for ${activeSession.interviewType} evaluation.`,
        category: activeSession.interviewType,
        difficulty: activeSession.difficulty,
        userAnswer: '',
        evaluation: {
          overallScore: 0,
          communicationScore: 0,
          relevanceScore: 0,
          structureScore: 0,
          specificityScore: 0,
          strengths: [],
          areasToImprove: [],
          suggestedAnswer: '',
          followUpQuestion: ''
        }
      });
    }

    const updatedSession: InterviewSession = {
      ...activeSession,
      completedQuestions: nextCompleted,
      overallScore: avgScore,
      questions: updatedQuestions,
      status: isFinished ? 'completed' : 'in_progress'
    };

    setActiveSession(updatedSession);

    if (isFinished) {
      setInterviewSessions(prev => [updatedSession, ...prev]);
      addToast('success', 'Interview Completed!', `Overall score: ${avgScore}/100.`);
    } else {
      addToast('success', 'Feedback Generated', `Score for Question ${currentQ.questionNumber}: ${evaluation.overallScore}/100`);
    }
  };

  const finishInterviewSession = () => {
    if (activeSession) {
      setInterviewSessions(prev => {
        const existing = prev.find(s => s.id === activeSession.id);
        if (existing) {
          return prev.map(s => s.id === activeSession.id ? activeSession : s);
        }
        return [activeSession, ...prev];
      });
    }
    setActiveSession(null);
    addToast('info', 'Session Saved', 'Interview results added to your history.');
  };

  const saveFeedbackToItems = (title: string, content: string) => {
    addSavedItem({
      category: 'interview_feedback',
      title,
      content,
      meta: { role: activeSession?.targetRole || 'Software Engineer' }
    });
  };

  // AI Coach Chat
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const sendMessageToCoach = async (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let currentConvId = activeConversationId;
    if (!currentConvId || !conversations.some(c => c.id === currentConvId)) {
      currentConvId = startNewConversation(text.slice(0, 32) + '...');
    }

    const userMsg = {
      id: `msg_u_${Date.now()}`,
      sender: 'user' as const,
      content: text,
      timestamp: now
    };

    setConversations(prev => prev.map(c => {
      if (c.id !== currentConvId) return c;
      return {
        ...c,
        updatedAt: new Date().toISOString().split('T')[0],
        messages: [...c.messages, userMsg]
      };
    }));

    setIsCoachTyping(true);
    const aiResponse = await ApiSimulation.getCoachResponse(text, userProfile);
    setIsCoachTyping(false);

    setConversations(prev => prev.map(c => {
      if (c.id !== currentConvId) return c;
      return {
        ...c,
        previewSnippet: aiResponse.content.slice(0, 90) + '...',
        messages: [...c.messages, aiResponse]
      };
    }));
  };

  const startNewConversation = (initialTitle?: string): string => {
    const id = `conv_${Date.now()}`;
    const newConv: SavedConversation = {
      id,
      title: initialTitle || 'Career Strategy & Planning',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      previewSnippet: 'New discussion with Career Coach',
      messages: [
        {
          id: `msg_init_${Date.now()}`,
          sender: 'assistant',
          content: `Hi ${userProfile.name.split(' ')[0] || 'Alex'}. I've reviewed your career goals and active pipeline. What would you like to work on today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            { label: 'Help improve my resume', actionType: 'add_task', payload: 'Review resume against target job description' },
            { label: 'Prepare for upcoming interview', actionType: 'start_interview' },
            { label: 'Optimize weekly plan', actionType: 'add_task', payload: 'Generate weekly career plan' }
          ]
        }
      ]
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(id);
    return id;
  };

  const renameConversation = (id: string, newTitle: string) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
    addToast('info', 'Conversation Renamed', newTitle);
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter(c => c.id !== id);
      if (remaining.length > 0) setActiveConversationId(remaining[0].id);
    }
    addToast('info', 'Conversation Removed', 'Chat removed from history.');
  };

  // Notifications
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('info', 'Notifications Cleared', 'All marked as read.');
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('info', 'Notifications Cleared', 'Notification tray emptied.');
  };

  // Saved Items
  const addSavedItem = (itemData: Omit<SavedItem, 'id' | 'createdAt'>) => {
    const newItem: SavedItem = {
      ...itemData,
      id: `sv_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedItems(prev => [newItem, ...prev]);
    addToast('success', 'Saved to Library', newItem.title);
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Item Removed', 'Removed from saved collection.');
  };

  // Admin Handlers
  const updateAdminUserStatus = (id: string, status: 'Active' | 'Suspended' | 'Pending') => {
    setAdminUsers(prev => prev.map(u => u.id === id ? { ...u, accountStatus: status } : u));
    addToast('info', 'User Status Updated', `Account marked as ${status}.`);
  };

  const updateAdminPrompt = (id: string, updates: Partial<AdminPrompt>) => {
    setAdminPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : p));
    addToast('success', 'AI Prompt Saved', 'Prompt changes updated in registry.');
  };

  const addAdminPrompt = (promptData: Omit<AdminPrompt, 'id' | 'lastUpdated'>) => {
    const newPrompt: AdminPrompt = {
      ...promptData,
      id: `prm_${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setAdminPrompts(prev => [newPrompt, ...prev]);
    addToast('success', 'Prompt Created', newPrompt.title);
  };

  const duplicateAdminPrompt = (id: string) => {
    const original = adminPrompts.find(p => p.id === id);
    if (!original) return;
    const duplicated: AdminPrompt = {
      ...original,
      id: `prm_${Date.now()}`,
      title: `${original.title} (Copy)`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setAdminPrompts(prev => [duplicated, ...prev]);
    addToast('info', 'Prompt Duplicated', duplicated.title);
  };

  // Reset Demo
  const resetAllDemoData = () => {
    StorageService.resetAllData();
    setUserProfile(initialUserProfile);
    setApplications(initialJobApplications);
    setWeeklyTasks(initialWeeklyTasks);
    setInterviewSessions(StorageService.getInterviewSessions());
    setConversations(StorageService.getSavedConversations());
    setNotifications(StorageService.getNotifications());
    setSavedItems(StorageService.getSavedItems());
    setAdminUsers(StorageService.getAdminUsers());
    setAdminPrompts(StorageService.getAdminPrompts());
    addToast('info', 'Demo Reset', 'All sample data has been reset to defaults.');
  };

  return (
    <AppContext.Provider
      value={{
        mainView,
        setMainView,
        appSubpage,
        setAppSubpage,
        adminSubpage,
        setAdminSubpage,

        isLoggedIn,
        userProfile,
        updateUserProfile,
        loginDemoUser,
        logout,
        isOnboardingOpen,
        setIsOnboardingOpen,
        onboardingStep,
        setOnboardingStep,
        completeOnboarding,

        applications,
        addApplication,
        updateApplication,
        updateApplicationStatus,
        deleteApplication,
        selectedApplication,
        setSelectedApplication,

        weeklyTasks,
        addTask,
        updateTask,
        toggleTaskCompletion,
        deleteTask,
        moveTaskToDay,
        isGeneratingPlan,
        generateAIPlan,

        interviewSessions,
        activeSession,
        setActiveSession,
        startNewInterview,
        submitInterviewAnswer,
        finishInterviewSession,
        saveFeedbackToItems,

        conversations,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        sendMessageToCoach,
        startNewConversation,
        renameConversation,
        deleteConversation,
        isCoachTyping,

        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,

        savedItems,
        addSavedItem,
        removeSavedItem,

        adminUsers,
        updateAdminUserStatus,
        adminPrompts,
        updateAdminPrompt,
        addAdminPrompt,
        duplicateAdminPrompt,

        toasts,
        addToast,
        removeToast,

        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

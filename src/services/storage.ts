import {
  UserProfile,
  JobApplication,
  WeeklyTask,
  InterviewSession,
  SavedConversation,
  NotificationItem,
  SavedItem,
  AdminUser,
  AdminPrompt
} from '../types';

import {
  initialUserProfile,
  initialJobApplications,
  initialWeeklyTasks,
  initialInterviewSessions,
  initialSavedConversations,
  initialNotifications,
  initialSavedItems,
  initialAdminUsers,
  initialAdminPrompts
} from '../data/mockData';

const KEYS = {
  USER: 'career_user_profile_v1',
  APPLICATIONS: 'career_job_applications_v1',
  TASKS: 'career_weekly_tasks_v1',
  INTERVIEWS: 'career_interview_sessions_v1',
  CONVERSATIONS: 'career_saved_conversations_v1',
  NOTIFICATIONS: 'career_notifications_v1',
  SAVED_ITEMS: 'career_saved_items_v1',
  ADMIN_USERS: 'career_admin_users_v1',
  ADMIN_PROMPTS: 'career_admin_prompts_v1',
  ACTIVE_VIEW: 'career_active_view_v1' // 'public' | 'app' | 'admin'
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export const StorageService = {
  getUserProfile(): UserProfile {
    return safeGet<UserProfile>(KEYS.USER, initialUserProfile);
  },
  saveUserProfile(profile: UserProfile): void {
    safeSet(KEYS.USER, profile);
  },

  getApplications(): JobApplication[] {
    return safeGet<JobApplication[]>(KEYS.APPLICATIONS, initialJobApplications);
  },
  saveApplications(apps: JobApplication[]): void {
    safeSet(KEYS.APPLICATIONS, apps);
  },

  getWeeklyTasks(): WeeklyTask[] {
    return safeGet<WeeklyTask[]>(KEYS.TASKS, initialWeeklyTasks);
  },
  saveWeeklyTasks(tasks: WeeklyTask[]): void {
    safeSet(KEYS.TASKS, tasks);
  },

  getInterviewSessions(): InterviewSession[] {
    return safeGet<InterviewSession[]>(KEYS.INTERVIEWS, initialInterviewSessions);
  },
  saveInterviewSessions(sessions: InterviewSession[]): void {
    safeSet(KEYS.INTERVIEWS, sessions);
  },

  getSavedConversations(): SavedConversation[] {
    return safeGet<SavedConversation[]>(KEYS.CONVERSATIONS, initialSavedConversations);
  },
  saveSavedConversations(convs: SavedConversation[]): void {
    safeSet(KEYS.CONVERSATIONS, convs);
  },

  getNotifications(): NotificationItem[] {
    return safeGet<NotificationItem[]>(KEYS.NOTIFICATIONS, initialNotifications);
  },
  saveNotifications(notifs: NotificationItem[]): void {
    safeSet(KEYS.NOTIFICATIONS, notifs);
  },

  getSavedItems(): SavedItem[] {
    return safeGet<SavedItem[]>(KEYS.SAVED_ITEMS, initialSavedItems);
  },
  saveSavedItems(items: SavedItem[]): void {
    safeSet(KEYS.SAVED_ITEMS, items);
  },

  getAdminUsers(): AdminUser[] {
    return safeGet<AdminUser[]>(KEYS.ADMIN_USERS, initialAdminUsers);
  },
  saveAdminUsers(users: AdminUser[]): void {
    safeSet(KEYS.ADMIN_USERS, users);
  },

  getAdminPrompts(): AdminPrompt[] {
    return safeGet<AdminPrompt[]>(KEYS.ADMIN_PROMPTS, initialAdminPrompts);
  },
  saveAdminPrompts(prompts: AdminPrompt[]): void {
    safeSet(KEYS.ADMIN_PROMPTS, prompts);
  },

  resetAllData(): void {
    localStorage.removeItem(KEYS.USER);
    localStorage.removeItem(KEYS.APPLICATIONS);
    localStorage.removeItem(KEYS.TASKS);
    localStorage.removeItem(KEYS.INTERVIEWS);
    localStorage.removeItem(KEYS.CONVERSATIONS);
    localStorage.removeItem(KEYS.NOTIFICATIONS);
    localStorage.removeItem(KEYS.SAVED_ITEMS);
    localStorage.removeItem(KEYS.ADMIN_USERS);
    localStorage.removeItem(KEYS.ADMIN_PROMPTS);
  }
};

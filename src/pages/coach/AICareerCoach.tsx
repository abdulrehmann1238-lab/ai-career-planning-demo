import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Plus, 
  Bookmark, 
  Copy, 
  Check, 
  Trash2, 
  Edit2, 
  Award, 
  Calendar, 
  Briefcase, 
  ChevronRight,
  User,
  Layers,
  ArrowRight,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AICareerCoach: React.FC = () => {
  const {
    userProfile,
    conversations,
    activeConversationId,
    setActiveConversationId,
    activeConversation,
    sendMessageToCoach,
    startNewConversation,
    renameConversation,
    deleteConversation,
    isCoachTyping,
    addToast,
    addTask,
    setAppSubpage,
    addSavedItem,
    applications
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [editingConvId, setEditingConvId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isCoachTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isCoachTyping) return;
    const text = inputMessage;
    setInputMessage('');
    await sendMessageToCoach(text);
  };

  const handleSuggestedPrompt = async (promptText: string) => {
    if (isCoachTyping) return;
    await sendMessageToCoach(promptText);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('info', 'Copied to Clipboard', 'Text copied successfully.');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSaveResponse = (content: string, title?: string) => {
    addSavedItem({
      category: 'conversation',
      title: title || 'Career Coach Recommendation',
      content,
      meta: { role: userProfile.targetRoles[0] || 'Software Engineer' }
    });
  };

  const handleActionClick = (action: { label: string; actionType: string; payload?: string }) => {
    if (action.actionType === 'add_task') {
      addTask({
        day: 'Tuesday',
        title: action.payload || 'Career Action Item',
        category: 'Skill Building',
        priority: 'High',
        dueTime: '11:00 AM'
      });
      addToast('success', 'Task Added to Plan', action.payload || 'Added to Tuesday schedule');
    } else if (action.actionType === 'start_interview') {
      setAppSubpage('interview');
    } else if (action.actionType === 'open_jobs') {
      setAppSubpage('applications');
    } else if (action.actionType === 'copy' && action.payload) {
      handleCopy('action_copy', action.payload);
    }
  };

  const suggestedPrompts = [
    'Help me improve my resume using Google X-Y-Z formula',
    'How should I prepare for a software engineering interview?',
    'Help me negotiate my salary with competing offers',
    'Find gaps in my current career strategy',
    'Build my career plan for this week',
    'How do I structure a 2-minute STAR behavioral answer?'
  ];

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      
      {/* 1. LEFT CONVERSATION HISTORY PANEL */}
      <div className="w-full lg:w-72 bg-white rounded-card border border-surface-border shadow-soft flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider">Discussions</span>
          </div>
          <button
            onClick={() => startNewConversation('New Career Strategy')}
            className="p-1.5 rounded-lg bg-brand-soft text-brand hover:bg-brand hover:text-white transition-colors"
            title="Start new conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map(conv => {
            const isActive = conv.id === activeConversationId;
            const isEditing = editingConvId === conv.id;

            return (
              <div
                key={conv.id}
                onClick={() => {
                  if (!isEditing) setActiveConversationId(conv.id);
                }}
                className={`group p-3 rounded-xl text-xs cursor-pointer transition-all ${
                  isActive ? 'bg-brand-soft text-brand font-bold' : 'hover:bg-surface-hover text-text-primary font-medium'
                }`}
              >
                {isEditing ? (
                  <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={e => setEditingTitle(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          renameConversation(conv.id, editingTitle);
                          setEditingConvId(null);
                        }
                      }}
                      className="flex-1 px-2 py-1 rounded border border-brand text-xs font-normal"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        renameConversation(conv.id, editingTitle);
                        setEditingConvId(null);
                      }}
                      className="p-1 rounded bg-brand text-white"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="truncate flex-1 pr-1">{conv.title}</span>
                      <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setEditingConvId(conv.id);
                            setEditingTitle(conv.title);
                          }}
                          className="p-1 rounded text-text-muted hover:text-text-primary"
                          title="Rename"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                          className="p-1 rounded text-text-muted hover:text-status-danger"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-text-muted mt-0.5 truncate font-normal">
                      {conv.previewSnippet || 'Empty discussion'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 bg-white rounded-card border border-surface-border shadow-soft flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-surface-border flex items-center justify-between bg-background-soft/40">
          <div>
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span>{activeConversation?.title || 'Your Career Coach'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-soft text-brand">
                Calibrated AI
              </span>
            </h3>
            <p className="text-[11px] text-text-secondary mt-0.5 font-secondary">
              Tailored to {userProfile.targetRoles[0] || 'Software Engineer'} · {userProfile.experienceLevel}
            </p>
          </div>

          <button
            onClick={() => handleSaveResponse(activeConversation?.messages.map(m => `${m.sender}: ${m.content}`).join('\n\n') || '', activeConversation?.title)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border text-xs font-semibold text-text-secondary hover:text-brand hover:bg-white transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Discussion</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {activeConversation?.messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser ? 'bg-brand-soft text-brand' : 'bg-brand text-white shadow-soft'
                }`}>
                  {isUser ? (userProfile.avatar || 'U') : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2 max-w-xl">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-brand text-white rounded-tr-none'
                      : 'bg-surface-hover/80 text-text-primary rounded-tl-none border border-surface-border'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Actions for Assistant Messages */}
                  {!isUser && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      {msg.suggestedActions?.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action)}
                          className="px-2.5 py-1 rounded-lg bg-sand/50 hover:bg-sand border border-sand text-text-primary font-semibold transition-colors flex items-center gap-1"
                        >
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3 text-terracotta" />
                        </button>
                      ))}

                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 text-text-muted hover:text-text-primary rounded"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleSaveResponse(msg.content)}
                        className="p-1 text-text-muted hover:text-brand rounded"
                        title="Save to items"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span className={`block text-[10px] text-text-muted ${isUser ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isCoachTyping && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs shrink-0 shadow-soft">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-hover/80 border border-surface-border text-xs text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-brand animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-brand animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-medium text-text-muted ml-1">Analyzing career strategy...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="p-3 border-t border-surface-border bg-surface-hover/30 overflow-x-auto flex gap-2">
          {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedPrompt(prompt)}
              className="px-3 py-1.5 rounded-lg bg-white border border-surface-border text-[11px] font-semibold text-text-secondary hover:text-brand hover:border-brand/40 whitespace-nowrap transition-colors shadow-soft"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-surface-border flex items-center gap-2 bg-white">
          <input
            type="text"
            placeholder="Ask your coach anything (e.g. 'How should I answer why I am leaving my job?')"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            disabled={isCoachTyping}
            className="flex-1 px-4 py-2.5 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isCoachTyping}
            className="p-2.5 rounded-xl bg-brand text-white hover:bg-brand-hover shadow-soft disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* 3. RIGHT CONTEXTUAL CAREER PROFILE PANEL (Desktop only) */}
      <div className="hidden xl:flex flex-col w-72 bg-white rounded-card border border-surface-border shadow-soft p-5 space-y-5 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
          <User className="w-4 h-4 text-brand" />
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Candidate Profile</h4>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase text-text-muted">Target Role</span>
            <div className="font-semibold text-text-primary mt-0.5">{userProfile.targetRoles[0] || 'Software Engineer'}</div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-text-muted">Experience Level</span>
            <div className="font-semibold text-text-primary mt-0.5">{userProfile.experienceLevel}</div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-text-muted">Arrangement</span>
            <div className="font-semibold text-text-primary mt-0.5">{userProfile.workArrangement} · {userProfile.expectedSalaryRange}</div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-text-muted">Active Applications</span>
            <div className="font-semibold text-brand mt-0.5">{applications.length} tracked opportunities</div>
          </div>

          <div className="pt-2 border-t border-surface-border">
            <span className="text-[10px] font-bold uppercase text-text-muted block mb-1">Career Goals</span>
            <ul className="space-y-1 text-text-secondary text-[11px]">
              {userProfile.careerGoals.map((g, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-sand/30 border border-sand text-xs space-y-1.5 mt-auto">
          <span className="font-bold text-text-primary block">Upcoming Milestone</span>
          <p className="text-[11px] text-text-secondary leading-snug">
            Stripe architecture round tomorrow at 2:00 PM. Review optimistic UI notes.
          </p>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  X, 
  ArrowRight, 
  RotateCcw,
  Building2,
  AlertCircle,
  TrendingUp,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WeeklyTask, DayOfWeek, TaskPriority } from '../../types';

export const WeeklyPlanPage: React.FC = () => {
  const { 
    weeklyTasks, 
    addTask, 
    updateTask, 
    toggleTaskCompletion, 
    deleteTask, 
    moveTaskToDay,
    generateAIPlan,
    isGeneratingPlan,
    userProfile,
    addToast
  } = useApp();

  const [activeDayFilter, setActiveDayFilter] = useState<string>('All');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<WeeklyTask | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDay, setFormDay] = useState<DayOfWeek>('Monday');
  const [formPriority, setFormPriority] = useState<TaskPriority>('Medium');
  const [formCategory, setFormCategory] = useState<WeeklyTask['category']>('Skill Building');
  const [formTime, setFormTime] = useState('11:00 AM');
  const [formNotes, setFormNotes] = useState('');
  const [formCompany, setFormCompany] = useState('');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Metrics
  const completedCount = weeklyTasks.filter(t => t.completed).length;
  const totalCount = weeklyTasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const openAddModal = (defaultDay?: DayOfWeek) => {
    setEditingTask(null);
    setFormTitle('');
    setFormDay(defaultDay || 'Monday');
    setFormPriority('Medium');
    setFormCategory('Applications');
    setFormTime('11:00 AM');
    setFormNotes('');
    setFormCompany('');
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task: WeeklyTask) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDay(task.day);
    setFormPriority(task.priority);
    setFormCategory(task.category);
    setFormTime(task.dueTime || '');
    setFormNotes(task.notes || '');
    setFormCompany(task.relatedCompany || '');
    setIsTaskModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      addToast('warning', 'Task Title Required', 'Please enter a description for the action item.');
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, {
        title: formTitle,
        day: formDay,
        priority: formPriority,
        category: formCategory,
        dueTime: formTime,
        notes: formNotes,
        relatedCompany: formCompany
      });
    } else {
      addTask({
        title: formTitle,
        day: formDay,
        priority: formPriority,
        category: formCategory,
        dueTime: formTime,
        notes: formNotes,
        relatedCompany: formCompany
      });
    }

    setIsTaskModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. HEADER & AI GENERATE ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Your Weekly Career Plan</h2>
          <p className="text-xs text-text-secondary mt-0.5 font-secondary">
            Small, consistent actions create meaningful career progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={generateAIPlan}
            disabled={isGeneratingPlan}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGeneratingPlan ? 'animate-spin' : ''}`} />
            <span>{isGeneratingPlan ? 'Synthesizing Schedule...' : 'Generate My Weekly Plan'}</span>
          </button>

          <button
            onClick={() => openAddModal()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-surface-border text-text-primary text-xs font-bold hover:bg-surface-hover shadow-soft transition-all"
          >
            <Plus className="w-4 h-4 text-brand" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* 2. WEEKLY SUMMARY PROGRESS BAR */}
      <div className="p-6 rounded-card bg-white border border-surface-border shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Weekly Sprint Objective</span>
            <h3 className="text-sm font-bold text-text-primary mt-0.5">
              Complete Stripe System Design Prep & Advance 2 Pipeline Submissions
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-status-success">{completedCount} Completed</span>
            <span className="text-text-muted">·</span>
            <span className="text-brand">{totalCount - completedCount} Remaining</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-primary">{completionPercentage}% Finished</span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 rounded-full bg-surface-hover overflow-hidden">
          <div 
            className="h-full bg-brand rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. DAY SELECTOR CHIPS */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveDayFilter('All')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            activeDayFilter === 'All'
              ? 'bg-brand text-white shadow-soft'
              : 'bg-white border border-surface-border text-text-secondary hover:text-text-primary'
          }`}
        >
          All 7 Days
        </button>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setActiveDayFilter(d)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeDayFilter === d
                ? 'bg-brand text-white shadow-soft'
                : 'bg-white border border-surface-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* 4. MONDAY THROUGH SUNDAY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
        {days
          .filter(d => activeDayFilter === 'All' || activeDayFilter === d)
          .map(day => {
            const dayTasks = weeklyTasks.filter(t => t.day === day);
            const dayDone = dayTasks.filter(t => t.completed).length;

            return (
              <div 
                key={day}
                className="bg-white rounded-card border border-surface-border shadow-soft p-4 space-y-3"
              >
                {/* Day Card Header */}
                <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-primary uppercase tracking-wider">{day}</span>
                    <span className="text-[10px] text-text-muted font-medium">({dayDone}/{dayTasks.length})</span>
                  </div>

                  <button
                    onClick={() => openAddModal(day)}
                    className="p-1 rounded text-text-muted hover:text-brand hover:bg-surface-hover"
                    title={`Add task to ${day}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Day Tasks List */}
                <div className="space-y-2.5">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                        task.completed 
                          ? 'bg-surface-hover/40 border-surface-border/60 opacity-75' 
                          : 'bg-white border-surface-border shadow-soft hover:shadow-soft-md'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="w-4 h-4 rounded text-brand focus:ring-brand border-surface-border mt-0.5 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`font-semibold block leading-snug ${
                            task.completed ? 'line-through text-text-muted' : 'text-text-primary'
                          }`}>
                            {task.title}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-surface-border/50 text-[10px]">
                        <span className={`font-bold px-1.5 py-0.5 rounded ${
                          task.priority === 'High' ? 'bg-terracotta-soft text-terracotta' :
                          task.priority === 'Medium' ? 'bg-sand text-[#8A5A36]' :
                          'bg-surface-hover text-text-muted'
                        }`}>
                          {task.priority}
                        </span>

                        <div className="flex items-center gap-2 text-text-muted">
                          {task.dueTime && <span>{task.dueTime}</span>}
                          
                          {/* Move Day Selector */}
                          <select
                            value={task.day}
                            onChange={e => moveTaskToDay(task.id, e.target.value as DayOfWeek)}
                            className="text-[9px] bg-transparent border-0 text-text-muted hover:text-text-primary cursor-pointer p-0 font-medium"
                            title="Reschedule to another day"
                          >
                            {days.map(d => (
                              <option key={d} value={d}>{d.slice(0, 3)}</option>
                            ))}
                          </select>

                          <button
                            onClick={() => openEditModal(task)}
                            className="hover:text-text-primary p-0.5"
                            title="Edit"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="hover:text-status-danger p-0.5"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {task.notes && (
                        <p className="text-[10px] text-text-secondary italic bg-surface-hover/50 p-1.5 rounded">
                          {task.notes}
                        </p>
                      )}
                    </div>
                  ))}

                  {dayTasks.length === 0 && (
                    <div className="py-6 text-center text-[11px] text-text-muted italic">
                      No tasks scheduled for {day}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* 5. ADD / EDIT TASK MODAL */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-4">
              <h3 className="text-base font-bold text-text-primary">
                {editingTask ? 'Edit Action Item' : 'Add Weekly Action Item'}
              </h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="p-1 rounded text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-text-primary mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practice STAR behavioral questions"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Scheduled Day</label>
                  <select
                    value={formDay}
                    onChange={e => setFormDay(e.target.value as DayOfWeek)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-brand"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={e => setFormPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-brand"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as WeeklyTask['category'])}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-brand"
                  >
                    <option value="Applications">Applications</option>
                    <option value="Interview Prep">Interview Prep</option>
                    <option value="Skill Building">Skill Building</option>
                    <option value="Networking">Networking</option>
                    <option value="Reflection">Reflection</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Target Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 2:00 PM"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Related Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Stripe, Linear"
                  value={formCompany}
                  onChange={e => setFormCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Strategy Notes</label>
                <textarea
                  rows={2}
                  placeholder="Key talking points or links to review..."
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft"
                >
                  {editingTask ? 'Save Changes' : 'Add to Schedule'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  Kanban, 
  List, 
  Clock, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  ChevronRight,
  Building2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobApplication, ApplicationStatus } from '../../types';

export const JobApplicationsPage: React.FC = () => {
  const { 
    applications, 
    addApplication, 
    updateApplication, 
    updateApplicationStatus, 
    deleteApplication,
    selectedApplication,
    setSelectedApplication,
    addToast
  } = useApp();

  // View state
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'company'>('date');

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formCompany, setFormCompany] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formLocation, setFormLocation] = useState('Remote');
  const [formJobUrl, setFormJobUrl] = useState('');
  const [formSalary, setFormSalary] = useState('$175k – $200k');
  const [formStatus, setFormStatus] = useState<ApplicationStatus>('Applied');
  const [formNotes, setFormNotes] = useState('');
  const [formFollowUp, setFormFollowUp] = useState('');

  // Timeline event addition in drawer
  const [newTimelineTitle, setNewTimelineTitle] = useState('');
  const [newTimelineDesc, setNewTimelineDesc] = useState('');

  const kanbanColumns: ApplicationStatus[] = ['Saved', 'Applied', 'In Review', 'Interview', 'Offer', 'Rejected'];

  const stats = {
    total: applications.length,
    inReview: applications.filter(a => a.status === 'In Review').length,
    interviews: applications.filter(a => a.status === 'Interview').length,
    offers: applications.filter(a => a.status === 'Offer').length,
    rejected: applications.filter(a => a.status === 'Rejected').length
  };

  // Filtered and sorted applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
    return a.company.localeCompare(b.company);
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormCompany('');
    setFormRole('');
    setFormLocation('Remote');
    setFormJobUrl('');
    setFormSalary('');
    setFormStatus('Applied');
    setFormNotes('');
    setFormFollowUp('');
    setIsModalOpen(true);
  };

  const openEditModal = (app: JobApplication) => {
    setEditingId(app.id);
    setFormCompany(app.company);
    setFormRole(app.role);
    setFormLocation(app.location);
    setFormJobUrl(app.jobUrl || '');
    setFormSalary(app.salaryRange || '');
    setFormStatus(app.status);
    setFormNotes(app.notes);
    setFormFollowUp(app.followUpDate || '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCompany.trim() || !formRole.trim()) {
      addToast('warning', 'Required Fields Missing', 'Please enter Company and Job Title.');
      return;
    }

    if (editingId) {
      updateApplication(editingId, {
        company: formCompany,
        role: formRole,
        location: formLocation,
        jobUrl: formJobUrl,
        salaryRange: formSalary,
        status: formStatus,
        notes: formNotes,
        followUpDate: formFollowUp
      });
    } else {
      addApplication({
        company: formCompany,
        role: formRole,
        location: formLocation,
        jobUrl: formJobUrl,
        salaryRange: formSalary,
        applicationDate: new Date().toISOString().split('T')[0],
        status: formStatus,
        notes: formNotes,
        followUpDate: formFollowUp,
        logoBg: ['#526B62', '#635BFF', '#5E6AD2', '#F24E1E', '#96BF48', '#FF7A59', '#3B82F6'][Math.floor(Math.random() * 7)]
      });
    }

    setIsModalOpen(false);
  };

  const handleAddTimelineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplication || !newTimelineTitle.trim()) return;

    const newEvent = {
      id: `tl_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: newTimelineTitle,
      description: newTimelineDesc,
      type: 'note' as const
    };

    updateApplication(selectedApplication.id, {
      timeline: [newEvent, ...selectedApplication.timeline]
    });

    setNewTimelineTitle('');
    setNewTimelineDesc('');
    addToast('success', 'Timeline Updated', 'New note added to opportunity history.');
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP HEADER & STATISTICS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">My Applications</h2>
          <p className="text-xs text-text-secondary mt-0.5 font-secondary">
            Keep every opportunity organized, deadlines tracked, and conversations logged.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-surface-border shadow-soft">
          <span className="text-[11px] text-text-muted font-medium">Total Tracked</span>
          <div className="text-2xl font-bold text-text-primary mt-0.5">{stats.total}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-surface-border shadow-soft">
          <span className="text-[11px] text-text-muted font-medium">In Review</span>
          <div className="text-2xl font-bold text-brand mt-0.5">{stats.inReview}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-surface-border shadow-soft">
          <span className="text-[11px] text-text-muted font-medium">Interviews</span>
          <div className="text-2xl font-bold text-terracotta mt-0.5">{stats.interviews}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-surface-border shadow-soft">
          <span className="text-[11px] text-text-muted font-medium">Offers</span>
          <div className="text-2xl font-bold text-status-success mt-0.5">{stats.offers}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-surface-border shadow-soft">
          <span className="text-[11px] text-text-muted font-medium">Archived / Rejected</span>
          <div className="text-2xl font-bold text-text-muted mt-0.5">{stats.rejected}</div>
        </div>
      </div>

      {/* 2. SEARCH, FILTER, AND VIEW MODE TOGGLE */}
      <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft flex flex-wrap items-center justify-between gap-4">
        
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search companies, roles, notes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-surface-border text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-surface-border text-xs text-text-secondary bg-white focus:outline-none focus:border-brand"
          >
            <option value="All">All Statuses</option>
            {kanbanColumns.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* View mode toggle (Kanban vs Table) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-lg bg-surface-hover border border-surface-border">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-white shadow-soft text-brand' : 'text-text-muted'}`}
              title="Kanban Board View"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-soft text-brand' : 'text-text-muted'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. APPLICATION VIEWS: KANBAN OR TABLE */}
      {viewMode === 'kanban' ? (
        /* KANBAN BOARD */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {kanbanColumns.map(status => {
            const columnApps = filteredApps.filter(app => app.status === status);
            return (
              <div 
                key={status}
                className="bg-surface-hover/70 rounded-xl p-3 border border-surface-border min-w-[210px] space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-1 border-b border-surface-border/60">
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wide">
                    {status}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white text-text-secondary text-[10px] font-bold flex items-center justify-center shadow-soft">
                    {columnApps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-2.5">
                  {columnApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApplication(app)}
                      className="p-3 rounded-xl bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all cursor-pointer group space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                            style={{ backgroundColor: app.logoBg || '#526B62' }}
                          >
                            {app.company[0]}
                          </div>
                          <span className="font-bold text-text-primary truncate">{app.company}</span>
                        </div>

                        {/* Status Mover Quick Dropdown */}
                        <select
                          value={app.status}
                          onClick={e => e.stopPropagation()}
                          onChange={e => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-surface-border bg-surface-hover text-text-secondary"
                        >
                          {kanbanColumns.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <h4 className="font-semibold text-text-primary text-[11px] leading-tight truncate">
                          {app.role}
                        </h4>
                        <span className="text-[10px] text-text-muted mt-0.5 block truncate">
                          {app.location}
                        </span>
                      </div>

                      {app.salaryRange && (
                        <div className="text-[10px] font-semibold text-status-success">
                          {app.salaryRange}
                        </div>
                      )}

                      {app.followUpDate && (
                        <div className="pt-1.5 border-t border-surface-border/60 flex items-center justify-between text-[10px] text-text-muted">
                          <span>Follow-up:</span>
                          <span className="font-medium text-brand">{app.followUpDate}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="py-6 text-center text-[11px] text-text-muted italic">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-card border border-surface-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-text-primary">
              <thead className="bg-surface-hover/80 border-b border-surface-border text-text-muted font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Company & Role</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Salary Range</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Follow-up</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filteredApps.map(app => (
                  <tr 
                    key={app.id} 
                    onClick={() => setSelectedApplication(app)}
                    className="hover:bg-surface-hover/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs shrink-0"
                          style={{ backgroundColor: app.logoBg || '#526B62' }}
                        >
                          {app.company[0]}
                        </div>
                        <div>
                          <div className="font-bold text-text-primary">{app.company}</div>
                          <div className="text-[11px] text-text-secondary">{app.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary">{app.location}</td>
                    <td className="py-3.5 px-4 font-medium text-status-success">{app.salaryRange || '—'}</td>
                    <td className="py-3.5 px-4 text-text-muted">{app.applicationDate}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onClick={e => e.stopPropagation()}
                        onChange={e => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                        className="text-xs font-semibold px-2 py-1 rounded-lg border border-surface-border bg-white text-text-primary"
                      >
                        {kanbanColumns.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary">{app.followUpDate || '—'}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => openEditModal(app)}
                          className="p-1 rounded text-text-muted hover:text-text-primary"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-1 rounded text-text-muted hover:text-status-danger"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. APPLICATION DETAILS SLIDE-OVER DRAWER */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-soft-lg border-l border-surface-border flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-soft"
                  style={{ backgroundColor: selectedApplication.logoBg || '#526B62' }}
                >
                  {selectedApplication.company[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{selectedApplication.company}</h3>
                  <p className="text-xs text-text-secondary">{selectedApplication.role}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Info Metadata */}
            <div className="py-4 border-b border-surface-border grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold">Status:</span>
                <div className="font-semibold text-brand mt-0.5">{selectedApplication.status}</div>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold">Compensation Band:</span>
                <div className="font-semibold text-status-success mt-0.5">{selectedApplication.salaryRange || 'Not disclosed'}</div>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold">Location:</span>
                <div className="text-text-secondary mt-0.5">{selectedApplication.location}</div>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold">Application Date:</span>
                <div className="text-text-secondary mt-0.5">{selectedApplication.applicationDate}</div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="py-4 border-b border-surface-border space-y-2">
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider">Candidate Notes</span>
              <p className="text-xs text-text-secondary leading-relaxed bg-surface-hover/70 p-3 rounded-xl border border-surface-border">
                {selectedApplication.notes || 'No detailed notes logged yet.'}
              </p>
            </div>

            {/* Application Timeline Logs */}
            <div className="py-4 space-y-3 flex-1">
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider block">Application Timeline</span>
              
              <div className="space-y-3 pl-2 border-l-2 border-surface-border">
                {selectedApplication.timeline.map(evt => (
                  <div key={evt.id} className="relative pl-4 text-xs space-y-0.5">
                    <span className="absolute -left-[1.3rem] top-1 w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-white" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-primary">{evt.title}</span>
                      <span className="text-[10px] text-text-muted">{evt.date}</span>
                    </div>
                    <p className="text-text-secondary text-[11px] leading-snug">{evt.description}</p>
                  </div>
                ))}
              </div>

              {/* Add Note / Timeline Event Form */}
              <form onSubmit={handleAddTimelineEvent} className="pt-3 border-t border-surface-border space-y-2">
                <input
                  type="text"
                  placeholder="Event title (e.g. Completed recruiter sync)"
                  value={newTimelineTitle}
                  onChange={e => setNewTimelineTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-surface-border text-xs focus:outline-none focus:border-brand"
                />
                <textarea
                  placeholder="Optional details or interview takeaways..."
                  rows={2}
                  value={newTimelineDesc}
                  onChange={e => setNewTimelineDesc(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-surface-border text-xs focus:outline-none focus:border-brand resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-surface-hover hover:bg-brand-soft hover:text-brand text-xs font-bold text-text-secondary transition-colors"
                >
                  + Add Timeline Note
                </button>
              </form>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <button
                onClick={() => {
                  openEditModal(selectedApplication);
                }}
                className="px-4 py-2 rounded-xl border border-surface-border text-xs font-bold text-text-primary hover:bg-surface-hover"
              >
                Edit Information
              </button>

              <button
                onClick={() => {
                  deleteApplication(selectedApplication.id);
                }}
                className="px-4 py-2 rounded-xl text-status-danger text-xs font-bold hover:bg-status-danger-soft"
              >
                Delete Opportunity
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. ADD / EDIT APPLICATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-card-lg border border-surface-border shadow-soft-lg p-6 sm:p-8 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-4">
              <h3 className="text-lg font-bold text-text-primary">
                {editingId ? 'Edit Application' : 'Add New Job Application'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Stripe, Linear, Notion..."
                    value={formCompany}
                    onChange={e => setFormCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior Software Engineer"
                    value={formRole}
                    onChange={e => setFormRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Remote / San Francisco, CA"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Salary Range</label>
                  <input
                    type="text"
                    placeholder="$175k – $200k"
                    value={formSalary}
                    onChange={e => setFormSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Pipeline Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border bg-white focus:outline-none focus:border-brand"
                  >
                    {kanbanColumns.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={formFollowUp}
                    onChange={e => setFormFollowUp(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Job Post URL</label>
                <input
                  type="url"
                  placeholder="https://company.com/careers/..."
                  value={formJobUrl}
                  onChange={e => setFormJobUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">Strategic Notes & Referral Context</label>
                <textarea
                  rows={3}
                  placeholder="Referral name, hiring manager info, tech stack focus..."
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-border focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-soft"
                >
                  {editingId ? 'Save Changes' : 'Add Application'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

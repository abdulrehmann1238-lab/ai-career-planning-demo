import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  Trash2, 
  Sparkles, 
  Award, 
  Calendar, 
  FileText, 
  MessageSquare,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SavedItem } from '../../types';

export const SavedItemsPage: React.FC = () => {
  const { savedItems, removeSavedItem, addToast, setAppSubpage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'conversation', label: 'AI Discussions', icon: MessageSquare },
    { id: 'interview_feedback', label: 'Interview Feedback', icon: Award },
    { id: 'recommendation', label: 'Career Recommendations', icon: Sparkles },
    { id: 'task', label: 'Key Tasks', icon: Calendar },
    { id: 'note', label: 'Notes & Frameworks', icon: FileText }
  ];

  const filteredItems = savedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('info', 'Copied to Clipboard', 'Text copied successfully.');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Saved Items & Library</h2>
          <p className="text-xs text-text-secondary mt-0.5 font-secondary">
            Your centralized collection of AI coaching notes, rubric feedback, and interview strategies.
          </p>
        </div>

        <span className="text-xs font-bold text-brand bg-brand-soft px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {savedItems.length} Saved Assets
        </span>
      </div>

      {/* 2. SEARCH & CATEGORY FILTER BAR */}
      <div className="p-4 rounded-xl bg-white border border-surface-border shadow-soft flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search saved feedback, scripts, notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-surface-border text-xs focus:outline-none focus:border-brand"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-brand text-white shadow-soft'
                  : 'bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* 3. SAVED ITEMS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(item => {
          return (
            <div
              key={item.id}
              className="p-5 rounded-card bg-white border border-surface-border shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    {item.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-text-muted">{item.createdAt}</span>
                </div>

                <h3 className="text-sm font-bold text-text-primary mt-2.5 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-text-secondary mt-2 leading-relaxed line-clamp-4 font-secondary whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                <button
                  onClick={() => handleCopy(item.id, `${item.title}\n\n${item.content}`)}
                  className="inline-flex items-center gap-1.5 text-text-secondary hover:text-brand font-semibold"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => removeSavedItem(item.id)}
                  className="p-1 rounded text-text-muted hover:text-status-danger transition-colors"
                  title="Remove from saved items"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-xs text-text-muted bg-white rounded-card border border-surface-border space-y-2">
            <Bookmark className="w-8 h-8 text-text-muted/40 mx-auto" />
            <p className="font-semibold text-text-primary">No saved items found</p>
            <p>Save interview feedback or coaching insights to access them anytime here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

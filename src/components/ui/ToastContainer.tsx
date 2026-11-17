import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />;
        let borderColor = 'border-status-success/30';
        let bg = 'bg-white';

        if (toast.type === 'danger') {
          icon = <XCircle className="w-5 h-5 text-status-danger shrink-0" />;
          borderColor = 'border-status-danger/30';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-status-warning shrink-0" />;
          borderColor = 'border-status-warning/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-brand shrink-0" />;
          borderColor = 'border-brand/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border ${borderColor} ${bg} shadow-soft-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary leading-tight">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-primary p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

import React from 'react';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle 
} from 'lucide-react';
import { useAppStore, ToastMessage } from '../../store/useAppStore';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAppStore();

  if (toasts.length === 0) return null;

  const getToastStyles = (type: ToastMessage['type']) => {
    switch (type) {
      case 'ALERT':
        return {
          icon: <AlertCircle className="w-5 h-5 text-[#D9363E] shrink-0" />,
          borderLeft: 'border-l-4 border-l-[#D9363E]',
          badgeBg: 'bg-red-50 text-[#D9363E] border-red-200'
        };
      case 'WARNING':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-[#F39A24] shrink-0" />,
          borderLeft: 'border-l-4 border-l-[#F39A24]',
          badgeBg: 'bg-amber-50 text-[#F39A24] border-amber-200'
        };
      case 'SUCCESS':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-[#159B69] shrink-0" />,
          borderLeft: 'border-l-4 border-l-[#159B69]',
          badgeBg: 'bg-emerald-50 text-[#159B69] border-emerald-200'
        };
      case 'INFO':
      default:
        return {
          icon: <Info className="w-5 h-5 text-[#1479C9] shrink-0" />,
          borderLeft: 'border-l-4 border-l-[#1479C9]',
          badgeBg: 'bg-blue-50 text-[#1479C9] border-blue-200'
        };
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-md w-full pointer-events-none select-none">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border border-slate-200 shadow-2xl bg-white flex items-start justify-between space-x-3 transition-all ${styles.borderLeft}`}
          >
            <div className="flex items-start space-x-3 min-w-0">
              <div className="mt-0.5 shrink-0">{styles.icon}</div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#082B4C] leading-snug tracking-tight">
                  {toast.title}
                </span>
                <span className="text-xs font-medium text-[#334155] mt-1 leading-relaxed">
                  {toast.message}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#64748B] mt-1.5 flex items-center space-x-1">
                  <span>⏱</span>
                  <span>{toast.timestamp}</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#64748B] hover:text-[#082B4C] hover:bg-slate-100 p-1 rounded-lg transition-colors shrink-0"
              title="Dismiss Notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

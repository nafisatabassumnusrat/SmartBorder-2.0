import React, { useEffect, useState } from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { alertService } from '../../services/alertService';
import { Alert } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationOpen, toggleNotification, setActiveTab, language, dataRevision, bumpDataRevision } = useAppStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await alertService.getAlerts();
      setAlerts(data.slice(0, 8));
    };
    if (isNotificationOpen) {
      fetchAlerts();
    }
  }, [isNotificationOpen, dataRevision]);

  if (!isNotificationOpen) return null;

  const handleAcknowledge = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await alertService.updateAlertStatus(id, 'ACKNOWLEDGED', 'Quick acknowledge from Notification Center');
    bumpDataRevision();
  };

  const handleOpenAlertCenter = () => {
    toggleNotification();
    setActiveTab('event-alerts');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white text-[#0F172A] shadow-2xl flex flex-col h-full border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#2386C8]/10 text-[#2386C8]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#10243A]">
                {language === 'BN' ? 'অপারেশনাল নোটিফিকেশন সেন্টার' : 'Operational Notification Center'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'BN' ? 'সর্বশেষ সীমান্ত সতর্কবার্তা ও কার্যক্রম' : 'Live border alerts and sensor updates'}
              </p>
            </div>
          </div>
          <button 
            onClick={toggleNotification}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2 opacity-80" />
              <p className="text-sm font-medium">
                {language === 'BN' ? 'কোনো অমীমাংসিত সতর্কতা নেই' : 'All clear. No pending alerts.'}
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-[#2386C8] transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      alert.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                      alert.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    }`}>
                      {alert.priority}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {alert.alertCode}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center space-x-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{formatRelativeTime(alert.timestamp)}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#10243A] mt-1.5 leading-snug">
                  {alert.title}
                </h4>

                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {alert.aiReasoning}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium truncate max-w-[200px]">
                    📍 {alert.sector}
                  </span>

                  {alert.status === 'PENDING_TRIAGE' ? (
                    <button
                      onClick={(e) => handleAcknowledge(alert.id, e)}
                      className="px-2 py-1 rounded bg-[#2386C8]/10 text-[#2386C8] hover:bg-[#2386C8] hover:text-white font-medium text-[10px] transition-colors"
                    >
                      {language === 'BN' ? 'স্বীকার করুন' : 'Acknowledge'}
                    </button>
                  ) : (
                    <span className="text-emerald-500 font-medium text-[10px] flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{alert.status}</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-[#F8FAFC]">
          <button
            onClick={handleOpenAlertCenter}
            className="w-full py-2 px-3 rounded-lg bg-[#10243A] text-white hover:bg-[#173B5C] font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
          >
            <span>{language === 'BN' ? 'সম্পূর্ণ অ্যালার্ট সেন্টারে যান' : 'Go to Full Event & Alert Center'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  Layers, 
  Eye, 
  Check, 
  X, 
  Share2,
  ExternalLink
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { alertService } from '../../services/alertService';
import { Alert, AlertPriority, AlertStatus } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

export const EventAlertCenter: React.FC = () => {
  const { language, dataRevision, bumpDataRevision, addToast, setActiveTab } = useAppStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await alertService.getAlerts();
      setAlerts(data);
      if (data.length > 0 && !selectedAlert) {
        setSelectedAlert(data[0]);
      }
    };
    fetchAlerts();
  }, [dataRevision]);

  const handleUpdateStatus = async (alertId: string, status: AlertStatus, note: string) => {
    await alertService.updateAlertStatus(alertId, status, note);
    bumpDataRevision();
    addToast({
      type: status === 'ACKNOWLEDGED' || status === 'RESOLVED' ? 'SUCCESS' : 'WARNING',
      title: `Alert Status: ${status}`,
      message: `Alert record ${alertId} updated. Audit trail appended.`
    });
  };

  const filtered = alerts.filter((a) => {
    const matchesPriority = filterPriority === 'ALL' || a.priority === filterPriority;
    const matchesStatus = filterStatus === 'ALL' || a.status === filterStatus;
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.alertCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesStatus && matchesSearch;
  });

  return (
    <div className="pb-12">
      <PageHeader
        category="OPERATIONS"
        categoryBn="অপারেশন ও মাঠ কার্যক্রম"
        title={language === 'BN' ? 'ইভেন্ট ও অ্যালার্ট নিয়ন্ত্রণ কেন্দ্র' : 'Event & Alert Center – Real-Time Incident Stream'}
        subtitle={language === 'BN' 
          ? 'রিয়েল-টাইম সীমান্ত অ্যালার্ট টাইমলাইন, স্বয়ংক্রিয় ট্রায়াজ ও সেন্সর উৎস সমন্বয়' 
          : 'Centralized operational alarm triage correlating sensor detections with BGB sector response commands'}
        statusBadge="ACTIVE REAL-TIME EVENT STREAM"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Filter and Search Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by code, title, or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#10243A] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">PRIORITY:</span>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  filterPriority === p 
                    ? 'bg-[#10243A] text-white ' 
                    : 'text-slate-600  hover:bg-slate-100 '
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Triage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Alerts Stream Table / Cards (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#10243A]">
                  Chronological Border Event Stream
                </h3>
                <span className="text-xs font-bold text-[#2386C8]">
                  {filtered.length} Matching Alerts
                </span>
              </div>

              <div className="space-y-3">
                {filtered.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedAlert?.id === alert.id
                        ? 'bg-blue-50/60  border-[#2386C8] shadow-xs'
                        : 'border-slate-200  hover:bg-slate-50 '
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          alert.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                          alert.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                          'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        }`}>
                          {alert.priority}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-500">
                          {alert.alertCode}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 flex items-center space-x-1 shrink-0 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeTime(alert.timestamp)}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-[#10243A] mt-1.5 leading-snug">
                      {alert.title}
                    </h4>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {alert.aiReasoning}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 truncate max-w-[240px]">
                        📍 {alert.sector}
                      </span>
                      <span className={`font-semibold text-[11px] ${
                        alert.status === 'PENDING_TRIAGE' ? 'text-amber-600' :
                        alert.status === 'ACKNOWLEDGED' ? 'text-blue-600' :
                        'text-emerald-600'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Selected Alert Dossier & Triage Action Desk (1 column) */}
          <div className="space-y-4">
            {selectedAlert && (
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                  INCIDENT DOSSIER & AI REASONING
                </div>

                <div className="mt-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      selectedAlert.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-600' :
                      selectedAlert.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-600' :
                      'bg-blue-500/10 text-blue-600'
                    }`}>
                      {selectedAlert.priority}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {selectedAlert.alertCode}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#10243A] mt-2 leading-snug">
                    {selectedAlert.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Sector:</span>
                      <span className="font-semibold text-slate-800">{selectedAlert.sector}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Originating Module:</span>
                      <span className="font-semibold text-[#2386C8]">{selectedAlert.moduleOrigin || 'Unified Sensor'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">AI Confidence:</span>
                      <span className="font-mono font-bold text-emerald-600">{(selectedAlert.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Current Status:</span>
                      <span className="font-bold text-slate-800">{selectedAlert.status}</span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <strong>Sensor Attribution & AI Reasoning:</strong> {selectedAlert.aiReasoning}
                  </div>
                </div>

                {/* Triage Actions */}
                <div className="mt-5 pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold mb-2">
                    COMMAND RESPONSE ACTION:
                  </div>

                  <button
                    onClick={() => handleUpdateStatus(selectedAlert.id, 'ACKNOWLEDGED', 'Duty Officer acknowledged via Triage Center')}
                    className="w-full py-2 px-3 rounded-lg bg-[#2386C8] hover:bg-[#1b6fa7] text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Acknowledge Threat</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedAlert.id, 'ESCALATED', 'Escalated to BGB Sector Commander & Intelligence Directorate')}
                    className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Escalate to Sector Command HQ</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedAlert.id, 'FALSE_POSITIVE', 'Classified as False Positive by Duty Officer')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Mark False Alarm / Dismiss</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


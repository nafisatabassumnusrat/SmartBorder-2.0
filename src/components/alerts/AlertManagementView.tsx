import React, { useEffect, useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  ArrowUpRight, 
  Layers, 
  Info,
  Clock,
  UserCheck,
  Send
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { alertService } from '../../services/alertService';
import { incidentService } from '../../services/incidentService';
import { observationService } from '../../services/observationService';
import { Alert, AlertPriority, AlertStatus, Observation } from '../../types';
import { getPriorityBadgeColor, getAlertStatusBadge, formatRelativeTime, formatDate } from '../../utils/formatters';

export const AlertManagementView: React.FC = () => {
  const { dataRevision, bumpDataRevision, addToast, setActiveTab, currentUser } = useAppStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [operatorNotes, setOperatorNotes] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      const list = await alertService.getAlerts({
        status: statusFilter !== 'ALL' ? (statusFilter as AlertStatus) : undefined,
        priority: priorityFilter !== 'ALL' ? (priorityFilter as AlertPriority) : undefined,
        query: searchQuery
      });
      setAlerts(list);
      if (list.length > 0) {
        if (!selectedAlert || !list.some((a) => a.id === selectedAlert.id)) {
          setSelectedAlert(list[0]);
        }
      } else {
        setSelectedAlert(null);
      }
    };
    fetchAlerts();
  }, [dataRevision, statusFilter, priorityFilter, searchQuery]);

  useEffect(() => {
    const fetchObs = async () => {
      if (selectedAlert) {
        const obs = await observationService.getObservationById(selectedAlert.observationId);
        setSelectedObs(obs);
      } else {
        setSelectedObs(null);
      }
    };
    fetchObs();
  }, [selectedAlert]);

  const handleUpdateStatus = async (newStatus: AlertStatus) => {
    if (!selectedAlert) return;

    try {
      setIsProcessing(true);
      const updated = await alertService.updateAlertStatus(
        selectedAlert.id,
        newStatus,
        operatorNotes.trim() ? operatorNotes.trim() : undefined
      );
      setSelectedAlert(updated);
      bumpDataRevision();
      setOperatorNotes('');
      addToast({
        type: 'SUCCESS',
        title: `Alert ${updated.alertCode} ${newStatus}`,
        message: `Updated status by ${currentUser.name} (${currentUser.role}).`
      });
    } catch (err: unknown) {
      addToast({
        type: 'ALERT',
        title: 'Action Failed',
        message: err instanceof Error ? err.message : 'Permission denied or update error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEscalateToIncident = async () => {
    if (!selectedAlert) return;

    try {
      setIsProcessing(true);
      // 1. Update alert status to ESCALATED
      await alertService.updateAlertStatus(selectedAlert.id, 'ESCALATED', 'Escalated to formal incident verification');

      // 2. Create Incident
      const newInc = await incidentService.createIncidentFromAlert({
        alertId: selectedAlert.id,
        title: selectedAlert.title,
        severity: selectedAlert.priority,
        sector: selectedAlert.sector,
        coordinates: selectedObs ? selectedObs.coordinates : { lat: 31.7820, lng: -106.4420 },
        description: selectedAlert.aiReasoning,
        recommendedAction: 'Dispatch aerial verification pass and notify border tactical watch officer.',
        observationId: selectedAlert.observationId
      });

      bumpDataRevision();
      addToast({
        type: 'SUCCESS',
        title: `Incident ${newInc.incidentCode} Created`,
        message: `Alert escalated to Incident Management for formal verification.`
      });
      setActiveTab('incidents');
    } catch (err: unknown) {
      addToast({
        type: 'ALERT',
        title: 'Escalation Failed',
        message: err instanceof Error ? err.message : 'Permission denied'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
              <span>Tactical Alert Management</span>
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              CLUSTER DEDUPLICATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time alert inbox with spatial-temporal deduplication clustering, AI reasoning explanations, and human-in-the-loop triage.
          </p>
        </div>

        {/* Pending Counter */}
        <div className="flex items-center space-x-3 bg-[#0D1526] border border-[#1E293B] px-3.5 py-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-300">PENDING:</span>
            <span className="text-red-400 font-bold">
              {alerts.filter((a) => a.status === 'PENDING_TRIAGE').length}
            </span>
          </div>
          <div className="w-px h-3.5 bg-slate-700" />
          <div className="text-slate-400">
            TOTAL: <span className="text-slate-200">{alerts.length}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 5 Cols List & 7 Cols Details Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filterable Alert Inbox (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search alert code, title, sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080D1A] border border-[#1E293B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['ALL', 'PENDING_TRIAGE', 'ACKNOWLEDGED', 'ESCALATED', 'DISMISSED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    statusFilter === st
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-[#080D1A] text-slate-400 border border-[#1E293B] hover:text-slate-200'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-1 border-t border-[#1E293B] text-[10px] font-mono text-slate-400">
              <span>Priority:</span>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-1.5 py-0.5 rounded ${
                    priorityFilter === p ? 'text-emerald-400 font-bold underline' : 'hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Alert Cards List */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {alerts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 bg-[#0D1526] border border-[#1E293B] rounded-xl text-xs">
                No alerts matching active filters.
              </div>
            ) : (
              alerts.map((alert) => {
                const isSelected = selectedAlert?.id === alert.id;
                const badge = getPriorityBadgeColor(alert.priority);
                const statusBadge = getAlertStatusBadge(alert.status);

                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#131E35] border-emerald-500/40 shadow-md'
                        : 'bg-[#0D1526] border-[#1E293B] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {alert.priority}
                        </span>
                        <span className="font-mono font-bold text-slate-200">{alert.alertCode}</span>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${statusBadge.bg} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-100 leading-snug">
                      {alert.title}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-[#1E293B]/40">
                      <span>{alert.sector}</span>
                      <div className="flex items-center space-x-2">
                        {alert.clusterCount > 1 && (
                          <span className="flex items-center space-x-1 text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/30">
                            <Layers className="w-2.5 h-2.5" />
                            <span>{alert.clusterCount} Grouped</span>
                          </span>
                        )}
                        <span>{formatRelativeTime(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Alert Details & Triage Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedAlert ? (
            <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-5 shadow-sm">
              {/* Alert Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-xs text-emerald-400 font-bold">{selectedAlert.alertCode}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${getAlertStatusBadge(selectedAlert.status).bg} ${getAlertStatusBadge(selectedAlert.status).text}`}>
                      {getAlertStatusBadge(selectedAlert.status).label}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-slate-100">{selectedAlert.title}</h2>
                </div>

                <div className="text-right font-mono text-xs">
                  <div className="text-slate-400 text-[10px]">AI CONFIDENCE</div>
                  <div className="text-emerald-400 font-bold text-base">{(selectedAlert.confidence * 100).toFixed(1)}%</div>
                </div>
              </div>

              {/* Attached Evidence Frame */}
              {selectedObs && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Attached Drone Evidence Frame</span>
                    <span>{selectedObs.deviceCallsign} • {selectedObs.spectralBand}</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-[#1E293B] aspect-video bg-black">
                    <img
                      src={selectedObs.evidenceFullFrame}
                      alt="Alert Evidence"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                      Coordinates: {selectedObs.coordinates.lat.toFixed(4)}, {selectedObs.coordinates.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              )}

              {/* Explainable AI Reasoning Box */}
              <div className="p-3.5 rounded-lg bg-[#080D1A] border border-[#1E293B] space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-xs font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Explainable AI Factor: Why Was This Flagged?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedAlert.aiReasoning}
                </p>
              </div>

              {/* Deduplication Cluster Simulation Details */}
              {selectedAlert.clusterCount > 1 && (
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-start space-x-2 text-xs text-purple-300">
                  <Layers className="w-4 h-4 shrink-0 mt-0.5 text-purple-400" />
                  <div>
                    <strong className="font-semibold text-purple-200">Duplicate Clustering Simulation:</strong> {selectedAlert.clusterCount} raw drone detections within a 60-second window were merged into this single actionable alert to prevent operator alert fatigue.
                  </div>
                </div>
              )}

              {/* Operator Notes Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                  Reviewer Triage Notes:
                </label>
                <textarea
                  rows={2}
                  value={operatorNotes}
                  onChange={(e) => setOperatorNotes(e.target.value)}
                  placeholder="Enter verification notes or rationale for dismissal..."
                  className="w-full bg-[#080D1A] border border-[#1E293B] rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Triage Action Controls (Role-enforced) */}
              <div className="border-t border-[#1E293B] pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-slate-400">
                  Current Operator: <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.role})
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Acknowledge */}
                  {selectedAlert.status === 'PENDING_TRIAGE' && (
                    <button
                      onClick={() => handleUpdateStatus('ACKNOWLEDGED')}
                      disabled={isProcessing}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors shadow-sm"
                    >
                      Acknowledge
                    </button>
                  )}

                  {/* Dismiss */}
                  <button
                    onClick={() => handleUpdateStatus('DISMISSED')}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded-lg bg-[#131E35] hover:bg-slate-700 text-slate-300 border border-[#1E293B] text-xs font-mono font-medium transition-colors"
                  >
                    Dismiss (Benign)
                  </button>

                  {/* False Positive */}
                  <button
                    onClick={() => handleUpdateStatus('FALSE_POSITIVE')}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded-lg bg-[#131E35] hover:bg-rose-950/40 text-rose-400 border border-rose-500/30 text-xs font-mono font-medium transition-colors"
                  >
                    False Positive
                  </button>

                  {/* Escalate to Incident */}
                  <button
                    onClick={handleEscalateToIncident}
                    disabled={isProcessing}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium transition-colors shadow-sm shadow-emerald-950"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Escalate to Incident</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-[#0D1526] border border-[#1E293B] rounded-xl text-xs">
              Select an alert from the inbox to inspect evidence and execute triage actions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

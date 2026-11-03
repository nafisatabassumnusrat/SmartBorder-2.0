import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  UserCheck, 
  Clock, 
  FileText, 
  Send, 
  Search, 
  MessageSquare, 
  AlertTriangle 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { incidentService } from '../../services/incidentService';
import { userService } from '../../services/userService';
import { Incident, IncidentStatus, User } from '../../types';
import { getIncidentStatusBadge, formatRelativeTime, formatDate, formatCoordinates } from '../../utils/formatters';

export const IncidentManagementView: React.FC = () => {
  const { dataRevision, bumpDataRevision, addToast, currentUser } = useAppStore();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newNote, setNewNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      const list = await incidentService.getIncidents({
        status: statusFilter !== 'ALL' ? (statusFilter as IncidentStatus) : undefined,
        query: searchQuery
      });
      setIncidents(list);
      if (list.length > 0) {
        if (!selectedIncident || !list.some((i) => i.id === selectedIncident.id)) {
          setSelectedIncident(list[0]);
        }
      } else {
        setSelectedIncident(null);
      }
      const uList = await userService.getAllUsers();
      setUsers(uList);
    };
    fetchIncidents();
  }, [dataRevision, statusFilter, searchQuery]);

  const handleDecision = async (decision: 'VERIFIED' | 'REJECTED' | 'REQUEST_INFO' | 'NOTE_ADDED') => {
    if (!selectedIncident) return;
    if (!newNote.trim()) {
      addToast({
        type: 'WARNING',
        title: 'Reviewer Notes Required',
        message: 'Please provide rationale or instructions in the notes box before confirming your decision.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const updated = await incidentService.addDecision(selectedIncident.id, decision, newNote.trim());
      setSelectedIncident(updated);
      bumpDataRevision();
      setNewNote('');
      addToast({
        type: 'SUCCESS',
        title: `Decision Recorded: ${decision}`,
        message: `Incident ${updated.incidentCode} status updated to ${updated.status}.`
      });
    } catch (err: unknown) {
      addToast({
        type: 'ALERT',
        title: 'Action Denied',
        message: err instanceof Error ? err.message : 'Permission check failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignReviewer = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedIncident) return;
    const revId = e.target.value;
    const foundUser = users.find((u) => u.id === revId);
    if (!foundUser) return;

    try {
      const updated = await incidentService.assignReviewer(selectedIncident.id, foundUser.id, foundUser.name);
      setSelectedIncident(updated);
      bumpDataRevision();
      addToast({
        type: 'SUCCESS',
        title: 'Reviewer Assigned',
        message: `${foundUser.name} (${foundUser.role}) assigned to ${updated.incidentCode}.`
      });
    } catch (err: unknown) {
      addToast({
        type: 'ALERT',
        title: 'Assignment Failed',
        message: err instanceof Error ? err.message : 'Failed to assign reviewer'
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
              <span>Incident Verification &amp; Review Workspace</span>
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              AUDIT COMPLIANT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Formal human verification workflow for escalated border security events with reviewer assignment, evidence chain, and decision audit timeline.
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center space-x-3 bg-[#0D1526] border border-[#1E293B] px-3.5 py-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-slate-300">OPEN:</span>
            <span className="text-amber-400 font-bold">
              {incidents.filter((i) => i.status === 'UNDER_INVESTIGATION' || i.status === 'INFO_REQUESTED').length}
            </span>
          </div>
          <div className="w-px h-3.5 bg-slate-700" />
          <div className="text-slate-400">
            TOTAL: <span className="text-slate-200">{incidents.length}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 5 Cols List & 7 Cols Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Incidents List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search incident code, title, reviewer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080D1A] border border-[#1E293B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['ALL', 'UNDER_INVESTIGATION', 'VERIFIED_BREACH', 'RESOLVED', 'REJECTED', 'INFO_REQUESTED'].map((st) => (
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
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {incidents.length === 0 ? (
              <div className="p-8 text-center text-slate-500 bg-[#0D1526] border border-[#1E293B] rounded-xl text-xs">
                No incidents matching active filters.
              </div>
            ) : (
              incidents.map((inc) => {
                const isSelected = selectedIncident?.id === inc.id;
                const statusBadge = getIncidentStatusBadge(inc.status);

                return (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#131E35] border-emerald-500/40 shadow-md'
                        : 'bg-[#0D1526] border-[#1E293B] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-200">{inc.incidentCode}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusBadge.bg}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-100 leading-snug">{inc.title}</div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-[#1E293B]/40">
                      <span>Reviewer: {inc.assignedReviewerName}</span>
                      <span>{formatRelativeTime(inc.updatedAt)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Incident Workspace & Timeline (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedIncident ? (
            <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-5 shadow-sm">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-xs text-emerald-400 font-bold">{selectedIncident.incidentCode}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getIncidentStatusBadge(selectedIncident.status).bg}`}>
                      {getIncidentStatusBadge(selectedIncident.status).label}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-slate-100">{selectedIncident.title}</h2>
                </div>

                {/* Lead Reviewer Selector */}
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Assigned Reviewer</span>
                  <select
                    value={selectedIncident.assignedReviewerId}
                    onChange={handleAssignReviewer}
                    className="mt-0.5 bg-[#080D1A] border border-[#1E293B] rounded px-2 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Incident Synopsis & Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
                  <span className="text-slate-500 text-[10px] block">COORDINATES &amp; SECTOR</span>
                  <div className="text-slate-200 font-semibold">{selectedIncident.sector}</div>
                  <div className="text-emerald-400 text-[11px] mt-0.5">
                    {formatCoordinates(selectedIncident.coordinates.lat, selectedIncident.coordinates.lng)}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
                  <span className="text-slate-500 text-[10px] block">RECOMMENDED ACTION</span>
                  <div className="text-amber-300 font-sans text-xs mt-0.5 leading-snug">
                    {selectedIncident.recommendedAction}
                  </div>
                </div>
              </div>

              {/* Evidence Chain References */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Evidence Chain of Custody
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.evidenceReferences.map((ref, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-[#080D1A] border border-[#1E293B] text-slate-300"
                    >
                      📎 {ref}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviewer Verification Actions */}
              <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-slate-200 uppercase tracking-wider">
                    Operator Decision &amp; Verification Action
                  </span>
                  <span className="text-slate-400">
                    Logged as: <strong className="text-emerald-400">{currentUser.name}</strong> ({currentUser.role})
                  </span>
                </div>

                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Mandatory reviewer rationale: State evidence observed, consensus reached, or rescan needed..."
                  className="w-full bg-[#0D1526] border border-[#1E293B] rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => handleDecision('NOTE_ADDED')}
                    disabled={isSubmitting}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#131E35] hover:bg-slate-700 text-slate-300 border border-[#1E293B] text-xs font-mono transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Add Note Only</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecision('REQUEST_INFO')}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors"
                    >
                      Request Info / Rescan
                    </button>

                    <button
                      onClick={() => handleDecision('REJECTED')}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 rounded-lg bg-[#131E35] hover:bg-rose-950/40 text-rose-400 border border-rose-500/30 text-xs font-mono font-medium transition-colors"
                    >
                      Reject Incident
                    </button>

                    <button
                      onClick={() => handleDecision('VERIFIED')}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium transition-colors shadow-sm shadow-emerald-950"
                    >
                      Verify Threat Breach
                    </button>
                  </div>
                </div>
              </div>

              {/* Immutable Decision History Timeline */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Immutable Decision Audit Trail ({selectedIncident.decisionHistory.length} Entries)
                </span>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {selectedIncident.decisionHistory.map((dec) => (
                    <div
                      key={dec.id}
                      className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              dec.decision === 'VERIFIED'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : dec.decision === 'REJECTED'
                                ? 'bg-rose-500/20 text-rose-300'
                                : dec.decision === 'REQUEST_INFO'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {dec.decision}
                          </span>
                          <span className="font-semibold text-slate-200">
                            {dec.userName} ({dec.userRole})
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">{formatDate(dec.timestamp)}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed pt-0.5">{dec.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-[#0D1526] border border-[#1E293B] rounded-xl text-xs">
              Select an incident to view evidence and record reviewer decisions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

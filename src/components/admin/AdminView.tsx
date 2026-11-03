import React, { useEffect, useState } from 'react';
import { 
  Settings, 
  Users, 
  Radio, 
  ShieldCheck, 
  FileText, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  AlertTriangle 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { userService } from '../../services/userService';
import { deviceService } from '../../services/deviceService';
import { settingsService } from '../../services/settingsService';
import { auditService } from '../../services/auditService';
import { User, Device, AppSettings, AuditLog, UserRole } from '../../types';
import { getDeviceStatusBadge, formatDate } from '../../utils/formatters';

export const AdminView: React.FC = () => {
  const { dataRevision, bumpDataRevision, addToast, currentUser } = useAppStore();
  const [users, setUsers] = useState<User[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'USERS' | 'DEVICES' | 'SETTINGS' | 'AUDIT'>('USERS');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      const [uList, dList, sData, aList] = await Promise.all([
        userService.getAllUsers(),
        deviceService.getDevices(),
        settingsService.getSettings(),
        auditService.getLogs()
      ]);
      setUsers(uList);
      setDevices(dList);
      setSettings(sData);
      setAuditLogs(aList);
    };
    fetchAdminData();
  }, [dataRevision]);

  const handleRunDiagnostic = async (deviceId: string) => {
    try {
      const res = await deviceService.runDiagnostics(deviceId);
      bumpDataRevision();
      addToast({
        type: 'SUCCESS',
        title: 'Diagnostic Test Passed',
        message: res.report
      });
    } catch (err: unknown) {
      addToast({
        type: 'ALERT',
        title: 'Diagnostic Failed',
        message: err instanceof Error ? err.message : 'Diagnostic execution failed'
      });
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    try {
      setIsSaving(true);
      await settingsService.updateSettings(settings);
      bumpDataRevision();
      addToast({
        type: 'SUCCESS',
        title: 'Settings Saved',
        message: 'Platform configuration updated successfully.'
      });
    } catch (err: unknown) {
      addToast({
        type: 'ALERT',
        title: 'Save Failed',
        message: err instanceof Error ? err.message : 'Permission denied: Admin only'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const ROLE_PERMISSIONS: { permission: string; admin: boolean; analyst: boolean; reviewer: boolean; viewer: boolean }[] = [
    { permission: 'View Live Feeds & Tactical Map', admin: true, analyst: true, reviewer: true, viewer: true },
    { permission: 'Export Reports (CSV & PDF Briefing)', admin: true, analyst: true, reviewer: true, viewer: true },
    { permission: 'Acknowledge & Triage Alerts', admin: true, analyst: true, reviewer: true, viewer: false },
    { permission: 'Verify / Reject Incidents', admin: true, analyst: false, reviewer: true, viewer: false },
    { permission: 'Create Observations & Annotate AI', admin: true, analyst: true, reviewer: false, viewer: false },
    { permission: 'Execute Hardware BIT Diagnostics', admin: true, analyst: true, reviewer: false, viewer: false },
    { permission: 'Update Platform Configurations & Thresholds', admin: true, analyst: false, reviewer: false, viewer: false },
    { permission: 'Reset Demo Database Fixtures', admin: true, analyst: false, reviewer: false, viewer: false }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
              <span>System Administration &amp; Security</span>
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ROLE ENFORCED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            User access control, role-based permission matrix, surveillance hardware BIT diagnostics, and global security policies.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center bg-[#0D1526] border border-[#1E293B] rounded-lg p-1 space-x-1 font-mono text-xs">
          <button
            onClick={() => setActiveSubTab('USERS')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeSubTab === 'USERS'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Users &amp; Roles
          </button>
          <button
            onClick={() => setActiveSubTab('DEVICES')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeSubTab === 'DEVICES'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Device Registry
          </button>
          <button
            onClick={() => setActiveSubTab('SETTINGS')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeSubTab === 'SETTINGS'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveSubTab('AUDIT')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeSubTab === 'AUDIT'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: USERS & ROLE MATRIX */}
      {activeSubTab === 'USERS' && (
        <div className="space-y-6">
          {/* User List Cards */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Demonstration Accounts Registry</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                All accounts explicitly marked DEMO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((u) => {
                const isCurrent = currentUser.id === u.id;
                return (
                  <div
                    key={u.id}
                    className={`p-4 rounded-xl border space-y-3 ${
                      isCurrent
                        ? 'bg-[#131E35] border-emerald-500/50 shadow-md'
                        : 'bg-[#080D1A] border-[#1E293B]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-200 truncate">{u.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400">{u.role}</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-tight">
                      {u.department}
                    </div>

                    <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Status: {u.status}</span>
                      {u.isDemoAccount && (
                        <span className="text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          DEMO ONLY
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Role-Based Access Control (RBAC) Matrix */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Role-Based Access Control (RBAC) Permission Matrix</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1E293B] text-[10px] uppercase text-slate-400">
                    <th className="pb-2.5">Platform Action / Capability</th>
                    <th className="pb-2.5 text-center">Admin</th>
                    <th className="pb-2.5 text-center">Analyst</th>
                    <th className="pb-2.5 text-center">Reviewer</th>
                    <th className="pb-2.5 text-center">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]/60">
                  {ROLE_PERMISSIONS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#131E35]/40 transition-colors">
                      <td className="py-2.5 text-slate-300 font-sans">{row.permission}</td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${row.admin ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-600'}`}>
                          {row.admin ? '✓ ALLOW' : '✕'}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${row.analyst ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-600'}`}>
                          {row.analyst ? '✓ ALLOW' : '✕'}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${row.reviewer ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-600'}`}>
                          {row.reviewer ? '✓ ALLOW' : '✕'}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${row.viewer ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-600'}`}>
                          {row.viewer ? '✓ ALLOW' : '✕'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DEVICE REGISTRY & BIT DIAGNOSTICS */}
      {activeSubTab === 'DEVICES' && (
        <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Surveillance Hardware Fleet Registry</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">{devices.length} Nodes Registered</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => {
              const statusBadge = getDeviceStatusBadge(device.status);
              return (
                <div
                  key={device.id}
                  className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-100">{device.callsign}</div>
                      <div className="text-[10px] font-mono text-slate-400">{device.model}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${statusBadge.bg} ${statusBadge.text}`}>
                      {device.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 space-y-1 divide-y divide-[#1E293B]/40 pt-1">
                    <div className="flex justify-between py-1">
                      <span>Sector:</span>
                      <span className="text-slate-200">{device.assignedSector}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Firmware:</span>
                      <span className="text-slate-300">{device.firmwareVersion}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Battery / Power:</span>
                      <span className="text-emerald-400 font-bold">{device.batteryPct}%</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Calibration Expiry:</span>
                      <span className="text-slate-400">{device.calibrationExpires.slice(0, 10)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRunDiagnostic(device.id)}
                    className="w-full py-1.5 rounded-lg bg-[#131E35] hover:bg-[#1A2845] text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors"
                  >
                    Run Built-In Test (BIT)
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: APPLICATION SETTINGS */}
      {activeSubTab === 'SETTINGS' && settings && (
        <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Platform Engine Configuration</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Tune auto-escalation thresholds, telemetry retention windows, and alert clustering.
              </p>
            </div>

            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
            {/* Auto-escalate threshold */}
            <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Auto-Escalation Threshold</span>
                <span className="text-emerald-400 font-bold">{(settings.autoEscalateThreshold * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.70"
                max="0.99"
                step="0.01"
                value={settings.autoEscalateThreshold}
                onChange={(e) => setSettings({ ...settings, autoEscalateThreshold: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-sans">
                Observations with confidence at or above this threshold trigger automatic Critical priority alerts.
              </p>
            </div>

            {/* Retention window */}
            <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Data Retention Policy</span>
                <span className="text-slate-100 font-bold">{settings.retentionDays} Days</span>
              </div>
              <input
                type="range"
                min="7"
                max="90"
                step="1"
                value={settings.retentionDays}
                onChange={(e) => setSettings({ ...settings, retentionDays: parseInt(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-sans">
                Number of days recorded drone sessions and observation bounding boxes are retained in demo store.
              </p>
            </div>

            {/* Cluster Deduplication Toggle */}
            <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] flex items-center justify-between">
              <div>
                <div className="text-slate-300 font-semibold">Enable Cluster Deduplication</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                  Merge recurring drone frames within 60s into unified alerts.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.enableClusterDeduplication}
                onChange={(e) => setSettings({ ...settings, enableClusterDeduplication: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            {/* Operator Notes Required on Dismiss */}
            <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] flex items-center justify-between">
              <div>
                <div className="text-slate-300 font-semibold">Enforce Operator Dismiss Notes</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                  Require operator rationale before dismissing high priority alerts.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.operatorNotesRequiredOnDismiss}
                onChange={(e) => setSettings({ ...settings, operatorNotesRequiredOnDismiss: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: AUDIT TRAIL LOG */}
      {activeSubTab === 'AUDIT' && (
        <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Full Chronological Operational Audit Trail ({auditLogs.length} Events)</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E293B] text-[10px] uppercase text-slate-400">
                  <th className="pb-2.5">Timestamp (UTC)</th>
                  <th className="pb-2.5">User &amp; Role</th>
                  <th className="pb-2.5">Action Type</th>
                  <th className="pb-2.5">Details</th>
                  <th className="pb-2.5">Source IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/60">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#131E35]/40 transition-colors">
                    <td className="py-2 text-slate-400 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                    <td className="py-2 text-slate-200 whitespace-nowrap">
                      {log.userName} <span className="text-[10px] text-emerald-400">({log.userRole})</span>
                    </td>
                    <td className="py-2 font-bold text-slate-100">{log.action}</td>
                    <td className="py-2 text-slate-300 font-sans text-xs">{log.details}</td>
                    <td className="py-2 text-slate-500 text-[10px]">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

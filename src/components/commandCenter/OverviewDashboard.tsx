import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  Video, 
  Cpu, 
  Activity, 
  Zap, 
  Radio, 
  ArrowUpRight, 
  AlertTriangle,
  BatteryCharging,
  Compass,
  FileText
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { reportService, DashboardStats } from '../../services/reportService';
import { deviceService } from '../../services/deviceService';
import { alertService } from '../../services/alertService';
import { incidentService } from '../../services/incidentService';
import { auditService } from '../../services/auditService';
import { Device, Alert, Incident, AuditLog } from '../../types';
import { getPriorityBadgeColor, getDeviceStatusBadge, formatRelativeTime } from '../../utils/formatters';

export const OverviewDashboard: React.FC = () => {
  const { dataRevision, setActiveTab, stepSimulation, addToast } = useAppStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [pendingAlerts, setPendingAlerts] = useState<Alert[]>([]);
  const [activeIncidents, setActiveIncidents] = useState<Incident[]>([]);
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashStats, devList, alerts, incs, logs] = await Promise.all([
          reportService.getDashboardStats(),
          deviceService.getDevices(),
          alertService.getAlerts({ status: 'PENDING_TRIAGE' }),
          incidentService.getIncidents({ status: 'VERIFIED_BREACH' }),
          auditService.getLogs()
        ]);
        setStats(dashStats);
        setDevices(devList);
        setPendingAlerts(alerts);
        setActiveIncidents(incs);
        setRecentLogs(logs.slice(0, 6));
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataRevision]);

  const handleQuickSweep = async () => {
    addToast({
      type: 'INFO',
      title: 'Initiated Simulated Aerial Sweep',
      message: 'SkyGuard-Alpha 01 dispatched on simulated perimeter orbit.'
    });
    await stepSimulation();
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center space-y-3 text-slate-400">
          <Activity className="w-8 h-8 text-emerald-400 animate-spin" />
          <span className="text-xs font-mono">Synchronizing Command Center Feed...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
            <span>Command Center Overview</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              REAL-TIME
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of aerial surveillance drones, ground seismic sensors, AI edge inference, and alert triage.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleQuickSweep}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors shadow-sm font-mono"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Trigger Sweep</span>
          </button>

          <button
            onClick={() => setActiveTab('monitoring')}
            className="flex items-center space-x-1.5 bg-[#131E35] hover:bg-[#1A2845] text-slate-200 border border-[#1E293B] text-xs font-medium px-3 py-2 rounded-lg transition-colors font-mono"
          >
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className="flex items-center space-x-1.5 bg-[#131E35] hover:bg-[#1A2845] text-slate-200 border border-[#1E293B] text-xs font-medium px-3 py-2 rounded-lg transition-colors font-mono"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Briefing</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1: Pending Alerts */}
        <div 
          onClick={() => setActiveTab('alerts')}
          className="bg-[#0D1526] hover:bg-[#111C33] border border-[#1E293B] hover:border-red-500/40 p-4 rounded-xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Pending Alerts</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-slate-100">{stats?.pendingAlertsCount ?? 0}</span>
            <span className="text-[11px] font-medium text-red-400">Requires Triage</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>High Severity: {pendingAlerts.filter(a => a.priority === 'CRITICAL' || a.priority === 'HIGH').length}</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-red-400" />
          </div>
        </div>

        {/* Metric 2: Verified Incidents */}
        <div 
          onClick={() => setActiveTab('incidents')}
          className="bg-[#0D1526] hover:bg-[#111C33] border border-[#1E293B] hover:border-amber-500/40 p-4 rounded-xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Verified Breaches</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-amber-400">{activeIncidents.length}</span>
            <span className="text-[11px] font-medium text-slate-400">Active</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>Human-verified</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-amber-400" />
          </div>
        </div>

        {/* Metric 3: Active UAVs & Nodes */}
        <div 
          onClick={() => setActiveTab('monitoring')}
          className="bg-[#0D1526] hover:bg-[#111C33] border border-[#1E293B] hover:border-emerald-500/40 p-4 rounded-xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Aerial Drones</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">{stats?.activeDronesCount ?? 0}</span>
            <span className="text-[11px] font-medium text-slate-400">/ {devices.filter(d => d.type === 'DRONE_UAV').length} Active</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>Fixed Towers: {devices.filter(d => d.type === 'FIXED_TOWER').length}</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-400" />
          </div>
        </div>

        {/* Metric 4: Edge AI Latency */}
        <div 
          onClick={() => setActiveTab('ai-intelligence')}
          className="bg-[#0D1526] hover:bg-[#111C33] border border-[#1E293B] hover:border-blue-500/40 p-4 rounded-xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">AI Inference Time</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-slate-100">{stats?.avgModelLatencyMs ?? 14.2}</span>
            <span className="text-[11px] font-mono text-slate-400">ms / frame</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>Model: YOLOv8x-INT8</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Content Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Pending Alerts & Device Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Alerts Card */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-slate-100">Pending Tactical Alerts</h2>
              </div>
              <button
                onClick={() => setActiveTab('alerts')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center space-x-1"
              >
                <span>View All ({pendingAlerts.length})</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {pendingAlerts.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No alerts pending triage. All sensor detections are cleared.
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingAlerts.slice(0, 3).map((alert) => {
                  const badge = getPriorityBadgeColor(alert.priority);
                  return (
                    <div
                      key={alert.id}
                      onClick={() => setActiveTab('alerts')}
                      className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] hover:border-slate-600 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="flex items-start space-x-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border mt-0.5 ${badge.bg} ${badge.text} ${badge.border}`}>
                          {alert.priority}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-200">{alert.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{alert.sector} • Confidence: {(alert.confidence * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-right shrink-0">
                        <span className="text-[10px] font-mono text-slate-400">{formatRelativeTime(alert.timestamp)}</span>
                        <span className="text-xs text-emerald-400 hover:underline font-mono">Triage →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Device Registry Status Summary */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-slate-100">Surveillance Hardware Registry</h2>
              </div>
              <button
                onClick={() => setActiveTab('admin')}
                className="text-xs text-slate-400 hover:text-slate-200 font-mono flex items-center space-x-1"
              >
                <span>Manage Devices</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E293B] text-[10px] font-mono uppercase text-slate-400">
                    <th className="pb-2.5 font-semibold">Callsign &amp; Model</th>
                    <th className="pb-2.5 font-semibold">Assigned Sector</th>
                    <th className="pb-2.5 font-semibold">Status</th>
                    <th className="pb-2.5 font-semibold">Battery / Power</th>
                    <th className="pb-2.5 font-semibold">Calibration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]/60 font-mono">
                  {devices.map((device) => {
                    const statusBadge = getDeviceStatusBadge(device.status);
                    return (
                      <tr key={device.id} className="hover:bg-[#131E35]/40 transition-colors">
                        <td className="py-2.5">
                          <div className="font-semibold text-slate-200">{device.callsign}</div>
                          <div className="text-[10px] text-slate-400">{device.model}</div>
                        </td>
                        <td className="py-2.5 text-slate-300 font-sans text-xs">
                          {device.assignedSector}
                        </td>
                        <td className="py-2.5">
                          <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] ${statusBadge.bg} ${statusBadge.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                            <span>{device.status}</span>
                          </span>
                        </td>
                        <td className="py-2.5">
                          <div className="flex items-center space-x-1 text-slate-300">
                            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{device.batteryPct}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-[10px] text-slate-400">
                          Expires: {device.calibrationExpires.slice(0, 10)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): System Health & Recent Operational Activity */}
        <div className="space-y-6">
          {/* System Health Card */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Operational Health</span>
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                OPTIMAL
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Telemetry Ingestion</span>
                  <span className="text-emerald-400">99.9% Reliable</span>
                </div>
                <div className="w-full bg-[#1A253D] rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-[99.9%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Edge GPU Compute Load</span>
                  <span className="text-slate-200">42% Capacity</span>
                </div>
                <div className="w-full bg-[#1A253D] rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full w-[42%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Model Concept Drift</span>
                  <span className="text-slate-200">0.02 (Stable)</span>
                </div>
                <div className="w-full bg-[#1A253D] rounded-full h-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full w-[12%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Data Source Integrity</span>
                  <span className="text-amber-400">MOCK DATA VERIFIED</span>
                </div>
                <div className="w-full bg-[#1A253D] rounded-full h-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full w-[100%]" />
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#080D1A] border border-[#1E293B] text-[10px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Architecture Integration Target:</div>
              <div>FastAPI Gateway + PostgreSQL (pgvector) + Approved DoD Video Feed</div>
            </div>
          </div>

          {/* Recent Operational Activity Stream */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Audit &amp; Action Log</span>
              </h2>
              <button
                onClick={() => setActiveTab('admin')}
                className="text-[10px] text-slate-400 hover:text-slate-200 font-mono"
              >
                All Logs →
              </button>
            </div>

            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="border-l-2 border-emerald-500/40 pl-3 py-0.5 space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-slate-200">{log.action}</span>
                    <span className="text-slate-500">{formatRelativeTime(log.timestamp)}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{log.details}</p>
                  <div className="text-[9px] font-mono text-slate-500">
                    By: {log.userName} ({log.userRole})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

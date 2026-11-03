import React, { useEffect, useState } from 'react';
import { 
  FileBarChart, 
  Download, 
  Printer, 
  TrendingUp, 
  BarChart3,
  PieChart as PieIcon, 
  ShieldCheck, 
  CheckCircle,
  Clock,
  Layers,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useAppStore } from '../../store/useAppStore';
import { reportService, DashboardStats } from '../../services/reportService';
import { alertService } from '../../services/alertService';
import { incidentService } from '../../services/incidentService';
import { observationService } from '../../services/observationService';

const SECTOR_DISTRIBUTION_DATA = [
  { name: 'Sector Bravo-4', detections: 24, alerts: 14, verified: 3 },
  { name: 'Alpha Ridge', detections: 18, alerts: 8, verified: 1 },
  { name: 'Delta River', detections: 15, alerts: 6, verified: 1 },
  { name: 'Echo Perimeter', detections: 8, alerts: 2, verified: 0 }
];

const TEMPORAL_ALERT_TRENDS = [
  { time: '00:00', totalAlerts: 4, falsePositives: 1 },
  { time: '04:00', totalAlerts: 7, falsePositives: 2 },
  { time: '08:00', totalAlerts: 12, falsePositives: 1 },
  { time: '12:00', totalAlerts: 9, falsePositives: 1 },
  { time: '16:00', totalAlerts: 15, falsePositives: 3 },
  { time: '20:00', totalAlerts: 18, falsePositives: 2 },
  { time: '24:00', totalAlerts: 11, falsePositives: 1 }
];

const DETECTION_CLASS_PIE = [
  { name: 'Person', value: 42, color: '#10B981' },
  { name: 'Unauthorized Vehicle', value: 28, color: '#3B82F6' },
  { name: 'Barrier Damage', value: 16, color: '#EF4444' },
  { name: 'Wildlife', value: 14, color: '#F59E0B' }
];

export const ReportsView: React.FC = () => {
  const { dataRevision, addToast, currentUser } = useAppStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const s = await reportService.getDashboardStats();
      setStats(s);
    };
    fetchStats();
  }, [dataRevision]);

  const handleExportObservations = () => {
    reportService.exportObservationsCSV();
    addToast({
      type: 'SUCCESS',
      title: 'Observations CSV Exported',
      message: 'Downloaded complete observation dataset.'
    });
  };

  const handleExportAlerts = () => {
    reportService.exportAlertsCSV();
    addToast({
      type: 'SUCCESS',
      title: 'Alerts CSV Exported',
      message: 'Downloaded tactical alert digest.'
    });
  };

  const handleExportIncidents = () => {
    reportService.exportIncidentsCSV();
    addToast({
      type: 'SUCCESS',
      title: 'Incidents CSV Exported',
      message: 'Downloaded incident decisions and audit timeline.'
    });
  };

  const handlePrintReport = () => {
    reportService.triggerPrintPDF();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
              <span>Operational Reports &amp; Predictive Analytics</span>
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              AUDIT COMPLIANT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated intelligence metrics, false positive rates over time, sector threat heat distributions, and instant data exports.
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportObservations}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0D1526] hover:bg-[#131E35] text-slate-200 border border-[#1E293B] text-xs font-mono font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Observations CSV</span>
          </button>

          <button
            onClick={handleExportAlerts}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0D1526] hover:bg-[#131E35] text-slate-200 border border-[#1E293B] text-xs font-mono font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Alerts CSV</span>
          </button>

          <button
            onClick={handleExportIncidents}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0D1526] hover:bg-[#131E35] text-slate-200 border border-[#1E293B] text-xs font-mono font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Incidents CSV</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium transition-colors shadow-sm shadow-emerald-950"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF Briefing</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0D1526] border border-[#1E293B]">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">Total Detections Logged</span>
          <span className="text-2xl font-bold font-mono text-slate-100">{stats?.totalObservationsCount ?? 0}</span>
          <div className="text-[10px] font-mono text-emerald-400 mt-1">100% Ingestion Integrity</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1526] border border-[#1E293B]">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">Mean Time to Acknowledge</span>
          <span className="text-2xl font-bold font-mono text-emerald-400">42 sec</span>
          <div className="text-[10px] font-mono text-slate-400 mt-1">Operator Response Benchmark</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1526] border border-[#1E293B]">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">AI False Positive Rate</span>
          <span className="text-2xl font-bold font-mono text-blue-400">5.8%</span>
          <div className="text-[10px] font-mono text-slate-400 mt-1">Wildlife classifier enabled</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1526] border border-[#1E293B]">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">System Verification Rate</span>
          <span className="text-2xl font-bold font-mono text-amber-400">94.2%</span>
          <div className="text-[10px] font-mono text-slate-400 mt-1">Human-in-the-loop consensus</div>
        </div>
      </div>

      {/* Charts Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Temporal Alert & False Positive Trend */}
        <div className="p-5 rounded-xl bg-[#0D1526] border border-[#1E293B] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Alert Volume &amp; Filtered False Positives (24h)</span>
            </h2>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TEMPORAL_ALERT_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1526', borderColor: '#1E293B', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Line type="monotone" dataKey="totalAlerts" stroke="#10B981" strokeWidth={2} name="Total Alerts" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="falsePositives" stroke="#EF4444" strokeWidth={2} strokeDasharray="4 4" name="False Positives Filtered" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Sector Activity Breakdown */}
        <div className="p-5 rounded-xl bg-[#0D1526] border border-[#1E293B] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Activity Breakdown by Demonstration Sector</span>
            </h2>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SECTOR_DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1526', borderColor: '#1E293B', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Bar dataKey="detections" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Detections" />
                <Bar dataKey="alerts" fill="#10B981" radius={[4, 4, 0, 0]} name="Alerts" />
                <Bar dataKey="verified" fill="#EF4444" radius={[4, 4, 0, 0]} name="Verified Breaches" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Detection Class Distribution */}
        <div className="p-5 rounded-xl bg-[#0D1526] border border-[#1E293B] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <span>Detection Classification Mix</span>
            </h2>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DETECTION_CLASS_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(((percent as number | undefined) ?? 0) * 100).toFixed(0)}%`}
                >
                  {DETECTION_CLASS_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1526', borderColor: '#1E293B', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Executive Tactical Briefing Summary */}
        <div className="p-5 rounded-xl bg-[#0D1526] border border-[#1E293B] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Intelligence Briefing Digest</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-400">MOCK REPORT</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 font-sans">
            <p className="leading-relaxed">
              <strong>Executive Summary:</strong> Over the current 24-hour surveillance cycle across synthetic test sectors, automated edge AI detection pipelines logged <strong>{stats?.totalObservationsCount} observations</strong> with zero telemetry pipeline drops.
            </p>
            <p className="leading-relaxed">
              <strong>Key Vulnerability Vector:</strong> Sector Bravo-4 Training Grid experienced the highest concentration of high-priority triggers, primarily driven by Vision Transformer surface change alerts (fence cut discontinuity at Post 108).
            </p>
            <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] font-mono text-[11px] text-slate-400">
              Generated by: {currentUser.name} ({currentUser.role}) • SmartBorder 2.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

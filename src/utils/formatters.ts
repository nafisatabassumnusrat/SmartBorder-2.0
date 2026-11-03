import { AlertPriority, AlertStatus, DeviceStatus, IncidentStatus } from '../types';

export function formatConfidence(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

export function formatTimeBST(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('en-US', {
      timeZone: 'Asia/Dhaka',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch {
    return isoString;
  }
}

export function formatRelativeTime(isoString: string): string {
  try {
    const d = new Date(isoString).getTime();
    const now = Date.now();
    const diffSec = Math.floor((now - d) / 1000);

    if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  } catch {
    return 'Recently';
  }
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function getPriorityBadgeColor(priority: AlertPriority): { bg: string; text: string; border: string; dot: string } {
  switch (priority) {
    case 'CRITICAL':
      return {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
        dot: 'bg-red-500'
      };
    case 'HIGH':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-500'
      };
    case 'MEDIUM':
      return {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
        dot: 'bg-yellow-500'
      };
    case 'LOW':
    default:
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-500'
      };
  }
}

export function getAlertStatusBadge(status: AlertStatus): { bg: string; text: string; label: string } {
  switch (status) {
    case 'PENDING_TRIAGE':
      return { bg: 'bg-amber-500/15', text: 'text-amber-600', label: 'Pending Triage' };
    case 'ACKNOWLEDGED':
      return { bg: 'bg-blue-500/15', text: 'text-blue-600', label: 'Acknowledged' };
    case 'ESCALATED':
      return { bg: 'bg-purple-500/15', text: 'text-purple-600', label: 'Escalated' };
    case 'DISMISSED':
      return { bg: 'bg-slate-700/50', text: 'text-slate-400', label: 'Dismissed' };
    case 'FALSE_POSITIVE':
      return { bg: 'bg-slate-700/50', text: 'text-slate-400', label: 'False Positive' };
    case 'RESOLVED':
    default:
      return { bg: 'bg-emerald-500/15', text: 'text-emerald-600', label: 'Resolved' };
  }
}

export function getIncidentStatusBadge(status: IncidentStatus): { bg: string; text: string; label: string } {
  switch (status) {
    case 'UNDER_INVESTIGATION':
      return { bg: 'bg-amber-500/20 text-amber-600 border-amber-500/40', text: 'text-amber-600', label: 'Under Investigation' };
    case 'VERIFIED_BREACH':
      return { bg: 'bg-red-500/20 text-red-600 border-red-500/40', text: 'text-red-600', label: 'Verified Breach' };
    case 'RESOLVED':
      return { bg: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/40', text: 'text-emerald-600', label: 'Resolved' };
    case 'REJECTED':
      return { bg: 'bg-slate-800 text-slate-400 border-slate-700', text: 'text-slate-400', label: 'Rejected' };
    case 'INFO_REQUESTED':
    default:
      return { bg: 'bg-blue-500/20 text-blue-600 border-blue-500/40', text: 'text-blue-600', label: 'Info Requested' };
  }
}

export function getDeviceStatusBadge(status: DeviceStatus): { bg: string; text: string; dot: string } {
  switch (status) {
    case 'PATROLLING':
      return { bg: 'bg-emerald-500/15', text: 'text-emerald-600', dot: 'bg-emerald-500' };
    case 'ONLINE':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-600', dot: 'bg-emerald-400' };
    case 'STANDBY':
      return { bg: 'bg-blue-500/15', text: 'text-blue-600', dot: 'bg-blue-400' };
    case 'MAINTENANCE':
      return { bg: 'bg-amber-500/15', text: 'text-amber-600', dot: 'bg-amber-400' };
    case 'OFFLINE':
    default:
      return { bg: 'bg-rose-500/15', text: 'text-rose-600', dot: 'bg-rose-500' };
  }
}

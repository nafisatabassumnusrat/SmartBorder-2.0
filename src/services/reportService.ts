import { storageEngine } from './storageEngine';

export interface DashboardStats {
  activeDronesCount: number;
  totalDevicesCount: number;
  activeSessionsCount: number;
  pendingAlertsCount: number;
  verifiedIncidentsCount: number;
  totalObservationsCount: number;
  avgModelLatencyMs: number;
  systemHealthScore: number;
}

export class ReportService {
  public async getDashboardStats(): Promise<DashboardStats> {
    const devices = storageEngine.getDevices();
    const sessions = storageEngine.getSessions();
    const alerts = storageEngine.getAlerts();
    const incidents = storageEngine.getIncidents();
    const observations = storageEngine.getObservations();

    const activeDrones = devices.filter((d) => d.type === 'DRONE_UAV' && ['PATROLLING', 'ONLINE'].includes(d.status));
    const activeSessions = sessions.filter((s) => s.processingStatus === 'ACTIVE_PROCESSING');
    const pendingAlerts = alerts.filter((a) => a.status === 'PENDING_TRIAGE');
    const verifiedIncidents = incidents.filter((i) => i.status === 'VERIFIED_BREACH');

    return {
      activeDronesCount: activeDrones.length,
      totalDevicesCount: devices.length,
      activeSessionsCount: activeSessions.length,
      pendingAlertsCount: pendingAlerts.length,
      verifiedIncidentsCount: verifiedIncidents.length,
      totalObservationsCount: observations.length,
      avgModelLatencyMs: 14.2,
      systemHealthScore: 99.4
    };
  }

  public exportObservationsCSV(): void {
    const observations = storageEngine.getObservations();
    const headers = [
      'ID',
      'Timestamp',
      'Sector',
      'Detection Class',
      'Label',
      'Confidence',
      'Uncertainty Score',
      'Spectral Band',
      'Device Callsign',
      'Latitude',
      'Longitude',
      'Data Source'
    ];

    const rows = observations.map((o) => [
      o.id,
      o.timestamp,
      `"${o.sector}"`,
      o.detectionClass,
      `"${o.label}"`,
      o.confidence.toFixed(3),
      o.uncertaintyScore.toFixed(3),
      o.spectralBand,
      `"${o.deviceCallsign}"`,
      o.coordinates.lat,
      o.coordinates.lng,
      o.dataSource
    ]);

    this.downloadCSV('SmartBorder_Observations_Export.csv', [headers, ...rows]);
  }

  public exportAlertsCSV(): void {
    const alerts = storageEngine.getAlerts();
    const headers = [
      'Alert Code',
      'Title',
      'Priority',
      'Status',
      'Sector',
      'Confidence',
      'Timestamp',
      'Cluster Count',
      'Assigned To',
      'AI Reasoning',
      'Data Source'
    ];

    const rows = alerts.map((a) => [
      a.alertCode,
      `"${a.title.replace(/"/g, '""')}"`,
      a.priority,
      a.status,
      `"${a.sector}"`,
      a.confidence.toFixed(3),
      a.timestamp,
      a.clusterCount,
      `"${a.assignedTo || 'Unassigned'}"`,
      `"${a.aiReasoning.replace(/"/g, '""')}"`,
      a.dataSource
    ]);

    this.downloadCSV('SmartBorder_Alerts_Export.csv', [headers, ...rows]);
  }

  public exportIncidentsCSV(): void {
    const incidents = storageEngine.getIncidents();
    const headers = [
      'Incident Code',
      'Title',
      'Status',
      'Severity',
      'Sector',
      'Created At',
      'Updated At',
      'Assigned Reviewer',
      'Decisions Count',
      'Data Source'
    ];

    const rows = incidents.map((i) => [
      i.incidentCode,
      `"${i.title.replace(/"/g, '""')}"`,
      i.status,
      i.severity,
      `"${i.sector}"`,
      i.createdAt,
      i.updatedAt,
      `"${i.assignedReviewerName}"`,
      i.decisionHistory.length,
      i.dataSource
    ]);

    this.downloadCSV('SmartBorder_Incidents_Export.csv', [headers, ...rows]);
  }

  private downloadCSV(filename: string, data: (string | number)[][]): void {
    const csvContent = data.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public triggerPrintPDF(): void {
    window.print();
  }
}

export const reportService = new ReportService();

import { Alert, AlertPriority, AlertStatus, DetectionClass } from '../types';
import { storageEngine } from './storageEngine';
import { userService } from './userService';
import { auditService } from './auditService';

export interface AlertFilter {
  priority?: AlertPriority;
  status?: AlertStatus;
  sector?: string;
  detectionClass?: DetectionClass;
  query?: string;
}

export class AlertService {
  public async getAlerts(filter?: AlertFilter): Promise<Alert[]> {
    let alerts = storageEngine.getAlerts();

    if (filter) {
      if (filter.priority) {
        alerts = alerts.filter((a) => a.priority === filter.priority);
      }
      if (filter.status) {
        alerts = alerts.filter((a) => a.status === filter.status);
      }
      if (filter.sector) {
        alerts = alerts.filter((a) => a.sector.toLowerCase().includes(filter.sector!.toLowerCase()));
      }
      if (filter.detectionClass) {
        alerts = alerts.filter((a) => a.detectionClass === filter.detectionClass);
      }
      if (filter.query) {
        const q = filter.query.toLowerCase();
        alerts = alerts.filter((a) =>
          a.alertCode.toLowerCase().includes(q) ||
          a.title.toLowerCase().includes(q) ||
          a.sector.toLowerCase().includes(q) ||
          a.aiReasoning.toLowerCase().includes(q)
        );
      }
    }

    // Sort latest first
    return [...alerts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public async getAlertById(id: string): Promise<Alert | null> {
    const list = storageEngine.getAlerts();
    return list.find((a) => a.id === id) || null;
  }

  public async updateAlertStatus(
    alertId: string,
    status: AlertStatus,
    triageNotes?: string
  ): Promise<Alert> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'TRIAGE_ALERT');

    const alerts = storageEngine.getAlerts();
    const index = alerts.findIndex((a) => a.id === alertId);
    if (index === -1) throw new Error(`Alert not found: ${alertId}`);

    const existing = alerts[index];
    const updated: Alert = {
      ...existing,
      status,
      assignedTo: user.name,
      triageNotes: triageNotes || existing.triageNotes,
      resolvedAt: ['DISMISSED', 'FALSE_POSITIVE', 'ESCALATED'].includes(status) ? new Date().toISOString() : undefined,
      resolvedBy: ['DISMISSED', 'FALSE_POSITIVE', 'ESCALATED'].includes(status) ? user.name : undefined
    };

    alerts[index] = updated;
    storageEngine.saveAlerts(alerts);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: `ALERT_${status}`,
      entityType: 'ALERT',
      entityId: alertId,
      details: `Alert ${updated.alertCode} status updated to ${status}. Notes: ${triageNotes || 'None'}`
    });

    return updated;
  }

  public async createAlert(data: Omit<Alert, 'id' | 'dataSource'>): Promise<Alert> {
    const newAlert: Alert = {
      ...data,
      id: `alt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      dataSource: 'SIMULATED'
    };

    const current = storageEngine.getAlerts();
    storageEngine.saveAlerts([newAlert, ...current]);
    return newAlert;
  }
}

export const alertService = new AlertService();

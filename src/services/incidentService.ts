import { AlertPriority, Incident, IncidentReviewerDecision, IncidentStatus } from '../types';
import { storageEngine } from './storageEngine';
import { userService } from './userService';
import { auditService } from './auditService';

export interface IncidentFilter {
  status?: IncidentStatus;
  severity?: AlertPriority;
  sector?: string;
  query?: string;
}

export class IncidentService {
  public async getIncidents(filter?: IncidentFilter): Promise<Incident[]> {
    let incidents = storageEngine.getIncidents();

    if (filter) {
      if (filter.status) {
        incidents = incidents.filter((i) => i.status === filter.status);
      }
      if (filter.severity) {
        incidents = incidents.filter((i) => i.severity === filter.severity);
      }
      if (filter.sector) {
        incidents = incidents.filter((i) => i.sector.toLowerCase().includes(filter.sector!.toLowerCase()));
      }
      if (filter.query) {
        const q = filter.query.toLowerCase();
        incidents = incidents.filter((i) =>
          i.incidentCode.toLowerCase().includes(q) ||
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.assignedReviewerName.toLowerCase().includes(q) ||
          i.sector.toLowerCase().includes(q)
        );
      }
    }

    return [...incidents].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public async getIncidentById(id: string): Promise<Incident | null> {
    const list = storageEngine.getIncidents();
    return list.find((i) => i.id === id) || null;
  }

  public async assignReviewer(incidentId: string, reviewerId: string, reviewerName: string): Promise<Incident> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'ADD_REVIEWER_NOTE');

    const incidents = storageEngine.getIncidents();
    const index = incidents.findIndex((i) => i.id === incidentId);
    if (index === -1) throw new Error(`Incident not found: ${incidentId}`);

    const existing = incidents[index];
    const updated: Incident = {
      ...existing,
      assignedReviewerId: reviewerId,
      assignedReviewerName: reviewerName,
      updatedAt: new Date().toISOString()
    };

    incidents[index] = updated;
    storageEngine.saveIncidents(incidents);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'INCIDENT_REVIEWER_ASSIGNED',
      entityType: 'INCIDENT',
      entityId: incidentId,
      details: `Assigned reviewer ${reviewerName} to incident ${existing.incidentCode}`
    });

    return updated;
  }

  public async addDecision(
    incidentId: string,
    decision: 'VERIFIED' | 'REJECTED' | 'REQUEST_INFO' | 'NOTE_ADDED',
    notes: string
  ): Promise<Incident> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'VERIFY_INCIDENT');

    const incidents = storageEngine.getIncidents();
    const index = incidents.findIndex((i) => i.id === incidentId);
    if (index === -1) throw new Error(`Incident not found: ${incidentId}`);

    const existing = incidents[index];

    let newStatus: IncidentStatus = existing.status;
    if (decision === 'VERIFIED') newStatus = 'VERIFIED_BREACH';
    else if (decision === 'REJECTED') newStatus = 'REJECTED';
    else if (decision === 'REQUEST_INFO') newStatus = 'INFO_REQUESTED';

    const decisionRecord: IncidentReviewerDecision = {
      id: `dec-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      decision,
      notes,
      timestamp: new Date().toISOString()
    };

    const updated: Incident = {
      ...existing,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      decisionHistory: [decisionRecord, ...existing.decisionHistory]
    };

    incidents[index] = updated;
    storageEngine.saveIncidents(incidents);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: `INCIDENT_DECISION_${decision}`,
      entityType: 'INCIDENT',
      entityId: incidentId,
      details: `Recorded decision [${decision}] on incident ${existing.incidentCode}. Notes: ${notes}`
    });

    return updated;
  }

  public async createIncidentFromAlert(params: {
    alertId: string;
    title: string;
    severity: AlertPriority;
    sector: string;
    coordinates: { lat: number; lng: number };
    description: string;
    recommendedAction: string;
    observationId: string;
  }): Promise<Incident> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'TRIAGE_ALERT');

    const code = `INC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      incidentCode: code,
      title: params.title,
      status: 'UNDER_INVESTIGATION',
      severity: params.severity,
      sector: params.sector,
      coordinates: params.coordinates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedReviewerId: user.id,
      assignedReviewerName: user.name,
      alertIds: [params.alertId],
      primaryObservationId: params.observationId,
      description: params.description,
      recommendedAction: params.recommendedAction,
      evidenceReferences: [`Simulated Alert ${params.alertId}`, `Observation Reference ${params.observationId}`],
      decisionHistory: [
        {
          id: `dec-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          decision: 'NOTE_ADDED',
          notes: `Escalated from alert ${params.alertId} by ${user.name} (${user.role}).`,
          timestamp: new Date().toISOString()
        }
      ],
      dataSource: 'SIMULATED'
    };

    const current = storageEngine.getIncidents();
    storageEngine.saveIncidents([newIncident, ...current]);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'INCIDENT_CREATED_FROM_ALERT',
      entityType: 'INCIDENT',
      entityId: newIncident.id,
      details: `Created new operational incident ${code} from alert ${params.alertId}`
    });

    return newIncident;
  }
}

export const incidentService = new IncidentService();

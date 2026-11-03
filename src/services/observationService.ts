import { DetectionClass, Observation } from '../types';
import { storageEngine } from './storageEngine';
import { userService } from './userService';
import { auditService } from './auditService';

export interface ObservationFilter {
  sector?: string;
  detectionClass?: DetectionClass;
  minConfidence?: number;
  query?: string;
  spectralBand?: 'ELECTRO_OPTICAL' | 'LONGWAVE_INFRARED_THERMAL';
}

export class ObservationService {
  public async getObservations(filter?: ObservationFilter): Promise<Observation[]> {
    let obs = storageEngine.getObservations();

    if (filter) {
      if (filter.sector) {
        obs = obs.filter((o) => o.sector.toLowerCase().includes(filter.sector!.toLowerCase()));
      }
      if (filter.detectionClass) {
        obs = obs.filter((o) => o.detectionClass === filter.detectionClass);
      }
      if (filter.minConfidence !== undefined) {
        obs = obs.filter((o) => o.confidence >= filter.minConfidence!);
      }
      if (filter.spectralBand) {
        obs = obs.filter((o) => o.spectralBand === filter.spectralBand);
      }
      if (filter.query) {
        const q = filter.query.toLowerCase();
        obs = obs.filter((o) =>
          o.label.toLowerCase().includes(q) ||
          o.notes.toLowerCase().includes(q) ||
          o.deviceCallsign.toLowerCase().includes(q) ||
          o.sector.toLowerCase().includes(q)
        );
      }
    }

    // Sort latest first
    return [...obs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public async getObservationById(id: string): Promise<Observation | null> {
    const list = storageEngine.getObservations();
    return list.find((o) => o.id === id) || null;
  }

  public async createObservation(data: Omit<Observation, 'id' | 'dataSource'>): Promise<Observation> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'CREATE_OBSERVATION');

    const newObs: Observation = {
      ...data,
      id: `obs-${Date.now()}`,
      dataSource: 'SIMULATED'
    };

    const current = storageEngine.getObservations();
    storageEngine.saveObservations([newObs, ...current]);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'OBSERVATION_CREATED',
      entityType: 'ALERT',
      entityId: newObs.id,
      details: `Created new AI observation: ${newObs.label} (${(newObs.confidence * 100).toFixed(1)}%) in ${newObs.sector}`
    });

    return newObs;
  }
}

export const observationService = new ObservationService();

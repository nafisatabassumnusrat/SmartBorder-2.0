import { MonitoringSession, SessionType } from '../types';
import { storageEngine } from './storageEngine';

export class SessionService {
  public async getSessions(type?: SessionType): Promise<MonitoringSession[]> {
    const sessions = storageEngine.getSessions();
    if (type) {
      return sessions.filter((s) => s.type === type);
    }
    return sessions;
  }

  public async getSessionById(id: string): Promise<MonitoringSession | null> {
    const sessions = storageEngine.getSessions();
    return sessions.find((s) => s.id === id) || null;
  }

  public async getActiveLiveSession(): Promise<MonitoringSession> {
    const sessions = storageEngine.getSessions();
    const live = sessions.find((s) => s.type === 'LIVE_SIMULATED');
    return live || sessions[0];
  }

  public async incrementFramesProcessed(sessionId: string, count: number = 30): Promise<void> {
    const sessions = storageEngine.getSessions();
    const index = sessions.findIndex((s) => s.id === sessionId);
    if (index !== -1) {
      sessions[index].totalFramesProcessed += count;
      storageEngine.saveSessions(sessions);
    }
  }

  public async incrementDetectionCount(sessionId: string): Promise<void> {
    const sessions = storageEngine.getSessions();
    const index = sessions.findIndex((s) => s.id === sessionId);
    if (index !== -1) {
      sessions[index].detectionsCount += 1;
      storageEngine.saveSessions(sessions);
    }
  }
}

export const sessionService = new SessionService();

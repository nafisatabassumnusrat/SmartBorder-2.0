import { AuditLog, UserRole } from '../types';
import { storageEngine } from './storageEngine';

export class AuditService {
  public async getLogs(): Promise<AuditLog[]> {
    const logs = storageEngine.getAuditLogs();
    // Sort latest first
    return [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public async recordAction(params: {
    userId: string;
    userName: string;
    userRole: UserRole;
    action: string;
    entityType: 'ALERT' | 'INCIDENT' | 'DEVICE' | 'SETTINGS' | 'SYSTEM' | 'USER' | 'VERIFICATION' | 'MISSION';
    entityId: string;
    details: string;
  }): Promise<AuditLog> {
    const newEntry: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: params.userId,
      userName: params.userName,
      userRole: params.userRole,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      details: params.details,
      ipAddress: '10.240.10.42 (Internal LAN)',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      dataSource: 'DEMO_DATA'
    };

    const currentLogs = storageEngine.getAuditLogs();
    const updated = [newEntry, ...currentLogs];
    storageEngine.saveAuditLogs(updated);
    return newEntry;
  }

  public async logAction(
    userId: string,
    userName: string,
    userRole: UserRole,
    action: string,
    entityType: 'ALERT' | 'INCIDENT' | 'DEVICE' | 'SETTINGS' | 'SYSTEM' | 'USER' | 'VERIFICATION' | 'MISSION',
    entityId: string,
    details: string
  ): Promise<AuditLog> {
    return this.recordAction({
      userId,
      userName,
      userRole,
      action,
      entityType,
      entityId,
      details
    });
  }
}

export const auditService = new AuditService();

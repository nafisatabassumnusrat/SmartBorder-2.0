import {
  Alert,
  AppSettings,
  AuditLog,
  Device,
  Incident,
  MonitoringSession,
  Observation,
  User,
  RiverShiftRecord,
  TrustPlateRecord,
  FalconBoatTelemetry,
  BorderLinkNode,
  HumanVerificationItem
} from '../types';
import { MOCK_ALERTS } from '../mockData/alerts';
import { MOCK_AUDIT_LOGS } from '../mockData/auditLogs';
import { MOCK_DEVICES } from '../mockData/devices';
import { MOCK_INCIDENTS } from '../mockData/incidents';
import { MOCK_OBSERVATIONS } from '../mockData/observations';
import { MOCK_SESSIONS } from '../mockData/sessions';
import { MOCK_USERS } from '../mockData/users';
import { MOCK_RIVERSHIFT_RECORDS } from '../mockData/rivershiftData';
import { MOCK_TRUSTPLATE_RECORDS } from '../mockData/trustplateData';
import { MOCK_FALCON_BOATS } from '../mockData/falconBoatData';
import { MOCK_BORDERLINK_NODES } from '../mockData/borderlinkData';
import { MOCK_VERIFICATION_QUEUE } from '../mockData/humanVerificationData';

const STORAGE_KEYS = {
  DEVICES: 'smartborder_bd_devices_v3',
  SESSIONS: 'smartborder_bd_sessions_v3',
  OBSERVATIONS: 'smartborder_bd_observations_v3',
  ALERTS: 'smartborder_bd_alerts_v3',
  INCIDENTS: 'smartborder_bd_incidents_v3',
  AUDIT_LOGS: 'smartborder_bd_audit_v3',
  USERS: 'smartborder_bd_users_v3',
  SETTINGS: 'smartborder_bd_settings_v3',
  CURRENT_USER_ID: 'smartborder_bd_active_user_v3',
  RIVERSHIFT: 'smartborder_bd_rivershift_v3',
  TRUSTPLATE: 'smartborder_bd_trustplate_v3',
  FALCON_BOATS: 'smartborder_bd_falcon_boats_v3',
  BORDERLINK: 'smartborder_bd_borderlink_v3',
  HUMAN_VERIFICATION: 'smartborder_bd_hvc_v3'
};

const DEFAULT_SETTINGS: AppSettings = {
  language: 'EN',
  theme: 'light',
  simulationSpeed: 1,
  autoEscalateThreshold: 0.90,
  soundNotifications: true,
  retentionDays: 90,
  activeModelVersion: 'Falcon-BD-Unified-v3.2',
  mapTileStyle: 'ENTERPRISE_LIGHT',
  enableClusterDeduplication: true,
  operatorNotesRequiredOnDismiss: true,
  timezone: 'Asia/Dhaka (BST, GMT+6)',
  agencyApis: {
    brta: true,
    surveyOfBd: true,
    bmdWeather: true,
    biwtaHydro: true,
    sparrsoSat: true
  },
  dataSource: 'DEMO_DATA'
};

class StorageEngine {
  private isBrowser = typeof window !== 'undefined';

  constructor() {
    this.ensureInitialized();
  }

  public ensureInitialized(): void {
    if (!this.isBrowser) return;

    if (!localStorage.getItem(STORAGE_KEYS.DEVICES)) {
      this.set(STORAGE_KEYS.DEVICES, MOCK_DEVICES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
      this.set(STORAGE_KEYS.SESSIONS, MOCK_SESSIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.OBSERVATIONS)) {
      this.set(STORAGE_KEYS.OBSERVATIONS, MOCK_OBSERVATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
      this.set(STORAGE_KEYS.ALERTS, MOCK_ALERTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.INCIDENTS)) {
      this.set(STORAGE_KEYS.INCIDENTS, MOCK_INCIDENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      this.set(STORAGE_KEYS.AUDIT_LOGS, MOCK_AUDIT_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, MOCK_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.set(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      this.set(STORAGE_KEYS.CURRENT_USER_ID, 'usr-admin-01');
    }
    if (!localStorage.getItem(STORAGE_KEYS.RIVERSHIFT)) {
      this.set(STORAGE_KEYS.RIVERSHIFT, MOCK_RIVERSHIFT_RECORDS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRUSTPLATE)) {
      this.set(STORAGE_KEYS.TRUSTPLATE, MOCK_TRUSTPLATE_RECORDS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FALCON_BOATS)) {
      this.set(STORAGE_KEYS.FALCON_BOATS, MOCK_FALCON_BOATS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BORDERLINK)) {
      this.set(STORAGE_KEYS.BORDERLINK, MOCK_BORDERLINK_NODES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.HUMAN_VERIFICATION)) {
      this.set(STORAGE_KEYS.HUMAN_VERIFICATION, MOCK_VERIFICATION_QUEUE);
    }
  }

  public get<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.warn(`[SmartBorder StorageEngine] Failed to parse key ${key}`, err);
      return fallback;
    }
  }

  public set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`[SmartBorder StorageEngine] Failed to write key ${key}`, err);
    }
  }

  // Devices
  public getDevices(): Device[] {
    return this.get<Device[]>(STORAGE_KEYS.DEVICES, MOCK_DEVICES);
  }
  public saveDevices(devices: Device[]): void {
    this.set(STORAGE_KEYS.DEVICES, devices);
  }

  // Sessions
  public getSessions(): MonitoringSession[] {
    return this.get<MonitoringSession[]>(STORAGE_KEYS.SESSIONS, MOCK_SESSIONS);
  }
  public saveSessions(sessions: MonitoringSession[]): void {
    this.set(STORAGE_KEYS.SESSIONS, sessions);
  }

  // Observations
  public getObservations(): Observation[] {
    return this.get<Observation[]>(STORAGE_KEYS.OBSERVATIONS, MOCK_OBSERVATIONS);
  }
  public saveObservations(observations: Observation[]): void {
    this.set(STORAGE_KEYS.OBSERVATIONS, observations);
  }

  // Alerts
  public getAlerts(): Alert[] {
    return this.get<Alert[]>(STORAGE_KEYS.ALERTS, MOCK_ALERTS);
  }
  public saveAlerts(alerts: Alert[]): void {
    this.set(STORAGE_KEYS.ALERTS, alerts);
  }

  // Incidents
  public getIncidents(): Incident[] {
    return this.get<Incident[]>(STORAGE_KEYS.INCIDENTS, MOCK_INCIDENTS);
  }
  public saveIncidents(incidents: Incident[]): void {
    this.set(STORAGE_KEYS.INCIDENTS, incidents);
  }

  // Audit Logs
  public getAuditLogs(): AuditLog[] {
    return this.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, MOCK_AUDIT_LOGS);
  }
  public saveAuditLogs(logs: AuditLog[]): void {
    this.set(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  // Users
  public getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.USERS, MOCK_USERS);
  }
  public saveUsers(users: User[]): void {
    this.set(STORAGE_KEYS.USERS, users);
  }

  // Active User
  public getActiveUserId(): string {
    return this.get<string>(STORAGE_KEYS.CURRENT_USER_ID, 'usr-admin-01');
  }
  public setActiveUserId(userId: string): void {
    this.set(STORAGE_KEYS.CURRENT_USER_ID, userId);
  }

  // Settings
  public getSettings(): AppSettings {
    return this.get<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }
  public saveSettings(settings: AppSettings): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  // RiverShift
  public getRiverShiftRecords(): RiverShiftRecord[] {
    return this.get<RiverShiftRecord[]>(STORAGE_KEYS.RIVERSHIFT, MOCK_RIVERSHIFT_RECORDS);
  }
  public saveRiverShiftRecords(records: RiverShiftRecord[]): void {
    this.set(STORAGE_KEYS.RIVERSHIFT, records);
  }

  // TrustPlate
  public getTrustPlateRecords(): TrustPlateRecord[] {
    return this.get<TrustPlateRecord[]>(STORAGE_KEYS.TRUSTPLATE, MOCK_TRUSTPLATE_RECORDS);
  }
  public saveTrustPlateRecords(records: TrustPlateRecord[]): void {
    this.set(STORAGE_KEYS.TRUSTPLATE, records);
  }

  // Falcon Boats
  public getFalconBoats(): FalconBoatTelemetry[] {
    return this.get<FalconBoatTelemetry[]>(STORAGE_KEYS.FALCON_BOATS, MOCK_FALCON_BOATS);
  }
  public saveFalconBoats(boats: FalconBoatTelemetry[]): void {
    this.set(STORAGE_KEYS.FALCON_BOATS, boats);
  }

  // BorderLink
  public getBorderLinkNodes(): BorderLinkNode[] {
    return this.get<BorderLinkNode[]>(STORAGE_KEYS.BORDERLINK, MOCK_BORDERLINK_NODES);
  }
  public saveBorderLinkNodes(nodes: BorderLinkNode[]): void {
    this.set(STORAGE_KEYS.BORDERLINK, nodes);
  }

  // Human Verification Queue
  public getVerificationItems(): HumanVerificationItem[] {
    return this.get<HumanVerificationItem[]>(STORAGE_KEYS.HUMAN_VERIFICATION, MOCK_VERIFICATION_QUEUE);
  }
  public saveVerificationItems(items: HumanVerificationItem[]): void {
    this.set(STORAGE_KEYS.HUMAN_VERIFICATION, items);
  }

  // Reset to Factory Demo State
  public resetToFactory(): void {
    if (!this.isBrowser) return;
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    this.ensureInitialized();
  }
}

export const storageEngine = new StorageEngine();

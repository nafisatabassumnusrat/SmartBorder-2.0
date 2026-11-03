// SmartBorder 2.0 – Falcon Bots: Core Enterprise TypeScript Definitions
// National Border Surveillance Grid of Bangladesh

export type DataSourceClassification = 'DEMO_DATA' | 'SIMULATED' | 'SYNTHETIC';

export type Language = 'EN' | 'BN';
export type ThemeMode = 'light' | 'dark';

export type UserRole = 
  | 'Super Admin' 
  | 'Executive Viewer' 
  | 'System Administrator' 
  | 'Intelligence Analyst' 
  | 'Module Operator' 
  | 'Verification Officer' 
  | 'Auditor'
  | 'Admin'
  | 'Analyst'
  | 'Reviewer'
  | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  agency?: string; // BGB, Coast Guard, Survey of Bangladesh, SPARRSO, BIWTA, MoHA
  isDemoAccount: boolean;
  status: 'ACTIVE' | 'OFFLINE';
  lastActive: string;
  twoFactorEnabled?: boolean;
  dataSource: DataSourceClassification;
}

export type AppTab = 
  // 18 Official Master Pages:
  | 'executive-dashboard'
  | 'geospatial'
  | 'aerial-ai'
  | 'rivershift-ai'
  | 'ecoguard-ai'
  | 'borderlink-ai'
  | 'trustplate-ai'
  | 'falcon-boat'
  | 'data-fusion'
  | 'data-management'
  | 'analytics-reports'
  | 'event-alerts'
  | 'human-verification'
  | 'mission-history'
  | 'devices-sensors'
  | 'user-roles'
  | 'security-audit'
  | 'system-settings'
  // Backward compatibility alias keys:
  | 'command-center'
  | 'monitoring'
  | 'ai-intelligence'
  | 'gis'
  | 'alerts'
  | 'incidents'
  | 'reports'
  | 'admin';

export type DeviceType = 
  | 'DRONE_UAV' 
  | 'FALCON_BOAT' 
  | 'FIXED_TOWER' 
  | 'GROUND_SENSOR' 
  | 'MOBILE_SURVEILLANCE' 
  | 'LAND_PORT_OCR';

export type DeviceStatus = 'ONLINE' | 'PATROLLING' | 'MAINTENANCE' | 'STANDBY' | 'OFFLINE';

export interface Device {
  id: string;
  callsign: string;
  model: string;
  type: DeviceType;
  status: DeviceStatus;
  batteryPct: number;
  firmwareVersion: string;
  calibrationDate: string;
  calibrationExpires: string;
  assignedSector: string;
  sectorCode?: string;
  coordinates: {
    lat: number;
    lng: number;
    altitudeMeters: number;
  };
  telemetry: {
    headingDeg: number;
    speedKph: number;
    signalStrengthDbm: number;
    gimbalPitchDeg: number;
    gimbalYawDeg: number;
  };
  dataSource: DataSourceClassification;
}

export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type DetectionClass = 
  | 'PERSON'
  | 'VEHICLE_UNAUTHORIZED'
  | 'FENCE_BREACH_DAMAGE'
  | 'RIVER_CRAFT_UNIDENTIFIED'
  | 'GROUND_TRACK_CHANGE'
  | 'ANIMAL_WILDLIFE'
  | 'THERMAL_HEAT_SIGNATURE';

export interface BoundingBox {
  x: number; // percentage (0 - 100)
  y: number;
  width: number;
  height: number;
}

export interface Observation {
  id: string;
  sessionId: string;
  deviceId: string;
  deviceCallsign: string;
  timestamp: string;
  sector: string;
  detectionClass: DetectionClass;
  label: string;
  confidence: number; // 0.0 - 1.0
  uncertaintyScore: number; // 0.0 - 1.0
  boundingBox: BoundingBox;
  coordinates: {
    lat: number;
    lng: number;
  };
  spectralBand: 'ELECTRO_OPTICAL' | 'LONGWAVE_INFRARED_THERMAL';
  modelEngine: string;
  evidenceThumbnail: string;
  evidenceFullFrame: string;
  gradCamAttentionUrl?: string;
  notes: string;
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
  dataSource: DataSourceClassification;
}

export type AlertPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type AlertStatus = 'PENDING_TRIAGE' | 'ACKNOWLEDGED' | 'ESCALATED' | 'DISMISSED' | 'FALSE_POSITIVE' | 'RESOLVED';

export interface Alert {
  id: string;
  alertCode: string;
  title: string;
  observationId: string;
  detectionClass: DetectionClass;
  priority: AlertPriority;
  status: AlertStatus;
  sector: string;
  confidence: number;
  timestamp: string;
  assignedTo?: string;
  triageNotes?: string;
  clusterCount: number;
  duplicateAlertIds: string[];
  aiReasoning: string;
  resolvedAt?: string;
  resolvedBy?: string;
  moduleOrigin?: string;
  dataSource: DataSourceClassification;
}

export type IncidentStatus = 
  | 'UNDER_INVESTIGATION'
  | 'VERIFIED_BREACH'
  | 'RESOLVED'
  | 'REJECTED'
  | 'INFO_REQUESTED';

export interface IncidentReviewerDecision {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  decision: 'VERIFIED' | 'REJECTED' | 'REQUEST_INFO' | 'NOTE_ADDED';
  notes: string;
  timestamp: string;
}

export interface Incident {
  id: string;
  incidentCode: string;
  title: string;
  status: IncidentStatus;
  severity: AlertPriority;
  sector: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
  assignedReviewerId: string;
  assignedReviewerName: string;
  alertIds: string[];
  primaryObservationId: string;
  description: string;
  recommendedAction: string;
  evidenceReferences: string[];
  decisionHistory: IncidentReviewerDecision[];
  dataSource: DataSourceClassification;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: 'ALERT' | 'INCIDENT' | 'DEVICE' | 'SETTINGS' | 'SYSTEM' | 'USER' | 'VERIFICATION' | 'MISSION';
  entityId: string;
  details: string;
  ipAddress: string;
  sha256Hash?: string;
  dataSource: DataSourceClassification;
}

export interface SectorInfo {
  id: string;
  name: string;
  nameBn: string;
  division: string;
  coordinates: [number, number];
  bgbBattalion: string;
  status: 'NORMAL' | 'ELEVATED' | 'MONITORED';
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  activeUavs: number;
  activeBoats: number;
  sensorTowers: number;
  openAlerts: number;
  terrainType: 'RIVERINE' | 'TERRESTRIAL' | 'MANGROVE' | 'HILLY';
  primaryRiver?: string;
  description: string;
}

// 04. RiverShift AI Specific Models
export interface RiverShiftRecord {
  id: string;
  riverSystem: 'Padma' | 'Jamuna' | 'Meghna' | 'Brahmaputra' | 'Naf';
  sector: string;
  locationName: string;
  baselineYear: number;
  currentYear: number;
  erosionHectares: number;
  accretionHectares: number;
  lateralShiftMeters: number;
  erosionRateMetersPerYear: number;
  riskCategory: 'CRITICAL_RISK' | 'HIGH_RISK' | 'MODERATE' | 'STABLE';
  confidenceScore: number;
  validationAuthority: string;
  historicalImageUrl: string;
  currentImageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  notes: string;
  dataSource: DataSourceClassification;
}

// 07. TrustPlate AI Specific Models
export interface TrustPlateRecord {
  id: string;
  checkpoint: string;
  sector: string;
  plateBengali: string;
  plateEnglish: string;
  vehicleClass: 'HEAVY_TRUCK' | 'LIGHT_COMMERCIAL' | 'PICKUP' | 'PRIVATE_CAR' | 'BUS';
  brtaStatus: 'AUTHORIZED' | 'SUSPENDED' | 'UNREGISTERED' | 'FLAGGED_ALERT';
  driverName: string;
  manifestCode: string;
  ocrConfidence: number;
  characterBreakdown: { char: string; confidence: number }[];
  timestamp: string;
  imageUrl: string;
  verifiedByOfficer?: string;
  customsClearance: 'CLEARED' | 'INSPECTION_REQUIRED' | 'DETAINED';
  dataSource: DataSourceClassification;
}

// 08. Falcon Boat Specific Models
export interface FalconBoatTelemetry {
  id: string;
  callsign: string;
  sector: string;
  waterway: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'PATROLLING' | 'DOCKED' | 'SURVEYING' | 'RESCUE_STANDBY';
  speedKnots: number;
  headingDeg: number;
  batteryPct: number;
  sonarDepthMeters: number;
  waterQuality: {
    ph: number;
    turbidityNTU: number;
    dissolvedOxygenMgL: number;
    waterTempC: number;
    salinityPpt: number;
    hydrocarbonPpm: number;
  };
  lastMaintenance: string;
  missionType: string;
  dataSource: DataSourceClassification;
}

// 06. BorderLink AI Edge Models
export interface BorderLinkNode {
  id: string;
  nodeName: string;
  location: string;
  sector: string;
  connectionType: 'SATELLITE_LINK' | 'TACTICAL_MESH' | 'FIBER_PRIMARY' | 'OFFLINE_STANDALONE';
  status: 'ONLINE' | 'INTERMITTENT' | 'OFFLINE_BUFFERING';
  pendingSyncBundles: number;
  queuedMegabytes: number;
  lastSyncTimestamp: string;
  bandwidthKbps: number;
  latencyMs: number;
  integrityHashOk: boolean;
  edgeNpuLoadPct: number;
  dataSource: DataSourceClassification;
}

// 13. Human Verification Specific Models
export interface HumanVerificationItem {
  id: string;
  trackingCode: string;
  sourceModule: 'Falcon Aerial' | 'RiverShift' | 'EcoGuard' | 'TrustPlate' | 'Falcon Boat';
  sector: string;
  timestamp: string;
  aiSuggestedLabel: string;
  aiConfidence: number;
  uncertaintyScore: number;
  priority: ThreatSeverity;
  evidenceImageUrl: string;
  thermalImageUrl?: string;
  verificationStatus: 'PENDING_HUMAN_REVIEW' | 'VERIFIED' | 'REJECTED' | 'ESCALATED';
  reviewedBy?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
  aiExplanation: string;
  dataSource: DataSourceClassification;
}

// 09. Data Fusion Pipeline
export interface FusionPipelineStream {
  streamId: string;
  name: string;
  type: 'UAV_FEED' | 'SATELLITE_RASTER' | 'THERMAL_STREAM' | 'RIVER_SONAR' | 'LAND_PORT_OCR' | 'FIELD_REPORT';
  ingestionRatePerSec: number;
  status: 'ACTIVE' | 'DEGRADED' | 'STANDBY';
  latencyMs: number;
  dataQualityScore: number; // 0-100
  correlationCount: number;
}

export interface AppSettings {
  language: Language;
  theme: ThemeMode;
  simulationSpeed: 1 | 2 | 5;
  autoEscalateThreshold: number;
  soundNotifications: boolean;
  retentionDays: number;
  activeModelVersion: string;
  mapTileStyle: 'TACTICAL_DARK' | 'SATELLITE_SIMULATED' | 'ENTERPRISE_LIGHT';
  enableClusterDeduplication: boolean;
  operatorNotesRequiredOnDismiss: boolean;
  timezone: string;
  agencyApis: {
    brta: boolean;
    surveyOfBd: boolean;
    bmdWeather: boolean;
    biwtaHydro: boolean;
    sparrsoSat: boolean;
  };
  dataSource: DataSourceClassification;
}

export type SessionType = 'LIVE_SIMULATED' | 'RECORDED_REPLAY';
export type SessionProcessingStatus = 'ACTIVE_PROCESSING' | 'COMPLETED' | 'QUEUED' | 'PAUSED';

export interface MonitoringSession {
  id: string;
  sessionCode: string;
  title: string;
  type: SessionType;
  deviceId: string;
  deviceCallsign: string;
  sectorName: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  processingStatus: SessionProcessingStatus;
  fps: number;
  totalFramesProcessed: number;
  detectionsCount: number;
  videoUrl: string;
  resolution: string;
  sensorPayload: string;
  dataSource: DataSourceClassification;
}

export interface ModelMetric {
  modelVersion: string;
  name: string;
  task: string;
  mAP50: number;
  mAP50_95: number;
  precision: number;
  recall: number;
  f1Score: number;
  avgLatencyMs: number;
  datasetDate: string;
  evaluationDisclaimer: string;
  confusionMatrix: {
    actual: string;
    predicted: string;
    count: number;
  }[];
  classMetrics: {
    category: string;
    precision: number;
    recall: number;
    f1: number;
    sampleCount: number;
  }[];
  dataSource: DataSourceClassification;
}

export interface EnvironmentalChangeFeature {
  id: string;
  name: string;
  sector: string;
  type: 'VEGETATION_CLEARANCE' | 'PERIMETER_SOIL_DISTURBANCE' | 'VEHICLE_TRACK_ANOMALY';
  severity: 'HIGH' | 'MODERATE' | 'LOW';
  baselineDate: string;
  currentDate: string;
  ndviDelta: number;
  beforeImageUrl: string;
  afterImageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dataSource: DataSourceClassification;
}

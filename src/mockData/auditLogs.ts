import { AuditLog } from '../types';

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-bd-01',
    timestamp: '2026-11-03T23:22:10+06:00',
    userId: 'usr-reviewer-04',
    userName: 'Senior Inspector Nazmul Huda',
    userRole: 'Verification Officer',
    action: 'VERIFICATION_DECISION_SUBMITTED',
    entityType: 'VERIFICATION',
    entityId: 'hvc-01',
    details: 'Verified pedestrian thermal track TG-SYL-9041 as Authentic Incident. Dispatched BGB Tamabil BOP Quick Response Team.',
    ipAddress: '10.48.12.84 (BGB Secure Intranet)',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'aud-bd-02',
    timestamp: '2026-11-03T23:15:40+06:00',
    userId: 'usr-operator-05',
    userName: 'Lt. Commander Tanvir Ahmed',
    userRole: 'Module Operator',
    action: 'VESSEL_PATROL_VECTOR_UPDATED',
    entityType: 'DEVICE',
    entityId: 'dev-boat-02-naf',
    details: 'Falcon Boat 02 rerouted to Naf River Mid-Channel Boundary following unlit radar contact ALT-BD-2026-101.',
    ipAddress: '10.22.90.15 (Coast Guard Tactical Mesh)',
    sha256Hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'aud-bd-03',
    timestamp: '2026-11-03T22:50:00+06:00',
    userId: 'usr-admin-01',
    userName: 'Brigadier General Tariq Rahman',
    userRole: 'Super Admin',
    action: 'NATIONAL_GRID_SECURITY_CLEARANCE',
    entityType: 'SYSTEM',
    entityId: 'sys-core',
    details: 'Initiated Pre-Briefing Operational Readiness Check for Honorable Prime Minister demonstration.',
    ipAddress: '10.10.1.2 (BGB HQ Directorate General)',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'aud-bd-04',
    timestamp: '2026-11-03T22:30:15+06:00',
    userId: 'usr-analyst-03',
    userName: 'Major Rafiqul Islam',
    userRole: 'Intelligence Analyst',
    action: 'RIVERSHIFT_ANALYSIS_VALIDATED',
    entityType: 'MISSION',
    entityId: 'rs-01-kurigram',
    details: 'Concurred with Survey of Bangladesh boundary line shift: Brahmaputra Char Net Accretion +142.6 ha registered.',
    ipAddress: '10.48.5.10 (BGB Intel Directorate)',
    sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'aud-bd-05',
    timestamp: '2026-11-03T21:45:00+06:00',
    userId: 'usr-sysadmin-06',
    userName: 'Engr. Shamima Akhter',
    userRole: 'System Administrator',
    action: 'BORDERLINK_SYNC_DIAGNOSTIC_RUN',
    entityType: 'DEVICE',
    entityId: 'bl-node-05',
    details: 'Remote ping to Hili Rail Standalone Node; initiated buffered store-and-forward telemetry queue.',
    ipAddress: '10.14.88.2 (Survey of Bangladesh Cloud)',
    sha256Hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    dataSource: 'DEMO_DATA'
  }
];

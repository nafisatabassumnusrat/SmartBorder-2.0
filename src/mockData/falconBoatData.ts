import { FalconBoatTelemetry } from '../types';

export const MOCK_FALCON_BOATS: FalconBoatTelemetry[] = [
  {
    id: 'fb-01-padma',
    callsign: 'Falcon Boat 01 (Padma Sentinel)',
    sector: 'Chapai Nawabganj – Padma Ingress Sector',
    waterway: 'Padma River Channel Reach',
    coordinates: {
      lat: 24.5910,
      lng: 88.2710
    },
    status: 'PATROLLING',
    speedKnots: 14.2,
    headingDeg: 135,
    batteryPct: 86,
    sonarDepthMeters: 6.4,
    waterQuality: {
      ph: 7.38,
      turbidityNTU: 16.4,
      dissolvedOxygenMgL: 6.9,
      waterTempC: 25.4,
      salinityPpt: 0.12,
      hydrocarbonPpm: 0.00
    },
    lastMaintenance: '2026-10-28T09:00:00+06:00',
    missionType: 'Autonomous Riverine Perimeter Sweep & Char Hydrology',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'fb-02-naf',
    callsign: 'Falcon Boat 02 (Naf Guardian)',
    sector: "Cox's Bazar – Teknaf / Naf River Sector",
    waterway: 'Naf River International Estuary',
    coordinates: {
      lat: 20.8690,
      lng: 92.2940
    },
    status: 'PATROLLING',
    speedKnots: 18.5,
    headingDeg: 172,
    batteryPct: 78,
    sonarDepthMeters: 8.9,
    waterQuality: {
      ph: 7.92,
      turbidityNTU: 24.1,
      dissolvedOxygenMgL: 6.2,
      waterTempC: 27.1,
      salinityPpt: 22.4, // Brackish/marine estuary
      hydrocarbonPpm: 0.01
    },
    lastMaintenance: '2026-10-30T14:30:00+06:00',
    missionType: 'Estuarine Night Interdiction & Tidal Creek Observation',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'fb-03-jamuna',
    callsign: 'Falcon Boat 03 (Jamuna Scout)',
    sector: 'Kurigram – Brahmaputra Char Sector',
    waterway: 'Brahmaputra-Jamuna Braided Flow',
    coordinates: {
      lat: 25.8040,
      lng: 89.6580
    },
    status: 'SURVEYING',
    speedKnots: 9.8,
    headingDeg: 210,
    batteryPct: 92,
    sonarDepthMeters: 4.8,
    waterQuality: {
      ph: 7.21,
      turbidityNTU: 38.6, // High silt during flow shifts
      dissolvedOxygenMgL: 7.4,
      waterTempC: 24.2,
      salinityPpt: 0.05,
      hydrocarbonPpm: 0.00
    },
    lastMaintenance: '2026-10-25T11:00:00+06:00',
    missionType: 'Shallow Sandbar Hydrographic Mapping for RiverShift AI',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'fb-04-sundarbans',
    callsign: 'Falcon Boat 04 (Sundarban Ranger)',
    sector: 'Sundarbans – Harinbhanga Coastal Sector',
    waterway: 'Harinbhanga Tidal Mangrove Canal',
    coordinates: {
      lat: 21.8590,
      lng: 89.1480
    },
    status: 'RESCUE_STANDBY',
    speedKnots: 0.0,
    headingDeg: 90,
    batteryPct: 100,
    sonarDepthMeters: 5.2,
    waterQuality: {
      ph: 7.65,
      turbidityNTU: 19.8,
      dissolvedOxygenMgL: 6.5,
      waterTempC: 26.0,
      salinityPpt: 14.8,
      hydrocarbonPpm: 0.00
    },
    lastMaintenance: '2026-11-01T16:00:00+06:00',
    missionType: 'Joint Coast Guard-BGB Mangrove Channel Support',
    dataSource: 'DEMO_DATA'
  }
];


import { Device } from '../types';

export const MOCK_DEVICES: Device[] = [
  {
    id: 'dev-uav-01-sylhet',
    callsign: 'Falcon-01 (Sylhet Sentinel)',
    model: 'Falcon UAV v2.4 EO/IR Multi-Spectral',
    type: 'DRONE_UAV',
    status: 'PATROLLING',
    batteryPct: 84,
    firmwareVersion: 'v4.20.1-gov-bd',
    calibrationDate: '2026-10-15T08:00:00+06:00',
    calibrationExpires: '2027-01-15T08:00:00+06:00',
    assignedSector: 'Sylhet – Tamabil / Jaflong Sector',
    sectorCode: 'sec-sylhet',
    coordinates: {
      lat: 25.1765,
      lng: 92.0142,
      altitudeMeters: 145
    },
    telemetry: {
      headingDeg: 128,
      speedKph: 54.2,
      signalStrengthDbm: -68,
      gimbalPitchDeg: -35.2,
      gimbalYawDeg: 14.1
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-uav-02-kurigram',
    callsign: 'Falcon-02 (Brahmaputra Eye)',
    model: 'Falcon UAV v2.4 EO/IR Multi-Spectral',
    type: 'DRONE_UAV',
    status: 'PATROLLING',
    batteryPct: 76,
    firmwareVersion: 'v4.20.1-gov-bd',
    calibrationDate: '2026-10-22T10:30:00+06:00',
    calibrationExpires: '2027-01-22T10:30:00+06:00',
    assignedSector: 'Kurigram – Brahmaputra Char Sector',
    sectorCode: 'sec-kurigram',
    coordinates: {
      lat: 25.8090,
      lng: 89.6540,
      altitudeMeters: 180
    },
    telemetry: {
      headingDeg: 215,
      speedKph: 48.0,
      signalStrengthDbm: -72,
      gimbalPitchDeg: -42.0,
      gimbalYawDeg: -8.5
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-uav-03-teknaf',
    callsign: 'Falcon-03 (Naf Eagle)',
    model: 'Falcon UAV Long-Endurance Coastal',
    type: 'DRONE_UAV',
    status: 'ONLINE',
    batteryPct: 98,
    firmwareVersion: 'v4.20.1-gov-bd',
    calibrationDate: '2026-10-25T11:00:00+06:00',
    calibrationExpires: '2027-01-25T11:00:00+06:00',
    assignedSector: "Cox's Bazar – Teknaf / Naf River Sector",
    sectorCode: 'sec-teknaf',
    coordinates: {
      lat: 20.8660,
      lng: 92.2960,
      altitudeMeters: 160
    },
    telemetry: {
      headingDeg: 170,
      speedKph: 52.0,
      signalStrengthDbm: -65,
      gimbalPitchDeg: -30.0,
      gimbalYawDeg: 0.0
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-uav-04-benapole',
    callsign: 'Falcon-04 (Benapole Watcher)',
    model: 'Falcon UAV v2.4 EO/IR Multi-Spectral',
    type: 'DRONE_UAV',
    status: 'STANDBY',
    batteryPct: 100,
    firmwareVersion: 'v4.20.0-gov-bd',
    calibrationDate: '2026-10-18T09:00:00+06:00',
    calibrationExpires: '2027-01-18T09:00:00+06:00',
    assignedSector: 'Jashore – Benapole Land Port Sector',
    sectorCode: 'sec-benapole',
    coordinates: {
      lat: 23.0440,
      lng: 88.8990,
      altitudeMeters: 0
    },
    telemetry: {
      headingDeg: 0,
      speedKph: 0,
      signalStrengthDbm: -55,
      gimbalPitchDeg: 0,
      gimbalYawDeg: 0
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-boat-01-padma',
    callsign: 'Falcon Boat 01 (Padma Sentinel)',
    model: 'Autonomous Surface Vessel (ASV-450 Riverine)',
    type: 'FALCON_BOAT',
    status: 'PATROLLING',
    batteryPct: 86,
    firmwareVersion: 'v2.8.4-marine',
    calibrationDate: '2026-10-28T09:00:00+06:00',
    calibrationExpires: '2027-01-28T09:00:00+06:00',
    assignedSector: 'Chapai Nawabganj – Padma Ingress Sector',
    sectorCode: 'sec-chapai',
    coordinates: {
      lat: 24.5910,
      lng: 88.2710,
      altitudeMeters: 0
    },
    telemetry: {
      headingDeg: 135,
      speedKph: 26.3, // 14.2 knots
      signalStrengthDbm: -62,
      gimbalPitchDeg: -10,
      gimbalYawDeg: 5
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-boat-02-naf',
    callsign: 'Falcon Boat 02 (Naf Guardian)',
    model: 'Autonomous Surface Vessel (ASV-450 Riverine)',
    type: 'FALCON_BOAT',
    status: 'PATROLLING',
    batteryPct: 78,
    firmwareVersion: 'v2.8.4-marine',
    calibrationDate: '2026-10-30T14:30:00+06:00',
    calibrationExpires: '2027-01-30T14:30:00+06:00',
    assignedSector: "Cox's Bazar – Teknaf / Naf River Sector",
    sectorCode: 'sec-teknaf',
    coordinates: {
      lat: 20.8690,
      lng: 92.2940,
      altitudeMeters: 0
    },
    telemetry: {
      headingDeg: 172,
      speedKph: 34.2,
      signalStrengthDbm: -60,
      gimbalPitchDeg: -5,
      gimbalYawDeg: 2
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-tower-01-tamabil',
    callsign: 'Tamabil FLIR Mast Tower ST-01',
    model: 'FLIR TacFLIR 380-HD Fixed Sensor Suite',
    type: 'FIXED_TOWER',
    status: 'ONLINE',
    batteryPct: 100,
    firmwareVersion: 'v3.12.0',
    calibrationDate: '2026-09-10T08:00:00+06:00',
    calibrationExpires: '2027-03-10T08:00:00+06:00',
    assignedSector: 'Sylhet – Tamabil / Jaflong Sector',
    sectorCode: 'sec-sylhet',
    coordinates: {
      lat: 25.1745,
      lng: 92.0130,
      altitudeMeters: 38
    },
    telemetry: {
      headingDeg: 350,
      speedKph: 0,
      signalStrengthDbm: -48,
      gimbalPitchDeg: -12.4,
      gimbalYawDeg: 82.1
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-tower-02-benapole',
    callsign: 'Benapole Cargo Gate Tower ST-02',
    model: 'FLIR TacFLIR 380-HD Fixed Sensor Suite',
    type: 'FIXED_TOWER',
    status: 'ONLINE',
    batteryPct: 100,
    firmwareVersion: 'v3.12.0',
    calibrationDate: '2026-09-12T08:00:00+06:00',
    calibrationExpires: '2027-03-12T08:00:00+06:00',
    assignedSector: 'Jashore – Benapole Land Port Sector',
    sectorCode: 'sec-benapole',
    coordinates: {
      lat: 23.0432,
      lng: 88.8982,
      altitudeMeters: 35
    },
    telemetry: {
      headingDeg: 270,
      speedKph: 0,
      signalStrengthDbm: -42,
      gimbalPitchDeg: -15.0,
      gimbalYawDeg: 180.0
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-tower-03-hili',
    callsign: 'Hili Solar Mast Tower ST-03',
    model: 'Solar-Powered Autonomous Sensor Node',
    type: 'FIXED_TOWER',
    status: 'MAINTENANCE',
    batteryPct: 22,
    firmwareVersion: 'v3.10.8',
    calibrationDate: '2026-08-15T08:00:00+06:00',
    calibrationExpires: '2026-11-15T08:00:00+06:00',
    assignedSector: 'Dinajpur – Hili Border Sector',
    sectorCode: 'sec-hili',
    coordinates: {
      lat: 25.2850,
      lng: 89.0130,
      altitudeMeters: 30
    },
    telemetry: {
      headingDeg: 90,
      speedKph: 0,
      signalStrengthDbm: -88,
      gimbalPitchDeg: 0,
      gimbalYawDeg: 0
    },
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'dev-ocr-01-benapole',
    callsign: 'TrustPlate Land Port Gate 01 OCR',
    model: 'ANPR High-Speed Multi-Spectrum Plate Reader',
    type: 'LAND_PORT_OCR',
    status: 'ONLINE',
    batteryPct: 100,
    firmwareVersion: 'v5.1.0-bengali-ocr',
    calibrationDate: '2026-10-01T08:00:00+06:00',
    calibrationExpires: '2027-04-01T08:00:00+06:00',
    assignedSector: 'Jashore – Benapole Land Port Sector',
    sectorCode: 'sec-benapole',
    coordinates: {
      lat: 23.0425,
      lng: 88.8970,
      altitudeMeters: 4
    },
    telemetry: {
      headingDeg: 180,
      speedKph: 0,
      signalStrengthDbm: -38,
      gimbalPitchDeg: -22.0,
      gimbalYawDeg: 0
    },
    dataSource: 'DEMO_DATA'
  }
];

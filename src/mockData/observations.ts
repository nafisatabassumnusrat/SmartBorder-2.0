import { Observation } from '../types';

export const MOCK_OBSERVATIONS: Observation[] = [
  {
    id: 'obs-syl-9041',
    sessionId: 'ses-sylhet-uav01',
    deviceId: 'dev-uav-01-sylhet',
    deviceCallsign: 'Falcon-01 (Sylhet Sentinel)',
    timestamp: '2026-11-03T22:38:15+06:00',
    sector: 'Sylhet – Tamabil / Jaflong Sector',
    detectionClass: 'PERSON',
    label: 'Pedestrian Transit on Unpaved Path',
    confidence: 0.924,
    uncertaintyScore: 0.076,
    boundingBox: {
      x: 42,
      y: 35,
      width: 12,
      height: 22
    },
    coordinates: {
      lat: 25.1765,
      lng: 92.0142
    },
    spectralBand: 'LONGWAVE_INFRARED_THERMAL',
    modelEngine: 'Falcon-YOLOv9-Thermal-BD-v3',
    evidenceThumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
    evidenceFullFrame: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80',
    notes: 'Thermal differential tracking confirmed two adults advancing on foot along Piyain riverbank near Boundary Pillar 1272.',
    verificationStatus: 'PENDING',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'obs-tek-5509',
    sessionId: 'ses-teknaf-fb02',
    deviceId: 'dev-boat-02-naf',
    deviceCallsign: 'Falcon Boat 02 (Naf Guardian)',
    timestamp: '2026-11-03T23:02:45+06:00',
    sector: "Cox's Bazar – Teknaf / Naf River Sector",
    detectionClass: 'RIVER_CRAFT_UNIDENTIFIED',
    label: 'Unidentified Motorized Watercraft',
    confidence: 0.887,
    uncertaintyScore: 0.113,
    boundingBox: {
      x: 30,
      y: 48,
      width: 28,
      height: 18
    },
    coordinates: {
      lat: 20.8690,
      lng: 92.2940
    },
    spectralBand: 'ELECTRO_OPTICAL',
    modelEngine: 'Falcon-MarineVision-v2.1',
    evidenceThumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80',
    evidenceFullFrame: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    notes: 'Low-slung wooden hull detected crossing the international fairway towards eastern bank. Unlit after curfew hours.',
    verificationStatus: 'PENDING',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'obs-ben-8822',
    sessionId: 'ses-benapole-ocr01',
    deviceId: 'dev-ocr-01-benapole',
    deviceCallsign: 'TrustPlate Land Port Gate 01 OCR',
    timestamp: '2026-11-03T22:15:35+06:00',
    sector: 'Jashore – Benapole Land Port Sector',
    detectionClass: 'VEHICLE_UNAUTHORIZED',
    label: 'Flagged Commercial Vehicle Ingress',
    confidence: 0.946,
    uncertaintyScore: 0.054,
    boundingBox: {
      x: 20,
      y: 25,
      width: 55,
      height: 45
    },
    coordinates: {
      lat: 23.0425,
      lng: 88.8970
    },
    spectralBand: 'ELECTRO_OPTICAL',
    modelEngine: 'TrustPlate-BanglaOCR-v4.2',
    evidenceThumbnail: 'https://images.unsplash.com/photo-1586191582056-a664273081e6?w=400&auto=format&fit=crop&q=80',
    evidenceFullFrame: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80',
    notes: 'Covered van bearing plate চট্ট মেট্রো-চ ১১-৩২০৯ detected entering inspection bay. Matched against customs suspension flag.',
    verificationStatus: 'VERIFIED',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'obs-kur-3812',
    sessionId: 'ses-kurigram-uav02',
    deviceId: 'dev-uav-02-kurigram',
    deviceCallsign: 'Falcon-02 (Brahmaputra Eye)',
    timestamp: '2026-11-03T21:15:00+06:00',
    sector: 'Kurigram – Brahmaputra Char Sector',
    detectionClass: 'ANIMAL_WILDLIFE',
    label: 'Cattle Herd Grazing on Charland',
    confidence: 0.968,
    uncertaintyScore: 0.032,
    boundingBox: {
      x: 50,
      y: 60,
      width: 25,
      height: 20
    },
    coordinates: {
      lat: 25.8090,
      lng: 89.6540
    },
    spectralBand: 'LONGWAVE_INFRARED_THERMAL',
    modelEngine: 'EcoGuard-BioFilter-v3.0',
    evidenceThumbnail: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&auto=format&fit=crop&q=80',
    evidenceFullFrame: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80',
    notes: 'Multi-target quadruped herd classified as domestic cattle. Thermal morphology and grazing speed verified.',
    verificationStatus: 'VERIFIED',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'obs-sun-2201',
    sessionId: 'ses-sundarbans-uav06',
    deviceId: 'dev-uav-01-sylhet',
    deviceCallsign: 'Falcon-06 (Sundarban Ranger)',
    timestamp: '2026-11-03T20:10:20+06:00',
    sector: 'Sundarbans – Harinbhanga Coastal Sector',
    detectionClass: 'ANIMAL_WILDLIFE',
    label: 'Spotted Deer Herd in Mangrove Mudbank',
    confidence: 0.942,
    uncertaintyScore: 0.058,
    boundingBox: {
      x: 35,
      y: 40,
      width: 30,
      height: 25
    },
    coordinates: {
      lat: 21.8590,
      lng: 89.1480
    },
    spectralBand: 'LONGWAVE_INFRARED_THERMAL',
    modelEngine: 'EcoGuard-BioFilter-v3.0',
    evidenceThumbnail: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=400&auto=format&fit=crop&q=80',
    evidenceFullFrame: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1200&auto=format&fit=crop&q=80',
    notes: 'Wild deer herd browsing on Harinbhanga canal bank. Natural ecological movement confirmed; no human presence.',
    verificationStatus: 'VERIFIED',
    dataSource: 'DEMO_DATA'
  }
];

export interface EcoGuardDetection {
  id: string;
  targetId: string;
  sector: string;
  locationName: string;
  category: 'PERSON' | 'LIVESTOCK' | 'WILDLIFE' | 'WATERCRAFT' | 'UNCERTAIN';
  confidence: number;
  uncertaintyScore: number;
  timestamp: string;
  opticalImageUrl: string;
  thermalImageUrl: string;
  thermalPalette: 'IRONBOW' | 'WHITE_HOT' | 'BLACK_HOT';
  heatSignatureCelsius: number;
  ambientTempCelsius: number;
  aiExplanation: string;
  verificationStatus: 'PENDING_HUMAN_REVIEW' | 'VERIFIED' | 'REJECTED';
  reviewerDecision?: string;
  dataSource: 'DEMO_DATA';
}

export const MOCK_ECOGUARD_DETECTIONS: EcoGuardDetection[] = [
  {
    id: 'eco-01-sylhet',
    targetId: 'TG-SYL-9041',
    sector: 'Sylhet – Tamabil / Jaflong Sector',
    locationName: 'Piyain Riverbank Trail (Boundary Pillar 1272)',
    category: 'PERSON',
    confidence: 0.924,
    uncertaintyScore: 0.076,
    timestamp: '2026-11-03T22:38:15+06:00',
    opticalImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    thermalImageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    thermalPalette: 'IRONBOW',
    heatSignatureCelsius: 36.8,
    ambientTempCelsius: 22.4,
    aiExplanation: 'Dual bipeds detected advancing along scrub edge at 3.8 km/h. High core body temperature gradient (+14.4°C above soil background) confirms warm-blooded mammalian/human profile. High certainty.',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'eco-02-kurigram',
    targetId: 'TG-KUR-3812',
    sector: 'Kurigram – Brahmaputra Char Sector',
    locationName: 'Jatrapur Charland Vegetated Silt Sandbar',
    category: 'LIVESTOCK',
    confidence: 0.968,
    uncertaintyScore: 0.032,
    timestamp: '2026-11-03T21:15:00+06:00',
    opticalImageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=80',
    thermalImageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80',
    thermalPalette: 'WHITE_HOT',
    heatSignatureCelsius: 38.2,
    ambientTempCelsius: 21.0,
    aiExplanation: 'Quadruped profile consistent with local cattle herd (Bos indicus). Aspect ratio 1.7:1, horizontal spine thermal pattern, and meandering grazing kinetics correctly rejected from human intrusion queue.',
    verificationStatus: 'VERIFIED',
    reviewerDecision: 'Confirmed Livestock Grazing by BGB Kurigram Verification Officer',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'eco-03-teknaf',
    targetId: 'TG-TEK-5509',
    sector: "Cox's Bazar – Teknaf / Naf River Sector",
    locationName: 'Naf Estuary Mid-Channel Boundary',
    category: 'WATERCRAFT',
    confidence: 0.887,
    uncertaintyScore: 0.113,
    timestamp: '2026-11-03T23:02:45+06:00',
    opticalImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    thermalImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    thermalPalette: 'IRONBOW',
    heatSignatureCelsius: 48.6, // Engine heat bloom
    ambientTempCelsius: 26.5,
    aiExplanation: 'Low-slung unlit country wooden boat (dinghy) drifting westward across border channel. Concentrated stern thermal bloom (+22.1°C) indicates small 2-stroke outboard motor.',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'eco-04-sundarbans',
    targetId: 'TG-SUN-2201',
    sector: 'Sundarbans – Harinbhanga Coastal Sector',
    locationName: 'Harinbhanga Creek Mudbank',
    category: 'WILDLIFE',
    confidence: 0.942,
    uncertaintyScore: 0.058,
    timestamp: '2026-11-03T20:10:20+06:00',
    opticalImageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&auto=format&fit=crop&q=80',
    thermalImageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=600&auto=format&fit=crop&q=80',
    thermalPalette: 'WHITE_HOT',
    heatSignatureCelsius: 37.4,
    ambientTempCelsius: 23.8,
    aiExplanation: 'Spotted deer (Axis axis) herd foraging in mangrove fringe. Fast agile herd movement and distinctive anatomical profile identified with high certainty.',
    verificationStatus: 'VERIFIED',
    reviewerDecision: 'Wildlife Reserve Monitoring - Passed',
    dataSource: 'DEMO_DATA'
  }
];


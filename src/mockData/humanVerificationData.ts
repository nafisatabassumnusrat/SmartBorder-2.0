import { HumanVerificationItem } from '../types';

export const MOCK_VERIFICATION_QUEUE: HumanVerificationItem[] = [
  {
    id: 'hvc-01',
    trackingCode: 'VER-SYL-9041',
    sourceModule: 'EcoGuard',
    sector: 'Sylhet – Tamabil / Jaflong Sector',
    timestamp: '2026-11-03T22:38:15+06:00',
    aiSuggestedLabel: 'Dual Pedestrian Border Transit (Unscheduled)',
    aiConfidence: 0.924,
    uncertaintyScore: 0.076,
    priority: 'HIGH',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    thermalImageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    aiExplanation: 'Infrared signature indicates two human adults moving along unpaved footpath towards boundary pillar 1272. Velocity 3.8 km/h.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'hvc-02',
    trackingCode: 'VER-TEK-5509',
    sourceModule: 'Falcon Boat',
    sector: "Cox's Bazar – Teknaf / Naf River Sector",
    timestamp: '2026-11-03T23:02:45+06:00',
    aiSuggestedLabel: 'Unidentified Motorized Wooden Watercraft',
    aiConfidence: 0.887,
    uncertaintyScore: 0.113,
    priority: 'CRITICAL',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    thermalImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    aiExplanation: 'Low-profile unlit trawler approaching eastern bank during curfew hours. Falcon Boat 02 radar and thermal mast corroboration.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'hvc-03',
    trackingCode: 'VER-OCR-5401',
    sourceModule: 'TrustPlate',
    sector: 'Sylhet – Tamabil / Jaflong Sector',
    timestamp: '2026-11-03T22:48:00+06:00',
    aiSuggestedLabel: 'Ambiguous Plate Character: সিলেট মেট্রো-শ vs সিলেট মেট্রো-স',
    aiConfidence: 0.892,
    uncertaintyScore: 0.108,
    priority: 'MEDIUM',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    aiExplanation: 'Camera lens glare caused optical noise on 4th glyph (character "শ"). Requires human operator validation against vehicle registration tax token.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'hvc-04',
    trackingCode: 'VER-RIV-0294',
    sourceModule: 'RiverShift',
    sector: 'Kurigram / Bogura Border Reach',
    timestamp: '2026-11-03T19:30:00+06:00',
    aiSuggestedLabel: 'Critical Flood Embankment Erosion Hazard Flag',
    aiConfidence: 0.968,
    uncertaintyScore: 0.032,
    priority: 'CRITICAL',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    aiExplanation: 'Automated satellite multi-temporal SAR comparison flagged 420m bank scour within 120m of flood defense dyke. Requires Joint River Commission analyst concurrence.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'hvc-05',
    trackingCode: 'VER-AER-1102',
    sourceModule: 'Falcon Aerial',
    sector: 'Dinajpur – Hili Border Sector',
    timestamp: '2026-11-03T21:10:00+06:00',
    aiSuggestedLabel: 'Perimeter Barrier Proximity Anomaly (Vehicle Idle)',
    aiConfidence: 0.865,
    uncertaintyScore: 0.135,
    priority: 'LOW',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'PENDING_HUMAN_REVIEW',
    aiExplanation: 'Falcon-04 UAV detected commercial truck parked within 15 meters of zero line buffer for over 45 minutes.',
    dataSource: 'DEMO_DATA'
  }
];


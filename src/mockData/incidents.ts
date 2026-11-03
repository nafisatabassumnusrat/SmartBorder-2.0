import { Incident } from '../types';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'inc-2026-101',
    incidentCode: 'INC-2026-081',
    title: 'Perimeter Barrier Cut Breach with Coordinated Approach',
    status: 'VERIFIED_BREACH',
    severity: 'CRITICAL',
    sector: 'Sector Bravo-4 Training Grid',
    coordinates: {
      lat: 31.7812,
      lng: -106.4435
    },
    createdAt: '2026-11-03T01:23:00Z',
    updatedAt: '2026-11-03T01:34:10Z',
    assignedReviewerId: 'usr-reviewer-03',
    assignedReviewerName: 'Lt. Carlos Mendez',
    alertIds: ['alt-2026-901', 'alt-2026-902', 'alt-2026-903'],
    primaryObservationId: 'obs-2026-003',
    description: 'Multiple automated sensor alerts combined: Physical fence breach identified by ViT-ChangeDet followed by individual pedestrian transit and staging vehicle in adjacent canyon.',
    recommendedAction: 'Dispatch Intercept Team Bravo-2. Maintain SkyGuard aerial tracking tether.',
    evidenceReferences: [
      'Aerial Frame #42109 - EO 4K',
      'Fence Discontinuity Crop - Post 108',
      'Ground Pod UGS-12 Acoustic Spike'
    ],
    decisionHistory: [
      {
        id: 'dec-01',
        userId: 'usr-admin-01',
        userName: 'Cmdr. Sarah Vance',
        userRole: 'Admin',
        decision: 'NOTE_ADDED',
        notes: 'Escalated alert ALT-CRIT-902 to formal operational incident due to simultaneous perimeter breach detection.',
        timestamp: '2026-11-03T01:25:00Z'
      },
      {
        id: 'dec-02',
        userId: 'usr-reviewer-03',
        userName: 'Lt. Carlos Mendez',
        userRole: 'Reviewer',
        decision: 'REQUEST_INFO',
        notes: 'Requested secondary zoom pass from SkyGuard-Alpha 01 on wash corridor.',
        timestamp: '2026-11-03T01:28:15Z'
      },
      {
        id: 'dec-03',
        userId: 'usr-reviewer-03',
        userName: 'Lt. Carlos Mendez',
        userRole: 'Reviewer',
        decision: 'VERIFIED',
        notes: 'Confirmed unauthorized penetration. Physical cut verified on thermal and optical. Operator consensus reached.',
        timestamp: '2026-11-03T01:34:10Z'
      }
    ],
    dataSource: 'SIMULATED'
  },
  {
    id: 'inc-2026-102',
    incidentCode: 'INC-2026-082',
    title: 'Sub-Surface Soil Disturbance & Possible Crossing Corridor',
    status: 'UNDER_INVESTIGATION',
    severity: 'MEDIUM',
    sector: 'Delta River Crossing Sector',
    coordinates: {
      lat: 31.7588,
      lng: -106.4842
    },
    createdAt: '2026-11-02T20:15:00Z',
    updatedAt: '2026-11-02T21:40:00Z',
    assignedReviewerId: 'usr-analyst-02',
    assignedReviewerName: 'Dr. Marcus Thorne',
    alertIds: ['alt-2026-905'],
    primaryObservationId: 'obs-2026-006',
    description: 'Surface delta analysis detected heavy tire impressions cutting towards river ford. Sentinel Tower ST-07 tasked with active tracking.',
    recommendedAction: 'Verify tire tread depth with ground patrol survey team.',
    evidenceReferences: [
      'Multi-spectral Surface Matrix ST-07',
      'NDVI vegetation depression log'
    ],
    decisionHistory: [
      {
        id: 'dec-04',
        userId: 'usr-analyst-02',
        userName: 'Dr. Marcus Thorne',
        userRole: 'Analyst',
        decision: 'NOTE_ADDED',
        notes: 'Soil compaction index indicates vehicle weight over 3.5 tonnes. Baseline imagery from 48h prior showed undisturbed silt.',
        timestamp: '2026-11-02T20:30:00Z'
      }
    ],
    dataSource: 'SIMULATED'
  },
  {
    id: 'inc-2026-103',
    incidentCode: 'INC-2026-083',
    title: 'Thermal Clustering at Alpha Ridge Spur',
    status: 'REJECTED',
    severity: 'LOW',
    sector: 'Alpha Ridge Demo Range',
    coordinates: {
      lat: 31.8140,
      lng: -106.4030
    },
    createdAt: '2026-11-02T23:05:00Z',
    updatedAt: '2026-11-02T23:25:00Z',
    assignedReviewerId: 'usr-reviewer-03',
    assignedReviewerName: 'Lt. Carlos Mendez',
    alertIds: ['alt-2026-906'],
    primaryObservationId: 'obs-2026-005',
    description: 'Initial alert triggered by biological thermal signature. Re-evaluated against wildlife classification profile.',
    recommendedAction: 'Log as benign wildlife pattern. Close incident.',
    evidenceReferences: [
      'FLIR Boson 60Hz Telemetry Segment',
      'Quadruped Gait Classifier Report'
    ],
    decisionHistory: [
      {
        id: 'dec-05',
        userId: 'usr-reviewer-03',
        userName: 'Lt. Carlos Mendez',
        userRole: 'Reviewer',
        decision: 'REJECTED',
        notes: 'Rejected threat assertion: Continuous thermal tracking revealed standard coyote migration behavior along animal trail.',
        timestamp: '2026-11-02T23:25:00Z'
      }
    ],
    dataSource: 'SIMULATED'
  }
];

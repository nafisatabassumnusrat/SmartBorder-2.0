import { EnvironmentalChangeFeature } from '../types';

export const MOCK_ENV_CHANGES: EnvironmentalChangeFeature[] = [
  {
    id: 'env-change-01',
    name: 'Sector Bravo Fence Line Discontinuity',
    sector: 'Sector Bravo-4 Training Grid',
    type: 'PERIMETER_SOIL_DISTURBANCE',
    severity: 'HIGH',
    baselineDate: '2026-11-01',
    currentDate: '2026-11-03',
    ndviDelta: -0.28,
    beforeImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 31.7812,
      lng: -106.4435
    },
    dataSource: 'SIMULATED'
  },
  {
    id: 'env-change-02',
    name: 'Arroyo Wash Fresh Tire Tread Trenching',
    sector: 'Delta River Crossing Sector',
    type: 'VEHICLE_TRACK_ANOMALY',
    severity: 'MODERATE',
    baselineDate: '2026-10-31',
    currentDate: '2026-11-02',
    ndviDelta: -0.15,
    beforeImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 31.7588,
      lng: -106.4842
    },
    dataSource: 'SIMULATED'
  },
  {
    id: 'env-change-03',
    name: 'Ridge Brush Canopy Thinning / Trail Cutting',
    sector: 'Alpha Ridge Demo Range',
    type: 'VEGETATION_CLEARANCE',
    severity: 'LOW',
    baselineDate: '2026-10-25',
    currentDate: '2026-11-02',
    ndviDelta: -0.34,
    beforeImageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 31.8150,
      lng: -106.4020
    },
    dataSource: 'SIMULATED'
  }
];

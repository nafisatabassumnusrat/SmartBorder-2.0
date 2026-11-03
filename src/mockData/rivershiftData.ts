import { RiverShiftRecord } from '../types';

export const MOCK_RIVERSHIFT_RECORDS: RiverShiftRecord[] = [
  {
    id: 'rs-01-kurigram',
    riverSystem: 'Brahmaputra',
    sector: 'Kurigram – Brahmaputra Char Sector',
    locationName: 'Jatrapur Union & Chilmari Charland',
    baselineYear: 2020,
    currentYear: 2026,
    erosionHectares: 88.4,
    accretionHectares: 142.6,
    lateralShiftMeters: 340,
    erosionRateMetersPerYear: 56.6,
    riskCategory: 'HIGH_RISK',
    confidenceScore: 0.942,
    validationAuthority: 'Survey of Bangladesh (SOB) & BWDB Hydrography',
    historicalImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    currentImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 25.8230,
      lng: 89.6740
    },
    notes: 'Major eastern channel expansion during monsoon 2025. Newly deposited sand char provides 142.6 ha of potential seasonal cultivation but requires renewed boundary demarcation.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'rs-02-jamuna-sariakandi',
    riverSystem: 'Jamuna',
    sector: 'Kurigram / Bogura Border Reach',
    locationName: 'Sariakandi Embankment Bend',
    baselineYear: 2021,
    currentYear: 2026,
    erosionHectares: 112.5,
    accretionHectares: 34.0,
    lateralShiftMeters: 420,
    erosionRateMetersPerYear: 84.0,
    riskCategory: 'CRITICAL_RISK',
    confidenceScore: 0.968,
    validationAuthority: 'BIWTA Remote Sensing Cell & SPARRSO',
    historicalImageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80',
    currentImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 24.8920,
      lng: 89.6380
    },
    notes: 'Severe right-bank scour encroaching within 120m of secondary flood dyke. Satellite SAR imagery confirms subsurface scour hole progression.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'rs-03-padma-chapai',
    riverSystem: 'Padma',
    sector: 'Chapai Nawabganj – Padma Ingress Sector',
    locationName: 'Shibganj & Panka Char Boundary',
    baselineYear: 2022,
    currentYear: 2026,
    erosionHectares: 45.2,
    accretionHectares: 89.7,
    lateralShiftMeters: 180,
    erosionRateMetersPerYear: 45.0,
    riskCategory: 'MODERATE',
    confidenceScore: 0.915,
    validationAuthority: 'Joint River Commission (JRC) GIS Cell',
    historicalImageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    currentImageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 24.6140,
      lng: 88.2430
    },
    notes: 'Inflow meandering has stabilized against western groin structure. Silt bar deposition expanding southward.',
    dataSource: 'DEMO_DATA'
  },
  {
    id: 'rs-04-teknaf-naf',
    riverSystem: 'Naf',
    sector: "Cox's Bazar – Teknaf / Naf River Sector",
    locationName: 'Jalia Para Mangrove Estuary',
    baselineYear: 2023,
    currentYear: 2026,
    erosionHectares: 12.8,
    accretionHectares: 28.5,
    lateralShiftMeters: 65,
    erosionRateMetersPerYear: 21.6,
    riskCategory: 'STABLE',
    confidenceScore: 0.938,
    validationAuthority: 'Bangladesh Coast Guard & SOB Survey',
    historicalImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    currentImageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b271?w=800&auto=format&fit=crop&q=80',
    coordinates: {
      lat: 20.8710,
      lng: 92.2890
    },
    notes: 'Tidal mangrove expansion along mudflats. Safe navigable fairway maintained with minimal sandbank interference.',
    dataSource: 'DEMO_DATA'
  }
];


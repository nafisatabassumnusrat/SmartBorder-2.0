import { ModelMetric } from '../types';

export const MOCK_MODEL_METRICS: ModelMetric[] = [
  {
    modelVersion: 'YOLOv8x-Border-v2.4-quant',
    name: 'Tactical Edge Object Detector (INT8 Quantized)',
    task: 'Real-time Aerial Object Detection & Classification',
    mAP50: 0.924,
    mAP50_95: 0.768,
    precision: 0.915,
    recall: 0.884,
    f1Score: 0.899,
    avgLatencyMs: 14.2,
    datasetDate: '2026-10-18',
    evaluationDisclaimer: 'DEMO / SIMULATED BENCHMARK — Metrics derived from synthetic test validation split (12,400 labeled aerial frames). Never claim real ground-truth without formal DoD/DHS test flight validation.',
    confusionMatrix: [
      { actual: 'PERSON', predicted: 'PERSON', count: 1840 },
      { actual: 'PERSON', predicted: 'ANIMAL', count: 32 },
      { actual: 'PERSON', predicted: 'BACKGROUND', count: 48 },
      { actual: 'VEHICLE', predicted: 'VEHICLE', count: 1420 },
      { actual: 'VEHICLE', predicted: 'BACKGROUND', count: 28 },
      { actual: 'FENCE_BREACH', predicted: 'FENCE_BREACH', count: 520 },
      { actual: 'FENCE_BREACH', predicted: 'BACKGROUND', count: 35 },
      { actual: 'ANIMAL', predicted: 'ANIMAL', count: 980 },
      { actual: 'ANIMAL', predicted: 'PERSON', count: 18 }
    ],
    classMetrics: [
      { category: 'PERSON', precision: 0.942, recall: 0.918, f1: 0.930, sampleCount: 1920 },
      { category: 'VEHICLE_UNAUTHORIZED', precision: 0.925, recall: 0.902, f1: 0.913, sampleCount: 1448 },
      { category: 'FENCE_BREACH_DAMAGE', precision: 0.886, recall: 0.841, f1: 0.863, sampleCount: 555 },
      { category: 'ANIMAL_WILDLIFE', precision: 0.912, recall: 0.945, f1: 0.928, sampleCount: 998 },
      { category: 'THERMAL_HEAT_SIGNATURE', precision: 0.874, recall: 0.860, f1: 0.867, sampleCount: 712 }
    ],
    dataSource: 'SIMULATED'
  },
  {
    modelVersion: 'ViT-ChangeDet-v1.1',
    name: 'Vision Transformer Surface & Barrier Change Detector',
    task: 'Bi-Temporal Satellite & Drone Surface Change Detection',
    mAP50: 0.882,
    mAP50_95: 0.712,
    precision: 0.871,
    recall: 0.854,
    f1Score: 0.862,
    avgLatencyMs: 38.6,
    datasetDate: '2026-10-01',
    evaluationDisclaimer: 'DEMO / SIMULATED BENCHMARK — Evaluated on pair-wise spatial alignments. Model measures structural and vegetative delta.',
    confusionMatrix: [
      { actual: 'FENCE_BREACH', predicted: 'FENCE_BREACH', count: 610 },
      { actual: 'FENCE_BREACH', predicted: 'BACKGROUND', count: 42 },
      { actual: 'GROUND_TRACK', predicted: 'GROUND_TRACK', count: 890 },
      { actual: 'GROUND_TRACK', predicted: 'BACKGROUND', count: 68 }
    ],
    classMetrics: [
      { category: 'FENCE_BREACH_DAMAGE', precision: 0.912, recall: 0.874, f1: 0.893, sampleCount: 652 },
      { category: 'GROUND_TRACK_CHANGE', precision: 0.852, recall: 0.840, f1: 0.846, sampleCount: 958 },
      { category: 'VEGETATION_CLEARANCE', precision: 0.880, recall: 0.865, f1: 0.872, sampleCount: 420 }
    ],
    dataSource: 'SIMULATED'
  }
];

import { create } from 'zustand';
import { User, UserRole, AppTab, Language, ThemeMode, SectorInfo } from '../types';
import { userService } from '../services/userService';
import { storageEngine } from '../services/storageEngine';
import { alertService } from '../services/alertService';
import { observationService } from '../services/observationService';
import { sessionService } from '../services/sessionService';
import { BANGLADESH_SECTORS } from '../mockData/bangladeshSectors';

export interface ToastMessage {
  id: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  title: string;
  message: string;
  timestamp: string;
}

interface AppState {
  activeTab: AppTab;
  language: Language;
  theme: ThemeMode;
  currentUser: User;
  dataRevision: number;
  toasts: ToastMessage[];
  selectedSector: SectorInfo | null;
  isNotificationOpen: boolean;
  
  // Interactive Demo Simulation
  isSimRunning: boolean;
  isSimPaused: boolean;
  simSpeed: 1 | 2 | 5;
  simTickCount: number;
  lastSimEvent: string | null;

  // Actions
  setActiveTab: (tab: AppTab) => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setSelectedSector: (sector: SectorInfo | null) => void;
  toggleNotification: () => void;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => Promise<void>;
  bumpDataRevision: () => void;
  
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  dismissToast: (id: string) => void;

  startSimulation: () => void;
  pauseSimulation: () => void;
  stepSimulation: () => Promise<void>;
  resetSimulation: () => void;
  setSimSpeed: (speed: 1 | 2 | 5) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'executive-dashboard',
  language: 'EN',
  theme: 'light',
  currentUser: storageEngine.getUsers()[0],
  dataRevision: 0,
  selectedSector: BANGLADESH_SECTORS[0],
  isNotificationOpen: false,
  toasts: [
    {
      id: 'init-toast',
      type: 'INFO',
      title: 'SmartBorder 2.0 – Falcon Bots Initialized',
      message: 'Demonstration environment operational with sovereign Bangladesh border fixtures.',
      timestamp: 'Just now'
    }
  ],

  isSimRunning: false,
  isSimPaused: false,
  simSpeed: 1,
  simTickCount: 0,
  lastSimEvent: null,

  setActiveTab: (activeTab) => set({ activeTab }),

  setLanguage: (language) => set({ language }),

  toggleLanguage: () => {
    const nextLang = get().language === 'EN' ? 'BN' : 'EN';
    set({ language: nextLang });
    get().addToast({
      type: 'INFO',
      title: nextLang === 'BN' ? 'ভাষা পরিবর্তন করা হয়েছে' : 'Language Switched',
      message: nextLang === 'BN' ? 'সিস্টেম ইন্টারফেস বাংলায় রূপান্তরিত হয়েছে।' : 'System interface set to English.'
    });
  },

  setTheme: (theme) => {
    set({ theme: 'light' });
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme: () => {
    get().setTheme('light');
  },

  setSelectedSector: (selectedSector) => set({ selectedSector }),

  toggleNotification: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen })),

  setCurrentUser: (currentUser) => set({ currentUser }),

  switchRole: async (role) => {
    const users = storageEngine.getUsers();
    const found = users.find((u) => u.role === role) || users[0];
    await userService.setCurrentUser(found.id);
    set({ currentUser: found });
    get().bumpDataRevision();
    get().addToast({
      type: 'INFO',
      title: `Switched Demo Role to [${role}]`,
      message: `Active user: ${found.name} (${found.department})`
    });
  },

  bumpDataRevision: () => set((state) => ({ dataRevision: state.dataRevision + 1 })),

  addToast: (toast) => {
    const newToast: ToastMessage = {
      ...toast,
      id: `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString()
    };
    set((state) => ({ toasts: [newToast, ...state.toasts.slice(0, 4)] }));
  },

  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  startSimulation: () => set({ isSimRunning: true, isSimPaused: false }),

  pauseSimulation: () => set({ isSimPaused: true }),

  setSimSpeed: (simSpeed) => set({ simSpeed }),

  resetSimulation: () => {
    set({
      isSimRunning: false,
      isSimPaused: false,
      simTickCount: 0,
      lastSimEvent: 'Simulation state reset to baseline'
    });
    get().bumpDataRevision();
  },

  stepSimulation: async () => {
    const tick = get().simTickCount + 1;
    set({ simTickCount: tick });

    // Scenario: periodic synthetic detection in Sylhet or Teknaf
    if (tick % 3 === 0) {
      const liveSession = (await sessionService.getActiveLiveSession()) || storageEngine.getSessions()[0];
      await sessionService.incrementFramesProcessed(liveSession.id, 90);

      const isTeknaf = tick % 2 === 0;
      const sector = isTeknaf 
        ? BANGLADESH_SECTORS.find(s => s.id === 'sec-teknaf')!
        : BANGLADESH_SECTORS.find(s => s.id === 'sec-sylhet')!;

      const latDelta = (Math.random() - 0.5) * 0.004;
      const lngDelta = (Math.random() - 0.5) * 0.004;
      const conf = +(0.88 + Math.random() * 0.09).toFixed(3);

      const newObs = await observationService.createObservation({
        sessionId: liveSession.id,
        deviceId: liveSession.deviceId,
        deviceCallsign: liveSession.deviceCallsign,
        timestamp: new Date().toISOString(),
        sector: sector.name,
        detectionClass: isTeknaf ? 'RIVER_CRAFT_UNIDENTIFIED' : 'PERSON',
        label: isTeknaf ? `Synthetic Watercraft Contact #${tick}` : `Synthetic Pedestrian Path Transit #${tick}`,
        confidence: conf,
        uncertaintyScore: +(1 - conf).toFixed(3),
        boundingBox: {
          x: Math.floor(25 + Math.random() * 45),
          y: Math.floor(25 + Math.random() * 35),
          width: 16,
          height: 22
        },
        coordinates: {
          lat: sector.coordinates[0] + latDelta,
          lng: sector.coordinates[1] + lngDelta
        },
        spectralBand: isTeknaf ? 'ELECTRO_OPTICAL' : 'LONGWAVE_INFRARED_THERMAL',
        modelEngine: 'Falcon-BD-Unified-v3.2',
        evidenceThumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
        evidenceFullFrame: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80',
        notes: `Simulated live telemetry frame detection event #${tick} in ${sector.name}.`
      });

      await sessionService.incrementDetectionCount(liveSession.id);

      if (conf >= 0.90) {
        const alertCode = `ALT-SIM-${100 + tick}`;
        await alertService.createAlert({
          alertCode,
          title: `Simulated Flag in ${sector.name} [Tick #${tick}]`,
          observationId: newObs.id,
          detectionClass: isTeknaf ? 'RIVER_CRAFT_UNIDENTIFIED' : 'PERSON',
          priority: isTeknaf ? 'CRITICAL' : 'HIGH',
          status: 'PENDING_TRIAGE',
          sector: sector.name,
          confidence: conf,
          timestamp: new Date().toISOString(),
          clusterCount: 1,
          duplicateAlertIds: [],
          aiReasoning: `Explainable AI: High confidence detection (${(conf * 100).toFixed(1)}%) in restricted border buffer. Correlated with sentinel telemetry.`
        });

        get().addToast({
          type: 'ALERT',
          title: `⚠️ Alert Generated [${alertCode}]`,
          message: `${sector.name}: Target flagged at ${(conf * 100).toFixed(1)}% confidence.`
        });

        set({ lastSimEvent: `Generated alert ${alertCode} in ${sector.name}` });
      } else {
        set({ lastSimEvent: `Processed frame ${tick * 30}: Observation recorded in ${sector.name}` });
      }

      get().bumpDataRevision();
    }
  }
}));

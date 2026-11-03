// SmartBorder 2.0 – Falcon Bots: Bilingual (EN / BN) Dictionary
import { Language, AppTab } from '../types';

export interface Translations {
  systemTitle: string;
  systemSubtitle: string;
  govBadge: string;
  sentinelGrid: string;
  demoDataBadge: string;
  simulatedDisclaimer: string;
  
  // Navigation Sections
  navOverview: string;
  navIntelligence: string;
  navDataAnalytics: string;
  navOperations: string;
  navAdmin: string;
  
  // Page Titles
  pages: Record<AppTab, { title: string; subtitle: string }>;
  
  // Common UI
  actions: {
    refresh: string;
    exportPdf: string;
    exportCsv: string;
    filter: string;
    search: string;
    approve: string;
    reject: string;
    escalate: string;
    save: string;
    cancel: string;
    viewDetails: string;
    runDiagnostic: string;
    resetDemo: string;
    forceSync: string;
  };
  
  // Status Labels
  status: {
    operational: string;
    active: string;
    offline: string;
    maintenance: string;
    critical: string;
    high: string;
    medium: string;
    low: string;
    pending: string;
    verified: string;
    normal: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  EN: {
    systemTitle: 'SmartBorder 2.0 – Falcon Bots',
    systemSubtitle: 'Unified Intelligence Control Panel',
    govBadge: "People's Republic of Bangladesh",
    sentinelGrid: 'Sentinel Surveillance Grid',
    demoDataBadge: 'DEMO DATA',
    simulatedDisclaimer: 'Operating with certified sovereign simulation fixtures. All telemetry labeled for demonstration.',
    
    navOverview: 'OVERVIEW',
    navIntelligence: 'INTELLIGENCE MODULES',
    navDataAnalytics: 'DATA & ANALYTICS',
    navOperations: 'OPERATIONS',
    navAdmin: 'ADMINISTRATION',
    
    pages: {
      'executive-dashboard': {
        title: 'Executive Overview Dashboard',
        subtitle: 'National border situational awareness, active assets, and operational indicators'
      },
      'geospatial': {
        title: 'Geospatial Intelligence',
        subtitle: 'National GIS map, river layers, strategic sector borders, and sensor placement'
      },
      'aerial-ai': {
        title: 'Falcon Aerial Intelligence',
        subtitle: 'Long-range UAV telemetry, real-time EO/IR computer vision, and flight logs'
      },
      'rivershift-ai': {
        title: 'RiverShift AI',
        subtitle: 'Satellite change detection of riverbank erosion, char shifts, and waterway channels'
      },
      'ecoguard-ai': {
        title: 'EcoGuard AI',
        subtitle: 'Visible & thermal dual-spectrum analysis, wildlife vs pedestrian classification'
      },
      'borderlink-ai': {
        title: 'BorderLink AI',
        subtitle: 'Tactical edge node connectivity, offline mesh sync queue, and cryptographic integrity'
      },
      'trustplate-ai': {
        title: 'TrustPlate AI',
        subtitle: 'Land port vehicle number plate OCR, Bengali script recognition, and BRTA verification'
      },
      'falcon-boat': {
        title: 'Falcon Boat',
        subtitle: 'Autonomous riverine patrol vessel telemetry, sonar bathymetry, and water quality telemetry'
      },
      'data-fusion': {
        title: 'Data Fusion Center',
        subtitle: 'Multi-sensor ingestion pipeline, AI correlation matrix, and unified intelligence layer'
      },
      'data-management': {
        title: 'Data Management',
        subtitle: 'Centralized evidence repository, satellite rasters, retention and sovereign archival'
      },
      'analytics-reports': {
        title: 'Analytics & Reports',
        subtitle: 'Module-wise performance metrics, historical displacement trends, and executive briefings'
      },
      'event-alerts': {
        title: 'Event & Alert Center',
        subtitle: 'Real-time border event timeline, automated alert triage, and sensor attribution'
      },
      'human-verification': {
        title: 'Human Verification Center',
        subtitle: 'Responsible AI human-in-the-loop desk: review, verify, or reject automated detections'
      },
      'mission-history': {
        title: 'Mission & Activity History',
        subtitle: 'Authorized patrol session records, sector coverage tracking, and flight paths'
      },
      'devices-sensors': {
        title: 'Device & Sensor Management',
        subtitle: 'Comprehensive hardware inventory: UAVs, boats, thermal towers, and calibration status'
      },
      'user-roles': {
        title: 'User & Role Management',
        subtitle: 'Inter-agency personnel directory, role-based access control, and credential logs'
      },
      'security-audit': {
        title: 'Security & Audit',
        subtitle: 'Immutable cryptographic access trail, SHA-256 evidence verification, and 2FA status'
      },
      'system-settings': {
        title: 'System Settings',
        subtitle: 'Bilingual preferences, Bangladesh Standard Time, agency APIs, and system parameters'
      },
      // Aliases
      'command-center': {
        title: 'Executive Overview Dashboard',
        subtitle: 'National border situational awareness'
      },
      'monitoring': {
        title: 'Falcon Aerial Intelligence',
        subtitle: 'Aerial surveillance feed'
      },
      'ai-intelligence': {
        title: 'AI Intelligence Models',
        subtitle: 'Explainable neural models'
      },
      'gis': {
        title: 'Geospatial Intelligence',
        subtitle: 'National GIS map & sensor layers'
      },
      'alerts': {
        title: 'Event & Alert Center',
        subtitle: 'Operational threat notifications'
      },
      'incidents': {
        title: 'Human Verification Center',
        subtitle: 'Active incident investigations'
      },
      'reports': {
        title: 'Analytics & Reports',
        subtitle: 'Executive intelligence statistics'
      },
      'admin': {
        title: 'System Settings & Audit',
        subtitle: 'Administrative controls'
      }
    },
    
    actions: {
      refresh: 'Refresh Data',
      exportPdf: 'Export Briefing (PDF)',
      exportCsv: 'Export Data (CSV)',
      filter: 'Filter Records',
      search: 'Search sector, callsign, or ID...',
      approve: 'Verify & Approve',
      reject: 'Reject (False Positive)',
      escalate: 'Escalate to HQ',
      save: 'Save Changes',
      cancel: 'Cancel',
      viewDetails: 'View Dossier',
      runDiagnostic: 'Run Diagnostic',
      resetDemo: 'Reset Factory Demo Data',
      forceSync: 'Force Offline Sync'
    },
    
    status: {
      operational: 'OPERATIONAL',
      active: 'ACTIVE',
      offline: 'OFFLINE',
      maintenance: 'MAINTENANCE',
      critical: 'CRITICAL',
      high: 'HIGH',
      medium: 'MEDIUM',
      low: 'LOW',
      pending: 'PENDING',
      verified: 'VERIFIED',
      normal: 'NORMAL'
    }
  },
  
  BN: {
    systemTitle: 'স্মার্টবর্ডার ২.০ – ফ্যালকন বটস',
    systemSubtitle: 'সমন্বিত গোয়েন্দা ও সীমান্ত পর্যবেক্ষণ প্ল্যাটফর্ম',
    govBadge: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    sentinelGrid: 'জাতীয় সেন্টিনেল সীমান্ত নজরদারি গ্রিড',
    demoDataBadge: 'ডেমো ডাটা',
    simulatedDisclaimer: 'সার্বভৌম সিমুলেশন প্ল্যাটফর্ম সক্রিয়। উপস্থাপনার জন্য সকল তথ্য ডেমো হিসেবে চিহ্নিত।',
    
    navOverview: 'সারসংক্ষেপ',
    navIntelligence: 'গোয়েন্দা এআই মডিউল',
    navDataAnalytics: 'ডাটা ও বিশ্লেষণ',
    navOperations: 'অপারেশন ও যাচাইকরণ',
    navAdmin: 'প্রশাসন ও নিরাপত্তা',
    
    pages: {
      'executive-dashboard': {
        title: 'জাতীয় নির্বাহী ড্যাশবোর্ড',
        subtitle: 'সারাদেশের সীমান্ত পরিস্থিতি, সক্রিয় সম্পদ এবং রিয়েল-টাইম অপারেশনাল সূচক'
      },
      'geospatial': {
        title: 'ভূস্থানিক গোয়েন্দা তথ্য (GIS)',
        subtitle: 'বাংলাদেশ জিআইএস মানচিত্র, নদী ব্যবস্থার স্তর, সীমান্ত সেক্টর ও সেন্সর অবস্থান'
      },
      'aerial-ai': {
        title: 'ফ্যালকন এরিয়াল ড্রোন নজরদারি',
        subtitle: 'ইউএভি টেলিমেট্রি, অপটিক্যাল ও থার্মাল কম্পিউটার ভিশন এবং ফ্লাইট রেকর্ড'
      },
      'rivershift-ai': {
        title: 'রিভারশিফ্ট এআই (নদী ও ভূপ্রকৃতি পরিবর্তন)',
        subtitle: 'পদ্মা, যমুনা ও মেঘনা নদীর পাড় ভাঙন, চর সৃষ্টি ও চ্যানেল পরিবর্তনের উপগ্রহ বিশ্লেষণ'
      },
      'ecoguard-ai': {
        title: 'ইকোগার্ড এআই (অপটিক্যাল ও থার্মাল)',
        subtitle: 'দৃশ্যমান ও অবলোহিত থার্মাল বিশ্লেষণ, মানুষ ও বন্যপ্রাণীর নির্ভুল শ্রেণিবিভাগ'
      },
      'borderlink-ai': {
        title: 'বর্ডারলিঙ্ক এআই (ট্যাকটিক্যাল অফলাইন সিঙ্ক)',
        subtitle: 'প্রান্তিক বিওপির এজ কম্পিউটিং, অফলাইন ডাটা কিউ এবং মেট্রিং ইন্টিগ্রিটি'
      },
      'trustplate-ai': {
        title: 'ট্রাস্টপ্লেট এআই (যানবাহন নম্বরপ্লেট ওসিআর)',
        subtitle: 'স্থলবন্দর ও চেকপোস্টে বাংলা নম্বরপ্লেট শনাক্তকরণ ও বিআরটিএ ডাটাবেজ যাচাই'
      },
      'falcon-boat': {
        title: 'ফ্যালকন বোট (নৌযান ও নদী পর্যবেক্ষণ)',
        subtitle: 'স্বয়ংক্রিয় বোটের গতিপথ, সোনার বাথিমেট্রি এবং পানির গুণমান পরিমাপক সেন্সর'
      },
      'data-fusion': {
        title: 'ডাটা ফিউশন সেন্টার',
        subtitle: 'বহু-উৎস সেন্সর ডাটা প্রসেসিং পাইপলাইন ও সমন্বিত ইন্টেলিজেন্স স্তর'
      },
      'data-management': {
        title: 'ডাটা সংরক্ষণাগার ও ব্যবস্থাপনা',
        subtitle: 'স্যাটেলাইট রাস্টার, ড্রোন ভিডিও, মেটাডাটা ও দীর্ঘমেয়াদি সরকারি আর্কাইভ'
      },
      'analytics-reports': {
        title: 'বিশ্লেষণ ও সরকারি প্রতিবেদন',
        subtitle: 'মডিউলভিত্তিক কার্যক্ষমতা, নদী ভাঙনের ঐতিহাসিক প্রবণতা ও নির্বাহী ব্রিফিং'
      },
      'event-alerts': {
        title: 'ইভেন্ট ও অ্যালার্ট নিয়ন্ত্রণ কেন্দ্র',
        subtitle: 'রিয়েল-টাইম সীমান্ত অ্যালার্ট টাইমলাইন, স্বয়ংক্রিয় ট্রায়াজ ও সেন্সর উৎস'
      },
      'human-verification': {
        title: 'হিউম্যান ভেরিফিকেশন সেন্টার',
        subtitle: 'দায়িত্বশীল এআই মানব যাচাইকরণ ডেস্ক: স্বয়ংক্রিয় ফলাফলের সত্যতা অনুমোদন বা বাতিল'
      },
      'mission-history': {
        title: 'মিশন ও টহল কার্যক্রমের ইতিহাস',
        subtitle: 'অনুমোদিত আকাশ ও নদী টহল অধিবেশন, সেক্টর কভারেজ এবং ফ্লাইট ট্রেইল'
      },
      'devices-sensors': {
        title: 'ডিভাইস ও সেন্সর ব্যবস্থাপনা',
        subtitle: 'ড্রোন, রোবোটিক বোট, থার্মাল টাওয়ার ও গ্রাউন্ড সেন্সরের কার্যক্ষমতা'
      },
      'user-roles': {
        title: 'ব্যবহারকারী ও ভূমিকা ব্যবস্থাপনা',
        subtitle: 'বিজিবি, কোস্টগার্ড ও সংশ্লিষ্ট সংস্থার কর্মকর্তা তালিকা ও অনুমতি ম্যাট্রিক্স'
      },
      'security-audit': {
        title: 'নিরাপত্তা ও অডিট লগ',
        subtitle: 'অপরিবর্তনীয় ক্রিপ্টোগ্রাফিক এক্সেস লগ, SHA-256 প্রমাণপত্র ও নিরাপত্তা ট্রেইল'
      },
      'system-settings': {
        title: 'সিস্টেম ও ইন্টিগ্রেশন সেটিংস',
        subtitle: 'দ্বিভাষিক সেটিংস, বাংলাদেশ মান সময় (BST), সরকারি এপিআই সংযোগ'
      },
      // Aliases
      'command-center': {
        title: 'জাতীয় নির্বাহী ড্যাশবোর্ড',
        subtitle: 'সারাদেশের সীমান্ত পরিস্থিতি'
      },
      'monitoring': {
        title: 'ফ্যালকন এরিয়াল নজরদারি',
        subtitle: 'আকাশসীমা পর্যবেক্ষণ'
      },
      'ai-intelligence': {
        title: 'এআই বুদ্ধিমত্তা মডেল',
        subtitle: 'ব্যাখ্যামূলক নিউরাল মডেল'
      },
      'gis': {
        title: 'ভূস্থানিক গোয়েন্দা তথ্য',
        subtitle: 'বাংলাদেশ মানচিত্র ও সেন্সর'
      },
      'alerts': {
        title: 'ইভেন্ট ও অ্যালার্ট নিয়ন্ত্রণ',
        subtitle: 'সীমান্ত হুমকি সংকেত'
      },
      'incidents': {
        title: 'হিউম্যান ভেরিফিকেশন',
        subtitle: 'অপেক্ষমাণ তদন্ত'
      },
      'reports': {
        title: 'বিশ্লেষণ ও প্রতিবেদন',
        subtitle: 'নির্বাহী পরিসংখ্যান'
      },
      'admin': {
        title: 'প্রশাসন ও সেটিংস',
        subtitle: 'প্রশাসনিক নিয়ন্ত্রণ'
      }
    },
    
    actions: {
      refresh: 'ডাটা রিফ্রেশ করুন',
      exportPdf: 'পিডিএফ ব্রিফিং ডাউনলোড',
      exportCsv: 'সিএসভি ডাটা এক্সপোর্ট',
      filter: 'ফিল্টার করুন',
      search: 'সেক্টর, কলসাইন বা আইডি অনুসন্ধান...',
      approve: 'অনুমোদন ও যাচাই',
      reject: 'বাতিল (ভুল সংকেত)',
      escalate: 'হেডকোয়ার্টারে প্রেরণ',
      save: 'সংরক্ষণ করুন',
      cancel: 'বাতিল',
      viewDetails: 'নথি দেখুন',
      runDiagnostic: 'ডায়াগনস্টিক চালান',
      resetDemo: 'ফ্যাক্টরি ডেমো ডাটা রিসেট',
      forceSync: 'অবিলম্বে অফলাইন সিঙ্ক করুন'
    },
    
    status: {
      operational: 'সক্রিয় (স্বাভাবিক)',
      active: 'কার্যকর',
      offline: 'সংযোগ বিচ্ছিন্ন',
      maintenance: 'রক্ষণাবেক্ষণাধীন',
      critical: 'জরুরি হুমকি',
      high: 'উচ্চ সতর্কতা',
      medium: 'মধ্যম সতর্কতা',
      low: 'স্বাভাবিক পর্যবেক্ষণ',
      pending: 'অপেক্ষমাণ',
      verified: 'যাচাইকৃত সত্য',
      normal: 'স্বাভাবিক'
    }
  }
};


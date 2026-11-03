import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Clock, 
  Bell, 
  Database, 
  RotateCcw, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  SlidersHorizontal,
  Save,
  Link,
  Layers
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { settingsService } from '../../services/settingsService';
import { TRANSLATIONS } from '../../utils/translations';

export const SystemSettings: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    currentUser, 
    addToast, 
    bumpDataRevision 
  } = useAppStore();

  const [threshold, setThreshold] = useState<number>(0.90);
  const [retentionDays, setRetentionDays] = useState<number>(90);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [apiConnections, setApiConnections] = useState({
    brta: true,
    surveyOfBd: true,
    bmdWeather: true,
    biwtaHydro: true,
    sparrsoSat: true
  });

  const t = TRANSLATIONS[language];

  const handleToggleApi = (key: keyof typeof apiConnections) => {
    setApiConnections(prev => ({ ...prev, [key]: !prev[key] }));
    addToast({
      type: 'INFO',
      title: 'Agency Gateway Status Toggled',
      message: `${key.toUpperCase()} integration connectivity updated.`
    });
  };

  const handleSaveSettings = () => {
    addToast({
      type: 'SUCCESS',
      title: language === 'BN' ? 'সেটিংস সংরক্ষিত হয়েছে' : 'Configuration Applied',
      message: language === 'BN' ? 'সিস্টেমের নতুন পরামিতি কার্যকর করা হয়েছে।' : 'System parameters saved to sovereign state store.'
    });
  };

  const handleResetFactory = async () => {
    if (currentUser.role !== 'Super Admin' && currentUser.role !== 'Admin') {
      addToast({
        type: 'WARNING',
        title: 'Super Admin Authorization Required',
        message: 'Only [Super Admin] Brigadier General Tariq Rahman can execute a factory demo reset.'
      });
      return;
    }

    if (window.confirm('Restore all SmartBorder 2.0 demonstration data to baseline factory state?')) {
      setIsResetting(true);
      try {
        await settingsService.resetDemoData();
        bumpDataRevision();
        addToast({
          type: 'SUCCESS',
          title: 'Factory Demonstration Baseline Restored',
          message: 'All records, verification queues, and alerts have been initialized.'
        });
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="pb-12">
      <PageHeader
        category="ADMINISTRATION"
        categoryBn="প্রশাসন ও নিরাপত্তা"
        title={language === 'BN' ? 'সিস্টেম ও ইন্টিগ্রেশন সেটিংস' : 'System Settings – Configuration & Agency Interfaces'}
        subtitle={language === 'BN' 
          ? 'দ্বিভাষিক সেটিংস, বাংলাদেশ মান সময় (BST), সরকারি এপিআই সংযোগ ও সিস্টেম প্যারামিটার' 
          : 'National control panel configurations, external sovereign agency integrations, and runtime thresholds'}
        statusBadge="CONFIGURATION ACTIVE"
        actionButtons={
          <button
            onClick={handleSaveSettings}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#2386C8] bg-[#2386C8] hover:bg-[#1b6fa7] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        }
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Localization & Clock Configuration */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-[#10243A] pb-3 mb-4 border-b border-slate-100 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-[#2386C8]" />
            <span>Language, Timezone & Display Interface</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Language Switch */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                System Interface Language (দ্বিভাষিক সমর্থন):
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('EN')}
                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                    language === 'EN' 
                      ? 'bg-[#10243A] text-white  border-transparent shadow-xs' 
                      : 'border-slate-200  text-slate-600  hover:bg-slate-50'
                  }`}
                >
                  English (Default)
                </button>
                <button
                  onClick={() => setLanguage('BN')}
                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                    language === 'BN' 
                      ? 'bg-[#10243A] text-white  border-transparent shadow-xs' 
                      : 'border-slate-200  text-slate-600  hover:bg-slate-50'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            {/* Theme Switch */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Visual Enterprise Theme:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                    theme === 'light' 
                      ? 'bg-[#10243A] text-white border-transparent shadow-xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Light Enterprise (Gov)
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                    theme === 'dark' 
                      ? 'bg-[#2386C8] text-white border-transparent shadow-xs' 
                      : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  Tactical Dark Mode
                </button>
              </div>
            </div>

            {/* Timezone Indicator */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Sovereign Time Reference:
              </label>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800 flex items-center justify-between">
                <span>Asia/Dhaka (BST)</span>
                <span className="text-emerald-600">UTC+06:00 (Locked)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agency API Integrations */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-[#10243A] pb-3 mb-4 border-b border-slate-100 flex items-center space-x-2">
            <Link className="w-4 h-4 text-[#2386C8]" />
            <span>National Agency Inter-Operational Gateways</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { key: 'brta', name: 'BRTA Vehicle Registration Gateway', desc: 'TrustPlate Land Port automated plate verification' },
              { key: 'surveyOfBd', name: 'Survey of Bangladesh (SOB) GIS', desc: 'Official sovereign boundary lines and geodetic control' },
              { key: 'bmdWeather', name: 'Bangladesh Meteorological Dept (BMD)', desc: 'Live wind, monsoon precipitation, and fog radar feed' },
              { key: 'biwtaHydro', name: 'BIWTA Hydrographic Databank', desc: 'River navigational fairway depths and bathymetric profiles' },
              { key: 'sparrsoSat', name: 'SPARRSO Satellite Imagery Repository', desc: 'Optical and SAR multispectral earth observation link' }
            ].map((item) => {
              const isConnected = apiConnections[item.key as keyof typeof apiConnections];
              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-[#10243A]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {item.desc}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-600 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isConnected ? 'API CONNECTED (mTLS)' : 'DISCONNECTED'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleApi(item.key as keyof typeof apiConnections)}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isConnected ? 'Active' : 'Offline'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Runtime Thresholds & Factory Reset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Threshold Sliders */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-bold text-sm text-[#10243A] pb-3 mb-4 border-b border-slate-100 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#2386C8]" />
              <span>AI Escalation & Retention Parameters</span>
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Auto-Escalate Alert Confidence Threshold:</span>
                  <span className="font-mono font-bold text-[#2386C8]">{(threshold * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.70"
                  max="0.99"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(+e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 mt-1">
                  Detections above this confidence automatically alert duty officers.
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Local Sensor Telemetry Retention:</span>
                  <span className="font-mono font-bold text-[#2386C8]">{retentionDays} Days</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="30"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(+e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 mt-1">
                  Rolling buffer before archival to 5-year sovereign compliance store.
                </div>
              </div>
            </div>
          </div>

          {/* Demonstration Maintenance & Factory Reset */}
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-rose-900 pb-3 mb-3 border-b border-rose-200 flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Demonstration Environment Reset</span>
              </h3>
              <p className="text-xs text-rose-800 leading-relaxed">
                Reset all demo records, vehicle OCR scans, alert statuses, and human verification reviewer decisions back to initial baseline.
              </p>
              <div className="mt-3 text-[11px] font-mono text-rose-700">
                Authorized Role Required: [Super Admin]
              </div>
            </div>

            <button
              onClick={handleResetFactory}
              disabled={isResetting}
              className="mt-4 w-full py-2.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{t.actions.resetDemo}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


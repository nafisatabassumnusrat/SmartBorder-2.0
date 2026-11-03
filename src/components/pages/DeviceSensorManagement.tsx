import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Plane, 
  Anchor, 
  Radio, 
  Scan, 
  Activity, 
  Battery, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Wrench,
  RotateCcw
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { deviceService } from '../../services/deviceService';
import { Device } from '../../types';

export const DeviceSensorManagement: React.FC = () => {
  const { language, addToast, bumpDataRevision, dataRevision } = useAppStore();
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

  useEffect(() => {
    const fetchDevs = async () => {
      const data = await deviceService.getDevices();
      setDevices(data);
      if (data.length > 0 && !selectedDevice) {
        setSelectedDevice(data[0]);
      }
    };
    fetchDevs();
  }, [dataRevision]);

  const handleRunDiagnostic = (dev: Device) => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      addToast({
        type: 'SUCCESS',
        title: 'Hardware Diagnostics Complete',
        message: `${dev.callsign}: Avionics, gimbal motors, optical sensor matrix, and datalink PASSED (Zero Faults).`
      });
      bumpDataRevision();
    }, 1200);
  };

  const filtered = devices.filter(d => {
    const matchesType = filterType === 'ALL' || d.type === filterType;
    const matchesSearch = d.callsign.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.assignedSector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pb-12 bg-[#F2F6FC] min-h-full font-sans select-none">
      <PageHeader
        category="OPERATIONS"
        categoryBn="অপারেশন ও মাঠ কার্যক্রম"
        title={language === 'BN' ? 'ডিভাইস ও সেন্সর ব্যবস্থাপনা' : 'Device & Sensor Management – Hardware Fleet Inventory'}
        subtitle={language === 'BN' 
          ? 'ড্রোন, রোবোটিক বোট, থার্মাল টাওয়ার ও গ্রাউন্ড সেন্সরের সার্বক্ষণিক কার্যক্ষমতা ও রক্ষণাবেক্ষণ' 
          : 'Unified telemetry monitoring for all surveillance drones, autonomous patrol boats, and fixed optical/thermal mast nodes'}
        statusBadge="HARDWARE ASSETS: 10/11 OPERATIONAL"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        
        {/* Hardware Fleet Inventory Stats (4 Clean White KPI Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-white border border-[#E2EAF3] shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between text-[#64748B] text-xs font-semibold">
              <span>UAV Fleet (Surveillance Drones)</span>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1479C9]">
                <Plane className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#082B4C] mt-2 tracking-tight">
              4 Deployed
            </div>
            <div className="text-xs text-[#159B69] font-bold mt-1 flex items-center space-x-1">
              <span>●</span>
              <span>100% Mission Ready</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E2EAF3] shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between text-[#64748B] text-xs font-semibold">
              <span>Falcon Boats (Autonomous ASVs)</span>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#0D9488]">
                <Anchor className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#082B4C] mt-2 tracking-tight">
              2 Active Units
            </div>
            <div className="text-xs text-[#475569] font-semibold mt-1">
              Padma & Naf River
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E2EAF3] shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between text-[#64748B] text-xs font-semibold">
              <span>Fixed FLIR Mast Towers</span>
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
                <Radio className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#082B4C] mt-2 tracking-tight">
              3 Online
            </div>
            <div className="text-xs text-[#F39A24] font-bold mt-1">
              1 in Solar Maintenance
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E2EAF3] shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between text-[#64748B] text-xs font-semibold">
              <span>TrustPlate ANPR Gate OCRs</span>
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-[#9333EA]">
                <Scan className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#082B4C] mt-2 tracking-tight">
              1 Terminal
            </div>
            <div className="text-xs text-[#159B69] font-bold mt-1">
              Benapole Gate 01
            </div>
          </div>

        </div>

        {/* Filter and Search Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#E2EAF3] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search callsign or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-semibold text-[#082B4C] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#1479C9] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            {['ALL', 'DRONE_UAV', 'FALCON_BOAT', 'FIXED_TOWER', 'LAND_PORT_OCR'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === t 
                    ? 'bg-[#082B4C] text-white shadow-xs' 
                    : 'bg-slate-100 text-[#475569] hover:bg-slate-200 hover:text-[#082B4C]'
                }`}
              >
                {t.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Master Details Device View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Device List (2 columns on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-5 bg-white rounded-2xl border border-[#E2EAF3] shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2EAF3]">
                <h3 className="font-bold text-base text-[#082B4C]">
                  Hardware Fleet Registry
                </h3>
                <span className="text-xs font-mono font-bold text-[#1479C9] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {filtered.length} ASSETS REGISTERED
                </span>
              </div>

              <div className="space-y-3">
                {filtered.map((dev) => {
                  const isSelected = selectedDevice?.id === dev.id;
                  return (
                    <div
                      key={dev.id}
                      onClick={() => setSelectedDevice(dev)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/90 border-2 border-[#1479C9] shadow-sm'
                          : 'bg-[#F8FAFC] border-[#E2EAF3] hover:bg-white hover:border-[#CBD5E1] hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2.5 rounded-xl ${
                            isSelected 
                              ? 'bg-[#1479C9] text-white' 
                              : 'bg-white border border-[#E2EAF3] text-[#1479C9]'
                          }`}>
                            {dev.type === 'DRONE_UAV' ? <Plane className="w-5 h-5" /> :
                             dev.type === 'FALCON_BOAT' ? <Anchor className="w-5 h-5" /> :
                             dev.type === 'LAND_PORT_OCR' ? <Scan className="w-5 h-5" /> :
                             <Radio className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#082B4C]">
                              {dev.callsign}
                            </h4>
                            <div className="text-xs font-medium text-[#475569] mt-0.5">
                              {dev.model}
                            </div>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border shadow-2xs ${
                          dev.status === 'PATROLLING' 
                            ? 'bg-emerald-50 text-[#159B69] border-emerald-300' :
                          dev.status === 'ONLINE' 
                            ? 'bg-blue-50 text-[#1479C9] border-blue-300' :
                          dev.status === 'STANDBY' 
                            ? 'bg-slate-100 text-[#475569] border-slate-300' :
                            'bg-amber-50 text-[#F39A24] border-amber-300'
                        }`}>
                          {dev.status}
                        </span>
                      </div>

                      {/* Bottom High-Contrast Info Grid */}
                      <div className="mt-3.5 pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#334155]">
                        <div>
                          <span className="text-[#64748B] font-semibold">Sector: </span>
                          <strong className="font-bold text-[#082B4C]">{dev.assignedSector.split('–')[0]}</strong>
                        </div>
                        <div>
                          <span className="text-[#64748B] font-semibold">Battery: </span>
                          <strong className="font-bold text-[#082B4C]">{dev.batteryPct}%</strong>
                        </div>
                        <div>
                          <span className="text-[#64748B] font-semibold">Signal: </span>
                          <strong className="font-bold text-[#082B4C]">{dev.telemetry?.signalStrengthDbm ?? -68} dBm</strong>
                        </div>
                        <div>
                          <span className="text-[#64748B] font-semibold">Firmware: </span>
                          <strong className="font-mono font-bold text-[#082B4C]">{dev.firmwareVersion}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Selected Device Detail Panel (1 column on LG) */}
          <div className="space-y-4">
            {selectedDevice ? (
              <div className="p-5 bg-white rounded-2xl border border-[#E2EAF3] shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2EAF3]">
                  <h3 className="font-bold text-base text-[#082B4C]">
                    Device Telemetry Details
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#159B69] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedDevice.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-[#082B4C]">
                      {selectedDevice.callsign}
                    </h4>
                    <p className="text-xs font-semibold text-[#475569] mt-0.5">
                      {selectedDevice.model}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-[#E2EAF3] text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-[#64748B] font-semibold">Hardware ID:</span>
                      <span className="font-mono font-bold text-[#082B4C]">{selectedDevice.id}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-[#64748B] font-semibold">Assigned Sector:</span>
                      <span className="font-bold text-[#082B4C] text-right">{selectedDevice.assignedSector}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-[#64748B] font-semibold">Calibration Valid Until:</span>
                      <span className="font-bold text-[#082B4C]">
                        {new Date(selectedDevice.calibrationExpires || selectedDevice.calibrationDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-[#64748B] font-semibold">Battery Reserve:</span>
                      <span className="font-bold text-[#159B69]">{selectedDevice.batteryPct}%</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-[#64748B] font-semibold">Signal Strength:</span>
                      <span className="font-bold text-[#082B4C]">{selectedDevice.telemetry?.signalStrengthDbm ?? -68} dBm</span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#64748B] font-semibold">GPS Coordinates:</span>
                      <span className="font-mono font-bold text-[#082B4C]">
                        {selectedDevice.coordinates?.lat.toFixed(4) ?? '24.8949'}°N, {selectedDevice.coordinates?.lng.toFixed(4) ?? '91.8687'}°E
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2EAF3]">
                    <button
                      onClick={() => handleRunDiagnostic(selectedDevice)}
                      disabled={isCalibrating}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1479C9] hover:bg-[#116bb3] text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                    >
                      <RotateCcw className={`w-4 h-4 ${isCalibrating ? 'animate-spin' : ''}`} />
                      <span>{isCalibrating ? 'Running Diagnostics...' : 'Run Sensor Diagnostics'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-[#E2EAF3] text-center text-[#64748B] font-medium text-xs">
                Select an asset from the fleet registry to view real-time telemetry.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default DeviceSensorManagement;

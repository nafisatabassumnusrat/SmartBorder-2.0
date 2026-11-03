import React, { useState } from 'react';
import { 
  Database, 
  HardDrive, 
  FileText, 
  Layers, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  Archive, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';

interface AssetRecord {
  id: string;
  name: string;
  category: 'SATELLITE_RASTER' | 'DRONE_VIDEO' | 'THERMAL_STILL' | 'SONAR_BATHYMETRY' | 'OCR_LOG';
  sector: string;
  fileSizeMb: number;
  timestamp: string;
  sha256Hash: string;
  retentionTier: 'STANDARD_90_DAYS' | 'SOVEREIGN_ARCHIVE_5_YEARS' | 'PERMANENT_CLASSIFIED';
  qualityScore: number;
}

export const DataManagement: React.FC = () => {
  const { language, addToast } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const mockAssets: AssetRecord[] = [
    {
      id: 'ast-sat-0891',
      name: 'Sentinel-2_BTM_Kurigram_Padma_MultiTemporal_20261103.tif',
      category: 'SATELLITE_RASTER',
      sector: 'Kurigram Sector',
      fileSizeMb: 420.5,
      timestamp: '2026-11-03T18:30:00+06:00',
      sha256Hash: 'a89f71c42...99e1',
      retentionTier: 'SOVEREIGN_ARCHIVE_5_YEARS',
      qualityScore: 99.4
    },
    {
      id: 'ast-uav-1102',
      name: 'Falcon01_Sylhet_Perimeter_4K_EOIR_Recon_20261103.mp4',
      category: 'DRONE_VIDEO',
      sector: 'Sylhet Sector',
      fileSizeMb: 1240.0,
      timestamp: '2026-11-03T22:15:00+06:00',
      sha256Hash: 'f4b238a10...77c2',
      retentionTier: 'STANDARD_90_DAYS',
      qualityScore: 98.8
    },
    {
      id: 'ast-thm-3401',
      name: 'FLIR_Boson640_Tamabil_Pillar1272_Target_TG9041.raw',
      category: 'THERMAL_STILL',
      sector: 'Sylhet Sector',
      fileSizeMb: 48.2,
      timestamp: '2026-11-03T22:38:15+06:00',
      sha256Hash: '5e884898d...42d8',
      retentionTier: 'PERMANENT_CLASSIFIED',
      qualityScore: 100.0
    },
    {
      id: 'ast-snr-0421',
      name: 'FalconBoat02_Naf_Estuary_Bathymetry_Pointcloud.xyz',
      category: 'SONAR_BATHYMETRY',
      sector: "Cox's Bazar Sector",
      fileSizeMb: 85.0,
      timestamp: '2026-11-03T23:00:00+06:00',
      sha256Hash: 'c7d18902a...110b',
      retentionTier: 'SOVEREIGN_ARCHIVE_5_YEARS',
      qualityScore: 97.2
    },
    {
      id: 'ast-ocr-8812',
      name: 'TrustPlate_Benapole_Gate01_PassageLog_20261103.json.gz',
      category: 'OCR_LOG',
      sector: 'Benapole Sector',
      fileSizeMb: 14.6,
      timestamp: '2026-11-03T23:15:00+06:00',
      sha256Hash: 'ef2d127de...39d1',
      retentionTier: 'SOVEREIGN_ARCHIVE_5_YEARS',
      qualityScore: 99.1
    }
  ];

  const handleDownloadAsset = (name: string) => {
    addToast({
      type: 'SUCCESS',
      title: 'Evidence Asset Exported',
      message: `Signed manifest package for ${name} exported with sovereign SHA-256 validation.`
    });
  };

  const filtered = mockAssets.filter(a => {
    const matchesCat = activeCategory === 'ALL' || a.category === activeCategory;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pb-12">
      <PageHeader
        category="DATA & ANALYTICS"
        categoryBn="ডাটা ও বিশ্লেষণ"
        title={language === 'BN' ? 'ডাটা সংরক্ষণাগার ও ব্যবস্থাপনা' : 'Data Management & Evidence Repository'}
        subtitle={language === 'BN' 
          ? 'স্যাটেলাইট রাস্টার, ড্রোন ভিডিও, মেটাডাটা ও দীর্ঘমেয়াদি সার্বভৌম জাতীয় আর্কাইভ' 
          : 'Sovereign data repository governing imagery retention, cryptographic provenance, and national security archive compliance'}
        statusBadge="STORAGE CAPACITY: 14.8 TB / 100 TB (14.8%)"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Storage Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Standard Active Cache (90 Days)</span>
              <HardDrive className="w-4 h-4 text-[#2386C8]" />
            </div>
            <div className="text-xl font-bold text-[#10243A] mt-2">
              4.2 TB NVMe Flash
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Rolling sensor frames & live telemetry</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Sovereign Compliance (5 Years)</span>
              <Archive className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl font-bold text-[#10243A] mt-2">
              8.6 TB Encrypted Array
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Satellite rasters, char maps & vehicle logs</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Classified Sovereign Evidence</span>
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-xl font-bold text-[#10243A] mt-2">
              2.0 TB Air-Gapped
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Verified intrusion events & reviewer decisions</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter file name or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#10243A] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
            {['ALL', 'SATELLITE_RASTER', 'DRONE_VIDEO', 'THERMAL_STILL', 'SONAR_BATHYMETRY', 'OCR_LOG'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#10243A] text-white '
                    : 'text-slate-600  hover:bg-slate-100 '
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Data Asset Inventory Table */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-[#10243A] mb-3">
            Authenticated Evidence & Raster Assets
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">File Identifier</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Sector</th>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Retention Tier</th>
                  <th className="p-2.5">SHA-256 Hash</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((ast) => (
                  <tr 
                    key={ast.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-2.5 font-bold text-[#10243A] font-mono">
                      {ast.name}
                    </td>
                    <td className="p-2.5 text-slate-600 font-semibold">{ast.category}</td>
                    <td className="p-2.5 text-slate-500">{ast.sector}</td>
                    <td className="p-2.5 font-mono">{ast.fileSizeMb} MB</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700">
                        {ast.retentionTier}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-slate-400 text-[10px]">{ast.sha256Hash}</td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => handleDownloadAsset(ast.name)}
                        className="p-1 rounded hover:bg-slate-100 text-[#2386C8] transition-colors"
                        title="Download Signed Package"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


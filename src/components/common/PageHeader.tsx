import React from 'react';
import { 
  RefreshCw, 
  Download, 
  FileText, 
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { TRANSLATIONS } from '../../utils/translations';

interface PageHeaderProps {
  category: string;
  categoryBn?: string;
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  onExportPdf?: () => void;
  onExportCsv?: () => void;
  actionButtons?: React.ReactNode;
  statusBadge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  categoryBn,
  title,
  subtitle,
  onRefresh,
  onExportPdf,
  onExportCsv,
  actionButtons,
  statusBadge
}) => {
  const { language, bumpDataRevision, addToast } = useAppStore();
  const t = TRANSLATIONS[language];

  const handleDefaultRefresh = () => {
    bumpDataRevision();
    addToast({
      type: 'INFO',
      title: language === 'BN' ? 'ডাটা সিঙ্ক সম্পন্ন' : 'Telemetry Synchronized',
      message: language === 'BN' ? 'মডিউলের সমস্ত সেন্সর এবং ডেটা রিফ্রেশ করা হয়েছে।' : 'All module sensors and data streams refreshed.'
    });
    if (onRefresh) onRefresh();
  };

  const handleDefaultExportPdf = () => {
    window.print();
    addToast({
      type: 'SUCCESS',
      title: language === 'BN' ? 'সরকারি প্রতিবেদন প্রস্তুত' : 'Official Report Ready',
      message: language === 'BN' ? 'প্রিন্ট এবং পিডিএফ এক্সপোর্ট উইন্ডো খোলা হয়েছে।' : 'Print and PDF briefing document formatted.'
    });
    if (onExportPdf) onExportPdf();
  };

  return (
    <div className="bg-white border-b border-[#E2EAF3] px-6 py-4 shadow-xs mb-6 select-none">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Breadcrumbs & Titles */}
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1 font-bold">
            <span>{language === 'BN' && categoryBn ? categoryBn : category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="text-[#1479C9] font-bold">
              {title}
            </span>
          </div>

          <div className="flex items-center space-x-3 flex-wrap gap-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#082B4C] tracking-tight">
              {title}
            </h1>
            {statusBadge && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#159B69] border border-emerald-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#159B69] animate-pulse" />
                <span>{statusBadge}</span>
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-[#334155] border border-slate-200">
              {t.demoDataBadge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] font-medium mt-1.5 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          {actionButtons}

          <button
            onClick={handleDefaultRefresh}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white text-[#082B4C] hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
            title="Synchronize Live Telemetry"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#1479C9]" />
            <span>{language === 'BN' ? 'রিফ্রেশ ডাটা' : 'Refresh Data'}</span>
          </button>

          <button
            onClick={handleDefaultExportPdf}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#1479C9] hover:bg-[#116bb3] text-white text-xs font-bold shadow-xs transition-colors"
            title="Export Government Briefing Dossier"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'BN' ? 'ব্রিফিং রপ্তানি (PDF)' : 'Export Briefing (PDF)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

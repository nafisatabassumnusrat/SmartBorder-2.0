import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Eye, 
  Clock, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { storageEngine } from '../../services/storageEngine';
import { auditService } from '../../services/auditService';
import { HumanVerificationItem } from '../../types';

export const HumanVerificationCenter: React.FC = () => {
  const { language, currentUser, addToast, bumpDataRevision } = useAppStore();
  const [items, setItems] = useState<HumanVerificationItem[]>(storageEngine.getVerificationItems());
  const [selectedItem, setSelectedItem] = useState<HumanVerificationItem>(items[0] || storageEngine.getVerificationItems()[0]);
  const [reviewerNotes, setReviewerNotes] = useState<string>('');

  const handleDecision = async (decision: 'VERIFIED' | 'REJECTED' | 'ESCALATED') => {
    if (!reviewerNotes.trim()) {
      addToast({
        type: 'WARNING',
        title: 'Reviewer Notes Required',
        message: 'Under Responsible AI policy, a human verification officer must enter explanatory notes before authorizing or dismissing an AI flag.'
      });
      return;
    }

    const updatedList = items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          verificationStatus: decision,
          reviewedBy: `${currentUser.name} (${currentUser.role})`,
          reviewerNotes: reviewerNotes,
          reviewedAt: new Date().toISOString()
        };
      }
      return item;
    });

    setItems(updatedList);
    storageEngine.saveVerificationItems(updatedList);

    // Append to tamper-evident audit trail
    await auditService.logAction(
      currentUser.id,
      currentUser.name,
      currentUser.role,
      `HUMAN_VERIFICATION_${decision}`,
      'VERIFICATION',
      selectedItem.trackingCode,
      `Decision: ${decision} for ${selectedItem.aiSuggestedLabel} in ${selectedItem.sector}. Notes: ${reviewerNotes}`
    );

    setSelectedItem(prev => ({
      ...prev,
      verificationStatus: decision,
      reviewedBy: `${currentUser.name} (${currentUser.role})`,
      reviewerNotes: reviewerNotes,
      reviewedAt: new Date().toISOString()
    }));

    addToast({
      type: decision === 'VERIFIED' ? 'SUCCESS' : decision === 'REJECTED' ? 'INFO' : 'WARNING',
      title: `Verification Recorded: [${decision}]`,
      message: `Signed by ${currentUser.name}. Immutable audit hash created.`
    });

    setReviewerNotes('');
    bumpDataRevision();
  };

  const pendingItems = items.filter(i => i.verificationStatus === 'PENDING_HUMAN_REVIEW');
  const reviewedItems = items.filter(i => i.verificationStatus !== 'PENDING_HUMAN_REVIEW');

  return (
    <div className="pb-12">
      <PageHeader
        category="OPERATIONS"
        categoryBn="অপারেশন ও মাঠ কার্যক্রম"
        title={language === 'BN' ? 'হিউম্যান ভেরিফিকেশন সেন্টার (দায়িত্বশীল এআই)' : 'Human Verification Center – Responsible AI Desk'}
        subtitle={language === 'BN' 
          ? 'স্বয়ংক্রিয় এআই ফলাফলের মানব যাচাইকরণ, সত্যতা অনুমোদন, ভুল সংকেত বাতিল ও অডিট ট্রেইল' 
          : 'Human-in-the-loop desk ensuring no AI detection triggers operational interdiction without sworn officer confirmation'}
        statusBadge="RESPONSIBLE AI GOVERNANCE COMPLIANT"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Verification Overview Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Pending Human Verification</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-2">
              {pendingItems.length} Detections
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Awaiting sworn officer sign-off</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Verified Genuine Incidents</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">
              {items.filter(i => i.verificationStatus === 'VERIFIED').length} Confirmed
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Dispatched to tactical teams</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Dismissed False Flags</span>
              <XCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-700 mt-2">
              {items.filter(i => i.verificationStatus === 'REJECTED').length} Filtered
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Livestock or optical noise reclassified</div>
          </div>
        </div>

        {/* Verification Queue & Evidence Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Queue List (1 column) */}
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                DETECTIONS AWAITING HUMAN REVIEW
              </div>

              <div className="mt-3 space-y-2.5 max-h-[540px] overflow-y-auto">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setReviewerNotes(item.reviewerNotes || '');
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedItem.id === item.id
                        ? 'bg-blue-50/70  border-[#2386C8] shadow-xs'
                        : 'border-slate-200  hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="font-bold text-[#2386C8]">{item.trackingCode}</span>
                      <span className={`px-1.5 py-0.2 rounded font-bold ${
                        item.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' :
                        item.verificationStatus === 'REJECTED' ? 'bg-slate-200 text-slate-700' :
                        item.verificationStatus === 'ESCALATED' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {item.verificationStatus === 'PENDING_HUMAN_REVIEW' ? 'PENDING' : item.verificationStatus}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-[#10243A] truncate">
                      {item.aiSuggestedLabel}
                    </h4>

                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      📍 {item.sector.split('–')[0]} | {item.sourceModule}
                    </div>

                    <div className="text-[10px] font-mono text-emerald-600 mt-1">
                      AI Conf: {(item.aiConfidence * 100).toFixed(1)}% (Uncertainty: {(item.uncertaintyScore * 100).toFixed(1)}%)
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Side-by-Side Evidence Inspection & Reviewer Desk (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#2386C8]">
                      {selectedItem.trackingCode}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      SOURCE: {selectedItem.sourceModule}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#10243A] mt-1">
                    {selectedItem.aiSuggestedLabel}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Confidence:</div>
                  <div className="text-lg font-bold text-[#2386C8] font-mono">
                    {(selectedItem.aiConfidence * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Evidence Visual Capture Frame */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 aspect-video sm:aspect-auto sm:h-64 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <div className="relative h-full overflow-hidden">
                  <img
                    src={selectedItem.evidenceImageUrl}
                    alt="Sensor Capture"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    PRIMARY SENSOR FRAME (4K)
                  </div>
                </div>

                <div className="relative h-full overflow-hidden">
                  <img
                    src={selectedItem.thermalImageUrl || selectedItem.evidenceImageUrl}
                    alt="Thermal Corroboration"
                    className="w-full h-full object-cover sepia hue-rotate-180 contrast-125"
                  />
                  <div className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    THERMAL / ATTENTION VECTOR
                  </div>
                </div>
              </div>

              {/* AI Reasoning Attribution */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <strong>Explainable AI Rationale:</strong> {selectedItem.aiExplanation}
              </div>

              {/* Review Decision History if already processed */}
              {selectedItem.reviewedBy && (
                <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Officer Decision: {selectedItem.verificationStatus}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Sworn Reviewer: {selectedItem.reviewedBy} | Time: {new Date(selectedItem.reviewedAt!).toLocaleTimeString()}
                  </div>
                  <div className="mt-1 italic text-slate-700">
                    "{selectedItem.reviewerNotes}"
                  </div>
                </div>
              )}

              {/* Mandatory Reviewer Notes Field */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sworn Officer Verification Notes (Mandatory for Compliance):
                </label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Enter objective assessment, ground corroboration, or reason for rejection..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#10243A] focus:outline-hidden focus:border-[#2386C8]"
                />
              </div>

              {/* Three-way Responsible AI Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => handleDecision('VERIFIED')}
                  className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Genuine Threat</span>
                </button>

                <button
                  onClick={() => handleDecision('REJECTED')}
                  className="py-2.5 px-3 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject as False Alarm</span>
                </button>

                <button
                  onClick={() => handleDecision('ESCALATED')}
                  className="py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Escalate to Senior Analyst</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  ShieldCheck, 
  Database, 
  HardDrive, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { MOCK_BORDERLINK_NODES } from '../../mockData/borderlinkData';
import { BorderLinkNode } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

export const BorderLinkAi: React.FC = () => {
  const { language, addToast, bumpDataRevision } = useAppStore();
  const [nodes, setNodes] = useState<BorderLinkNode[]>(MOCK_BORDERLINK_NODES);
  const [selectedNode, setSelectedNode] = useState<BorderLinkNode>(MOCK_BORDERLINK_NODES[0]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleForceSync = (nodeId: string) => {
    setIsSyncing(true);
    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
          return {
            ...n,
            status: 'ONLINE',
            pendingSyncBundles: 0,
            queuedMegabytes: 0,
            lastSyncTimestamp: new Date().toISOString()
          };
        }
        return n;
      }));

      setSelectedNode(prev => ({
        ...prev,
        status: 'ONLINE',
        pendingSyncBundles: 0,
        queuedMegabytes: 0,
        lastSyncTimestamp: new Date().toISOString()
      }));

      setIsSyncing(false);
      addToast({
        type: 'SUCCESS',
        title: language === 'BN' ? 'অফলাইন ডাটা সিঙ্ক সম্পন্ন' : 'BorderLink Synchronized',
        message: `${selectedNode.nodeName} bundles flushed to National Central Data Fusion Layer. Integrity verified.`
      });
      bumpDataRevision();
    }, 1200);
  };

  const handleSimulateDisruption = (nodeId: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          status: 'OFFLINE_BUFFERING',
          connectionType: 'OFFLINE_STANDALONE',
          bandwidthKbps: 0,
          latencyMs: 0
        };
      }
      return n;
    }));

    setSelectedNode(prev => ({
      ...prev,
      status: 'OFFLINE_BUFFERING',
      connectionType: 'OFFLINE_STANDALONE',
      bandwidthKbps: 0,
      latencyMs: 0
    }));

    addToast({
      type: 'WARNING',
      title: 'Satellite Link Severed (Simulated)',
      message: `${selectedNode.nodeName} transitioned to offline edge buffering. Local AI inference continuing uninterrupted.`
    });
    bumpDataRevision();
  };

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'বর্ডারলিঙ্ক এআই (ট্যাকটিক্যাল অফলাইন সিঙ্ক)' : 'BorderLink AI – Tactical Edge & Mesh Synchronization'}
        subtitle={language === 'BN' 
          ? 'প্রান্তিক বিওপির এজ কম্পিউটিং, অফলাইন ডাটা কিউ এবং ক্রিপ্টোগ্রাফিক ইন্টিগ্রিটি' 
          : 'Resilient store-and-forward edge architecture ensuring autonomous remote post surveillance during fiber/satellite outages'}
        statusBadge="5 EDGE NODES ENCRYPTED (AES-256)"
        actionButtons={
          <button
            onClick={() => handleForceSync(selectedNode.id)}
            disabled={isSyncing}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#2386C8] bg-[#2386C8] hover:bg-[#1b6fa7] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{language === 'BN' ? 'নোড ডাটা সিঙ্ক করুন' : 'Force Synchronize Node'}</span>
          </button>
        }
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Network Health Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'সক্রিয় এজ নোড' : 'Active Edge Nodes'}</span>
              <Server className="w-4 h-4 text-[#2386C8]" />
            </div>
            <div className="text-2xl font-bold text-[#10243A] mt-2">
              5 Stations
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              4 Online · 1 Buffering
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'অমীমাংসিত সিঙ্ক কিউ' : 'Queued Sync Bundles'}</span>
              <Database className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-2">
              48 Bundles
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              876.0 MB encrypted buffer
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'ডাটা অখণ্ডতা (SHA-256)' : 'Cryptographic Integrity'}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">
              100.0% Pass
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              Zero hash mismatch
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'এজ এনপিইউ গড় লোড' : 'Edge NPU Load'}</span>
              <Cpu className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-[#10243A] mt-2">
              61.6%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              On-device YOLOv9 inference
            </div>
          </div>
        </div>

        {/* Edge Node Topology & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Node List (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#10243A]">
                  Border Outpost Edge Computing Nodes
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  AES-256 Hardware Encrypted
                </span>
              </div>

              <div className="space-y-3">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedNode.id === node.id
                        ? 'bg-blue-50/60  border-[#2386C8] shadow-xs'
                        : 'border-slate-200  hover:bg-slate-50 '
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Radio className="w-4 h-4 text-[#2386C8]" />
                          <h4 className="font-bold text-xs sm:text-sm text-[#10243A]">
                            {node.nodeName}
                          </h4>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          📍 {node.location} ({node.sector.split('–')[0]})
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        node.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700  ' :
                        node.status === 'INTERMITTENT' ? 'bg-amber-100 text-amber-700  ' :
                        'bg-rose-100 text-rose-700  '
                      }`}>
                        {node.status}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                      <div>Link: <strong className="font-mono text-slate-800">{node.connectionType}</strong></div>
                      <div>Bandwidth: <strong className="font-mono text-slate-800">{node.bandwidthKbps} Kbps</strong></div>
                      <div>Queue: <strong className="font-mono text-amber-600">{node.pendingSyncBundles} Bundles</strong></div>
                      <div>NPU Load: <strong className="font-mono text-indigo-600">{node.edgeNpuLoadPct}%</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Node Detail & Control Panel (1 column) */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                EDGE NODE TELEMETRY DOSSIER
              </div>

              <h4 className="font-bold text-sm text-[#10243A] mt-2">
                {selectedNode.nodeName}
              </h4>
              <p className="text-xs text-slate-500">
                {selectedNode.location}
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Connection Link:</span>
                  <span className="font-semibold">{selectedNode.connectionType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Latency:</span>
                  <span className="font-mono font-semibold">{selectedNode.latencyMs} ms</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Pending Megabytes:</span>
                  <span className="font-mono font-bold text-amber-600">{selectedNode.queuedMegabytes} MB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Last Successful Sync:</span>
                  <span className="font-mono text-slate-500">{formatRelativeTime(selectedNode.lastSyncTimestamp)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">SHA-256 Checksum:</span>
                  <span className="text-emerald-600 font-semibold font-mono text-[10px]">VERIFIED OK</span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="mt-5 pt-3 border-t border-slate-200 space-y-2">
                <button
                  onClick={() => handleForceSync(selectedNode.id)}
                  disabled={isSyncing}
                  className="w-full py-2 px-3 rounded-lg bg-[#2386C8] hover:bg-[#1b6fa7] text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Flush Offline Queue to HQ</span>
                </button>

                <button
                  onClick={() => handleSimulateDisruption(selectedNode.id)}
                  className="w-full py-2 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-rose-200"
                >
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Simulate Satellite Cut (Edge Buffer)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


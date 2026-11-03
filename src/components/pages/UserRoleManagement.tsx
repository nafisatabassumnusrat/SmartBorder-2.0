import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  CheckCircle2, 
  Lock, 
  Key, 
  UserCheck, 
  Search, 
  Filter, 
  ShieldAlert,
  Edit2,
  Trash2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { MOCK_USERS } from '../../mockData/users';
import { User, UserRole } from '../../types';

export const UserRoleManagement: React.FC = () => {
  const { language, currentUser, switchRole, addToast } = useAppStore();
  const [userList, setUserList] = useState<User[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<User>(MOCK_USERS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const permissionsMatrix = [
    { module: 'Executive Overview Dashboard', superAdmin: true, execViewer: true, analyst: true, verifier: true, operator: true, auditor: true },
    { module: 'Geospatial Intelligence (GIS)', superAdmin: true, execViewer: true, analyst: true, verifier: false, operator: true, auditor: true },
    { module: 'Falcon Aerial Flight Control', superAdmin: true, execViewer: false, analyst: false, verifier: false, operator: true, auditor: false },
    { module: 'RiverShift AI & Morphological Data', superAdmin: true, execViewer: true, analyst: true, verifier: false, operator: false, auditor: true },
    { module: 'EcoGuard AI Thermal Analysis', superAdmin: true, execViewer: true, analyst: true, verifier: true, operator: true, auditor: false },
    { module: 'BorderLink Mesh Network Config', superAdmin: true, execViewer: false, analyst: false, verifier: false, operator: false, auditor: true },
    { module: 'TrustPlate Land Port Gate OCR', superAdmin: true, execViewer: true, analyst: true, verifier: true, operator: true, auditor: false },
    { module: 'Falcon Boat Riverine Patrol Control', superAdmin: true, execViewer: false, analyst: false, verifier: false, operator: true, auditor: false },
    { module: 'Human Verification Authority', superAdmin: true, execViewer: false, analyst: false, verifier: true, operator: false, auditor: false },
    { module: 'Security Audit & Compliance Logs', superAdmin: true, execViewer: true, analyst: false, verifier: false, operator: false, auditor: true },
    { module: 'System Factory Settings & Reset', superAdmin: true, execViewer: false, analyst: false, verifier: false, operator: false, auditor: false }
  ];

  const filtered = userList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-12">
      <PageHeader
        category="ADMINISTRATION"
        categoryBn="প্রশাসন ও নিরাপত্তা"
        title={language === 'BN' ? 'ব্যবহারকারী ও ভূমিকা ব্যবস্থাপনা' : 'User & Role Management – Role-Based Access Control'}
        subtitle={language === 'BN' 
          ? 'বিজিবি, কোস্টগার্ড ও সংশ্লিষ্ট সংস্থার কর্মকর্তা তালিকা ও অনুমতি ম্যাট্রিক্স' 
          : 'Zero-Trust authorization matrix enforcing least-privilege principles across military and civil oversight entities'}
        statusBadge="ZERO-TRUST RBAC ENFORCED"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* User Directory Table */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-3">
            <div>
              <h3 className="font-bold text-sm text-[#10243A]">
                Authorized Personnel Directory (RBAC)
              </h3>
              <p className="text-xs text-slate-500">
                Inter-agency credentials with biometric 2FA and role assignments
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search officer or agency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#10243A] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Personnel Name</th>
                  <th className="p-2.5">Official Agency</th>
                  <th className="p-2.5">Assigned Role</th>
                  <th className="p-2.5">2FA Security</th>
                  <th className="p-2.5">Account Status</th>
                  <th className="p-2.5 text-right">Simulate Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => {
                  const isCurrent = currentUser.id === u.id;
                  return (
                    <tr 
                      key={u.id}
                      className={`hover:bg-slate-50  transition-colors ${
                        isCurrent ? 'bg-blue-50/50 ' : ''
                      }`}
                    >
                      <td className="p-2.5">
                        <div className="flex items-center space-x-2.5">
                          <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-slate-300" />
                          <div>
                            <div className="font-bold text-[#10243A] flex items-center space-x-1.5">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="text-[9px] font-mono font-bold bg-[#2386C8] text-white px-1.5 py-0.2 rounded">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2.5 font-medium text-slate-700">
                        {u.agency || u.department}
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className="text-emerald-600 font-mono text-[10px] flex items-center space-x-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>ENFORCED (FIDO2)</span>
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => switchRole(u.role)}
                          className="px-2.5 py-1 rounded bg-[#10243A] text-white text-[11px] font-semibold hover:bg-[#173B5C] transition-colors"
                        >
                          Switch
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Granular RBAC Permissions Matrix Table */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#10243A]">
              Granular Role-Based Permissions Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Access control rules mapped across the 18 unified modules
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Module Capability</th>
                  <th className="p-2.5 text-center">Super Admin</th>
                  <th className="p-2.5 text-center">Exec Viewer</th>
                  <th className="p-2.5 text-center">Intel Analyst</th>
                  <th className="p-2.5 text-center">Verification Officer</th>
                  <th className="p-2.5 text-center">Module Operator</th>
                  <th className="p-2.5 text-center">Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionsMatrix.map((perm, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-semibold text-[#10243A]">
                      {perm.module}
                    </td>
                    <td className="p-2.5 text-center">{perm.superAdmin ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="p-2.5 text-center">{perm.execViewer ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="p-2.5 text-center">{perm.analyst ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="p-2.5 text-center">{perm.verifier ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="p-2.5 text-center">{perm.operator ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="p-2.5 text-center">{perm.auditor ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
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


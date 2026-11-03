import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { ToastContainer } from './components/common/ToastContainer';

// 18 Enterprise Module Pages
import { ExecutiveDashboard } from './components/pages/ExecutiveDashboard';
import { GeospatialIntelligence } from './components/pages/GeospatialIntelligence';
import { FalconAerialIntelligence } from './components/pages/FalconAerialIntelligence';
import { RiverShiftAi } from './components/pages/RiverShiftAi';
import { EcoGuardAi } from './components/pages/EcoGuardAi';
import { BorderLinkAi } from './components/pages/BorderLinkAi';
import { TrustPlateAi } from './components/pages/TrustPlateAi';
import { FalconBoat } from './components/pages/FalconBoat';
import { DataFusionCenter } from './components/pages/DataFusionCenter';
import { DataManagement } from './components/pages/DataManagement';
import { AnalyticsReports } from './components/pages/AnalyticsReports';
import { EventAlertCenter } from './components/pages/EventAlertCenter';
import { HumanVerificationCenter } from './components/pages/HumanVerificationCenter';
import { MissionActivityHistory } from './components/pages/MissionActivityHistory';
import { DeviceSensorManagement } from './components/pages/DeviceSensorManagement';
import { UserRoleManagement } from './components/pages/UserRoleManagement';
import { SecurityAudit } from './components/pages/SecurityAudit';
import { SystemSettings } from './components/pages/SystemSettings';

import { 
  LayoutDashboard, 
  MapPin, 
  Plane, 
  Waves, 
  Bell, 
  UserCheck, 
  FileBarChart, 
  Settings 
} from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, setActiveTab, language } = useAppStore();

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const renderActiveModule = () => {
    switch (activeTab) {
      // 01. Executive Overview Dashboard
      case 'executive-dashboard':
      case 'command-center':
        return <ExecutiveDashboard />;

      // 02. Geospatial Intelligence
      case 'geospatial':
      case 'gis':
        return <GeospatialIntelligence />;

      // 03. Falcon Aerial Intelligence
      case 'aerial-ai':
      case 'monitoring':
        return <FalconAerialIntelligence />;

      // 04. RiverShift AI
      case 'rivershift-ai':
        return <RiverShiftAi />;

      // 05. EcoGuard AI
      case 'ecoguard-ai':
      case 'ai-intelligence':
        return <EcoGuardAi />;

      // 06. BorderLink AI
      case 'borderlink-ai':
        return <BorderLinkAi />;

      // 07. TrustPlate AI
      case 'trustplate-ai':
        return <TrustPlateAi />;

      // 08. Falcon Boat
      case 'falcon-boat':
        return <FalconBoat />;

      // 09. Data Fusion Center
      case 'data-fusion':
        return <DataFusionCenter />;

      // 10. Data Management
      case 'data-management':
        return <DataManagement />;

      // 11. Analytics & Reports
      case 'analytics-reports':
      case 'reports':
        return <AnalyticsReports />;

      // 12. Event & Alert Center
      case 'event-alerts':
      case 'alerts':
        return <EventAlertCenter />;

      // 13. Human Verification Center
      case 'human-verification':
      case 'incidents':
        return <HumanVerificationCenter />;

      // 14. Mission & Activity History
      case 'mission-history':
        return <MissionActivityHistory />;

      // 15. Device & Sensor Management
      case 'devices-sensors':
        return <DeviceSensorManagement />;

      // 16. User & Role Management
      case 'user-roles':
        return <UserRoleManagement />;

      // 17. Security & Audit
      case 'security-audit':
        return <SecurityAudit />;

      // 18. System Settings
      case 'system-settings':
      case 'admin':
        return <SystemSettings />;

      default:
        return <ExecutiveDashboard />;
    }
  };

  const mobileNavItems = [
    { id: 'executive-dashboard' as const, label: language === 'BN' ? 'ড্যাশবোর্ড' : 'Overview', icon: LayoutDashboard },
    { id: 'geospatial' as const, label: language === 'BN' ? 'ম্যাপ' : 'GIS Map', icon: MapPin },
    { id: 'aerial-ai' as const, label: language === 'BN' ? 'ড্রোন' : 'Drone', icon: Plane },
    { id: 'rivershift-ai' as const, label: language === 'BN' ? 'নদী' : 'RiverShift', icon: Waves },
    { id: 'event-alerts' as const, label: language === 'BN' ? 'অ্যালার্ট' : 'Alerts', icon: Bell },
    { id: 'human-verification' as const, label: language === 'BN' ? 'যাচাই' : 'Verify', icon: UserCheck },
    { id: 'analytics-reports' as const, label: language === 'BN' ? 'রিপোর্ট' : 'Reports', icon: FileBarChart },
    { id: 'system-settings' as const, label: language === 'BN' ? 'সেটিংস' : 'Settings', icon: Settings }
  ];

  return (
    <div className="h-screen bg-[#F2F6FC] text-[#172B45] flex flex-col font-sans overflow-hidden">
      {/* Top Government Command Navbar */}
      <Navbar />

      {/* Main Workspace: Left Collapsible Sidebar + Content Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#F2F6FC] custom-scrollbar">
          {renderActiveModule()}
        </main>
      </div>

      {/* Sovereign Bottom Footer Bar */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-14 bg-[#062744] border-t border-[#0D365C] flex items-center justify-around z-40 px-1 text-white">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || 
            (item.id === 'executive-dashboard' && activeTab === 'command-center') ||
            (item.id === 'geospatial' && activeTab === 'gis') ||
            (item.id === 'aerial-ai' && activeTab === 'monitoring') ||
            (item.id === 'event-alerts' && activeTab === 'alerts') ||
            (item.id === 'human-verification' && activeTab === 'incidents') ||
            (item.id === 'analytics-reports' && activeTab === 'reports') ||
            (item.id === 'system-settings' && activeTab === 'admin');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded transition-colors ${
                isActive ? 'text-[#38BDF8] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-mono mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Notification Center Flyout Drawer */}
      <NotificationDrawer />

      {/* Global Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default App;


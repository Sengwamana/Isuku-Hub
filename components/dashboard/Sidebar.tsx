import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  FileWarning, 
  TrendingUp, 
  Users, 
  Settings, 
  Truck, 
  Recycle, 
  Calendar,
  DollarSign,
  ClipboardList,
  BookOpen,
  LifeBuoy,
  Wrench,
  MessageSquare,
  History,
  Package,
  ScrollText,
  FileText,
  BarChart3
} from 'lucide-react';

export type UserRole = 'household' | 'collector' | 'recycler' | 'official';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab }) => {
  
  const getMenuItems = (role: UserRole) => {
    const common = [
      { id: 'settings', label: 'Settings', icon: Settings }
    ];

    switch (role) {
      case 'household':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
          { id: 'payments', label: 'Payments', icon: DollarSign },
          { id: 'report', label: 'Report Issue', icon: FileWarning },
          { id: 'guide', label: 'Waste Guide', icon: BookOpen },
          { id: 'support', label: 'Help & Support', icon: LifeBuoy },
          ...common
        ];
      case 'collector':
        return [
          { id: 'overview', label: 'Route Dashboard', icon: Truck },
          { id: 'tasks', label: 'Daily Pickups', icon: ClipboardList },
          { id: 'map', label: 'Live Map', icon: MapIcon },
          { id: 'fleet', label: 'Fleet Mgmt', icon: Wrench },
          { id: 'chat', label: 'Team Chat', icon: MessageSquare },
          { id: 'history', label: 'History', icon: History },
          { id: 'earnings', label: 'Earnings', icon: DollarSign },
          ...common
        ];
      case 'recycler':
        return [
          { id: 'overview', label: 'Sourcing Hub', icon: Recycle },
          { id: 'requests', label: 'Pickup Requests', icon: ClipboardList },
          { id: 'inventory', label: 'Inventory', icon: Package },
          { id: 'market', label: 'Marketplace', icon: DollarSign },
          { id: 'logistics', label: 'Logistics', icon: Truck },
          { id: 'impact', label: 'Impact Report', icon: TrendingUp },
          ...common
        ];
      case 'official':
        return [
          { id: 'overview', label: 'City Operations', icon: LayoutDashboard },
          { id: 'gis', label: 'GIS & Zoning', icon: MapIcon },
          { id: 'compliance', label: 'Enforcement', icon: FileWarning },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'users', label: 'User Registry', icon: Users },
          { id: 'policy', label: 'Policy Docs', icon: ScrollText },
          { id: 'reports', label: 'Reports', icon: FileText },
          ...common
        ];
      default:
        return common;
    }
  };

  const menuItems = getMenuItems(role);

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 h-auto md:min-h-screen p-4 flex flex-col shrink-0">
      <div className="mb-4 md:mb-8 px-2 flex items-center gap-3">
         <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">IH</div>
         <span className="font-bold text-slate-900 text-lg tracking-tight">IsukuHub</span>
      </div>

      <nav className="space-y-1 flex-1 overflow-x-auto md:overflow-visible flex md:block gap-2 md:gap-0 pb-2 md:pb-0 scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 md:flex-shrink w-auto md:w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-brand-50 text-brand-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-brand-600' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden md:block mt-auto pt-6 border-t border-slate-100">
        <div className="px-4 py-3 bg-slate-50 rounded-xl mb-4">
           <p className="text-xs font-bold text-slate-500 uppercase mb-1">Current Role</p>
           <p className="text-sm font-bold text-slate-900 capitalize">{role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';
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
  BarChart3,
  LogOut,
  ChevronDown
} from 'lucide-react';

export type UserRole = 'household' | 'collector' | 'recycler' | 'official';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onSwitchRole }) => {
  
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
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 h-auto md:min-h-screen p-4 flex flex-col shrink-0 sticky top-0 z-30 md:static">
      <div className="mb-4 md:mb-8 px-2 flex items-center justify-between md:justify-start gap-3">
         <Link to="/" className="flex items-center gap-3 group">
           <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold shadow-brand-200 shadow-lg group-hover:bg-brand-700 transition-all">IH</div>
           <span className="font-bold text-slate-900 text-xl tracking-tight group-hover:text-brand-800 transition-colors">IsukuHub</span>
         </Link>
         
         {/* Mobile Role Switcher - Compact */}
         <div className="md:hidden relative bg-slate-50 rounded-lg border border-slate-200">
            <select 
                value={role} 
                onChange={(e) => onSwitchRole(e.target.value as UserRole)}
                className="appearance-none bg-transparent text-slate-700 text-xs font-bold py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
            >
               <option value="household">Household</option>
               <option value="collector">Collector</option>
               <option value="recycler">Recycler</option>
               <option value="official">Official</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
               <ChevronDown size={14} />
            </div>
         </div>
      </div>

      <nav className="flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 text-sm font-medium rounded-xl transition-all whitespace-nowrap group ${
                isActive 
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={`transition-colors ${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden md:block mt-auto pt-6 border-t border-slate-100">
        <div className="px-4 py-4 bg-slate-50 rounded-2xl mb-4 border border-slate-200/60">
           <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-wider flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
             Viewing As
           </p>
           <div className="relative group">
             <div className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200 pointer-events-none group-hover:border-brand-300 transition-colors"></div>
             <select 
                value={role} 
                onChange={(e) => onSwitchRole(e.target.value as UserRole)}
                className="relative w-full appearance-none bg-transparent text-slate-900 text-sm font-bold py-2.5 pl-3 pr-10 focus:outline-none cursor-pointer z-10"
             >
               <option value="household">Household</option>
               <option value="collector">Collector</option>
               <option value="recycler">Recycler</option>
               <option value="official">Official</option>
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 group-hover:text-brand-600 transition-colors z-20">
                <ChevronDown size={16} />
             </div>
           </div>
        </div>
        
        <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors group">
            <LogOut size={20} className="group-hover:stroke-red-600 transition-colors" />
            <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
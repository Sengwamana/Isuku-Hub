import React from 'react';
import Sidebar, { UserRole } from './Sidebar';
import { Bell, Search, User } from 'lucide-react';

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: UserRole) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, children, activeTab, setActiveTab, onSwitchRole }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative hidden md:block max-w-md w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder={`Search ${role} resources...`} 
                 className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-200 w-full"
               />
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Role Switcher for Demo */}
            <select 
              value={role} 
              onChange={(e) => onSwitchRole(e.target.value as UserRole)}
              className="text-xs font-bold bg-slate-100 border-none rounded-lg px-2 py-1 text-slate-600 focus:ring-0 cursor-pointer hover:bg-slate-200"
            >
               <option value="household">Household View</option>
               <option value="collector">Collector View</option>
               <option value="recycler">Recycler View</option>
               <option value="official">Official View</option>
            </select>

            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 border border-brand-200">
               <User size={18} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
           {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
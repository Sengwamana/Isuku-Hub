import React from 'react';
import { Battery, Wifi, Signal, Bell, User, MapPin, Truck, CheckCircle, BarChart3 } from 'lucide-react';

interface PhoneMockupProps {
  variant?: 'hero' | 'showcase';
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ variant = 'hero' }) => {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden">
      {/* Notch & Status Bar */}
      <div className="h-[32px] w-full bg-gray-900 absolute top-0 left-0 z-20 rounded-t-[2rem]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[18px] w-[120px] bg-black rounded-b-[1rem]"></div>
      </div>
      <div className="pt-8 px-4 pb-4 bg-gray-50 h-full w-full overflow-hidden flex flex-col relative">
        {/* Status Bar Icons */}
        <div className="flex justify-between items-center text-xs text-slate-900 px-1 mb-4 opacity-70">
          <span>9:41</span>
          <div className="flex gap-1.5">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 border border-brand-200">
              <User size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Good Morning,</p>
              <p className="text-sm font-bold text-slate-800">Kigali Resident</p>
            </div>
          </div>
          <button className="p-2 bg-white rounded-full shadow-sm text-slate-600">
            <Bell size={16} />
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-brand-700 to-brand-500 rounded-2xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <p className="text-brand-50 text-xs font-medium mb-1">Waste Compliance Score</p>
            <div className="flex items-end gap-2 mb-4">
              <h2 className="text-3xl font-bold">98/100</h2>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full mb-1 flex items-center">
                 <CheckCircle size={10} className="mr-1" /> Excellent
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-brand-100">Next Pickup</p>
                <p className="text-xs font-semibold">Today, 2:00 PM</p>
              </div>
              <button className="bg-white text-brand-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                View Route
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:border-brand-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-2">
              <Truck size={16} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Schedule</p>
            <p className="text-[10px] text-slate-400">Request pickup</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:border-brand-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <MapPin size={16} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Report</p>
            <p className="text-[10px] text-slate-400">Illegal dumping</p>
          </div>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-hidden">
           <h3 className="text-xs font-bold text-slate-800 mb-3">Recent Activity</h3>
           <div className="space-y-3">
             <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-50">
               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                 <CheckCircle size={14} />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-xs font-semibold text-slate-700 truncate">Plastic Recycling</p>
                 <p className="text-[10px] text-slate-400">Completed • +50 Points</p>
               </div>
               <span className="text-[10px] font-mono text-slate-400">10:23</span>
             </div>

             <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-50">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                 <BarChart3 size={14} />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-xs font-semibold text-slate-700 truncate">Weekly Report</p>
                 <p className="text-[10px] text-slate-400">Available now</p>
               </div>
               <span className="text-[10px] font-mono text-slate-400">Yesterday</span>
             </div>
           </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 py-3 px-6 flex justify-between items-center z-20">
            <div className="flex flex-col items-center text-brand-600">
              <div className="mb-0.5"><div className="w-1 h-1 bg-brand-600 rounded-full"></div></div>
            </div>
            <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
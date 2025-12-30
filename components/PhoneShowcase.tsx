import React from 'react';
import { Truck, AlertTriangle, Bell, Recycle, ArrowRight } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const PhoneShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative" id="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Powerful Features, <br /> Designed for Clarity
          </h2>
          <p className="text-lg text-slate-600">
            A complete toolkit to simplify your waste management workflows with AI automation and real-time insights.
          </p>
        </div>

        <div className="relative flex justify-center items-center py-10">
          {/* Central Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-200 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200 rounded-full opacity-30"></div>

          {/* Left Floating Card 1 */}
          <div className="absolute left-4 lg:left-20 top-20 lg:top-1/4 z-10 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-[240px] text-left hidden md:block hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-3">
              <Truck size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Pickup Scheduling</h4>
            <p className="text-xs text-slate-500 mt-1">Track trucks and collection times in real-time.</p>
          </div>

          {/* Left Floating Card 2 */}
          <div className="absolute left-10 lg:left-24 bottom-20 lg:bottom-1/4 z-10 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-[240px] text-left hidden md:block hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-3">
              <AlertTriangle size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Geo-Tagged Reports</h4>
            <p className="text-xs text-slate-500 mt-1">AI categorizes dumping incidents automatically.</p>
          </div>

          {/* Right Floating Card 1 */}
          <div className="absolute right-4 lg:right-20 top-20 lg:top-1/4 z-10 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-[240px] text-left hidden md:block hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3">
              <Recycle size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Recycler Access</h4>
            <p className="text-xs text-slate-500 mt-1">Connect directly with buyers for recyclable materials.</p>
          </div>

          {/* Right Floating Card 2 */}
          <div className="absolute right-10 lg:right-24 bottom-20 lg:bottom-1/4 z-10 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 max-w-[240px] text-left hidden md:block hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-3">
              <Bell size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Smart Alerts</h4>
            <p className="text-xs text-slate-500 mt-1">Instant notifications for risks and pickup changes.</p>
          </div>

          {/* Center Phone */}
          <div className="relative z-20">
            <PhoneMockup />
            {/* Sparkles */}
            <div className="absolute -bottom-8 -left-8 bg-white p-3 rounded-2xl shadow-lg animate-bounce hidden sm:block">
               <div className="flex gap-1">
                 <div className="text-yellow-400">✨</div>
               </div>
            </div>
             <div className="absolute top-1/2 -right-12 bg-white p-2 rounded-full shadow-lg animate-pulse hidden sm:block">
               <div className="text-brand-500">
                 <div className="h-6 w-6 flex items-center justify-center rounded-full bg-brand-100">
                    <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneShowcase;
import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Cpu } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-8">
              <ShieldCheck size={14} />
              <span>Smart City Infrastructure</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Smarter Waste Management <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-400">
                Powered by Technology
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Manage waste pickups, optimize routes, prevent illegal dumping, and enable recycling — all in one transparent digital platform for Kigali.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
                Start with IsukuHub
                <ArrowRight size={18} className="ml-2" />
              </button>
              <Link to="/dashboard" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                View Dashboard
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Cpu size={18} className="text-brand-500" />
                <span>AI Route Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-500" />
                <span>Geo-Tagged Reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-brand-500" />
                <span>Government Ready</span>
              </div>
            </div>
            
            {/* Trusted By Logos (Stylized text for demo) */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-4">Trusted Partners</p>
              <div className="flex gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Placeholders for partner logos */}
                 <span className="text-xl font-bold text-slate-800">COOPED</span>
                 <span className="text-xl font-bold text-slate-800">AGRUNI</span>
                 <span className="text-xl font-bold text-slate-800">RURA</span>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup Area */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating Card - Balance/Status */}
            <div className="absolute top-20 left-0 lg:-left-8 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] hidden md:block animate-fade-in-up">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-semibold text-slate-500">Recycling Rate</span>
                 <span className="text-xs font-bold text-green-600">+12%</span>
               </div>
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-500 w-[75%] rounded-full"></div>
               </div>
               <p className="text-[10px] text-slate-400 mt-2">Last updated 2 mins ago</p>
            </div>

            {/* Floating Card - Notification */}
            <div className="absolute bottom-32 right-0 lg:-right-4 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[220px] hidden md:block animate-fade-in-up delay-100">
               <div className="flex gap-3 items-start">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Dumping Reported</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-1">Illegal waste detected at Nyarugenge District.</p>
                  </div>
               </div>
            </div>

            <div className="relative z-20 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <PhoneMockup />
            </div>
            
            {/* Decorative background circle behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-br from-brand-100 to-transparent rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
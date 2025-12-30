import React from 'react';
import { Map, RefreshCw, Lightbulb, ArrowUpRight } from 'lucide-react';

const SmartManagement: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Smart Way to <br /> Manage Your Waste
            </h2>
            <p className="text-lg text-slate-600">
              Effortlessly manage collections, reporting, and recycling goals with AI automation and real-time insights.
            </p>
          </div>
          <button className="hidden md:flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors mt-6 md:mt-0">
            Explore Features <ArrowUpRight size={18} className="ml-1" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-brand-200 transition-all duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Map size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Intelligent Portfolio Mapping</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-12">
              Your pickup points are continuously analyzed and structured into smarter route allocation models driven by traffic patterns and AI insights.
            </p>
            <div className="absolute bottom-6 left-8">
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent transition-all">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-brand-200 transition-all duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless Collection Flow</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-12">
              Transactions, scheduling, and recycling records move automatically through one system — no spreadsheets, no manual sorting.
            </p>
            <div className="absolute bottom-6 left-8">
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent transition-all">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-brand-200 transition-all duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Insight-Driven Decisions</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-12">
              Every action is supported by contextual data that helps you act with clarity rather than emotion or guesswork.
            </p>
            <div className="absolute bottom-6 left-8">
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent transition-all">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartManagement;
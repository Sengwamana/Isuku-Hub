import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-[2.5rem] py-20 px-8 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
               </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Take Control of Your <br />
              <span className="text-brand-200">Kigali's Waste Future</span>
            </h2>
            
            <p className="text-lg text-brand-100 mb-10 max-w-xl mx-auto">
              AI-powered automation that helps you manage your waste collection with clarity and ease.
            </p>
            
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-900 bg-white rounded-full hover:bg-brand-50 transition-colors shadow-lg">
              Get Started with IsukuHub <ArrowUpRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
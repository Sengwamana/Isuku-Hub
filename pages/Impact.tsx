import React from 'react';
import StatsBar from '../components/StatsBar';
import ImpactSection from '../components/Impact';
import CTA from '../components/CTA';

const Impact: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-brand-600 py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Our Impact</h1>
        <p className="text-brand-100 max-w-2xl mx-auto text-lg">
          Transforming waste into opportunity for a cleaner, greener Rwanda.
        </p>
      </div>
      <StatsBar />
      <ImpactSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-2xl h-[400px] flex items-center justify-center">
                <p className="text-slate-400 font-medium">Impact Map Visualization</p>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Cleaner Streets, Better Health</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                    By optimizing collection routes and enabling rapid reporting of illegal dumping, IsukuHub has directly contributed to a significant reduction in street-level waste accumulation in pilot sectors.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                        <span>Reduced carbon emissions from collection trucks</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                        <span>Higher recycling participation rates</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                        <span>Improved public hygiene scores</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default Impact;
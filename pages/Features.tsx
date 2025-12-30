import React from 'react';
import FeatureCards from '../components/FeatureCards';
import SmartManagement from '../components/SmartManagement';
import CTA from '../components/CTA';

const Features: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Our Features</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          Discover the tools that power Kigali's smartest waste management system.
        </p>
      </div>
      <FeatureCards />
      <SmartManagement />
      <CTA />
    </div>
  );
};

export default Features;
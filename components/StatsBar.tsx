import React from 'react';

const StatsBar: React.FC = () => {
  const stats = [
    { value: '+40%', label: 'Reduction in illegal dumping' },
    { value: '3×', label: 'Faster collection routes' },
    { value: '35%', label: 'Recycling rate improvement' },
    { value: '24/7', label: 'City monitoring' },
  ];

  return (
    <div className="bg-brand-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-brand-600/50">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col items-center ${index % 2 !== 0 ? 'border-l md:border-none border-brand-600/50 pl-4 md:pl-0' : ''}`}>
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</span>
              <span className="text-brand-100 text-sm font-medium max-w-[140px] leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: { label: string; value: number; color?: string }[];
  type?: 'bar' | 'progress';
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, data, type = 'bar' }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-2 min-h-[150px]">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 w-full group">
            <div className="relative w-full flex items-end justify-center h-32 bg-slate-50 rounded-lg overflow-hidden">
               <div 
                 className={`w-full mx-1 rounded-t-lg transition-all duration-500 ${item.color || 'bg-brand-500'} group-hover:opacity-80`}
                 style={{ height: `${(item.value / maxValue) * 100}%` }}
               ></div>
               <div className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                 {item.value}
               </div>
            </div>
            <span className="text-xs font-medium text-slate-500 truncate w-full text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;
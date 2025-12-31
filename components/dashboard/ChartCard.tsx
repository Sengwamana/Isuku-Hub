import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: { label: string; value: number; color?: string }[];
  type?: 'bar' | 'progress';
  isLoading?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, data, type = 'bar', isLoading = false }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col">
         <div className="mb-6 space-y-2">
            <div className="w-48 h-6 bg-slate-100 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-slate-50 rounded animate-pulse"></div>
         </div>
         <div className="flex-1 flex items-end justify-between gap-2 min-h-[150px]">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="w-full flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-t-lg animate-pulse" style={{ height: `${Math.random() * 50 + 20}%`}}></div>
                    <div className="w-8 h-3 bg-slate-50 rounded animate-pulse"></div>
                </div>
            ))}
         </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-2 min-h-[150px]">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 w-full group relative">
            <div className="relative w-full flex items-end justify-center h-32 bg-slate-50 rounded-lg overflow-hidden">
               <div 
                 className={`w-full mx-1 rounded-t-lg transition-all duration-1000 ease-out ${item.color || 'bg-brand-500'} group-hover:opacity-80 group-hover:scale-y-105 origin-bottom`}
                 style={{ height: `${(item.value / maxValue) * 100}%` }}
               ></div>
            </div>
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none z-10 shadow-lg whitespace-nowrap">
                 {item.value} units
                 <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
            </div>
            <span className="text-xs font-medium text-slate-500 truncate w-full text-center group-hover:text-brand-600 transition-colors">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;
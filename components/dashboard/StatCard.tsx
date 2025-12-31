import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  colorClass?: string;
  bgClass?: string;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, colorClass = 'text-brand-600', bgClass = 'bg-brand-50', isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
         <div className="flex justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse"></div>
            <div className="w-16 h-6 rounded-full bg-slate-50 animate-pulse"></div>
         </div>
         <div className="w-24 h-4 bg-slate-100 rounded mb-2 animate-pulse"></div>
         <div className="w-32 h-8 bg-slate-100 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass} transition-colors`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full border border-transparent ${
            trend.direction === 'up' ? 'bg-green-50 text-green-700 border-green-100' :
            trend.direction === 'down' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-600 border-slate-100'
          }`}>
            {trend.direction === 'up' && <ArrowUp size={12} className="mr-1" />}
            {trend.direction === 'down' && <ArrowDown size={12} className="mr-1" />}
            {trend.direction === 'neutral' && <Minus size={12} className="mr-1" />}
            {trend.value}
          </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1 tracking-wide">{title}</h3>
      <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</p>
    </div>
  );
};

export default StatCard;
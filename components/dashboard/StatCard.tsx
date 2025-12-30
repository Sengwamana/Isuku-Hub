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
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, colorClass = 'text-brand-600', bgClass = 'bg-brand-50' }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
            trend.direction === 'up' ? 'bg-green-50 text-green-700' :
            trend.direction === 'down' ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'
          }`}>
            {trend.direction === 'up' && <ArrowUp size={12} className="mr-1" />}
            {trend.direction === 'down' && <ArrowDown size={12} className="mr-1" />}
            {trend.direction === 'neutral' && <Minus size={12} className="mr-1" />}
            {trend.value}
          </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
};

export default StatCard;
import React from 'react';
import { MoreHorizontal, Filter } from 'lucide-react';

interface TableCardProps {
  title: string;
  columns: string[];
  children: React.ReactNode;
  actionLabel?: string;
  isLoading?: boolean;
}

const TableCard: React.FC<TableCardProps> = ({ title, columns, children, actionLabel = 'View All', isLoading = false }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" aria-label="Filter results">
            <Filter size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
               [1, 2, 3].map((i) => (
                 <tr key={i}>
                   {columns.map((_, idx) => (
                     <td key={idx} className="px-6 py-4">
                        <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                     </td>
                   ))}
                 </tr>
               ))
            ) : (
                children
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-auto p-4 border-t border-slate-50 bg-slate-50/50 text-center">
        <button className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-2">
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default TableCard;
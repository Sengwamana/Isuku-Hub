import React from 'react';
import { Map, Maximize2, Layers } from 'lucide-react';

interface MapCardProps {
  title: string;
  type: 'route' | 'heatmap' | 'points' | 'basic';
}

const MapCard: React.FC<MapCardProps> = ({ title, type }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-1 overflow-hidden h-full flex flex-col relative group">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Map size={16} className="text-brand-600" />
          {title}
        </h3>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
         <button className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-600 hover:text-brand-600 transition-colors">
            <Layers size={18} />
         </button>
         <button className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-600 hover:text-brand-600 transition-colors">
            <Maximize2 size={18} />
         </button>
      </div>

      {/* Mock Map Background */}
      <div className="w-full h-full bg-slate-100 rounded-xl relative overflow-hidden bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/30.0619,-1.9441,13,0/800x600?access_token=pk.xxx')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-200/20"></div>
        
        {/* Simulating GIS Layers based on Type */}
        
        {/* Route Type: Polyline + Trucks */}
        {type === 'route' && (
           <div className="absolute inset-0">
              <svg className="w-full h-full opacity-60">
                 <path d="M100,100 Q200,50 300,150 T500,100" fill="none" stroke="#0d9488" strokeWidth="4" strokeDasharray="8 4" className="animate-pulse" />
              </svg>
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-brand-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs animate-bounce">
                 🚚
              </div>
           </div>
        )}

        {/* Heatmap Type: Blobs */}
        {type === 'heatmap' && (
           <div className="absolute inset-0">
              <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-30"></div>
           </div>
        )}

        {/* Points Type: Pins */}
        {type === 'points' && (
           <div className="absolute inset-0">
              {[1,2,3,4].map((i) => (
                 <div key={i} className="absolute w-3 h-3 bg-blue-600 rounded-full border border-white shadow-md" style={{ top: `${20 * i}%`, left: `${15 * i + 10}%` }}></div>
              ))}
           </div>
        )}

        {/* Basic Home Marker */}
        {type === 'basic' && (
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center animate-ping absolute"></div>
              <div className="w-8 h-8 bg-brand-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-white relative z-10">
                 🏠
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default MapCard;
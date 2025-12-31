import React, { useState } from 'react';
import { FileText, Download, BookOpen, Video, Search, Loader2, Check } from 'lucide-react';
import CTA from '../components/CTA';

const Resources: React.FC = () => {
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string | null>(null);

  const resources = [
    { title: 'Waste Separation Guide', type: 'PDF Guide', icon: <FileText size={20} /> },
    { title: 'Kigali Sanitation Policy', type: 'Official Doc', icon: <BookOpen size={20} /> },
    { title: 'Recycling 101 Video', type: 'Video Tutorial', icon: <Video size={20} /> },
    { title: 'Annual Impact Report 2024', type: 'Report', icon: <Download size={20} /> },
    { title: 'Composting at Home', type: 'Article', icon: <FileText size={20} /> },
    { title: 'Partner Onboarding Kit', type: 'Zip Bundle', icon: <Download size={20} /> },
  ];

  const filtered = resources.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleResourceClick = (title: string) => {
    if (downloading || completed === title) return;
    
    setDownloading(title);
    // Simulate download delay
    setTimeout(() => {
        setDownloading(null);
        setCompleted(title);
        // Reset completed state after a few seconds so it can be "downloaded" again
        setTimeout(() => setCompleted(null), 3000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      <div className="bg-brand-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Resources</h1>
        <p className="text-brand-200 max-w-2xl mx-auto text-lg mb-8">
          Everything you need to know about using IsukuHub and managing waste effectively.
        </p>
        <div className="max-w-xl mx-auto relative group">
           <input 
             type="text" 
             placeholder="Search guides, policies..." 
             className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-brand-700 text-white placeholder-brand-300 focus:outline-none focus:bg-brand-800 focus:ring-4 focus:ring-brand-500/20 transition-all"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300 group-focus-within:text-brand-100 transition-colors" size={20} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[500px]">
        {filtered.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No resources found matching "{search}"</p>
                <button onClick={() => setSearch('')} className="mt-4 text-brand-600 font-bold hover:underline">Clear Filters</button>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((res, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => handleResourceClick(res.title)}
                        className="p-6 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all text-left group relative overflow-hidden"
                        disabled={!!downloading && downloading !== res.title}
                    >
                        {/* Progress Bar Background */}
                        {downloading === res.title && (
                            <div className="absolute bottom-0 left-0 h-1 bg-brand-500 animate-[width_1.5s_ease-in-out_forwards]" style={{width: '0%'}}></div>
                        )}
                        
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                                completed === res.title ? 'bg-green-100 text-green-600' :
                                downloading === res.title ? 'bg-brand-50 text-brand-600' : 
                                'bg-slate-50 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600'
                            }`}>
                                {downloading === res.title ? <Loader2 size={24} className="animate-spin" /> : 
                                 completed === res.title ? <Check size={24} /> :
                                 res.icon}
                            </div>
                            <div className="text-slate-300 group-hover:text-brand-500 transition-colors">
                                <Download size={20} />
                            </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700">{res.title}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                            {completed === res.title ? <span className="text-green-600 font-bold">Download Complete</span> : res.type}
                        </p>
                    </button>
                ))}
            </div>
        )}
      </div>
      <CTA />
    </div>
  );
};

export default Resources;
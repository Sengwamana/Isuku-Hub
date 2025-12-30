import React from 'react';
import { FileText, Download, BookOpen, Video } from 'lucide-react';
import CTA from '../components/CTA';

const Resources: React.FC = () => {
  const resources = [
    { title: 'Waste Separation Guide', type: 'PDF Guide', icon: <FileText size={20} /> },
    { title: 'Kigali Sanitation Policy', type: 'Official Doc', icon: <BookOpen size={20} /> },
    { title: 'Recycling 101 Video', type: 'Video Tutorial', icon: <Video size={20} /> },
    { title: 'Annual Impact Report 2024', type: 'Report', icon: <Download size={20} /> },
    { title: 'Composting at Home', type: 'Article', icon: <FileText size={20} /> },
    { title: 'Partner Onboarding Kit', type: 'Zip Bundle', icon: <Download size={20} /> },
  ];

  return (
    <div className="pt-20">
      <div className="bg-brand-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Resources</h1>
        <p className="text-brand-200 max-w-2xl mx-auto text-lg">
          Everything you need to know about using IsukuHub and managing waste effectively.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((res, idx) => (
                <div key={idx} className="p-6 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors mb-4">
                        {res.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700">{res.title}</h3>
                    <p className="text-sm text-slate-500">{res.type}</p>
                </div>
            ))}
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default Resources;
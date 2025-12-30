import React from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import CTA from '../components/CTA';

const Careers: React.FC = () => {
  const positions = [
    { title: 'Senior Backend Engineer', type: 'Full-time', dept: 'Engineering', location: 'Kigali / Hybrid' },
    { title: 'Product Manager (Mobile)', type: 'Full-time', dept: 'Product', location: 'Kigali' },
    { title: 'Customer Success Specialist', type: 'Full-time', dept: 'Operations', location: 'Kigali' },
    { title: 'GIS Data Analyst', type: 'Contract', dept: 'Data Science', location: 'Remote' },
  ];

  return (
    <div className="pt-20">
      <div className="bg-brand-900 py-24 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Green Revolution</h1>
        <p className="text-brand-100 text-lg max-w-2xl mx-auto mb-8">
          We're looking for passionate problem solvers to help us build the future of waste management in Africa.
        </p>
        <button className="px-8 py-3 bg-white text-brand-900 rounded-full font-bold hover:bg-brand-50 transition-colors">
          View Open Roles
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Open Positions</h2>
          <p className="text-slate-600">Come do the best work of your life.</p>
        </div>

        <div className="space-y-4">
          {positions.map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group cursor-pointer">
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
                    <span>{job.dept}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center text-brand-600 font-semibold text-sm">
                  Apply Now <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Don't see your role?</h3>
           <p className="text-slate-600 mb-6">
             We are always looking for talent. Send your CV and a cover letter to careers@isukuhub.rw.
           </p>
           <a href="mailto:careers@isukuhub.rw" className="text-brand-600 font-bold hover:underline">
             Email Us
           </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;
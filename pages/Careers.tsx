import React, { useState } from 'react';
import { ArrowRight, Briefcase, CheckCircle, Loader2 } from 'lucide-react';

const Careers: React.FC = () => {
  const [applying, setApplying] = useState<string | null>(null);
  const [applied, setApplied] = useState<string[]>([]);

  const positions = [
    { id: 'job-1', title: 'Senior Backend Engineer', type: 'Full-time', dept: 'Engineering', location: 'Kigali / Hybrid' },
    { id: 'job-2', title: 'Product Manager (Mobile)', type: 'Full-time', dept: 'Product', location: 'Kigali' },
    { id: 'job-3', title: 'Customer Success Specialist', type: 'Full-time', dept: 'Operations', location: 'Kigali' },
    { id: 'job-4', title: 'GIS Data Analyst', type: 'Contract', dept: 'Data Science', location: 'Remote' },
  ];

  const handleApply = (id: string) => {
    if (applied.includes(id)) return;
    setApplying(id);
    // Simulate application process
    setTimeout(() => {
        setApplying(null);
        setApplied(prev => [...prev, id]);
    }, 1500);
  };

  const scrollToRoles = () => {
    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20">
      <div className="bg-brand-900 py-24 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Green Revolution</h1>
        <p className="text-brand-100 text-lg max-w-2xl mx-auto mb-8">
          We're looking for passionate problem solvers to help us build the future of waste management in Africa.
        </p>
        <button 
            onClick={scrollToRoles}
            className="px-8 py-3 bg-white text-brand-900 rounded-full font-bold hover:bg-brand-50 transition-all active:scale-95 shadow-lg"
        >
          View Open Roles
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="open-roles">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Open Positions</h2>
          <p className="text-slate-600">Come do the best work of your life.</p>
        </div>

        <div className="space-y-4">
          {positions.map((job) => {
            const isApplied = applied.includes(job.id);
            const isApplying = applying === job.id;

            return (
                <div 
                    key={job.id} 
                    className={`bg-white p-6 rounded-xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group
                    ${isApplied ? 'border-green-200 bg-green-50/50' : 'border-slate-200 hover:border-brand-300 hover:shadow-md'}`}
                >
                <div className="flex items-start gap-4 w-full">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isApplied ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-slate-500'}`}>
                        {isApplied ? <CheckCircle size={20} /> : <Briefcase size={20} />}
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
                <div className="shrink-0 w-full sm:w-auto">
                    <button 
                        onClick={() => handleApply(job.id)}
                        disabled={isApplied || isApplying}
                        className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm transition-all
                        ${isApplied 
                            ? 'text-green-700 bg-green-100 cursor-default' 
                            : 'text-brand-600 bg-brand-50 hover:bg-brand-100 active:scale-95'}`}
                    >
                        {isApplying ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                        {isApplied ? 'Applied' : isApplying ? 'Sending...' : 'Apply Now'}
                        {!isApplied && !isApplying && <ArrowRight size={16} className="ml-1" />}
                    </button>
                </div>
                </div>
            )
          })}
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Don't see your role?</h3>
           <p className="text-slate-600 mb-6">
             We are always looking for talent. Send your CV and a cover letter to careers@isukuhub.rw.
           </p>
           <a href="mailto:careers@isukuhub.rw" className="inline-flex items-center justify-center px-6 py-2 bg-white border border-slate-200 text-brand-600 font-bold rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-all shadow-sm">
             Email Us
           </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;
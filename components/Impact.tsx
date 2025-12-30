import React from 'react';
import { Quote } from 'lucide-react';

const Impact: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100" id="impact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: Summary */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Trusted by Smart <br /> Citizens & Leaders
            </h2>
            <div className="mt-8">
               <div className="flex items-center gap-3 mb-2">
                 <h3 className="text-5xl font-extrabold text-slate-900">8X</h3>
                 <span className="text-lg font-medium text-slate-600 leading-tight">Clarity That Builds <br /> Cleaner Communities</span>
               </div>
            </div>

            <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 relative">
               <Quote className="text-brand-200 absolute top-6 left-6" size={40} />
               <p className="relative z-10 text-slate-700 text-lg leading-relaxed italic mb-6 pt-6">
                 "IsukuHub made managing our neighborhood waste easier to understand. Everything feels organized in one place, and the insights help us make decisions with more confidence and far less stress."
               </p>
               <div className="flex items-center gap-4">
                 <img src="https://picsum.photos/100/100?random=1" alt="Alex" className="w-12 h-12 rounded-full object-cover" />
                 <div>
                   <p className="text-sm font-bold text-slate-900">Alex Morgan</p>
                   <p className="text-xs text-slate-500">Kigali Sector Leader</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Side: Grid of smaller testimonials */}
          <div className="grid gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <Quote className="text-brand-200 mb-4" size={24} />
               <p className="text-sm text-slate-600 mb-4">
                 "IsukuHub automates tracking and categorization in the background, saving me time and reducing the mental load of daily logistics management."
               </p>
               <div className="flex items-center gap-3">
                 <img src="https://picsum.photos/100/100?random=2" alt="Emily" className="w-10 h-10 rounded-full object-cover" />
                 <div>
                   <p className="text-xs font-bold text-slate-900">Emily Carter</p>
                   <p className="text-[10px] text-slate-500">Environmental Officer</p>
                 </div>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Quote className="text-brand-200 mb-4" size={24} />
                  <p className="text-xs text-slate-600 mb-4">
                    "I no longer check multiple apps. IsukuHub keeps everything current and highlights what truly matters when changes happen."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/100/100?random=3" alt="Sophia" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Sophia Martinez</p>
                      <p className="text-[10px] text-slate-500">Business Consultant</p>
                    </div>
                  </div>
               </div>

               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Quote className="text-brand-200 mb-4" size={24} />
                  <p className="text-xs text-slate-600 mb-4">
                    "While the AI handles complexity behind the scenes and keeps my financial decisions clear and structured."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/100/100?random=4" alt="Olivia" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Olivia Chen</p>
                      <p className="text-[10px] text-slate-500">Growth Strategist</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Impact;
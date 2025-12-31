import React from 'react';
import { Leaf, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <Leaf className="text-brand-600" size={24} />,
      title: "Less Waste, More Control",
      desc: "Automate daily waste workflows and stay fully in control without the manual coordination.",
      badge: "LIVE",
      color: "bg-brand-50",
      link: "/features",
      image: (
        <div className="mt-4 p-4 bg-brand-50/50 rounded-lg border border-brand-100/50 group-hover:bg-brand-50 transition-colors">
           <div className="flex justify-between items-center mb-2">
              <div className="h-2 w-16 bg-brand-200 rounded"></div>
              <div className="h-2 w-8 bg-red-200 rounded"></div>
           </div>
           <div className="text-xl font-bold text-slate-800 mb-1">1,240 kg</div>
           <div className="text-[10px] text-slate-400">Total collected today</div>
           <div className="mt-3 flex gap-1">
              <div className="h-10 w-4 bg-brand-200 rounded-sm"></div>
              <div className="h-6 w-4 bg-brand-100 rounded-sm mt-4"></div>
              <div className="h-12 w-4 bg-brand-300 rounded-sm -mt-2"></div>
           </div>
        </div>
      )
    },
    {
      icon: <Clock className="text-blue-600" size={24} />,
      title: "Save Time, Every Day",
      desc: "Manage routes, pickups, and payments in minutes instead of hours of phone calls.",
      badge: "AUTO MODE",
      color: "bg-blue-50",
      link: "/features",
      image: (
        <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100/50 group-hover:bg-blue-50 transition-colors">
           <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-bold text-slate-600">Automation Active</span>
              <span className="ml-auto text-[10px] text-slate-400">86%</span>
           </div>
           <div className="space-y-2">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-blue-200"></div>
                 <div className="h-1.5 w-20 bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-blue-200"></div>
                 <div className="h-1.5 w-16 bg-slate-200 rounded"></div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: <BarChart2 className="text-purple-600" size={24} />,
      title: "Clarity for Every Decision",
      desc: "AI-powered insights replace manual logs with data-backed confidence.",
      badge: "AI VERIFIED",
      color: "bg-purple-50",
      link: "/impact",
      image: (
        <div className="mt-4 p-4 bg-purple-50/50 rounded-lg border border-purple-100/50 group-hover:bg-purple-50 transition-colors">
           <p className="text-xs font-bold text-slate-700 mb-2">Market Insights</p>
           <div className="flex items-end gap-2 h-16">
              <div className="w-6 bg-purple-100 h-[40%] rounded-t-sm"></div>
              <div className="w-6 bg-purple-200 h-[60%] rounded-t-sm"></div>
              <div className="w-6 bg-purple-300 h-[90%] rounded-t-sm"></div>
              <div className="w-6 bg-purple-100 h-[50%] rounded-t-sm"></div>
           </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Makes IsukuHub Different
          </h2>
          <p className="text-lg text-slate-600">
            Real advantages designed to simplify waste decisions and help you move towards a cleaner city with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Link 
                key={idx} 
                to={feature.link}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                 <div className={`p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform`}>
                   {feature.icon}
                 </div>
                 {feature.badge && (
                   <span className="px-2 py-1 text-[10px] font-bold tracking-wider text-slate-500 bg-slate-100 rounded-md uppercase">
                     {feature.badge}
                   </span>
                 )}
              </div>
              
              {/* Mini UI Mockup inside card */}
              <div className="mb-6 bg-slate-50/50 rounded-lg overflow-hidden border border-slate-100 transition-colors">
                {feature.image}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
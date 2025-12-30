import React from 'react';
import { Target, Users, ShieldCheck, Heart } from 'lucide-react';
import CTA from '../components/CTA';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Building a Cleaner Kigali</h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            IsukuHub is a technology company dedicated to modernizing waste management infrastructure in Rwanda through smart data, transparency, and community engagement.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We believe that a clean city is the foundation of a healthy society. Our mission is to eliminate illegal dumping and inefficiency by connecting households, waste collectors, and recyclers on a single, transparent digital platform.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                By digitizing the waste value chain, we empower citizens to take ownership of their environment while providing city leaders with the data they need to make smarter infrastructure decisions.
              </p>
            </div>
            <div className="bg-brand-50 rounded-3xl p-8 md:p-12 relative">
               <div className="absolute top-6 right-6 text-brand-200">
                 <Target size={64} opacity={0.2} />
               </div>
               <h3 className="text-2xl font-bold text-brand-900 mb-4">The 2030 Vision</h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                   <p className="text-brand-800">Zero illegal dumping in Kigali sectors.</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                   <p className="text-brand-800">100% digital payment adoption for waste services.</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                   <p className="text-brand-800">Create 5,000+ green jobs in recycling and logistics.</p>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600">The principles that guide every feature we build and every partnership we form.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Transparency</h3>
                <p className="text-slate-600">No hidden fees, no missed pickups without explanation. We build trust through open data.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Community First</h3>
                <p className="text-slate-600">Technology works best when it serves people. We design for everyone, from households to collectors.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sustainability</h3>
                <p className="text-slate-600">Every line of code we write is aimed at preserving our environment for future generations.</p>
             </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;
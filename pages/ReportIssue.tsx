import React, { useState } from 'react';
import { Camera, MapPin, Upload, X } from 'lucide-react';
import CTA from '../components/CTA';

const ReportIssue: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0,0);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl text-center shadow-lg border border-slate-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Report Submitted!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for helping keep Kigali clean. Your report ID is #RPT-2024-089. Our team has been notified and will investigate the location.
          </p>
          <div className="flex flex-col gap-3">
             <button onClick={() => setSubmitted(false)} className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700">
               Submit Another Report
             </button>
             <a href="/dashboard" className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">
               Return to Dashboard
             </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="bg-slate-900 py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
        <p className="text-slate-400">Flag illegal dumping or missed pickups instantly.</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Location Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <MapPin size={16} className="text-brand-600" />
                Incident Location
              </label>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input required type="text" placeholder="Latitude (Auto)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                <input required type="text" placeholder="Longitude (Auto)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <button type="button" className="w-full py-2 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors">
                Use My Current Location
              </button>
            </div>

            {/* Issue Details */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Issue Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Illegal Dumping', 'Missed Pickup', 'Damaged Bin', 'Hazardous Waste', 'Other'].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input type="radio" name="issue" className="peer sr-only" />
                    <div className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 text-center peer-checked:bg-brand-600 peer-checked:text-white peer-checked:border-brand-600 transition-all hover:bg-slate-50">
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Camera size={16} className="text-brand-600" />
                Evidence Photo
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <Upload size={20} />
                </div>
                <p className="text-sm font-medium text-slate-900">Click to upload image</p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Additional Details</label>
              <textarea 
                rows={4} 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
                placeholder="Describe the waste amount, accessibility, etc..."
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all transform hover:-translate-y-1">
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
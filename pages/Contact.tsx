import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="pt-20">
      <div className="bg-brand-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-brand-200 max-w-2xl mx-auto text-lg">
          Have a question about our services or need technical support? We're here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our support team is available Monday through Friday, 8:00 AM to 5:00 PM CAT. For emergency waste hazards, please use the in-app reporting tool for 24/7 assistance.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Head Office</h3>
                  <p className="text-slate-600">742 KG Avenue, Nyarugenge</p>
                  <p className="text-slate-600">Kigali, Rwanda</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Us</h3>
                  <p className="text-slate-600">General: hello@isukuhub.rw</p>
                  <p className="text-slate-600">Support: support@isukuhub.rw</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Call Us</h3>
                  <p className="text-slate-600">+250 788 000 000</p>
                  <p className="text-slate-600">+250 730 000 000</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400">
               <span className="flex items-center gap-2"><MapPin size={20} /> Google Maps Integration</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-8">We've received your inquiry and will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input required type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all bg-slate-50" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input required type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all bg-slate-50" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <select id="subject" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all bg-slate-50">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Issue</option>
                      <option>Partnership Proposal</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea required id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all bg-slate-50" placeholder="How can we help you?"></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? 'Sending...' : 'Send Message'} {!loading && <Send size={18} />}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
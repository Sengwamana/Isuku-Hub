import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import CTA from '../components/CTA';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-semibold ${isOpen ? 'text-brand-700' : 'text-slate-900'}`}>{question}</span>
        <div className={`p-1 rounded-full ${isOpen ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'} transition-colors`}>
           {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I schedule a waste pickup?",
      answer: "You can schedule a pickup directly through the IsukuHub dashboard or mobile app. Simply select 'Schedule Pickup', choose your waste type, and pick a available time slot that works for you."
    },
    {
      question: "Is IsukuHub available in all of Kigali?",
      answer: "We currently cover Gasabo and Kicukiro districts, with Nyarugenge rolling out in Q3 2024. Check the coverage map in the app to see if your specific sector is supported."
    },
    {
      question: "What types of waste can I recycle?",
      answer: "We accept plastics (PET, HDPE), paper, cardboard, glass, and metal. All recyclables must be clean and separated from general organic waste."
    },
    {
      question: "How does the pricing work?",
      answer: "Pricing is based on a monthly subscription for households, which includes weekly pickups. Special bulk pickups or hazardous waste removal incur additional one-time fees."
    },
    {
      question: "Can I report illegal dumping anonymously?",
      answer: "Yes. The 'Report' feature allows you to submit geo-tagged photos of illegal dumping sites without attaching your personal profile information to the public report."
    },
    {
        question: "How do I pay for the service?",
        answer: "We support Mobile Money (MTN/Airtel) and major credit cards directly within the app. You can set up auto-pay to never miss a bill."
    }
  ];

  return (
    <div className="pt-20">
      <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h1>
        <div className="max-w-xl mx-auto relative">
           <input 
             type="text" 
             placeholder="Search for answers..." 
             className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none shadow-sm"
           />
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
         <div className="space-y-2">
           {faqs.map((faq, idx) => (
             <FAQItem key={idx} question={faq.question} answer={faq.answer} />
           ))}
         </div>

         <div className="mt-16 text-center">
            <p className="text-slate-600">Still have questions?</p>
            <a href="/contact" className="text-brand-600 font-bold hover:underline mt-2 inline-block">Contact our Support Team</a>
         </div>
      </div>
      <CTA />
    </div>
  );
};

export default FAQ;
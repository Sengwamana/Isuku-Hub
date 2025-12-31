import React, { useState } from 'react';
import { ArrowRight, Calendar, User, Mail, Loader2, CheckCircle } from 'lucide-react';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribing(true);
    setTimeout(() => {
        setSubscribing(false);
        setSubscribed(true);
        setEmail('');
    }, 1500);
  };

  const posts = [
    {
      id: 1,
      title: "How Kigali is Leading Africa's Smart City Revolution",
      excerpt: "From automated street lights to AI-driven waste collection, explore how technology is reshaping urban living in Rwanda.",
      date: "Oct 24, 2023",
      author: "Jean-Paul M.",
      category: "Smart City",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Understanding Recycling Codes: A Household Guide",
      excerpt: "Not all plastics are created equal. Here is a simple guide to separating your household waste for maximum recycling value.",
      date: "Nov 12, 2023",
      author: "Sarah K.",
      category: "Education",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "IsukuHub Partners with District Administration for Clean Streets",
      excerpt: "We are thrilled to announce a new public-private partnership aiming to reduce illegal dumping by 40% in the next year.",
      date: "Dec 05, 2023",
      author: "Press Team",
      category: "Company News",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "The Economic Impact of Proper Waste Management",
      excerpt: "Clean cities attract more tourism and investment. We break down the numbers behind the sanitation economy.",
      date: "Jan 15, 2024",
      author: "Dr. Alex R.",
      category: "Insights",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-20">
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
           <h1 className="text-4xl font-bold text-slate-900 mb-4">IsukuHub Blog</h1>
           <p className="text-slate-600 max-w-2xl mx-auto text-lg">
             Insights, updates, and stories about sustainability and smart city technology.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10">
           {posts.map((post) => (
             <Link 
                key={post.id} 
                to="#" 
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
             >
                <div className="h-64 overflow-hidden relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-brand-100">
                        {post.category}
                      </span>
                   </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
                      <div className="flex items-center gap-1"><Calendar size={14} /> {post.date}</div>
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors line-clamp-2">
                     {post.title}
                   </h3>
                   <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                     {post.excerpt}
                   </p>
                   <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                         <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                             <User size={12} />
                         </div>
                         {post.author}
                      </div>
                      <span className="text-brand-600 font-bold text-sm flex items-center group-hover:underline">
                        Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                   </div>
                </div>
             </Link>
           ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
             <div className="relative z-10 max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold mb-4">Stay updated</h2>
                 <p className="text-slate-300 mb-8">Get the latest news on Kigali's green initiatives and IsukuHub updates delivered to your inbox.</p>
                 
                 {subscribed ? (
                     <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center justify-center gap-2 text-green-200 animate-in fade-in">
                         <CheckCircle size={20} />
                         <span className="font-bold">Thanks for subscribing!</span>
                     </div>
                 ) : (
                     <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                         <div className="relative flex-1">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                             <input 
                                type="email" 
                                required
                                placeholder="Enter your email address" 
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:bg-white/20 focus:border-brand-500 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                             />
                         </div>
                         <button 
                            type="submit" 
                            disabled={subscribing}
                            className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-900/50 disabled:opacity-70 flex items-center justify-center"
                         >
                             {subscribing ? <Loader2 size={20} className="animate-spin" /> : 'Subscribe'}
                         </button>
                     </form>
                 )}
             </div>
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default Blog;
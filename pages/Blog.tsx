import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import CTA from '../components/CTA';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "How Kigali is Leading Africa's Smart City Revolution",
      excerpt: "From automated street lights to AI-driven waste collection, explore how technology is reshaping urban living in Rwanda.",
      date: "Oct 24, 2023",
      author: "Jean-Paul M.",
      category: "Smart City",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
    },
    {
      title: "Understanding Recycling Codes: A Household Guide",
      excerpt: "Not all plastics are created equal. Here is a simple guide to separating your household waste for maximum recycling value.",
      date: "Nov 12, 2023",
      author: "Sarah K.",
      category: "Education",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "IsukuHub Partners with District Administration for Clean Streets",
      excerpt: "We are thrilled to announce a new public-private partnership aiming to reduce illegal dumping by 40% in the next year.",
      date: "Dec 05, 2023",
      author: "Press Team",
      category: "Company News",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    },
    {
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
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
           {posts.map((post, idx) => (
             <div key={idx} className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="h-64 overflow-hidden">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                   <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                      <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
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
                         <User size={16} className="text-slate-400" /> {post.author}
                      </div>
                      <span className="text-brand-600 font-bold text-sm flex items-center">
                        Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default Blog;
import React from 'react';
import { Leaf, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-brand-800">
                <Leaf size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">IsukuHub</span>
            </div>
            <p className="text-brand-200 text-sm leading-relaxed mb-6">
              742 KG Avenue, Kigali, Rwanda<br />
              support@isukuhub.rw
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-brand-200 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-brand-200 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-brand-200 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-200 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-brand-200">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-brand-200">
              <li><Link to="/features" className="hover:text-white transition-colors">Features Overview</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

           {/* Links 3 */}
           <div>
            <h4 className="font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-brand-200">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Investment Guides</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 text-center text-xs text-brand-300">
          <p>&copy; {new Date().getFullYear()} IsukuHub Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
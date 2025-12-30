import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to check active state
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Impact', path: '/impact' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white group-hover:bg-brand-700 transition-colors">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">IsukuHub</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-sm font-medium transition-colors ${isActive(item.path) ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-600'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-5 py-2.5 text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-full transition-colors border border-brand-200">
            Start Free
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-brand-600"
            >
              {item.name}
            </Link>
          ))}
          <button className="w-full py-3 text-center font-semibold text-white bg-brand-600 rounded-lg">
            Start Free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
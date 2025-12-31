import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Features', path: '/features' },
    { 
      name: 'Company', 
      path: '#', 
      children: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Impact', path: '/impact' }
      ] 
    },
    { 
      name: 'Support', 
      path: '#', 
      children: [
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' }
      ] 
    },
    { name: 'Resources', path: '/resources' },
  ];

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (name: string) => {
    if (activeDropdown === name) {
        setActiveDropdown(null);
    } else {
        setActiveDropdown(name);
    }
  };

  return (
    <nav ref={navRef} className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-50">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white group-hover:bg-brand-700 transition-colors shadow-brand-200 shadow-sm">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-800 transition-colors">IsukuHub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => item.children && handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
            >
                {item.children ? (
                    <button 
                        className={`flex items-center gap-1 text-sm font-medium transition-all py-2 ${
                            activeDropdown === item.name || item.children.some(child => isActive(child.path)) 
                            ? 'text-brand-600 font-semibold' 
                            : 'text-slate-600 hover:text-brand-600'
                        }`}
                        aria-expanded={activeDropdown === item.name}
                    >
                        {item.name}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                ) : (
                    <Link 
                        to={item.path} 
                        className={`text-sm font-medium transition-all relative py-2 ${isActive(item.path) ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-600'}`}
                    >
                        {item.name}
                        {isActive(item.path) && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-full animate-in fade-in duration-300"></span>
                        )}
                    </Link>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1">
                            {item.children.map((child) => (
                                <Link 
                                    key={child.name}
                                    to={child.path}
                                    className={`block px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${isActive(child.path) ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-600'}`}
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5 active:translate-y-0">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden relative z-50">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
            <div 
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl py-6 px-4 flex flex-col space-y-2 animate-in slide-in-from-top-4 duration-300 z-50 max-h-[85vh] overflow-y-auto">
            {navItems.map((item) => (
                <div key={item.name} className="border-b border-slate-100 last:border-0">
                    {item.children ? (
                        <>
                            <button 
                                onClick={() => toggleMobileSubmenu(item.name)}
                                className={`flex items-center justify-between w-full text-left text-base font-medium px-4 py-3 rounded-xl transition-colors ${activeDropdown === item.name ? 'text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}
                            >
                                {item.name}
                                <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                            </button>
                            {activeDropdown === item.name && (
                                <div className="bg-slate-50 rounded-xl mb-2 mx-2 py-2 animate-in slide-in-from-top-2">
                                    {item.children.map(child => (
                                        <Link 
                                            key={child.name}
                                            to={child.path}
                                            className={`block px-4 py-2 text-sm text-slate-600 hover:text-brand-600 ${isActive(child.path) ? 'font-bold text-brand-600' : ''}`}
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <Link 
                            to={item.path} 
                            className={`block text-base font-medium px-4 py-3 rounded-xl transition-colors ${isActive(item.path) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                            {item.name}
                        </Link>
                    )}
                </div>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-3 pb-4">
                <Link to="/login" className="w-full py-3 text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                    Log in
                </Link>
                <Link to="/signup" className="w-full py-3 text-center font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-200 transition-all active:scale-95">
                    Get Started
                </Link>
            </div>
            </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
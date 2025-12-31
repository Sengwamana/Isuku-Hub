import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        // Basic mock validation
        if (email.includes('@')) {
            navigate('/dashboard');
        } else {
            setError('Please enter a valid email address.');
        }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 pt-20 lg:pt-0">
        <div className="max-w-sm w-full mx-auto">
          <div className="mb-10">
             <Link to="/" className="inline-flex items-center gap-2 group mb-8">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-brand-200 shadow-sm">
                    <Leaf size={18} />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">IsukuHub</span>
             </Link>
             <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
             <p className="text-slate-600">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail size={18} />
                    </div>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-50 outline-none transition-all bg-slate-50 focus:bg-white" 
                        placeholder="name@company.com" 
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock size={18} />
                    </div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-50 outline-none transition-all bg-slate-50 focus:bg-white" 
                        placeholder="••••••••" 
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" type="checkbox" className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">Remember me</label>
                </div>
                <a href="#" className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline">Forgot password?</a>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-200 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold text-brand-600 hover:text-brand-700 hover:underline">
                    Sign up for free
                </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:block lg:w-1/2 bg-brand-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
         
         <div className="relative z-10 h-full flex flex-col justify-end p-20 text-white">
            <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Live System Status
                </div>
                <h2 className="text-4xl font-bold mb-4 leading-tight">Manage your city's waste smarter, not harder.</h2>
                <p className="text-brand-100 text-lg">Join 10,000+ households and collectors making Kigali cleaner every day.</p>
            </div>
            
            {/* Testimonial Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex gap-1 text-yellow-400 mb-3">
                    {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed italic mb-4">"IsukuHub completely transformed how our neighborhood handles waste collection. No more missed pickups!"</p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center text-brand-800 font-bold text-xs">AM</div>
                    <div>
                        <p className="text-xs font-bold">Alex M.</p>
                        <p className="text-[10px] text-brand-200">Kicukiro Sector Leader</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Login;
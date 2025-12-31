import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, Building, Truck, Recycle, Loader2, AlertCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [role, setRole] = useState<'household' | 'collector' | 'recycler' | 'official'>('household');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
    }, 1500);
  };

  const roles = [
    { id: 'household', label: 'Household', icon: User, desc: 'For residents' },
    { id: 'collector', label: 'Collector', icon: Truck, desc: 'For waste companies' },
    { id: 'recycler', label: 'Recycler', icon: Recycle, desc: 'For buying materials' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group justify-center mb-6">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-brand-200 shadow-lg">
                <Leaf size={22} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">IsukuHub</span>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-600">
          Start managing waste efficiently today.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSignup}>
            
            {/* Role Selection */}
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-3">Select Account Type</label>
               <div className="grid grid-cols-3 gap-3">
                  {roles.map((r) => {
                      const Icon = r.icon;
                      const isSelected = role === r.id;
                      return (
                        <button
                            key={r.id}
                            type="button"
                            onClick={() => setRole(r.id as any)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                                isSelected 
                                ? 'border-brand-500 bg-brand-50 text-brand-700' 
                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                            }`}
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-bold">{r.label}</span>
                        </button>
                      )
                  })}
               </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                 </div>
                 <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-brand-500 focus:border-brand-500 bg-slate-50 focus:bg-white transition-all outline-none" 
                    placeholder="John Doe"
                 />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                 </div>
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-brand-500 focus:border-brand-500 bg-slate-50 focus:bg-white transition-all outline-none" 
                    placeholder="you@example.com"
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
                    className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-brand-500 focus:border-brand-500 bg-slate-50 focus:bg-white transition-all outline-none" 
                    placeholder="••••••••"
                 />
              </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-xl border border-transparent bg-brand-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-brand-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">By signing up, you agree to our Terms</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-600 hover:text-brand-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
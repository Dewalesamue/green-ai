import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, Building2, Globe } from 'lucide-react';
import { COLORS } from '../constants';
import { AuthView, UserRole } from '../types';

interface AuthProps {
  onComplete: () => void;
}

const Auth: React.FC<AuthProps> = ({ onComplete }) => {
  const [view, setView] = useState<AuthView>(AuthView.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        if (view === AuthView.SIGNUP) {
            setView(AuthView.ROLE_SELECTION);
        } else {
            onComplete();
        }
    }, 1500);
  };

  const handleRoleSelect = (role: UserRole) => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          onComplete();
      }, 1000);
  };

  if (view === AuthView.ROLE_SELECTION) {
      return (
          <div className="min-h-screen flex items-center justify-center p-4">
              <div className="w-full max-w-4xl text-center">
                  <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>Where will you reduce carbon?</h2>
                  <p className="mb-12 opacity-70">We tailor the intelligence engine to your environment.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                          { role: UserRole.INDIVIDUAL, icon: User, label: 'At Home', desc: 'Reduce personal carbon footprint' },
                          { role: UserRole.BUSINESS, icon: Building2, label: 'In the Office', desc: 'Optimize enterprise operations' },
                          { role: UserRole.GOVERNMENT, icon: Globe, label: 'In the Environment', desc: 'City-wide & regional impact' }
                      ].map((item) => (
                          <button 
                            key={item.label}
                            onClick={() => handleRoleSelect(item.role)}
                            className="group relative p-8 rounded-3xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all text-left flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1"
                          >
                              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-colors" style={{ backgroundColor: COLORS.primary }}>
                                  <item.icon size={28} />
                              </div>
                              <div>
                                  <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>{item.label}</h3>
                                  <p className="text-sm opacity-60 mt-1">{item.desc}</p>
                              </div>
                              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                                  <ArrowRight />
                              </div>
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 md:p-10">
        <div className="flex justify-center mb-8">
            <div className="p-3 rounded-xl text-white shadow-lg" style={{ backgroundColor: COLORS.primary }}>
                <Leaf size={32} />
            </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: COLORS.primary }}>
            {view === AuthView.LOGIN ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center opacity-60 mb-8 text-sm">
            {view === AuthView.LOGIN ? 'Enter your credentials to access the dashboard.' : 'Start your sustainability journey today.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70 ml-1">Email</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-3.5 opacity-40" size={18} />
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/60 border border-transparent focus:bg-white focus:border-blue-300 outline-none transition-all" 
                        placeholder="name@company.com" 
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70 ml-1">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 opacity-40" size={18} />
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/60 border border-transparent focus:bg-white focus:border-blue-300 outline-none transition-all" 
                        placeholder="••••••••" 
                    />
                </div>
            </div>

            {view === AuthView.LOGIN && (
                <div className="text-right">
                    <button type="button" className="text-sm font-medium opacity-60 hover:opacity-100 hover:text-blue-700 transition-colors">
                        Forgot password?
                    </button>
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-6"
                style={{ backgroundColor: COLORS.primary }}
            >
                {loading ? 'Processing...' : (view === AuthView.LOGIN ? 'Sign In' : 'Create Account')}
                {!loading && <ArrowRight size={18} />}
            </button>
        </form>

        <div className="mt-8 text-center text-sm">
            <span className="opacity-60">{view === AuthView.LOGIN ? "Don't have an account? " : "Already have an account? "}</span>
            <button 
                onClick={() => setView(view === AuthView.LOGIN ? AuthView.SIGNUP : AuthView.LOGIN)}
                className="font-bold hover:underline" 
                style={{ color: COLORS.primary }}
            >
                {view === AuthView.LOGIN ? 'Sign Up' : 'Log In'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
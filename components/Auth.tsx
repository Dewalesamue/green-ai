import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, Building2, Globe, Sparkles } from 'lucide-react';
import { COLORS } from '../constants';
import { AuthView, UserRole } from '../types';

interface AuthProps {
  onComplete: (role: UserRole, email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onComplete }) => {
  const [view, setView] = useState<AuthView>(AuthView.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Google OAuth Simulation State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [isAddingGoogleAccount, setIsAddingGoogleAccount] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        if (view === AuthView.SIGNUP) {
            setView(AuthView.ROLE_SELECTION);
        } else {
            onComplete(UserRole.BUSINESS, email || 'demo@company.com');
        }
    }, 1500);
  };

  const handleRoleSelect = (role: UserRole) => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          onComplete(role, email || 'demo@company.com');
      }, 1000);
  };

  const handleGoogleSignInClick = () => {
    setShowGoogleModal(true);
  };

  const handleGoogleAccountSelect = (emailToUse: string) => {
    setLoading(true);
    setShowGoogleModal(false);
    setEmail(emailToUse);
    
    // Simulate Google Token Verification
    setTimeout(() => {
      setLoading(false);
      setView(AuthView.ROLE_SELECTION);
    }, 1200);
  };

  if (view === AuthView.ROLE_SELECTION) {
      return (
          <div className="min-h-screen flex items-center justify-center p-4">
              <div className="w-full max-w-4xl text-center">
                  <h2 className="text-3xl font-bold mb-4 animate-fade-in" style={{ color: COLORS.primary }}>Where will you reduce carbon?</h2>
                  <p className="mb-12 opacity-70 animate-fade-in">We tailor the intelligence engine to your environment.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                          { role: UserRole.INDIVIDUAL, icon: User, label: 'At Home', desc: 'Reduce personal carbon footprint' },
                          { role: UserRole.BUSINESS, icon: Building2, label: 'In the Office', desc: 'Optimize enterprise operations' },
                          { role: UserRole.GOVERNMENT, icon: Globe, label: 'In the Environment', desc: 'City-wide & regional impact' }
                      ].map((item, idx) => (
                          <button 
                            key={item.label}
                            id={`role-btn-${idx}`}
                            onClick={() => handleRoleSelect(item.role)}
                            className="group relative p-8 rounded-3xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all text-left flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 animate-scale-up"
                            style={{ animationDelay: `${idx * 100}ms` }}
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
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 md:p-10 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 rounded-3xl flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-t-[#1F4E79] border-gray-200 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-[#1F4E79]">Authenticating securely...</p>
          </div>
        )}

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
                id="auth-submit-btn"
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-6"
                style={{ backgroundColor: COLORS.primary }}
            >
                {loading ? 'Processing...' : (view === AuthView.LOGIN ? 'Sign In' : 'Create Account')}
                {!loading && <ArrowRight size={18} />}
            </button>
        </form>

        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#fcfdfd] px-3 text-gray-500 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Google Authentication Button */}
        <button
          type="button"
          id="google-signin-btn"
          onClick={handleGoogleSignInClick}
          className="w-full py-3.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

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

      {/* Google Account Selector Dialog */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-gray-950 animate-scale-up">
            {/* Header: Google Brand */}
            <div className="p-6 pb-4 text-center border-b border-gray-100">
              <div className="flex justify-center mb-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium tracking-tight text-gray-800">Choose an account</h3>
              <p className="text-xs text-gray-500 mt-1">to continue to <span className="font-bold text-[#1F4E79]">GreenAI</span></p>
            </div>

            {/* Account List */}
            <div className="p-6 space-y-3">
              {!isAddingGoogleAccount ? (
                <>
                  {/* Default Account: User's real email */}
                  <button 
                    onClick={() => handleGoogleAccountSelect('adelekesam10@gmail.com')}
                    className="w-full p-3.5 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-full bg-[#1F4E79] text-white flex items-center justify-center font-bold text-sm">
                        A
                      </div>
                      <div>
                        <span className="font-bold text-sm block text-gray-800">Adeleke Sam</span>
                        <span className="text-xs text-gray-500 block">adelekesam10@gmail.com</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold border border-green-100">Active Session</span>
                  </button>

                  {/* Secondary Demo Account */}
                  <button 
                    onClick={() => handleGoogleAccountSelect('sustainability@greenai.org')}
                    className="w-full p-3.5 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50/20 transition-all flex items-center gap-3 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      S
                    </div>
                    <div>
                      <span className="font-bold text-sm block text-gray-800">Sustainability Analyst</span>
                      <span className="text-xs text-gray-500 block">sustainability@greenai.org</span>
                    </div>
                  </button>

                  {/* Add New Account Button */}
                  <button 
                    onClick={() => setIsAddingGoogleAccount(true)}
                    className="w-full p-3.5 rounded-xl border border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/10 transition-all flex items-center gap-3 text-left"
                  >
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-sm block text-gray-700">Use another account</span>
                      <span className="text-xs text-gray-400 block">Sign in with a different Google ID</span>
                    </div>
                  </button>
                </>
              ) : (
                <div className="space-y-4 py-2 animate-fade-in">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Enter Google Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="username@gmail.com"
                      value={customGoogleEmail}
                      onChange={e => setCustomGoogleEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 text-sm transition-all"
                    />
                  </div>
                  <div className="flex gap-2.5 pt-2">
                    <button 
                      onClick={() => setIsAddingGoogleAccount(false)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-xs text-gray-500 hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => {
                        if (customGoogleEmail) {
                          handleGoogleAccountSelect(customGoogleEmail);
                        }
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white shadow-sm"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed flex flex-col gap-2">
              <p>To continue, Google will share your name, email address, language preference, and profile picture with GreenAI.</p>
              <div className="flex justify-between items-center pt-1 border-t border-gray-200/50">
                 <span className="text-[10px] text-gray-400">Secure TLS Connection</span>
                 <button onClick={() => setShowGoogleModal(false)} className="text-xs font-bold text-gray-700 hover:underline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;

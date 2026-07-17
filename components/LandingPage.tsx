import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Activity, Globe } from 'lucide-react';
import { COLORS } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-200/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-200/20 blur-[120px] pointer-events-none z-0"></div>

      {/* Nav */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg text-white shadow-md" style={{ backgroundColor: COLORS.primary }}>
            <Leaf size={20} />
          </div>
          <span className="font-bold text-xl" style={{ color: COLORS.primary }}>GreenAI</span>
        </div>
        <div className="flex gap-4">
          <button onClick={onGetStarted} className="px-5 py-2 text-sm font-semibold rounded-full hover:bg-white/50 transition-colors" style={{ color: COLORS.primary }}>
            Log In
          </button>
          <button 
            onClick={onGetStarted}
            className="px-5 py-2 text-sm font-semibold text-white rounded-full shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: COLORS.primary }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-20 mt-10 md:mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 border border-white/60 text-sm font-medium mb-8 backdrop-blur-sm" style={{ color: COLORS.primary }}>
          <Activity size={16} className="text-green-600" />
          <span>Real-time Sustainability Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-5xl mb-6 leading-tight" style={{ color: COLORS.primary }}>
          Reduce Carbon Levels.<br /> Everywhere.
        </h1>
        
        <p className="text-lg md:text-xl opacity-70 max-w-2xl mb-10 leading-relaxed">
          The mission is clear: reduce carbon levels at home, in the office, and in our environment.
          GreenAI gives you the intelligence to measure, predict, and optimize your impact.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-20">
          <button 
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            style={{ backgroundColor: COLORS.primary }}
          >
            Start Reducing Impact <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 font-bold text-lg hover:bg-white/80 transition-all" style={{ color: COLORS.primary }}>
            Request Demo
          </button>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="w-full max-w-5xl rounded-3xl bg-white/30 backdrop-blur-xl border border-white/50 shadow-2xl p-4 md:p-8 transform perspective-1000 rotate-x-12 mb-20">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90">
                <div className="p-6 rounded-2xl bg-white/60 h-40 flex flex-col justify-center items-center">
                    <span className="text-sm font-bold opacity-50 uppercase">Home Energy</span>
                    <span className="text-3xl font-bold text-green-700">-12%</span>
                </div>
                <div className="p-6 rounded-2xl bg-white/60 h-40 flex flex-col justify-center items-center">
                    <span className="text-sm font-bold opacity-50 uppercase">Office Efficiency</span>
                    <span className="text-3xl font-bold text-green-700">-8.5%</span>
                </div>
                <div className="p-6 rounded-2xl bg-white/60 h-40 flex flex-col justify-center items-center">
                    <span className="text-sm font-bold opacity-50 uppercase">Environmental Impact</span>
                    <span className="text-3xl font-bold text-green-700">Net Positive</span>
                </div>
                <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-white/60 h-64"></div>
                <div className="p-6 rounded-2xl bg-white/60 h-64"></div>
             </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 py-20 px-4 md:px-20 bg-white/30 backdrop-blur-md">
         <div className="max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-12" style={{ color: COLORS.primary }}>Impact Across Every Scale</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { title: 'At Home', desc: 'Track personal footprint and optimize home energy usage.', icon: Leaf },
                    { title: 'In the Office', desc: 'ESG reporting, supply chain audits, and operational efficiency.', icon: Activity },
                    { title: 'In Our Environment', desc: 'City-wide emissions modeling and regional policy simulation.', icon: Globe }
                 ].map((f, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-white/50 border border-white/60 hover:bg-white/80 transition-all">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ backgroundColor: COLORS.primary }}>
                            <f.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>{f.title}</h3>
                        <p className="opacity-70">{f.desc}</p>
                    </div>
                 ))}
             </div>
         </div>
      </section>

      {/* Why Reduce Carbon Section */}
      <section className="relative z-10 py-24 px-4 md:px-20 bg-gradient-to-b from-transparent to-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: COLORS.primary }}>
                  The Cost of Inaction is<br/> Too High.
                </h2>
                <p className="text-lg opacity-70 mb-8 leading-relaxed">
                   Carbon reduction is the defining challenge of our era. It goes beyond compliance—it is about securing a livable future and building a resilient economy.
                </p>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="mt-1 min-w-[24px]"><Leaf className="text-green-600" size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg" style={{ color: COLORS.primary }}>For the Environment</h4>
                            <p className="opacity-70 text-sm">Mitigate extreme weather events and preserve global biodiversity.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1 min-w-[24px]"><Activity className="text-blue-600" size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg" style={{ color: COLORS.primary }}>For the Economy</h4>
                            <p className="opacity-70 text-sm">Decarbonization drives innovation, efficiency, and long-term profitability.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1 min-w-[24px]"><ShieldCheck className="text-orange-600" size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg" style={{ color: COLORS.primary }}>For Society</h4>
                            <p className="opacity-70 text-sm">Cleaner air and sustainable infrastructure create healthier communities.</p>
                        </div>
                    </div>
                </div>
             </div>
             <div className="relative">
                 {/* Visual representation */}
                 <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#1F4E79] to-[#0A2A4A] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
                    {/* Abstract Earth/Orbit visual */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#F39C2D] opacity-10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 mt-4">
                        <div className="text-7xl font-bold mb-4 tracking-tighter">1.5°C</div>
                        <p className="text-blue-200 text-xl font-light leading-relaxed">The threshold to secure a livable future. Every fraction of a degree matters.</p>
                    </div>
                    
                    <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mt-8">
                        <div className="flex items-center gap-3 mb-3">
                            <Globe size={20} className="text-blue-300"/>
                            <span className="font-bold text-sm tracking-widest uppercase text-blue-300">Global Consensus</span>
                        </div>
                        <p className="italic font-light opacity-90">"Sustainability is no longer a choice, but a necessity for survival and economic stability."</p>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 text-center opacity-60">
        <div className="flex justify-center items-center gap-2 mb-4">
            <ShieldCheck size={20} />
            <span className="font-semibold uppercase tracking-widest text-sm">Trusted By Future Leaders</span>
        </div>
      </section>

      <footer className="py-8 text-center text-sm opacity-50 relative z-10">
        &copy; 2024 GreenAI Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
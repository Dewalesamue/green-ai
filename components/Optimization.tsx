import React from 'react';
import { COLORS } from '../constants';
import { Zap, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

const Optimization: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 pb-24">
             <div>
                <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.primary }}>Optimization Engine</h2>
                <p className="opacity-70">AI-driven opportunities to reduce impact and cost.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Recommendation Card */}
                <div className="col-span-1 lg:col-span-2 p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl" 
                     style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, #153554 100%)` }}>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3 border border-white/10">
                                <Zap size={14} className="text-yellow-400" fill="currentColor" />
                                HIGH PRIORITY
                            </div>
                            <h3 className="text-3xl font-bold mb-2">HVAC Scheduling Anomaly</h3>
                            <p className="text-blue-100 max-w-xl">
                                AI detected HVAC systems running at 80% capacity during non-operational hours (10 PM - 5 AM). 
                                Adjustment recommended immediately.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-4xl font-bold text-white">$12,400</span>
                            <span className="text-sm text-blue-200">Potential Annual Savings</span>
                        </div>
                    </div>
                    
                    <div className="relative z-10 mt-8 flex flex-wrap gap-4">
                        <button className="px-6 py-3 bg-white text-[#1F4E79] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                            Auto-Fix Schedule
                        </button>
                        <button className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                            View Details
                        </button>
                    </div>

                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#F39C2D] opacity-20 blur-[80px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* List of other items */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg opacity-80">Pending Actions</h3>
                    
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white/80 transition-all cursor-pointer group">
                             <div className="flex justify-between items-center">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1F4E79] group-hover:text-blue-600 transition-colors">Server Farm Cooling Efficiency</h4>
                                        <p className="text-sm opacity-60 mt-1">Efficiency drops by 15% during peak load.</p>
                                    </div>
                                </div>
                                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                             </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-lg opacity-80">Recent Wins</h3>
                     {[1, 2].map((i) => (
                        <div key={i} className="p-5 rounded-2xl bg-green-50/50 border border-green-100 hover:bg-green-50 transition-all opacity-80 hover:opacity-100">
                             <div className="flex justify-between items-center">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1F4E79]">LED Retrofit - Phase 1</h4>
                                        <p className="text-sm opacity-60 mt-1">Completed 2 days ago. -2.5% Grid Load.</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Optimization;
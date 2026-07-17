import React, { useState } from 'react';
import { COLORS } from '../constants';
import { Building2, Truck, Lightbulb, ArrowRight } from 'lucide-react';

const CarbonCalculator: React.FC = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="p-4 md:p-12 w-full max-w-4xl mx-auto pb-24">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>Carbon Footprint Engine</h2>
                <p className="opacity-70">Model your organization's impact with AI-assisted inputs.</p>
            </div>

            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl">
                {/* Progress */}
                <div className="flex justify-center mb-8 gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 w-16 rounded-full transition-all ${step >= i ? 'bg-[#1F4E79]' : 'bg-gray-300'}`}></div>
                    ))}
                </div>

                {step === 1 && (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-xl font-semibold">Facilities & Energy</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Annual Electricity (kWh)</label>
                                <input type="number" className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" placeholder="e.g. 150000" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Natural Gas (Therms)</label>
                                <input type="number" className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" placeholder="e.g. 5000" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Square Footage</label>
                                <input type="number" className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" placeholder="e.g. 25000" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Region</label>
                                <select className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all">
                                    <option>North America (East)</option>
                                    <option>North America (West)</option>
                                    <option>Europe (West)</option>
                                    <option>Asia Pacific</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in space-y-6">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-orange-100 rounded-xl text-orange-700">
                                <Truck size={24} />
                            </div>
                            <h3 className="text-xl font-semibold">Logistics & Supply Chain</h3>
                        </div>
                         <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Monthly Fleet Mileage</label>
                                <input type="number" className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" placeholder="e.g. 12000" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-medium opacity-80">Primary Supplier Spend ($)</label>
                                <input type="number" className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" placeholder="e.g. 500000" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in text-center py-10">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <Lightbulb size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Ready to Calculate</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">GreenAI will analyze this data against regional emission factors and historical benchmarks.</p>
                        <button className="px-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all" style={{ backgroundColor: COLORS.primary }}>
                            Generate Report
                        </button>
                    </div>
                )}

                <div className="mt-8 flex justify-between">
                    <button 
                        onClick={() => setStep(Math.max(1, step - 1))}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-black/5'}`}
                    >
                        Back
                    </button>
                    {step < 3 && (
                        <button 
                            onClick={() => setStep(Math.min(3, step + 1))}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:translate-x-1"
                            style={{ backgroundColor: COLORS.accent }}
                        >
                            Next <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarbonCalculator;
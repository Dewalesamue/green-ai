import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import { 
  Building2, Truck, Lightbulb, ArrowRight, Home, Car, Trash2, 
  Building, Bus, CheckCircle2, ChevronRight, Activity, Award 
} from 'lucide-react';
import { UserData, UserRole } from '../types';

interface CarbonCalculatorProps {
  userData?: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ userData, setUserData }) => {
    const role = userData?.role || UserRole.BUSINESS;
    const [step, setStep] = useState(1);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Form states - Individual
    const [indElectricity, setIndElectricity] = useState('350');
    const [indGas, setIndGas] = useState('30');
    const [indMileage, setIndMileage] = useState('800');
    const [indWaste, setIndWaste] = useState('20');

    // Form states - Business
    const [bizElectricity, setBizElectricity] = useState('180000');
    const [bizGas, setBizGas] = useState('6000');
    const [bizSqft, setBizSqft] = useState('25000');
    const [bizMileage, setBizMileage] = useState('15000');
    const [bizSpend, setBizSpend] = useState('450000');

    // Form states - Government
    const [govBuildings, setGovBuildings] = useState('45');
    const [govRenewable, setGovRenewable] = useState('25');
    const [govRidership, setGovRidership] = useState('120000');
    const [govFleet, setGovFleet] = useState('150');

    // Load pre-existing inputs if any
    useEffect(() => {
        if (userData?.calculatorInputs) {
            const inputs = userData.calculatorInputs;
            if (role === UserRole.INDIVIDUAL) {
                setIndElectricity(inputs.electricity?.toString() || indElectricity);
                setIndGas(inputs.gas?.toString() || indGas);
                setIndMileage(inputs.mileage?.toString() || indMileage);
                setIndWaste(inputs.waste?.toString() || indWaste);
            } else if (role === UserRole.BUSINESS) {
                setBizElectricity(inputs.electricity?.toString() || bizElectricity);
                setBizGas(inputs.gas?.toString() || bizGas);
                setBizSqft(inputs.squareFootage?.toString() || bizSqft);
                setBizMileage(inputs.mileage?.toString() || bizMileage);
                setBizSpend(inputs.supplierSpend?.toString() || bizSpend);
            } else if (role === UserRole.GOVERNMENT) {
                setGovBuildings(inputs.infrastructureCount?.toString() || govBuildings);
                setGovRenewable(inputs.region || govRenewable); // Use region as storage proxy
                setGovRidership(inputs.transitRidership?.toString() || govRidership);
                setGovFleet(inputs.mileage?.toString() || govFleet);
            }
            if (userData.calculatedEmissions) {
                setIsComplete(true);
            }
        }
    }, [userData]);

    const handleCalculate = () => {
        setIsCalculating(true);
        setTimeout(() => {
            let total = 0;
            let breakdown: { name: string; value: number }[] = [];
            let energyIntensity = 0;
            let projectedCost = 0;
            let inputs: any = {};

            if (role === UserRole.INDIVIDUAL) {
                const elec = parseFloat(indElectricity) || 0;
                const gas = parseFloat(indGas) || 0;
                const miles = parseFloat(indMileage) || 0;
                const waste = parseFloat(indWaste) || 0;

                inputs = { electricity: elec, gas, mileage: miles, waste };

                // Calculations (annual kg CO2e)
                const elecEmissions = elec * 0.4 * 12;
                const gasEmissions = gas * 5.3 * 12;
                const milesEmissions = miles * 0.4 * 12;
                const wasteEmissions = waste * 52 * 0.9;

                const grandTotalKg = elecEmissions + gasEmissions + milesEmissions + wasteEmissions;
                total = Math.round((grandTotalKg / 1000) * 10) / 10; // in tonnes CO2e

                breakdown = [
                    { name: 'Home Energy', value: Math.round(((elecEmissions + gasEmissions) / grandTotalKg) * 100) || 0 },
                    { name: 'Transportation', value: Math.round((milesEmissions / grandTotalKg) * 100) || 0 },
                    { name: 'Waste & Recycling', value: Math.round((wasteEmissions / grandTotalKg) * 100) || 0 }
                ];

                energyIntensity = Math.round((elec * 12) / 120); // Normalized per room average
                projectedCost = Math.round((elec * 0.15 + gas * 1.2) * 12); // Annual utility bill estimate
            } else if (role === UserRole.BUSINESS) {
                const elec = parseFloat(bizElectricity) || 0;
                const gas = parseFloat(bizGas) || 0;
                const sqft = parseFloat(bizSqft) || 1000;
                const miles = parseFloat(bizMileage) || 0;
                const spend = parseFloat(bizSpend) || 0;

                inputs = { electricity: elec, gas, squareFootage: sqft, mileage: miles, supplierSpend: spend };

                const elecEmissions = elec * 0.4;
                const gasEmissions = gas * 5.3;
                const milesEmissions = miles * 0.4;
                const spendEmissions = spend * 0.15;

                const grandTotalKg = elecEmissions + gasEmissions + milesEmissions + spendEmissions;
                total = Math.round((grandTotalKg / 1000) * 10) / 10; // tonnes CO2e

                breakdown = [
                    { name: 'Electricity & Gas', value: Math.round(((elecEmissions + gasEmissions) / grandTotalKg) * 100) || 0 },
                    { name: 'Logistics Fleet', value: Math.round((milesEmissions / grandTotalKg) * 100) || 0 },
                    { name: 'Supply Chain (Scope 3)', value: Math.round((spendEmissions / grandTotalKg) * 100) || 0 }
                ];

                energyIntensity = Math.round(elec / sqft); // kWh/sqft
                projectedCost = Math.round(elec * 0.12 + gas * 0.9 + spend * 0.1); 
            } else {
                // GOVERNMENT
                const bldgs = parseFloat(govBuildings) || 0;
                const renew = parseFloat(govRenewable) || 0;
                const riders = parseFloat(govRidership) || 0;
                const fleet = parseFloat(govFleet) || 0;

                inputs = { infrastructureCount: bldgs, region: renew.toString(), transitRidership: riders, mileage: fleet };

                const bldgsEmissions = bldgs * 35000 * (1 - renew / 100);
                const fleetEmissions = fleet * 1500;
                const transitSavings = riders * 12 * -0.15; // CO2 saved

                const grandTotalKg = Math.max(5000, bldgsEmissions + fleetEmissions + transitSavings);
                total = Math.round((grandTotalKg / 1000) * 10) / 10;

                breakdown = [
                    { name: 'Municipal Facilities', value: Math.round((bldgsEmissions / grandTotalKg) * 100) || 0 },
                    { name: 'Public Transit Savings', value: Math.round((Math.abs(transitSavings) / grandTotalKg) * 100) || 0 },
                    { name: 'Government Fleet', value: Math.round((fleetEmissions / grandTotalKg) * 100) || 0 }
                ];

                energyIntensity = Math.round(bldgs * 120); 
                projectedCost = Math.round(bldgs * 2500 + fleet * 350); 
            }

            // Save state
            const updatedUserData: UserData = {
                ...(userData || { role: role, email: 'demo@company.com', energySource: 'Grid', target: 'Moderate' }),
                calculatorInputs: inputs,
                calculatedEmissions: {
                    total,
                    breakdown,
                    energyIntensity,
                    projectedCost
                }
            };

            setUserData(updatedUserData);
            setIsCalculating(false);
            setIsComplete(true);
        }, 1800);
    };

    const handleReset = () => {
        setIsComplete(false);
        setStep(1);
    };

    if (isComplete && userData?.calculatedEmissions) {
        const results = userData.calculatedEmissions;
        return (
            <div className="p-4 md:p-12 w-full max-w-4xl mx-auto pb-24 animate-fade-in">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2" style={{ color: COLORS.primary }}>
                        <Award className="text-green-600" size={32} />
                        Sustainability Audit Complete
                    </h2>
                    <p className="opacity-70">Your footprint model has been successfully calibrated against local factors.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-white/60 border border-white/60 shadow-sm text-center">
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-60">Calculated Footprint</span>
                        <div className="text-4xl font-extrabold mt-2 text-[#1F4E79]">{results.total.toLocaleString()}</div>
                        <span className="text-xs font-bold text-gray-500">tCO2e / yr</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/60 border border-white/60 shadow-sm text-center">
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-60">Energy Intensity</span>
                        <div className="text-4xl font-extrabold mt-2 text-[#1F4E79]">{results.energyIntensity}</div>
                        <span className="text-xs font-bold text-gray-500">{role === UserRole.INDIVIDUAL ? 'kWh / Normalized' : 'kWh / sqft'}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/60 border border-white/60 shadow-sm text-center">
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-60">Projected Annual Utilities</span>
                        <div className="text-4xl font-extrabold mt-2 text-green-700">${results.projectedCost?.toLocaleString()}</div>
                        <span className="text-xs font-bold text-gray-500">Optimizable Cost</span>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl mb-8">
                    <h3 className="text-xl font-bold mb-6 text-[#1F4E79]">Carbon Footprint Breakdown</h3>
                    
                    <div className="space-y-4">
                        {results.breakdown.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm font-medium mb-1.5">
                                    <span>{item.name}</span>
                                    <span className="font-bold">{item.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200/50 rounded-full h-3 overflow-hidden">
                                    <div 
                                      className="h-full rounded-full transition-all duration-1000" 
                                      style={{ 
                                          width: `${item.value}%`,
                                          backgroundColor: idx === 0 ? COLORS.primary : idx === 1 ? COLORS.accent : COLORS.success 
                                      }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200/40 bg-green-50/30 p-4 rounded-xl border border-green-100/50">
                        <h4 className="font-bold text-green-800 text-sm mb-1">💡 GreenAI Action Plan Generated</h4>
                        <p className="text-xs opacity-80 leading-relaxed text-[#1F4E79]">
                            Based on your {role.toLowerCase()} profile, we recommend starting with the **HVAC Scheduling script** to trim your {results.breakdown[0]?.name.toLowerCase() || 'energy'} emissions. Talk to the GreenAI Assistant on the bottom right for step-by-step guidance.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between gap-4">
                    <button 
                      onClick={handleReset} 
                      className="px-6 py-3 rounded-xl border border-[#1F4E79]/20 font-medium hover:bg-white/50 transition-colors"
                      style={{ color: COLORS.primary }}
                    >
                        Recalibrate Engine
                    </button>
                    <button 
                      onClick={() => alert("Model successfully exported to ESG Report engine.")}
                      className="px-8 py-3 rounded-xl text-white font-bold hover:scale-105 transition-all shadow-md"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                        Integrate with ESG Reports
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-12 w-full max-w-4xl mx-auto pb-24">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>Carbon Footprint Engine</h2>
                <p className="opacity-70">
                    Model your {role.toLowerCase()} environment's impact with dynamic AI inputs.
                </p>
            </div>

            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl">
                {/* Progress bar */}
                <div className="flex justify-center mb-10 gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-20 rounded-full transition-all duration-300 ${step >= i ? 'bg-[#1F4E79]' : 'bg-gray-300/60'}`}></div>
                    ))}
                </div>

                {isCalculating ? (
                    <div className="text-center py-16 animate-pulse">
                        <div className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Activity className="text-[#1F4E79] animate-spin w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>Calculating GHG Coefficients...</h3>
                        <p className="text-sm opacity-60">Mapping consumption values to local grid emission factors.</p>
                    </div>
                ) : (
                    <>
                        {/* --- INDIVIDUAL FORM --- */}
                        {role === UserRole.INDIVIDUAL && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                                                <Home size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">Home Utility Consumption</h3>
                                                <p className="text-xs opacity-60">Enter your average monthly household energy values.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Electricity (kWh / month)</label>
                                                <input 
                                                  type="number" 
                                                  value={indElectricity}
                                                  onChange={e => setIndElectricity(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 350" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Natural Gas (Therms / month)</label>
                                                <input 
                                                  type="number" 
                                                  value={indGas}
                                                  onChange={e => setIndGas(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 30" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-orange-100 rounded-xl text-orange-700">
                                                <Car size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">Lifestyle & Travel</h3>
                                                <p className="text-xs opacity-60">Estimate your household transport and waste footprints.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Driving Fleet (Miles / month)</label>
                                                <input 
                                                  type="number" 
                                                  value={indMileage}
                                                  onChange={e => setIndMileage(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 800" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Average Waste Generated (lbs / week)</label>
                                                <input 
                                                  type="number" 
                                                  value={indWaste}
                                                  onChange={e => setIndWaste(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 20" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* --- BUSINESS FORM --- */}
                        {role === UserRole.BUSINESS && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                                                <Building2 size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">Facilities & Offices</h3>
                                                <p className="text-xs opacity-60">Enter annual facility-level commercial utility consumption.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Annual Electricity (kWh)</label>
                                                <input 
                                                  type="number" 
                                                  value={bizElectricity}
                                                  onChange={e => setBizElectricity(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 180000" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Natural Gas (Therms)</label>
                                                <input 
                                                  type="number" 
                                                  value={bizGas}
                                                  onChange={e => setBizGas(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 6000" 
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-medium opacity-80">Total Real Estate Square Footage</label>
                                                <input 
                                                  type="number" 
                                                  value={bizSqft}
                                                  onChange={e => setBizSqft(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 25000" 
                                                />
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
                                            <div>
                                                <h3 className="text-xl font-semibold">Operations & Scope 3</h3>
                                                <p className="text-xs opacity-60">Input fleet mileage and supplier spending metrics.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Annual Commercial Fleet Mileage</label>
                                                <input 
                                                  type="number" 
                                                  value={bizMileage}
                                                  onChange={e => setBizMileage(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 15000" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Primary Supplier Spend ($ / year)</label>
                                                <input 
                                                  type="number" 
                                                  value={bizSpend}
                                                  onChange={e => setBizSpend(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 450000" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* --- GOVERNMENT FORM --- */}
                        {role === UserRole.GOVERNMENT && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                                                <Building size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">Regional & Municipal Infrastructure</h3>
                                                <p className="text-xs opacity-60">Quantify public buildings and grid characteristics.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Total Municipal Buildings</label>
                                                <input 
                                                  type="number" 
                                                  value={govBuildings}
                                                  onChange={e => setGovBuildings(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 45" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Regional Grid Renewable Mix (%)</label>
                                                <input 
                                                  type="number" 
                                                  value={govRenewable}
                                                  onChange={e => setGovRenewable(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 25" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-orange-100 rounded-xl text-orange-700">
                                                <Bus size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">Public Mobility Systems</h3>
                                                <p className="text-xs opacity-60">Enter transit systems and vehicle volume baselines.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Average Monthly Transit Ridership</label>
                                                <input 
                                                  type="number" 
                                                  value={govRidership}
                                                  onChange={e => setGovRidership(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 120000" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Municipal Fleet Vehicle Volume</label>
                                                <input 
                                                  type="number" 
                                                  value={govFleet}
                                                  onChange={e => setGovFleet(e.target.value)}
                                                  className="w-full p-4 rounded-xl bg-white/70 border border-transparent focus:border-blue-300 focus:bg-white outline-none transition-all" 
                                                  placeholder="e.g. 150" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* --- CALIBRATE STEP --- */}
                        {step === 3 && (
                            <div className="animate-fade-in text-center py-10">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <Lightbulb size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Ready to Calibrate Engine</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    GreenAI is primed to analyze your regional utility and operations data against greenhouse gas protocol coefficients.
                                </p>
                                <button 
                                  onClick={handleCalculate}
                                  className="px-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all" 
                                  style={{ backgroundColor: COLORS.primary }}
                                >
                                    Generate Sustainability Audit
                                </button>
                            </div>
                        )}

                        <div className="mt-8 flex justify-between">
                            <button 
                                onClick={() => setStep(Math.max(1, step - 1))}
                                className={`px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-black/5'}`}
                                style={{ color: COLORS.primary }}
                            >
                                Back
                            </button>
                            {step < 3 && (
                                <button 
                                    onClick={() => setStep(step + 1)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:translate-x-1"
                                    style={{ backgroundColor: COLORS.accent }}
                                >
                                    Next <ChevronRight size={18} />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CarbonCalculator;

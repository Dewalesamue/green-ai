import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, Wind, Battery, CloudLightning } from 'lucide-react';
import { COLORS, RENEWABLE_FORECAST_DATA } from '../constants';

const RenewableIntelligence: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 pb-24">
             <div>
                <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.primary }}>Renewable Intelligence</h2>
                <p className="opacity-70">Predictive generation forecasting and storage optimization.</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                            <Sun size={24} />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 bg-white rounded-lg text-orange-600">PEAK: 1:00 PM</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">845 kWh</div>
                    <div className="text-sm text-gray-500">Projected Solar Output</div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Wind size={24} />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 bg-white rounded-lg text-blue-600">AVG WIND: 12 MPH</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">320 kWh</div>
                    <div className="text-sm text-gray-500">Projected Wind Output</div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                            <Battery size={24} />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 bg-white rounded-lg text-green-600">CHARGING</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">78%</div>
                    <div className="text-sm text-gray-500">Storage Capacity</div>
                </div>
            </div>

            {/* Forecast Chart */}
             <div className="p-6 rounded-2xl border shadow-sm"
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255, 255, 255, 0.6)' }}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>24h Generation Forecast</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Solar</span>
                        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500 opacity-50"></div> Wind</span>
                    </div>
                </div>
                
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={RENEWABLE_FORECAST_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                        <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" name="Solar" />
                        <Area type="monotone" dataKey="secondaryValue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorWind)" name="Wind" />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Smart Grid Card */}
            <div className="rounded-3xl bg-[#1F4E79] text-white p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <CloudLightning size={24} className="text-yellow-400" />
                        </div>
                        <h3 className="font-bold text-xl">Smart Grid Optimization</h3>
                    </div>
                    <p className="max-w-xl text-blue-100 leading-relaxed mb-6">
                        AI predicts a grid pricing surge between 4:00 PM and 6:00 PM today. 
                        System will automatically switch to battery storage to avoid peak rates.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-white text-[#1F4E79] font-bold rounded-xl text-sm">Active</button>
                        <button className="px-6 py-2 bg-transparent border border-white/30 text-white font-medium rounded-xl text-sm hover:bg-white/10">Configure</button>
                    </div>
                </div>
                {/* Background effect */}
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-600/30 to-transparent"></div>
            </div>
        </div>
    );
};

export default RenewableIntelligence;
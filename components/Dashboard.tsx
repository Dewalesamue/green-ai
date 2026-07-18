import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Zap, TrendingDown, DollarSign, 
  AlertCircle, Sparkles, HelpCircle, Activity, ShieldAlert
} from 'lucide-react';
import { COLORS } from '../constants';
import { Recommendation, UserData, UserRole } from '../types';

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, isPositive, icon: Icon }) => (
  <div className="p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md"
       style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255, 255, 255, 0.6)' }}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/50 text-[#1F4E79]">
        <Icon size={22} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {isPositive ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        {trend}
      </div>
    </div>
    <p className="text-sm font-medium opacity-60 mb-1" style={{ color: COLORS.primary }}>{title}</p>
    <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{value}</h3>
  </div>
);

interface DashboardProps {
  userData?: UserData | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const role = userData?.role || UserRole.BUSINESS;
  const isCalibrated = !!userData?.calculatedEmissions;
  
  // Dynamic scale factor relative to calibration
  const baseValue = userData?.calculatedEmissions?.total || (role === UserRole.INDIVIDUAL ? 8.2 : role === UserRole.GOVERNMENT ? 42500 : 4250);
  const costValue = userData?.calculatedEmissions?.projectedCost || (role === UserRole.INDIVIDUAL ? 1850 : role === UserRole.GOVERNMENT ? 1420000 : 124500);
  const intensityValue = userData?.calculatedEmissions?.energyIntensity || (role === UserRole.INDIVIDUAL ? 35 : role === UserRole.GOVERNMENT ? 250 : 145);
  
  const unit = role === UserRole.INDIVIDUAL ? 'tCO2e' : 'tCO2e';

  // Customized emission trend line scaling dynamically
  const EMISSIONS_TREND = [
    { name: 'Jan', value: Math.round(baseValue * 1.15 * 10) / 10, secondaryValue: Math.round(baseValue * 1.1 * 10) / 10 },
    { name: 'Feb', value: Math.round(baseValue * 1.08 * 10) / 10, secondaryValue: Math.round(baseValue * 1.05 * 10) / 10 },
    { name: 'Mar', value: Math.round(baseValue * 1.2 * 10) / 10, secondaryValue: Math.round(baseValue * 1.0 * 10) / 10 },
    { name: 'Apr', value: Math.round(baseValue * 1.05 * 10) / 10, secondaryValue: Math.round(baseValue * 0.95 * 10) / 10 },
    { name: 'May', value: Math.round(baseValue * 0.98 * 10) / 10, secondaryValue: Math.round(baseValue * 0.9 * 10) / 10 },
    { name: 'Jun', value: Math.round(baseValue * 0.95 * 10) / 10, secondaryValue: Math.round(baseValue * 0.85 * 10) / 10 },
  ];

  // Energy source mix mapping
  const ENERGY_MIX = userData?.calculatedEmissions?.breakdown.map((item, idx) => ({
      name: item.name,
      value: item.value
  })) || [
    { name: 'Renewable Power', value: 45 },
    { name: 'Standard Utility Grid', value: 35 },
    { name: 'Natural Gas Heating', value: 20 },
  ];

  const getRecommendations = (): Recommendation[] => {
    if (role === UserRole.INDIVIDUAL) {
      return [
        {
          id: '1',
          title: 'Smart Thermostat Integration',
          impact: '-15% Heating',
          cost: '$150',
          difficulty: 'Low',
          category: 'Energy',
        },
        {
          id: '2',
          title: 'Switch to Green Grid Power',
          impact: '-90% Elec footprint',
          cost: '$0',
          difficulty: 'Low',
          category: 'Energy',
        },
        {
          id: '3',
          title: 'Backyard Composting & Waste',
          impact: '-400 lbs landfills / yr',
          cost: '$25',
          difficulty: 'Medium',
          category: 'Waste',
        },
      ];
    } else if (role === UserRole.GOVERNMENT) {
      return [
        {
          id: '1',
          title: 'Municipal Streetlight LED Retrofit',
          impact: '-30% Public Load',
          cost: '$24,000',
          difficulty: 'Medium',
          category: 'Energy',
        },
        {
          id: '2',
          title: 'EV Transit Fleet Phase 1',
          impact: '-320 tons CO2e / yr',
          cost: 'High',
          difficulty: 'High',
          category: 'Supply Chain',
        },
        {
          id: '3',
          title: 'Community Renewable Incentives',
          impact: '+12% Solar Adoption',
          cost: 'Medium',
          difficulty: 'Medium',
          category: 'Energy',
        },
      ];
    } else {
      return [
        {
          id: '1',
          title: 'HVAC Scheduling Optimization',
          impact: '-15% Facility Energy',
          cost: '$0',
          difficulty: 'Low',
          category: 'Energy',
        },
        {
          id: '2',
          title: 'Commercial Solar Expansion',
          impact: '-40 tons CO2e',
          cost: 'High',
          difficulty: 'High',
          category: 'Energy',
        },
        {
          id: '3',
          title: 'Supply Chain Scope 3 Audit',
          impact: '-12% Supplier Emissions',
          cost: 'Medium',
          difficulty: 'Medium',
          category: 'Supply Chain',
        },
      ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8">
      
      {/* Calibration Notice Warning banner */}
      {!isCalibrated && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm flex items-start gap-4 animate-fade-in">
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl mt-0.5">
                  <ShieldAlert size={20} />
              </div>
              <div className="space-y-1 flex-1">
                  <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-600 animate-pulse" />
                      Model Calibration Recommended
                  </h4>
                  <p className="text-xs text-amber-800/80 leading-relaxed">
                      GreenAI is currently displaying regional standard baseline values. Head over to the **Carbon Engine** tab to model your specific consumption data and unlock hyper-personalized, context-aware savings intelligence.
                  </p>
              </div>
          </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.primary }}>
             {role === UserRole.INDIVIDUAL ? 'At Home Overview' : role === UserRole.BUSINESS ? 'Enterprise Dashboard' : 'Municipal Sustainability Control'}
          </h2>
          <p className="opacity-70">
             Tracking your goal target: <span className="font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs">{userData?.target || 'Moderate (-15%)'}</span> with <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full text-xs">{userData?.energySource || 'Grid (Standard)'}</span>
          </p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/60 hover:bg-white/70 transition-colors">
                Export Reports
            </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Carbon Footprint" 
          value={`${baseValue.toLocaleString()} ${unit}`} 
          trend={isCalibrated ? "Calculated Profile" : "Regional Baseline"} 
          isPositive={isCalibrated} 
          icon={TrendingDown} 
        />
        <MetricCard 
          title={role === UserRole.GOVERNMENT ? "Public Grid Load" : "Energy Intensity"} 
          value={`${intensityValue.toLocaleString()} ${role === UserRole.INDIVIDUAL ? 'kWh/m' : role === UserRole.GOVERNMENT ? 'MWh' : 'kWh/m²'}`} 
          trend="8% below benchmark" 
          isPositive={true} 
          icon={Zap} 
        />
        <MetricCard 
          title="Projected Utility Spend" 
          value={`$${costValue.toLocaleString()}`} 
          trend="Annualized estimate" 
          isPositive={true} 
          icon={DollarSign} 
        />
        <MetricCard 
          title="GreenAI Calibration" 
          value={isCalibrated ? "Active & Optimizing" : "Baseline Active"} 
          trend={isCalibrated ? "Calibrated Profile" : "Not Calibrated"} 
          isPositive={isCalibrated} 
          icon={AlertCircle} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Emissions Trend */}
        <div className="lg:col-span-2 p-6 rounded-2xl border shadow-sm"
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255, 255, 255, 0.6)' }}>
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>Emissions Trajectory ({unit})</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EMISSIONS_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.2}/>
                     <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke={COLORS.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Calculated Emissions" />
                <Area type="monotone" dataKey="secondaryValue" stroke={COLORS.accent} strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorSec)" name="Reduction Pathway" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart: Energy Mix */}
        <div className="p-6 rounded-2xl border shadow-sm"
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255, 255, 255, 0.6)' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary }}>Carbon Emission Shares</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ENERGY_MIX}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ENERGY_MIX.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[COLORS.primary, COLORS.accent, COLORS.success][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
             {/* Center Text */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                <span className="text-3xl font-bold block" style={{ color: COLORS.primary }}>
                   {isCalibrated ? `${ENERGY_MIX[0]?.value}%` : '45%'}
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Primary Share</span>
             </div>
          </div>
          <p className="text-sm text-center mt-4 opacity-70">
             Recommended actions could reduce your total emissions by <span className="font-semibold text-green-600">15-20%</span>.
          </p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                <Sparkles className="text-yellow-500 animate-pulse" fill="currentColor" />
                Custom AI Savings & Optimization Paths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec) => (
                    <div key={rec.id} className="p-5 rounded-xl border border-white/60 bg-white/40 hover:bg-white/60 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                             <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                 rec.difficulty === 'Low' ? 'bg-green-100 text-green-700' : 
                                 rec.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                             }`}>{rec.difficulty} Effort</span>
                             <span className="text-xs font-bold opacity-50 uppercase">{rec.category}</span>
                        </div>
                        <h4 className="font-bold text-lg mb-1 leading-snug group-hover:text-blue-700 transition-colors" style={{color: COLORS.primary}}>{rec.title}</h4>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                            <div className="font-semibold text-green-600">{rec.impact}</div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="opacity-70">Investment: {rec.cost}</div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;

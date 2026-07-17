import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Zap, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { EMISSIONS_DATA, ENERGY_MIX_DATA, COLORS, RECOMMENDATIONS } from '../constants';
import { Recommendation } from '../types';

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

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 pb-24 md:pb-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.primary }}>Overview</h2>
          <p className="opacity-70">Tracking your mission to reduce carbon at home, work, and beyond.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/60 hover:bg-white/70 transition-colors">
                Export Report
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg transition-transform hover:scale-105" 
                    style={{ backgroundColor: COLORS.primary }}>
                + Add Data Source
            </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Carbon Footprint" 
          value="4,250 tCO2e" 
          trend="12% vs last month" 
          isPositive={true} 
          icon={TrendingDown} 
        />
        <MetricCard 
          title="Energy Intensity" 
          value="145 kWh/m²" 
          trend="5% vs last month" 
          isPositive={true} 
          icon={Zap} 
        />
        <MetricCard 
          title="Projected Cost" 
          value="$124,500" 
          trend="2.4% vs last month" 
          isPositive={false} 
          icon={DollarSign} 
        />
        <MetricCard 
          title="Active Alerts" 
          value="3 Critical" 
          trend="Needs Attention" 
          isPositive={false} 
          icon={AlertCircle} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Emissions Trend */}
        <div className="lg:col-span-2 p-6 rounded-2xl border shadow-sm"
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255, 255, 255, 0.6)' }}>
          <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.primary }}>Emissions Trajectory</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EMISSIONS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                <Area type="monotone" dataKey="value" stroke={COLORS.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Actual Emissions" />
                <Area type="monotone" dataKey="secondaryValue" stroke={COLORS.accent} strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorSec)" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart: Energy Mix */}
        <div className="p-6 rounded-2xl border shadow-sm"
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255, 255, 255, 0.6)' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary }}>Energy Source Mix</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ENERGY_MIX_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ENERGY_MIX_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[COLORS.success, COLORS.primary, COLORS.accent][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
             {/* Center Text */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                <span className="text-3xl font-bold block" style={{ color: COLORS.primary }}>45%</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Renewable</span>
             </div>
          </div>
          <p className="text-sm text-center mt-4 opacity-70">
            Transitioning to solar could reduce cost by <span className="font-semibold text-green-600">12%</span> annually.
          </p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                <Zap className="text-yellow-500" fill="currentColor" />
                AI Optimization Opportunities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOMMENDATIONS.map((rec) => (
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
                            <div className="opacity-70">Cost: {rec.cost}</div>
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
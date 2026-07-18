import React from 'react';
import { Leaf, LogOut } from 'lucide-react';
import { MENU_ITEMS, COLORS } from '../constants';
import { ViewState, UserData } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  userData?: UserData | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout, userData }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 p-6 flex flex-col justify-between z-20 hidden md:flex"
           style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.5)' }}>
      
      <div>
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => onNavigate(ViewState.DASHBOARD)}>
          <div className="p-2 rounded-xl text-white shadow-lg" style={{ backgroundColor: COLORS.primary }}>
            <Leaf size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.primary }}>GreenAI</h1>
        </div>

        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'shadow-lg font-medium' 
                    : 'hover:bg-white/30 text-gray-600'
                }`}
                style={{
                    backgroundColor: isActive ? COLORS.primary : 'transparent',
                    color: isActive ? '#fff' : COLORS.primary
                }}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-[#1F4E79]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-2">
        {userData && (
          <div className="mb-4 px-3 py-2.5 rounded-xl bg-[#1F4E79]/5 border border-[#1F4E79]/10 text-xs flex flex-col gap-0.5">
            <span className="opacity-50 text-[9px] uppercase tracking-wider font-semibold">Active Scope</span>
            <span className="font-bold text-[#1F4E79]">{userData.role === 'Individual' ? '🏠 At Home' : userData.role === 'Business' ? '🏢 In the Office' : '🌍 Environmental'}</span>
            <span className="text-[10px] opacity-50 truncate">{userData.email}</span>
          </div>
        )}
        <div className="p-4 rounded-xl bg-white/40 border border-white/50 backdrop-blur-sm mb-6">
          <p className="text-xs font-semibold mb-2 uppercase opacity-70">Impact Score</p>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold" style={{ color: COLORS.primary }}>A-</span>
            <span className="text-sm mb-1 text-green-600 font-medium">↑ Top 10%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors opacity-70 hover:opacity-100 w-full" 
          style={{ color: COLORS.primary }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
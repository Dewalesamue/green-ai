import { ChartDataPoint, Recommendation } from './types';
import { LayoutDashboard, Calculator, Zap, FileText, Sun, Bell } from 'lucide-react';

export const COLORS = {
  primary: '#1F4E79', // Deep Blue
  accent: '#F39C2D', // Warm Amber
  background: '#F4EFE7', // Soft Cream
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  glass: 'rgba(255, 255, 255, 0.4)',
  glassBorder: 'rgba(255, 255, 255, 0.5)',
};

export const MENU_ITEMS = [
  { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'CALCULATOR', label: 'Carbon Engine', icon: Calculator },
  { id: 'OPTIMIZATION', label: 'Optimization', icon: Zap },
  { id: 'RENEWABLE', label: 'Renewable Intel', icon: Sun },
  { id: 'REPORTS', label: 'Reports & ESG', icon: FileText },
  { id: 'ALERTS', label: 'Alerts', icon: Bell },
];

export const EMISSIONS_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 420, secondaryValue: 380 },
  { name: 'Feb', value: 380, secondaryValue: 370 },
  { name: 'Mar', value: 450, secondaryValue: 390 },
  { name: 'Apr', value: 390, secondaryValue: 360 },
  { name: 'May', value: 350, secondaryValue: 340 },
  { name: 'Jun', value: 320, secondaryValue: 330 },
];

export const ENERGY_MIX_DATA: ChartDataPoint[] = [
  { name: 'Renewable', value: 45 },
  { name: 'Grid (Fossil)', value: 35 },
  { name: 'Natural Gas', value: 20 },
];

export const RENEWABLE_FORECAST_DATA: ChartDataPoint[] = [
  { name: '06:00', value: 10, secondaryValue: 12 },
  { name: '09:00', value: 45, secondaryValue: 40 },
  { name: '12:00', value: 85, secondaryValue: 80 },
  { name: '15:00', value: 70, secondaryValue: 75 },
  { name: '18:00', value: 30, secondaryValue: 25 },
  { name: '21:00', value: 5, secondaryValue: 5 },
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    title: 'HVAC Optimization Script',
    impact: '-15% Energy',
    cost: '$0',
    difficulty: 'Low',
    category: 'Energy',
  },
  {
    id: '2',
    title: 'Solar Array Expansion',
    impact: '-40 tons CO2e',
    cost: 'High',
    difficulty: 'High',
    category: 'Energy',
  },
  {
    id: '3',
    title: 'Supply Chain Audit',
    impact: '-12% Scope 3',
    cost: 'Medium',
    difficulty: 'Medium',
    category: 'Supply Chain',
  },
];

export const REPORTS_LIST = [
  { id: 1, name: 'Q1 2024 ESG Compliance Report', date: 'Oct 24, 2024', status: 'Ready' },
  { id: 2, name: 'Carbon Emission Audit', date: 'Sep 15, 2024', status: 'Ready' },
  { id: 3, name: 'Energy Efficiency Forecast', date: 'Aug 01, 2024', status: 'Archived' },
];

export const SYSTEM_INSTRUCTION = `You are the GreenAI Assistant.
Your core mission is to help users reduce carbon levels at home, in the office, and in the environment.
Help users understand their environmental impact, interpret complex data charts, and suggest actionable strategies.
Tone: Professional, encouraging, clear, and data-driven.
When asked about data, assume the user is looking at the dashboard which shows a positive trend in emission reduction.
Suggest specific actions like switching to renewable providers, optimizing HVAC schedules, or supply chain auditing.
Be concise.
`;
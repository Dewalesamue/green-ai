import React from 'react';

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondaryValue?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  impact: string;
  cost: string;
  difficulty: 'Low' | 'Medium' | 'High';
  category: 'Energy' | 'Waste' | 'Supply Chain';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppStage {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  APP = 'APP'
}

export enum AuthView {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  ROLE_SELECTION = 'ROLE_SELECTION'
}

export enum UserRole {
  INDIVIDUAL = 'Individual',
  BUSINESS = 'Business',
  GOVERNMENT = 'Government'
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CALCULATOR = 'CALCULATOR',
  OPTIMIZATION = 'OPTIMIZATION',
  RENEWABLE = 'RENEWABLE',
  REPORTS = 'REPORTS',
  ALERTS = 'ALERTS',
  INTEGRATION = 'INTEGRATION'
}

export interface UserData {
  role: UserRole;
  email: string;
  energySource: string;
  target: string;
  calculatorInputs?: {
    electricity?: number;
    gas?: number;
    mileage?: number;
    waste?: number;
    squareFootage?: number;
    supplierSpend?: number;
    infrastructureCount?: number;
    transitRidership?: number;
    region?: string;
  };
  calculatedEmissions?: {
    total: number;
    breakdown: { name: string; value: number }[];
    energyIntensity?: number;
    projectedCost?: number;
  };
}
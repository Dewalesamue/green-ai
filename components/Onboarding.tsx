import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { COLORS } from '../constants';

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const steps = [
      {
          title: "Let's calibrate your profile",
          desc: "GreenAI needs a few baselines to generate accurate predictions.",
          question: "What is your primary energy source?",
          options: ["Grid (Standard)", "Grid (Green Plan)", "Hybrid (Solar/Wind)", "Off-grid"]
      },
      {
          title: "Set your ambition",
          desc: "We will tailor recommendations based on how aggressive you want to be.",
          question: "What is your reduction target for 2025?",
          options: ["Conservative (-5%)", "Moderate (-15%)", "Aggressive (-30%)", "Net Zero"]
      }
  ];

  const handleNext = () => {
      if (step < steps.length - 1) {
          setStep(step + 1);
      } else {
          setAnalyzing(true);
          // Simulate AI processing
          setTimeout(() => {
              onFinish();
          }, 2500);
      }
  };

  if (analyzing) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: COLORS.primary }}>
                      <Sparkles className="text-white w-10 h-10 animate-spin-slow" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-20"></div>
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>Calibrating GreenAI Engine...</h2>
              <p className="opacity-60 max-w-md">Analyzing regional emission factors, energy mix data, and regulatory benchmarks for your profile.</p>
              
              <div className="mt-8 w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
              </div>
          </div>
      );
  }

  const currentStep = steps[step];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
            <div className="mb-8 flex items-center gap-2 text-sm font-semibold opacity-40 uppercase tracking-widest">
                <span>Step {step + 1} of {steps.length}</span>
                <div className="flex-1 h-px bg-current opacity-30"></div>
            </div>

            <h1 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>{currentStep.title}</h1>
            <p className="text-xl opacity-70 mb-10">{currentStep.desc}</p>

            <div className="mb-8">
                <p className="font-semibold mb-4 text-lg">{currentStep.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStep.options.map((opt) => (
                        <button 
                            key={opt}
                            onClick={handleNext}
                            className="p-6 rounded-2xl bg-white/50 border border-white/60 hover:bg-white text-left font-medium transition-all hover:scale-[1.02] hover:shadow-lg hover:border-blue-200 focus:ring-2 focus:ring-blue-500/20"
                            style={{ color: COLORS.primary }}
                        >
                            <span className="flex justify-between items-center">
                                {opt}
                                <ArrowRight size={16} className="opacity-0 hover:opacity-100" />
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-start">
               <button onClick={handleNext} className="text-sm font-semibold opacity-50 hover:opacity-100 transition-opacity">
                   Skip for now
               </button>
            </div>
        </div>
    </div>
  );
};

export default Onboarding;
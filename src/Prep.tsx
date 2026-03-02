import React from 'react';
import { useStepNavigation } from './hooks/useStepNavigation';
import { steps, allIngredients } from './data/steps';
import { IngredientTracker } from './components/IngredientTracker';
import { StepDisplay } from './components/StepDisplay';
import { NavigationControls } from './components/NavigationControls';

export default function Prep() {
  const { 
    currentStepIndex, 
    handleNext, 
    handlePrev, 
    isFirstStep, 
    isLastStep 
  } = useStepNavigation(steps.length);
  
  const currentStep = steps[currentStepIndex];

  return (
    <div className="bg-alabaster text-charcoal font-sans min-h-screen flex flex-col overflow-hidden selection:bg-cobalt/20 selection:text-cobalt relative">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-noise"></div>
      
      <div className="relative flex h-screen w-full flex-col items-center justify-between animate-pulse-once transition-colors duration-700">
        <IngredientTracker 
          allIngredients={allIngredients} 
          activeIngredients={currentStep.ingredients} 
        />
        
        <StepDisplay 
          step={currentStep} 
          onNext={handleNext} 
        />
        
        <NavigationControls 
          currentStepIndex={currentStepIndex} 
          totalSteps={steps.length} 
          isFirstStep={isFirstStep} 
          isLastStep={isLastStep} 
          onPrev={handlePrev} 
          onNext={handleNext} 
        />
      </div>
    </div>
  );
}

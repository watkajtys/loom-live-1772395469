import { useState, useEffect, useCallback } from 'react';
import { ingredients, steps } from './data/recipeData';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import IngredientList from './components/IngredientList';
import StepDisplay from './components/StepDisplay';
import FooterNav from './components/FooterNav';

export default function Prep() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex < steps.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault(); // Prevent default scrolling for Space
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext]);

  const currentStep = steps[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div 
      className="min-h-screen bg-alabaster text-charcoal font-sans flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 cursor-pointer select-none relative focus:outline-none"
      onClick={handleNext}
      tabIndex={0}
      role="main"
      aria-label="Recipe Preparation"
    >
      <ProgressBar progressPercentage={progressPercentage} />
      
      <div className="w-full max-w-5xl mb-16 text-center pt-4">
        <Header />
        <IngredientList 
          ingredients={ingredients} 
          activeIngredients={currentStep.activeIngredients} 
        />
      </div>

      <StepDisplay 
        currentStep={currentStep} 
        stepNumber={currentStepIndex + 1} 
      />

      <FooterNav 
        currentStepIndex={currentStepIndex} 
        totalSteps={steps.length} 
      />
    </div>
  );
}

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrev: (e?: React.MouseEvent | React.KeyboardEvent | Event) => void;
  onNext: (e?: React.MouseEvent | React.KeyboardEvent | Event) => void;
}

export const NavigationControls = React.memo(function NavigationControls({ 
  currentStepIndex, 
  totalSteps, 
  isFirstStep, 
  isLastStep, 
  onPrev, 
  onNext 
}: NavigationControlsProps) {
  return (
    <div className="relative z-10 w-full pb-10 flex flex-col items-center justify-end">
      <div className="flex items-center justify-center gap-6 text-charcoal/40 transition-opacity duration-300 hover:text-charcoal/60">
        <button 
          aria-label="Previous Step" 
          className="p-3 hover:text-cobalt hover:bg-cobalt/5 rounded-full transition-colors disabled:opacity-50"
          onClick={onPrev}
          disabled={isFirstStep}
        >
          <ArrowLeft className="w-6 h-6 stroke-1" />
        </button>
        <div className="text-xs font-bold tracking-widest font-sans uppercase">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>
        <button 
          aria-label="Next Step" 
          className="p-3 hover:text-cobalt hover:bg-cobalt/5 rounded-full transition-colors disabled:opacity-50"
          onClick={onNext}
          disabled={isLastStep}
        >
          <ArrowRight className="w-6 h-6 stroke-1" />
        </button>
      </div>
    </div>
  );
});

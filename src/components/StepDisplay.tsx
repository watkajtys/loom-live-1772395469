import React from 'react';
import { Step } from '../data/steps';

interface StepDisplayProps {
  step: Step;
  onNext: (e?: React.MouseEvent | React.KeyboardEvent | Event) => void;
}

export const StepDisplay = React.memo(function StepDisplay({ step, onNext }: StepDisplayProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onNext(e);
    }
  };

  return (
    <div 
      className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-3xl mx-auto w-full text-center bg-transparent border-none cursor-pointer outline-none group focus-visible:ring-4 focus-visible:ring-cobalt/30 rounded-3xl"
      onClick={onNext}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Advance to next step. Current step: ${step.title}`}
    >
      <div className="mb-6 text-cobalt opacity-80 flex justify-center items-center">
        {step.icon}
      </div>
      <h1 className="text-charcoal text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 transition-transform group-active:scale-[0.99]">
        {step.title}
      </h1>
      <div className="w-12 h-px bg-cobalt/20 my-4"></div>
      <p className="text-charcoal/70 font-serif italic text-xl md:text-2xl leading-relaxed max-w-xl">
        {step.description}
      </p>
    </div>
  );
});

import { Step } from '../data/recipeData';

interface StepDisplayProps {
  currentStep: Step;
  stepNumber: number;
}

export default function StepDisplay({ currentStep, stepNumber }: StepDisplayProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl pb-24">
      <div className="text-center transition-all duration-500 ease-in-out">
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 text-cobalt font-bold text-lg">
          {stepNumber}
        </div>
        <h2 className="text-4xl sm:text-5xl font-medium leading-tight text-charcoal mb-6 max-w-2xl mx-auto">
          {currentStep.instruction}
        </h2>
        {currentStep.notes && (
          <p className="text-xl text-gray-500 font-serif italic mt-4 max-w-xl mx-auto">
            {currentStep.notes}
          </p>
        )}
      </div>
    </div>
  );
}

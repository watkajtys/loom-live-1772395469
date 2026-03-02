import { useState } from 'react';
import { ChefHat, ChevronRight } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  notes?: string;
}

interface Step {
  id: string;
  instruction: string;
  notes?: string;
  activeIngredients?: string[];
}

export default function Prep() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const ingredients: Ingredient[] = [
    { id: 'i1', name: 'Carrots', amount: '2 cups', notes: 'peeled and diced' },
    { id: 'i2', name: 'Onions', amount: '1 cup', notes: 'finely chopped' },
    { id: 'i3', name: 'Celery', amount: '1 cup', notes: 'diced' },
    { id: 'i4', name: 'Garlic', amount: '3 cloves', notes: 'minced' },
  ];

  const steps: Step[] = [
    { id: '1', instruction: 'Gather all ingredients and tools.', notes: 'Preparation is key.', activeIngredients: ['i1', 'i2', 'i3', 'i4'] },
    { id: '2', instruction: 'Peel and dice carrots.', notes: 'Keep pieces uniform.', activeIngredients: ['i1'] },
    { id: '3', instruction: 'Chop onions finely.', activeIngredients: ['i2'] },
    { id: '4', instruction: 'Dice celery and mince garlic.', activeIngredients: ['i3', 'i4'] },
  ];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const currentStep = steps[currentStepIndex];

  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div 
      className="min-h-screen bg-alabaster text-charcoal font-sans flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 cursor-pointer select-none relative"
      onClick={handleNext}
    >
      {/* Top blue progress bar */}
      <div className="fixed top-0 left-0 h-1.5 bg-gray-200 w-full z-50">
        <div 
          className="h-full bg-cobalt transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Header */}
      <div className="w-full max-w-5xl mb-16 text-center pt-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <ChefHat className="w-5 h-5 text-cobalt" />
          <h1 className="text-sm uppercase tracking-widest text-cobalt font-bold">Mise en Place</h1>
        </div>
        
        {/* Ingredients resting quietly at the top */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {ingredients.map((ing) => {
            const isActive = currentStep.activeIngredients?.includes(ing.id);
            return (
              <li 
                key={ing.id}
                className={`flex items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}
              >
                <span className={`text-sm ${isActive ? 'font-bold border-b-2 border-cobalt pb-0.5 text-cobalt' : 'font-medium'}`}>
                  {ing.name} <span className={`${isActive ? 'text-cobalt/80 font-normal' : 'text-gray-500 font-normal'}`}>({ing.amount})</span>
                  {ing.notes && <span className="font-serif italic text-gray-400 ml-1">- {ing.notes}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Singular holding space for the current step */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl pb-24">
        <div className="text-center transition-all duration-500 ease-in-out">
          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 text-cobalt font-bold text-lg">
            {currentStepIndex + 1}
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

      {/* Bottom navigation affordances */}
      <div className="fixed bottom-0 left-0 w-full p-8 flex justify-between items-center text-gray-400">
        <div className="text-sm font-medium tracking-wide">
          {currentStepIndex + 1} / {steps.length}
        </div>
        <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-medium animate-pulse">
          Click anywhere to advance
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

    </div>
  );
}
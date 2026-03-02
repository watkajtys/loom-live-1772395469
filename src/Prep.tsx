import { useState } from 'react';

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
    { id: '1', instruction: 'Gather all ingredients and tools.', notes: 'Preparation is key.' },
    { id: '2', instruction: 'Peel and dice carrots.', notes: 'Keep pieces uniform.' },
    { id: '3', instruction: 'Chop onions finely.' },
    { id: '4', instruction: 'Dice celery and mince garlic.' },
  ];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div 
      className="min-h-screen bg-alabaster text-charcoal font-sans flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 cursor-pointer select-none"
      onClick={handleNext}
    >
      
      {/* Header */}
      <div className="w-full max-w-5xl mb-16 text-center">
        <h1 className="text-sm uppercase tracking-widest text-cobalt font-bold mb-8">Mise en Place</h1>
        
        {/* Ingredients resting quietly at the top */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {ingredients.map((ing) => (
            <li 
              key={ing.id}
              className="flex items-center gap-2 opacity-80"
            >
              <span className="font-medium text-sm">
                {ing.name} <span className="text-gray-500 font-normal">({ing.amount})</span>
                {ing.notes && <span className="font-serif italic text-gray-400 ml-1">- {ing.notes}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Singular holding space for the current step */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl">
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

    </div>
  );
}
import { useState } from 'react';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const ingredients: Ingredient[] = [
    { id: 'i1', name: 'Carrots', amount: '2 cups', notes: 'peeled and diced' },
    { id: 'i2', name: 'Onions', amount: '1 cup', notes: 'finely chopped' },
    { id: 'i3', name: 'Celery', amount: '1 cup', notes: 'diced' },
    { id: 'i4', name: 'Garlic', amount: '3 cloves', notes: 'minced' },
  ];

  const steps: Step[] = [
    { id: '1', instruction: 'Gather all ingredients and tools.' },
    { id: '2', instruction: 'Peel and dice carrots.', notes: 'Keep pieces uniform.' },
    { id: '3', instruction: 'Chop onions finely.' },
    { id: '4', instruction: 'Dice celery and mince garlic.' },
  ];

  const toggleIngredient = (id: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedIngredients(newChecked);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-alabaster text-charcoal font-sans flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="w-full max-w-5xl mb-16 text-center">
        <h1 className="text-sm uppercase tracking-widest text-cobalt font-bold mb-8">Mise en Place</h1>
        
        {/* Ingredients resting quietly at the top */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {ingredients.map((ing) => {
            const isChecked = checkedIngredients.has(ing.id);
            return (
              <li 
                key={ing.id}
                className={`flex items-center gap-2 cursor-pointer transition-opacity ${isChecked ? 'opacity-40 line-through' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => toggleIngredient(ing.id)}
              >
                <button className="text-cobalt focus:outline-none" aria-label={`Toggle ${ing.name}`}>
                  {isChecked ? <CheckCircle2 className="w-4 h-4 text-cobalt" /> : <Circle className="w-4 h-4 text-gray-400" />}
                </button>
                <span className="font-medium text-sm">
                  {ing.name} <span className="text-gray-500 font-normal">({ing.amount})</span>
                </span>
              </li>
            );
          })}
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

      {/* Step Navigation */}
      <div className="w-full max-w-3xl mt-16 flex items-center justify-between">
        <button 
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-gray-100 text-gray-600'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Previous</span>
        </button>
        
        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all ${idx === currentStepIndex ? 'bg-cobalt scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${currentStepIndex === steps.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-cobalt text-white hover:bg-blue-800 shadow-sm'}`}
        >
          <span className="font-medium">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
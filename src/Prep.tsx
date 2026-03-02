import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

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
  const [activeStepId, setActiveStepId] = useState<string>('1');

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

  return (
    <div className="min-h-screen bg-alabaster text-charcoal font-sans p-8 md:p-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Ingredients Section */}
        <section>
          <h1 className="text-3xl font-bold mb-6 text-cobalt tracking-tight">Mise en Place</h1>
          <ul className="space-y-4">
            {ingredients.map((ing) => {
              const isChecked = checkedIngredients.has(ing.id);
              return (
                <li 
                  key={ing.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer border border-transparent ${isChecked ? 'bg-gray-100 opacity-60' : 'hover:border-gray-200 hover:bg-white shadow-sm'}`}
                  onClick={() => toggleIngredient(ing.id)}
                >
                  <button className="mt-0.5 text-cobalt flex-shrink-0 focus:outline-none" aria-label={`Toggle ${ing.name}`}>
                    {isChecked ? <CheckCircle2 className="w-5 h-5 text-cobalt" /> : <Circle className="w-5 h-5 text-gray-400" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className={`font-medium ${isChecked ? 'line-through' : ''}`}>{ing.name}</span>
                      <span className="text-sm font-medium text-gray-600">{ing.amount}</span>
                    </div>
                    {ing.notes && (
                      <p className="text-sm text-gray-500 font-serif italic mt-1">{ing.notes}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Preparation Steps Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-cobalt tracking-tight">Preparation Steps</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {steps.map((step, index) => {
              const isActive = activeStepId === step.id;
              return (
                <div 
                  key={step.id}
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => setActiveStepId(step.id)}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-alabaster shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${isActive ? 'border-cobalt text-cobalt font-bold' : 'border-gray-300 text-gray-500'}`}>
                    {index + 1}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${isActive ? 'bg-white border-cobalt shadow-md' : 'bg-gray-50 border-gray-200'}`}>
                    <p className={`font-medium text-lg leading-snug ${isActive ? 'text-charcoal' : 'text-gray-600'}`}>
                      {step.instruction}
                    </p>
                    {step.notes && (
                      <p className="text-sm text-gray-500 font-serif italic mt-2">{step.notes}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CookingPot, ChefHat, Utensils, Droplet, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Mince the garlic finely.",
    description: "Keep it uniform so it cooks evenly without burning.",
    icon: <ChefHat className="w-12 h-12 stroke-1" />,
    ingredients: ["2 Cloves Garlic"]
  },
  {
    title: "Boil the pasta in heavily salted water.",
    description: "Cook until just shy of al dente.",
    icon: <CookingPot className="w-12 h-12 stroke-1" />,
    ingredients: ["400g Pasta"]
  },
  {
    title: "Chop the fresh basil.",
    description: "A rough chop is fine, keep it fragrant.",
    icon: <Utensils className="w-12 h-12 stroke-1" />,
    ingredients: ["Fresh Basil"]
  },
  {
    title: "Toss the pasta with the emulsified sauce and a splash of reserved water.",
    description: "Aim for a glossy texture. If it looks dry, add another tablespoon of pasta water.",
    icon: <CookingPot className="w-12 h-12 stroke-1" />,
    ingredients: ["400g Pasta", "Reserved Water"]
  },
  {
    title: "Drizzle with olive oil.",
    description: "Use your best extra virgin olive oil for finishing.",
    icon: <Droplet className="w-12 h-12 stroke-1" />,
    ingredients: ["Olive Oil"]
  },
  {
    title: "Garnish with fresh basil and serve immediately.",
    description: "Enjoy your perfectly executed dish.",
    icon: <Sparkles className="w-12 h-12 stroke-1" />,
    ingredients: ["Fresh Basil"]
  }
];
const allIngredients = ["2 Cloves Garlic", "400g Pasta", "Fresh Basil", "Olive Oil", "Reserved Water"];

export default function Prep() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Default to step 4 (index 3) if not specified or invalid
  let currentStepIndex = parseInt(searchParams.get('step') || '4', 10) - 1;
  if (isNaN(currentStepIndex) || currentStepIndex < 0 || currentStepIndex >= steps.length) {
    currentStepIndex = 3;
  }
  
  const currentStep = steps[currentStepIndex];

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1);
    setSearchParams({ step: (nextIndex + 1).toString() });
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = Math.max(currentStepIndex - 1, 0);
    setSearchParams({ step: (prevIndex + 1).toString() });
  };

  return (
    <div className="bg-alabaster text-charcoal font-sans min-h-screen flex flex-col overflow-hidden selection:bg-cobalt/20 selection:text-cobalt">
        <div 
          className="relative flex h-screen w-full flex-col items-center justify-between cursor-pointer animate-pulse-once group transition-colors duration-700"
          onClick={handleNext}
        >
        <div className="relative z-10 w-full max-w-7xl px-8 pt-8 md:pt-12 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {allIngredients.map(ingredient => {
            const isActive = currentStep.ingredients.includes(ingredient);
            return (
              <div 
                key={ingredient} 
                className={`flex h-8 items-center justify-center rounded-full px-4 transition-colors ${isActive ? 'bg-cobalt-light border border-cobalt/30 shadow-sm' : 'bg-white border border-stone-200'}`}
              >
                <span className={`text-xs uppercase tracking-wide ${isActive ? 'text-cobalt font-bold' : 'text-charcoal/60 font-medium'}`}>
                  {ingredient}
                </span>
              </div>
            );
          })}
        </div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-3xl mx-auto w-full text-center">
        <div className="mb-6 text-cobalt opacity-80 flex justify-center items-center">
        {currentStep.icon}
        </div>
        <h1 className="text-charcoal text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                        {currentStep.title}
                    </h1>
        <div className="w-12 h-px bg-cobalt/20 my-4"></div>
        <p className="text-charcoal/70 font-serif italic text-xl md:text-2xl leading-relaxed max-w-xl">
                        {currentStep.description}
                    </p>
        </div>
        <div className="relative z-10 w-full pb-10 flex flex-col items-center justify-end">
        <div className="flex items-center justify-center gap-6 text-charcoal/40 transition-opacity duration-300 group-hover:text-charcoal/60">
        <button 
          aria-label="Previous Step" 
          className="p-3 hover:text-cobalt hover:bg-cobalt/5 rounded-full transition-colors disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="w-6 h-6 stroke-1" />
        </button>
        <div className="text-xs font-bold tracking-widest font-sans uppercase">Step {currentStepIndex + 1} of {steps.length}</div>
        <button 
          aria-label="Next Step" 
          className="p-3 hover:text-cobalt hover:bg-cobalt/5 rounded-full transition-colors disabled:opacity-50"
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
        >
          <ArrowRight className="w-6 h-6 stroke-1" />
        </button>
        </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        </div>

    </div>
  );
}

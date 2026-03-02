import React from 'react';

interface IngredientTrackerProps {
  allIngredients: string[];
  activeIngredients: string[];
}

export const IngredientTracker = React.memo(function IngredientTracker({ allIngredients, activeIngredients }: IngredientTrackerProps) {
  return (
    <div className="relative z-10 w-full max-w-7xl px-8 pt-8 md:pt-12 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {allIngredients.map(ingredient => {
          const isActive = activeIngredients.includes(ingredient);
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
  );
});

import { memo } from 'react';
import { Ingredient } from '../data/recipeData';

interface IngredientListProps {
  ingredients: Ingredient[];
  activeIngredients?: string[];
}

const IngredientList = memo(function IngredientList({ ingredients, activeIngredients }: IngredientListProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
      {ingredients.map((ing) => {
        const isActive = activeIngredients?.includes(ing.id);
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
  );
});

export default IngredientList;

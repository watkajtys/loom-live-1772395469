export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  notes?: string;
}

export interface Step {
  id: string;
  instruction: string;
  notes?: string;
  activeIngredients?: string[];
}

export const ingredients: Ingredient[] = [
  { id: 'i1', name: 'Carrots', amount: '2 cups', notes: 'peeled and diced' },
  { id: 'i2', name: 'Onions', amount: '1 cup', notes: 'finely chopped' },
  { id: 'i3', name: 'Celery', amount: '1 cup', notes: 'diced' },
  { id: 'i4', name: 'Garlic', amount: '3 cloves', notes: 'minced' },
];

export const steps: Step[] = [
  { id: '1', instruction: 'Gather all ingredients and tools.', notes: 'Preparation is key.', activeIngredients: ['i1', 'i2', 'i3', 'i4'] },
  { id: '2', instruction: 'Peel and dice carrots.', notes: 'Keep pieces uniform.', activeIngredients: ['i1'] },
  { id: '3', instruction: 'Chop onions finely.', activeIngredients: ['i2'] },
  { id: '4', instruction: 'Dice celery and mince garlic.', activeIngredients: ['i3', 'i4'] },
];

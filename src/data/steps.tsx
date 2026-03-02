import React from 'react';
import { CookingPot, ChefHat, Utensils, Droplet, Sparkles } from 'lucide-react';

export interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  ingredients: string[];
}

export const steps: Step[] = [
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

export const allIngredients = ["2 Cloves Garlic", "400g Pasta", "Fresh Basil", "Olive Oil", "Reserved Water"];

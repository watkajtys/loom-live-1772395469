import { memo } from 'react';
import { ChefHat } from 'lucide-react';

const Header = memo(function Header() {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <ChefHat className="w-5 h-5 text-cobalt" />
      <h1 className="text-sm uppercase tracking-widest text-cobalt font-bold">Mise en Place</h1>
    </div>
  );
});

export default Header;

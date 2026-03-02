import { memo } from 'react';
import { ChevronRight } from 'lucide-react';

interface FooterNavProps {
  currentStepIndex: number;
  totalSteps: number;
}

const FooterNav = memo(function FooterNav({ currentStepIndex, totalSteps }: FooterNavProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-8 flex justify-between items-center text-gray-400">
      <div className="text-sm font-medium tracking-wide">
        {currentStepIndex + 1} / {totalSteps}
      </div>
      <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-medium animate-pulse">
        Click anywhere to advance
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
});

export default FooterNav;

import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useStepNavigation(totalSteps: number, defaultStepIndex: number = 3) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  let currentStepIndex = parseInt(searchParams.get('step') || (defaultStepIndex + 1).toString(), 10) - 1;
  if (isNaN(currentStepIndex) || currentStepIndex < 0 || currentStepIndex >= totalSteps) {
    currentStepIndex = defaultStepIndex;
  }

  const handleNext = useCallback((e?: React.MouseEvent | React.KeyboardEvent | Event) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const nextIndex = Math.min(currentStepIndex + 1, totalSteps - 1);
    setSearchParams({ step: (nextIndex + 1).toString() });
  }, [currentStepIndex, totalSteps, setSearchParams]);

  const handlePrev = useCallback((e?: React.MouseEvent | React.KeyboardEvent | Event) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const prevIndex = Math.max(currentStepIndex - 1, 0);
    setSearchParams({ step: (prevIndex + 1).toString() });
  }, [currentStepIndex, setSearchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  return {
    currentStepIndex,
    handleNext,
    handlePrev,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === totalSteps - 1
  };
}

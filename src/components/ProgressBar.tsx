interface ProgressBarProps {
  progressPercentage: number;
}

export default function ProgressBar({ progressPercentage }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 h-1.5 bg-gray-200 w-full z-50">
      <div 
        className="h-full bg-cobalt transition-all duration-500 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}

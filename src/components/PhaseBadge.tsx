import { CyclePhase } from '../types';
import { getPhaseDisplayName, getPhaseColor } from '../lib/cycleUtils';

interface PhaseBadgeProps {
  phase: CyclePhase;
  className?: string;
}

export function PhaseBadge({ phase, className = '' }: PhaseBadgeProps) {
  const colorClass = getPhaseColor(phase);
  
  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        bg-${colorClass}/10 text-${colorClass} border border-${colorClass}/20
        ${className}
      `}
    >
      {getPhaseDisplayName(phase)}
    </span>
  );
}

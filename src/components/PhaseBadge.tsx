import type { CyclePhase } from '../types';
import { getPhaseDisplayName } from '../lib/cycleUtils';

interface PhaseBadgeProps {
  phase: CyclePhase;
  className?: string;
  variant?: 'default' | 'gradient' | 'minimal';
}

export function PhaseBadge({ phase, className = '', variant = 'default' }: PhaseBadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return `phase-gradient-${phase} text-white font-semibold tracking-wide uppercase text-xs`;
      case 'minimal':
        return `bg-gray-100 text-gray-700 font-medium tracking-wide uppercase text-xs`;
      default:
        const colorMap = {
          menstrual: 'bg-red-50 text-red-700 border-red-200',
          follicular: 'bg-pink-50 text-pink-700 border-pink-200',
          ovulatory: 'bg-purple-50 text-purple-700 border-purple-200',
          luteal: 'bg-blue-50 text-blue-700 border-blue-200'
        };
        return colorMap[phase];
    }
  };
  
  return (
    <span 
      className={`
        inline-flex items-center px-4 py-2 rounded-none border-2 font-medium
        transition-all duration-200 hover:scale-105
        ${getVariantClasses()}
        ${className}
      `}
    >
      {getPhaseDisplayName(phase)}
    </span>
  );
}

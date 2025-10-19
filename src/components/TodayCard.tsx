import { CycleInfo, Tip } from '../types';
import { PhaseBadge } from './PhaseBadge';
import { TipCard } from './TipCard';

interface TodayCardProps {
  cycleInfo: CycleInfo;
  todaysTips: Tip[];
  favorites: string[];
  onToggleFavorite: (tipId: string) => void;
}

export function TodayCard({ cycleInfo, todaysTips, favorites, onToggleFavorite }: TodayCardProps) {
  const progressPercentage = Math.round(cycleInfo.phaseProgress * 100);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Today</h2>
          <PhaseBadge phase={cycleInfo.currentPhase} />
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            Day {cycleInfo.currentDay} of your cycle
          </p>
          <p className="text-sm text-gray-500">
            {cycleInfo.daysInPhase} days in {cycleInfo.currentPhase} phase
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progressPercentage}% through current phase
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Tips</h3>
        <div className="grid gap-4">
          {todaysTips.map(tip => (
            <TipCard
              key={tip.id}
              tip={tip}
              isFavorited={favorites.includes(tip.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

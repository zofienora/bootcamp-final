import type { CycleInfo, Tip } from '../types';
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
    <div className="card p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Today</h2>
            <p className="text-gray-500 font-medium">Your cycle guidance</p>
          </div>
          <PhaseBadge phase={cycleInfo.currentPhase} variant="gradient" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                Day {cycleInfo.currentDay}
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                of your cycle
              </p>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {cycleInfo.daysInPhase} days
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                in {cycleInfo.currentPhase} phase
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">Phase Progress</span>
              <span className="text-sm font-bold text-gray-900">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 border-2 border-gray-200">
              <div 
                className="bg-gray-900 h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-gray-900">Today's Guidance</h3>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>
        <div className="grid gap-6">
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

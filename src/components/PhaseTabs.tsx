import { useState } from 'react';
import type { CyclePhase } from '../types';
import { PhaseBadge } from './PhaseBadge';
import { TipCard } from './TipCard';
import { phaseData } from '../data/sampleData';

interface PhaseTabsProps {
  favorites: string[];
  onToggleFavorite: (tipId: string) => void;
}

export function PhaseTabs({ favorites, onToggleFavorite }: PhaseTabsProps) {
  const [activePhase, setActivePhase] = useState<CyclePhase>('menstrual');
  
  const phases: CyclePhase[] = ['menstrual', 'follicular', 'ovulatory', 'luteal'];
  const currentPhaseData = phaseData[activePhase];
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Cycle phases">
          {phases.map((phase) => {
            const phaseInfo = phaseData[phase];
            const isActive = phase === activePhase;
            
            return (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${isActive 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {phaseInfo.name}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <PhaseBadge phase={activePhase} />
            <span className="text-sm text-gray-500">
              {currentPhaseData.duration} days
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {currentPhaseData.description}
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentPhaseData.name} Tips
          </h3>
          <div className="grid gap-4">
            {currentPhaseData.tips.map(tip => (
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
    </div>
  );
}

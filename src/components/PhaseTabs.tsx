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
    <div className="card">
      {/* Tab Navigation */}
      <div className="border-b-2 border-gray-200">
        <nav className="flex" aria-label="Cycle phases">
          {phases.map((phase) => {
            const phaseInfo = phaseData[phase];
            const isActive = phase === activePhase;
            
            return (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`
                  flex-1 py-6 px-6 border-b-4 font-bold text-sm uppercase tracking-wide transition-all duration-200
                  ${isActive 
                    ? 'border-gray-900 text-gray-900 bg-gray-50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
      <div className="p-8">
        {/* Phase Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                {currentPhaseData.name} Phase
              </h2>
              <p className="text-gray-500 font-medium">
                {currentPhaseData.duration} days • {currentPhaseData.description}
              </p>
            </div>
            <PhaseBadge phase={activePhase} variant="gradient" />
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">Phase Guidance</h3>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className="grid gap-6">
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

import type { Tip } from '../types';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface TipCardProps {
  tip: Tip;
  isFavorited: boolean;
  onToggleFavorite: (tipId: string) => void;
}

export function TipCard({ tip, isFavorited, onToggleFavorite }: TipCardProps) {
  const categoryConfig = {
    nutrition: {
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: '🌱'
    },
    movement: {
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '💪'
    }
  };
  
  const config = categoryConfig[tip.category];
  
  return (
    <div className="card p-6 group hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-none border-2 font-medium tracking-wide uppercase text-xs ${config.bg} ${config.color} ${config.border}`}>
              {config.icon} {tip.category === 'nutrition' ? 'Nutrition' : 'Movement'}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{tip.title}</h3>
          <p className="text-gray-600 leading-relaxed text-base">{tip.description}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(tip.id)}
          className="ml-4 p-2 rounded-none border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 group-hover:border-gray-400"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}

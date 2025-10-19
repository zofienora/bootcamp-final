import type { Tip } from '../types';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface TipCardProps {
  tip: Tip;
  isFavorited: boolean;
  onToggleFavorite: (tipId: string) => void;
}

export function TipCard({ tip, isFavorited, onToggleFavorite }: TipCardProps) {
  const categoryColor = tip.category === 'nutrition' ? 'text-green-600' : 'text-blue-600';
  const categoryBg = tip.category === 'nutrition' ? 'bg-green-50' : 'bg-blue-50';
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${categoryBg} ${categoryColor}`}>
              {tip.category === 'nutrition' ? 'Nutrition' : 'Movement'}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(tip.id)}
          className="ml-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}

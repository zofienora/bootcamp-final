import { useState, useEffect } from 'react';
import type { UserData, CycleInfo, Tip } from './types';
import { loadUserData, saveUserData, toggleFavorite } from './lib/storage';
import { calculateCycleInfo } from './lib/cycleUtils';
import { sampleTips } from './data/sampleData';
import { TodayCard } from './components/TodayCard';
import { PhaseTabs } from './components/PhaseTabs';

function App() {
  const [userData, setUserData] = useState<UserData>(loadUserData());
  const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'browse'>('today');

  // Calculate cycle info when user data changes
  useEffect(() => {
    const info = calculateCycleInfo(userData);
    setCycleInfo(info);
  }, [userData]);

  // Save user data to localStorage when it changes
  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  // Get today's tips (2 nutrition, 1 movement)
  const getTodaysTips = (): Tip[] => {
    if (!cycleInfo) return [];
    
    const phaseTips = sampleTips.filter(tip => tip.phase === cycleInfo.currentPhase);
    const nutritionTips = phaseTips.filter(tip => tip.category === 'nutrition').slice(0, 2);
    const movementTips = phaseTips.filter(tip => tip.category === 'movement').slice(0, 1);
    
    return [...nutritionTips, ...movementTips];
  };

  const handleCycleStartChange = (date: string) => {
    setUserData(prev => ({ ...prev, cycleStart: date }));
  };

  const handleAverageLengthChange = (length: number) => {
    setUserData(prev => ({ ...prev, averageLength: length }));
  };

  const handleToggleFavorite = (tipId: string) => {
    setUserData(prev => ({
      ...prev,
      favorites: toggleFavorite(tipId, prev.favorites)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-3">CycleSync</h1>
              <p className="text-gray-600 text-lg font-medium">Nutrition and movement guidance for your cycle</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <label htmlFor="cycle-start" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Cycle Start Date
                </label>
                <input
                  id="cycle-start"
                  type="date"
                  value={userData.cycleStart}
                  onChange={(e) => handleCycleStartChange(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 font-medium transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="cycle-length" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Average Length (days)
                </label>
                <input
                  id="cycle-length"
                  type="number"
                  min="21"
                  max="35"
                  value={userData.averageLength}
                  onChange={(e) => handleAverageLengthChange(parseInt(e.target.value) || 28)}
                  className="w-full sm:w-auto px-4 py-3 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 font-medium transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="mb-12">
          <nav className="flex space-x-12 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('today')}
              className={`py-4 px-1 border-b-4 font-bold text-lg uppercase tracking-wide transition-all duration-200 ${
                activeTab === 'today'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-4 px-1 border-b-4 font-bold text-lg uppercase tracking-wide transition-all duration-200 ${
                activeTab === 'browse'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse All Phases
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'today' && cycleInfo && (
          <TodayCard
            cycleInfo={cycleInfo}
            todaysTips={getTodaysTips()}
            favorites={userData.favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'browse' && (
          <PhaseTabs
            favorites={userData.favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 text-center font-medium leading-relaxed">
            This app provides general wellness guidance and is not a substitute for medical advice. 
            Always consult with healthcare professionals for medical concerns.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
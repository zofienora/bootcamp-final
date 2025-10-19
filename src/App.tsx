import { useState, useEffect } from 'react';
import { UserData, CycleInfo, Tip } from './types';
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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">CycleSync</h1>
              <p className="text-gray-600">Nutrition and movement guidance for your cycle</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="cycle-start" className="block text-sm font-medium text-gray-700 mb-1">
                  Cycle Start Date
                </label>
                <input
                  id="cycle-start"
                  type="date"
                  value={userData.cycleStart}
                  onChange={(e) => handleCycleStartChange(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="cycle-length" className="block text-sm font-medium text-gray-700 mb-1">
                  Average Length (days)
                </label>
                <input
                  id="cycle-length"
                  type="number"
                  min="21"
                  max="35"
                  value={userData.averageLength}
                  onChange={(e) => handleAverageLengthChange(parseInt(e.target.value) || 28)}
                  className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('today')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'today'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-500 text-center">
            This app provides general wellness guidance and is not a substitute for medical advice. 
            Always consult with healthcare professionals for medical concerns.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
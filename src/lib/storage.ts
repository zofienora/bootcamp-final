import type { UserData } from '../types';

const STORAGE_KEY = 'cyclesync-user-data';

/**
 * Load user data from localStorage
 */
export function loadUserData(): UserData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
  
  // Return default data if nothing stored
  return {
    cycleStart: new Date().toISOString().split('T')[0],
    averageLength: 28,
    favorites: []
  };
}

/**
 * Save user data to localStorage
 */
export function saveUserData(userData: UserData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}

/**
 * Toggle favorite status of a tip
 */
export function toggleFavorite(tipId: string, currentFavorites: string[]): string[] {
  const isFavorited = currentFavorites.includes(tipId);
  if (isFavorited) {
    return currentFavorites.filter(id => id !== tipId);
  } else {
    return [...currentFavorites, tipId];
  }
}

import type { CyclePhase, CycleInfo, UserData } from '../types';

/**
 * Calculate current cycle information based on start date and average length
 */
export function calculateCycleInfo(userData: UserData): CycleInfo {
  const startDate = new Date(userData.cycleStart);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Handle case where we're past the current cycle
  const currentDay = (daysSinceStart % userData.averageLength) + 1;
  
  // Phase calculations based on typical cycle
  const phase = getPhaseFromDay(currentDay, userData.averageLength);
  const phaseInfo = getPhaseInfo(phase);
  const daysInPhase = getDaysInPhase(currentDay, phase, userData.averageLength);
  const phaseProgress = daysInPhase / phaseInfo.duration;
  
  return {
    currentDay,
    currentPhase: phase,
    daysInPhase,
    phaseProgress: Math.min(phaseProgress, 1)
  };
}

/**
 * Determine cycle phase from day number
 */
function getPhaseFromDay(day: number, _cycleLength: number): CyclePhase {
  if (day <= 5) return 'menstrual';
  if (day <= 13) return 'follicular';
  if (day <= 16) return 'ovulatory';
  return 'luteal';
}

/**
 * Get phase information including duration
 */
function getPhaseInfo(phase: CyclePhase) {
  const phaseMap = {
    menstrual: { duration: 5 },
    follicular: { duration: 8 },
    ovulatory: { duration: 4 },
    luteal: { duration: 14 }
  };
  return phaseMap[phase];
}

/**
 * Calculate days spent in current phase
 */
function getDaysInPhase(day: number, phase: CyclePhase, _cycleLength: number): number {
  const phaseStarts = {
    menstrual: 1,
    follicular: 6,
    ovulatory: 14,
    luteal: 18
  };
  
  const phaseStart = phaseStarts[phase];
  return Math.max(1, day - phaseStart + 1);
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get phase display name
 */
export function getPhaseDisplayName(phase: CyclePhase): string {
  const names = {
    menstrual: 'Menstrual',
    follicular: 'Follicular',
    ovulatory: 'Ovulatory',
    luteal: 'Luteal'
  };
  return names[phase];
}

/**
 * Get phase color for styling
 */
export function getPhaseColor(phase: CyclePhase): string {
  const colors = {
    menstrual: 'cycle-red',
    follicular: 'cycle-pink',
    ovulatory: 'cycle-purple',
    luteal: 'cycle-blue'
  };
  return colors[phase];
}

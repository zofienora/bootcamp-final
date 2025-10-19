export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'nutrition' | 'movement';
  phase: CyclePhase;
}

export interface UserData {
  cycleStart: string; // ISO date string
  averageLength: number; // days
  favorites: string[]; // tip IDs
}

export interface CycleInfo {
  currentDay: number;
  currentPhase: CyclePhase;
  daysInPhase: number;
  phaseProgress: number; // 0-1
}

export interface PhaseData {
  name: string;
  description: string;
  color: string;
  duration: number; // days
  tips: Tip[];
}

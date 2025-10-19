import type { Tip, PhaseData } from '../types';

export const sampleTips: Tip[] = [
  // Menstrual Phase Tips
  {
    id: 'menstrual-nutrition-1',
    title: 'Iron-Rich Foods',
    description: 'Focus on iron-rich foods like spinach, lentils, and lean red meat to replenish iron lost during menstruation.',
    category: 'nutrition',
    phase: 'menstrual'
  },
  {
    id: 'menstrual-nutrition-2',
    title: 'Warm, Comforting Foods',
    description: 'Choose warm, easily digestible foods like soups, stews, and herbal teas to support your body during this phase.',
    category: 'nutrition',
    phase: 'menstrual'
  },
  {
    id: 'menstrual-movement-1',
    title: 'Gentle Movement',
    description: 'Focus on gentle yoga, walking, or light stretching. Listen to your body and rest when needed.',
    category: 'movement',
    phase: 'menstrual'
  },

  // Follicular Phase Tips
  {
    id: 'follicular-nutrition-1',
    title: 'Fresh, Energizing Foods',
    description: 'Embrace fresh vegetables, fruits, and lean proteins. Your body is ready for nutrient-dense, energizing foods.',
    category: 'nutrition',
    phase: 'follicular'
  },
  {
    id: 'follicular-nutrition-2',
    title: 'Complex Carbohydrates',
    description: 'Include whole grains, quinoa, and sweet potatoes to support your rising energy levels.',
    category: 'nutrition',
    phase: 'follicular'
  },
  {
    id: 'follicular-movement-1',
    title: 'Building Strength',
    description: 'This is an ideal time for strength training, HIIT, and challenging workouts as your energy is rising.',
    category: 'movement',
    phase: 'follicular'
  },

  // Ovulatory Phase Tips
  {
    id: 'ovulatory-nutrition-1',
    title: 'Peak Performance Nutrition',
    description: 'Focus on high-quality proteins and healthy fats to support your peak energy and hormone production.',
    category: 'nutrition',
    phase: 'ovulatory'
  },
  {
    id: 'ovulatory-nutrition-2',
    title: 'Hydration Focus',
    description: 'Increase water intake and include hydrating foods like cucumbers and watermelon to support optimal function.',
    category: 'nutrition',
    phase: 'ovulatory'
  },
  {
    id: 'ovulatory-movement-1',
    title: 'Peak Performance Training',
    description: 'Take advantage of your peak energy with high-intensity workouts, sports, or challenging fitness goals.',
    category: 'movement',
    phase: 'ovulatory'
  },

  // Luteal Phase Tips
  {
    id: 'luteal-nutrition-1',
    title: 'Mood-Supporting Foods',
    description: 'Include foods rich in magnesium, B vitamins, and omega-3s like salmon, nuts, and dark leafy greens.',
    category: 'nutrition',
    phase: 'luteal'
  },
  {
    id: 'luteal-nutrition-2',
    title: 'Blood Sugar Balance',
    description: 'Focus on regular, balanced meals with protein, fiber, and healthy fats to maintain stable energy.',
    category: 'nutrition',
    phase: 'luteal'
  },
  {
    id: 'luteal-movement-1',
    title: 'Mindful Movement',
    description: 'Practice yoga, pilates, or moderate cardio. Listen to your body as energy may fluctuate during this phase.',
    category: 'movement',
    phase: 'luteal'
  }
];

export const phaseData: Record<string, PhaseData> = {
  menstrual: {
    name: 'Menstrual Phase',
    description: 'A time for rest, reflection, and gentle self-care. Honor your body\'s need to slow down.',
    color: 'cycle-red',
    duration: 5,
    tips: sampleTips.filter(tip => tip.phase === 'menstrual')
  },
  follicular: {
    name: 'Follicular Phase',
    description: 'Energy is building. This is your time to take on new challenges and build momentum.',
    color: 'cycle-pink',
    duration: 8,
    tips: sampleTips.filter(tip => tip.phase === 'follicular')
  },
  ovulatory: {
    name: 'Ovulatory Phase',
    description: 'Peak energy and confidence. Channel this powerful time into your most important goals.',
    color: 'cycle-purple',
    duration: 4,
    tips: sampleTips.filter(tip => tip.phase === 'ovulatory')
  },
  luteal: {
    name: 'Luteal Phase',
    description: 'A time for processing, planning, and preparing. Trust your intuition and inner wisdom.',
    color: 'cycle-blue',
    duration: 14,
    tips: sampleTips.filter(tip => tip.phase === 'luteal')
  }
};

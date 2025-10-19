# CycleSync

A React + TypeScript web app that helps women get daily nutrition and exercise tips based on their menstrual cycle phase.

## Features

- **Cycle Tracking**: Set your cycle start date and average length
- **Phase Detection**: Automatically calculates current cycle day and phase
- **Today View**: Shows current phase, day number, and 3 relevant tips (2 nutrition, 1 movement)
- **Browse Section**: Explore all phases and their tips
- **Favorites**: Save your favorite tips with localStorage persistence
- **Responsive Design**: Clean, minimal, editorial aesthetics inspired by Rick Owens/Margiela

## Cycle Phases

- **Menstrual** (Days 1-5): Rest, reflection, and gentle self-care
- **Follicular** (Days 6-13): Energy building, new challenges
- **Ovulatory** (Days 14-17): Peak energy and confidence
- **Luteal** (Days 18-28): Processing, planning, and intuition

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Heroicons for icons
- localStorage for data persistence

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── PhaseBadge.tsx  # Phase indicator badge
│   ├── PhaseTabs.tsx   # Phase browsing interface
│   ├── TipCard.tsx     # Individual tip display
│   └── TodayCard.tsx   # Today's view component
├── data/               # Sample data
│   └── sampleData.ts   # Default tips and phase data
├── lib/                # Utility functions
│   ├── cycleUtils.ts   # Cycle calculation logic
│   └── storage.ts      # localStorage helpers
├── types/              # TypeScript definitions
│   └── index.ts        # Type interfaces
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Design Philosophy

- **Minimal**: Clean, uncluttered interface
- **Editorial**: Bold typography and spacing
- **Accessible**: Semantic HTML and proper contrast
- **Responsive**: Works on all device sizes
- **Client-side**: No backend required, all data stored locally

## Disclaimer

This app provides general wellness guidance and is not a substitute for medical advice. Always consult with healthcare professionals for medical concerns.
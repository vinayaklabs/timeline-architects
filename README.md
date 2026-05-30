# Timeline Architects ⏰

A futuristic browser game where you control time itself, not characters. Create branching timelines, manage civilizations, and witness the butterfly effect in action.

## 🎮 Game Concept

Timeline Architects is a unique time-management game where your decisions ripple through history. Small events can create major future consequences—the butterfly effect engine ensures that every action matters.

## 🚀 Features

- **Interactive Timeline Visualization**: Watch your civilization's history branch and evolve
- **Procedural Event Generation**: Randomly generated events keep gameplay fresh
- **Butterfly Effect Engine**: Small events cascade into major consequences
- **Timeline Management**:
  - Pause, resume, and speed up time (0.5x to 5x)
  - Create alternate timeline branches
  - Merge timelines to combine their strengths
- **Civilization Stats**:
  - Population tracking
  - Technology advancement
  - Economic growth
  - Citizen happiness
  - Military strength
- **Event Cards**: Each event shows year, title, impact score, and civilization effects
- **Save & Load**: Your timelines persist using localStorage
- **Futuristic UI**: Glassmorphism design with smooth animations

## 💻 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 🏃 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vinayaklabs/timeline-architects.git
cd timeline-architects

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The game will be available at `http://localhost:5173`

## 🎯 How to Play

1. **Start Playing**: Click "Resume Time" to begin
2. **Manage Time**: Use speed controls (0.5x to 5x) to control time flow
3. **Generate Events**: Click "Generate Events" to create new timeline events
4. **Trigger Events**: Click on event cards to trigger them and see their effects
5. **Create Branches**: Use "Create Branch" to explore alternate timelines
6. **Monitor Stats**: Watch your civilization's stats evolve based on events
7. **Save Your Game**: Progress is auto-saved every 30 seconds

## 📁 Project Structure

```
timeline-architects/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx
│   │   ├── TimelineVisualization.tsx
│   │   ├── CivilizationStats.tsx
│   │   ├── TimeControls.tsx
│   │   ├── TimelineBrowser.tsx
│   │   └── EventGenerator.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useGameLoop.ts
│   │   └── useWindowSize.ts
│   ├── store/              # Zustand store
│   │   └── gameStore.ts
│   ├── utils/              # Utility functions
│   │   ├── eventGenerator.ts
│   │   └── storage.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 UI Design

- **Dark Theme**: Easy on the eyes with timeline accent colors
- **Glassmorphism**: Modern frosted glass effect on cards
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Stats**: See civilization metrics update live

## 🔧 State Management

The game uses Zustand for efficient state management:

- Timeline creation and switching
- Event generation and triggering
- Civilization stat updates
- Game pause/resume
- Time speed control
- Save/load functionality

## 💾 Data Persistence

Game state is automatically saved to localStorage:
- All timelines and events
- Current civilization stats
- Game progress
- All saves are automatic every 30 seconds

## 🐛 Debugging

Open browser DevTools (F12) to:
- Inspect component tree
- Check network requests
- Monitor console for errors
- Inspect localStorage (Application > Local Storage)

## 📝 License

MIT License - Feel free to use this project as a base for your own games!

## 🎮 Future Enhancements

- Multiplayer timeline collaboration
- More event types and interactions
- Custom difficulty settings
- Leaderboards
- Sound effects and music
- Advanced butterfly effect visualizations
- Timeline merging UI improvements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

---

Made with ❤️ by Timeline Architects Team

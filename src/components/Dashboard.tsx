import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useGameLoop } from '../hooks/useGameLoop';
import TimeControls from './TimeControls';
import CivilizationStats from './CivilizationStats';
import TimelineVisualization from './TimelineVisualization';
import TimelineBrowser from './TimelineBrowser';
import EventGenerator from './EventGenerator';

const Dashboard: React.FC = () => {
  const {
    timelines,
    activeTimelineId,
    triggerEvent,
    generateNewEvents,
    initializeGame,
    loadGame,
    saveGame,
  } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    const savedGame = loadGame();
    if (!savedGame) {
      initializeGame();
      generateNewEvents();
    }
  }, [initializeGame, loadGame, generateNewEvents]);

  // Save game periodically
  useEffect(() => {
    const saveInterval = setInterval(saveGame, 30000);
    return () => clearInterval(saveInterval);
  }, [saveGame]);

  // Game loop
  useGameLoop();

  const activeTimeline = timelines.find((t) => t.id === activeTimelineId);

  if (!activeTimeline) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-timeline-darker via-timeline-dark to-timeline-darker">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-timeline-accent/10 rounded-full blur-3xl animate-drift" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-timeline-accent/10 rounded-full blur-3xl animate-drift" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glassmorphism border-b border-timeline-accent/20"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-timeline-accent flex items-center gap-3">
              <span className="text-4xl">⏰</span>
              Timeline Architects
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Current Year</p>
                <p className="text-2xl font-bold text-timeline-accent">
                  {activeTimeline.currentYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TimeControls />
            <CivilizationStats stats={activeTimeline.stats} />
            <TimelineBrowser />
            <EventGenerator />
          </div>

          {/* Main Timeline */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glassmorphism p-6 rounded-xl min-h-[600px] timeline-scrollbar overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-timeline-accent mb-6 flex items-center gap-2">
                <span>📜</span>
                {activeTimeline.name} Timeline
              </h2>
              <TimelineVisualization
                events={activeTimeline.events}
                onTriggerEvent={triggerEvent}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

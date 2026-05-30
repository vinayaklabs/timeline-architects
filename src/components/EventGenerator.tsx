import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const EventGenerator: React.FC = () => {
  const { generateNewEvents } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism p-6 rounded-xl"
    >
      <h3 className="text-lg font-bold text-timeline-accent mb-4 flex items-center gap-2">
        <span>⚡</span>
        Event Generator
      </h3>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateNewEvents}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-timeline-accent to-timeline-accent-dark text-timeline-darker font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:glow-accent-strong"
      >
        <Zap size={20} />
        Generate Events
      </motion.button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Create 3 new random events in the next 50 years
      </p>
    </motion.div>
  );
};

export default EventGenerator;

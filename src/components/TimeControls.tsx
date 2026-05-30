import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, FastForward, SkipBack, Plus, Merge2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const TimeControls: React.FC = () => {
  const {
    isRunning,
    timeMultiplier,
    toggleGameRunning,
    setTimeMultiplier,
    createAlternateTimeline,
    timelines,
    activeTimelineId,
  } = useGameStore();

  const handleSpeedChange = (speed: number) => {
    setTimeMultiplier(speed);
  };

  const canMerge = timelines.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism p-6 rounded-xl"
    >
      <h3 className="text-lg font-bold text-timeline-accent mb-4 flex items-center gap-2">
        <span>⏱️</span>
        Time Controls
      </h3>

      {/* Play/Pause Control */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Game Status</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleGameRunning}
          className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            isRunning
              ? 'bg-timeline-accent text-timeline-darker'
              : 'bg-timeline-accent/30 text-timeline-accent border border-timeline-accent/50'
          }`}
        >
          {isRunning ? (
            <>
              <Pause size={20} /> Pause Time
            </>
          ) : (
            <>
              <Play size={20} /> Resume Time
            </>
          )}
        </motion.button>
      </div>

      {/* Speed Control */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Time Speed (x{timeMultiplier})</p>
        <div className="grid grid-cols-4 gap-2">
          {[0.5, 1, 2, 5].map((speed) => (
            <motion.button
              key={speed}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSpeedChange(speed)}
              className={`py-2 px-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                timeMultiplier === speed
                  ? 'bg-timeline-accent text-timeline-darker'
                  : 'bg-timeline-accent/20 text-timeline-accent border border-timeline-accent/50 hover:border-timeline-accent'
              }`}
            >
              <FastForward size={16} className="mx-auto" />
              {speed}x
            </motion.button>
          ))}
        </div>
      </div>

      {/* Timeline Actions */}
      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createAlternateTimeline}
          className="w-full py-2 px-4 rounded-lg bg-timeline-accent/20 text-timeline-accent border border-timeline-accent/50 hover:bg-timeline-accent/30 transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} />
          Create Branch
        </motion.button>
        <button
          disabled={!canMerge}
          className="w-full py-2 px-4 rounded-lg bg-timeline-warning/20 text-timeline-warning border border-timeline-warning/50 hover:bg-timeline-warning/30 transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Merge2 size={16} />
          Merge ({timelines.length})
        </button>
      </div>

      {/* Timeline Count */}
      <div className="mt-6 pt-4 border-t border-timeline-accent/20">
        <p className="text-xs text-gray-400">Active Timelines: {timelines.length}</p>
      </div>
    </motion.div>
  );
};

export default TimeControls;

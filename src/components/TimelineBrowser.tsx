import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

const TimelineBrowser: React.FC = () => {
  const { timelines, activeTimelineId, switchTimeline } = useGameStore();

  const activeTimeline = timelines.find((t) => t.id === activeTimelineId);
  const triggeredEventsCount = activeTimeline?.events.filter((e) => e.triggered).length || 0;
  const totalEventsCount = activeTimeline?.events.length || 0;

  return (
    <div className="glassmorphism p-6 rounded-xl">
      <h3 className="text-lg font-bold text-timeline-accent mb-4 flex items-center gap-2">
        <span>🌳</span>
        Timeline Branches
      </h3>

      <div className="space-y-2">
        <AnimatePresence>
          {timelines.map((timeline, index) => (
            <motion.div
              key={timeline.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => switchTimeline(timeline.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                activeTimelineId === timeline.id
                  ? 'glassmorphism border border-timeline-accent bg-timeline-accent/10'
                  : 'bg-timeline-accent/5 border border-timeline-accent/20 hover:bg-timeline-accent/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-timeline-accent">{timeline.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Year: {timeline.currentYear}
                  </p>
                </div>
                {activeTimelineId === timeline.id && (
                  <div className="px-2 py-1 bg-timeline-success/30 text-timeline-success rounded text-xs font-bold">
                    Active
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Events: {totalEventsCount}</span>
                <span>
                  Triggered: {triggeredEventsCount}/{totalEventsCount}
                </span>
              </div>
              <div className="mt-2 h-1 bg-timeline-accent/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-timeline-accent transition-all duration-300"
                  style={{
                    width:
                      totalEventsCount > 0
                        ? `${(triggeredEventsCount / totalEventsCount) * 100}%`
                        : 0,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineBrowser;

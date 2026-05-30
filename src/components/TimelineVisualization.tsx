import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import type { TimelineEvent } from '../types';

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  onTrigger: (eventId: string) => void;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ event, index, onTrigger }) => {
  const getColorClass = () => {
    if (event.triggered) {
      return event.type === 'positive'
        ? 'from-timeline-success to-timeline-success/50'
        : event.type === 'negative'
          ? 'from-timeline-danger to-timeline-danger/50'
          : 'from-timeline-accent to-timeline-accent/50';
    }
    return 'from-timeline-accent/30 to-timeline-accent/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6"
    >
      <div
        className={`glassmorphism p-4 cursor-pointer hover:glow-accent-strong transition-all duration-300 transform hover:scale-105 border-l-4 ${
          event.type === 'positive'
            ? 'border-timeline-success'
            : event.type === 'negative'
              ? 'border-timeline-danger'
              : 'border-timeline-accent'
        }`}
        onClick={() => onTrigger(event.id)}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-timeline-accent mb-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-400">Year {event.year}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            event.triggered
              ? 'bg-timeline-accent/30 text-timeline-accent'
              : 'bg-timeline-accent/10 text-gray-400'
          }`}>
            Impact: {event.impactScore}
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-3">{event.description}</p>
        {!event.triggered && (
          <div className="text-xs text-timeline-accent animate-pulse">
            Click to trigger event →
          </div>
        )}
        {event.triggered && (
          <div className="text-xs text-timeline-success font-bold">
            ✓ Event Triggered
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface TimelineVisualizationProps {
  events: TimelineEvent[];
  onTriggerEvent: (eventId: string) => void;
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  events,
  onTriggerEvent,
}) => {
  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.year - b.year),
    [events]
  );

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-timeline-accent to-timeline-accent/20" />

      {/* Timeline nodes */}
      <div className="pl-6">
        {sortedEvents.length === 0 ? (
          <div className="glassmorphism p-8 text-center text-gray-400">
            <p>No events yet. Start playing to generate timeline events...</p>
          </div>
        ) : (
          sortedEvents.map((event, index) => (
            <TimelineNode
              key={event.id}
              event={event}
              index={index}
              onTrigger={onTriggerEvent}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TimelineVisualization;

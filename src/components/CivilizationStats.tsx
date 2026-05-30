import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CivilizationStats } from '../types';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  icon: string;
  delay: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, max = 100, icon, delay }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const getColor = () => {
    if (percentage < 30) return 'from-timeline-danger to-timeline-danger/50';
    if (percentage < 60) return 'from-timeline-warning to-timeline-warning/50';
    return 'from-timeline-success to-timeline-success/50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          {label}
        </label>
        <span className="text-sm font-bold text-timeline-accent">
          {Math.floor(value)}
        </span>
      </div>
      <div className="w-full h-3 glassmorphism rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getColor()} shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

interface CivilizationStatsProps {
  stats: CivilizationStats;
}

const CivilizationStats: React.FC<CivilizationStatsProps> = ({ stats }) => {
  const totalScore = useMemo(() => {
    const weights = {
      population: 0.2,
      technology: 0.2,
      economy: 0.2,
      happiness: 0.2,
      military: 0.2,
    };
    return Object.entries(stats).reduce((sum, [key, value]) => {
      const weight = weights[key as keyof CivilizationStats] || 0;
      return sum + value * weight;
    }, 0);
  }, [stats]);

  return (
    <div className="glassmorphism p-6 rounded-xl">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-timeline-accent mb-6 flex items-center gap-2"
      >
        <span>📊</span>
        Civilization Stats
      </motion.h2>

      <div className="mb-6 p-4 glassmorphism rounded-lg bg-timeline-accent/5 border border-timeline-accent/20">
        <p className="text-xs text-gray-400 mb-2">Overall Score</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-timeline-accent">
            {Math.floor(totalScore)}
          </span>
          <span className="text-sm text-gray-500">/ 1000</span>
        </div>
      </div>

      <div className="space-y-1">
        <StatBar
          label="Population"
          value={stats.population}
          max={10000000}
          icon="👥"
          delay={0}
        />
        <StatBar
          label="Technology"
          value={stats.technology}
          max={100}
          icon="⚙️"
          delay={0.1}
        />
        <StatBar
          label="Economy"
          value={stats.economy}
          max={100}
          icon="💰"
          delay={0.2}
        />
        <StatBar
          label="Happiness"
          value={stats.happiness}
          max={100}
          icon="😊"
          delay={0.3}
        />
        <StatBar
          label="Military"
          value={stats.military}
          max={100}
          icon="⚔️"
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default CivilizationStats;

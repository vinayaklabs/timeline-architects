import type { TimelineEvent, CivilizationStats } from '../types';

const eventNames = [
  'Scientific Breakthrough',
  'Economic Crisis',
  'Peace Treaty Signed',
  'Technological Innovation',
  'Natural Disaster',
  'Cultural Renaissance',
  'Military Conflict',
  'Medical Discovery',
  'Agricultural Revolution',
  'Political Upheaval',
  'Trade Route Established',
  'Artistic Movement',
  'Industrial Expansion',
  'Social Reform',
  'Exploration Era',
];

const eventDescriptions = [
  'A groundbreaking discovery changes society forever.',
  'An unexpected turn of events reshapes the timeline.',
  'New opportunities emerge for advancement.',
  'Challenges arise that must be overcome.',
  'Progress accelerates in multiple sectors.',
  'A turning point in civilization\'s history.',
  'Unprecedented growth occurs.',
  'Crisis management becomes critical.',
];

const getRandomElement = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomEvent = (
  baseYear: number,
  stats: CivilizationStats
): TimelineEvent => {
  const eventType = (['positive', 'negative', 'neutral'] as const)[
    getRandomInt(0, 2)
  ];
  const impactScore = getRandomInt(1, 10);
  const yearOffset = getRandomInt(1, 50);

  const statsMultiplier = eventType === 'positive' ? 1 : eventType === 'negative' ? -1 : 0;
  const statsImpact: Partial<CivilizationStats> = {
    population: getRandomInt(-50000, 100000) * statsMultiplier,
    technology: getRandomInt(-5, 15) * statsMultiplier,
    economy: getRandomInt(-10, 30) * statsMultiplier,
    happiness: getRandomInt(-20, 40) * statsMultiplier,
    military: getRandomInt(-10, 20) * statsMultiplier,
  };

  return {
    id: `${Date.now()}-${Math.random()}`,
    year: baseYear + yearOffset,
    title: getRandomElement(eventNames),
    description: getRandomElement(eventDescriptions),
    impactScore,
    statsImpact,
    type: eventType,
    triggered: false,
  };
};

export const generateInitialEvents = (
  baseYear: number,
  stats: CivilizationStats,
  count: number = 5
): TimelineEvent[] => {
  return Array.from({ length: count }, () => generateRandomEvent(baseYear, stats));
};

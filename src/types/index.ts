export interface CivilizationStats {
  population: number;
  technology: number;
  economy: number;
  happiness: number;
  military: number;
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  impactScore: number;
  statsImpact: Partial<CivilizationStats>;
  type: 'positive' | 'negative' | 'neutral';
  triggered: boolean;
}

export interface Timeline {
  id: string;
  name: string;
  events: TimelineEvent[];
  stats: CivilizationStats;
  createdAt: number;
  currentYear: number;
  isPaused: boolean;
  timeSpeed: number;
}

export interface GameState {
  timelines: Timeline[];
  activeTimelineId: string;
  gameTime: number;
  isRunning: boolean;
  timeMultiplier: number;
}

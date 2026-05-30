import { create } from 'zustand';
import type { GameState, Timeline, TimelineEvent, CivilizationStats } from '../types';
import { generateRandomEvent } from '../utils/eventGenerator';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

interface GameStore extends GameState {
  initializeGame: () => void;
  toggleGameRunning: () => void;
  setTimeMultiplier: (multiplier: number) => void;
  switchTimeline: (timelineId: string) => void;
  createAlternateTimeline: () => void;
  mergeTimelines: (sourceId: string, targetId: string) => void;
  updateCurrentTimelineStats: (stats: Partial<CivilizationStats>) => void;
  triggerEvent: (eventId: string) => void;
  generateNewEvents: () => void;
  advanceTime: (deltaTime: number) => void;
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const initialStats: CivilizationStats = {
  population: 1000000,
  technology: 25,
  economy: 50,
  happiness: 60,
  military: 30,
};

const createInitialTimeline = (): Timeline => ({
  id: Date.now().toString(),
  name: 'Alpha Timeline',
  events: [],
  stats: { ...initialStats },
  createdAt: Date.now(),
  currentYear: 2025,
  isPaused: false,
  timeSpeed: 1,
});

export const useGameStore = create<GameStore>((set, get) => ({
  timelines: [createInitialTimeline()],
  activeTimelineId: '',
  gameTime: 0,
  isRunning: false,
  timeMultiplier: 1,

  initializeGame: () => {
    const initialTimeline = createInitialTimeline();
    set({
      timelines: [initialTimeline],
      activeTimelineId: initialTimeline.id,
      gameTime: 0,
      isRunning: true,
      timeMultiplier: 1,
    });
  },

  toggleGameRunning: () => {
    set((state) => ({ isRunning: !state.isRunning }));
  },

  setTimeMultiplier: (multiplier: number) => {
    set(({ timelines, activeTimelineId }) => ({
      timeMultiplier: multiplier,
      timelines: timelines.map((timeline) =>
        timeline.id === activeTimelineId
          ? { ...timeline, timeSpeed: multiplier }
          : timeline
      ),
    }));
  },

  switchTimeline: (timelineId: string) => {
    set({ activeTimelineId: timelineId });
  },

  createAlternateTimeline: () => {
    const state = get();
    const currentTimeline = state.timelines.find(
      (t) => t.id === state.activeTimelineId
    );
    if (!currentTimeline) return;

    const newTimeline: Timeline = {
      id: Date.now().toString(),
      name: `Branch ${state.timelines.length}`,
      events: [...currentTimeline.events],
      stats: { ...currentTimeline.stats },
      createdAt: Date.now(),
      currentYear: currentTimeline.currentYear,
      isPaused: false,
      timeSpeed: 1,
    };

    set((state) => ({
      timelines: [...state.timelines, newTimeline],
      activeTimelineId: newTimeline.id,
    }));
  },

  mergeTimelines: (sourceId: string, targetId: string) => {
    set((state) => {
      const sourceTimeline = state.timelines.find((t) => t.id === sourceId);
      const targetTimeline = state.timelines.find((t) => t.id === targetId);

      if (!sourceTimeline || !targetTimeline) return state;

      const mergedEvents = [
        ...targetTimeline.events,
        ...sourceTimeline.events,
      ].sort((a, b) => a.year - b.year);

      const mergedStats: CivilizationStats = {
        population: Math.floor(
          (targetTimeline.stats.population +
            sourceTimeline.stats.population) /
            2
        ),
        technology: Math.max(
          targetTimeline.stats.technology,
          sourceTimeline.stats.technology
        ),
        economy: Math.floor(
          (targetTimeline.stats.economy + sourceTimeline.stats.economy) / 2
        ),
        happiness: Math.floor(
          (targetTimeline.stats.happiness + sourceTimeline.stats.happiness) /
            2
        ),
        military: Math.floor(
          (targetTimeline.stats.military + sourceTimeline.stats.military) / 2
        ),
      };

      return {
        timelines: state.timelines
          .filter((t) => t.id !== sourceId)
          .map((t) =>
            t.id === targetId
              ? {
                  ...targetTimeline,
                  name: `${targetTimeline.name} (Merged)`,
                  events: mergedEvents,
                  stats: mergedStats,
                }
              : t
          ),
      };
    });
  },

  updateCurrentTimelineStats: (stats: Partial<CivilizationStats>) => {
    set((state) => ({
      timelines: state.timelines.map((timeline) =>
        timeline.id === state.activeTimelineId
          ? {
              ...timeline,
              stats: { ...timeline.stats, ...stats },
            }
          : timeline
      ),
    }));
  },

  triggerEvent: (eventId: string) => {
    set((state) => {
      const timeline = state.timelines.find((t) => t.id === state.activeTimelineId);
      if (!timeline) return state;

      const event = timeline.events.find((e) => e.id === eventId);
      if (!event || event.triggered) return state;

      return {
        timelines: state.timelines.map((t) =>
          t.id === state.activeTimelineId
            ? {
                ...t,
                events: t.events.map((e) =>
                  e.id === eventId ? { ...e, triggered: true } : e
                ),
                stats: { ...t.stats, ...event.statsImpact },
              }
            : t
        ),
      };
    });
  },

  generateNewEvents: () => {
    set((state) => {
      const timeline = state.timelines.find((t) => t.id === state.activeTimelineId);
      if (!timeline) return state;

      const newEvents = Array.from({ length: 3 }, () =>
        generateRandomEvent(timeline.currentYear, timeline.stats)
      );

      return {
        timelines: state.timelines.map((t) =>
          t.id === state.activeTimelineId
            ? {
                ...t,
                events: [...t.events, ...newEvents],
              }
            : t
        ),
      };
    });
  },

  advanceTime: (deltaTime: number) => {
    set((state) => {
      if (!state.isRunning) return state;

      const timeline = state.timelines.find((t) => t.id === state.activeTimelineId);
      if (!timeline) return state;

      const advancedTime = state.gameTime + deltaTime * state.timeMultiplier;
      const yearAdvance = Math.floor(advancedTime / 1000);
      const newYear = timeline.currentYear + yearAdvance;

      let updatedTimelines = state.timelines.map((t) =>
        t.id === state.activeTimelineId
          ? { ...t, currentYear: newYear }
          : t
      );

      // Trigger events based on year
      if (yearAdvance > 0) {
        updatedTimelines = updatedTimelines.map((t) =>
          t.id === state.activeTimelineId
            ? {
                ...t,
                events: t.events.map((e) =>
                  !e.triggered && e.year <= newYear
                    ? { ...e, triggered: true }
                    : e
                ),
              }
            : t
        );
      }

      return {
        gameTime: advancedTime % 1000,
        timelines: updatedTimelines,
      };
    });
  },

  saveGame: () => {
    const state = get();
    saveToLocalStorage(state);
  },

  loadGame: () => {
    const savedState = loadFromLocalStorage();
    if (savedState) {
      set(savedState);
    }
  },

  resetGame: () => {
    const initialTimeline = createInitialTimeline();
    set({
      timelines: [initialTimeline],
      activeTimelineId: initialTimeline.id,
      gameTime: 0,
      isRunning: false,
      timeMultiplier: 1,
    });
  },
}));

import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const useGameLoop = () => {
  const { advanceTime, isRunning } = useGameStore();

  useEffect(() => {
    if (!isRunning) return;

    let lastTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      advanceTime(deltaTime);
      requestAnimationFrame(gameLoop);
    };

    const frameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameId);
  }, [isRunning, advanceTime]);
};

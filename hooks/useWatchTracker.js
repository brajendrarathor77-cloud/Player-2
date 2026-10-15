import { useEffect, useRef } from 'react';

export function useWatchTracker({ videoKey, userId, batchId }) {
  const stats = useRef({
    watchedSeconds: 0,
    watchedMinutes: 0,
    xp: 0,
    playCount: 0
  });

  const lastSaveTime = useRef(Date.now());

  const saveStatsToServer = async () => {
    try {
      await fetch('/api/watch/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          videoKey,
          batchId,
          stats: stats.current
        })
      });
    } catch (err) {
      console.error('Failed to sync watch stats:', err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Logic for tracking if video is playing...
      stats.current.watchedSeconds += 1;
      stats.current.watchedMinutes = Math.floor(stats.current.watchedSeconds / 60);
      stats.current.xp = stats.current.watchedMinutes * 2; // 1 Min = 2 XP

      // Every 5 seconds, flush/save to server
      if (Date.now() - lastSaveTime.current >= 5000) {
        saveStatsToServer();
        lastSaveTime.current = Date.now();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [videoKey]);

  return stats.current;
}

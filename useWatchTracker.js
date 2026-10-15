import { useEffect, useRef } from 'react';

export function useWatchTracker(videoRef, onStatsUpdate) {
  const stats = useRef({ watchedSeconds: 0, xp: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const interval = setInterval(() => {
      if (!video.paused && !video.ended) {
        stats.current.watchedSeconds += 1;
        const minutes = Math.floor(stats.current.watchedSeconds / 60);
        stats.current.xp = minutes * 2; // 1 Minute = 2 XP

        if (onStatsUpdate) {
          onStatsUpdate({ ...stats.current });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoRef]);
}

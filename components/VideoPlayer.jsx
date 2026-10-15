import React, { useRef, useState, useEffect } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ videoUrl, videoTitle, onOpenPanel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // HLS Setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (videoUrl.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else {
      video.src = videoUrl;
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-20 text-white">
        <h2 className="text-lg font-semibold">{videoTitle}</h2>
        <div className="flex gap-3">
          <button onClick={() => onOpenPanel('timeline')} className="bg-white/20 px-3 py-1 rounded-lg text-sm">Timeline</button>
          <button onClick={() => onOpenPanel('ai')} className="bg-indigo-600 px-3 py-1 rounded-lg text-sm">Ask AI</button>
          <button onClick={() => onOpenPanel('chat')} className="bg-white/20 px-3 py-1 rounded-lg text-sm">Live Chat</button>
        </div>
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-contain"
        onTimeUpdate={() => {
          const current = videoRef.current.currentTime;
          const duration = videoRef.current.duration;
          setProgress((current / duration) * 100);
        }}
        playsInline
      />

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2 z-20">
        {/* Progress Bar */}
        <div className="w-full bg-gray-600 h-1.5 rounded cursor-pointer">
          <div className="bg-indigo-500 h-full rounded" style={{ width: `${progress}%` }} />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center text-white">
          <button onClick={togglePlay} className="px-4 py-1.5 bg-indigo-600 rounded-md font-medium">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex gap-4 text-sm">
            <span>Speed: 1x</span>
            <span>Fullscreen</span>
          </div>
        </div>
      </div>
    </div>
  );
}

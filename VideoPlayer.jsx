import React, { useRef, useState, useEffect } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ videoUrl, videoTitle }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // HLS Stream Setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (videoUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
      }
    } else {
      video.src = videoUrl;
    }
  }, [videoUrl]);

  // Controls Logic
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const changeSpeed = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Title Bar */}
      <div style={{ color: '#fff', padding: '10px 15px', background: 'rgba(0,0,0,0.6)', position: 'absolute', top: 0, width: '100%', zIndex: 10 }}>
        <h4>{videoTitle || 'Video Player'}</h4>
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        style={{ width: '100%', display: 'block' }}
        playsInline
      />

      {/* Progress Bar */}
      <div style={{ height: '5px', background: '#444', width: '100%', cursor: 'pointer' }}>
        <div style={{ height: '100%', background: '#6366f1', width: `${progress}%` }} />
      </div>

      {/* Custom Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', background: '#111', color: '#fff' }}>
        <div>
          <button onClick={() => handleSeek(-10)} style={btnStyle}>-10s</button>
          <button onClick={togglePlay} style={btnStyle}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={() => handleSeek(10)} style={btnStyle}>+10s</button>
        </div>

        <div>
          <select onChange={(e) => changeSpeed(Number(e.target.value))} value={playbackRate} style={{ ...btnStyle, background: '#222' }}>
            <option value="0.5">0.5x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <button onClick={toggleFullscreen} style={btnStyle}>Fullscreen</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  background: '#333',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  marginRight: '8px',
  borderRadius: '6px',
  cursor: 'pointer'
};

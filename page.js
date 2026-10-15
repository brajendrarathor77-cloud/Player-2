import VideoPlayer from './VideoPlayer';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <VideoPlayer
        videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        videoTitle="Demo Lecture Video"
      />
    </div>
  );
}

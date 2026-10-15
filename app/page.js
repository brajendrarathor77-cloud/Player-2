'use client';
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import ChatPanel from '@/components/ChatPanel';
import AiChatPanel from '@/components/AiChatPanel';
import { useWatchTracker } from '@/hooks/useWatchTracker';

export default function PlayerPage() {
  const [activePanel, setActivePanel] = useState(null); // 'chat', 'ai', ya null

  // Watchtime & XP tracker hook
  useWatchTracker({ videoKey: 'regular:lect_123', batchId: 'batch_99' });

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row overflow-hidden">
      
      {/* Left / Center Section: Video Player */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <VideoPlayer 
            videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            videoTitle="Complete React.js Masterclass - Lecture 1"
            onOpenPanel={(panelName) => setActivePanel(panelName)}
          />
        </div>
      </div>

      {/* Right Section: Conditional Side Panel */}
      {activePanel === 'chat' && (
        <ChatPanel onClose={() => setActivePanel(null)} />
      )}

      {activePanel === 'ai' && (
        <AiChatPanel onClose={() => setActivePanel(null)} />
      )}

    </div>
  );
}

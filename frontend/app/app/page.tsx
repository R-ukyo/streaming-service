'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function Home() {
  const hlsVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = hlsVideoRef.current;
    const src = '/hls/stream.m3u8';

    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else {
      console.error('This browser does not support HLS.');
      // Optional: Display a message to the user
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 py-10 font-sans dark:bg-black text-black dark:text-white">
      <h1 className="mb-8 text-3xl font-bold">HLS Streaming Service</h1>

      <div className="mb-12 w-full max-w-3xl px-4">
        <h2 className="mb-4 text-2xl font-semibold">HLS Streaming Prototype</h2>
        <video
          ref={hlsVideoRef}
          controls
          autoPlay
          muted
          className="w-full aspect-video bg-black rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function Home() {
  const hlsVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = hlsVideoRef.current;
    const src = "/hls/index-1.m3u8";

    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        }
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('ネットワークエラーが発生しました。再試行します...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('メディアエラーが発生しました。復旧を試みます...');
              hls.recoverMediaError();
              break;
            default:
              console.error('致命的なエラーが発生しました。', data);
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    } else {
      console.error('このブラウザはHLSをサポートしていません。');
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-10 font-sans text-white">
      <h1 className="mb-8 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300">
        King of Live
      </h1>

      <div className="mb-12 w-full max-w-4xl px-4">
        <h2 className="mb-4 text-2xl font-semibold">ライブ配信</h2>
        <video
          ref={hlsVideoRef}
          controls
          autoPlay
          muted
          className="w-full aspect-video bg-black rounded-xl shadow-2xl ring-4 ring-purple-500/50"
        />
        <p className="mt-4 text-sm text-purple-200">
          GCP Livestream API経由でHLS配信中
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
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
            });
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.ERROR, (_event, data) => {
                if (data.fatal) {
                    console.warn("HLS Error", data);
                }
            });

            return () => {
                hls.destroy();
            };
        }
    }, []);

    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video shadow-[0_0_20px_rgba(255,215,0,0.1)] group">
            <video
                ref={hlsVideoRef}
                controls
                autoPlay
                muted
                className="h-full w-full object-contain"
                poster="https://placehold.co/1920x1080/1a1a1a/FFD700?text=Live+Stream"
            />
        </div>
    );
}

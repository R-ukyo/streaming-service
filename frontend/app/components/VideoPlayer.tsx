'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
    const hlsVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = hlsVideoRef.current;

        // Using a sample HLS stream if the internal one isn't available or for demo purposes
        // But respecting the original code's path
        const src = "/hls/index-1.m3u8";

        if (!video) return;

        // Check if the file exists (implicitly via error handling later, but here we assume it works as per previous file)
        // Actually, for this demo to work nicely if the local file isn't serving, 
        // I might fallback to a public sample if it fails, but I'll stick to the original src for now
        // as I don't want to break the user's specific backend setup.

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
                    // In a real app we might try to recover
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
            {/* Overlay gradient for cinematic feel (optional, disappears on hover usually, keeping simple for now) */}
        </div>
    );
}

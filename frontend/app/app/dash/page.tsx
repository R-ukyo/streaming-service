'use client';

import { useEffect, useRef } from 'react';
import * as dashjs from 'dashjs';

export default function DashPage() {
    const dashVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = dashVideoRef.current;
        const src = '/dash/stream.mpd';

        if (!video) return;

        const player = dashjs.MediaPlayer().create();
        player.initialize(video, src, true);

        return () => {
            player.reset();
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 py-10 font-sans dark:bg-black text-black dark:text-white">
            <h1 className="mb-8 text-3xl font-bold">DASH Streaming Service</h1>

            <div className="w-full max-w-3xl px-4">
                <h2 className="mb-4 text-2xl font-semibold">DASH Streaming Prototype</h2>
                <video
                    ref={dashVideoRef}
                    controls
                    autoPlay
                    muted
                    className="w-full aspect-video bg-black rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}

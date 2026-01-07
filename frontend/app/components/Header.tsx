'use client';

import Link from 'next/link';
import UserAvatar from './UserAvatar';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-surface px-4 shadow-[0_1px_0_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-4">
                {/* Hamburger Menu Icon (Dummy) */}
                <button className="p-2 text-white hover:bg-surface-hover rounded-full">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 group">
                    <div className="relative flex h-7 w-10 items-center justify-center rounded-lg bg-primary text-black font-bold group-hover:bg-primary-hover transition-colors">
                        ▶
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">
                        King of <span className="text-primary">Live</span>
                    </span>
                </Link>
            </div>

            {/* Search Bar (Dummy) */}
            <div className="hidden max-w-xl flex-1 items-center px-4 sm:flex">
                <div className="flex w-full items-center overflow-hidden rounded-full border border-border bg-[#121212]">
                    <input
                        type="text"
                        placeholder="検索"
                        className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none"
                    />
                    <button className="flex h-10 w-16 items-center justify-center bg-secondary border-l border-border hover:bg-secondary-hover">
                        <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                {/* Voice Search (Dummy) */}
                <button className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface hover:bg-surface-hover">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
                <button className="p-2 text-white hover:bg-surface-hover rounded-full hidden sm:block">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
                <button className="p-2 text-white hover:bg-surface-hover rounded-full">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <UserAvatar name="Admin" size="8" />
            </div>
        </header>
    );
}


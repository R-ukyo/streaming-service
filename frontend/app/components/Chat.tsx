"use client";

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
    user: string;
    text: string;
    timestamp: number;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [currentUser, setCurrentUser] = useState<string>('Guest');
    const [socket, setSocket] = useState<Socket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newSocket = io({
            path: '/chat-socket/',
        });

        setSocket(newSocket);

        newSocket.on('assign id', (id: string) => {
            setCurrentUser(id);
        });
        newSocket.on('chat history', (history: Message[]) => {
            setMessages(history);
        });

        newSocket.on('chat message', (msg: Message) => {
            setMessages((prev: Message[]) => [...prev, msg]);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && socket) {
            const msg: Partial<Message> = {
                text: input,
            };
            socket.emit('chat message', msg);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[500px] lg:h-[calc(100vh-140px)] bg-[#0f0f0f] border border-neutral-800 rounded-xl overflow-hidden w-full shadow-2xl">
            <div className="p-4 border-b border-neutral-800 bg-[#1e1e1e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <h2 className="text-white font-bold text-sm tracking-wide">ライブチャット</h2>
                </div>
                <span className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-1 rounded-full border border-neutral-700">
                    ID: {currentUser}
                </span>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth custom-scrollbar"
            >
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-2 opacity-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-xs">チャットへようこそ！</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className="flex gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-neutral-400 border border-neutral-700">
                            {msg.user.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                                <span className={`text-[11px] font-bold truncate ${msg.user === currentUser ? 'text-primary' : 'text-neutral-400'}`}>
                                    {msg.user}
                                </span>
                                <span className="text-[9px] text-neutral-600">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <span className="text-sm text-neutral-200 mt-0.5 break-words leading-relaxed">
                                {msg.text}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-[#1e1e1e] border-t border-neutral-800">
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="メッセージを送信..."
                            className="w-full bg-[#0f0f0f] text-white text-sm rounded-lg pl-3 pr-10 py-2.5 outline-none border border-transparent focus:border-primary/50 transition-all placeholder:text-neutral-600"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-end border-t border-neutral-800 pt-3">
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-primary hover:bg-primary-hover disabled:bg-neutral-800 disabled:text-neutral-600 text-black rounded-lg px-6 py-1.5 text-xs font-bold transition-all transform active:scale-95"
                        >
                            送信
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

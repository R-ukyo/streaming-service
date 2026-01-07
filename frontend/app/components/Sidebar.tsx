'use client';

export default function Sidebar() {
    const items = [
        { label: 'ホーム', icon: '🏠', active: true },
        { label: 'ショート', icon: '⚡' },
        { label: '登録チャンネル', icon: '📺' },
        { label: 'YouTube Music', icon: '🎵' },
    ];

    const libraryItems = [
        { label: '履歴', icon: '↺' },
        { label: '動画', icon: '▶' },
        { label: '後で見る', icon: '🕒' },
    ];

    return (
        <aside className="fixed left-0 top-14 hidden h-[calc(100vh-3.5rem)] w-16 flex-col items-center gap-2 bg-background py-4 sm:flex lg:w-60 lg:items-stretch lg:px-3 hover:overflow-y-auto custom-scrollbar">
            <div className="flex w-full flex-col gap-1">
                {items.map((item) => (
                    <button
                        key={item.label}
                        className={`flex w-full flex-col items-center gap-1 rounded-lg p-2 transition-colors lg:flex-row lg:gap-4 lg:px-4 lg:py-3 ${item.active
                                ? 'bg-secondary text-white'
                                : 'text-white hover:bg-secondary-hover'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className={`text-[10px] lg:text-sm ${item.active ? 'font-medium' : ''}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="hidden lg:block">
                <div className="my-3 h-[1px] bg-border mx-2" />
                <h3 className="px-4 py-2 text-base font-bold text-white">ライブラリ</h3>
                <div className="flex w-full flex-col gap-1">
                    {libraryItems.map((item) => (
                        <button
                            key={item.label}
                            className="flex w-full flex-row gap-4 items-center rounded-lg px-4 py-3 text-white hover:bg-secondary-hover transition-colors"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="my-3 h-[1px] bg-border mx-2" />
                <div className="px-4 py-2">
                    <p className="text-sm text-gray-400">ログインすると、コメントやお気に入りの動画が表示されます。</p>
                    <button className="mt-3 flex items-center gap-2 rounded-full border border-gray-600 px-4 py-1.5 text-sm md:text-blue-400 font-medium hover:bg-[#263850] hover:border-transparent text-primary hover:text-primary transition-colors">
                        <span className="text-lg">👤</span> ログイン
                    </button>
                </div>
            </div>
        </aside>
    );
}

import UserAvatar from './UserAvatar';

export default function Chat() {
    const messages = [
        { user: 'User A', color: 'text-blue-400', message: 'こんにちは！' },
        { user: 'User B', color: 'text-green-400', message: '待機所から来ました' },
        { user: 'Tanaka', color: 'text-orange-400', message: 'はじまったー！' },
        { user: 'Suzuki', color: 'text-purple-400', message: '画質いいね' },
        { user: 'DevKing', color: 'text-red-400', message: 'AIすごいな' },
        { user: 'ReactFan', color: 'text-cyan-400', message: 'Next.js?' },
        { user: 'Guest', color: 'text-gray-400', message: 'こんばんは' },
        { user: 'User A', color: 'text-blue-400', message: '音声クリアです' },
        { user: 'User B', color: 'text-green-400', message: 'wkwk' },
        { user: 'SuperChatter', color: 'text-yellow-400', message: '¥500 ナイス配信！', isSuperChat: true },
        { user: 'Tanaka', color: 'text-orange-400', message: 'おー' },
        { user: 'Suzuki', color: 'text-purple-400', message: '88888888' },
    ];

    return (
        <div className="flex h-full w-full flex-col rounded-xl border border-border bg-surface lg:h-[calc(100vh-6rem)] lg:w-[350px] xl:w-[400px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="text-base font-medium text-white">上位チャット</h3>
                <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-white">︙</button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar flex flex-col gap-2">
                <div className="rounded bg-yellow-900/30 p-2 text-xs text-yellow-200 text-center mb-2 border border-yellow-700/50">
                    ライブ王へようこそ！マナーを守って楽しくチャットしましょう。
                </div>

                {messages.map((msg, i) => (
                    <div key={i} className={`flex items-start gap-2 text-sm px-2 py-1 transition-colors hover:bg-white/5 ${msg.isSuperChat ? 'bg-primary/20 rounded border-l-4 border-primary' : ''}`}>
                        {!msg.isSuperChat && (
                            <UserAvatar name={msg.user} size="6" />
                        )}
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className={`font-medium ${msg.color} text-[11px]`}>{msg.user}</span>
                                {msg.isSuperChat && <span className="text-xs font-bold text-white">¥500</span>}
                            </div>
                            <span className={`${msg.isSuperChat ? 'text-white font-medium' : 'text-gray-200'} text-xs leading-relaxed`}>
                                {msg.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-3">
                <div className="flex items-center gap-2 mb-2">
                    <UserAvatar name="King" size="6" />
                    <span className="text-xs text-gray-400">King of Liveとしてチャット</span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="チャットする..."
                        className="w-full rounded-full bg-secondary px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary placeholder-gray-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                        Example
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-xs text-gray-500">0/200</span>
                    <button className="text-primary hover:text-primary-hover">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

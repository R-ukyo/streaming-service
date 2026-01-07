'use client';

import UserAvatar from './UserAvatar';

export default function Comments() {
    const comments = [
        { user: 'TechEnthusiast', time: '1時間前', content: '黄色と黒の配色、サイバーパンク感があってすごく良いですね！没入感があります。', likes: 120 },
        { user: 'CodeMaster', time: '3時間前', content: 'HLS配信の遅延が少なくて驚きました。設定どんな感じですか？', likes: 45 },
        { user: 'BeginnerDev', time: '5時間前', content: '勉強になります。アーカイブ残りますか？', likes: 210 },
        { user: 'DesignPro', time: '半日前', content: 'UIの改善案ですが、チャット欄の文字サイズをもう少し大きくてもいいかも。', likes: 8 },
        { user: 'AI_Lover', time: '1日前', content: 'AIエージェントの挙動が気になります。', likes: 89 },
        { user: 'Anonymous', time: '1日前', content: 'うぽつ', likes: 2 },
    ];

    return (
        <div className="mt-6 w-full max-w-4xl">
            <div className="mb-6 flex items-center gap-8">
                <h3 className="text-xl font-bold text-white">コメント 1,234件</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-white cursor-pointer hover:text-gray-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    並べ替え
                </div>
            </div>

            {/* Comment Input */}
            <div className="mb-8 flex gap-4">
                <UserAvatar name="Admin" />
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="コメントを追加..."
                        className="w-full border-b border-gray-600 bg-transparent py-2 text-white outline-none focus:border-white transition-colors"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                        <button className="rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-surface-hover">キャンセル</button>
                        <button className="rounded-full bg-primary/50 px-4 py-2 text-sm font-medium text-black hover:bg-primary disabled:cursor-not-allowed">コメント</button>
                    </div>
                </div>
            </div>

            {/* Comment List */}
            <div className="flex flex-col gap-6">
                {comments.map((comment, i) => (
                    <div key={i} className="flex gap-4 group">
                        <UserAvatar name={comment.user} />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-bold text-white hover:text-primary transition-colors cursor-pointer">{comment.user}</span>
                                <span className="text-gray-400">{comment.time}</span>
                            </div>
                            <p className="text-sm text-white leading-relaxed">{comment.content}</p>
                            <div className="flex items-center gap-4 mt-1">
                                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white rounded-full p-1 hover:bg-surface-hover transition-all">
                                    <span className="text-base">👍</span> {comment.likes}
                                </button>
                                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white rounded-full p-1 hover:bg-surface-hover transition-all">
                                    <span className="text-base">👎</span>
                                </button>
                                <button className="text-xs font-medium text-gray-400 hover:text-white rounded-full px-3 py-1 hover:bg-surface-hover transition-all">
                                    返信
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


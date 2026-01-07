import UserAvatar from './UserAvatar';

export default function VideoInfo() {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <h1 className="text-xl font-bold text-white md:text-2xl line-clamp-2">
                AIエージェントとペアプログラミングしてみた - 完全自動化への第一歩！？ 【ライブ配信】
            </h1>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Channel Info */}
                <div className="flex items-center gap-3">
                    <UserAvatar name="Live King" size="10" isVerified={true} />
                    <div className="flex flex-col">
                        <a href="#" className="font-bold text-white hover:text-gray-300">
                            ライブ王
                            <span className="ml-1 text-[10px] text-gray-400">✓</span>
                        </a>
                        <span className="text-xs text-gray-400">チャンネル登録者数 100万人</span>
                    </div>
                    <button className="ml-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors">
                        チャンネル登録
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <div className="flex items-center rounded-full bg-secondary">
                        <button className="flex items-center gap-2 border-r border-border px-4 py-2 hover:bg-secondary-hover rounded-l-full transition-colors">
                            <span className="text-lg">👍</span>
                            <span className="text-sm font-medium text-white">1.2万</span>
                        </button>
                        <button className="px-4 py-2 hover:bg-secondary-hover rounded-r-full transition-colors">
                            <span className="text-lg">👎</span>
                        </button>
                    </div>

                    <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 hover:bg-secondary-hover transition-colors whitespace-nowrap">
                        <span className="text-lg">↪️</span>
                        <span className="text-sm font-medium text-white">共有</span>
                    </button>

                    <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 hover:bg-secondary-hover transition-colors whitespace-nowrap">
                        <span className="text-lg">⬇️</span>
                        <span className="text-sm font-medium text-white">オフライン</span>
                    </button>

                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary hover:bg-secondary-hover transition-colors">
                        ...
                    </button>
                </div>
            </div>

            {/* Description Box */}
            <div className="rounded-xl bg-secondary p-3 text-sm text-white hover:bg-secondary-hover transition-colors cursor-pointer">
                <div className="flex gap-2 font-bold mb-1">
                    <span>2024/01/01 にライブ配信開始</span>
                    <span>#AI #Programming #Tech</span>
                </div>
                <p>
                    今回はGoogle DeepMindの最新AIエージェントを使って、Webアプリケーションをゼロから構築していきます！
                    果たしてAIは意図した通りに動くのか...？
                    <br /><br />
                    ▼チャプター<br />
                    00:00 配信開始<br />
                    05:30 AIエージェント起動<br />
                    ...もっと見る
                </p>
            </div>
        </div>
    );
}

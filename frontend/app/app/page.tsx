'use client';

import VideoPlayer from '../components/VideoPlayer';
import VideoInfo from '../components/VideoInfo';
import Chat from '../components/Chat';
import Comments from '../components/Comments';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8 justify-center">
      {/* Main Content: Video + Info + Comments */}
      <div className="flex w-full flex-1 flex-col max-w-[1280px]">
        <VideoPlayer />
        <VideoInfo />
        <Comments />
      </div>

      {/* Sidebar: Chat (Desktop) or Recommendations */}
      <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 sticky lg:top-8 self-start">
        <Chat />

        {/* Recommended Videos (Dummy List below chat for now roughly) */}
        <div className="mt-6 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2 cursor-pointer group">
              <div className="w-40 aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold group-hover:text-primary transition-colors">
                  Thumbnail
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-primary transition-colors">
                  おすすめ動画タイトル {i}
                </h4>
                <span className="text-xs text-gray-400">チャンネル名</span>
                <span className="text-xs text-gray-400">10万回視聴 • 2日前</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

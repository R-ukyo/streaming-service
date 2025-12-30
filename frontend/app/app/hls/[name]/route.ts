import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const storage = new Storage();

function guessContentType(name: string): string {
    if (name.endsWith(".m3u8")) return "application/vnd.apple.mpegurl";
    if (name.endsWith(".ts")) return "video/mp2t";
    if (name.endsWith(".m4s")) return "video/iso.segment";
    if (name.endsWith(".mp4")) return "video/mp4";
    return "application/octet-stream";
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    const bucketName = process.env.HLS_BUCKET;
    const prefix = process.env.HLS_PREFIX ?? "mux_video_ts";

    if (!bucketName) {
        console.error("HLS_BUCKET環境変数が設定されていません");
        return new NextResponse("Server configuration error: HLS_BUCKET not set", {
            status: 500
        });
    }

    const { name } = await params;
    const fileName = decodeURIComponent(name);
    const objectPath = `${prefix}/${fileName}`;

    console.log(`HLS Request: ${fileName} -> gs://${bucketName}/${objectPath}`);

    try {
        const [buf] = await storage.bucket(bucketName).file(objectPath).download();

        // マニフェストファイル（.m3u8）の場合、相対パスを書き換える
        if (fileName.endsWith(".m3u8")) {
            const content = buf.toString("utf-8");
            // セグメントファイルのパスを /hls/ 経由に書き換え
            const rewrittenContent = content.replace(
                /^(?!#|http|\/hls\/)(.+\.(?:ts|m4s|mp4|m3u8))$/gm,
                "/hls/$1"
            );
            console.log(`Manifest file processed: ${fileName}`);

            return new NextResponse(rewrittenContent, {
                headers: {
                    "content-type": guessContentType(fileName),
                    "cache-control": "no-cache, no-store, must-revalidate",
                    "pragma": "no-cache",
                    "expires": "0",
                },
            });
        }

        // セグメントファイル（.ts, .m4s, .mp4など）
        return new NextResponse(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength), {
            headers: {
                "content-type": guessContentType(fileName),
                "cache-control": "no-cache, no-store, must-revalidate",
                "pragma": "no-cache",
                "expires": "0",
            },
        });
    } catch (e: any) {
        console.error(`Failed to fetch ${objectPath}:`, e.message);
        return new NextResponse(`Not Found: ${fileName}`, { status: 404 });
    }
}

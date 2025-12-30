# 環境変数設定

## GCP認証

本アプリケーションは GCP Livestream API で生成された HLS ストリームを配信します。

### 必要な環境変数

`.env.local` ファイルを作成して以下の変数を設定してください：

```env
HLS_BUCKET=your-livestream-output-bucket
HLS_PREFIX=mux_video_ts
```

- `HLS_BUCKET`: GCP Livestream API の出力先バケット名
- `HLS_PREFIX`: GCS 内のプレフィックス（Livestream API で設定したパス）

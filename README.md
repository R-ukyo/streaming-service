# ストリーミングサービス

GCP Livestream API を使用した HLS ライブストリーミングサービス

## アーキテクチャ

このプロジェクトは **GCP Livestream API** を使用してライブストリームを配信します。

- **配信プロトコル**: HLS のみ（MPEG-DASH は使用しません）
- **エンコーディング**: GCP Livestream API がクラウド上で実行
- **ストレージ**: Google Cloud Storage (GCS) にセグメントファイルを保存
- **フロントエンド**: Next.js + hls.js
- **リバースプロキシ**: Nginx

## 構成

```
streaming-service/
├── frontend/          # Next.js アプリケーション
│   └── app/
│       ├── app/
│       │   ├── page.tsx           # メインページ（HLSプレーヤー）
│       │   └── hls/[name]/route.ts # GCSからHLSファイルを配信するAPIルート
│       └── package.json
├── nginx/             # Nginx設定（リバースプロキシ）
│   ├── Dockerfile
│   └── default.conf
├── gcloud-script/     # GCP Livestream API操作用スクリプト
└── docker-compose.yml
```

## セットアップ

### 1. GCP プロジェクトの準備

1. GCP プロジェクトを作成
2. 以下の API を有効化：
   - Live Stream API
   - Cloud Storage API
3. サービスアカウントを作成し、以下の権限を付与：
   - Storage Object Viewer
   - Live Stream Admin（必要に応じて）
4. サービスアカウントキー（JSON）をダウンロード

### 2. 環境変数の設定

`frontend/app/.env.local` ファイルを作成：

```env
HLS_BUCKET=your-livestream-output-bucket
HLS_PREFIX=mux_video_ts
```

- `HLS_BUCKET`: Livestream API の出力先バケット名
- `HLS_PREFIX`: GCS 内のプレフィックス（Livestream API で設定したパス）

### 3. GCP認証情報の配置

ダウンロードしたサービスアカウントキーを以下に配置：

```
frontend/app/service-account-key.json
```

> **注意**: このファイルは `.gitignore` に含まれています。本番環境では Workload Identity を使用してください。

### 4. マニフェストファイル名の確認

GCP Livestream API が生成するマニフェストファイル名を確認し、`frontend/app/app/page.tsx` の以下の行を更新：

```typescript
const src = "/hls/manifest.m3u8";  // または index.m3u8 など
```

## 起動方法

### 開発環境

```bash
# コンテナのビルドと起動
docker compose up --build

# ブラウザで http://localhost:8080 にアクセス
```

### 依存関係の更新

```bash
docker compose run --rm web pnpm install
```

## GCP Livestream API の使用

`gcloud-script/` ディレクトリ内のスクリプトを使用して、Livestream API のリソースを管理できます。

詳細は `gcloud-script/` 内のドキュメントを参照してください。

## 削除された機能

- ローカルエンコーダー（`encoder/`）: GCP Livestream API を使用するため不要
- MPEG-DASH サポート: HLS のみに統一

## トラブルシューティング

### 動画が再生されない

1. GCS バケットと HLS_PREFIX が正しく設定されているか確認
2. サービスアカウントに適切な権限があるか確認
3. ブラウザの開発者ツールでネットワークエラーを確認
4. マニフェストファイル名が正しいか確認

### 認証エラー

- `GOOGLE_APPLICATION_CREDENTIALS` が正しく設定されているか確認
- サービスアカウントキーのパスが正しいか確認

## 本番環境へのデプロイ

本番環境では以下を推奨します：

1. **Workload Identity** を使用した認証
2. **Cloud Run** または **GKE** へのデプロイ
3. **Cloud CDN** による配信の高速化
4. **Cloud Load Balancing** による負荷分散

## 参考リンク

- [GCP Livestream API ドキュメント](https://cloud.google.com/livestream/docs)
- [hls.js](https://github.com/video-dev/hls.js/)
- [Next.js](https://nextjs.org/)

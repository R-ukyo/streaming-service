# ストリーミングサービス

GCP Livestream API を使用した HLS ライブストリーミングサービス（チャット機能付き）

## デモ

https://github.com/user-attachments/assets/c785e5e2-3828-43fc-99a0-c2a3707debac

## アーキテクチャ

このプロジェクトは **GCP Livestream API** を使用してライブストリームを配信し、リアルタイムチャットを提供します。

- **配信プロトコル**: HLS (High Level Streaming)
- **エンコーディング**: GCP Livestream API
- **ストレージ**: Google Cloud Storage (GCS)
- **フロントエンド**: Next.js (hls.js を使用したプレーヤー)
- **ライブチャット**: Node.js + Socket.io (永続化機能付き)
- **リバースプロキシ**: Nginx (Next.js とチャットサーバーへのリクエストを振り分け)

## 構成

```
streaming-service/
├── frontend/          # Next.js プレーヤーアプリ
│   └── app/           # ソースコード
├── chat-server/       # Socket.io チャットサーバー
├── nginx/             # Nginx 設定（リバースプロキシ）
├── gcloud-script/     # GCP Livestream API 操作用スクリプト
│   └── livestream/    # ストリーム管理自動化スクリプト
└── README.md          # このファイル
```

## セットアップ

### 1. GCP プロジェクトの準備

1. GCP プロジェクトを作成
2. 以下の API を有効化：
   - Live Stream API
   - Cloud Storage API
3. サービスアカウントを作成し、以下の権限を付与：
   - `Storage Object Viewer` (フロントエンドでの再生用)
   - `Live Stream Admin` (管理スクリプト用)
4. サービスアカウントキー（JSON）をダウンロードし、以下のパス（例）に配置：
   - `frontend/app/service-account-key.json`
   - ※ 環境に合わせて `.env.local` の `GCS_KEY_FILE` を調整してください。

### 2. 環境変数の設定

`frontend/app/.env.local` を作成または編集します。

```env
HLS_BUCKET=your-output-bucket-name
HLS_PREFIX=mux_video_ts
```

- `HLS_BUCKET`: Livestream API の出力先 GCS バケット
- `HLS_PREFIX`: GCS 内のファイル格納パス

## 起動方法（ローカル開発環境）

```bash
# 全てのサービス（フロント、チャット、Nginx）を起動
docker compose up --build

# ブラウザでアクセス
# http://localhost:8080
```

## 配信の始め方

`gcloud-script/livestream/` にある自動化スクリプトを使用して配信環境を構築します。

### 1. ストリームの作成と開始

```bash
cd gcloud-script/livestream
bash start-all.sh
```

このスクリプトは以下の処理を順次実行します：
1. **インプットエンドポイントの作成**: 配信の入口となるエンドポイントを作成します。
2. **完了待機**: エンドポイントが利用可能になるまで待機します。
3. **チャンネルの作成**: エンコーディング設定を含むチャンネルを作成します。
4. **チャンネルの開始**: 配信可能な状態にします。

完了すると、**RTMP 配信先 URL** がコンソールに表示されます。

### 2. OBS の設定

1. OBS の「設定」>「配信」を開きます。
2. サービスを「カスタム」に設定します。
3. **サーバー**: `start-all.sh` で出力された URL の `live/` までの部分を入力します。
4. **ストリームキー**: `live/` 以降の部分（チャンネル名など）を入力します。

設定後、OBS で「配信開始」をクリックします。

### 3. 再生とチャット

1. ブラウザでフロントエンドにアクセスします。
2. 配信が開始された後、GCS にファイルが書き込まれるまでしばらく（数十秒）待つと、プレーヤーで再生が始まります。
3. 右側のチャット欄からメッセージを送信できます。

---

## デプロイ (CI/CD)

このプロジェクトには GitHub Actions が設定されており、`main` ブランチへのプッシュ時に以下の処理が自動で行われます：

1. Docker イメージのビルド
2. Google Cloud Artifact Registry へのプッシュ

**注意**: GitHub Actions では**ビルドとプッシュまでしか行われません**。Cloud Run へのデプロイ（最新イメージの反映）は、以下のコマンド等を使用して**手動で行う必要があります**。

```bash
# 例: フロントエンドのデプロイ
gcloud run deploy [SERVICE_NAME] \
  --image [IMAGE_URL] \
  --region asia-northeast1
```

---

## 配信の終わり方

GCP のリソースを放置すると課金が続くため、終了後は必ず以下のスクリプトを実行してリソースを削除してください。

```bash
cd gcloud-script/livestream
bash stop-all.sh
```

このスクリプトにより、チャンネルの停止・削除およびインプットエンドポイントの削除が行われます。

---

## トラブルシューティング

### 動画が再生されない
- `frontend/app/app/page.tsx` で指定しているマニフェストファイル名（`manifest.m3u8` など）が、GCS 上に実際に生成されているものと一致しているか確認してください。
- GCS バケットの公開設定、またはサービスアカウントの権限を確認してください。

### チャットが接続できない
- 各サービス（Frontend, Chat Server, Nginx）が正しく起動しているか確認してください。
- リバースプロキシの設定（`nginx/default.conf`）が正しいポートを指しているか確認してください。

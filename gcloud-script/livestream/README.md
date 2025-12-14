## HLSライブストリームの始め方

### 1. インプットエンドポイント作成

```bash
cd input-endpoint
bash create.sh
```

このときの出力の"name"の末尾がOPERATION_IDなので、これを控えておく。

### 2. 配信URL取得

```bash
bash get.sh ${OPERATION_ID}
```

このときの出力の"response.uri"が配信URLなので、これを控えておく。

### 3. チャンネル作成

```bash
cd ../channel
bash create.sh
```

### 4. チャンネル開始

```bash
bash start.sh
```

### OBSで配信開始

OBS → 設定 → 配信

サービス：カスタム
サーバー：配信URLのliveまでの部分（例：rtmp://127.0.0.1/live）
ストリームキー：配信URLのlive以降の部分

## HLSライブストリームの終わり方

### 1. チャンネル停止

```bash
cd channel
bash stop.sh
```

### 2. チャンネル削除

```bash
bash delete.sh
```

### 3. インプットエンドポイント削除

```bash
cd ../input-endpoint
bash delete.sh
```

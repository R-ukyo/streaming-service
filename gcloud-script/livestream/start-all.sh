#!/bin/bash

# .envを読み込み
set -a
source "$(dirname "$0")/.env"
set +a

echo "1. インプットエンドポイントを作成しています..."
CREATE_RESPONSE=$(cd input-endpoint && bash create.sh)
OPERATION_ID=$(echo "$CREATE_RESPONSE" | grep -o "operations/[^\"]*" | sed 's/operations\///')

if [ -z "$OPERATION_ID" ]; then
    echo "エラー: Operation IDの取得に失敗しました。以下のレスポンスを確認してください。"
    echo "$CREATE_RESPONSE"
    exit 1
fi

echo "Operation ID: $OPERATION_ID"
echo "インプットエンドポイントの作成完了を待機中..."

while true; do
    GET_RESPONSE=$(cd input-endpoint && bash get.sh "$OPERATION_ID")
    if echo "$GET_RESPONSE" | grep -q '"done": true'; then
        break
    fi
    echo -n "."
    sleep 5
done
echo ""

# 配信URLを抽出
RTMP_URI=$(echo "$GET_RESPONSE" | grep -o "rtmp://[^\"]*")
echo "=========================================================="
echo "配信URL (OBSに設定してください):"
echo "$RTMP_URI"
echo "=========================================================="

echo "2. チャンネルを作成しています..."
(cd channel && bash create.sh)

echo "3. チャンネルを開始しています..."
(cd channel && bash start.sh)

echo "すべての処理が完了しました。"
echo "配信URLを使用してOBSで配信を開始してください。"

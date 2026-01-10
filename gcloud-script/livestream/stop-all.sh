#!/bin/bash

# .envを読み込み
source "$(dirname "$0")/.env"

echo "1. チャンネルを停止しています..."
(cd channel && bash stop.sh)

echo "2. チャンネルを削除しています..."
(cd channel && bash delete.sh)

echo "3. インプットエンドポイントを削除しています..."
(cd input-endpoint && bash delete.sh)

echo "すべてのリソースの削除が完了しました。"

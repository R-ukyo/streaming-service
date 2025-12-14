#!/bin/bash

source "$(dirname "$0")/../.env"

OPERATION_ID="$1"

if [ -z "$OPERATION_ID" ]; then
  echo "エラー: OPERATION_IDが指定されていません。"
  echo "使用方法: $0 <OPERATION_ID>"
  exit 1
fi

API_ENDPOINT="https://livestream.googleapis.com/v1/projects/${PROJECT_NUMBER}/locations/${LOCATION}/operations/${OPERATION_ID}"

curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     ${API_ENDPOINT}
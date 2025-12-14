#!/bin/bash

source "$(dirname "$0")/../.env"

API_ENDPOINT="https://livestream.googleapis.com/v1/projects/${PROJECT_NUMBER}/locations/${LOCATION}/channels/${CHANNEL_ID}:start"

curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "" \
     ${API_ENDPOINT}
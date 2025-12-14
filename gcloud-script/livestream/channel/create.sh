#!/bin/bash

set -a
source "$(dirname "$0")/../.env"
set +a

REQUEST_TEMPLATE="create-request.json.template"
API_ENDPOINT="https://livestream.googleapis.com/v1/projects/${PROJECT_NUMBER}/locations/${LOCATION}/channels?channelId=${CHANNEL_ID}"

envsubst < "${REQUEST_TEMPLATE}" | curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @- \
     ${API_ENDPOINT}
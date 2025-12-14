#!/bin/bash

source "$(dirname "$0")/../.env"
REQUEST_FILE="create-request.json"
API_ENDPOINT="https://livestream.googleapis.com/v1/projects/${PROJECT_NUMBER}/locations/${LOCATION}/inputs?inputId=${INPUT_ID}"

curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @${REQUEST_FILE} \
     ${API_ENDPOINT}
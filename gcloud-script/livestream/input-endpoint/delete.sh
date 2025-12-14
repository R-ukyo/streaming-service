#!/bin/bash

source "$(dirname "$0")/../.env"

API_ENDPOINT="https://livestream.googleapis.com/v1/projects/${PROJECT_NUMBER}/locations/${LOCATION}/inputs/${INPUT_ID}"

curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     ${API_ENDPOINT}
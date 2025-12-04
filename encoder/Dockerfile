FROM alpine:3.22.2

RUN apk add --no-cache ffmpeg bash

COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh

WORKDIR /workspace

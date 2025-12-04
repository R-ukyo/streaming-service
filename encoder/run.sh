#!/usr/bin/env bash
set -e

INPUT=${INPUT_FILE:-/input/input.mp4}
OUTPUT_DIR_HLS=/var/www/hls
OUTPUT_DIR_DASH=/var/www/dash

mkdir -p "$OUTPUT_DIR_HLS"
mkdir -p "$OUTPUT_DIR_DASH"

echo "Input file: $INPUT"
echo "Output dir: $OUTPUT_DIR_HLS"
echo "Output dir: $OUTPUT_DIR_DASH"

# HLS 生成
ffmpeg -hide_banner -loglevel info \
  -re \
  -i "$INPUT" \
  -c:v libx264 -preset veryfast -profile:v baseline -level 3.0 \
  -c:a aac -ar 48000 -b:a 128k \
  -f hls \
  -hls_time 4 \
  -hls_list_size 0 \
  -hls_segment_filename "$OUTPUT_DIR_HLS/segment_%03d.ts" \
  "$OUTPUT_DIR_HLS/stream.m3u8"

echo "HLS generation finished."

# DASH セグメント生成
ffmpeg -hide_banner -loglevel info \
  -re \
  -i "$INPUT" \
  -map 0:v -map 0:a \
  -b:v 2500k -b:a 128k \
  -use_template 1 -use_timeline 1 \
  -seg_duration 4 \
  -init_seg_name "init-\$RepresentationID\$.mp4" \
  -media_seg_name "chunk-\$RepresentationID\$-\$Number\$.m4s" \
  -f dash "$OUTPUT_DIR_DASH/stream.mpd"

echo "DASH generation done."

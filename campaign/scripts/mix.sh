#!/usr/bin/env bash
# Mezcla final: locución procesada + música, normalización a -14 LUFS (estándar redes sociales).
# Uso: mix.sh <video_dir> <salida.mp4> "<título>"
set -euo pipefail
d="$1"; out="$2"; title="$3"
ffmpeg -y -loglevel error -i "$d/video.mp4" -i "$d/vo.wav" -i "$d/music.wav" -filter_complex \
 "[1:a]highpass=f=75,equalizer=f=220:t=q:w=1.2:g=-2,equalizer=f=3200:t=q:w=1.4:g=2.5,acompressor=threshold=-20dB:ratio=3:attack=6:release=120:makeup=2,aresample=48000,pan=stereo|c0=c0|c1=c0[vo];\
  [2:a]volume=0.55[mu];\
  [vo][mu]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000[a]" \
 -map 0:v -map "[a]" -c:v libx264 -profile:v high -level 4.2 -preset slow -crf 18 -maxrate 14M -bufsize 28M \
 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 48000 -movflags +faststart \
 -metadata title="$title" -metadata artist="3 Vértices · Estudio de Arquitectura" -metadata comment="www.3vertices.cl" \
 -shortest "$out"

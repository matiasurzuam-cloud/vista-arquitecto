#!/usr/bin/env bash
# Produce los 4 videos de la campaña. Requiere: python3 (kokoro-onnx, soundfile, scipy, pillow),
# node + playwright (Chromium) y ffmpeg. Ver campaign/README.md.
# Uso: make.sh <work_dir> <voices_dir> <out_dir>
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"; repo="$(cd "$here/../.." && pwd)"
work="$1"; voices="$2"; out="$3"; mkdir -p "$work" "$out"
python3 "$here/build_audio.py" "$work" "$voices"
python3 "$here/prep_assets.py" "$repo" "$work/site"
for v in 01-presentacion 02-regularizacion 03-diseno-arquitectonico 04-impresion-profesional; do
  python3 "$here/music.py" "$work/$v"
done
for v in 01-presentacion 02-regularizacion 03-diseno-arquitectonico 04-impresion-profesional; do
  node "$here/render.cjs" "$work/site" "$work/$v" 30 &
done
wait
for v in 01-presentacion 02-regularizacion 03-diseno-arquitectonico 04-impresion-profesional; do
  title=$(python3 -c "import json;print(json.load(open('$work/$v/timeline.json'))['title'])")
  bash "$here/mix.sh" "$work/$v" "$out/3vertices-$v-9x16.mp4" "3 Vértices · $title"
  cp "$work/$v/subtitulos.srt" "$out/3vertices-$v.srt"
done
ls -la "$out"

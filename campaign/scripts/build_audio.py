"""
Genera locución (Kokoro TTS, español latinoamericano), línea de tiempo y subtítulos.

Uso: python3 build_audio.py <work_dir> <voices_dir>
Escribe en <work_dir>/<video>/: vo.wav, timeline.json, subtitulos.srt
"""
import json
import os
import re
import sys

import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

sys.path.insert(0, os.path.dirname(__file__))
from content import SAY, SITE, VIDEOS, WHATSAPP  # noqa: E402

SR = 48000
VOICE = "em_alex"
LANG = "es-419"  # fonética latinoamericana (seseo)
SPEED = 0.94
TR = {"tri": 0.75, "wipe": 0.6, "push": 0.6, "fade": 0.6, "cut": 0.0}

work, voices = sys.argv[1], sys.argv[2]

from kokoro_onnx import Kokoro  # noqa: E402

kokoro = Kokoro(os.path.join(voices, "kokoro-v1.0.onnx"), os.path.join(voices, "voices-v1.0.bin"))


def spoken(text):
    for a, b in SAY:
        text = text.replace(a, b)
    return text


def trim(a, thr=0.012, pad=0.03):
    idx = np.where(np.abs(a) > thr)[0]
    if len(idx) == 0:
        return a
    p = int(pad * 24000)
    return a[max(0, idx[0] - p): idx[-1] + p]


def tts(text):
    a, sr = kokoro.create(spoken(text), voice=VOICE, speed=SPEED, lang=LANG)
    a = trim(np.asarray(a, dtype=np.float32))
    a = resample_poly(a, SR, sr).astype(np.float32)
    return a


def sentences(text):
    # divide en oraciones conservando signos; no corta en "www.3vertices.cl"
    protected = text.replace(SITE, "§SITE§")
    parts = re.findall(r"[^.?!…]+[.?!…]*", protected)
    return [p.strip().replace("§SITE§", SITE) for p in parts if p.strip()]


def weight(w):
    return max(2, len(re.sub(r"[^\wáéíóúñü]", "", w, flags=re.I))) + (3 if re.search(r"[,.;:?!]$", w) else 0)


def chunk_words(words, maxc=30):
    chunks, cur = [], []
    for w in words:
        if cur and len(" ".join(cur + [w])) > maxc:
            chunks.append(cur)
            cur = []
        cur.append(w)
        if re.search(r"[,?!.]$", w) and len(" ".join(cur)) >= 12:
            chunks.append(cur)
            cur = []
    if cur:
        chunks.append(cur)
    # evita palabras huérfanas al final de una oración
    if len(chunks) > 1 and len(" ".join(chunks[-1])) < 10 and len(" ".join(chunks[-2] + chunks[-1])) <= 38:
        last = chunks.pop()
        chunks[-1] += last
    return chunks


def fmt(t):
    h, r = divmod(t, 3600)
    m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}".replace(".", ",")


for vid, spec in VIDEOS.items():
    out = os.path.join(work, vid)
    os.makedirs(out, exist_ok=True)
    t = 0.0
    scenes, subs, vo_segments = [], [], []
    for i, sc in enumerate(spec["scenes"]):
        sc = dict(sc)
        trans = sc.get("trans", "fade") if i else "cut"
        tr = TR[trans]
        delay = sc.get("voDelay", 0.35 if tr else 0.15)
        cursor = t + delay
        if sc.get("vo"):
            for sent in sentences(sc["vo"]):
                a = tts(sent)
                d = len(a) / SR
                vo_segments.append({"t": cursor, "file": None, "audio": a})
                words = sent.split()
                ws = [weight(w) for w in words]
                tot = float(sum(ws))
                acc = 0.0
                wt = []
                for w, wgt in zip(words, ws):
                    wt.append([w, cursor + d * acc / tot, cursor + d * (acc + wgt) / tot])
                    acc += wgt
                k = 0
                for ch in chunk_words(words):
                    cw = wt[k:k + len(ch)]
                    k += len(ch)
                    subs.append({"t0": cw[0][1], "t1": cw[-1][2],
                                 "words": [{"w": w, "t0": a0, "t1": a1} for w, a0, a1 in cw]})
                cursor += d + 0.28
            cursor -= 0.28
        vo_end = cursor
        dur = max(sc.get("min", 3.6), vo_end - t + sc.get("tail", 0.6))
        sc.update({"start": round(t, 3), "dur": round(dur, 3), "trans": trans, "tr": tr,
                   "voStart": round(t + delay, 3), "voEnd": round(vo_end, 3)})
        scenes.append(sc)
        t += dur
    total = round(t, 3)
    # extiende el fin de cada subtítulo hasta el siguiente (máx 0.5 s) para lectura cómoda
    for a, b in zip(subs, subs[1:] + [None]):
        a["t1"] = min(a["t1"] + 0.5, b["t0"] - 0.02) if b else min(a["t1"] + 0.6, total)

    track = np.zeros(int((total + 0.5) * SR), dtype=np.float32)
    for seg in vo_segments:
        s = int(seg["t"] * SR)
        track[s:s + len(seg["audio"])] += seg["audio"]
    peak = np.max(np.abs(track)) or 1
    track = track / peak * 0.89
    sf.write(os.path.join(out, "vo.wav"), track, SR)

    timeline = {"id": vid, "title": spec["title"], "tag": spec["tag"], "music": spec["music"],
                "duration": total, "site": SITE, "whatsapp": WHATSAPP,
                "scenes": scenes, "subs": subs,
                "vo": [[round(s["t"], 3), round(s["t"] + len(s["audio"]) / SR, 3)] for s in vo_segments]}
    with open(os.path.join(out, "timeline.json"), "w") as f:
        json.dump(timeline, f, ensure_ascii=False, indent=1)
    with open(os.path.join(out, "subtitulos.srt"), "w") as f:
        for n, s in enumerate(subs, 1):
            f.write(f"{n}\n{fmt(s['t0'])} --> {fmt(s['t1'])}\n{' '.join(w['w'] for w in s['words'])}\n\n")
    print(vid, f"{total:.1f}s", len(scenes), "escenas", len(subs), "subtítulos")

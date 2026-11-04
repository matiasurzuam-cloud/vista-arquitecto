"""
Música instrumental corporativa ORIGINAL, sintetizada por código (sin muestras de
terceros), más efectos de transición. Al ser composición propia generada para la
campaña, puede usarse en publicidad sin licencias de terceros.

Uso: python3 music.py <work_dir>/<video>   (lee timeline.json, escribe music.wav)
"""
import json
import os
import sys

import numpy as np
import soundfile as sf
from scipy.signal import butter, fftconvolve, sosfilt

SR = 48000
rng = np.random.default_rng(7)

STYLES = {
    # bpm, acordes (MIDI, una lista por compás), patrón
    "presentacion": dict(bpm=100, root=50, chords=[[50, 57, 62, 66, 69], [45, 57, 61, 64, 69],
                                                    [47, 54, 59, 62, 66], [43, 55, 59, 62, 67]],
                         arp="8", drums="pop", bright=0.9),
    "regularizacion": dict(bpm=92, root=45, chords=[[45, 57, 60, 64, 69], [41, 57, 60, 65, 69],
                                                     [48, 55, 60, 64, 67], [43, 55, 59, 62, 67]],
                           arp="4", drums="soft", bright=0.7),
    "diseno": dict(bpm=76, root=48, chords=[[48, 55, 59, 64, 67], [45, 55, 60, 64, 67],
                                             [41, 57, 60, 64, 69], [43, 55, 59, 62, 69]],
                   arp="piano", drums="cine", bright=0.8),
    "impresion": dict(bpm=112, root=40, chords=[[40, 55, 59, 64, 67], [36, 55, 60, 64, 67],
                                                 [43, 55, 59, 62, 67], [38, 54, 57, 62, 66]],
                      arp="16", drums="tech", bright=1.0),
}


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na:
        e[:na] = np.linspace(0, 1, na) ** 1.5
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
    return e


def pad(freq, dur, bright):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros((n, 2))
    for ch, det in ((0, -0.0028), (1, 0.0031)):
        s = np.zeros(n)
        for h in range(1, 8):
            amp = (1 / h ** 1.6) * (bright if h > 2 else 1)
            vib = 0.0015 * np.sin(2 * np.pi * (0.21 + 0.05 * h) * t + h)
            s += amp * np.sin(2 * np.pi * freq * h * (1 + det + vib) * t + rng.random() * 6)
        out[:, ch] = s
    return out * env_adsr(n, min(1.4, dur * 0.4), min(1.6, dur * 0.5))[:, None]


def pluck(freq, dur, decay=4.0, bright=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for h in range(1, 9):
        s += (1 / h ** 1.3) * bright ** (h - 1) * np.exp(-t * (decay + h * 1.8)) * np.sin(2 * np.pi * freq * h * t)
    s *= env_adsr(n, 0.003, 0.05)
    return s


def piano(freq, dur=2.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for h in range(1, 10):
        fh = freq * h * np.sqrt(1 + 0.0004 * h * h)
        s += (1 / h ** 1.1) * np.exp(-t * (1.2 + h * 0.9)) * np.sin(2 * np.pi * fh * t)
    hammer = rng.standard_normal(n) * np.exp(-t * 300) * 0.05
    return (s + hammer) * env_adsr(n, 0.002, 0.3)


def bass(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(4 * np.pi * freq * t) + 0.08 * np.sin(6 * np.pi * freq * t)
    return s * env_adsr(n, 0.01, min(0.25, dur * 0.4)) * np.exp(-t * 1.2)


def kick(level=1.0):
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 46 + 95 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return level * np.sin(ph) * np.exp(-t * 7.5)


def noise_hit(n_sec, decay, lo=None, hi=None, level=1.0):
    n = int(n_sec * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    if lo and hi:
        x = sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)
    elif hi:
        x = sosfilt(butter(4, hi, "high", fs=SR, output="sos"), x)
    elif lo:
        x = sosfilt(butter(2, lo, "low", fs=SR, output="sos"), x)
    return level * x * np.exp(-t * decay)


def sweep_noise(dur, f0, f1, level=1.0, rev=False):
    """Ruido con filtro paso-banda que barre de f0 a f1 (whoosh / riser)."""
    n = int(dur * SR)
    x = rng.standard_normal(n)
    out = np.zeros(n)
    blk = 1024
    for i in range(0, n, blk):
        p = i / n
        fc = f0 * (f1 / f0) ** p
        sos = butter(2, [fc * 0.6, min(fc * 1.6, SR / 2 - 100)], "band", fs=SR, output="sos")
        seg = x[max(0, i - 2048): i + blk]
        out[i:i + blk] = sosfilt(sos, seg)[-len(out[i:i + blk]):]
    t = np.linspace(0, 1, n)
    e = np.sin(np.pi * t) ** 2 if not rev else t ** 2.5
    return level * out * e


def reverb(x, secs=2.6, decay=0.55, wet=0.28):
    n = int(secs * SR)
    t = np.arange(n) / SR
    out = np.zeros_like(x)
    for ch in range(2):
        ir = rng.standard_normal(n) * np.exp(-t / decay)
        ir = sosfilt(butter(1, 5200, "low", fs=SR, output="sos"), ir)
        ir /= np.sqrt(np.sum(ir ** 2))
        out[:, ch] = fftconvolve(x[:, ch], ir)[: len(x)]
    return x * (1 - wet) + out * wet * 1.6


def add(buf, sig, t, gain=1.0, pan=0.0):
    s = int(t * SR)
    if s >= len(buf):
        return
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l * 1.414, sig * r * 1.414], 1)
    e = min(len(buf), s + len(sig))
    buf[s:e] += sig[: e - s] * gain


def compose(tl):
    st = STYLES[tl["music"]]
    total = tl["duration"]
    n = int((total + 3) * SR)
    music = np.zeros((n, 2))
    drums = np.zeros((n, 2))
    sfx = np.zeros((n, 2))
    beat = 60 / st["bpm"]
    bar = 4 * beat
    scenes = tl["scenes"]
    cta = scenes[-1]["start"]
    # el ritmo entra en la segunda escena y se intensifica desde la mitad
    groove_in = scenes[1]["start"] if len(scenes) > 1 else 0
    full_in = scenes[len(scenes) // 2]["start"]
    nbars = int(np.ceil(cta / bar)) + 1
    for b in range(nbars):
        t0 = b * bar
        ch = st["chords"][b % len(st["chords"])]
        add(music, pad(mtof(ch[1]), bar + 1.4, st["bright"]), t0, 0.050)
        for m in ch[2:]:
            add(music, pad(mtof(m), bar + 1.4, st["bright"]), t0, 0.040)
        # bajo
        if t0 >= groove_in - 0.01:
            step = beat if st["drums"] != "tech" else beat / 2
            k = 0
            while k * step < bar - 1e-6:
                add(music, bass(mtof(ch[0] - 12 if ch[0] > 45 else ch[0]), step * 0.9), t0 + k * step, 0.16)
                k += 1
        # arpegio / melodía
        notes = ch[1:] + [ch[2] + 12]
        if st["arp"] == "piano":
            pattern = [0, 2, 3, 1, 4, 2]
            for i, p in enumerate(pattern):
                add(music, piano(mtof(notes[p] + 12)), t0 + i * bar / 6, 0.075, pan=0.3 * np.sin(i))
        else:
            div = {"4": 4, "8": 8, "16": 16}[st["arp"]]
            for i in range(div):
                p = [0, 2, 1, 3, 4, 2, 3, 1][i % 8]
                f = mtof(notes[p] + 12)
                g = 0.055 if div == 16 else 0.075
                if div == 16 and t0 < groove_in:
                    continue
                add(music, pluck(f, bar / div * 3, decay=5 if div > 4 else 2.5, bright=0.55), t0 + i * bar / div,
                    g, pan=0.45 * np.sin(i * 1.7))
        # percusión
        if t0 >= groove_in - 0.01 and st["drums"] != "cine":
            for q in range(4):
                tq = t0 + q * beat
                full = tq >= full_in
                if st["drums"] == "tech" or q in (0, 2) or full:
                    add(drums, kick(), tq, 0.34 if st["drums"] != "soft" else 0.24)
                if full and q in (1, 3) and st["drums"] in ("pop", "tech"):
                    add(drums, noise_hit(0.25, 22, 900, 5000), tq, 0.07)
                hats = 2 if st["drums"] != "tech" else 4
                if full or st["drums"] == "tech":
                    for h in range(hats):
                        add(drums, noise_hit(0.06, 60, hi=7500), tq + h * beat / hats, 0.035 if h else 0.05,
                            pan=0.3)
        if st["drums"] == "cine" and b % 2 == 0 and t0 >= groove_in:
            tom = noise_hit(1.2, 3, lo=180)
            tom[: len(kick())] += kick(0.6)
            add(drums, tom, t0, 0.25)
    # acorde final sostenido en el cierre
    final = st["chords"][0]
    for m in final[1:]:
        add(music, pad(mtof(m), total - cta + 2.5, st["bright"]), cta, 0.05)
    add(music, bass(mtof(final[0]), 4.0), cta, 0.2)
    if st["arp"] == "piano":
        for i, m in enumerate(final[1:]):
            add(music, piano(mtof(m + 12)), cta + 0.08 * i, 0.08)
    else:
        for i, m in enumerate(final[1:]):
            add(music, pluck(mtof(m + 12), 3.0, decay=1.5, bright=0.6), cta + 0.06 * i, 0.08, pan=(i - 2) * 0.25)
    # efectos: whoosh en transiciones, riser + impacto en el cierre
    for sc in scenes[1:]:
        if sc["trans"] == "cut":
            continue
        d = 0.9
        add(sfx, sweep_noise(d, 400, 6000, 0.22), sc["start"] - d * 0.45, 1.0, pan=-0.3)
    add(sfx, sweep_noise(1.6, 200, 8000, 0.2, rev=True), cta - 1.6, 1.0)
    boom = kick(1.0)
    boom = np.concatenate([boom, np.zeros(SR)]) + noise_hit(1.45, 4, lo=260, level=0.5)
    add(sfx, boom, cta + 0.05, 0.55)
    add(sfx, noise_hit(1.2, 5, hi=6000, level=0.35), cta + 0.05, 0.25)
    # bus
    music = reverb(music)
    sfx = reverb(sfx, wet=0.35)
    mix = music + drums * 0.9
    # fade-in inicial breve y fade-out final
    t = np.arange(n) / SR
    mix *= np.clip(t / 0.3, 0, 1)[:, None]
    fo = np.clip((total - t) / 1.4, 0, 1) ** 1.5
    mix *= fo[:, None]
    sfx *= np.clip((total - t) / 0.6, 0, 1)[:, None]
    # ducking bajo la locución
    duck = np.ones(n)
    for a, b in tl["vo"]:
        duck[int((a - 0.15) * SR): int((b + 0.25) * SR)] = 0.38
    k = int(0.22 * SR)
    duck = np.convolve(duck, np.ones(k) / k, mode="same")
    mix *= duck[:, None]
    out = mix + sfx
    out = out[: int(total * SR)]
    out /= np.max(np.abs(out)) + 1e-9
    return out * 0.7


if __name__ == "__main__":
    d = sys.argv[1]
    tl = json.load(open(os.path.join(d, "timeline.json")))
    sf.write(os.path.join(d, "music.wav"), compose(tl).astype(np.float32), SR)
    print("music", d)

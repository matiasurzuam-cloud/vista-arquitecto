"""Prepara imágenes (redimensionadas + versiones desenfocadas), fuentes y player en <site_dir>.
Uso: python3 prep_assets.py <repo_root> <site_dir>"""
import os, shutil, sys
from PIL import Image, ImageFilter, ImageOps

sys.path.insert(0, os.path.dirname(__file__))
from content import VIDEOS

repo, site = sys.argv[1], sys.argv[2]
src_assets = os.path.join(repo, "src", "assets")
used = {"logo/logo-3-vertices.png"}
for v in VIDEOS.values():
    for s in v["scenes"]:
        for k in ("img", "plan", "render"):
            if s.get(k):
                used.add(s[k])
        used.update(s.get("imgs", []))
for rel in sorted(used):
    src, dst = os.path.join(src_assets, rel), os.path.join(site, "assets", rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = ImageOps.exif_transpose(Image.open(src))
    if rel.endswith(".png") and im.mode == "RGBA" and "logo" in rel:
        im.thumbnail((600, 600), Image.LANCZOS); im.save(dst); continue
    im = im.convert("RGB")
    im.thumbnail((2600, 2600), Image.LANCZOS)
    im.save(dst, "JPEG" if not rel.endswith(".png") else "PNG", **({"quality": 92} if not rel.endswith(".png") else {}))
    b = ImageOps.fit(im, (540, 960), Image.LANCZOS).filter(ImageFilter.GaussianBlur(28))
    b.save(os.path.splitext(dst)[0] + ".blur.jpg", quality=85)
os.makedirs(os.path.join(site, "fonts"), exist_ok=True)
for f in ("neutra-text-light.otf", "neutra-text-regular.otf", "neutra-text-bold.otf", "neutra-text-bold-italic.otf"):
    shutil.copy(os.path.join(src_assets, "fonts", f), os.path.join(site, "fonts", f))
for f in ("Inter-Light.otf", "Inter-Regular.otf", "Inter-SemiBold.otf", "Inter-SemiBoldItalic.otf"):  # cifras (OFL)
    shutil.copy(os.path.join("/usr/share/fonts/opentype/inter", f), os.path.join(site, "fonts", f))
here = os.path.dirname(os.path.abspath(__file__))
for f in ("player.html", "player.js"):
    shutil.copy(os.path.join(here, f), os.path.join(site, f))
print("assets:", len(used))

// Renderiza un video cuadro a cuadro con Chromium (Playwright) y lo codifica con ffmpeg.
// Uso: node render.cjs <site_dir> <video_dir> [fps] [--still t1,t2,...]
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

(async () => {
  const [site, vdir, fpsArg, flag, stills] = process.argv.slice(2);
  const fps = Number(fpsArg || 30);
  const tl = JSON.parse(fs.readFileSync(path.join(vdir, "timeline.json"), "utf8"));
  tl.voice = process.env.VOZ === "1";
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files", "--force-color-profile=srgb"] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => console.error("pageerror", e.message));
  await page.goto("file://" + path.resolve(site, "player.html"));
  await page.evaluate((t) => window.initPlayer(t), tl);
  if (flag === "--still") {
    for (const t of stills.split(",").map(Number)) {
      await page.evaluate((t) => window.renderAt(t), t);
      await page.screenshot({ path: path.join(vdir, `still_${t.toFixed(2)}.jpg`), type: "jpeg", quality: 85 });
    }
    await browser.close();
    return;
  }
  const out = path.join(vdir, "video.mp4");
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "15", "-pix_fmt", "yuv420p", "-r", String(fps), out], { stdio: ["pipe", "inherit", "inherit"] });
  const n = Math.round(tl.duration * fps);
  const t0 = Date.now();
  for (let f = 0; f < n; f++) {
    await page.evaluate((t) => window.renderAt(t), f / fps);
    const buf = await page.screenshot({ type: "jpeg", quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 150 === 0) console.log(`${tl.id} ${f}/${n} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  await browser.close();
  console.log("ok", out);
})();

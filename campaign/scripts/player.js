/* 3 Vértices — motor de animación determinista: window.renderAt(t) dibuja el cuadro del segundo t. */
(() => {
  const W = 1080, H = 1920;
  const $ = (h) => { const d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstElementChild; };
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const E = {
    outExpo: (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    outCubic: (p) => 1 - Math.pow(1 - p, 3),
    outQuart: (p) => 1 - Math.pow(1 - p, 4),
    inOut: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    outBack: (p) => { const c = 1.6; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
  };
  const prog = (t, t0, d) => clamp((t - t0) / d);
  const A = (p) => "assets/" + p;
  const dims = {};

  function markup(s) {
    return s.split("/").map((l) => `<span class="ln"><span>${l.replace(/\*(.+?)\*/g, "<em>$1</em>")}</span></span>`).join("");
  }

  // Imagen con movimiento de cámara (Ken Burns). box = {w,h}
  function kb(src, o = {}, box = { w: W, h: H }) {
    const el = $(`<div class="kb"><img src="${A(src)}"></div>`);
    const img = el.querySelector("img");
    const d = dims[src];
    const cover = Math.max(box.w / d.w, box.h / d.h);
    img.style.width = d.w * cover + "px";
    img.style.height = d.h * cover + "px";
    const z = o.zoom || [1.0, 1.1], fx = o.fx || [0.5, 0.5], fy = o.fy || [0.5, 0.5];
    return {
      el,
      update(p) {
        const e = E.inOut(clamp(p));
        const s = lerp(z[0], z[1], e);
        const iw = d.w * cover * s, ih = d.h * cover * s;
        const x = -(iw - box.w) * lerp(fx[0], fx[1], e);
        const y = -(ih - box.h) * lerp(fy[0], fy[1], e);
        img.style.transform = `translate3d(${x}px,${y}px,0) scale(${s})`;
      },
    };
  }

  // Bloque eyebrow + título con revelado por líneas
  function tblock(eyebrow, title, top = 250) {
    const el = $(`<div class="tblock" style="top:${top}px">${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ""}<div class="title">${markup(title)}</div></div>`);
    const eb = el.querySelector(".eyebrow");
    const lines = [...el.querySelectorAll(".ln > span")];
    return {
      el,
      update(t, t0 = 0.25) {
        if (eb) { const p = E.outCubic(prog(t, t0, 0.6)); eb.style.opacity = p; eb.style.transform = `translateX(${(1 - p) * -40}px)`; }
        lines.forEach((ln, i) => { const p = E.outExpo(prog(t, t0 + 0.12 + i * 0.13, 0.9)); ln.style.transform = `translateY(${(1 - p) * 115}%)`; });
      },
    };
  }

  const grid = () => `<div class="grid"></div>`;

  // ------------------------------------------------------------------ escenas
  const S = {};

  S.photo = (sc) => {
    const el = $(`<div class="scene${sc.light ? " light" : ""}"></div>`);
    const k = kb(sc.img, sc); el.appendChild(k.el);
    el.appendChild($(`<div class="shadeTop"></div>`)); el.appendChild($(`<div class="shadeBot"></div>`));
    const tb = tblock(sc.eyebrow, sc.title); el.appendChild(tb.el);
    return { el, update(t) { k.update(t / (sc.dur + sc.tr + 0.6)); tb.update(t, (sc.tr || 0) * 0.55); } };
  };

  S.kinetic = (sc) => {
    const el = $(`<div class="scene"></div>`);
    let k = null, sketch = null;
    if (sc.img) {
      k = kb(sc.img, sc); el.appendChild(k.el);
      el.appendChild($(`<div class="full" style="background:linear-gradient(180deg,rgba(4,19,31,.55),rgba(4,19,31,.35) 40%,rgba(4,19,31,.85))"></div>`));
    } else {
      el.appendChild($(grid())); el.appendChild($(`<div class="glow"></div>`));
      sketch = $(`<svg class="full" width="1080" height="1920" viewBox="0 0 1080 1920">
        <path class="s0" d="M-20 1180 H1100" stroke="#8fc8ff" stroke-width="3" fill="none"/>
        <path class="s1" d="M170 1180 V900 H560 V820 H910 V1180" stroke="#fff" stroke-width="4" fill="none"/>
        <path class="s2" d="M560 900 V1180 M250 990 H470 V1100 H250 Z M640 900 H830 V1100 H640 Z M380 1180 V1110" stroke="rgba(255,255,255,.75)" stroke-width="3" fill="none"/>
        <path class="s3" d="M120 1240 H960 M120 1225 V1255 M960 1225 V1255" stroke="rgba(143,200,255,.8)" stroke-width="2" fill="none"/>
      </svg>`);
      el.appendChild(sketch);
      sketch.querySelectorAll("path").forEach((p) => { const L = p.getTotalLength ? 3000 : 3000; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
    }
    const box = $(`<div class="abs" style="left:84px;right:84px;top:${sc.img ? 560 : 360}px"><div class="title" style="font-size:${sc.img ? 132 : 120}px">${markup(sc.words)}</div></div>`);
    el.appendChild(box);
    const lines = [...box.querySelectorAll(".ln > span")];
    const tags = (sc.tags || []).map(([txt, x, y]) => { const tg = $(`<div class="tagpin" style="left:${x * W}px;top:${y * H}px"><span class="dot"></span><span class="lb">${txt}</span></div>`); el.appendChild(tg); return tg; });
    const vs = sc.voStart - sc.start, ve = sc.voEnd - sc.start;
    return {
      el,
      update(t) {
        if (k) k.update(E.outCubic(clamp(t / sc.dur)));
        if (sketch) {
          const ps = sketch.querySelectorAll("path");
          [[0, 0, 1.0], [1, 0.5, 1.6], [2, 1.4, 1.3], [3, 1.9, 0.9]].forEach(([i, t0, d]) => { ps[i].style.strokeDashoffset = 3000 * (1 - E.inOut(prog(t, t0, d))); });
        }
        lines.forEach((ln, i) => {
          const t0 = lerp(vs, ve, i / Math.max(1, lines.length)) - 0.1;
          const p = E.outExpo(prog(t, t0, 0.8));
          ln.style.transform = `translateY(${(1 - p) * 115}%)`;
        });
        tags.forEach((tg, i) => { const p = E.outBack(prog(t, 1.0 + i * 0.35, 0.5)); tg.style.opacity = clamp(p); tg.style.transform = `scale(${0.6 + 0.4 * p})`; });
      },
    };
  };

  S.plan2render = (sc) => {
    const el = $(`<div class="scene light">${grid()}</div>`);
    const bx = { x: 60, y: 600, w: 960, h: 690 };
    const card = $(`<div class="card" style="left:${bx.x}px;top:${bx.y}px;width:${bx.w}px;height:${bx.h}px"></div>`);
    const plan = $(`<img src="${A(sc.plan)}" style="position:absolute;inset:24px;width:calc(100% - 48px);height:calc(100% - 48px);object-fit:contain">`);
    card.appendChild(plan);
    let rk = null, rwrap = null, edge = null;
    if (sc.render) {
      rwrap = $(`<div class="full"></div>`); rk = kb(sc.render, { zoom: [1.12, 1.0] }, bx); rwrap.appendChild(rk.el); card.appendChild(rwrap);
      edge = $(`<div class="abs" style="top:0;bottom:0;width:4px;background:#8fc8ff;box-shadow:0 0 30px #55b8ff"></div>`); card.appendChild(edge);
    }
    const scan = $(`<div class="abs" style="left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,#0f5da8,transparent);box-shadow:0 0 24px rgba(15,93,168,.6)"></div>`);
    card.appendChild(scan);
    el.appendChild(card);
    const corners = $(`<svg class="abs" style="left:${bx.x - 20}px;top:${bx.y - 20}px" width="${bx.w + 40}" height="${bx.h + 40}">
      <path d="M2 70 V2 H70 M${bx.w + 38} 70 V2 H${bx.w - 30} M2 ${bx.h - 30} V${bx.h + 38} H70 M${bx.w + 38} ${bx.h - 30} V${bx.h + 38} H${bx.w - 30}" stroke="#0f5da8" stroke-width="4" fill="none"/></svg>`);
    el.appendChild(corners);
    const checks = sc.scan ? ["Antecedentes", "Superficies", "Normativa"].map((c, i) => { const ch = $(`<div class="check" style="left:${i % 2 ? 470 : 110}px;top:${[560, 1000, 1210][i]}px"><b>✓</b>${c}</div>`); el.appendChild(ch); return ch; }) : [];
    const tb = tblock(sc.eyebrow, sc.title); el.appendChild(tb.el);
    const reveal = Math.min(sc.dur * 0.42, 2.2);
    return {
      el,
      update(t) {
        tb.update(t, (sc.tr || 0) * 0.55);
        const pc = E.outCubic(prog(t, 0.1, 0.9));
        card.style.transform = `translateY(${(1 - pc) * 80}px) scale(${0.96 + 0.04 * pc})`; card.style.opacity = pc;
        corners.style.opacity = E.outCubic(prog(t, 0.6, 0.6));
        plan.style.transform = `scale(${1 + 0.05 * clamp(t / sc.dur)})`;
        const sp = ((t * 0.55) % 1);
        scan.style.top = sp * bx.h + "px"; scan.style.opacity = sc.render ? 1 - prog(t, reveal - 0.3, 0.3) : 1;
        if (rwrap) {
          const p = E.inOut(prog(t, reveal, 1.2));
          rwrap.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
          edge.style.left = p * bx.w - 2 + "px"; edge.style.opacity = p > 0 && p < 1 ? 1 : 0;
          rk.update(clamp((t - reveal) / (sc.dur - reveal + 0.8)));
        }
        checks.forEach((ch, i) => { const p = E.outBack(prog(t, 1.0 + i * 0.7, 0.5)); ch.style.opacity = clamp(p); ch.style.transform = `translateY(${(1 - p) * 30}px)`; });
      },
    };
  };

  S.triangle = (sc) => {
    const el = $(`<div class="scene">${grid()}<div class="glow"></div></div>`);
    const cx = 540, cy = 1000, R = 330;
    const P = [-90, 30, 150].map((a) => [cx + R * Math.cos((a * Math.PI) / 180), cy + R * Math.sin((a * Math.PI) / 180)]);
    const svg = $(`<svg class="full" width="1080" height="1920"><polygon points="${P.map((p) => p.join(",")).join(" ")}" fill="rgba(15,93,168,.12)" stroke="#fff" stroke-width="4"/>
      <polygon points="${P.map((p) => [cx + (p[0] - cx) * 0.62, cy + (p[1] - cy) * 0.62].join(",")).join(" ")}" fill="none" stroke="rgba(143,200,255,.35)" stroke-width="2" stroke-dasharray="10 12"/>
      ${P.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="18" fill="#8fc8ff"/><circle cx="${p[0]}" cy="${p[1]}" r="40" fill="none" stroke="#8fc8ff" stroke-width="2"/>`).join("")}</svg>`);
    el.appendChild(svg);
    const poly = svg.querySelector("polygon"); const inner = svg.querySelectorAll("polygon")[1];
    const L = 3 * R * Math.sqrt(3); poly.style.strokeDasharray = L;
    const dots = [...svg.querySelectorAll("circle")];
    const pos = [[P[0][0], P[0][1] - 170], [P[1][0] + 40, P[1][1] + 70], [P[2][0] - 40, P[2][1] + 70]];
    const labels = sc.labels.map((l, i) => { const lb = $(`<div class="vlabel" style="left:${pos[i][0] - 180}px;top:${pos[i][1]}px"><small>0${i + 1}</small>${l}</div>`); el.appendChild(lb); return lb; });
    const logo = $(`<img class="abs" src="assets/logo/logo-3-vertices.png" style="left:${cx - 75}px;top:${cy - 40}px;width:150px;height:150px">`); el.appendChild(logo);
    const tb = tblock(null, sc.title, 240); el.appendChild(tb.el);
    const vs = sc.voStart - sc.start, ve = sc.voEnd - sc.start;
    return {
      el,
      update(t) {
        tb.update(t, (sc.tr || 0) * 0.5);
        poly.style.strokeDashoffset = L * (1 - E.inOut(prog(t, 0.3, 1.4)));
        poly.style.fillOpacity = prog(t, 1.4, 0.8);
        inner.style.opacity = prog(t, 1.6, 0.8);
        labels.forEach((lb, i) => {
          const t0 = lerp(vs + 0.5, ve - 0.8, i / 2);
          const p = E.outCubic(prog(t, t0, 0.6));
          lb.style.opacity = p; lb.style.transform = `translateY(${(1 - p) * 26}px)`;
          [dots[i * 2], dots[i * 2 + 1]].forEach((d, j) => { const q = E.outBack(prog(t, t0 - 0.1 + j * 0.08, 0.5)); d.style.transformOrigin = `${d.getAttribute("cx")}px ${d.getAttribute("cy")}px`; d.style.transform = `scale(${q})`; d.style.opacity = j ? clamp(q) * 0.6 : clamp(q); });
        });
        const pl = E.outBack(prog(t, ve - 0.4, 0.7)); logo.style.opacity = clamp(pl); logo.style.transform = `scale(${0.5 + 0.5 * pl})`;
      },
    };
  };

  S.mosaic = (sc) => {
    const el = $(`<div class="scene">${grid()}<div class="glow"></div></div>`);
    const top0 = 300, ph = 300, gap = 28;
    const vs = sc.voStart - sc.start, ve = sc.voEnd - sc.start;
    const panels = sc.imgs.map((src, i) => {
      const p = $(`<div class="panel" style="top:${top0 + i * (ph + gap)}px"></div>`);
      const k = kb(src, { zoom: [1.15, 1.0], fx: [i % 2 ? 0.3 : 0.7, 0.5] }, { w: 960, h: ph }); p.appendChild(k.el);
      const chip = $(`<div class="chip"><i>0${i + 1}</i>${sc.chips[i]}</div>`); p.appendChild(chip);
      el.appendChild(p);
      return { p, k, chip, t0: lerp(Math.max(0.15, vs - 0.15), ve - 0.9, i / (sc.imgs.length - 1)) };
    });
    return {
      el,
      update(t) {
        panels.forEach(({ p, k, chip, t0 }, i) => {
          const e = E.outExpo(prog(t, t0 - 0.15, 0.9));
          p.style.clipPath = i % 2 ? `inset(0 0 0 ${(1 - e) * 100}%)` : `inset(0 ${(1 - e) * 100}% 0 0)`;
          k.update(clamp((t - t0 + 0.2) / (sc.dur + 0.5)));
          const c = E.outCubic(prog(t, t0 + 0.35, 0.5)); chip.style.transform = `translateY(${(1 - c) * 100}%)`;
        });
      },
    };
  };

  S.steps = (sc) => {
    const el = $(`<div class="scene"></div>`);
    const bg = $(`<img class="full" src="${A(sc.img.replace(/\.(\w+)$/, ".blur.jpg"))}" style="width:100%;height:100%;object-fit:cover">`);
    el.appendChild(bg); el.appendChild($(`<div class="full" style="background:linear-gradient(180deg,rgba(4,19,31,.86),rgba(6,23,39,.80) 50%,rgba(4,19,31,.95))"></div>`));
    el.appendChild($(grid()));
    const tb = tblock(null, sc.title, 260); el.appendChild(tb.el);
    const top0 = 600, rh = sc.steps.length > 3 ? 165 : 200;
    const line = $(`<div class="abs" style="left:100px;width:2px;top:${top0 + 30}px;background:linear-gradient(#8fc8ff,rgba(143,200,255,.2))"></div>`); el.appendChild(line);
    const vs = sc.voStart - sc.start, ve = sc.voEnd - sc.start;
    const rows = sc.steps.map(([ttl, d], i) => {
      const r = $(`<div class="step" style="top:${top0 + i * rh}px"><div class="n">0${i + 1}</div><div><div class="t">${ttl}</div><div class="d">${d}</div></div></div>`);
      el.appendChild(r); return { r, t0: lerp(vs - 0.1, ve - 0.7, i / (sc.steps.length - 1)) };
    });
    const total = (sc.steps.length - 1) * rh;
    return {
      el,
      update(t) {
        tb.update(t, (sc.tr || 0) * 0.5);
        bg.style.transform = `scale(${1.1 - 0.06 * clamp(t / sc.dur)})`;
        rows.forEach(({ r, t0 }) => { const p = E.outExpo(prog(t, t0, 0.8)); r.style.opacity = clamp(p * 1.4); r.style.transform = `translateX(${(1 - p) * 60}px)`; });
        const lp = E.inOut(prog(t, rows[0].t0, rows[rows.length - 1].t0 - rows[0].t0 + 0.4)); line.style.height = lp * total + "px";
      },
    };
  };

  S.formats = (sc) => {
    const el = $(`<div class="scene light">${grid()}</div>`);
    const tb = tblock(null, sc.title, 250); el.appendChild(tb.el);
    const sizes = [["A4", 210, 297], ["A3", 297, 420], ["A2", 420, 594], ["A1", 594, 841], ["A0", 841, 1189]];
    const k = 640 / 1189, ox = (W - 841 * k) / 2, oy = 1250;
    const svg = $(`<svg class="full" width="1080" height="1920"></svg>`);
    const NS = "http://www.w3.org/2000/svg";
    const items = sizes.map(([n, w, h], i) => {
      const g = document.createElementNS(NS, "g");
      const r = document.createElementNS(NS, "rect");
      r.setAttribute("x", ox); r.setAttribute("y", oy - h * k); r.setAttribute("width", w * k); r.setAttribute("height", h * k);
      r.setAttribute("fill", i === 4 ? "#173b5d" : "rgba(15,93,168,0.06)"); r.setAttribute("fill-opacity", 0);
      r.setAttribute("stroke", i === 4 ? "#173b5d" : "#0f5da8"); r.setAttribute("stroke-width", i === 4 ? 5 : 3);
      const L = 2 * (w + h) * k; r.style.strokeDasharray = L; r.style.strokeDashoffset = L;
      const tx = document.createElementNS(NS, "text");
      tx.setAttribute("x", ox + w * k - 14); tx.setAttribute("y", oy - h * k + 42); tx.setAttribute("text-anchor", "end");
      tx.setAttribute("font-size", i === 4 ? 46 : 30); tx.setAttribute("font-weight", 700); tx.setAttribute("fill", "#0f5da8"); tx.textContent = n;
      g.appendChild(r); g.appendChild(tx); svg.appendChild(g);
      return { r, tx, L };
    });
    el.appendChild(svg);
    const big = $(`<div class="abs" style="left:${ox}px;width:${841 * k}px;top:${oy - 1189 * k}px;height:${1189 * k}px;display:grid;place-items:center;text-align:center;color:#fff"><div><div style="font-size:190px;font-weight:300;letter-spacing:-.05em;line-height:1">A0</div><div style="font-size:28px;letter-spacing:.2em;margin-top:10px;font-weight:700">841 × 1189 MM</div></div></div>`);
    el.appendChild(big);
    const vs = sc.voStart - sc.start;
    return {
      el,
      update(t) {
        tb.update(t, (sc.tr || 0) * 0.5);
        items.forEach(({ r, tx, L }, i) => {
          const t0 = vs + 0.1 + i * 0.42;
          const p = E.inOut(prog(t, t0, 0.55));
          r.style.strokeDashoffset = L * (1 - p); r.setAttribute("fill-opacity", i === 4 ? E.outCubic(prog(t, t0 + 0.5, 0.6)) : prog(t, t0 + 0.3, 0.4));
          tx.style.opacity = i === 4 ? 0 : prog(t, t0 + 0.25, 0.3);
        });
        const pb = E.outCubic(prog(t, vs + 0.1 + 4 * 0.42 + 0.7, 0.6)); big.style.opacity = pb; big.style.transform = `scale(${0.92 + 0.08 * pb})`;
      },
    };
  };

  S.cta = (sc) => {
    const el = $(`<div class="scene">${grid()}<div class="glow"></div></div>`);
    const cx = 540, cy = 470, R = 200;
    const P = [-90, 30, 150].map((a) => [cx + R * Math.cos((a * Math.PI) / 180), cy + R * Math.sin((a * Math.PI) / 180) + 20]);
    const svg = $(`<svg class="full" width="1080" height="1920"><circle cx="${cx}" cy="${cy}" r="230" fill="none" stroke="rgba(143,200,255,.5)" stroke-width="2"/><polygon points="${P.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#8fc8ff" stroke-width="4"/></svg>`);
    el.appendChild(svg);
    const ring = svg.querySelector("circle"), tri = svg.querySelector("polygon");
    const LT = 3 * R * Math.sqrt(3), LC = 2 * Math.PI * 230;
    tri.style.strokeDasharray = LT; ring.style.strokeDasharray = LC;
    const logo = $(`<img class="abs" src="assets/logo/logo-3-vertices.png" style="left:${cx - 190}px;top:${cy - 190}px;width:380px;height:380px">`); el.appendChild(logo);
    const box = $(`<div class="abs" style="left:70px;right:70px;top:760px;text-align:center">
      <div class="eyebrow" style="justify-content:center;font-size:24px">${sc.eyebrow}</div>
      <div class="kick" style="font-size:52px;font-weight:300;margin-top:34px;letter-spacing:-.02em">${sc.kicker}</div>
      <div class="title" style="font-size:96px;margin-top:14px">${markup(sc.title)}</div>
      <div class="bwrap" style="margin-top:46px"><span class="btn">${sc.button}<span class="arr">→</span></span></div>
      <div class="wa" style="margin-top:26px;font-size:28px;letter-spacing:.14em;color:rgba(255,255,255,.7)">WHATSAPP ${TL.whatsapp}</div></div>`);
    el.appendChild(box);
    box.querySelector(".eyebrow").style.setProperty("--x", 0);
    const disc = sc.disclaimer ? $(`<div class="abs" style="left:110px;right:110px;top:1510px;text-align:center;font-size:27px;line-height:1.35;color:rgba(255,255,255,.6)">${sc.disclaimer}</div>`) : null;
    if (disc) el.appendChild(disc);
    const parts = [box.querySelector(".eyebrow"), box.querySelector(".kick"), box.querySelector(".bwrap"), box.querySelector(".wa")];
    const lines = [...box.querySelectorAll(".ln > span")];
    const btn = box.querySelector(".btn");
    return {
      el,
      update(t) {
        tri.style.strokeDashoffset = LT * (1 - E.inOut(prog(t, 0.2, 1.0)));
        ring.style.strokeDashoffset = LC * (1 - E.inOut(prog(t, 0.5, 1.2)));
        const pl = E.outBack(prog(t, 1.05, 0.7)); logo.style.opacity = clamp(pl * 1.5); logo.style.transform = `scale(${0.6 + 0.4 * pl}) rotate(${(1 - clamp(pl)) * -8}deg)`;
        tri.style.opacity = 1 - prog(t, 1.2, 0.5);
        ring.style.transform = `scale(${1 + 0.02 * Math.sin(t * 2)})`; ring.style.transformOrigin = `${cx}px ${cy}px`;
        const ts = [1.5, 1.8, 2.9, 3.2];
        parts.forEach((p, i) => { const q = E.outCubic(prog(t, ts[i], 0.7)); p.style.opacity = q; p.style.transform = `translateY(${(1 - q) * 30}px)`; });
        lines.forEach((ln, i) => { const q = E.outExpo(prog(t, 2.0 + i * 0.15, 0.9)); ln.style.transform = `translateY(${(1 - q) * 115}%)`; });
        const pulse = t > 3.6 ? 1 + 0.025 * Math.max(0, Math.sin((t - 3.6) * 3.2)) : 1; btn.style.transform = `scale(${pulse})`;
        if (disc) disc.style.opacity = prog(t, 3.5, 0.8) * 0.9;
        el.style.opacity = 1 - prog(t, sc.dur - 0.5, 0.5) * 0.0;
      },
    };
  };

  // ------------------------------------------------------------------ montaje
  let TL, scenes, subsEl, hud, triPoly, grain;
  const triPts = (r, cx = 540, cy = 1060) => [-90, 30, 150].map((a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]);

  function buildSubs() {
    TL.subs.forEach((s) => {
      s.el = $(`<div style="display:none">${s.words.map((w) => `<span class="w">${w.w}</span>`).join(" ")}</div>`);
      s.ws = [...s.el.querySelectorAll(".w")];
      subsEl.appendChild(s.el);
    });
  }

  window.initPlayer = async (tl) => {
    TL = window.TL = tl;
    const srcs = new Set();
    tl.scenes.forEach((s) => { ["img", "plan", "render"].forEach((k) => s[k] && srcs.add(s[k])); (s.imgs || []).forEach((x) => srcs.add(x)); });
    await Promise.all([...srcs].map((src) => new Promise((res, rej) => { const im = new Image(); im.onload = () => { dims[src] = { w: im.naturalWidth, h: im.naturalHeight }; im.decode().then(res, res); }; im.onerror = () => rej(src); im.src = A(src); })));
    await document.fonts.ready;
    await Promise.all(["300", "400", "700"].map((w) => document.fonts.load(`${w} 40px Neutra`, "Aa0123456789×éÉ")));
    const root = document.getElementById("scenes");
    scenes = tl.scenes.map((sc) => { const s = S[sc.type](sc); s.sc = sc; root.appendChild(s.el); return s; });
    subsEl = document.getElementById("subs"); hud = document.getElementById("hud"); triPoly = document.getElementById("tripoly");
    document.getElementById("tag").textContent = tl.tag;
    grain = document.getElementById("grain");
    const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d"); const id = g.createImageData(256, 256);
    for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
    g.putImageData(id, 0, 0); grain.style.backgroundImage = `url(${c.toDataURL()})`;
    buildSubs();
    // espera a que todas las imágenes del DOM estén decodificadas
    await Promise.all([...document.images].map((im) => (im.complete ? im.decode().catch(() => {}) : new Promise((r) => (im.onload = r)))));
    return true;
  };

  window.renderAt = (t) => {
    let i = scenes.findIndex((s) => t < s.sc.start + s.sc.dur);
    if (i < 0) i = scenes.length - 1;
    const cur = scenes[i], sc = cur.sc, lt = t - sc.start;
    scenes.forEach((s) => { s.el.style.display = "none"; s.el.style.clipPath = ""; s.el.style.transform = ""; s.el.style.opacity = ""; s.el.style.zIndex = ""; s.el.style.filter = ""; });
    triPoly.setAttribute("points", ""); triPoly.style.opacity = 0;
    cur.el.style.display = "block"; cur.el.style.zIndex = 2; cur.update(lt);
    const inTr = i > 0 && sc.tr > 0 && lt < sc.tr;
    if (inTr) {
      const prev = scenes[i - 1];
      prev.el.style.display = "block"; prev.el.style.zIndex = 1; prev.update(t - prev.sc.start);
      const p = lt / sc.tr;
      if (sc.trans === "tri") {
        const e = E.inOut(p), r = e * 2500;
        const pts = triPts(r).map((q) => q.join("px ") + "px").join(",");
        cur.el.style.clipPath = `polygon(${pts})`;
        triPoly.setAttribute("points", triPts(r + 14).map((q) => q.join(",")).join(" ")); triPoly.style.opacity = 1 - prog(p, 0.7, 0.3);
        prev.el.style.transform = `scale(${1 + 0.06 * e})`;
      } else if (sc.trans === "wipe") {
        const e = E.inOut(p);
        cur.el.style.clipPath = `inset(${(1 - e) * 100}% 0 0 0)`;
        prev.el.style.transform = `translateY(${-e * 240}px)`;
      } else if (sc.trans === "push") {
        const e = E.outQuart(p);
        cur.el.style.transform = `translateY(${(1 - e) * H}px)`;
        prev.el.style.transform = `translateY(${-e * 520}px)`; prev.el.style.filter = `brightness(${1 - 0.5 * e})`;
      } else if (sc.trans === "fade") {
        cur.el.style.opacity = E.inOut(p);
      }
    }
    // HUD
    const light = !!(sc.light || sc.type === "plan2render" || sc.type === "formats");
    const prevLight = inTr && lt / sc.tr < 0.5 ? !!(scenes[i - 1].sc.light || ["plan2render", "formats"].includes(scenes[i - 1].sc.type)) : light;
    hud.classList.toggle("dark", prevLight);
    const ctaFade = sc.type === "cta" ? prog(lt, 0, 0.6) : 0;
    hud.style.opacity = (1 - ctaFade) * (TL.scenes[0] === sc && sc.trans === "cut" ? prog(t, 0.0, 0.5) : 1);
    // subtítulos
    subsEl.classList.toggle("dark", light && !(inTr && lt / sc.tr < 0.5));
    TL.subs.forEach((s) => {
      // sin locución, las escenas cuyo texto grande ya dice la frase no repiten subtítulo
      const owner = TL.scenes.find((x) => s.t0 < x.start + x.dur) || sc;
      const dup = !TL.voice && (owner.type === "kinetic" || owner.type === "cta");
      const vis = !dup && t >= s.t0 - 0.06 && t < s.t1;
      s.el.style.display = vis ? "block" : "none";
      if (!vis) return;
      const out = prog(t, s.t1 - 0.12, 0.12);
      s.ws.forEach((el, k) => {
        const w = s.words[k];
        const p = E.outBack(prog(t, w.t0 - 0.06, 0.22));
        el.style.opacity = clamp(p * 1.3) * (1 - out);
        el.style.transform = `translateY(${(1 - p) * 26}px) scale(${0.85 + 0.15 * p})`;
        el.classList.toggle("on", t >= w.t0 - 0.06 && t < w.t1 + 0.02);
      });
    });
    grain.style.transform = `translate(${((t * 977) % 64) - 32}px, ${((t * 613) % 64) - 32}px)`;
  };
})();

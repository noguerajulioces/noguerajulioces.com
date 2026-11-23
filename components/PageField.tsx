"use client";

import { useEffect } from "react";

// Page background: a faint, fixed field of mono characters behind all content.
// Hover lights the characters near the cursor; a click or tap sends a terracotta ripple that rewrites them.
// Only changed cells are redrawn, and only while something moves. Without JS the band keeps its CSS dot grid.
export function PageField() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.className = "page-field";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const band = document.querySelector(".band");
    band?.classList.add("has-canvas");
    // Listeners and observers go away with the field
    const life = new AbortController(), { signal } = life;

    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ñ";
    const pick = () => CHARS[(Math.random() * CHARS.length) | 0];
    const css = (n: string) => getComputedStyle(root).getPropertyValue(n).trim();
    const rgb = (hex: string) => { const h = hex.replace("#", ""); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)).join(","); };
    const FONT = 11, SPOT = 90, RING = 28, SPEED = 0.9; // px, px, px, px per ms
    const BASE = 0.08, BRIGHT = 0.2;                     // resting alpha; one cell in twelve is brighter

    let W = 0, H = 0, cw = 8, ch = 16, cols = 0, rows = 0;
    let chars: string[] = [], base = new Float32Array(0), heat = new Float32Array(0);
    let ink = "", accent = "", ripples: { x: number; y: number; t0: number; max: number }[] = [], mouse: { x: number; y: number } | null = null;
    let spot = new Set<number>(), hot = new Set<number>(), frame = 0, last = 0;

    const readColors = () => { ink = rgb(css("--color-text-muted")); accent = rgb(css("--color-primary")); };
    const cellAlpha = (i: number) => {
      let a = base[i];
      if (mouse) {
        const d = Math.hypot((i % cols) * cw + cw / 2 - mouse.x, ((i / cols) | 0) * ch + ch / 2 - mouse.y);
        if (d < SPOT) a += (1 - d / SPOT) * 0.35;
      }
      return a;
    };
    const drawCell = (i: number) => {
      const x = (i % cols) * cw, y = ((i / cols) | 0) * ch, a = cellAlpha(i);
      ctx.clearRect(x, y, cw, ch);
      ctx.fillStyle = heat[i] > 0.05 ? `rgba(${accent},${Math.max(a, heat[i]).toFixed(3)})` : `rgba(${ink},${a.toFixed(3)})`;
      ctx.fillText(chars[i], x, y + 2);
    };
    const drawAll = () => { ctx.clearRect(0, 0, W, H); for (let i = 0; i < chars.length; i++) drawCell(i); };

    const layout = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      // Height covers the whole screen, so the phone's address bar showing or hiding never rebuilds the field
      W = innerWidth; H = Math.max(innerHeight, screen.height || 0);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // --font-mono resolves to the self-hosted Geist Mono (next/font names the family)
      ctx.font = `400 ${FONT}px ${css("--font-mono")}`;
      ctx.textBaseline = "top";
      cw = Math.ceil(ctx.measureText("M").width) + 1; ch = FONT + 5;
      cols = Math.ceil(W / cw); rows = Math.ceil(H / ch);
      const n = cols * rows;
      chars = Array.from({ length: n }, pick);
      base = Float32Array.from({ length: n }, () => (Math.random() < 1 / 12 ? BRIGHT : BASE));
      heat = new Float32Array(n); hot = new Set(); spot = new Set();
      drawAll();
    };

    const cellsNear = (x: number, y: number, r: number, fn: (i: number, cx: number, cy: number) => void) => {
      const c0 = Math.max(0, Math.floor((x - r) / cw)), c1 = Math.min(cols - 1, Math.floor((x + r) / cw));
      const r0 = Math.max(0, Math.floor((y - r) / ch)), r1 = Math.min(rows - 1, Math.floor((y + r) / ch));
      for (let row = r0; row <= r1; row++) for (let col = c0; col <= c1; col++) fn(row * cols + col, col * cw + cw / 2, row * ch + ch / 2);
    };

    const step = (now: number) => {
      // Fade by elapsed time, not by frame count, so a slow screen shows the same ring as a fast one
      const fade = Math.exp(-Math.min(100, now - (last || now)) / 250);
      last = now;
      const dirty = new Set<number>();
      ripples = ripples.filter(r => (now - r.t0) * SPEED < r.max + RING);
      for (const r of ripples) {
        const front = (now - r.t0) * SPEED;
        cellsNear(r.x, r.y, front + RING, (i, cx, cy) => {
          if (Math.abs(Math.hypot(cx - r.x, cy - r.y) - front) < RING) {
            heat[i] = 1; hot.add(i);
            if (Math.random() < 0.35) chars[i] = pick();
          }
        });
      }
      for (const i of hot) {
        heat[i] *= fade;
        if (heat[i] < 0.03) { heat[i] = 0; hot.delete(i); }
        dirty.add(i);
      }
      const nextSpot = new Set<number>();
      if (mouse) cellsNear(mouse.x, mouse.y, SPOT, i => nextSpot.add(i));
      for (const i of spot) dirty.add(i);
      for (const i of nextSpot) dirty.add(i);
      spot = nextSpot;
      for (const i of dirty) drawCell(i);
      return ripples.length > 0 || hot.size > 0;
    };
    const tick = (now: number) => { frame = step(now) ? requestAnimationFrame(tick) : 0; if (!frame) last = 0; };
    const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };

    if (!reduce) {
      // "click" fires on a tap but not when a finger starts a scroll, so scrolling never sets off a ripple
      addEventListener("click", e => {
        if (e.detail === 0) return; // keyboard activation
        const x = e.clientX, y = e.clientY;
        const max = Math.max(Math.hypot(x, y), Math.hypot(W - x, y), Math.hypot(x, H - y), Math.hypot(W - x, H - y));
        ripples.push({ x, y, t0: performance.now(), max });
        if (ripples.length > 4) ripples.shift();
        wake();
      }, { signal });
      if (matchMedia("(hover: hover)").matches) {
        addEventListener("pointermove", e => { mouse = { x: e.clientX, y: e.clientY }; wake(); }, { passive: true, signal });
        document.addEventListener("pointerleave", () => { mouse = null; wake(); }, { signal });
      }
    }

    const themeObserver = new MutationObserver(() => { readColors(); drawAll(); });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { readColors(); drawAll(); }, { signal });
    let resizeTimer = 0;
    addEventListener("resize", () => { if (innerWidth === W) return; clearTimeout(resizeTimer); resizeTimer = window.setTimeout(layout, 120); }, { signal });
    readColors(); layout();
    document.fonts.ready.then(() => { if (!signal.aborted) layout(); });

    return () => {
      life.abort();
      themeObserver.disconnect();
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frame);
      canvas.remove();
      band?.classList.remove("has-canvas");
    };
  }, []);
  return null;
}

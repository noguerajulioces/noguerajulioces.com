// A dotted globe whose view is driven by a plain state object, so GSAP and ScrollTrigger can tween it.
//   const g = await createGlobe(container, { arcs, labels });
//   gsap.to(g.state, { lat, lon, zoom });  gsap.to(g.state.arcs, { "asu-lis": 1 });  g.state.labels.lis = 1;
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const P = {
  asu: [-25.28, -57.63, "Asunción"], enc: [-27.33, -55.87, "Encarnación"],
  lis: [38.72, -9.14, "Lisboa"], bog: [4.71, -74.07, "Bogotá"],
  tuc: [-26.82, -65.22, "Tucumán"], sc: [37.35, -121.96, "Santa Clara"], osl: [59.91, 10.75, "Oslo"],
  mvd: [-34.9, -56.16, "Montevideo"], bue: [-34.6, -58.38, "Buenos Aires"], lpz: [-16.5, -68.15, "La Paz"],
  sao: [-23.55, -46.63, "São Paulo"], mex: [19.43, -99.13, "CDMX"], pty: [8.98, -79.52, "Panamá"],
  mad: [40.42, -3.7, "Madrid"], lon: [51.51, -0.13, "London"]
};
export const VISITED = ["mvd", "bue", "lpz", "sao", "mex", "pty", "mad", "lon"];
// Where a city label sits relative to its dot; default is above.
const SIDE = { tuc: "translate(calc(-100% - 8px), -50%)" };

const root = document.documentElement;
const css = n => getComputedStyle(root).getPropertyValue(n).trim();
const tone = h => new THREE.Color("#" + h.replace("#", "").slice(0, 6));
const vec = (lat, lon, r = 1) => {
  const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

// Land mask: rasterise the land polygons once into an equirectangular image, then test points against it.
let mask;
function landMask() {
  mask ??= (async () => {
    const [{ feature }, { geoPath, geoEquirectangular }] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm"),
      import("https://cdn.jsdelivr.net/npm/d3-geo@3.1.0/+esm")
    ]);
    const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json");
    if (!res.ok) throw new Error("land data");
    const topo = await res.json();
    const W = 2048, H = 1024, c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const projection = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
    ctx.beginPath(); geoPath(projection, ctx)(feature(topo, topo.objects.land)); ctx.fill();
    const data = ctx.getImageData(0, 0, W, H).data;
    return (lat, lon) => data[((Math.min(H - 1, ((90 - lat) / 180 * H) | 0) * W) + Math.min(W - 1, ((lon + 180) / 360 * W) | 0)) * 4 + 3] > 127;
  })();
  return mask;
}
async function landPoints(n) {
  const isLand = await landMask();
  const pts = [], golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const lat = Math.asin(y) * 180 / Math.PI;
    const lon = ((((i * golden) * 180 / Math.PI) % 360) + 360) % 360 - 180;
    if (isLand(lat, lon)) pts.push([lat, lon]);
  }
  return pts;
}
let disc;
const dotTexture = () => {
  if (disc) return disc;
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d"); x.fillStyle = "#fff"; x.beginPath(); x.arc(32, 32, 30, 0, Math.PI * 2); x.fill();
  disc = new THREE.CanvasTexture(c);
  disc.anisotropy = 4;
  return disc;
};

export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

export async function createGlobe(container, { arcs = [], labels = [], interactive = true } = {}) {
  const probe = document.createElement("canvas");
  if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
  // Same density at every size: dot size is in globe units, so the globe looks the same on a phone and a laptop.
  const n = 24000;
  const pts = await landPoints(n);
  const spacing = Math.sqrt(4 * Math.PI / n);

  const canvas = document.createElement("canvas");
  canvas.className = "globe-canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.prepend(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const tilt = new THREE.Group(), spin = new THREE.Group();
  tilt.add(spin); scene.add(tilt);

  const occluder = new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 64), new THREE.MeshBasicMaterial());
  spin.add(occluder);
  const pos = new Float32Array(pts.length * 3);
  pts.forEach(([la, lo], i) => vec(la, lo).toArray(pos, i * 3));
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dotMat = new THREE.PointsMaterial({ size: spacing * 1.7, sizeAttenuation: true, transparent: true, map: dotTexture(), alphaTest: 0.4, depthWrite: false });
  spin.add(new THREE.Points(dotsGeo, dotMat));

  const state = { lat: P.asu[0], lon: P.asu[1], zoom: 0.8, sway: 0, arcs: {}, labels: {} };

  const lines = arcs.map(({ key, from, to, kind }) => {
    const a = vec(P[from][0], P[from][1]), b = vec(P[to][0], P[to][1]);
    const mid = a.clone().add(b).normalize().multiplyScalar(1 + a.distanceTo(b) * 0.32);
    const g = new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(64));
    g.setDrawRange(0, 0);
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ transparent: true }));
    line.userData = { key, kind };
    state.arcs[key] = 0;
    spin.add(line);
    return line;
  });

  const keysOf = kind => [...new Set(arcs.filter(a => a.kind === kind).flatMap(a => [a.from, a.to]).concat(labels.filter(l => P[l] && kind === "visit" && VISITED.includes(l))))];
  const strong = [...new Set(arcs.filter(a => a.kind !== "visit").flatMap(a => [a.from, a.to]))];
  const faint = keysOf("visit").filter(k => !strong.includes(k));
  const marks = (keys, size) => {
    const m = new THREE.PointsMaterial({ size, sizeAttenuation: true, map: dotTexture(), alphaTest: 0.4, transparent: true });
    spin.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(keys.map(k => vec(P[k][0], P[k][1], 1.006))), m));
    return m;
  };
  const strongMat = marks(strong.length ? strong : ["asu"], 0.06);
  const faintMat = marks(faint.length ? faint : ["asu"], 0.04);

  const labelEls = labels.map(key => {
    const el = document.createElement("span");
    el.className = "globe-label" + (VISITED.includes(key) ? "" : " is-strong");
    el.textContent = P[key][2];
    el.setAttribute("aria-hidden", "true");
    container.append(el);
    state.labels[key] = 0;
    return { key, el };
  });

  const paint = () => {
    occluder.material.color.copy(tone(css("--color-bg")));
    dotMat.color.copy(tone(css("--color-text-muted"))); dotMat.opacity = 0.8;
    const accent = tone(css("--color-primary")), muted = tone(css("--color-text-muted"));
    lines.forEach(l => { const v = l.userData.kind === "visit"; l.material.color.copy(v ? muted : accent); l.material.opacity = v ? 0.45 : 0.95; });
    strongMat.color.copy(accent); faintMat.color.copy(muted);
  };
  paint();
  new MutationObserver(paint).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paint);

  let W = 1, H = 1;
  const size = () => {
    W = container.clientWidth || 1; H = container.clientHeight || 1;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
  };
  size();
  new ResizeObserver(size).observe(container);

  const aim = { x: 0, y: 0 }, eased = { x: 0, y: 0 };
  if (interactive && !reduceMotion) {
    addEventListener("pointermove", e => {
      const r = container.getBoundingClientRect();
      aim.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      aim.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    }, { passive: true });
  }

  const tmp = new THREE.Vector3(), toCam = new THREE.Vector3();
  const frame = now => {
    const t = now / 1000;
    eased.x += (aim.x - eased.x) * 0.05; eased.y += (aim.y - eased.y) * 0.05;
    spin.rotation.y = Math.PI / 2 - (state.lon + 180) * Math.PI / 180 + Math.sin(t * 0.35) * state.sway + eased.x * 0.08;
    tilt.rotation.x = state.lat * Math.PI / 180 + eased.y * 0.05;
    camera.position.z = 2 / (0.5359 * Math.max(0.2, state.zoom) * Math.min(1, camera.aspect));
    lines.forEach(l => l.geometry.setDrawRange(0, Math.round((state.arcs[l.userData.key] || 0) * 65)));
    scene.updateMatrixWorld();
    labelEls.forEach(({ key, el }) => {
      tmp.copy(vec(P[key][0], P[key][1], 1.02)).applyMatrix4(spin.matrixWorld);
      toCam.copy(camera.position).sub(tmp).normalize();
      const facing = tmp.clone().normalize().dot(toCam) > 0.12;
      tmp.project(camera);
      el.style.transform = `translate(${((tmp.x + 1) / 2) * W}px, ${((1 - tmp.y) / 2) * H}px) ${SIDE[key] || "translate(-50%, -160%)"}`;
      el.style.opacity = facing ? state.labels[key] : 0;
    });
    renderer.render(scene, camera);
  };

  let running = false, inView = true;
  const setRun = () => {
    const on = inView && !document.hidden;
    if (on !== running) { running = on; renderer.setAnimationLoop(on ? frame : null); }
  };
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; setRun(); }).observe(container);
  document.addEventListener("visibilitychange", setRun);
  setRun();
  frame(performance.now());

  return { state, canvas };
}

// Point a globe at a place or a [lat, lon] pair.
export function aim(g, target, zoom, duration = 1.4) {
  const [lat, lon] = Array.isArray(target) ? target : P[target];
  const d = reduceMotion ? 0 : duration;
  window.gsap.to(g.state, { lat, lon, zoom, duration: d, ease: "power2.inOut", overwrite: "auto" });
}
// Show exactly the given arcs and labels.
export function show(g, arcKeys = [], labelKeys = []) {
  const d = reduceMotion ? 0 : 1;
  for (const k in g.state.arcs) window.gsap.to(g.state.arcs, { [k]: arcKeys.includes(k) ? 1 : 0, duration: d, ease: "power2.out", overwrite: "auto" });
  for (const k in g.state.labels) window.gsap.to(g.state.labels, { [k]: labelKeys.includes(k) ? 1 : 0, duration: d * 0.5, overwrite: "auto" });
}

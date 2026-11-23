// Journey: the globe stays pinned beside the chapters and travels with each one.
import { createGlobe, aim, show, P, VISITED } from "./globe.js?v=adf90331";
gsap.registerPlugin(ScrollTrigger);

const J = ["enc-lis", "lis-bog", "bog-enc"], W = ["enc-tuc", "enc-sc", "enc-osl"], V = VISITED.map(k => "enc-" + k);
const arcs = [
  { key: "enc-lis", from: "enc", to: "lis", kind: "home" }, { key: "lis-bog", from: "lis", to: "bog", kind: "home" },
  { key: "bog-enc", from: "bog", to: "enc", kind: "home" }, { key: "enc-tuc", from: "enc", to: "tuc", kind: "work" },
  { key: "enc-sc", from: "enc", to: "sc", kind: "work" }, { key: "enc-osl", from: "enc", to: "osl", kind: "work" },
  ...VISITED.map(k => ({ key: "enc-" + k, from: "enc", to: k, kind: "visit" }))
];
const STEPS = {
  enc: { at: "enc", zoom: 1.9, arcs: [], labels: ["enc"] },
  lis: { at: [8, -32], zoom: 1.0, arcs: ["enc-lis"], labels: ["enc", "lis"] },
  bog: { at: [-6, -62], zoom: 1.2, arcs: ["enc-lis", "lis-bog"], labels: ["lis", "bog"] },
  remote: { at: [4, -88], zoom: 0.95, arcs: [...J, "enc-tuc", "enc-sc"], labels: ["enc", "tuc", "sc"] },
  now: { at: [18, -56], zoom: 0.82, arcs: [...J, ...W], labels: ["enc", "tuc", "sc", "osl"] },
  world: { at: [18, -56], zoom: 0.8, arcs: [...J, ...W, ...V], labels: ["enc", "tuc", "lis", "bog", "osl", "sc"] }
};

const wrap = document.querySelector(".journey");
let g = null;
try { g = await createGlobe(document.querySelector(".journey-globe"), { arcs, labels: ["enc", "lis", "bog", "tuc", "sc", "osl"] }); }
catch { wrap.classList.add("no-globe"); }

if (g) {
  // Phones show the globe as a corner mini map only while the journey is on screen (CSS reads .is-on)
  ScrollTrigger.create({ trigger: wrap, start: "top 60%", end: "bottom 40%", onToggle: s => document.querySelector(".journey-globe").classList.toggle("is-on", s.isActive) });
  Object.assign(g.state, { lat: P.enc[0], lon: P.enc[1], zoom: 1.9 });
  show(g, [], ["enc"]);
  const go = s => { aim(g, s.at, s.zoom); show(g, s.arcs, s.labels); };
  document.querySelectorAll(".chapter[data-step]").forEach(ch => ScrollTrigger.create({
    trigger: ch, start: "top 60%", end: "bottom 60%",
    onToggle: s => { if (s.isActive) go(STEPS[ch.dataset.step]); }
  }));
}

"use client";

// Journey: the globe stays pinned beside the chapters and travels with each one.
// Loaded only in the browser (next/dynamic, ssr: false, from JourneyStage), so Three.js and GSAP never reach the server.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";
import type { Step } from "@/data/journey";
import { aim, createGlobe, P, show, VISITED, type Arc, type Place } from "./globe";

gsap.registerPlugin(ScrollTrigger);

const J = ["enc-lis", "lis-bog", "bog-enc"], W = ["enc-tuc", "enc-sc", "enc-osl"], V = VISITED.map(k => "enc-" + k);
const arcs: Arc[] = [
  { key: "enc-lis", from: "enc", to: "lis", kind: "home" }, { key: "lis-bog", from: "lis", to: "bog", kind: "home" },
  { key: "bog-enc", from: "bog", to: "enc", kind: "home" }, { key: "enc-tuc", from: "enc", to: "tuc", kind: "work" },
  { key: "enc-sc", from: "enc", to: "sc", kind: "work" }, { key: "enc-osl", from: "enc", to: "osl", kind: "work" },
  ...VISITED.map(k => ({ key: "enc-" + k, from: "enc", to: k, kind: "visit" }) as const)
];
const STEPS: Record<Step, { at: Place | readonly [number, number]; zoom: number; arcs: string[]; labels: Place[] }> = {
  enc: { at: "enc", zoom: 1.9, arcs: [], labels: ["enc"] },
  lis: { at: [8, -32], zoom: 1.0, arcs: ["enc-lis"], labels: ["enc", "lis"] },
  bog: { at: [-6, -62], zoom: 1.2, arcs: ["enc-lis", "lis-bog"], labels: ["lis", "bog"] },
  remote: { at: [4, -88], zoom: 0.95, arcs: [...J, "enc-tuc", "enc-sc"], labels: ["enc", "tuc", "sc"] },
  now: { at: [18, -56], zoom: 0.82, arcs: [...J, ...W], labels: ["enc", "tuc", "sc", "osl"] },
  world: { at: [18, -56], zoom: 0.8, arcs: [...J, ...W, ...V], labels: ["enc", "tuc", "lis", "bog", "osl", "sc"] }
};

type Props = {
  stage: RefObject<HTMLDivElement | null>;
  // WebGL missing: the chapters show in one column without the globe
  onFail: () => void;
  // Phones show the globe as a corner mini map only while the journey is on screen
  onShow: (on: boolean) => void;
};

export default function JourneyGlobe({ stage, onFail, onShow }: Props) {
  useEffect(() => {
    const globeEl = stage.current;
    const wrap = globeEl?.closest(".journey");
    if (!globeEl || !wrap) return;
    let live = true;
    const triggers: ScrollTrigger[] = [];
    const ready = createGlobe(globeEl, { arcs, labels: ["enc", "lis", "bog", "tuc", "sc", "osl"] }).then(
      g => {
        if (!live) return g;
        triggers.push(ScrollTrigger.create({ trigger: wrap, start: "top 60%", end: "bottom 40%", onToggle: s => onShow(s.isActive) }));
        Object.assign(g.state, { lat: P.enc[0], lon: P.enc[1], zoom: 1.9 });
        show(g, [], ["enc"]);
        const go = (s: (typeof STEPS)[Step]) => { aim(g, s.at, s.zoom); show(g, s.arcs, s.labels); };
        wrap.querySelectorAll<HTMLElement>(".chapter[data-step]").forEach(ch => triggers.push(ScrollTrigger.create({
          trigger: ch, start: "top 60%", end: "bottom 60%",
          onToggle: s => { if (s.isActive) go(STEPS[ch.dataset.step as Step]); }
        })));
        return g;
      },
      () => { if (live) onFail(); }
    );
    return () => {
      live = false;
      triggers.forEach(t => t.kill());
      ready.then(g => g?.dispose());
    };
  }, [stage, onFail, onShow]);
  return null;
}


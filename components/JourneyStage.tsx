"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState, type ReactNode } from "react";

const JourneyGlobe = dynamic(() => import("./JourneyGlobe"), { ssr: false });

// The journey section: the globe's container renders on the server (it holds the left column), the globe itself only
// in the browser. The chapters arrive as server-rendered children.
export function JourneyStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [on, setOn] = useState(false);
  const fail = useCallback(() => setFailed(true), []);
  return (
    <section className={failed ? "journey no-globe" : "journey"} id="journey-wrap">
      <div className={on ? "journey-globe is-on" : "journey-globe"} aria-hidden="true" ref={stage}>
        <JourneyGlobe stage={stage} onFail={fail} onShow={setOn} />
      </div>
      <div className="journey-steps">{children}</div>
    </section>
  );
}

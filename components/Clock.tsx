"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";
import { messages } from "@/messages";

// Encarnación clock (America/Asuncion time zone) + live time difference with New York and Berlin
const TZ = "America/Asuncion";
const OTHERS = ["America/New_York", "Europe/Berlin"] as const;

// The current second; the server and the first client render see null and show the fallback.
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const currentSecond = () => Math.floor(Date.now() / 1000);
const noTime = () => null;

export function Clock({ locale }: { locale: Locale }) {
  const m = messages[locale].clock;
  const second = useSyncExternalStore(subscribe, currentSecond, noTime);
  if (second === null) {
    return (
      <>
        <span className="band-clock dot" id="clock">--:--:--</span>
        <span className="band-line"><span className="live" aria-hidden="true"></span><span id="clock-line">{m.fallback}</span></span>
      </>
    );
  }
  const now = new Date(second * 1000);
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value ?? "--";
  const wall = (tz: string) => new Date(now.toLocaleString("en-US", { timeZone: tz })).getTime();
  const diff = (tz: string) => Math.round((wall(TZ) - wall(tz)) / 36e5);
  const offsets = OTHERS.map((tz, i) => m.offset(diff(tz), m.cities[i])).join(" · ");
  return (
    <>
      <span className="band-clock dot" id="clock">{get("hour")}<span className="sep">:</span>{get("minute")}<span className="sep">:</span>{get("second")}</span>
      <span className="band-line"><span className="live" aria-hidden="true"></span><span id="clock-line">{m.line(`${get("hour")}:${get("minute")}`, offsets)}</span></span>
    </>
  );
}

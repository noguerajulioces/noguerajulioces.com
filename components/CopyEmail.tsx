"use client";

import { useEffect, useRef, useState } from "react";

// Copies the address and says so for two seconds; the button keeps its width (.copy-btn) while the label swaps.
export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 2000);
  };
  return (
    <button className="chip copy-btn" onClick={onClick}>
      <svg><use href={done ? "#i-check" : "#i-copy"} /></svg>
      <span>{done ? copied : copy}</span>
    </button>
  );
}

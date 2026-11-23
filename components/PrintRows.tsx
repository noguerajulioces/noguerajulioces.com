"use client";

import { useEffect } from "react";

// Printing opens every experience row; so does ?open=1 (handy for screenshots).
export function PrintRows() {
  useEffect(() => {
    const openAll = () => document.querySelectorAll("details").forEach(d => (d.open = true));
    if (new URLSearchParams(location.search).get("open")) openAll();
    addEventListener("beforeprint", openAll);
    return () => removeEventListener("beforeprint", openAll);
  }, []);
  return null;
}

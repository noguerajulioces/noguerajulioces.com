"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

// Top-bar index: marks the section in view.
export function SectionIndex({ label, links }: { label: string; links: readonly { id: string; label: string }[] }) {
  const first = links[0].id;
  const [active, setActive] = useState<string>(first);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = list.current;
    if (!ul) return;
    const anchors = [...ul.querySelectorAll("a")];
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          // Commit now: the active link is wider (its dash), and the centring below measures it
          flushSync(() => setActive(e.target.id));
          // Slide only the index list sideways. scrollIntoView would also scroll the page: the link sits in the sticky
          // top bar, inside scroll-padding-top, so the browser scrolls up to "reveal" it and fights the visitor's scroll.
          const a = anchors.find(l => l.getAttribute("href") === `#${e.target.id}`);
          if (a) ul.scrollTo({ left: a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach(s => io.observe(s));
    const onScroll = () => {
      if (scrollY < 120) setActive(first);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, [first]);

  return (
    <nav className="index" aria-label={label}>
      <ul ref={list}>
        {links.map(l => (
          <li key={l.id}>
            <a className="ghost" href={`#${l.id}`} aria-current={l.id === active ? "true" : "false"}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

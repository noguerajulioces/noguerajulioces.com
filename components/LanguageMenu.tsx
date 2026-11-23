"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { localeInfo, locales, type Locale } from "@/lib/i18n";

// Language menu: one button, a short list of links to the same page in each language (the hash is kept).
// Closes on outside click or Escape; arrow keys move through the list; focus returns to the button.
export function LanguageMenu({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    items.current[locales.indexOf(locale)]?.focus();
    const close = () => {
      setOpen(false);
      trigger.current?.focus();
    };
    const onClick = (e: globalThis.MouseEvent) => {
      if (!menu.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, locale]);

  const toggle = () => {
    setHash(location.hash);
    setOpen(!open);
  };
  const onListKey = (e: KeyboardEvent<HTMLUListElement>) => {
    const list = items.current;
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[(i + 1) % list.length]?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      list[(i - 1 + list.length) % list.length]?.focus();
    }
  };
  // Picking the current language only closes the menu
  const onPick = (e: MouseEvent<HTMLAnchorElement>, l: Locale) => {
    if (l !== locale) return;
    e.preventDefault();
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div className="lang-menu" ref={menu}>
      <button className="chip lang-trigger" id="lang-trigger" ref={trigger} aria-haspopup="true" aria-expanded={open} aria-controls="lang-list" onClick={toggle}>
        <span className="sr-only">{label}</span>
        {/* eslint-disable-next-line @next/next/no-img-element -- 20x15 SVG flag */}
        <img className="flag" src={`/flags/${localeInfo[locale].flag}.svg`} alt="" width={20} height={15} />
        <span className="lang-code">{locale.toUpperCase()}</span>
        <svg className="lang-chev" aria-hidden="true"><use href="#i-chev" /></svg>
      </button>
      <ul className="lang-list" id="lang-list" hidden={!open} onKeyDown={onListKey}>
        {locales.map((l, i) => (
          <li key={l}>
            <a
              className="lang-item"
              href={localeInfo[l].path + hash}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "page" : undefined}
              ref={el => {
                items.current[i] = el;
              }}
              onClick={e => onPick(e, l)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- 20x15 SVG flag */}
              <img className="flag" src={`/flags/${localeInfo[l].flag}.svg`} alt="" width={20} height={15} />
              {localeInfo[l].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

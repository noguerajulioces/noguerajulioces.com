import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
// Cascade order matters: tokens, shared pieces, then the page (whose responsive overrides come last).
import "@/styles/tokens.css";
import "@/styles/components.css";
import "@/styles/page.css";

// Theme before first paint, so the page never flashes the wrong theme.
const themeScript = `try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}`;

// The html shell shared by every root layout; only the language changes.
export function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout shell; the rule is for pages/ */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <Sprite />
        {children}
      </body>
    </html>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Lucide-style icons, referenced with <use href="#i-…">
function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24" {...stroke}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24" {...stroke}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></symbol>
        <symbol id="i-copy" viewBox="0 0 24 24" {...stroke}><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24" {...stroke}><path d="M20 6 9 17l-5-5" /></symbol>
        <symbol id="i-chev" viewBox="0 0 24 24" {...stroke}><path d="m6 9 6 6 6-6" /></symbol>
        <symbol id="i-sun" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></symbol>
        <symbol id="i-passport" viewBox="0 0 24 24" {...stroke}><rect width="14" height="20" x="5" y="2" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 17h6" /></symbol>
        <symbol id="i-moon" viewBox="0 0 24 24" {...stroke}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></symbol>
      </defs>
    </svg>
  );
}

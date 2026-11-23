"use client";

// Theme: follows the system until chosen, then remembered. The theme lives in <html data-theme>; CSS picks the icon
// (styles/components.css), so the button holds no state and shows the right icon before hydration.
export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = (root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button className="ghost" id="theme" aria-label={label} title={label} onClick={toggle}>
      <svg className="theme-moon"><use href="#i-moon" /></svg>
      <svg className="theme-sun"><use href="#i-sun" /></svg>
    </button>
  );
}

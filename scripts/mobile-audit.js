// Mobile audit for the portfolio page (/, /es, /pt). Paste into the console (or run through a browser tool) at a phone width.
// Returns { viewport, findings: [{ kind, el, detail }] }. Same instrument before and after a fix.
(() => {
  const W = document.documentElement.clientWidth, H = innerHeight;
  const label = el => {
    const t = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("href") || el.tagName).trim().replace(/\s+/g, " ").slice(0, 32);
    return `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : ""} "${t}"`;
  };
  const visible = el => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0; };
  const findings = [];

  if (document.documentElement.scrollWidth > W) findings.push({ kind: "page-overflow", el: "html", detail: `${document.documentElement.scrollWidth}px > ${W}px` });

  document.querySelectorAll("main *").forEach(el => {
    if (!visible(el) || el.closest(".globe-canvas, .journey-globe, .index ul")) return;
    const r = el.getBoundingClientRect();
    if (r.right > W + 1 || r.left < -1) findings.push({ kind: "element-overflow", el: label(el), detail: `left ${Math.round(r.left)} right ${Math.round(r.right)}` });
  });

  document.querySelectorAll("a, button, summary").forEach(el => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    const inText = el.classList.contains("tlink") && el.closest("p, li");
    if (!inText && (r.height < 44 || r.width < 44)) findings.push({ kind: "tap-target", el: label(el), detail: `${Math.round(r.width)}x${Math.round(r.height)}` });
  });

  const small = new Set();
  document.querySelectorAll("body *").forEach(el => {
    if (!visible(el) || el.matches(".logo.has-img, .avatar.has-photo") || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 12 && !small.has(fs + el.className)) { small.add(fs + el.className); findings.push({ kind: "small-text", el: label(el), detail: `${fs}px` }); }
  });

  document.querySelectorAll("h1, h2").forEach(el => {
    if (!visible(el)) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight) || parseFloat(getComputedStyle(el).fontSize) * 1.2;
    const lines = Math.round(el.getBoundingClientRect().height / lh);
    if (lines > 3) findings.push({ kind: "title-lines", el: label(el), detail: `${lines} lines` });
  });

  document.querySelectorAll(".globe-label").forEach(el => {
    if (parseFloat(el.style.opacity || 0) < 0.5) return;
    const r = el.getBoundingClientRect();
    if (r.left < 0 || r.right > W) findings.push({ kind: "label-offscreen", el: label(el), detail: `left ${Math.round(r.left)} right ${Math.round(r.right)}` });
  });

  const globe = document.querySelector(".journey-globe");
  if (globe) { const h = globe.getBoundingClientRect().height; findings.push({ kind: "info-globe-height", el: "journey-globe", detail: `${Math.round(h)}px = ${Math.round(h / H * 100)}% of ${H}px` }); }

  return { viewport: `${W}x${H}`, findings };
})();

// Scroll stability check for index.html. Paste into the console at a phone width.
// Parks the page across every section boundary and reports any place where the page moved on its own
// (the bug it guards: a script scrolling the page while the visitor scrolls). Resolves to { moved: [] } when clean.
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const root = document.documentElement;
  const moved = [];
  const sections = [...document.querySelectorAll("main section[id]")];
  for (const s of sections) {
    const top = s.getBoundingClientRect().top + scrollY;
    for (const off of [-0.55, -0.4, -0.25]) {
      const target = Math.max(0, Math.round(top + innerHeight * off));
      root.style.scrollBehavior = "auto"; scrollTo(0, target); root.style.scrollBehavior = "";
      await sleep(700);
      if (Math.abs(scrollY - target) > 2 && target < root.scrollHeight - innerHeight) moved.push({ section: s.id, target, settled: Math.round(scrollY) });
    }
  }
  scrollTo(0, 0);
  return { checked: sections.length * 3, moved };
})();

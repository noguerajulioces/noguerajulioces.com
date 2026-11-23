# DESIGN.md · Julio Noguera — portfolio

> If this file and the code disagree, the code wins until the person decides. Note the conflict under Open questions.

## Product
Personal portfolio of Julio Noguera, independent software engineer from Paraguay (Rails specialist), for noguerajulioces.com.
One static page. Read by recruiters and founders on a laptop during a quick scan, and on phones from links shared in X, LinkedIn and Instagram.
Main job: in 10 seconds, know who Julio is (software engineer, 10+ years, Rails specialist, startups), who he works with today, and how to contact him. Then, for whoever keeps scrolling, his career told on a globe.

Content, in order (sticky top bar: index, language, theme):
1. Clock band + hero: name, "Independent Software Engineer", lead, three bullets, availability, email + socials.
2. Journey: a globe pinned beside chapters; each chapter turns it to a place and draws the arc there.
   Foundations (Encarnación, UNI + freelance) → Information Systems in Lisbon (NOVA) → Rails backend and education (Bogotá: Platzi, SMART ONE)
   → Remote engineering for international teams (Geotec, Dezerta Labs) → Independent software engineer (RaceTracker, Luxus) → Languages & travel (passport).
3. Stack.
4. Contact.

## Audience and voice
Technical recruiters (Europe, DACH), startup founders and CTOs looking for a Rails contractor. Technical but scanning fast.
Voice: first person, short, plain, confident without hype. No buzzwords.
Language: English by default, with an EN · ES · PT switch that translates the whole page. One Guaraní line as a personal detail.
Formats: dates "Jul 2023 – Present", city + country.

## Mood
Words: sober and precise, playful in the details, Latin roots.
Never like: neon / dark hacker (black + Matrix green, glitch, fake terminals); hard to navigate (experience hidden behind clicks, desktop-OS metaphors).

## Brand
No existing logo, tokens or design files.
- Base: monochrome, near-white paper and near-black ink, like Paras.
- Accent: terracotta red, "tierra colorada" of Itapúa, also nods to Ruby. Used sparingly (links, live dot, active index item, the map).
- Type: Inter for text, Geist Mono for metadata like dates and badges, Doto (dot-matrix) only inside widgets: the clock and the passport. Approved with the foundations.
- Files: tokens.css (roles), components.css (shared pieces), guide-foundations.html (guide + states matrix), index.html (the page), globe.js (the dotted globe, driven by a state object), journey.js (chapter → globe), field.js (character field behind the whole page + click ripple), logos/, icons/ (Simple Icons, CC0), flags/ (flag-icons, MIT), scripts/assets.py (Stack registry → icons + Stack block; rerun after editing the registry).
- Photo: warm-mono version of Julio's LinkedIn photo (photo/photo-warm-mono-144.webp and -288.webp, ink-to-paper tone), chosen over natural colour and a dot halftone; falls back to the "JN" monogram if it fails to load. Rebuild with scripts/make_photos.py from photo/source-linkedin-363.png (LinkedIn's largest copy is 363 px, so a sharper source would help).

## References
- parascodes.is-a.dev — take: single narrow column, dotted grid lines, sticky side index, experience rows with logo + badge (Remote / Part-time) and expandable details; avoid: the long list of sections nobody reads (Anime, Guestbook).
- robertbye.com — take: live widgets (local clock for Asunción, map of countries, dot-matrix type as detail); avoid: the desktop-OS metaphor and the loading screen that hide the content.
- dousanmiao.com — not taken (bento grid declined).
- wallofportfolios.in/portfolios/yuvraj-singh — not taken (letter metaphor declined).

## Constraints
- Laptop (1280 px) first, phone (375 px) must work: on phones the globe is a 132 px corner mini map that appears only inside the journey, ignores touches and never covers more than 16% of the screen. Run scripts/mobile-audit.js at 375 px and 324 px before shipping: it must report no overflow, no tap target under 44 px, no text under 12 px, no title over 3 lines, no globe label off screen. Then run scripts/scroll-stability.js: the page must never move on its own. After editing any CSS or JS, run python3 -I scripts/version-assets.py so every reference carries a content hash (?v=) and no browser keeps an old copy. Preview with scripts/serve.py (sends Cache-Control: no-cache).
- Light theme default, dark theme toggle (assumed). Dark stays warm ink, never black + green.
- WCAG AA contrast; terracotta on paper must pass for text sizes it is used at.
- Motion: one strong moment, the journey globe (turns and draws arcs as chapters change); everything else small and functional. With prefers-reduced-motion the globe jumps between places without animating.
- Static HTML/CSS/JS, no build step, deployable to any static host. Runtime deps from CDNs: GSAP 3.12.5 + ScrollTrigger (cdnjs), Three.js 0.160, topojson-client, d3-geo, world-atlas land-110m (jsdelivr). If WebGL or a CDN fails, the chapters show in one column without the globe.

## Decisions log
- 2026-11-22 — RaceTracker and Luxus shown as clients under one "Independent" role — Julio wants to sell himself as an independent engineer.
- 2026-11-22 — English default with ES/PT switch — the audience reads English; the switch shows the languages instead of listing them.
- 2026-11-22 — Accent is terracotta — Latin roots without folklore.
- 2026-11-22 — Paras layout + Robert Bye widgets; no bento, no letter — Julio's picks.
- 2026-11-22 — Status line says "Open to new clients and full-time roles in Europe" — serves founders and the DACH job search at once.
- 2026-11-22 — Contact by email + LinkedIn, X, Instagram — Julio's pick; email lives in one constant in index.html.
- 2026-11-22 — Travel shown as passport stamps (country codes in Doto, homes in terracotta) instead of a map — reads at a glance, no map asset to maintain.
- 2026-11-22 — Doto allowed in widgets only (clock, passport), never in titles, text or avatars — keeps the playful type a detail.
- 2026-11-22 — Clock in muted ink — the name must win the first glance, not the clock.
- 2026-11-22 — All experience rows visible, details expand in place — "never hard to navigate".
- 2026-11-22 — Layout "Viaje": career told as chapters beside a pinned dotted globe (Three.js + GSAP), picked over "Portada" and "Fondo vivo" — Julio wanted the globe to be the striking scroll moment. Trade-off accepted: chapters run oldest → newest; the hero bullets and the top bar's "Now" link keep the current role one click away.
- 2026-11-22 — Side index replaced by a sticky top bar (index, language, theme) — full-bleed sections can't share a side column. New tokens: --size-topbar, --width-wide. New shared piece: .globe-label (components.css).
- 2026-11-22 — Chapter titles in a professional register ("Information Systems in Lisbon", not "Europe, for the first time") — Julio wants the page to read professional.
- 2026-11-22 — Experience and Education sections dissolved into journey chapters — each role sits in the place it happened.
- 2026-11-22 — Home is Encarnación (Julio confirmed): clock label, clock lines and the "today" chapter say Encarnación, and the globe's remote and visited arcs start there. Luxus keeps Asunción, its own location.
- 2026-11-22 — Stack is a registry in scripts/assets.py with brand icons as CSS masks in the tag's ink colour — monochrome keeps the one-accent rule; adding a tool is one line. Added PostgreSQL, Redis, Sidekiq, Docker, GitHub, GitHub Actions, Tailwind CSS; new "Data" group. Elastic Beanstalk, Grok and SQL Server have no icon in Simple Icons and show text only.
- 2026-11-22 — Flags beside languages: Spain for Español, Paraguay for Avañe'ẽ, Brazil for Português, US for English — Julio's pick. Passport header gets a passport icon drawn in the sprite's stroke style.
- 2026-11-22 — Globe: dots 1.7x their spacing at a fixed 24,000-point density (see the mobile entry below), so dots read larger; the last two journey steps centre on lat 18, lon -56 so Santa Clara and Oslo both face the viewer; Tucumán's label sits left of its dot so it never covers Encarnación — Julio couldn't see Santa Clara or Tucumán.
- 2026-11-22 — Mobile pass, measured with scripts/mobile-audit.js at 375x812 (19 findings before, 0 after): touch screens get 44 px controls through tokens (--size-control-xs/sm under pointer: coarse); phones swap the EN/ES/PT chips for a native language select (both replaced later by the flag menu) and fade the top-bar index to show it scrolls; name and chapter titles use the new --text-heading (26/32); the role drops its "·" and stacks; the pinned globe uses svh so the browser bar doesn't resize it; globe density is fixed at 24,000 points because dot size is in globe units, so density tied to container size made phone dots coarse.
- 2026-11-22 — Phone globe moved from a pinned 42% panel to a corner mini map (--size-minimap, pointer-events: none, shown via .is-on while the journey is on screen) — Julio reported scroll felt blocked at the globe in the app's mobile view. That inferred cause was wrong (see next entry); the mini map stays as a reading-space improvement.
- 2026-11-22 — Real cause of the stuck mobile scroll, found in Julio's screen recording (Chrome device mode, 412x924): the index called active.scrollIntoView() on every section change. The link sits in the sticky top bar, inside html scroll-padding-top, so the browser scrolled the page up about 64 px to "reveal" it; at the About/Journey boundary that flipped the active section again and the page bounced. Fix: the index scrolls only its own list sideways (list.scrollTo), never the page. Guard: scripts/scroll-stability.js parks the page across every section boundary and reports self-moves (0 of 30 after the fix, 10 of 30 with the old code).
- 2026-11-22 — Clock band: the CSS dot grid becomes a faint field of Geist Mono characters (an occasional ñ) drawn by band.js (superseded the same day by field.js, below); hover lights characters near the cursor and a click or tap sends a terracotta ripple that rewrites them — Julio loved a similar burst in another app; built in this page's own colours, type and band. Draws only while something moves; fade is time-based so slow screens show the same ring; reduced motion keeps the field still; without JS the dot grid stays.
- 2026-11-22 — The character field covers the whole page (field.js replaces band.js): one fixed canvas behind main, resting alpha 0.08 behind text (0.2 for one cell in twelve), cards and the clock cover it with their own ground. Ripples start on click, not pointerdown, so starting a scroll on a phone never fires one. Only changed cells are redrawn. Height covers the full screen and only a width change rebuilds it, so the phone's address bar never makes it flicker. Checked: mobile audit 0 findings, scroll stability 0 of 30 self-moves.
- 2026-11-22 — Language selector is one flag menu everywhere (Julio picked "menu with flags, simpler" over a segmented track and plain text): a chip with the current flag and code opens a short list of native names with flags (US English, Spain Español, Brazil Português). Replaces the three chips on desktop and the native select on phones. Closes on pick, outside click or Escape; arrow keys move through the list; focus returns to the chip. 44 px targets on touch.
- 2026-11-22 — Asset URLs are content-versioned by scripts/version-assets.py — Julio's Chrome showed the new flag menu unstyled because it kept an old components.css; the dev server sent no Cache-Control, so Chrome cached by heuristic. A changed file now gets a new URL; the dev server (scripts/serve.py) also sends no-cache for the page itself.
- 2026-11-22 — Phone spacing pass, measured at 324 px (Julio's width): the clock band grows with its content (it overflowed its fixed 120 px and the time-zone label touched the top bar); every block, chapters included, uses 32 px vertical padding; at 400 px or less the language chip shows only the flag, chapter titles use the section-title size (one ran to 4 lines) and social chips tighten; "Find me on" takes its own line so LinkedIn, X and Instagram sit in one row. Audit 0 findings at 324 and 375 px.
- 2026-11-22 — Top bar is 64 px on touch screens (--size-topbar under pointer: coarse) so its 44 px controls keep 10 px of air; desktop stays 52 px. Two old hero rules (.controls align-self: flex-end, .hero-top column-reverse) pushed the language chip and theme button to the bar's bottom edge and were deleted. Correction: phone overrides for chapter titles and the top-bar gap never applied, because they sat before the journey's base rules in a second style block; the page now has one style block with every responsive override at the end. Rule: responsive overrides always go in that last section.
- 2026-11-22 — First critique round (.claude/agents/portfolio-critic.md, run as a Berlin recruiter, a US startup CTO and an Asunción business owner; all three said "maybe"). Applied the fixes that needed no new facts: a "Today" block under the hero (RaceTracker, Luxus) so current work is in the first screen; the clock line states the live time difference with New York and Berlin instead of guessing what Julio is doing; "10 years shipping software, 7+ of them in production Rails … Norway, the US, Colombia and Argentina" to match the dates; no mini map at 560 px or less (it covered text); text blocks veil the character field at 78% so glyphs stay in the margins and the clock band; Spanish and Portuguese badges and the Platzi title fully translated. Still open, needs facts from Julio: measurable results per role, what he built at Luxus and since when, how the overlapping roles fit and current free hours, a CV (GitHub added: github.com/noguerajulioces, first in "Find me on"; Instagram removed at Julio's call, as the recruiter and CTO reviewers suggested), relocation and work permit, any senior or lead title, working hours or WhatsApp, and which audience the availability line speaks to first.
- 2026-11-22 — Availability line no longer says Europe: "Open to new clients and full-time roles, working remotely with teams anywhere in the world." (ES/PT translated, no more "roles full-time") — Julio works with any region; all three reviewers read "Europe" as excluding them. Relocation for on-site roles is still an open question.
- 2026-11-22 — One primary action per page (hero "Email me"); the contact email is a chip.
- 2026-11-22 — Company logos are mono monograms (RT, DL, GT…) — no logo files to source or license.

- 2026-11-22 — Luxus described from luxus.com.py (premium fashion distributor in Paraguay since 2011, 30+ brands), linked to its site — Julio gave the link.
- 2026-11-22 — Public email noguerajulio24@gmail.com — Julio gave it for the page.
- 2026-11-22 — Passport: lived in Paraguay, Portugal, Colombia; visited Brazil, Argentina, Uruguay, Bolivia, Mexico, Panama, Spain, England (11) — Julio confirmed the list. England shown as "GB".

- 2026-11-22 — Company logos replace monograms (supersedes the monogram decision) — Julio asked for them. Official site icons in logos/, Geotec's mark from its Instagram. Tiles sit on a fixed white `--color-logo-bg` (warm white in dark) so transparent logos stay visible; a failed image falls back to the monogram. "Independent" and early freelance keep the JN/FR monogram.
- 2026-11-22 — RaceTracker described from racetracker.no (registration, timing and live tracking for race organizers) and linked.

- 2026-11-22 — SMART ONE and Dezerta Labs logos taken from their LinkedIn company pages (Julio pointed to them); the earlier site icons were wrong. Logos with their own coloured ground use the full-bleed tile variant (`.logo.is-full`, no white frame).

- 2026-11-22 — Luxus shown as "Ruby on Rails Engineer · Part-time · Ongoing · Asunción" — Julio confirmed.
- 2026-11-22 — Title is "Software Engineer" (hero, Independent, Luxus), not "Ruby on Rails Engineer" or "AI Engineer" — the stack is broader than Rails (Next.js, PHP, WordPress, AWS) and nothing on the page backs an AI title yet; Rails stays as the specialty in the lead.
- 2026-11-22 — No "Part-time" on current clients — Julio prefers to answer that when asked. Past roles keep their real badges.
- 2026-11-22 — Client stacks: RaceTracker = Rails, React, AWS EC2, S3; Luxus = Next.js, WordPress, PHP, Rails. PHP and WordPress moved from "Earlier" to current stack.
- 2026-11-22 — Stack gains an "AI" row (Claude Code, ChatGPT, Grok) — shows a modern workflow without claiming an AI Engineer title.
- 2026-11-22 — "10+ years shipping software, most of it in Ruby on Rails" — Julio has worked since 2016; the old "5+" undersold it.

## Open questions
- English level label: "Fluent" or "Professional"? (assumed "Professional")

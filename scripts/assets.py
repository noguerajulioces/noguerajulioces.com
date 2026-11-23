"""Fetches the Stack icons named in data/stack.ts (icon: "<slug>") into public/icons/, and the language flags into
public/flags/. Icons: Simple Icons (CC0). Flags: flag-icons (MIT). Files already present are kept. Safe to rerun.
Run from the project root after adding a tool to data/stack.ts: python3 -I scripts/assets.py"""
import pathlib, re, urllib.error, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
ICON = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/{}.svg"
FLAG = "https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/{}.svg"
FLAGS = ["py", "es", "br", "us"]


def fetch(url, dest):
    if dest.exists():
        return True
    try:
        data = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "assets-script"}), timeout=20).read()
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        raise
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    return True


slugs = re.findall(r'icon:\s*"([a-z0-9]+)"', (ROOT / "data" / "stack.ts").read_text())
missing = [slug for slug in slugs if not fetch(ICON.format(slug), ROOT / "public" / "icons" / f"{slug}.svg")]
for code in FLAGS:
    assert fetch(FLAG.format(code), ROOT / "public" / "flags" / f"{code}.svg"), code

print("icons:", len(slugs), "| not in Simple Icons (remove the icon from data/stack.ts):", ", ".join(missing) or "none")

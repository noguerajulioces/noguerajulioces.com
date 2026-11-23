"""Stamps every local CSS/JS reference with a hash of the file's content (?v=xxxxxxxx), so a browser
never keeps an old copy after a change. Safe to rerun; run it after editing any CSS or JS.
Run from the project root: python3 -I scripts/version-assets.py"""
import hashlib, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent


def stamp(text, name, digest):
    # href="name" / src="name" / from "./name", with or without an old ?v=
    pattern = rf'((?:href|src)="|from "\./){re.escape(name)}(?:\?v=[0-9a-f]+)?"'
    return re.sub(pattern, lambda m: f'{m.group(1)}{name}?v={digest}"', text)


def digest(name):
    return hashlib.sha256((ROOT / name).read_bytes()).hexdigest()[:8]


# Leaves first: journey.js imports globe.js, so globe's stamp goes into journey.js before journey is hashed.
order = ["globe.js", "journey.js", "field.js", "tokens.css", "components.css"]
importers = {"globe.js": ["journey.js"]}
pages = ["index.html", "guide-foundations.html"]

stamps = {}
for name in order:
    for importer in importers.get(name, []):
        path = ROOT / importer
        path.write_text(stamp(path.read_text(), name, digest(name)))
    stamps[name] = digest(name)

for page in pages:
    path = ROOT / page
    text = path.read_text()
    for name, d in stamps.items():
        text = stamp(text, name, d)
    path.write_text(text)

print("  ".join(f"{n}?v={d}" for n, d in stamps.items()))

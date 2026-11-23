"""Build every favicon from the jn mark in data/mark.json (the same drawing components/Mark.tsx renders in the top bar).

Pure Python (no PIL here); rsvg-convert rasterises, and the .ico is written by hand
(an .ico may hold PNG images, so it is a small header plus the PNG bytes).

Usage (from the project root): python3 -I scripts/make_favicons.py
Writes Next.js icon files to app/ (Next adds the <link> tags itself):
  app/icon.svg        modern browsers; switches ink and dot to the dark-theme colours on its own
  app/favicon.ico     16/32/48, for browsers that skip SVG favicons (Safari); paper tile so it reads in light and dark tabs
  app/apple-icon.png  180 px home-screen icon on paper (iOS rounds the corners)
"""
import json
import pathlib
import struct
import subprocess
import tempfile

RSVG = "/opt/homebrew/bin/rsvg-convert"
ROOT = pathlib.Path(__file__).resolve().parent.parent
MARK = json.loads((ROOT / "data/mark.json").read_text())

# Colours from styles/tokens.css: --color-text, --color-primary, --color-bg (light and dark)
INK, INK_DARK = "#1d1b18", "#ece6dc"
ACCENT, ACCENT_DARK = "#a8432a", "#e27a57"
PAPER = "#f5f3ee"


def mark(ink, accent, scale=1.0):
    """The mark as an SVG group, optionally scaled about the box centre."""
    centre = MARK["centre"]
    t = centre if scale == 1 else f"translate(16 16) scale({scale}) translate(-16 -16) {centre}"
    d = MARK["dot"]
    return (f'<g transform="{t}">'
            f'<path class="ink" d="{MARK["strokes"]}" fill="none" stroke="{ink}" stroke-width="{MARK["stroke"]}"/>'
            f'<circle class="dot" cx="{d["cx"]}" cy="{d["cy"]}" r="{d["r"]}" fill="{accent}"/></g>')


def svg(body, style=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{MARK["viewBox"]}">{style}{body}</svg>\n'


ADAPTIVE = svg(mark(INK, ACCENT), f"<style>@media (prefers-color-scheme:dark){{.ink{{stroke:{INK_DARK}}}.dot{{fill:{ACCENT_DARK}}}}}</style>")
TILE = svg(f'<rect width="32" height="32" rx="7" fill="{PAPER}"/>' + mark(INK, ACCENT, scale=0.82))
TOUCH = svg(f'<rect width="32" height="32" fill="{PAPER}"/>' + mark(INK, ACCENT, scale=0.62))


def png(svg_text, size):
    with tempfile.NamedTemporaryFile("w", suffix=".svg", delete=False) as f:
        f.write(svg_text)
    out = subprocess.run([RSVG, "-w", str(size), "-h", str(size), f.name], check=True, capture_output=True).stdout
    pathlib.Path(f.name).unlink()
    return out


def ico(images):
    """images: list of (size, png bytes). ICONDIR + one ICONDIRENTRY per image, then the PNGs."""
    header = struct.pack("<HHH", 0, 1, len(images))
    offset = 6 + 16 * len(images)
    entries, blobs = b"", b""
    for size, data in images:
        entries += struct.pack("<BBBBHHII", size % 256, size % 256, 0, 0, 1, 32, len(data), offset)
        blobs += data
        offset += len(data)
    return header + entries + blobs


APP = ROOT / "app"
(APP / "icon.svg").write_text(ADAPTIVE)
(APP / "favicon.ico").write_bytes(ico([(s, png(TILE, s)) for s in (16, 32, 48)]))
(APP / "apple-icon.png").write_bytes(png(TOUCH, 180))
print("app/icon.svg  app/favicon.ico (16, 32, 48)  app/apple-icon.png (180)")

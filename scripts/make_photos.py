"""Build the portfolio profile photo versions from the LinkedIn capture.

Pure Python (no PIL/numpy here); ffmpeg does decode, crop, resample and PNG
encode, cwebp does WebP, headless Chrome renders compare.png.

Usage (from the project root): python3 -I scripts/make_photos.py photo/source-linkedin-363.png <out_dir>
The page uses photo/photo-warm-mono-144.webp and photo/photo-warm-mono-288.webp; the other versions are rebuilt on demand.
"""
import math
import os
import subprocess
import sys
import urllib.parse

FFMPEG = "/opt/homebrew/bin/ffmpeg"
CWEBP = "/opt/homebrew/bin/cwebp"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Crop box in source pixels (363x363 capture). The hair reaches the top edge
# of the original upload, so the box starts at y=0 and centres the face in x.
CROP = dict(x=36, y=0, size=272)
SIZES = (144, 288)

INK = (0x1D, 0x1B, 0x18)
PAPER = (0xF5, 0xF3, 0xEE)
WARM_MID = (0x8C, 0x7C, 0x6A)  # warm midtone between ink and paper
HALFTONE_CELLS = 44  # dots across the tile


def ffmpeg_raw(src, size):
    c = CROP
    vf = f"crop={c['size']}:{c['size']}:{c['x']}:{c['y']},scale={size}:{size}:flags=lanczos"
    out = subprocess.run(
        [FFMPEG, "-v", "error", "-i", src, "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        check=True, capture_output=True).stdout
    assert len(out) == size * size * 3
    return [tuple(out[i:i + 3]) for i in range(0, len(out), 3)]


def write_outputs(pixels, size, out_dir, name):
    raw = bytes(v for p in pixels for v in p)
    png = os.path.join(out_dir, f"photo-{name}-{size}.png")
    subprocess.run(
        [FFMPEG, "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{size}x{size}",
         "-i", "-", "-frames:v", "1", "-pix_fmt", "rgb24", png], input=raw, check=True)
    webp = os.path.join(out_dir, f"photo-{name}-{size}.webp")
    # Flat two-colour dots compress smaller and stay crisp losslessly.
    mode = ["-lossless", "-z", "9"] if name == "halftone" else ["-q", "88", "-m", "6", "-sharp_yuv"]
    subprocess.run([CWEBP, "-quiet", *mode, png, "-o", webp], check=True)
    return png, webp


def clamp(v, lo=0.0, hi=1.0):
    return lo if v < lo else hi if v > hi else v


def luma(p):
    return (0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]) / 255.0


def percentile(values, q):
    s = sorted(values)
    return s[min(len(s) - 1, int(q * len(s)))]


def levels_from(pixels):
    ys = [luma(p) for p in pixels]
    return percentile(ys, 0.005), percentile(ys, 0.995)


def scurve(t, k):
    # Contrast around 0.5 that keeps 0 and 1 fixed; k=0 is identity.
    return clamp(t + k * (t - 0.5) * (1 - abs(2 * t - 1)))


def tone(v, lo, hi, k):
    return scurve(clamp((v - lo) / (hi - lo)), k)


def natural(pixels, lo, hi):
    out = []
    for p in pixels:
        out.append(tuple(round(255 * tone(c / 255.0, lo, hi, 0.12)) for c in p))
    return out


def mix(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def ramp(t):
    if t < 0.5:
        return mix(INK, WARM_MID, t / 0.5)
    return mix(WARM_MID, PAPER, (t - 0.5) / 0.5)


def warm_mono(pixels, lo, hi):
    return [ramp(tone(luma(p), lo, hi, 0.22)) for p in pixels]


def cell_darkness(pixels288, lo, hi):
    n, size = HALFTONE_CELLS, 288
    cell = size / n
    dark = [[0.0] * n for _ in range(n)]
    for cy in range(n):
        for cx in range(n):
            x0, x1 = int(cx * cell), int((cx + 1) * cell)
            y0, y1 = int(cy * cell), int((cy + 1) * cell)
            vals = [luma(pixels288[y * size + x]) for y in range(y0, y1) for x in range(x0, x1)]
            v = tone(sum(vals) / len(vals), lo, hi, 0.35)
            # Lift midtones so the grey wall and sweater fall back and the
            # face's shadows (hair, eyes, beard) carry the likeness.
            dark[cy][cx] = clamp((1.0 - v - 0.18) / 0.82) ** 1.5
    return dark


def halftone(dark, size):
    n = HALFTONE_CELLS
    cell = size / n
    rmax = cell * 0.6  # darkest dots just touch their neighbours
    radii = [[(rmax * math.sqrt(d) if d > 0.04 else 0.0) for d in row] for row in dark]
    out = []
    for y in range(size):
        py = y + 0.5
        cy0 = int(py / cell)
        for x in range(size):
            px = x + 0.5
            cx0 = int(px / cell)
            cov = 0.0
            for cy in (cy0 - 1, cy0, cy0 + 1):
                if not 0 <= cy < n:
                    continue
                for cx in (cx0 - 1, cx0, cx0 + 1):
                    if not 0 <= cx < n:
                        continue
                    r = radii[cy][cx]
                    if r <= 0:
                        continue
                    d = math.hypot(px - (cx + 0.5) * cell, py - (cy + 0.5) * cell)
                    c = clamp(r - d + 0.5)
                    if c > cov:
                        cov = c
            out.append(mix(PAPER, INK, cov))
    return out


COMPARE_HTML = """<!doctype html><html><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0}}
body{{font:500 13px/1.3 -apple-system,system-ui,sans-serif;width:{w}px}}
.panel{{padding:28px 32px 32px}}
.light{{background:#f5f3ee;color:#1d1b18;--b:#1d1b1824;--s:#fbfaf7;--m:#625c53}}
.dark{{background:#16140f;color:#ece6dc;--b:#ece6dc24;--s:#1d1a15;--m:#a59d90}}
h2{{font-size:13px;font-weight:600;margin-bottom:16px;color:var(--m)}}
.row{{display:flex;gap:24px;margin-bottom:22px}}
.cell{{width:288px}}
.cell p{{margin-top:8px;color:var(--m);font-size:12px}}
img{{display:block;border:1px solid var(--b);background:var(--s)}}
.s72{{width:72px;height:72px;border-radius:12px}}
.s288{{width:288px;height:288px;border-radius:48px}}
</style></head><body>{panels}</body></html>"""


def render_compare(out_dir, names, scratch):
    def url(name, size):
        return "file://" + urllib.parse.quote(os.path.join(out_dir, f"photo-{name}-{size}.png"))

    panels = []
    for theme, label in (("light", "Light paper #f5f3ee"), ("dark", "Dark paper #16140f")):
        r72 = "".join(f'<div class="cell"><img class="s72" src="{url(n, 144)}"><p>{n} · 72 px</p></div>' for n in names)
        r288 = "".join(f'<div class="cell"><img class="s288" src="{url(n, 288)}"><p>{n} · 288 px</p></div>' for n in names)
        panels.append(f'<section class="panel {theme}"><h2>{label}</h2><div class="row">{r72}</div><div class="row">{r288}</div></section>')
    width = 32 * 2 + 288 * 3 + 24 * 2
    html_path = os.path.join(scratch, "compare.html")
    with open(html_path, "w") as f:
        f.write(COMPARE_HTML.format(w=width, panels="".join(panels)))
    shot = os.path.join(out_dir, "compare.png")
    height = 2 * (28 + 16 + 17 + 72 + 8 + 16 + 22 + 288 + 8 + 16 + 22 + 32 - 22)
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
         f"--user-data-dir={os.path.join(scratch, 'chrome-profile')}", "--force-device-scale-factor=1",
         f"--window-size={width},{height}", f"--screenshot={shot}", "file://" + urllib.parse.quote(html_path)],
        check=True, capture_output=True)
    return shot, (width, height)


def main():
    src, out_dir = sys.argv[1], sys.argv[2]
    scratch = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(out_dir, exist_ok=True)
    img = {s: ffmpeg_raw(src, s) for s in SIZES}
    lo, hi = levels_from(img[288])
    print(f"levels lo={lo:.3f} hi={hi:.3f}")
    dark = cell_darkness(img[288], lo, hi)
    written = []
    for s in SIZES:
        written += write_outputs(natural(img[s], lo, hi), s, out_dir, "natural")
        written += write_outputs(warm_mono(img[s], lo, hi), s, out_dir, "warm-mono")
        written += write_outputs(halftone(dark, s), s, out_dir, "halftone")
    shot, dims = render_compare(out_dir, ("natural", "warm-mono", "halftone"), scratch)
    for p in written + [shot]:
        print(p, os.path.getsize(p))


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""One-off logo processing for Better Marinduque.

Takes src/assets/bettermarinduquelogo.png (JPEG with white background),
removes the background by flood-filling near-white pixels from the border,
then removes enclosed near-white pockets whose boundary is predominantly
island gold or already-transparent pixels (helmet highlights stay opaque).
Soft-mattes the edge (defringes), trims, and writes:

  src/assets/brand/bettermarinduque-logo.png  (<=600px, 256-colour palette)
  src/assets/brand/bettermarinduque-logo.webp (800px master)
  public/favicon-32.png                       (helmet-only square crop)
  public/apple-touch-icon.png                 (180x180, on primary-50 bg)
  public/icon-512.png                         (helmet crop, transparent)

Also writes white/dark composited previews + a favicon preview to /tmp.

Run with a venv that has pillow + numpy:
  python3 -m venv /tmp/logo-venv
  /tmp/logo-venv/bin/pip install pillow numpy
  /tmp/logo-venv/bin/python scripts/process-logo.py
"""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src/assets/bettermarinduquelogo.png'
OUT_DIR = ROOT / 'src/assets/brand'
PUBLIC = ROOT / 'public'

WHITE_MIN = 235  # all channels >= this counts as near-white
MAX_SAT = 20  # near-white must also be low-saturation
SOFT_PX = 2  # feather width for edge alpha
PAD_FRAC = 0.02  # trim padding
GOLD_HUE = (35.0, 48.0)  # island gold hue range
GOLD_SAT_MIN = 0.25
BOUNDARY_FRAC = 0.6  # fraction of boundary that must be gold/transparent
PNG_W = 600
WEBP_W = 800


def dilate(mask: np.ndarray) -> np.ndarray:
    m = mask.copy()
    m[1:, :] |= mask[:-1, :]
    m[:-1, :] |= mask[1:, :]
    m[:, 1:] |= mask[:, :-1]
    m[:, :-1] |= mask[:, 1:]
    return m


def hue_sat(rgb: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    f = rgb.astype(np.float32) / 255.0
    mx = f.max(axis=2)
    mn = f.min(axis=2)
    d = mx - mn
    sat = np.where(mx > 0, d / np.maximum(mx, 1e-9), 0.0)
    r, g, b = f[..., 0], f[..., 1], f[..., 2]
    hue = np.zeros(f.shape[:2], dtype=np.float32)
    m = d > 1e-6
    i = (mx == r) & m
    hue[i] = ((g[i] - b[i]) / d[i]) % 6
    i = (mx == g) & m
    hue[i] = (b[i] - r[i]) / d[i] + 2
    i = (mx == b) & m
    hue[i] = (r[i] - g[i]) / d[i] + 4
    return hue * 60, sat


def components(mask: np.ndarray, eight: bool = False):
    """Yield (pixel list) for each connected component of mask."""
    seen = np.zeros(mask.shape, dtype=bool)
    nbrs = [
        (-1, 0),
        (1, 0),
        (0, -1),
        (0, 1),
    ]
    if eight:
        nbrs += [(-1, -1), (-1, 1), (1, -1), (1, 1)]
    for y, x in zip(*np.where(mask & ~seen)):
        if seen[y, x]:
            continue
        q = deque([(y, x)])
        seen[y, x] = True
        pts = [(y, x)]
        while q:
            cy, cx = q.popleft()
            for dy, dx in nbrs:
                ny, nx = cy + dy, cx + dx
                if (
                    0 <= ny < mask.shape[0]
                    and 0 <= nx < mask.shape[1]
                    and mask[ny, nx]
                    and not seen[ny, nx]
                ):
                    seen[ny, nx] = True
                    q.append((ny, nx))
                    pts.append((ny, nx))
        yield pts


def main() -> None:
    img = Image.open(SRC).convert('RGB')
    rgb = np.asarray(img).astype(np.int32)
    h, w, _ = rgb.shape

    mn = rgb.min(axis=2)
    mx = rgb.max(axis=2)
    near_white = (mn >= WHITE_MIN) & ((mx - mn) <= MAX_SAT)

    # 1) flood fill near-white background from the border
    background = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near_white[y, x] and not background[y, x]:
                background[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if near_white[y, x] and not background[y, x]:
                background[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if (
                0 <= ny < h
                and 0 <= nx < w
                and not background[ny, nx]
                and near_white[ny, nx]
            ):
                background[ny, nx] = True
                q.append((ny, nx))

    # 2) enclosed near-white pockets: remove if boundary is mostly
    #    island gold or already-removed background
    hue, sat = hue_sat(rgb)
    gold = (hue >= GOLD_HUE[0]) & (hue <= GOLD_HUE[1]) & (sat >= GOLD_SAT_MIN)

    removed = []
    for pts in components(near_white & ~background):
        comp = np.zeros((h, w), dtype=bool)
        for y, x in pts:
            comp[y, x] = True
        # widen the ring past the JPEG halo so it reaches the real boundary
        ring = comp.copy()
        for _ in range(6):
            ring = dilate(ring)
        ring &= ~comp
        score = ((ring & gold).sum() + (ring & background).sum()) / max(
            ring.sum(), 1
        )
        arr = np.array(pts)
        x0, y0 = arr[:, 1].min(), arr[:, 0].min()
        x1, y1 = arr[:, 1].max() + 1, arr[:, 0].max() + 1
        if score >= 0.5:
            background |= comp
            removed.append(
                (len(pts), x0, y0, x1, y1, round(score, 2))
            )
    for area, x0, y0, x1, y1, score in removed:
        print(
            f'removed pocket: area={area}px bbox x{x0}..{x1} y{y0}..{y1} '
            f'(boundary gold/bg={score})'
        )

    # 3) soft matte + defringe around everything removed
    edge = background.copy()
    for _ in range(SOFT_PX):
        edge = dilate(edge)
    feather = edge & ~background

    whiteness = mn.astype(np.float32)
    a = np.clip((255.0 - whiteness) / (255.0 - WHITE_MIN), 0.0, 1.0)
    alpha = np.full((h, w), 255.0, dtype=np.float32)
    alpha[feather] = 255.0 * a[feather]
    alpha[background] = 0.0

    af = (alpha / 255.0)[..., None]
    defringed = np.clip(
        (rgb - 255.0 * (1.0 - af)) / np.maximum(af, 1e-3), 0, 255
    )
    out_rgb = np.where(feather[..., None], defringed, rgb).astype(np.uint8)

    rgba = np.dstack([out_rgb, alpha.astype(np.uint8)])
    out = Image.fromarray(rgba, 'RGBA')

    # trim to content bbox with padding
    ys, xs = np.where(alpha > 0)
    y0, y1 = ys.min(), ys.max() + 1
    x0, x1 = xs.min(), xs.max() + 1
    pad_x = int((x1 - x0) * PAD_FRAC)
    pad_y = int((y1 - y0) * PAD_FRAC)
    x0, x1 = max(0, x0 - pad_x), min(w, x1 + pad_x)
    y0, y1 = max(0, y0 - pad_y), min(h, y1 + pad_y)
    out = out.crop((x0, y0, x1, y1))

    # 800px master for webp + previews
    master = out
    if master.width > WEBP_W:
        master = master.resize(
            (WEBP_W, round(master.height * WEBP_W / master.width)),
            Image.LANCZOS,
        )
    master.save('/tmp/logo-master-800.png')
    print(f'master: {master.width}x{master.height}')

    # PNG fallback: 600px, 256-colour palette w/ alpha
    small = out.resize(
        (PNG_W, round(out.height * PNG_W / out.width)), Image.LANCZOS
    )
    quant = small.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    quant.save(OUT_DIR / 'bettermarinduque-logo.png', optimize=True)
    print(f'png: {small.width}x{small.height} (quantized)')

    # ---- favicon: square crop around the helmet figure only ----
    arr = np.asarray(out).astype(np.int32)
    oa = arr[..., 3]
    orgb = arr[..., :3]
    ohue, osat = hue_sat(orgb)
    gold_mask = (
        (oa > 0)
        & (ohue >= GOLD_HUE[0])
        & (ohue <= GOLD_HUE[1])
        & (osat >= GOLD_SAT_MIN)
    )
    # island = largest connected gold component (gold helmet accents survive)
    gold_comps = list(components(gold_mask))
    gold_comps.sort(key=len, reverse=True)
    island = np.zeros(gold_mask.shape, dtype=bool)
    for y, x in gold_comps[0]:
        island[y, x] = True

    # helmet figure = opaque, non-island pixels in the right part of the mark
    helmet_zone = np.zeros(island.shape, dtype=bool)
    helmet_zone[:, int(out.width * 0.45) :] = True
    non_island = (oa > 0) & ~island & helmet_zone
    comps = list(components(non_island))
    comps.sort(key=len, reverse=True)
    helmet = np.zeros(island.shape, dtype=bool)
    for p in comps[0]:
        helmet[p[0], p[1]] = True
    # include detached fragments (plumes) that sit clearly on the right
    for pts in comps[1:]:
        carr = np.array(pts)
        if carr[:, 1].min() > out.width * 0.55:
            for y, x in pts:
                helmet[y, x] = True
    ys, xs = np.where(helmet)
    hy0, hy1 = ys.min(), ys.max() + 1
    hx0, hx1 = xs.min(), xs.max() + 1
    pad = int(max(hx1 - hx0, hy1 - hy0) * 0.06)
    hx0, hx1 = max(0, hx0 - pad), min(out.width, hx1 + pad)
    hy0, hy1 = max(0, hy0 - pad), min(out.height, hy1 + pad)
    rough = np.asarray(out.crop((hx0, hy0, hx1, hy1))).copy()
    # erase island pixels inside the crop
    rough[..., 3] = np.where(
        island[hy0:hy1, hx0:hx1], 0, rough[..., 3]
    )
    erased = (rough[..., 3] == 0).sum() - (
        np.asarray(out.crop((hx0, hy0, hx1, hy1)))[..., 3] == 0
    ).sum()

    # keep only the helmet figure: the largest opaque component plus any
    # components that touch it after a 3px dilation (detached plumes)
    solid = rough[..., 3] > 32
    fig_comps = sorted(components(solid, eight=True), key=len, reverse=True)
    keep = np.zeros(solid.shape, dtype=bool)
    if fig_comps:
        main_fig = np.zeros(solid.shape, dtype=bool)
        for y, x in fig_comps[0]:
            main_fig[y, x] = True
        reach = main_fig.copy()
        for _ in range(3):
            reach = dilate(reach)
        for pts in fig_comps:
            carr = np.array(pts)
            comp = np.zeros(solid.shape, dtype=bool)
            comp[carr[:, 0], carr[:, 1]] = True
            if (comp & reach).any():
                keep |= comp
        dropped = solid.sum() - keep.sum()
    else:
        dropped = 0
    rough[..., 3] = np.where(keep, rough[..., 3], 0)

    # zero leftover low-alpha island-gold specks not adjacent to the figure
    kept_fig = dilate(keep)
    rrgb = rough[..., :3]
    rhue, rsat = hue_sat(rrgb)
    specks = (
        (rough[..., 3] > 0)
        & (rough[..., 3] < 96)
        & (rhue >= GOLD_HUE[0])
        & (rhue <= GOLD_HUE[1])
        & (rsat >= GOLD_SAT_MIN)
        & ~kept_fig
    )
    rough[..., 3] = np.where(specks, 0, rough[..., 3])
    print(
        f'favicon cleanup: {erased} island px erased, '
        f'{dropped} debris px dropped, {specks.sum()} gold specks zeroed'
    )
    rys, rxs = np.where(rough[..., 3] > 0)
    sq_img = Image.fromarray(rough, 'RGBA').crop(
        (rxs.min(), rys.min(), rxs.max() + 1, rys.max() + 1)
    )
    # pad ~6% and square
    sw, shh = sq_img.size
    side = int(max(sw, shh) * 1.06)
    sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    sq.paste(sq_img, ((side - sw) // 2, (side - shh) // 2))
    print(
        f'favicon crop: rough x{hx0}..{hx1} y{hy0}..{hy1}, '
        f'{erased} island px erased, final {sw}x{shh} in {side}sq'
    )

    sq.resize((32, 32), Image.LANCZOS).save(PUBLIC / 'favicon-32.png')
    sq.resize((512, 512), Image.LANCZOS).save(PUBLIC / 'icon-512.png')
    touch = Image.new('RGB', (180, 180), (230, 244, 243))  # primary-50
    t = sq.resize((164, 164), Image.LANCZOS)
    touch.paste(t, (8, 8), t)
    touch.save(PUBLIC / 'apple-touch-icon.png')
    print('favicons written to public/')

    # ---- previews ----
    for name, color in [('white', (255, 255, 255)), ('dark', (8, 42, 40))]:
        bg = Image.new('RGBA', master.size, color + (255,))
        bg.alpha_composite(master)
        p = f'/tmp/logo-preview-{name}.png'
        bg.convert('RGB').save(p)
        print(f'preview: {p}')
    fav_bg = Image.new('RGBA', (512, 512), (255, 255, 255, 255))
    fav_bg.alpha_composite(sq.resize((512, 512), Image.LANCZOS))
    fav_bg.convert('RGB').save('/tmp/favicon-preview-512.png')
    print('preview: /tmp/favicon-preview-512.png')


if __name__ == '__main__':
    main()

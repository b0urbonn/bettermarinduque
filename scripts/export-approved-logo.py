#!/usr/bin/env python3
"""Export the approved logo for the website. Requires Pillow.

Run: python scripts/export-approved-logo.py
The approved square artwork is fitted into each export without cropping.
The artwork and its white background are preserved without recoloring.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'design/brand/morion-reference-preview.png'
BRAND = ROOT / 'src/assets/brand'
PUBLIC = ROOT / 'public'

source = Image.open(SOURCE).convert('RGB')
# Retain the full approved sun, island, offshore islets and reference Morion.
assert source.width == source.height, 'Expected the approved square artwork'
emblem = source

def square(size: int) -> Image.Image:
    padding = max(1, round(size * 0.025))
    fitted = ImageOps.contain(emblem, (size - padding * 2, size - padding * 2), Image.Resampling.LANCZOS)
    canvas = Image.new('RGB', (size, size), 'white')
    canvas.paste(fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2))
    return canvas

BRAND.mkdir(parents=True, exist_ok=True)
master = square(800)
master.save(BRAND / 'bettermarinduque-emblem-v2.png', optimize=True)
master.save(BRAND / 'bettermarinduque-emblem-v2.webp', quality=90, method=6)
for size, name in [(32, 'favicon-32.png'), (180, 'apple-touch-icon.png'), (512, 'icon-512.png')]:
    square(size).save(PUBLIC / name, optimize=True)
print('Exported approved emblem, WebP fallback, and 32/180/512px icons.')

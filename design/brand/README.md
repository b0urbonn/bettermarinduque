# Approved BetterMarinduque logo

`approved-logo.png` is the user-approved concept: the larger Philippine sun
behind the upper-left of Marinduque, with a white side-view Morion inside.
It was created with the built-in imagegen tool and approved in conversation.

The production exports preserve the approved artwork on white. Transparent
imagegen exports introduced edge artifacts and were not used.

The website uses the emblem beside its existing accessible brand text, avoiding
a duplicated or unreadably small raster wordmark. The footer uses a white backing
to preserve the blue island on its dark background. The existing v1 assets are
retained as historical assets but are no longer imported by the logo component.

Regenerate current assets with Pillow installed:

```sh
python scripts/export-approved-logo.py
```

Outputs:

- `src/assets/brand/bettermarinduque-emblem-v2.png`
- `src/assets/brand/bettermarinduque-emblem-v2.webp`
- `public/favicon-32.png`
- `public/apple-touch-icon.png`
- `public/icon-512.png`

The crop only removes the presentation wordmark and outside whitespace. It does
not redraw the coastline, Morion, or sun. The approved concept remains a raster
identity, not a survey-grade geographic map.

Final approved generation instruction: enlarge the gold Philippine flag sun
approximately 25 percent, keep it behind the upper-left of the blue island,
adjust its overlap for balance, and preserve the map, offshore islets, white
side-view Morion, BetterGov blue, and wordmark from the previous revision.
Meaning: local heritage looking toward hope and progress.

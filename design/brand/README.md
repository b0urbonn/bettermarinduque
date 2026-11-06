# Approved BetterMarinduque logo

`morion-reference-preview.png` is the current user-approved artwork: the gold
Philippine sun behind the upper-left of Marinduque, with a white Morion mask
inspired by the central figure in the user's `images.jpeg` reference. It was
created with the built-in imagegen tool and approved in conversation.
`approved-logo.png` preserves the earlier side-view concept.

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

Exports fit the full square artwork with a small white margin without cropping
or redrawing the coastline, Morion, or sun. The approved concept remains a raster
identity, not a survey-grade geographic map.

Final approved generation instruction: replace the generic Roman soldier with
a white Morion mask inspired by the reference's wide eyes, curled moustache,
rounded beard and ornate helmet; preserve the blue island, offshore islets,
gold Philippine sun and white background.

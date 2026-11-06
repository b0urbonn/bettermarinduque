# Library Utilities

Shared helpers used across the portal.

## Files

- `markdownLoader.ts` — Loads service and government markdown content from
  `content/` via dynamic `import()`. Extracts the title from the first
  `# Heading` and the description from the first paragraph, and interpolates
  `{PLACEHOLDER}` tokens from companion JSON files or `VITE_*` env vars.
- `meilisearch.ts` — Optional Meilisearch client. Search is enabled only when
  `VITE_MEILISEARCH_HOST` is set.
- `budgetApi.ts` — URLs and helpers for the dedicated budget portal and the
  BetterGov.ph budget API.
- `transparencyFormat.ts` — Formatting helpers for fund amounts, dates, and
  totals in the transparency pages.
- `utils.ts` — `cn()` class-name helper (clsx + tailwind-merge).

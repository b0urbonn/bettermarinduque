# BetterMarinduque

A community-run civic information and transparency portal for the **Province of Marinduque**, Philippines — built by volunteers as part of the [BetterGov.ph](https://bettergov.ph) **Better LGU** movement.

![Version](https://img.shields.io/badge/version-0.3.0-green)
![License](https://img.shields.io/badge/license-CC0-blue)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

> BetterMarinduque is an **independent community initiative**. It is not the official website of the Provincial Government of Marinduque — for that, visit [marinduque.gov.ph](https://marinduque.gov.ph).

## About

BetterMarinduque organizes public information — service guides, government offices, municipal data, emergency hotlines, and public spending records — into one accessible portal for the people of Marinduque.

**Cost to the People of Marinduque = ₱0**

## Open Source for LGUs

This repository is open source under the **CC0** public domain dedication and is freely available for use, modification, and redistribution by anyone who wishes to build a portal for their own local government unit (LGU) across the Philippines.

To adapt this project for your LGU, fork the repository and customize the content, styling, and data sources to match your locality's requirements.

## Live Demo

Visit the live website: [bettermarinduque.vercel.app](https://bettermarinduque.vercel.app)

| Resource          | Link                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Website           | [bettermarinduque.vercel.app](https://bettermarinduque.vercel.app)                                                   |
| Source Code       | [b0urbonn/bettermarinduque](https://github.com/b0urbonn/bettermarinduque)                                            |
| Contributors      | [All contributors](https://github.com/b0urbonn/bettermarinduque/graphs/contributors)                                 |
| Directory listing | [better-lgu-directory](https://github.com/jmacj/better-lgu-directory) · [lgu.bettergov.ph](https://lgu.bettergov.ph) |
| License           | CC0 (public domain)                                                                                                  |

## Key Features

| Feature                      | Description                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Service Guides Directory** | Plain-language guides to provincial services — permits, health programs, scholarships, public markets, disaster preparedness      |
| **Municipalities**           | Per-town pages for all six municipalities — population, barangays, elected officials, photo galleries, and interactive boundaries |
| **Government Directory**     | Provincial departments, offices, and elected officials with contact information                                                   |
| **Transparency Trackers**    | Source-cited fund trackers: Marcopper settlement, circumferential road, disaster fund, national tax allotment, flood control      |
| **Provincial Statistics**    | Census figures, per-municipality population, barangay counts, and land area — all sourced to PSA                                  |
| **Legislative Section**      | Index of Sangguniang Panlalawigan ordinances and resolutions (in progress)                                                        |
| **Real-time Information**    | Live weather for Boac (Open-Meteo), USD→PHP exchange rate, and Philippine date/time                                               |
| **Emergency Hotline Bar**    | Always-visible emergency contacts; scrolling marquee on mobile and tablet with pause-on-hover                                     |
| **History Timeline**         | Animated provincial history from the Battle of Pulang Lupa (1900) to the present                                                  |
| **Multi-language Support**   | English and Filipino (`en`, `fil`) via i18next with fallback                                                                      |
| **Search**                   | Service-guide search across portal content                                                                                        |
| **Mobile Responsive**        | Card-based layouts that adapt from desktop to small phones                                                                        |
| **Accessibility**            | Skip links, ARIA labels, semantic HTML, keyboard navigation                                                                       |
| **SEO**                      | Per-page meta tags, Open Graph, and social cards via react-helmet                                                                 |

## Technology Stack

| Category         | Technologies                                                                       |
| ---------------- | ---------------------------------------------------------------------------------- |
| **Frontend**     | React 19, TypeScript                                                               |
| **Build**        | Vite, rolldown                                                                     |
| **Styling**      | Tailwind CSS v4, [@bettergov/kapwa](https://github.com/bettergov/kapwa) components |
| **Routing**      | React Router (`vercel.json` rewrites all paths to `index.html`)                    |
| **Icons**        | [Lucide](https://lucide.dev/)                                                      |
| **Fonts**        | Google Fonts (Inter)                                                               |
| **Content**      | YAML + Markdown files compiled at build time — no CMS, no backend                  |
| **i18n**         | i18next + HttpBackend (`public/locales/{en,fil}`)                                  |
| **Maps**         | OpenStreetMap embed, municipal boundary GeoJSON                                    |
| **APIs**         | Open-Meteo (weather), open.er-api.com (exchange rate), BetterGov.ph Budget API     |
| **Code Quality** | ESLint, Prettier (auto-format on commit via Husky + lint-staged)                   |
| **Hosting**      | Vercel                                                                             |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/b0urbonn/bettermarinduque.git

# Navigate to project directory
cd bettermarinduque

# Install dependencies
npm install

# Configure environment (optional for local dev)
cp env.example .env.local

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

## Development Commands

| Command                             | Description                            |
| ----------------------------------- | -------------------------------------- |
| `npm run dev`                       | Vite dev server at `localhost:5173`    |
| `npm run build`                     | `tsc -b` + production build to `dist/` |
| `npm run preview`                   | Serve the production build locally     |
| `npm run lint` / `npm run lint:fix` | ESLint check / autofix                 |
| `npm run format`                    | Format all files with Prettier         |
| `npm run dev:yaml`                  | Convert YAML to JSON, then start dev   |
| `npm run setup`                     | Interactive starter-kit setup prompts  |

Pre-commit runs `lint-staged` (ESLint + Prettier on staged files) via Husky.

## Environment Variables

All variables are optional for local dev — the site builds with sensible fallbacks. Set them in `.env.local` (gitignored) or in the Vercel project settings for production.

| Variable                                                                                     | Purpose                               |
| -------------------------------------------------------------------------------------------- | ------------------------------------- |
| `VITE_GOVERNMENT_NAME`                                                                       | Province name shown in branding       |
| `VITE_GOVERNMENT_TYPE`                                                                       | `Province` / `City` / `Municipality`  |
| `VITE_REGION`                                                                                | Region label (Marinduque is MIMAROPA) |
| `VITE_PROVINCE`                                                                              | Province for data lookups             |
| `VITE_WEBSITE_URL`                                                                           | Canonical URL used in SEO tags        |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_PHONE`                                                  | Contact points shown on the site      |
| `VITE_FACEBOOK_URL` / `VITE_TWITTER_URL` / `VITE_INSTAGRAM_URL` / `VITE_YOUTUBE_URL`         | Social links                          |
| `VITE_SITE_DESCRIPTION` / `VITE_SITE_KEYWORDS` / `VITE_OG_IMAGE_URL` / `VITE_TWITTER_HANDLE` | SEO / social cards                    |
| `VITE_GOOGLE_ANALYTICS_ID` / `VITE_FACEBOOK_PIXEL_ID`                                        | Optional analytics                    |

See `env.example` for the full template.

## Project Structure

```
bettermarinduque/
├── content/                # File-based content (Markdown + YAML)
│   ├── government/         # Government pages: {category}/index.yaml + {page}.md
│   ├── services/           # Service guides:  {category}/index.yaml + {page}.md
│   └── transparency/       # Trackers & disclosures (YAML, source-cited)
├── public/
│   └── locales/{en,fil}/   # UI translations (common.json)
├── src/
│   ├── assets/             # Hero and section images
│   ├── components/
│   │   ├── brand/          # Logo, Marinduque map, hero graphics, motion CSS
│   │   ├── government/     # Government section views
│   │   ├── home/           # Home sections (HeroV2, ServicesGrid, StatsCards,
│   │   │                   #  WeatherMap, HistorySection, UpdatesSection,
│   │   │                   #  Leadership, ContactCards, Hotlines, Municipalities)
│   │   ├── layout/         # HotlineBar, Navbar, InfoBar, Footer
│   │   ├── sections/       # Shared sections (Hero)
│   │   ├── transparency/   # Tracker views, charts (AmountBar, YearlyBarChart)
│   │   └── ui/             # Primitives (Section, Heading, Card, PageHeader…)
│   ├── data/               # Static data + YAML loaders (province, municipalities,
│   │                       #  hotlines, news, navigation, transparency)
│   ├── lib/                # markdownLoader, yamlLoader, formatters
│   ├── pages/              # Route pages (Home, Statistics, Legislative, News,
│   │                       #  Contact, Faq, Services, Government, Transparency…)
│   └── types/              # Shared TypeScript types
├── index.html              # SPA entry
├── vercel.json             # SPA rewrites for Vercel
├── package.json            # Node.js configuration
└── README.md               # Project documentation
```

## Content System

Content is plain Markdown and YAML committed to this repo — no CMS, no database.

- **Add/edit a page**: edit the `.md` file under `content/services/{category}/` or `content/government/{category}/`. The first `# Heading` becomes the page title; the first paragraph becomes its description.
- **List a page**: add it to that category's `index.yaml`.
- **New category**: also register its `index.yaml` in the loader map (`categoryIndexMap` / `govCategoryIndexMap` in `src/data/yamlLoader.ts`) and add an entry to `src/data/services.yaml` or `src/data/government.yaml`. The `icon` field takes any [Lucide](https://lucide.dev/) icon name.
- **Transparency trackers**: add `content/transparency/{slug}.yaml`, list it in `index.yaml`, and register it in `src/data/transparency.ts`.
- **Template placeholders**: a `.md` file can have a same-named `.json` companion; `{PLACEHOLDER}` tokens in the markdown are filled from it (falling back to `VITE_*` env vars).

Guides: [CONTENT-GUIDE.md](CONTENT-GUIDE.md) · [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) (non-technical editing)

## Data Provenance

Transparency figures are **appropriations and public-record amounts**, not audited spending. Every amount shown on the portal carries a citation in its YAML file — the document title, publisher, and URL — plus a snapshot/`lastUpdated` date.

| Source                                                                                                                                           | Used for                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| [marinduque.gov.ph](https://marinduque.gov.ph)                                                                                                   | Provincial reports, emergency directory, officials    |
| [PSA](https://rssomimaropa.psa.gov.ph)                                                                                                           | 2024 census population, PSGC codes, land area         |
| [BetterGov.ph Budget API](https://data.bettergov.ph/)                                                                                            | Enacted GAA line items naming Marinduque              |
| [DBM](https://www.dbm.gov.ph)                                                                                                                    | National Tax Allotment / Local Budget Memoranda       |
| [DILG FDPP](https://fdpp.dilg.gov.ph)                                                                                                            | Budgets, procurement, financial reports               |
| [COA](https://www.coa.gov.ph), [PhilGEPS](https://www.philgeps.gov.ph), [DPWH](https://transparency.dpwh.gov.ph/), [FOI](https://www.foi.gov.ph) | Audits, awards, project disclosures, records requests |

## Disclosures & Disclaimers

- **Independence.** BetterMarinduque is a volunteer-run community project. It is **not operated by, affiliated with, endorsed by, or officially connected to** the Provincial Government of Marinduque or any government agency. The official provincial website is [marinduque.gov.ph](https://marinduque.gov.ph).
- **Informational purpose only.** Content is provided for civic information and convenience. It is **not legal advice** and is not a channel for official transactions — permits, payments, filings, and records requests must be done through the proper government offices.
- **Accuracy and currency.** Information is compiled from public sources on a best-effort basis and may lag or differ from official records. Where a conflict exists, **the official government publication prevails**. Found an error? [Open an issue](../../issues) — corrections are the point of the project.
- **Public records.** The portal republishes information that Philippine law and policy already make public (e.g., the DILG Full Disclosure Policy). No privileged or personal data is published.
- **Names and marks.** Government office names, official titles, and agency names belong to their respective owners and are used here solely for identification.
- **Privacy.** The site is static: no accounts, no forms collecting personal data, no cookies set by the app itself. Optional analytics are off unless configured via env vars.
- **No warranty.** Provided "as is", without warranty of any kind, to the extent permitted by law.

## Contributing

Corrections and updates are welcome — especially from Marinduqueños. No fix is too small.

| Contribution type                                                     | What you need                                                                                                                                                         |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content** — service guides, government pages, transparency trackers | Just a GitHub account. Everything in `content/` is plain Markdown/YAML, editable right on GitHub. Non-technical guide: [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) |
| **Code** — UI, components, tooling                                    | Node.js 18+ and npm. Clone, `npm install`, `npm run dev` — see [Quick Start](#quick-start)                                                                            |

### Before opening a PR

1. Fork the repo, create a branch, make your change.
2. Run the checks:

   ```bash
   npm run lint      # ESLint
   npm run build     # TypeScript check + production build
   ```

3. For content changes, also run `npm run dev` and click through the pages you touched — check titles, formatting, and that links work.

### PR checklist

In your PR description, tell reviewers:

- **What changed or was added** — one or two sentences
- **Why** — link the issue or source this is based on
- **Tested?** — check what you verified:
  - [ ] `npm run lint` passes
  - [ ] `npm run build` succeeds
  - [ ] Checked the affected pages in `npm run dev`
  - [ ] Screenshots included for UI or layout changes
- **Sources** — for transparency figures or factual claims, cite the document/URL

## Maintainers & Contributors

- [@b0urbonn](https://github.com/b0urbonn) — maintainer of record for the Marinduque Province entry in the BetterGov.ph LGU Directory
- [All contributors](https://github.com/b0urbonn/bettermarinduque/graphs/contributors) — everyone who has helped build this portal

## Acknowledgments

- Design and content inspiration from [BetterSolano.org](https://github.com/BetterSolano/bettersolano)
- Built on the BetterGov.ph LGU starter kit by [iyanski](https://github.com/iyanski) and contributors
- UI components from [@bettergov/kapwa](https://github.com/bettergov/kapwa)
- Icons by [Lucide](https://lucide.dev/)

## License

- **Code**: [CC0](LICENSE) — public domain. Fork it, reuse it, build a portal for your own LGU.
- **Third-party data**: government documents and budget data remain the property of their publishers and are cited under fair informational use.

---

**Volunteer-led. Open source. Community-driven.** Made with ❤️ for Marinduque.

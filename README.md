# 🏝️ BetterMarinduque

A community-run civic information and transparency portal for the **Province of Marinduque**, Philippines — built by volunteers as part of the [BetterGov.ph](https://bettergov.ph) **Better LGU** movement.

**Live site:** [bettermarinduque.vercel.app](https://bettermarinduque.vercel.app)
**Directory listing:** [better-lgu-directory](https://github.com/jmacj/better-lgu-directory) · [lgu.bettergov.ph](https://lgu.bettergov.ph)

> BetterMarinduque is an **independent community initiative**. It is not the official website of the Provincial Government of Marinduque — for that, visit [marinduque.gov.ph](https://marinduque.gov.ph).

---

## 📋 What's Inside

| Section             | Route           | Contents                                                                                                                |
| ------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 🏠 **Home**         | `/`             | Province overview, municipalities, emergency hotlines, quick links to common tasks                                      |
| ℹ️ **About**        | `/about`        | What this portal is, who runs it, and how it relates to the official government                                         |
| 🛎️ **Services**     | `/services`     | Plain-language guides to local services — permits, health programs, scholarships, public markets, disaster preparedness |
| 🏛️ **Government**   | `/government`   | Provincial departments and offices, executive officials, Sangguniang Panlalawigan                                       |
| 💰 **Transparency** | `/transparency` | Provincial disclosures, national budget line items, and fund trackers                                                   |
| 🔍 **Search**       | `/search`       | Full-text search across portal content                                                                                  |

### Transparency trackers

| Tracker                    | What it covers                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Marcopper Settlement Fund  | The US$100M Barrick settlement — payments received, installments, contested claims, use of funds |
| Circumferential Road Funds | National budget items and DPWH contracts for the Marinduque Circumferential Road                 |
| Provincial Disaster Fund   | The Local DRRM Fund — the mandated 5% of revenue and documented use                              |
| National Tax Allotment     | Marinduque's share of national taxes, per DBM allotments                                         |
| Flood Control Projects     | DPWH flood mitigation budgets, awards, and reporting channels                                    |

Each figure links to its source document — see [Data Provenance](#-data-provenance).

## 🛠️ Tech Stack

- **React 19 + TypeScript + Vite** — SPA frontend
- **Tailwind CSS v4** — styling, with [@bettergov/kapwa](https://github.com/bettergov/kapwa) components
- **React Router** — client-side routing (`vercel.json` rewrites all paths to `index.html`)
- **i18next** — English and Filipino (`en`, `fil`) translations in `public/locales/`
- **YAML + Markdown** — file-based content, compiled at build time (no CMS, no backend)
- **Vercel** — hosting and CDN

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/b0urbonn/bettermarinduque.git
cd bettermarinduque
npm install
cp env.example .env.local   # then fill in values
npm run dev
```

Open `http://localhost:5173`.

### Environment variables

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

### Scripts

| Command                             | What it does                           |
| ----------------------------------- | -------------------------------------- |
| `npm run dev`                       | Vite dev server at `localhost:5173`    |
| `npm run build`                     | `tsc -b` + production build to `dist/` |
| `npm run preview`                   | Serve the production build locally     |
| `npm run lint` / `npm run lint:fix` | ESLint check / autofix                 |
| `npm run format`                    | Prettier                               |
| `npm run setup`                     | Interactive starter-kit setup prompts  |

Pre-commit runs `lint-staged` (ESLint + Prettier on staged files) via Husky.

## 📁 Project Structure

```
content/
├── government/            # Government pages: {category}/index.yaml + {page}.md
├── services/              # Service guides:  {category}/index.yaml + {page}.md
└── transparency/          # Trackers & disclosures (YAML, source-cited)

public/
└── locales/{en,fil}/      # UI translations (common.json)

src/
├── components/
│   ├── brand/             # Logo, Marinduque map, hero graphics, motion CSS
│   ├── government/        # Government section views
│   ├── home/              # Home sections (municipalities, hotlines, about…)
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Shared sections (Hero)
│   ├── transparency/      # Tracker views, charts (AmountBar, YearlyBarChart)
│   └── ui/                # Primitives (Section, Heading, Card, PageHeader…)
├── data/                  # Static data + YAML loaders (see Content System)
├── lib/                   # markdownLoader, yamlLoader, formatters
├── pages/                 # Route pages
└── types/                 # Shared TypeScript types
```

## ✏️ Content System

Content is plain Markdown and YAML committed to this repo — no CMS, no database.

- **Add/edit a page**: edit the `.md` file under `content/services/{category}/` or `content/government/{category}/`. The first `# Heading` becomes the page title; the first paragraph becomes its description.
- **List a page**: add it to that category's `index.yaml`.
- **New category**: also register its `index.yaml` in the loader map (`categoryIndexMap` / `govCategoryIndexMap` in `src/data/yamlLoader.ts`) and add an entry to `src/data/services.yaml` or `src/data/government.yaml`. The `icon` field takes any [Lucide](https://lucide.dev/) icon name.
- **Transparency trackers**: add `content/transparency/{slug}.yaml`, list it in `index.yaml`, and register it in `src/data/transparency.ts`.
- **Template placeholders**: a `.md` file can have a same-named `.json` companion; `{PLACEHOLDER}` tokens in the markdown are filled from it (falling back to `VITE_*` env vars).

Guides: [CONTENT-GUIDE.md](CONTENT-GUIDE.md) · [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) (non-technical editing)

## 📚 Data Provenance

Transparency figures are **appropriations and public-record amounts**, not audited spending. Every amount shown on the portal carries a citation in its YAML file — the document title, publisher, and URL — plus a snapshot/`lastUpdated` date.

**Primary sources used:**

- [marinduque.gov.ph](https://marinduque.gov.ph) — provincial reports and accomplishment reports
- [BetterGov.ph Budget API](https://data.bettergov.ph/) — enacted GAA line items naming Marinduque
- [DBM](https://www.dbm.gov.ph) — National Tax Allotment / Local Budget Memoranda
- [DILG Full Disclosure Policy Portal](https://fdpp.dilg.gov.ph) — budgets, procurement, financial reports
- [Commission on Audit](https://www.coa.gov.ph), [PhilGEPS](https://www.philgeps.gov.ph), [DPWH Transparency](https://transparency.dpwh.gov.ph/), [FOI](https://www.foi.gov.ph)

The Transparency page links all of these as "official sources" so visitors can verify or request documents not yet tracked.

## ⚖️ Disclosures & Disclaimers

- **Independence.** BetterMarinduque is a volunteer-run community project. It is **not operated by, affiliated with, endorsed by, or officially connected to** the Provincial Government of Marinduque or any government agency. The official provincial website is [marinduque.gov.ph](https://marinduque.gov.ph).
- **Informational purpose only.** Content is provided for civic information and convenience. It is **not legal advice** and is not a channel for official transactions — permits, payments, filings, and records requests must be done through the proper government offices.
- **Accuracy and currency.** Information is compiled from public sources on a best-effort basis and may lag or differ from official records. Where a conflict exists, **the official government publication prevails**. Found an error? [Open an issue](../../issues) — corrections are the point of the project.
- **Public records.** The portal republishes information that Philippine law and policy already make public (e.g., the DILG Full Disclosure Policy). No privileged or personal data is published.
- **Names and marks.** Government office names, official titles, and agency names belong to their respective owners and are used here solely for identification.
- **Privacy.** The site is static: no accounts, no forms collecting personal data, no cookies set by the app itself. Optional analytics are off unless configured via env vars.
- **No warranty.** Provided "as is", without warranty of any kind, to the extent permitted by law.

## 🤝 Contributing

Corrections and updates are welcome — especially from Marinduqueños.

- **Wrong or outdated info?** Open an issue or a PR — even a one-line fix helps
- **Content edits**: everything in `content/` is plain Markdown/YAML, editable right on GitHub — see [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md)
- **Code**: run `npm run lint && npm run build` before opening a PR

## 👥 Maintainer

- [@b0urbonn](https://github.com/b0urbonn) — maintainer of record for the Marinduque Province entry in the BetterGov.ph LGU Directory

## 📄 License

- **Code**: [CC0](LICENSE) — public domain. Fork it, reuse it, build a portal for your own LGU.
- **Third-party data**: government documents and budget data remain the property of their publishers and are cited under fair informational use.

## 🙏 Acknowledgments

- Built on the BetterGov.ph LGU starter kit by [iyanski](https://github.com/iyanski) and contributors
- UI components from [@bettergov/kapwa](https://github.com/bettergov/kapwa)
- Icons by [Lucide](https://lucide.dev/)

---

**Volunteer-led. Open source. Community-driven.** Made with ❤️ for Marinduque.

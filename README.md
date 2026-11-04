# 🏝️ BetterMarinduque

A community-run civic information and transparency portal for the **Province of Marinduque**, Philippines — built by volunteers as part of the [BetterGov.ph](https://bettergov.ph) **Better LGU** movement.

**Live site:** [bettermarinduque.vercel.app](https://bettermarinduque.vercel.app)
**Directory listing:** [better-lgu-directory](https://github.com/jmacj/better-lgu-directory)

> BetterMarinduque is an **independent community initiative**. It is not the official website of the Provincial Government of Marinduque — for that, visit [marinduque.gov.ph](https://marinduque.gov.ph).

## 📋 What's Inside

- **🏠 Home** — Province overview, municipalities, emergency hotlines, and quick links to common tasks
- **🛎️ Services** — Plain-language guides to local government services (permits, health, scholarships, markets, disaster preparedness)
- **🏛️ Government** — Provincial departments and offices, executive officials, and the Sangguniang Panlalawigan
- **💰 Transparency** — Provincial disclosures, national budget line items for Marinduque, and fund trackers (National Tax Allotment, disaster fund, MarCopper, flood control, circumferential road)
- **🔍 Search** — Full-text search across portal content
- **🌐 Multilingual** — English and Filipino (`en`, `fil`) via i18next

## 🛠️ Tech Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** with [@bettergov/kapwa](https://github.com/bettergov/kapwa) components
- **React Router** — SPA routing
- **i18next** — internationalization
- **YAML + Markdown** — file-based content system (no CMS needed)
- Deployed on **Vercel**

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/b0urbonn/bettermarinduque.git
cd bettermarinduque
npm install
npm run dev
```

Open `http://localhost:5173`.

### Scripts

- `npm run dev` — Start the Vite dev server
- `npm run build` — TypeScript check + production build
- `npm run preview` — Preview the production build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` — Prettier

## 📁 Project Structure

```
content/
├── government/         # Government section pages (markdown + index.yaml)
├── services/           # Service guide pages (markdown + index.yaml)
└── transparency/       # Fund trackers, budget and disclosure data (YAML)

src/
├── components/
│   ├── brand/          # Logo, map and hero graphics
│   ├── government/     # Government section views
│   ├── home/           # Home page sections
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Shared sections (Hero)
│   ├── transparency/   # Transparency views and charts
│   └── ui/             # Reusable primitives (Section, Heading, Card…)
├── data/               # Static data (directories, boundaries, navigation…)
├── lib/                # Markdown/YAML loaders, helpers
└── pages/              # Route pages (Home, Services, Government, Transparency…)
```

## ✏️ Updating Content

Most content lives in `content/` as Markdown and YAML — no code changes needed for typical updates:

- Edit a `.md` page to update service or office information
- Edit `index.yaml` files to add pages or listings
- Transparency figures live in `content/transparency/*.yaml`

See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) and [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) for details.

## 🤝 Contributing

Corrections and updates are welcome — especially from Marinduqueños.

- **Wrong or outdated info?** Open an issue or a PR — even a one-line fix helps
- **Content edits**: everything in `content/` is plain Markdown/YAML and can be edited right on GitHub
- **Code**: run `npm run lint && npm run build` before opening a PR

### Data Sources

- [marinduque.gov.ph](https://marinduque.gov.ph) — official provincial website
- [BetterGov.ph Budget API](https://data.bettergov.ph/) — national budget line items
- DILG Full Disclosure Policy publications, COA, DBM open data

## 👥 Maintainer

- [@b0urbonn](https://github.com/b0urbonn) — Marinduque Province entry, BetterGov.ph LGU Directory

## 📄 License

[CC0](LICENSE) — public domain. Fork it, reuse it, build a portal for your own LGU.

## 🙏 Acknowledgments

- Built on the BetterGov.ph LGU starter kit by [iyanski](https://github.com/iyanski) and contributors
- UI components from [@bettergov/kapwa](https://github.com/bettergov/kapwa)
- Icons by [Lucide](https://lucide.dev/)

---

**Volunteer-led. Open source. Community-driven.** Made with ❤️ for Marinduque.

/**
 * Live Marinduque figures from the BetterGov.ph Budget API
 * (https://budget.bettergov.ph/docs). Read-only; the API is edge-cached.
 *
 * The API places DPWH money by office and finds other lines by name, so a
 * project is here either because the documents list it under the Marinduque
 * DEO or because its title names the province or one of its towns. Rules kept
 * from the API: amounts are pesos as published (null means "no such line",
 * never zero); the NEP and the House bill are two versions of one budget —
 * compared, never added; "only" statuses are candidates, not confirmed
 * changes. A town is read from the title text: matched, not surveyed.
 */
import { municipalities } from '../data/municipalities';

const ROOT = 'https://budget.bettergov.ph/api/v1/hgab/2027';
export const DISTRICT_URL =
  'https://budget.bettergov.ph/hgab/2027/districts/leg%3Amarinduque%3Alone';
/** The dedicated budget portal (transparency-portal fork). Set VITE_PORTAL_URL
 *  to wherever it is deployed; the fallback is its live Vercel domain. */
export const PORTAL_URL = (
  import.meta.env.VITE_PORTAL_URL ||
  'https://budget-bettermarinduque.vercel.app'
).replace(/\/+$/, '');

const OFFICE = 'Marinduque District Engineering Office';
const REGION = 'MIMAROPA';
/** 2027 title searches. "Santa Cruz" is left out: the name is shared with
 *  towns elsewhere in MIMAROPA, and its projects all carry "Marinduque". */
const PLACES = [
  'Marinduque',
  'Boac',
  'Buenavista',
  'Gasan',
  'Mogpog',
  'Torrijos',
];
const DATASETS = ['dpwh', 'fmr', 'hfep', 'nia'] as const;
type DatasetKey = (typeof DATASETS)[number];

export const TOWNS = municipalities.map(m => m.name);

/** Lines found by name that are not Marinduque's; kept out of every figure. */
const EXCLUDED: Record<string, string> = {
  'dpwh:house-reading:10551':
    'Barangay Buenavista, Puerto Princesa City, Palawan — not the town.',
  'dpwh:house-reading:10577':
    'Barangay Buenavista, Looc, Romblon — not the town.',
  'nia:house_only:ib:p932:r2':
    'A "Buenavista CIS" that gives no province; unverifiable as Marinduque\u2019s.',
};
export const EXCLUSIONS = Object.values(EXCLUDED);

export type BridgeGroup =
  | 'house_only'
  | 'nep_only'
  | 'unchanged'
  | 'increased'
  | 'decreased'
  | 'scope_review';

interface ApiRow {
  id: string;
  dataset: string;
  title: string;
  program: string | null;
  office: string | null;
  region: string | null;
  region_key: string | null;
  status_label: string;
  bridge_group: BridgeGroup;
  held: boolean;
  nep_php: number | null;
  house_php: number | null;
  delta_php: number | null;
  url: string;
}

export interface BudgetProject {
  key: string;
  id: string;
  dataset: DatasetKey;
  title: string;
  program: string | null;
  office: string | null;
  region: string | null;
  group: BridgeGroup;
  statusLabel: string;
  held: boolean;
  nep: number | null;
  house: number | null;
  change: number | null;
  /** Towns the title names (matched, not surveyed). */
  towns: string[];
  url: string;
}

interface OfficeYear {
  fy: number;
  stage: string;
  stage_label: string;
  php: number | null;
}

export interface DistrictInfo {
  label: string;
  representative: string | null;
  representativeUrl: string | null;
  officeName: string;
  tierText: string;
  years: OfficeYear[];
}

interface Envelope<T> {
  data: T;
}

async function get<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(ROOT + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`Budget API ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

/* ----------------------------- municipality lens ----------------------------- */

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\bsta\.?\b/g, 'santa')
    .replace(/\bsto\.?\b/g, 'santo');
}

const townPatterns = new Map<string, RegExp>();
function townPattern(name: string): RegExp {
  let re = townPatterns.get(name);
  if (!re) {
    const words = normalise(name)
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
    re = new RegExp(`(^|[^a-z0-9])${words.join('[^a-z0-9]+')}([^a-z0-9]|$)`);
    townPatterns.set(name, re);
  }
  return re;
}

/** The municipality names a title carries, in the data file's order. */
export function townsOf(title: string): string[] {
  const hay = normalise(title);
  return TOWNS.filter(t => townPattern(t).test(hay));
}

/* --------------------------------- queries --------------------------------- */

async function allRows(dataset: DatasetKey, params: Record<string, string>) {
  const first = await get<Envelope<{ total: number; rows: ApiRow[] }>>(
    `/datasets/${dataset}/projects`,
    { ...params, limit: '200' }
  );
  return first.data.rows;
}

/** Every FY 2027 line in scope, deduplicated, exclusions removed, house-first. */
export async function loadProjects(): Promise<BudgetProject[]> {
  const jobs: [DatasetKey, Record<string, string>, boolean][] = [
    ['dpwh', { office: OFFICE }, false],
    ...PLACES.flatMap(place =>
      DATASETS.map((dataset): [DatasetKey, Record<string, string>, boolean] => [
        dataset,
        { q: place },
        true,
      ])
    ),
  ];
  const results = await Promise.all(jobs.map(([d, p]) => allRows(d, p)));

  const byKey = new Map<string, BudgetProject>();
  jobs.forEach(([, , byName], i) => {
    for (const r of results[i]) {
      // Region rule, applied here: keep MIMAROPA rows and rows with no region.
      if (byName && r.region_key != null && r.region_key !== REGION) continue;
      const key = `${r.dataset}:${r.id}`;
      if (!byKey.has(key)) {
        byKey.set(key, {
          key,
          id: r.id,
          dataset: r.dataset as DatasetKey,
          title: r.title,
          program: r.program,
          office: r.office,
          region: r.region,
          group: r.bridge_group,
          statusLabel: r.status_label,
          held: r.held,
          nep: r.nep_php,
          house: r.house_php,
          change: r.delta_php,
          towns: townsOf(r.title),
          url: r.url,
        });
      }
    }
  });

  return [...byKey.values()]
    .filter(p => !EXCLUDED[p.key])
    .sort(
      (a, b) =>
        (b.house ?? -1) - (a.house ?? -1) || (b.nep ?? -1) - (a.nep ?? -1)
    );
}

/** The district card: representative and the DEO's per-year appropriations. */
export async function loadDistrict(): Promise<DistrictInfo> {
  const res = await get<
    Envelope<{
      label: string;
      representative: { name: string; profile_url: string | null } | null;
      offices: { name: string; tier_text: string; years?: OfficeYear[] }[];
    }>
  >(`/districts/${encodeURIComponent('leg:marinduque:lone')}`);
  const d = res.data;
  const office =
    d.offices.find(o => o.name.includes('Marinduque')) ?? d.offices[0];
  return {
    label: d.label,
    representative: d.representative?.name ?? null,
    representativeUrl: d.representative?.profile_url ?? null,
    officeName: office?.name ?? OFFICE,
    tierText: office?.tier_text ?? '',
    years: office?.years ?? [],
  };
}

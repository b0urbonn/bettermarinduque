import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { nationalBudget } from '../../data/transparency';
import {
  DISTRICT_URL,
  PORTAL_URL,
  TOWNS,
  loadDistrict,
  loadProjects,
  type BudgetProject,
  type DistrictInfo,
} from '../../lib/budgetApi';
import { formatMoney } from '../../lib/transparencyFormat';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import AmountBar from './AmountBar';
import YearlyBarChart from './YearlyBarChart';

const pesos = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
});

const NO_TOWN = '_none';
const CONGRESSES: [string, number[]][] = [
  ['18th Congress', [2020, 2021, 2022]],
  ['19th Congress', [2023, 2024, 2025]],
  ['20th Congress', [2026]],
];

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'ready';
      projects: BudgetProject[];
      district: DistrictInfo | null;
    };

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded border border-gray-300 bg-white p-5">
      <dt className="text-sm text-gray-700">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-gray-900">
        {value}
      </dd>
      {sub && <dd className="mt-1 text-xs text-gray-600">{sub}</dd>}
    </div>
  );
}

export default function NationalBudgetView() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true;
    Promise.all([loadProjects(), loadDistrict().catch(() => null)]).then(
      ([projects, district]) =>
        live && setState({ status: 'ready', projects, district }),
      (error: unknown) =>
        live &&
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : String(error),
        })
    );
    return () => {
      live = false;
    };
  }, [attempt]);

  return (
    <>
      {state.status === 'loading' && (
        <Section>
          <p className="text-sm text-gray-700" role="status">
            Loading live figures from the BetterGov.ph Budget API…
          </p>
        </Section>
      )}
      {state.status === 'error' && (
        <Section>
          <p className="text-sm text-gray-900">
            <strong>Could not load the live budget data.</strong>{' '}
            {state.message}
          </p>
          <button
            type="button"
            onClick={() => {
              setState({ status: 'loading' });
              setAttempt(n => n + 1);
            }}
            className="mt-3 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
          >
            Try again
          </button>
        </Section>
      )}
      {state.status === 'ready' && (
        <LiveView projects={state.projects} district={state.district} />
      )}
    </>
  );
}

function LiveView({
  projects,
  district,
}: {
  projects: BudgetProject[];
  district: DistrictInfo | null;
}) {
  const sums = useMemo(() => {
    let nep = 0;
    let house = 0;
    for (const p of projects) {
      nep += p.nep ?? 0;
      house += p.house ?? 0;
    }
    return { nep, house };
  }, [projects]);

  const munCells = useMemo(() => {
    const cells = new Map<string, { rows: number; house: number }>(
      TOWNS.map(t => [t, { rows: 0, house: 0 }])
    );
    const untagged = { rows: 0, house: 0 };
    for (const p of projects) {
      if (!p.towns.length) {
        untagged.rows++;
        untagged.house += p.house ?? 0;
      }
      for (const t of p.towns) {
        const c = cells.get(t);
        if (c) {
          c.rows++;
          c.house += p.house ?? 0;
        }
      }
    }
    return { cells, untagged };
  }, [projects]);

  const officeYears = useMemo(() => {
    if (!district) return [];
    const gaa = district.years
      .filter(y => y.stage === 'gaa')
      .sort((a, b) => a.fy - b.fy);
    const nep = district.years.find(y => y.fy === 2027 && y.stage === 'nep');
    const house = district.years.find(
      y => y.fy === 2027 && y.stage === 'hgab3'
    );
    return [
      ...gaa.map(y => ({ label: `FY ${y.fy} · Enacted (GAA)`, amount: y.php })),
      { label: 'FY 2027 · NEP', amount: nep?.php ?? null },
      {
        label: 'FY 2027 · House bill (named projects)',
        amount: house?.php ?? null,
      },
    ];
  }, [district]);
  const envelopeMax = Math.max(...officeYears.map(y => y.amount ?? 0), 1);

  const data = nationalBudget;
  const [year, setYear] = useState(
    data.yearly[data.yearly.length - 1]?.year ?? ''
  );
  const active = data.yearly.find(y => y.year === year);

  return (
    <>
      <Section>
        <p className="mb-6 max-w-3xl text-sm text-gray-700">
          Live figures from the{' '}
          <a
            href={DISTRICT_URL}
            className="font-semibold text-primary-800 underline underline-offset-2"
          >
            BetterGov.ph Budget API
            <ExternalLink className="mb-0.5 ml-1 inline h-3.5 w-3.5" />
          </a>{' '}
          — an independent, unofficial reading of published national budget
          documents. Appropriations (money authorized), not spending.
        </p>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="FY 2027 lines found for Marinduque"
            value={String(projects.length)}
            sub="DPWH office, Central Office, farm-to-market roads, health facilities"
          />
          <Stat
            label="NEP proposal — these lines"
            value={formatMoney(sums.nep, 'PHP', false)}
            sub="The budget the President submits"
          />
          <Stat
            label="House bill — these lines"
            value={formatMoney(sums.house, 'PHP', false)}
            sub="Compared with the NEP, never added"
          />
        </dl>
        {district && (
          <p className="mt-4 text-sm text-gray-700">
            {district.label}
            {district.representative && (
              <>
                {' '}
                · Representative{' '}
                {district.representativeUrl ? (
                  <a
                    href={district.representativeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary-800 underline underline-offset-2"
                  >
                    {district.representative}
                  </a>
                ) : (
                  district.representative
                )}
              </>
            )}{' '}
            · {district.officeName} ({district.tierText}).
          </p>
        )}
      </Section>

      <Section className="border-t border-gray-300 bg-gray-50">
        <Heading level={2}>By municipality</Heading>
        <p className="mb-4 max-w-3xl text-sm text-gray-700">
          The documents record no municipality; a project is counted under a
          town when its title names it. Each count opens the town&rsquo;s
          project list in the budget portal.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {TOWNS.map(t => {
            const c = munCells.cells.get(t)!;
            return (
              <a
                key={t}
                href={`${PORTAL_URL}/?mun=${encodeURIComponent(t)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!c.rows}
                onClick={e => !c.rows && e.preventDefault()}
                className={`group rounded border p-4 text-left transition-colors ${
                  c.rows
                    ? 'border-gray-300 bg-white text-gray-900 hover:border-primary-500 hover:bg-primary-50'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                <span className="block text-sm font-semibold">
                  {t}
                  <ExternalLink
                    className="mb-0.5 ml-1 inline h-3 w-3 text-gray-400 group-hover:text-primary-600"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-2xl font-semibold tabular-nums">
                  {c.rows}
                </span>
                <span className="mt-0.5 block text-xs tabular-nums text-gray-600">
                  {c.rows ? formatMoney(c.house, 'PHP') : '—'}
                </span>
              </a>
            );
          })}
          {munCells.untagged.rows > 0 && (
            <a
              href={`${PORTAL_URL}/?mun=${NO_TOWN}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Projects whose title names none of the towns"
              className="group rounded border border-gray-300 bg-white p-4 text-left text-gray-900 transition-colors hover:border-primary-500 hover:bg-primary-50"
            >
              <span className="block text-sm font-semibold">
                No town named
                <ExternalLink
                  className="mb-0.5 ml-1 inline h-3 w-3 text-gray-400 group-hover:text-primary-600"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1 block text-2xl font-semibold tabular-nums">
                {munCells.untagged.rows}
              </span>
              <span className="mt-0.5 block text-xs tabular-nums text-gray-600">
                {formatMoney(munCells.untagged.house, 'PHP')}
              </span>
            </a>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded border border-primary-200 bg-primary-50 p-5">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900">
              Marinduque budget portal
            </p>
            <p className="mt-0.5 text-sm text-gray-700">
              Every FY 2027 line with search, filters and CSV downloads; the
              enacted 2020–2026 budgets; and the source document for each figure
              — the full portal, on its own site.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-800">
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2"
            >
              2027 projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`${PORTAL_URL}/gaa`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2"
            >
              Budgets 2020–2026
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`${PORTAL_URL}/about`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2"
            >
              About the data
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Section>

      {district && officeYears.length > 0 && (
        <Section>
          <Heading level={2}>Office appropriations by year</Heading>
          <p className="mb-6 max-w-3xl text-sm text-gray-700">
            Total appropriations of the {district.officeName} per budget stage.
            The House bill covers named projects only, so it is smaller than the
            whole-office NEP figure.
          </p>
          <dl className="space-y-4">
            {officeYears.map(e => (
              <div key={e.label} className="max-w-2xl">
                <dt className="text-sm text-gray-700">{e.label}</dt>
                <dd className="space-y-1 text-sm font-semibold tabular-nums text-gray-900">
                  <div>{e.amount == null ? '—' : pesos.format(e.amount)}</div>
                  <AmountBar amount={e.amount ?? 0} maximum={envelopeMax} />
                </dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-8 mb-3 text-sm font-semibold text-gray-900">
            Enacted appropriations by Congress
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {CONGRESSES.map(([name, fys]) => {
              const total = fys.reduce(
                (a, fy) =>
                  a +
                  (district.years.find(y => y.fy === fy && y.stage === 'gaa')
                    ?.php ?? 0),
                0
              );
              if (!total) return null;
              return (
                <li key={name} className="tabular-nums">
                  <strong className="font-semibold text-gray-900">
                    {pesos.format(total)}
                  </strong>{' '}
                  · {name} (GAA {fys[0]}–{fys[fys.length - 1]})
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <Section className="border-t border-gray-300 bg-gray-50">
        <Heading level={2}>Selected enacted items naming Marinduque</Heading>
        <p className="mb-6 max-w-3xl text-sm text-gray-700">
          A curated set of line items in the enacted General Appropriations Act
          whose names identify Marinduque or its towns, across all national
          agencies (FY 2020–2026). {data.asOf}.
        </p>
        <div className="mb-6 max-w-4xl">
          <YearlyBarChart
            data={data.yearly.map(y => ({
              label: `FY ${y.year}`,
              amount: y.total,
            }))}
            title="Total selected enacted items naming Marinduque per year"
            formatValue={n => formatMoney(n, 'PHP')}
          />
        </div>
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Fiscal year"
        >
          {data.yearly.map(y => (
            <button
              key={y.year}
              role="tab"
              aria-selected={year === y.year}
              onClick={() => setYear(y.year)}
              className={`rounded border px-4 py-2 text-sm font-semibold ${
                year === y.year
                  ? 'border-primary-700 bg-primary-700 text-white'
                  : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              FY {y.year}
            </button>
          ))}
        </div>
        {active && (
          <div>
            <p className="mb-3 text-sm text-gray-700">
              <strong className="font-semibold text-gray-900">
                {pesos.format(active.total)}
              </strong>{' '}
              across {active.items.length} line items in the FY {active.year}{' '}
              GAA naming Marinduque.
            </p>
            <div className="overflow-x-auto rounded border border-gray-300">
              <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Line item
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Agency
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Enacted amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {active.items.map(item => (
                    <tr key={item.name}>
                      <td className="px-4 py-2.5 text-gray-900">{item.name}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-gray-600">
                        {item.dept}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-gray-900">
                        {pesos.format(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold text-gray-900">
                    <td className="px-4 py-3" colSpan={2}>
                      Total naming Marinduque, FY {active.year}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {pesos.format(active.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </Section>

      <Section>
        <Heading level={2}>Sources and caveats</Heading>
        <ul className="mb-4 max-w-3xl list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            FY 2027 figures load live from the BetterGov.ph Budget API on every
            visit; they are proposals (NEP / House Bill 10858), not yet law.
            Enacted figures come from DBM&rsquo;s published GAA volumes.
          </li>
          <li>
            The NEP and House bill are two versions of one budget — compare
            them, never add them.
          </li>
          <li>
            The API places DPWH money by office and finds other lines by name.
            The municipality counts read the town from the title too — matched,
            not surveyed. A few lines kept out as namesakes (a Buenavista
            barangay in Palawan and in Romblon, an unverifiable Buenavista
            irrigation line) are published in the portal&rsquo;s About page.
          </li>
          <li>
            BetterGov.ph cautions that insertion/deletion labels are provisional
            comparisons between documents, not findings of wrongdoing.
          </li>
        </ul>
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href={PORTAL_URL}
              className="inline-flex items-center gap-2 font-semibold text-primary-800 underline underline-offset-2"
            >
              Marinduque budget portal
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-1 text-gray-700">
              The dedicated site: every line, filters, CSV, source pages, and
              how each figure was found.
            </p>
          </li>
          <li>
            <a
              href={DISTRICT_URL}
              className="inline-flex items-center gap-2 font-semibold text-primary-800 underline underline-offset-2"
            >
              BetterGov.ph — Marinduque, Lone District
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-1 text-gray-700">
              District card: office envelope, FY 2027 comparison, methodology.
            </p>
          </li>
          <li>
            <a
              href="https://budget.bettergov.ph/hgab/2027/methodology"
              className="inline-flex items-center gap-2 font-semibold text-primary-800 underline underline-offset-2"
            >
              BetterGov.ph methodology and disclaimer
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-1 text-gray-700">
              How the NEP–House bill comparison was built and how to read it.
            </p>
          </li>
        </ul>
      </Section>
    </>
  );
}

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { nationalBudget } from '../../data/transparency';
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

const GROUP_LABELS: Record<string, { label: string; className: string }> = {
  unchanged: {
    label: 'Same in NEP and House bill',
    className: 'bg-gray-100 text-gray-700',
  },
  house_only: {
    label: 'In the House bill only',
    className: 'bg-amber-100 text-amber-800',
  },
  nep_only: {
    label: 'In the NEP only',
    className: 'bg-blue-100 text-blue-800',
  },
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-gray-300 bg-white p-5">
      <dt className="text-sm text-gray-700">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-gray-900">
        {value}
      </dd>
    </div>
  );
}

export default function NationalBudgetView() {
  const data = nationalBudget;
  const [year, setYear] = useState(
    data.yearly[data.yearly.length - 1]?.year ?? ''
  );
  const active = data.yearly.find(y => y.year === year);
  const envelopeMax = Math.max(...data.envelope.map(e => e.amount));

  return (
    <>
      <Section>
        <p className="mb-6 max-w-3xl text-sm text-gray-700">
          Mirrored from{' '}
          <a
            href="https://budget.bettergov.ph/hgab/2027/districts/leg%3Amarinduque%3Alone"
            className="font-semibold text-primary-800 underline underline-offset-2"
          >
            BetterGov.ph Budget
            <ExternalLink className="mb-0.5 ml-1 inline h-3.5 w-3.5" />
          </a>{' '}
          — an independent, unofficial reading of published national budget
          documents. Figures are appropriations (money authorized), not
          spending. {data.asOf}.
        </p>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="FY 2026 enacted GAA — Marinduque DEO (whole office)"
            value={formatMoney(590984000, 'PHP', false)}
          />
          <Stat
            label="FY 2027 NEP proposal — Marinduque DEO"
            value={formatMoney(data.fy2027.nep, 'PHP', false)}
          />
          <Stat
            label={`FY 2027 House bill — ${data.fy2027.houseRecords} named projects`}
            value={formatMoney(data.fy2027.houseBill, 'PHP', false)}
          />
        </dl>
        <p className="mt-4 text-sm text-gray-700">
          {data.district.label} · Representative {data.district.representative}{' '}
          · {data.district.office} ({data.district.tier}). Whole-office figures
          cover every item the office implements; named-project figures are
          smaller.
        </p>
      </Section>

      <Section className="border-t border-gray-300 bg-gray-50">
        <Heading level={2}>Office appropriations by year</Heading>
        <p className="mb-6 max-w-3xl text-sm text-gray-700">
          Total appropriations of the {data.district.office} per budget stage.
          &ldquo;House bill&rdquo; covers named projects only, so it is smaller
          than the whole-office NEP figure.
        </p>
        <dl className="space-y-4">
          {data.envelope.map(e => (
            <div key={e.stage + e.year} className="max-w-2xl">
              <dt className="text-sm text-gray-700">
                FY {e.year} · {e.stage}
              </dt>
              <dd className="space-y-1 text-sm font-semibold tabular-nums text-gray-900">
                <div>{pesos.format(e.amount)}</div>
                <AmountBar amount={e.amount} maximum={envelopeMax} />
              </dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-8 mb-3 text-sm font-semibold text-gray-900">
          Enacted appropriations by Congress
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {data.byCongress.map(c => (
            <li key={c.congress} className="tabular-nums">
              <strong className="font-semibold text-gray-900">
                {pesos.format(c.amount)}
              </strong>{' '}
              · {c.congress} (GAA {c.years})
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Heading level={2}>FY 2027 House bill — named projects</Heading>
        <p className="mb-6 max-w-3xl text-sm text-gray-700">
          The 25 funded project rows for the {data.district.office} in House
          Bill 10858 as passed on third reading, against the proposed National
          Expenditure Program. ₱442.43 million is unchanged, one ₱14-million
          covered court appears only in the House bill, and one ₱14-million
          covered court appears only in the NEP.
        </p>
        <div className="overflow-x-auto rounded border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Project
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Program
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">
                  House bill
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.fy2027.projects.map(p => (
                <tr key={p.title}>
                  <td className="px-4 py-3 text-gray-900">{p.title}</td>
                  <td className="px-4 py-3 text-gray-600">{p.program}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${GROUP_LABELS[p.group].className}`}
                    >
                      {GROUP_LABELS[p.group].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-gray-900">
                    {p.house == null ? '—' : pesos.format(p.house)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold text-gray-900">
                <td className="px-4 py-3" colSpan={3}>
                  Total in the House bill
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {pesos.format(data.fy2027.houseBill)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section className="border-t border-gray-300 bg-gray-50">
        <Heading level={2}>Enacted budget items naming Marinduque</Heading>
        <p className="mb-6 max-w-3xl text-sm text-gray-700">
          Line items in the enacted General Appropriations Act whose names
          identify Marinduque or its towns, across all national agencies (FY
          2020–2026). Items that do not name the province — including most of
          the district office&rsquo;s routine work — are not in these totals.
        </p>
        <div className="mb-6 max-w-4xl">
          <YearlyBarChart
            data={data.yearly.map(y => ({
              label: `FY ${y.year}`,
              amount: y.total,
            }))}
            title="Total enacted items naming Marinduque per year"
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
            Enacted figures come from DBM&rsquo;s published GAA volumes; FY 2027
            figures are proposals (NEP / House Bill 10858) and are not yet law.
          </li>
          <li>
            The NEP and House bill are two versions of one budget — compare
            them, never add them.
          </li>
          <li>
            BetterGov.ph cautions that insertion/deletion labels are provisional
            comparisons between documents, not findings of wrongdoing.
          </li>
          <li>
            Name-matched totals miss items that don&rsquo;t mention Marinduque
            in the title, so the office envelope above is the more complete
            measure of DPWH money for the district.
          </li>
        </ul>
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href="https://budget.bettergov.ph/hgab/2027/districts/leg%3Amarinduque%3Alone"
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
              href="https://budget.bettergov.ph/gaa"
              className="inline-flex items-center gap-2 font-semibold text-primary-800 underline underline-offset-2"
            >
              BetterGov.ph GAA Explorer
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-1 text-gray-700">
              Search &ldquo;Marinduque&rdquo; for the underlying line items.
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

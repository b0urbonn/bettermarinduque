import {
  CalendarClock,
  CircleHelp,
  ExternalLink,
  FileSearch,
  HandCoins,
  TriangleAlert,
} from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import MarinduqueMap from '../brand/MarinduqueMap';
import type { FundTracker, LedgerEntry } from '../../data/transparency';
import { contactMailto } from '../../data/navigation';
import {
  formatMoney,
  formatPartialDate,
  fundTotals,
} from '../../lib/transparencyFormat';
import { cn } from '../../lib/utils';
import AmountBar from './AmountBar';
import YearlyBarChart from './YearlyBarChart';

const currencyNames: Record<string, string> = {
  USD: 'US dollars',
  PHP: 'Philippine pesos',
};

const statusStyles: Record<LedgerEntry['status'], string> = {
  received: 'bg-success-50 text-success-700 border-success-200',
  scheduled: 'bg-gray-50 text-gray-700 border-gray-200',
  disputed: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  spent: 'bg-accent-50 text-accent-800 border-accent-200',
  allocated: 'bg-primary-50 text-primary-700 border-primary-100',
};

function StatusBadge({ status }: { status: LedgerEntry['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold capitalize',
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}

function Citations({
  ids,
  order,
}: {
  ids: string[];
  order: Record<string, number>;
}) {
  return (
    <span className="ml-1 whitespace-nowrap">
      {ids
        .filter(id => id in order)
        .map(id => (
          <a
            key={id}
            href={`#source-${id}`}
            className="align-super text-[0.7rem] font-semibold text-primary-600 hover:underline mr-0.5"
          >
            [{order[id]}]
          </a>
        ))}
    </span>
  );
}

export default function FundTrackerView({
  slug,
  tracker,
}: {
  slug: string;
  tracker: FundTracker;
}) {
  const { currency } = tracker;
  const money = (n: number) => formatMoney(n, currency);
  const totals = fundTotals(tracker);
  const labels = {
    total: 'Total fund',
    received: 'Received',
    scheduled: 'Scheduled',
    spent: 'Spent (officially reported)',
    disputed: 'Disputed claims',
    ...tracker.labels,
  };
  const sourceIds = Object.keys(tracker.sources);
  const order = Object.fromEntries(sourceIds.map((id, i) => [id, i + 1]));
  const pipeline = totals.received + totals.scheduled || 1;
  const receivedPct = (totals.received / pipeline) * 100;
  const largestPayment = Math.max(
    0,
    ...tracker.inflows.map(entry => entry.amount)
  );

  const yearTotals = new Map<number, { amount: number; received: boolean }>();
  for (const e of tracker.inflows) {
    const match = (e.date || e.due || '').match(/20\d{2}/);
    if (match) {
      const y = Number(match[0]);
      const entry = yearTotals.get(y) ?? { amount: 0, received: false };
      entry.amount += e.amount;
      if (e.status === 'received') entry.received = true;
      yearTotals.set(y, entry);
    }
  }
  const yearKeys = [...yearTotals.keys()].sort((a, b) => a - b);
  const yearlyData =
    yearKeys.length >= 2
      ? Array.from(
          { length: yearKeys[yearKeys.length - 1] - yearKeys[0] + 1 },
          (_, i) => {
            const y = yearKeys[0] + i;
            const entry = yearTotals.get(y);
            return {
              label: `FY ${y}`,
              amount: entry?.amount ?? 0,
              empty: entry === undefined,
              proposed: entry !== undefined && !entry.received,
            };
          }
        )
      : null;

  const stats = [
    {
      label: labels.total,
      value: money(tracker.total),
      tone: 'text-primary-800',
    },
    {
      label: labels.received,
      value: money(totals.received),
      tone: 'text-success-700',
    },
    {
      label: labels.scheduled,
      value: money(totals.scheduled),
      tone: 'text-gray-900',
    },
    {
      label: labels.spent,
      value: totals.spent ? money(totals.spent) : 'No report yet',
      tone: totals.spent ? 'text-accent-700' : 'text-gray-500',
    },
    {
      label: labels.disputed,
      value: money(totals.disputed),
      tone: 'text-secondary-600',
    },
  ];

  return (
    <>
      <Section
        className="pt-8"
        decoration={
          <MarinduqueMap className="hidden lg:block absolute -right-24 -top-16 h-[520px] w-[520px] text-primary-700/[0.06] pointer-events-none" />
        }
      >
        {tracker.summaryTl && (
          <div className="rounded-xl border border-accent-200 border-l-4 border-l-accent-500 bg-accent-50 p-5 mb-8 max-w-4xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent-800 mb-1">
              Buod sa Tagalog
            </div>
            <p className="text-gray-800 leading-relaxed">{tracker.summaryTl}</p>
          </div>
        )}

        <dl className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {stats.map(s => (
            <div key={s.label} className="card p-4">
              <dt className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                {s.label}
              </dt>
              <dd
                className={cn(
                  'font-display mt-1 text-2xl font-extrabold tabular-nums',
                  s.tone
                )}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mb-2 flex justify-between text-sm text-gray-600">
          <span>{labels.received}</span>
          <span className="font-semibold text-gray-900">
            {money(totals.received)} of{' '}
            {money(totals.received + totals.scheduled)}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(receivedPct)}
          aria-label="Share of tracked funds received"
        >
          <AmountBar
            amount={totals.received}
            maximum={pipeline}
            className="h-3"
            fillClassName="bg-success-500"
          />
        </div>

        {yearlyData && (
          <div className="mt-6 max-w-4xl">
            <YearlyBarChart
              data={yearlyData}
              title="Tracked funding items per fiscal year"
              formatValue={n => money(n)}
            />
          </div>
        )}

        <p className="mt-8 text-gray-700 leading-relaxed max-w-4xl">
          {tracker.summary}
        </p>
      </Section>

      <Section className="bg-sand-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Heading
              level={3}
              className="flex items-center gap-2 text-gray-900"
            >
              <HandCoins
                className="h-6 w-6 text-primary-600"
                aria-hidden="true"
              />
              Money in
            </Heading>
            <p className="mb-3 text-sm text-gray-700">
              Bars compare all entries on the same{' '}
              {currencyNames[currency] ?? currency} scale.
            </p>
            <ul className="space-y-3">
              {tracker.inflows.map(e => (
                <li key={e.label} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {e.label}
                        <Citations ids={e.sources} order={order} />
                      </div>
                      <div className="mt-0.5 text-sm text-gray-500">
                        {e.date ? formatPartialDate(e.date) : e.due}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className="font-display text-lg font-bold tabular-nums text-gray-900"
                        title={formatMoney(e.amount, currency, false)}
                      >
                        {money(e.amount)}
                      </div>
                      <StatusBadge status={e.status} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <AmountBar amount={e.amount} maximum={largestPayment} />
                  </div>
                  {e.note && (
                    <p className="text-sm text-gray-600 mt-2">{e.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <Heading
                level={3}
                className="flex items-center gap-2 text-gray-900"
              >
                <FileSearch
                  className="h-6 w-6 text-primary-600"
                  aria-hidden="true"
                />
                Money out
              </Heading>
              {tracker.outflows.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center">
                  <p className="font-semibold text-gray-900">
                    No official spending report has been published yet.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Entries will be added here from appropriation ordinances, SP
                    resolutions, trust fund reports, or COA audits.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {tracker.outflows.map(e => (
                    <li
                      key={e.label}
                      className="card flex justify-between gap-3 p-4"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">
                          {e.label}
                          <Citations ids={e.sources} order={order} />
                        </div>
                        {e.note && (
                          <p className="text-sm text-gray-600 mt-1">{e.note}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-lg font-bold">
                          {money(e.amount)}
                        </div>
                        <StatusBadge status={e.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {tracker.claims.length > 0 && (
              <div>
                <Heading
                  level={3}
                  className="flex items-center gap-2 text-gray-900"
                >
                  <TriangleAlert
                    className="h-6 w-6 text-secondary-500"
                    aria-hidden="true"
                  />
                  Contested claims
                </Heading>
                <ul className="space-y-3">
                  {tracker.claims.map(e => (
                    <li key={e.label} className="card border-secondary-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-semibold text-gray-900">
                          {e.label}
                          <Citations ids={e.sources} order={order} />
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-display text-lg font-bold text-secondary-600">
                            ~{money(e.amount)}
                          </div>
                          <StatusBadge status={e.status} />
                        </div>
                      </div>
                      {e.note && (
                        <p className="text-sm text-gray-600 mt-2">{e.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Heading
              level={3}
              className="flex items-center gap-2 text-gray-900"
            >
              <CalendarClock
                className="h-6 w-6 text-primary-600"
                aria-hidden="true"
              />
              Timeline
            </Heading>
            <ol className="relative border-l-2 border-primary-100 ml-2">
              {tracker.timeline.map(ev => (
                <li
                  key={`${ev.date}-${ev.title}`}
                  className="ml-6 pb-6 last:pb-0"
                >
                  <span
                    className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-primary-500"
                    aria-hidden="true"
                  />
                  <time className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                    {formatPartialDate(ev.date)}
                  </time>
                  <div className="font-semibold text-gray-900">
                    {ev.title}
                    <Citations ids={ev.sources} order={order} />
                  </div>
                  {ev.description && (
                    <p className="text-sm text-gray-600">{ev.description}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <aside>
            <Heading
              level={3}
              className="flex items-center gap-2 text-gray-900"
            >
              <CircleHelp
                className="h-6 w-6 text-accent-600"
                aria-hidden="true"
              />
              Not yet public
            </Heading>
            <ul className="space-y-2">
              {tracker.openQuestions.map(q => (
                <li
                  key={String(q)}
                  className="rounded-lg bg-accent-50 border border-accent-100 px-4 py-3 text-sm text-gray-800"
                >
                  {String(q)}
                </li>
              ))}
            </ul>
            <a
              href={`${contactMailto}?subject=Suggest%20an%20update%20—%20${encodeURIComponent(slug)}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
            >
              Have an official document? Suggest an update
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </Section>

      <Section className="border-t border-gray-200 bg-sand-50">
        <Heading level={4} className="text-gray-900">
          Sources
        </Heading>
        <ol className="space-y-2 text-sm">
          {sourceIds.map(id => {
            const s = tracker.sources[id];
            return (
              <li
                key={id}
                id={`source-${id}`}
                className="scroll-mt-24 flex gap-2"
              >
                <span className="font-semibold text-gray-500 w-6 shrink-0">
                  [{order[id]}]
                </span>
                <span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-700 hover:underline"
                  >
                    {s.title}
                  </a>
                  <span className="text-gray-500">
                    {' '}
                    — {s.publisher}
                    {s.date && `, ${formatPartialDate(s.date)}`}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-xs text-gray-500 max-w-3xl">
          Compiled by the BetterMarinduque community from public news reports
          and official documents. This is not an official government record.
          Amounts are in {currencyNames[currency] ?? currency} as reported
          {currency === 'USD' && '; peso figures are as quoted in the sources'}.
          Last updated {formatPartialDate(tracker.lastUpdated)}.
        </p>
      </Section>
    </>
  );
}

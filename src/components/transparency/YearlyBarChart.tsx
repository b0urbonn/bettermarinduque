export interface YearDatum {
  label: string;
  amount: number;
  /** No inflow entry exists for this year. */
  empty?: boolean;
  /** Every entry this year is proposed/scheduled, not yet enacted. */
  proposed?: boolean;
}

export default function YearlyBarChart({
  data,
  title,
  formatValue,
}: {
  data: YearDatum[];
  title: string;
  formatValue: (n: number) => string;
}) {
  const max = Math.max(0, ...data.map(d => d.amount));
  const hasProposed = data.some(d => d.proposed && d.amount > 0);
  const hasEmpty = data.some(d => d.empty);

  return (
    <figure className="rounded-xl border border-gray-200 bg-white p-5">
      <figcaption className="text-sm font-semibold text-gray-900">
        {title}
      </figcaption>
      <div className="mt-4 flex h-48 items-end gap-2" aria-hidden="true">
        {data.map(d => (
          <div
            key={d.label}
            className="flex min-w-0 flex-1 flex-col items-center justify-end self-stretch"
          >
            <span className="truncate text-[10px] font-semibold tabular-nums text-gray-700">
              {d.amount > 0 ? formatValue(d.amount) : 'None'}
            </span>
            <div
              className={
                d.empty
                  ? 'h-1.5 w-full rounded-t border-b-2 border-dashed border-gray-400'
                  : `w-full rounded-t ${d.proposed ? 'bg-gray-300' : 'bg-primary-500'}`
              }
              style={{
                height: d.empty
                  ? undefined
                  : `${Math.max((d.amount / max) * 100, 1.5)}%`,
              }}
            />
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              {d.label}
            </span>
          </div>
        ))}
      </div>
      {(hasProposed || hasEmpty) && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary-500" />
            Enacted / received
          </span>
          {hasProposed && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-gray-300" />
              Proposed, not yet law
            </span>
          )}
          {hasEmpty && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-2.5 border-b-2 border-dashed border-gray-400" />
              No items
            </span>
          )}
        </div>
      )}
      <ul className="sr-only">
        {data.map(d => (
          <li key={d.label}>
            {d.label}: {d.amount > 0 ? formatValue(d.amount) : 'no items'}
            {d.proposed && d.amount > 0 ? ' (proposed)' : ''}
          </li>
        ))}
      </ul>
    </figure>
  );
}

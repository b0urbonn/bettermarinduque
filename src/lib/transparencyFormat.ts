import type { FundTracker, LedgerEntry } from '../data/transparency';

export function formatMoney(amount: number, currency: string, compact = true) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 2 : 0,
  }).format(amount);
}

// Dates are stored as 'YYYY', 'YYYY-MM', or 'YYYY-MM-DD'.
export function formatPartialDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  if (!m) return String(y);
  const value = new Date(Date.UTC(y, m - 1, d || 1));
  return value.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: d ? 'short' : 'long',
    ...(d ? { day: 'numeric' } : {}),
  });
}

const sum = (entries: LedgerEntry[], status?: LedgerEntry['status']) =>
  entries
    .filter(e => !status || e.status === status)
    .reduce((total, e) => total + e.amount, 0);

export function fundTotals(tracker: FundTracker) {
  return {
    received: sum(tracker.inflows, 'received'),
    scheduled: sum(tracker.inflows, 'scheduled'),
    disputed: sum(tracker.claims, 'disputed'),
    spent: sum(tracker.outflows, 'spent'),
    allocated: sum(tracker.outflows, 'allocated'),
  };
}

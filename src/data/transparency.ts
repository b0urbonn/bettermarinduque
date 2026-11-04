import * as yaml from 'js-yaml';
import transparencyIndexYaml from '../../content/transparency/index.yaml?raw';
import marcopperFundYaml from '../../content/transparency/marcopper-fund.yaml?raw';

export interface TrackerSummary {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface OfficialSource {
  name: string;
  description: string;
  url: string;
}

export interface TransparencyIndex {
  trackers: TrackerSummary[];
  officialSources: OfficialSource[];
}

export interface LedgerEntry {
  label: string;
  amount: number;
  status: 'received' | 'scheduled' | 'disputed' | 'spent' | 'allocated';
  date?: string;
  due?: string;
  note?: string;
  sources: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  sources: string[];
}

export interface Source {
  title: string;
  publisher: string;
  date?: string;
  url: string;
}

export interface FundTracker {
  title: string;
  lastUpdated: string;
  currency: string;
  total: number;
  summary: string;
  summaryTl?: string;
  inflows: LedgerEntry[];
  claims: LedgerEntry[];
  outflows: LedgerEntry[];
  timeline: TimelineEvent[];
  openQuestions: string[];
  sources: Record<string, Source>;
}

export const transparencyIndex = yaml.load(
  transparencyIndexYaml
) as TransparencyIndex;

const trackerMap: Record<string, string> = {
  'marcopper-fund': marcopperFundYaml,
};

export function getFundTracker(slug: string): FundTracker | undefined {
  const raw = trackerMap[slug];
  return raw ? (yaml.load(raw) as FundTracker) : undefined;
}

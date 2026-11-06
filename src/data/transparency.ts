import * as yaml from 'js-yaml';
import transparencyIndexYaml from '../../content/transparency/index.yaml?raw';
import disclosureTopicsYaml from '../../content/transparency/disclosures.yaml?raw';
import marcopperFundYaml from '../../content/transparency/marcopper-fund.yaml?raw';
import nationalBudgetYaml from '../../content/transparency/national-budget.yaml?raw';

interface TopicSummary {
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
  trackers: TopicSummary[];
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

interface DisclosureRecord {
  title: string;
  period: string;
  description: string;
  figures?: { label: string; amount: number }[];
  comparison?: {
    title: string;
    figures: { label: string; amount: number }[];
  };
  source: Source;
  relatedSources?: Source[];
}

export interface DisclosureTopic extends TopicSummary {
  records: DisclosureRecord[];
  nextSteps: string;
  directories: OfficialSource[];
}

export interface TrackerLabels {
  total?: string;
  received?: string;
  scheduled?: string;
  spent?: string;
  disputed?: string;
}

export interface FundTracker {
  title: string;
  lastUpdated: string;
  currency: string;
  total: number;
  labels?: TrackerLabels;
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

export const disclosureTopics = yaml.load(
  disclosureTopicsYaml
) as DisclosureTopic[];

export interface BudgetItem {
  name: string;
  dept: string;
  amount: number;
}

export interface NationalBudget {
  title: string;
  lastUpdated: string;
  asOf: string;
  yearly: { year: string; total: number; items: BudgetItem[] }[];
}

export const nationalBudget = yaml.load(nationalBudgetYaml) as NationalBudget;

const trackerMap: Record<string, string> = {
  'marcopper-fund': marcopperFundYaml,
};

export function getFundTracker(slug: string): FundTracker | undefined {
  const raw = trackerMap[slug];
  return raw ? (yaml.load(raw) as FundTracker) : undefined;
}

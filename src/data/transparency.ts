import * as yaml from 'js-yaml';
import transparencyIndexYaml from '../../content/transparency/index.yaml?raw';
import disclosureTopicsYaml from '../../content/transparency/disclosures.yaml?raw';
import marcopperFundYaml from '../../content/transparency/marcopper-fund.yaml?raw';
import circumferentialRoadYaml from '../../content/transparency/circumferential-road.yaml?raw';
import disasterFundYaml from '../../content/transparency/disaster-fund.yaml?raw';
import nationalTaxAllotmentYaml from '../../content/transparency/national-tax-allotment.yaml?raw';
import floodControlYaml from '../../content/transparency/flood-control.yaml?raw';
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

export interface HouseBillProject {
  title: string;
  program: string;
  group: 'unchanged' | 'house_only' | 'nep_only';
  nep: number | null;
  house: number | null;
}

export interface NationalBudget {
  title: string;
  lastUpdated: string;
  asOf: string;
  district: {
    label: string;
    office: string;
    tier: string;
    representative: string;
  };
  envelope: { year: string; stage: string; amount: number }[];
  byCongress: { congress: string; amount: number; years: string }[];
  fy2027: {
    nep: number;
    houseBill: number;
    nepRecords: number;
    houseRecords: number;
    bridge: { unchanged: number; houseOnly: number; nepOnly: number };
    projects: HouseBillProject[];
  };
  yearly: { year: string; total: number; items: BudgetItem[] }[];
}

export const nationalBudget = yaml.load(nationalBudgetYaml) as NationalBudget;

const trackerMap: Record<string, string> = {
  'marcopper-fund': marcopperFundYaml,
  'circumferential-road': circumferentialRoadYaml,
  'disaster-fund': disasterFundYaml,
  'national-tax-allotment': nationalTaxAllotmentYaml,
  'flood-control': floodControlYaml,
};

export function getFundTracker(slug: string): FundTracker | undefined {
  const raw = trackerMap[slug];
  return raw ? (yaml.load(raw) as FundTracker) : undefined;
}

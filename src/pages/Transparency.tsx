import { Link, NavLink, useParams } from 'react-router';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Banner } from '@bettergov/kapwa/banner';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import PageGraphic, {
  type PageGraphicKind,
} from '../components/brand/PageGraphic';
import { contactMailto } from '../data/navigation';
import DisclosureView from '../components/transparency/DisclosureView';
import FundTrackerView from '../components/transparency/FundTrackerView';
import NationalBudgetView from '../components/transparency/NationalBudgetView';
import TransparencyGraphic from '../components/transparency/TransparencyGraphic';
import {
  disclosureTopics,
  getFundTracker,
  transparencyIndex,
} from '../data/transparency';
import {
  formatMoney,
  formatPartialDate,
  fundTotals,
} from '../lib/transparencyFormat';

const SUGGEST_URL = `${contactMailto}?subject=Suggest%20a%20record`;
const topics = [...transparencyIndex.trackers, ...disclosureTopics];
const disclosureGraphics: Partial<Record<string, PageGraphicKind>> = {
  budgets: 'budgets',
  procurement: 'procurement',
  infrastructure: 'infrastructure',
  audits: 'audits',
};
const trackerGraphics: Partial<Record<string, PageGraphicKind>> = {
  'marcopper-fund': 'settlement',
};
const levelGroups = [
  { key: 'provincial', heading: 'Provincial records' },
  { key: 'municipal', heading: 'Municipal and barangay records' },
  { key: 'national', heading: 'National records' },
] as const;

type Topic = (typeof topics)[number];

function TopicCard({ topic: t }: { topic: Topic }) {
  const Icon =
    (LucideIcons[t.icon as keyof typeof LucideIcons] as
      React.ComponentType<{ className?: string }> | undefined) ??
    LucideIcons.FileText;
  const tracker = getFundTracker(t.slug);
  const totals = tracker && fundTotals(tracker);
  return (
    <Link
      to={`/transparency/${t.slug}`}
      className="group rounded-xl bg-white border border-gray-300 border-t-4 border-t-primary-700 p-6 flex flex-col hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="rounded-full bg-primary-50 p-3 text-primary-600">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:underline">
          {t.name}
        </h3>
      </div>
      <p className="text-sm text-gray-700 mb-4">{t.description}</p>
      {tracker && totals && (
        <dl className="grid grid-cols-3 gap-2 text-sm mb-4">
          <div>
            <dt className="text-gray-700">Total</dt>
            <dd className="font-semibold text-gray-900">
              {formatMoney(tracker.total, tracker.currency)}
            </dd>
          </div>
          <div>
            <dt className="text-gray-700">Received</dt>
            <dd className="font-semibold text-success-700">
              {formatMoney(totals.received, tracker.currency)}
            </dd>
          </div>
          <div>
            <dt className="text-gray-700">Spent</dt>
            <dd className="font-semibold text-gray-700">
              {totals.spent
                ? formatMoney(totals.spent, tracker.currency)
                : 'No report'}
            </dd>
          </div>
        </dl>
      )}
      <div className="mt-auto flex items-center justify-between text-sm">
        {tracker && (
          <span className="text-gray-700">
            Updated {formatPartialDate(tracker.lastUpdated)}
          </span>
        )}
        <span className="inline-flex items-center gap-1 font-semibold text-primary-700">
          {tracker ? 'View tracker' : 'Browse records'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function TransparencyNavigation() {
  const items = [
    { label: 'Overview', href: '/transparency' },
    ...topics.map(topic => ({
      label: topic.name,
      href: `/transparency/${topic.slug}`,
    })),
  ];

  return (
    <div className="bg-primary-700 text-white">
      <nav
        aria-label="Transparency navigation"
        className="portal-container flex flex-wrap gap-x-6"
      >
        {items.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            end
            className={({ isActive }) =>
              `border-b-2 py-3 text-sm font-semibold hover:text-white ${isActive ? 'border-white text-white' : 'border-transparent text-white/85'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function TransparencyHub() {
  return (
    <>
      <SEO
        title="Transparency"
        description="Explore Marinduque's public funds, budgets, procurement, infrastructure projects, and audit reports."
        keywords="Marinduque transparency, Marcopper settlement, budget, procurement, infrastructure, audit"
      />
      <TransparencyNavigation />
      <PageHeader
        title="Transparency portal"
        illustration={<TransparencyGraphic />}
        description="Follow public money in Marinduque. Browse fund trackers and selected records on local finances, contracts, infrastructure, and audits."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Transparency' },
        ]}
      />
      <Section>
        <Heading level={2}>Explore public records</Heading>
        {levelGroups.map(group => {
          const groupTopics = topics.filter(
            t => (t.level ?? 'provincial') === group.key
          );
          if (groupTopics.length === 0) return null;
          return (
            <div key={group.key} className="mt-7 first:mt-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-700">
                {group.heading}
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
                {groupTopics.map(t => (
                  <TopicCard key={t.slug} topic={t} />
                ))}
              </div>
            </div>
          );
        })}
      </Section>
      <Section className="bg-gray-50">
        <Heading level={2}>Official sources</Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {transparencyIndex.officialSources.map(s => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-white border border-gray-300 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <div className="flex items-start justify-between gap-2 font-semibold text-primary-800 group-hover:underline">
                {s.name}
                <ExternalLink
                  className="h-4 w-4 shrink-0 mt-1 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-gray-700 mt-1">{s.description}</p>
            </a>
          ))}
        </div>
      </Section>
      <Section>
        <Heading level={2}>Request or share a record</Heading>
        <p className="mb-4 max-w-3xl text-gray-700">
          For a local record, contact the office that holds it with the document
          name, year, and project or reference number if available. If you have
          a public document that belongs here, share the source link with us.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary-800">
          <a
            href="https://marinduque.gov.ph/contact-us/"
            className="underline underline-offset-2"
          >
            Provincial office contacts
          </a>
          <a href={SUGGEST_URL} className="underline underline-offset-2">
            Suggest a record by email
          </a>
        </div>
      </Section>
    </>
  );
}

export default function Transparency() {
  const { slug } = useParams();
  if (!slug) return <TransparencyHub />;

  const topic = disclosureTopics.find(topic => topic.slug === slug);
  if (topic?.slug === 'national-budget') {
    return (
      <>
        <SEO title={topic.name} description={topic.description} />
        <TransparencyNavigation />
        <PageHeader
          title={topic.name}
          description={topic.description}
          illustration={<PageGraphic key={slug} kind="budgets" />}
          breadcrumbItems={[
            { label: 'Home', href: '/' },
            { label: 'Transparency', href: '/transparency' },
            { label: topic.name },
          ]}
        />
        <NationalBudgetView />
      </>
    );
  }
  if (topic) {
    return (
      <>
        <SEO title={topic.name} description={topic.description} />
        <TransparencyNavigation />
        <PageHeader
          title={topic.name}
          description={topic.description}
          illustration={
            <PageGraphic
              key={slug}
              kind={disclosureGraphics[slug] ?? 'document'}
            />
          }
          breadcrumbItems={[
            { label: 'Home', href: '/' },
            { label: 'Transparency', href: '/transparency' },
            { label: topic.name },
          ]}
        />
        <DisclosureView topic={topic} />
      </>
    );
  }

  const tracker = getFundTracker(slug);
  if (!tracker) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Transparency page not found"
          description="Browse the Transparency portal for available records and trackers."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={tracker.title}
        description={tracker.summary}
        keywords={`Marinduque transparency, ${tracker.title}, public funds, local government`}
      />
      <TransparencyNavigation />
      <PageHeader
        title={tracker.title}
        illustration={
          <PageGraphic key={slug} kind={trackerGraphics[slug] ?? 'document'} />
        }
        description={`Where the money is, where it is going, and what is still not public. Last updated ${formatPartialDate(tracker.lastUpdated)}.`}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Transparency', href: '/transparency' },
          { label: tracker.title },
        ]}
      />
      <FundTrackerView slug={slug} tracker={tracker} />
    </>
  );
}

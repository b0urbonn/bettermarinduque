import { Link, useParams } from 'react-router';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, ExternalLink, Plus } from 'lucide-react';
import { Banner } from '@bettergov/kapwa/banner';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import MarinduqueMap from '../components/brand/MarinduqueMap';
import FundTrackerView from '../components/transparency/FundTrackerView';
import { getFundTracker, transparencyIndex } from '../data/transparency';
import {
  formatMoney,
  formatPartialDate,
  fundTotals,
} from '../lib/transparencyFormat';

const REPO_ISSUES_URL = 'https://github.com/b0urbonn/bettermarinduque/issues';

function TransparencyHub() {
  return (
    <>
      <SEO
        title="Transparency"
        description="Track public funds in Marinduque — settlement money, budgets, and projects — with every figure linked to its source."
        keywords="Marinduque transparency, Marcopper settlement, budget tracker, public funds"
      />
      <PageHeader
        title="Transparency portal"
        description="Follow public money in Marinduque. Every figure here links to an official document or news report, and gaps are shown openly."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Transparency' },
        ]}
      />
      <Section
        decoration={
          <MarinduqueMap className="hidden lg:block absolute -right-28 -top-8 h-[520px] w-[520px] text-primary-700/[0.06] pointer-events-none" />
        }
      >
        <Heading level={2}>Trackers</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transparencyIndex.trackers.map(t => {
            const Icon =
              (LucideIcons[t.icon as keyof typeof LucideIcons] as
                React.ComponentType<{ className?: string }> | undefined) ??
              LucideIcons.FileText;
            const tracker = getFundTracker(t.slug);
            const totals = tracker && fundTotals(tracker);
            return (
              <Link
                key={t.slug}
                to={`/transparency/${t.slug}`}
                className="group rounded-xl bg-white border border-gray-200 border-t-4 border-t-accent-400 p-6 flex flex-col transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="rounded-full bg-primary-50 p-3 text-primary-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:underline">
                    {t.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{t.description}</p>
                {tracker && totals && (
                  <dl className="grid grid-cols-3 gap-2 text-sm mb-4">
                    <div>
                      <dt className="text-gray-500">Total</dt>
                      <dd className="font-semibold text-gray-900">
                        {formatMoney(tracker.total, tracker.currency)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Received</dt>
                      <dd className="font-semibold text-success-700">
                        {formatMoney(totals.received, tracker.currency)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Spent</dt>
                      <dd className="font-semibold text-gray-500">
                        {totals.spent
                          ? formatMoney(totals.spent, tracker.currency)
                          : 'No report'}
                      </dd>
                    </div>
                  </dl>
                )}
                <div className="mt-auto flex items-center justify-between text-sm">
                  {tracker && (
                    <span className="text-gray-500">
                      Updated {formatPartialDate(tracker.lastUpdated)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 font-semibold text-primary-700">
                    View tracker
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
          <a
            href={REPO_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-primary-400 hover:bg-primary-50/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <span className="rounded-full bg-gray-100 p-3 text-gray-500 mb-3">
              <Plus className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold text-gray-900">
              More trackers coming
            </span>
            <span className="text-sm text-gray-600 mt-1 max-w-sm">
              Provincial budget, infrastructure projects, procurement — suggest
              one and share official documents.
            </span>
          </a>
        </div>
      </Section>
      <Section className="bg-gray-50">
        <Heading level={3} className="text-gray-900">
          Official sources
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {transparencyIndex.officialSources.map(s => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-white border border-gray-200 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <div className="flex items-start justify-between gap-2 font-semibold text-primary-800 group-hover:underline">
                {s.name}
                <ExternalLink
                  className="h-4 w-4 shrink-0 mt-1 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{s.description}</p>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

export default function Transparency() {
  const { slug } = useParams();
  if (!slug) return <TransparencyHub />;

  const tracker = getFundTracker(slug);
  if (!tracker) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Tracker not found"
          description="The tracker you are looking for does not exist."
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
        keywords="Marcopper settlement, Barrick, Marinduque, rehabilitation fund, transparency"
      />
      <PageHeader
        title={tracker.title}
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

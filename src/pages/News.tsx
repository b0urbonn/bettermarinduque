import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { newsItems, type NewsItem } from '../data/news';
import { provincialWebsite } from '../data/province';

const badgeStyles: Record<NewsItem['badge'], string> = {
  announcement: 'bg-sky-100 text-sky-800',
  project: 'bg-green-100 text-green-800',
  advisory: 'bg-amber-100 text-amber-700',
};

const badgeLabels: Record<NewsItem['badge'], string> = {
  announcement: 'Announcement',
  project: 'Project',
  advisory: 'Advisory',
};

export default function News() {
  return (
    <div className="portal-container py-10 md:py-14">
      <SEO
        title="News & updates"
        description="Updates on the BetterMarinduque portal and pointers to official provincial announcements."
      />
      <header>
        <p className="font-mono text-xs tracking-widest text-primary-700 uppercase">
          Portal updates
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          News &amp; updates
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
          What&apos;s new on this portal and where to find official provincial
          announcements.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {newsItems.map(item => (
          <article
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-primary-700 hover:shadow-[0_4px_12px_rgba(0,50,160,0.08)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyles[item.badge]}`}
              >
                {badgeLabels[item.badge]}
              </span>
              <span className="text-[0.8125rem] text-gray-500">
                {item.date}
              </span>
            </div>
            <h2 className="text-base font-bold">
              <Link
                to={item.to}
                className="text-gray-900 hover:text-primary-700 hover:no-underline"
              >
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-base font-bold text-gray-900">
          Official announcements
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          For provincial government press releases, advisories, and official
          news, visit the official website:
        </p>
        <a
          href={provincialWebsite}
          className="portal-link mt-3 inline-flex items-center gap-1 text-sm font-medium"
        >
          marinduque.gov.ph <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

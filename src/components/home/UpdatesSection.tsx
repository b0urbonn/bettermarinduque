import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { newsItems, type NewsItem } from '../../data/news';

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

export default function UpdatesSection() {
  return (
    <section aria-labelledby="updates-heading" className="py-12 md:py-16">
      <div className="portal-container">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="updates-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Latest updates
          </h2>
          <Link
            to="/news"
            className="portal-link inline-flex items-center gap-1 text-sm font-medium"
          >
            View all <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
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
              <h3 className="text-base font-bold">
                <Link
                  to={item.to}
                  className="text-gray-900 hover:text-primary-700 hover:no-underline"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

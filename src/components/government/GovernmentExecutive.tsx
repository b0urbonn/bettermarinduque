import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Landmark,
  Scale,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import leaders from '../../../content/government/departments/executive.json';
import {
  governmentPaths,
  officeDirectory,
} from '../../data/governmentDirectory';
import { provincialWebsite } from '../../data/province';
import { loadMarkdownContent } from '../../lib/markdownLoader';
import { ArticleSkeleton } from '../ui/LoadingSkeleton';
import GovernmentPage from './GovernmentPage';

const positions = [
  { key: 'governor', name: leaders.GOVERNOR, Icon: Landmark },
  { key: 'viceGovernor', name: leaders.VICE_GOVERNOR, Icon: Scale },
  { key: 'representative', name: leaders.REPRESENTATIVE, Icon: Users },
] as const;

export default function GovernmentExecutive() {
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState<string>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void loadMarkdownContent('executive', 'departments', 'government')
      .then(({ content }) => {
        if (active) setArticle(content.replace(/^#[ \t]+[^\n]+\n*/, ''));
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <GovernmentPage
      title={t('government.executiveTitle')}
      description={t('government.executiveDescription')}
      term={`${leaders.YEAR_ELECTED}–2028`}
      actions={
        <a
          href={provincialWebsite + '/executive/'}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/45 px-4 py-2 font-semibold text-white hover:bg-white/15 focus-visible:outline-white"
        >
          {t('government.officialExecutive')}{' '}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      }
    >
      <div className="portal-container space-y-7 py-8 lg:py-10">
        <section aria-labelledby="government-leadership">
          <h2
            id="government-leadership"
            className="mb-4 text-2xl font-bold tracking-tight"
          >
            {t('government.electedLeaders')}
          </h2>
          <ul role="list" className="grid gap-4 md:grid-cols-3">
            {positions.map(({ key, name, Icon }) => (
              <li
                key={key}
                className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
              >
                <span className="mb-3 inline-flex rounded-lg bg-primary-50 p-2.5 text-primary-800">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-primary-800">
                  {t(`government.roles.${key}.title`)}
                </p>
                <h3 className="mt-1 text-xl font-bold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {t(`government.roles.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <article
            lang="en"
            className="min-w-0 rounded-xl border border-gray-300 bg-white p-4 shadow-sm sm:p-6"
          >
            {article !== undefined ? (
              <div className="prose prose-gray max-w-none motion-safe:animate-fade-in prose-headings:tracking-tight prose-h2:mt-7 prose-h2:mb-3 prose-a:text-primary-700 prose-table:my-0 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 [&>:first-child]:mt-0">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <div
                        role="region"
                        aria-label="Municipal mayors and vice mayors"
                        tabIndex={0}
                        className="overflow-x-auto rounded-lg border border-gray-200"
                      >
                        <table className="min-w-[25rem] text-left">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th scope="col" className="bg-primary-50">
                        {children}
                      </th>
                    ),
                  }}
                >
                  {article}
                </ReactMarkdown>
              </div>
            ) : failed ? (
              <p lang={i18n.resolvedLanguage} role="status">
                {t('government.leadershipUnavailable')}
              </p>
            ) : (
              <div lang={i18n.resolvedLanguage}>
                <ArticleSkeleton label={t('government.leadershipLoading')} />
              </div>
            )}
          </article>

          <aside
            aria-labelledby="government-executive-resources"
            className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
          >
            <span className="mb-3 inline-flex rounded-lg bg-primary-50 p-2.5 text-primary-800">
              <Building2 size={21} aria-hidden="true" />
            </span>
            <h2
              id="government-executive-resources"
              className="text-lg font-bold"
            >
              {t('government.capitol')}
            </h2>
            <p className="mt-1 text-sm text-gray-700">
              Capitol Compound, Brgy. Santol, Boac 4900
            </p>
            <ul role="list" className="mt-3 divide-y divide-primary-100">
              <li>
                <a
                  href={officeDirectory}
                  className="portal-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                >
                  {t('government.fullDirectory')}{' '}
                  <ArrowUpRight
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <Link
                  to={governmentPaths.legislative}
                  className="portal-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                >
                  {t('government.legislative.link')}{' '}
                  <ArrowRight
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </GovernmentPage>
  );
}

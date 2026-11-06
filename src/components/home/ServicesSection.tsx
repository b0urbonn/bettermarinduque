import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ResultsSkeleton } from '../ui/LoadingSkeleton';
import PageGraphic from '../brand/PageGraphic';
import PageHeader from '../ui/PageHeader';
import OnlineServices from './OnlineServices';
import { citizenCharter, provincialWebsite } from '../../data/province';
import { levelOrder } from '../../data/levels';
import {
  getCategorySubcategories,
  serviceCategories,
} from '../../data/yamlLoader';

const categories = serviceCategories.categories;

async function loadGuides() {
  const indexes = await Promise.all(
    categories.map(category => getCategorySubcategories(category.slug))
  );
  return indexes.flatMap((index, position) =>
    index.pages.map(page => ({ ...page, category: categories[position] }))
  );
}

type ServiceGuide = Awaited<ReturnType<typeof loadGuides>>[number];

function normalizeSearch(text: string) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const { state } = useLocation();
  const focusGuide =
    typeof state?.focusGuide === 'string' ? state.focusGuide : undefined;
  const [guides, setGuides] = useState<ServiceGuide[]>();
  const query = params.get('q') ?? '';
  const activeCategory = categories.find(
    category => category.slug === params.get('category')
  );
  const activeLevel = levelOrder.find(level => level === params.get('level'));
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const results = guides?.filter(guide => {
    if (activeCategory && guide.category !== activeCategory) return false;
    if (activeLevel && !guide.levels?.includes(activeLevel)) return false;
    const text = normalizeSearch(
      `${guide.name} ${guide.description ?? ''} ${guide.category.category}`
    );
    return words.every(word => text.includes(word));
  });

  useEffect(() => {
    let current = true;
    void loadGuides().then(result => {
      if (current) setGuides(result);
    });
    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (!guides || !focusGuide) return;
    const link = document.getElementById(`service-result-${focusGuide}`);
    link?.focus({ preventScroll: true });
    link?.scrollIntoView({ block: 'center' });
  }, [guides, focusGuide]);

  function updateFilter(name: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    setParams(next, { replace: true, preventScrollReset: true });
  }

  function clearFilters() {
    const next = new URLSearchParams(params);
    next.delete('q');
    next.delete('category');
    next.delete('level');
    setParams(next, { replace: true, preventScrollReset: true });
    document.getElementById('service-search')?.focus();
  }

  return (
    <div lang={i18n.resolvedLanguage}>
      <PageHeader
        title={t('directory.heading')}
        description={t('directory.description')}
        illustration={<PageGraphic kind="services" />}
        breadcrumbItems={[
          { label: t('navbar.home'), href: '/' },
          { label: t('navbar.services') },
        ]}
      />
      <div className="portal-container py-7 sm:py-9">
        {i18n.resolvedLanguage === 'fil' && (
          <p className="mb-5 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-900">
            {t('directory.englishGuides')}
          </p>
        )}
        <div
          role="search"
          aria-label={t('hero.searchLabel')}
          className="rounded-lg border border-gray-300 bg-gray-50 p-4 sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.5fr)]">
            <div>
              <label
                htmlFor="service-search"
                className="mb-1.5 block text-sm font-semibold"
              >
                {t('hero.searchLabel')}
              </label>
              <div className="relative">
                <Search
                  size={19}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                />
                <input
                  id="service-search"
                  type="search"
                  value={query}
                  onChange={event => updateFilter('q', event.target.value)}
                  placeholder={t('hero.searchPlaceholder')}
                  className="min-h-11 w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-base placeholder:text-gray-700"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="service-category"
                className="mb-1.5 block text-sm font-semibold"
              >
                {t('directory.category')}
              </label>
              <select
                id="service-category"
                value={activeCategory?.slug ?? ''}
                onChange={event => updateFilter('category', event.target.value)}
                className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-base"
              >
                <option value="">{t('directory.allCategories')}</option>
                {categories.map(({ category, slug }) => (
                  <option key={slug} value={slug} lang="en">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            role="group"
            aria-label={t('directory.level')}
            className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-gray-200 pt-4"
          >
            <span className="text-sm font-semibold">
              {t('directory.level')}
            </span>
            <button
              type="button"
              aria-pressed={!activeLevel}
              onClick={() => updateFilter('level', '')}
              className={`min-h-9 rounded-full border px-3 text-sm font-semibold ${
                activeLevel
                  ? 'border-gray-300 bg-white text-gray-800 hover:border-primary-500 hover:text-primary-800'
                  : 'border-primary-700 bg-primary-700 text-white'
              }`}
            >
              {t('directory.allLevels')}
            </button>
            {levelOrder
              .filter(level => level !== 'national')
              .map(level => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={activeLevel === level}
                  onClick={() => updateFilter('level', level)}
                  className={`min-h-9 rounded-full border px-3 text-sm font-semibold ${
                    activeLevel === level
                      ? 'border-primary-700 bg-primary-700 text-white'
                      : 'border-gray-300 bg-white text-gray-800 hover:border-primary-500 hover:text-primary-800'
                  }`}
                >
                  {t(`levels.${level}`)}
                </button>
              ))}
          </div>
          <div className="mt-2 flex min-h-11 flex-wrap items-center justify-between gap-x-3">
            <p role="status" className="text-sm text-gray-700">
              {results
                ? t('directory.resultCount', { count: results.length })
                : t('directory.loading')}
            </p>
            {(query || activeCategory || activeLevel) && (
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-11 rounded-sm px-1 text-sm font-semibold text-primary-700 underline underline-offset-4"
              >
                {t('directory.clear')}
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-10">
          <section aria-labelledby="service-results-heading">
            <h2
              id="service-results-heading"
              className="border-b border-gray-300 pb-3 text-xl font-bold tracking-tight"
            >
              {t('directory.guides')}
            </h2>
            {results?.length === 0 && (
              <p className="py-5 text-gray-700">{t('directory.noResults')}</p>
            )}
            {!results && (
              <div className="mt-3">
                <ResultsSkeleton />
              </div>
            )}
            <ul
              lang="en"
              hidden={!results?.length}
              className="mt-3 space-y-2.5 motion-safe:animate-fade-in"
            >
              {results?.map(({ name, slug, category, description, levels }) => {
                const guideKey = `${category.slug}/${slug}`;
                return (
                  <li key={guideKey}>
                    <Link
                      id={`service-result-${guideKey}`}
                      aria-labelledby={`service-title-${guideKey}`}
                      to={`/services/${guideKey}`}
                      state={{ serviceSearch: params.toString() }}
                      className="group flex min-h-14 items-center justify-between gap-3 rounded-md border border-gray-300 px-4 py-3.5 hover:border-primary-500 hover:bg-primary-50 active:bg-primary-100 motion-safe:transition-colors motion-safe:duration-150"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-700">
                          {category.category}
                        </p>
                        <h3
                          id={`service-title-${guideKey}`}
                          className="mt-1 text-base leading-snug font-bold text-primary-800 group-hover:underline"
                        >
                          {name}
                        </h3>
                        {description && (
                          <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                            {description}
                          </p>
                        )}
                        {levels && (
                          <p
                            lang={i18n.resolvedLanguage}
                            className="mt-2 flex flex-wrap gap-1.5"
                          >
                            {levels.map(level => (
                              <span
                                key={level}
                                className="rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-800"
                              >
                                {t(`levels.${level}`)}
                              </span>
                            ))}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        size={19}
                        className="shrink-0 text-primary-700"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <aside
            aria-labelledby="official-resources-heading"
            className="self-start rounded-md border border-gray-300 bg-gray-50 p-4"
          >
            <h2 id="official-resources-heading" className="font-bold">
              {t('directory.officialResources')}
            </h2>
            <ul className="mt-2 text-sm">
              <li>
                <a
                  href={citizenCharter}
                  className="portal-link inline-flex min-h-11 items-center gap-1"
                >
                  {t('directory.charter')}{' '}
                  <ArrowUpRight
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <a
                  href={provincialWebsite + '/contact-us/'}
                  className="portal-link inline-flex min-h-11 items-center gap-1"
                >
                  {t('directory.officeDirectory')}{' '}
                  <ArrowUpRight
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <Link
                  to="/government"
                  className="portal-link inline-flex min-h-11 items-center"
                >
                  {t('directory.departments')}
                </Link>
              </li>
            </ul>
          </aside>
        </div>
        <OnlineServices />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { ArrowRight, FileText, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  getCategorySubcategories,
  serviceCategories,
} from '../../data/yamlLoader';

const categories = serviceCategories.categories;

export default function ServiceCategories() {
  const { t, i18n } = useTranslation();
  const [guideCounts, setGuideCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let current = true;
    void Promise.all(
      categories.map(category => getCategorySubcategories(category.slug))
    ).then(indexes => {
      if (!current) return;
      setGuideCounts(
        Object.fromEntries(
          indexes.map((index, position) => [
            categories[position].slug,
            index.pages.length,
          ])
        )
      );
    });
    return () => {
      current = false;
    };
  }, []);

  return (
    <section
      aria-labelledby="service-categories-heading"
      lang={i18n.resolvedLanguage}
      className="portal-container py-16 sm:py-20"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 max-w-2xl">
          <p className="eyebrow">{t('services.eyebrow', 'Service guides')}</p>
          <h2 id="service-categories-heading" className="section-title mt-2">
            {t('services.browse')}
          </h2>
          <p className="mt-3 text-gray-700">
            {t('services.browseDescription')}
          </p>
        </div>
        <Link to="/services" className="btn btn-primary">
          {t('services.viewAll')}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <ul lang="en" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ category, slug, description, icon }, index) => {
          const Icon =
            (LucideIcons[icon as keyof typeof LucideIcons] as
              | React.ComponentType<{ size?: number; className?: string }>
              | undefined) ?? FileText;
          const count = guideCounts[slug];
          return (
            <li key={slug} className={index === 0 ? 'lg:col-span-2' : ''}>
              <Link
                to={`/services?category=${slug}`}
                className={`group card card-hover flex h-full flex-col p-5 ${
                  index === 0
                    ? 'bg-linear-to-br from-primary-50 via-white to-white'
                    : ''
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="icon-tile size-11 transition-colors duration-200 group-hover:bg-primary-700 group-hover:text-white">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className="chip">
                    {count === undefined
                      ? t('directory.guides')
                      : t('services.guideCount', { count })}
                  </span>
                </span>
                <h3 className="mt-4 text-lg leading-snug font-bold text-gray-900 group-hover:text-primary-800">
                  {category}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                  {t('services.openCategory', 'Open guides')}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            to="/services"
            className="group flex h-full min-h-44 flex-col justify-between rounded-2xl bg-primary-800 p-5 text-white transition-colors duration-200 hover:bg-primary-900"
          >
            <Search size={22} aria-hidden="true" className="text-accent-300" />
            <span>
              <span className="block font-display text-lg font-bold">
                {t('services.cantFind', 'Not sure where to start?')}
              </span>
              <span className="mt-1 block text-sm text-white/80">
                {t(
                  'services.cantFindBody',
                  'Search every guide by keyword, topic, or level of government.'
                )}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-200">
              {t('services.viewAll')}
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

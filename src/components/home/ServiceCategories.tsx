import { useEffect, useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
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
      className="portal-container border-t border-gray-300 py-8 md:py-10"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 max-w-2xl">
          <h2
            id="service-categories-heading"
            className="text-2xl font-bold tracking-tight"
          >
            {t('services.browse')}
          </h2>
          <p className="mt-2 text-gray-700">
            {t('services.browseDescription')}
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary-700 px-3 text-sm font-semibold text-white hover:bg-primary-800"
        >
          {t('services.viewAll')}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <ul lang="en" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ category, slug, description, icon }) => {
          const Icon =
            (LucideIcons[icon as keyof typeof LucideIcons] as
              | React.ComponentType<{ size?: number; className?: string }>
              | undefined) ?? FileText;
          const count = guideCounts[slug];
          return (
            <li key={slug}>
              <Link
                to={`/services?category=${slug}`}
                className="group flex h-full flex-col rounded-xl border border-gray-300 bg-white p-4 hover:border-primary-500 hover:bg-primary-50 motion-safe:transition-colors motion-safe:duration-150"
              >
                <span className="flex items-center gap-3">
                  <span className="shrink-0 rounded-md bg-primary-50 p-2 text-primary-700 group-hover:bg-white">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="leading-snug font-bold text-primary-900 group-hover:underline">
                    {category}
                  </h3>
                </span>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-gray-700">
                  {description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                  {count === undefined
                    ? t('directory.guides')
                    : t('services.guideCount', { count })}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

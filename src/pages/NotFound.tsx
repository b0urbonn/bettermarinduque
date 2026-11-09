import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import PageHeader from '../components/ui/PageHeader';
import PageGraphic from '../components/brand/PageGraphic';
import { mainNavigation } from '../data/navigation';

const sections = mainNavigation.filter(({ href }) => !href.startsWith('http'));

export default function NotFound() {
  const { t, i18n } = useTranslation();

  return (
    <div lang={i18n.resolvedLanguage}>
      <SEO
        title={t('notFound.title')}
        description={t('notFound.description')}
      />
      <PageHeader
        title={t('notFound.title')}
        description={t('notFound.description')}
        illustration={<PageGraphic kind="search" />}
        breadcrumbItems={[
          { label: t('navbar.home'), href: '/' },
          { label: '404' },
        ]}
      />
      <div className="portal-container py-8 md:py-10">
        <p className="eyebrow">{t('notFound.eyebrow', 'Page not found')}</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-gray-900">
          {t('notFound.popular')}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ label, href }) => (
            <li key={href}>
              <Link
                to={href}
                className="group card card-hover flex min-h-14 items-center justify-between gap-3 p-4 font-semibold text-primary-800"
              >
                {t(`navbar.${label.toLowerCase()}`, { defaultValue: label })}
                <ArrowRight
                  size={17}
                  className="shrink-0 text-primary-700 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-gray-700">
          <Link
            to="/services"
            className="portal-link inline-flex items-center gap-1.5 font-semibold"
          >
            <Search size={15} aria-hidden="true" />
            {t('notFound.searchHint')}
          </Link>
        </p>
      </div>
    </div>
  );
}

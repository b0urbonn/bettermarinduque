import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { municipalities } from '../data/municipalities';
import { municipalityBoundaries } from '../data/municipalityBoundaries';
import PageHeader from '../components/ui/PageHeader';
import SEO from '../components/SEO';
import MunicipalityPhoto, {
  MunicipalityPhotoCredit,
} from '../components/brand/MunicipalityPhoto';
import { municipalWebsites } from '../data/municipalityMedia';
import { localGovernmentDirectory } from '../data/municipalityGuides';

export default function MunicipalitiesPage() {
  const { t, i18n } = useTranslation();
  const title = t('towns.pageTitle');
  const description = t('towns.pageDescription');

  return (
    <div lang={i18n.resolvedLanguage}>
      <SEO title={title} description={description} />
      <PageHeader
        title={title}
        description={description}
        breadcrumbItems={[
          { label: t('navbar.home'), href: '/' },
          { label: title },
        ]}
      />
      <ul className="portal-container grid gap-4 py-7 sm:grid-cols-2 sm:py-9 lg:grid-cols-3">
        {municipalities.map(town => (
          <li
            key={town.slug}
            className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white"
          >
            <Link
              to={`/municipalities/${town.slug}`}
              className="group flex flex-1 flex-col p-5 hover:bg-primary-50"
            >
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-md bg-primary-50">
                <MunicipalityPhoto slug={town.slug} slideshow />
                <div className="absolute bottom-2 right-2 rounded-md border border-primary-100 bg-white/95 p-1 shadow-sm">
                  <svg
                    viewBox="0 0 440 440"
                    role="img"
                    aria-label={`${town.name} highlighted on the map of Marinduque`}
                    focusable="false"
                    className="size-20"
                  >
                    {Object.entries(municipalityBoundaries).map(
                      ([code, boundary]) => (
                        <path
                          key={code}
                          d={boundary.path}
                          fillRule="evenodd"
                          strokeWidth="3"
                          strokeLinejoin="round"
                          className={
                            code === town.code
                              ? 'fill-primary-700 stroke-white group-hover:fill-primary-800'
                              : 'fill-primary-200 stroke-white'
                          }
                        />
                      )
                    )}
                  </svg>
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">
                {t(
                  town.slug === 'boac' ? 'towns.capital' : 'towns.municipality'
                )}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-primary-900">
                {town.name}
              </h2>
              <p
                lang="en"
                className="mt-2 flex-1 text-sm leading-relaxed text-gray-700"
              >
                {town.description}
              </p>
              <p className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-700">
                {town.barangays} {t('hero.stats.barangays')}
              </p>
              <span className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-700 group-hover:underline">
                {t('towns.openGuide')}
                <ArrowRight size={17} aria-hidden="true" />
              </span>
            </Link>
            <div className="border-t border-gray-200 px-5 py-3">
              <a
                href={
                  municipalWebsites[town.slug]?.url ?? localGovernmentDirectory
                }
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-700 hover:underline"
              >
                {municipalWebsites[town.slug]?.label ?? 'Government directory'}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <p className="mt-1 text-xs leading-relaxed text-gray-700">
                <MunicipalityPhotoCredit slug={town.slug} slideshow />
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p
        lang="en"
        className="portal-container pb-8 text-xs leading-relaxed text-gray-700"
      >
        Each map highlights the town within Marinduque. Simplified boundaries
        from NAMRIA and PSA via OCHA COD-AB, prepared by{' '}
        <a
          href="https://github.com/faeldon/philippines-json-maps"
          className="portal-link"
        >
          Philippines JSON Maps
        </a>
        {' · '}
        <a
          href="https://creativecommons.org/licenses/by/3.0/igo/"
          className="portal-link"
        >
          CC BY 3.0 IGO
        </a>
        .
      </p>
    </div>
  );
}

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { municipalities } from '../data/municipalities';
import { municipalityBoundaries } from '../data/municipalityBoundaries';
import { provinceFacts } from '../data/province';
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
        eyebrow={t('towns.eyebrow', 'Six towns')}
        title={title}
        description={description}
        breadcrumbItems={[
          { label: t('navbar.home'), href: '/' },
          { label: title },
        ]}
      />
      <div className="border-b border-gray-200 bg-white">
        <dl className="portal-container grid grid-cols-2 divide-gray-200 py-5 sm:grid-cols-4 sm:divide-x">
          {[
            {
              label: t('hero.stats.population'),
              value: provinceFacts.population,
            },
            {
              label: t('hero.stats.municipalities'),
              value: provinceFacts.municipalities,
            },
            {
              label: t('hero.stats.barangays'),
              value: provinceFacts.barangays,
            },
            {
              label: t('towns.area', 'Land area'),
              value: `${provinceFacts.area} km²`,
            },
          ].map(({ label, value }) => (
            <div key={label} className="px-1 py-2 sm:px-6 sm:first:pl-0">
              <dt className="text-sm text-gray-600">{label}</dt>
              <dd className="font-display text-2xl font-extrabold tabular-nums tracking-tight text-primary-900">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="portal-container grid gap-5 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-3">
        {municipalities.map((town, index) => (
          <li
            key={town.slug}
            style={{ animationDelay: `${index * 70}ms` }}
            className="group card card-hover flex h-full flex-col overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards"
          >
            <Link
              to={`/municipalities/${town.slug}`}
              className="flex flex-1 flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-primary-900">
                <div className="size-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <MunicipalityPhoto slug={town.slug} />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-primary-950/90 via-primary-950/20 to-transparent" />
                <div className="absolute top-3 right-3 rounded-xl bg-white/90 p-1 shadow-sm backdrop-blur-sm">
                  <svg
                    viewBox="0 0 440 440"
                    role="img"
                    aria-label={`${town.name} highlighted on the map of Marinduque`}
                    focusable="false"
                    className="size-16"
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
                              ? 'fill-primary-700 stroke-white'
                              : 'fill-primary-200 stroke-white'
                          }
                        />
                      )
                    )}
                  </svg>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="eyebrow text-accent-200">
                    {t(
                      town.slug === 'boac'
                        ? 'towns.capital'
                        : 'towns.municipality'
                    )}
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
                    {town.name}
                  </h2>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p lang="en" className="text-sm font-semibold text-primary-800">
                  {town.tagline}
                </p>
                <p
                  lang="en"
                  className="mt-1 flex-1 text-sm leading-relaxed text-gray-700"
                >
                  {town.description}
                </p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center">
                  {[
                    {
                      label: t('hero.stats.population'),
                      value: town.population,
                    },
                    { label: t('hero.stats.barangays'), value: town.barangays },
                    { label: 'km²', value: town.area.toFixed(2) },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-gray-50 py-2">
                      <dt className="text-[11px] font-medium text-gray-600 uppercase">
                        {label}
                      </dt>
                      <dd className="font-display font-extrabold tabular-nums text-gray-900">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                  {t('towns.openGuide')}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
            <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-3">
              <a
                href={
                  municipalWebsites[town.slug]?.url ?? localGovernmentDirectory
                }
                className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
              >
                {municipalWebsites[town.slug]?.label ?? 'Government directory'}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                <MunicipalityPhotoCredit slug={town.slug} />
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p
        lang="en"
        className="portal-container pb-12 text-xs leading-relaxed text-gray-600"
      >
        Population from the PSA 2024 Census (July 1, 2024). Each map highlights
        the town within Marinduque. Simplified boundaries from NAMRIA and PSA
        via OCHA COD-AB, prepared by{' '}
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

import { municipalities } from '../../data/municipalities';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { municipalityBoundaries } from '../../data/municipalityBoundaries';
import { populationSource, provincePSGC } from '../../data/province';
import MunicipalityPhoto from '../brand/MunicipalityPhoto';

const boundariesSource =
  'https://github.com/faeldon/philippines-json-maps/blob/master/latest/geojson/provdists/lowres/municities-provdist-1704000000.0.001.json';
const officialsSource =
  'https://www.foi.gov.ph/agencies/dilg/list-of-elected-local-officials/';

function googleMaps(place: string) {
  return (
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(place)
  );
}

export default function Municipalities() {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();
  const town =
    municipalities.find(item => item.slug === params.get('municipality')) ??
    municipalities[0];

  const selectTown = (slug: string) => {
    if (slug === town.slug) return;
    const next = new URLSearchParams(params);
    next.set('municipality', slug);
    void navigate(
      { search: next.toString(), hash },
      { preventScrollReset: true }
    );
  };

  return (
    <section
      id="municipalities"
      lang={i18n.resolvedLanguage}
      aria-labelledby="municipality-heading"
      className="bg-sand-50"
    >
      <div className="portal-container py-16 sm:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">{t('towns.eyebrow', 'Six towns')}</p>
            <h2 id="municipality-heading" className="section-title mt-2">
              {t('towns.heading')}
            </h2>
            <p className="mt-3 text-gray-700">{t('towns.description')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {pathname !== '/municipalities' && (
              <Link to="/municipalities" className="btn btn-primary">
                {t('towns.viewAll')}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            )}
            <a
              href={googleMaps('Marinduque, Philippines')}
              className="btn btn-secondary"
            >
              <MapPin size={16} aria-hidden="true" /> {t('towns.provinceMap')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <label htmlFor="municipality-picker" className="sr-only">
            {t('towns.selectLabel')}
          </label>
          <select
            id="municipality-picker"
            value={town.slug}
            onChange={event => selectTown(event.target.value)}
            className="field w-auto min-w-48 sm:hidden"
          >
            {municipalities.map(({ slug, name }) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
          <div
            role="group"
            aria-label={t('towns.selectLabel')}
            className="hidden flex-wrap gap-2 sm:flex"
          >
            {municipalities.map(({ slug, name }) => (
              <button
                key={slug}
                type="button"
                aria-pressed={town.slug === slug}
                onClick={() => selectTown(slug)}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors duration-150 ${
                  town.slug === slug
                    ? 'border-primary-700 bg-primary-700 text-white shadow-sm'
                    : 'border-gray-300 bg-white text-gray-800 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="card relative min-w-0 overflow-hidden bg-linear-to-br from-primary-50 via-white to-sand-100 p-4 sm:p-6">
            <span
              className="absolute top-4 left-4 inline-flex size-9 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-700 shadow-sm ring-1 ring-gray-200"
              aria-label="North"
            >
              N
            </span>
            <svg
              viewBox="0 0 440 440"
              role="group"
              aria-label="Map of Marinduque municipalities"
              className="mx-auto block w-full max-w-[22rem] drop-shadow-[0_18px_24px_rgb(18_44_100/0.18)] lg:max-w-[30rem]"
            >
              {municipalities.map(({ code, slug, name }) => {
                const { path, label } = municipalityBoundaries[code];
                const isSelected = town.slug === slug;
                return (
                  <g
                    key={code}
                    role="button"
                    tabIndex={0}
                    aria-label={name}
                    aria-pressed={isSelected}
                    className="group cursor-pointer focus:outline-none"
                    onClick={() => selectTown(slug)}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        selectTown(slug);
                      }
                    }}
                  >
                    <path
                      d={path}
                      fillRule="evenodd"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      className={`stroke-white transition-[fill] duration-300 group-focus-visible:stroke-primary-900 group-focus-visible:stroke-[3] ${isSelected ? 'fill-primary-700' : 'fill-primary-200/80 group-hover:fill-primary-300'}`}
                    />
                    <text
                      x={label[0]}
                      y={label[1]}
                      dominantBaseline="central"
                      textAnchor="middle"
                      aria-hidden="true"
                      className={`pointer-events-none text-[14px] font-bold ${isSelected ? 'fill-white' : 'fill-primary-950'}`}
                    >
                      {name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p lang="en" className="mt-2 text-center text-xs text-gray-600">
              Tap a town on the map to see its details.
            </p>
          </div>

          <article
            key={town.slug}
            aria-label="Municipality information"
            className="card flex flex-col overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
          >
            <div className="relative aspect-[16/8] bg-primary-900">
              <MunicipalityPhoto slug={town.slug} />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/85 via-primary-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="eyebrow text-accent-200">
                  {t(
                    town.slug === 'boac'
                      ? 'towns.capital'
                      : 'towns.municipality'
                  )}
                </p>
                <h3 className="mt-1 text-3xl font-extrabold tracking-tight">
                  {town.name}
                </h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p lang="en" className="text-sm font-semibold text-primary-800">
                {town.tagline}
              </p>
              <p
                lang="en"
                className="mt-1 text-sm leading-relaxed text-gray-700"
              >
                {town.description}
              </p>
              <dl className="my-5 grid grid-cols-3 divide-x divide-gray-200 rounded-xl bg-gray-50 py-3 text-center ring-1 ring-gray-200">
                {[
                  { label: t('hero.stats.population'), value: town.population },
                  { label: t('hero.stats.barangays'), value: town.barangays },
                  {
                    label: t('towns.area', 'Land area'),
                    value: `${town.area.toFixed(2)} km²`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="px-2">
                    <dt className="text-xs text-gray-600">{label}</dt>
                    <dd className="mt-0.5 font-display text-xl font-extrabold tabular-nums text-primary-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-wrap gap-2">
                <Link
                  to={`/municipalities/${town.slug}`}
                  className="btn btn-primary"
                >
                  {t('towns.openGuide')}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a
                  href={googleMaps(`${town.name}, Marinduque, Philippines`)}
                  className="btn btn-secondary"
                >
                  <MapPin size={16} aria-hidden="true" /> {t('towns.openMap')}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
              <details
                lang="en"
                className="group mt-5 border-t border-gray-200"
              >
                <summary
                  lang={i18n.resolvedLanguage}
                  className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-2 text-sm font-semibold text-gray-900 [&::-webkit-details-marker]:hidden"
                >
                  {t('towns.details')}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="details-body pb-2">
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: 'Mayor', value: town.mayor },
                      { label: 'Vice mayor', value: town.viceMayor },
                      {
                        label: 'Income class',
                        value: `${town.incomeClass} class`,
                      },
                      { label: 'PSGC code', value: town.code },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-gray-600">{label}</dt>
                        <dd className="mt-0.5 font-semibold tabular-nums">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-xs text-gray-600">
                    Elected officials, 2025–2028 term. Population as of July 1,
                    2024.
                  </p>
                  <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    <a href={populationSource} className="portal-link">
                      2024 Census
                    </a>
                    <a
                      href={`https://psa.gov.ph/classification/psgc/barangays/${town.code}`}
                      className="portal-link"
                    >
                      PSA barangay directory
                    </a>
                    <a href={provincePSGC} className="portal-link">
                      PSA province profile
                    </a>
                    <a href={officialsSource} className="portal-link">
                      DILG officials directory
                    </a>
                  </p>
                </div>
              </details>
            </div>
          </article>
        </div>
        <p lang="en" className="mt-4 text-xs text-gray-600">
          Simplified municipal boundaries for general reference. Data from
          NAMRIA and PSA via OCHA COD-AB, prepared by{' '}
          <a href={boundariesSource} className="portal-link">
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
        <p className="sr-only" role="status">
          {t('towns.selected', {
            name: town.name,
            population: town.population,
            barangays: town.barangays,
          })}
        </p>
      </div>
    </section>
  );
}

import { municipalities } from '../../data/municipalities';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { municipalityBoundaries } from '../../data/municipalityBoundaries';
import { populationSource, provincePSGC } from '../../data/province';

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
      className={`portal-container py-8 md:py-10 ${
        pathname === '/municipalities' ? '' : 'border-t border-gray-300'
      }`}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="municipality-heading"
            className="text-2xl font-bold tracking-tight"
          >
            {t('towns.heading')}
          </h2>
          <p className="mt-3 text-gray-700">{t('towns.description')}</p>
        </div>
        {pathname !== '/municipalities' && (
          <Link
            to="/municipalities"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary-700 px-3 text-sm font-semibold text-white hover:bg-primary-800"
          >
            {t('towns.viewAll')}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        )}
        <a
          href={googleMaps('Marinduque, Philippines')}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-semibold text-primary-700 hover:bg-primary-50"
        >
          <MapPin size={17} aria-hidden="true" /> {t('towns.provinceMap')}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 sm:p-5">
        <div className="mb-4 sm:max-w-sm">
          <label
            htmlFor="municipality-picker"
            className="mb-1.5 block text-sm font-semibold"
          >
            {t('towns.selectLabel')}
          </label>
          <select
            id="municipality-picker"
            value={town.slug}
            onChange={event => selectTown(event.target.value)}
            className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-base text-gray-900"
          >
            {municipalities.map(({ slug, name }) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative min-w-0 rounded-lg bg-primary-50">
            <span
              className="absolute left-3 top-3 text-xs font-medium text-gray-700"
              aria-label="North"
            >
              N ↑
            </span>
            <svg
              viewBox="0 0 440 440"
              role="group"
              aria-label="Map of Marinduque municipalities"
              className="mx-auto block w-full max-w-[20rem] lg:max-w-[26rem]"
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
                      className={`stroke-white group-focus-visible:stroke-primary-900 group-focus-visible:stroke-[3] ${isSelected ? 'fill-primary-700' : 'fill-gray-300 group-hover:fill-primary-200'}`}
                    />
                    <text
                      x={label[0]}
                      y={label[1]}
                      dominantBaseline="central"
                      textAnchor="middle"
                      aria-hidden="true"
                      className={`pointer-events-none text-[15px] font-semibold ${isSelected ? 'fill-white' : 'fill-gray-900'}`}
                    >
                      {name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div
            className="rounded-xl border border-gray-300 bg-white p-4 sm:p-5"
            aria-label="Municipality information"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-primary-700">
              {t(town.slug === 'boac' ? 'towns.capital' : 'towns.municipality')}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-primary-700">
              {town.name}
            </h3>
            <p lang="en" className="mt-2 text-sm leading-relaxed text-gray-700">
              {town.description}
            </p>
            <dl className="my-4 grid grid-cols-2 gap-4 border-y border-gray-300 py-3">
              <div>
                <dt className="text-sm text-gray-700">
                  {t('hero.stats.population')}
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-primary-700">
                  {town.population}
                </dd>
                <dd className="text-xs text-gray-700">1 July 2024</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-700">
                  {t('hero.stats.barangays')}
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-primary-700">
                  {town.barangays}
                </dd>
                <dd className="text-xs text-gray-700">PSGC</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/municipalities/${town.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary-700 px-3 font-semibold text-white hover:bg-primary-800"
              >
                {t('towns.openGuide')}{' '}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href={googleMaps(`${town.name}, Marinduque, Philippines`)}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-semibold text-primary-800 hover:bg-primary-50"
              >
                <MapPin size={16} aria-hidden="true" /> {t('towns.openMap')}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <details lang="en" className="group mt-4 border-t border-gray-300">
              <summary
                lang={i18n.resolvedLanguage}
                className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden"
              >
                {t('towns.details')}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 group-open:rotate-180"
                />
              </summary>
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-900">
                  Elected officials{' '}
                  <span className="font-normal text-gray-700">· 2025–2028</span>
                </h4>
                <dl className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-gray-700">Mayor</dt>
                    <dd className="mt-0.5 font-semibold">{town.mayor}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-700">Vice mayor</dt>
                    <dd className="mt-0.5 font-semibold">{town.viceMayor}</dd>
                  </div>
                </dl>
              </div>
              <dl className="mb-5 grid grid-cols-2 gap-3 border-t border-gray-300 pt-4 text-sm">
                <div>
                  <dt className="text-gray-700">Income class</dt>
                  <dd className="mt-0.5 font-semibold">
                    {town.incomeClass} class
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-700">PSGC code</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">
                    {town.code}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-gray-700">
                <a href={populationSource} className="portal-link">
                  2024 Census
                </a>
                {' · '}
                <a
                  href={`https://psa.gov.ph/classification/psgc/barangays/${town.code}`}
                  className="portal-link"
                >
                  PSA barangay directory
                </a>
                {' · '}
                <a href={provincePSGC} className="portal-link">
                  PSA province profile
                </a>
                {' · '}
                <a href={officialsSource} className="portal-link">
                  DILG officials directory
                </a>
                {' · '}
                <Link to="/government" className="portal-link">
                  Provincial leadership
                </Link>
              </p>
            </details>
          </div>
        </div>
      </div>
      <p lang="en" className="mt-3 text-xs text-gray-700">
        Simplified municipal boundaries for general reference. Data from NAMRIA
        and PSA via OCHA COD-AB, prepared by{' '}
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
    </section>
  );
}

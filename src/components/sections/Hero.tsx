import {
  ArrowUpRight,
  Building2,
  Calendar,
  Map as MapIcon,
  MapPin,
  Mountain,
  Search,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  populationSource,
  provinceFacts,
  provincePSGC,
  socioEconomicProfile,
} from '../../data/province';
import islandAerial from '../../assets/marinduque-island-aerial.jpg';
import maniwayaShore from '../../assets/maniwaya-island-shore.jpg';
import morionesParade from '../../assets/marinduque-moriones-parade.jpg';
import mountMalindig from '../../assets/mount-malindig.jpg';
import MarinduqueMap from '../brand/MarinduqueMap';

const heroBackgrounds = [
  { src: islandAerial, caption: 'Marinduque from the air' },
  { src: maniwayaShore, caption: 'Maniwaya Island, Santa Cruz' },
  { src: mountMalindig, caption: 'Mount Malindig, Buenavista' },
  { src: morionesParade, caption: 'Moriones parade, Holy Week' },
];

function useRotatingIndex(length: number, delay: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % length);
    }, delay);
    return () => window.clearInterval(interval);
  }, [length, delay]);

  return activeIndex;
}

const statistics = [
  { label: 'population', value: provinceFacts.population, Icon: Users },
  {
    label: 'municipalities',
    value: String(provinceFacts.municipalities),
    Icon: Building2,
  },
  { label: 'barangays', value: String(provinceFacts.barangays), Icon: MapPin },
  { label: 'capital', value: provinceFacts.capital, Icon: MapIcon },
];

const popularServices = [
  { label: 'business', to: '/services?category=business' },
  { label: 'health', to: '/services?category=health-services' },
  { label: 'scholarships', to: '/services?q=scholarships' },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const activeIndex = useRotatingIndex(heroBackgrounds.length, 7000);

  return (
    <section
      aria-labelledby="home-heading"
      lang={i18n.resolvedLanguage}
      className="relative isolate overflow-hidden bg-primary-950 text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {heroBackgrounds.map(({ src }, index) => (
          <img
            key={src}
            src={src}
            alt=""
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[2000ms] ease-out motion-reduce:transition-none ${
              index === activeIndex
                ? 'scale-100 opacity-100'
                : 'scale-105 opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-primary-950 via-primary-950/80 to-primary-950/25" />
        <div className="absolute inset-0 bg-linear-to-t from-primary-950 via-transparent to-primary-950/40" />
      </div>

      <div className="portal-container relative grid items-center gap-10 pt-14 pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)] lg:pt-24 lg:pb-32">
        <div className="min-w-0 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-accent-300" />
            {t('hero.eyebrow', {
              defaultValue: 'The Heart of the Philippines · MIMAROPA',
            })}
          </p>
          <h1
            id="home-heading"
            className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em]"
          >
            {t('hero.heading')}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {t('hero.subtitle')}
          </p>
          <form
            method="get"
            action="/services"
            role="search"
            aria-label={t('hero.searchLabel')}
            className="mt-8 max-w-2xl"
            onSubmit={event => {
              event.preventDefault();
              const query = String(
                new FormData(event.currentTarget).get('q') ?? ''
              ).trim();
              void navigate(
                query
                  ? '/services?' + new URLSearchParams({ q: query })
                  : '/services'
              );
            }}
          >
            <label htmlFor="home-service-search" className="sr-only">
              {t('hero.searchLabel')}
            </label>
            <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/40 focus-within:ring-4 focus-within:ring-accent-300/60">
              <Search
                size={20}
                aria-hidden="true"
                className="shrink-0 text-gray-500"
              />
              <input
                id="home-service-search"
                name="q"
                type="search"
                placeholder={t('hero.searchPlaceholder')}
                className="min-h-12 min-w-0 flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-600 focus:outline-none"
              />
              <button type="submit" className="btn btn-primary min-h-12 px-6">
                {t('hero.searchButton')}
              </button>
            </div>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-white/70">{t('hero.popular')}:</span>
            {popularServices.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex min-h-9 items-center rounded-full border border-white/25 bg-white/5 px-3.5 font-medium backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/15 focus-visible:outline-white"
              >
                {t(`hero.topics.${label}`)}
              </Link>
            ))}
          </div>
        </div>

        <aside
          aria-label={t('hero.provinceFacts')}
          className="relative hidden overflow-hidden rounded-3xl border border-white/15 bg-primary-950/55 p-6 shadow-2xl backdrop-blur-md lg:block"
        >
          <MarinduqueMap className="pointer-events-none absolute -top-6 -right-10 size-56 text-accent-200/25" />
          <p className="eyebrow relative text-accent-200">
            {t('hero.provinceFacts')}
          </p>
          <dl className="relative mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
            {statistics.map(({ label, value, Icon }) => (
              <div key={label}>
                <dt className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                  <Icon size={14} aria-hidden="true" />
                  {t(`hero.stats.${label}`)}
                </dt>
                <dd className="mt-1 font-display text-3xl font-extrabold tabular-nums tracking-tight">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="relative mt-6 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/65">
            2024 Census of Population, as of July 1, 2024 ·{' '}
            <a
              href={populationSource}
              className="underline underline-offset-2 hover:text-white"
            >
              PSA
            </a>
          </p>
        </aside>
      </div>

      <p className="absolute top-4 right-4 hidden items-center gap-2 rounded-full bg-primary-950/40 px-3 py-1.5 text-xs text-white/75 backdrop-blur-sm sm:flex">
        <span aria-hidden="true" className="flex gap-1">
          {heroBackgrounds.map(({ src }, index) => (
            <span
              key={src}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </span>
        {heroBackgrounds[activeIndex].caption} ·{' '}
        <a href="/image-credits.html" className="underline hover:text-white">
          Photo credits
        </a>
      </p>
    </section>
  );
}

const facts = [
  {
    key: 'area',
    Icon: MapIcon,
    value: `${provinceFacts.area} km²`,
    label: 'Land area',
    note: 'An island province near the geographic center of the archipelago',
  },
  {
    key: 'peak',
    Icon: Mountain,
    value: `${provinceFacts.highestElevation} m`,
    label: 'Mount Malindig',
    note: 'The highest point, a potentially active stratovolcano in Buenavista',
  },
  {
    key: 'founded',
    Icon: Calendar,
    value: '1921',
    label: 'Founded as a province',
    note: 'Separated from Tayabas; founding day is celebrated every February 21',
  },
  {
    key: 'people',
    Icon: Users,
    value: provinceFacts.population,
    label: 'Residents',
    note: 'Boac and Santa Cruz are the most populous towns',
  },
];

export function ProvinceFacts() {
  const { t, i18n } = useTranslation();

  return (
    <section
      aria-labelledby="province-facts"
      lang={i18n.resolvedLanguage}
      className="portal-container py-14 sm:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <div>
          <p className="eyebrow">{t('hero.factsEyebrow', 'The province')}</p>
          <h2 id="province-facts" className="section-title mt-2">
            {t('hero.provinceFacts')}
          </h2>
          <p lang="en" className="mt-4 leading-relaxed text-gray-700">
            Marinduque is a heart-shaped island province in the MIMAROPA region,
            between Tayabas Bay and the Sibuyan Sea. Its six towns share a
            Tagalog dialect noted for archaic features, an economy built on
            coconut, rice, fishing, and handicrafts, and the Holy Week Moryonan
            that draws visitors every year.
          </p>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={populationSource} className="portal-link">
              {t('hero.censusSource')}
            </a>
            <a href={provincePSGC} className="portal-link">
              {t('hero.psgcSource')}
            </a>
            <a
              href={socioEconomicProfile}
              className="portal-link inline-flex items-center gap-1"
            >
              Socio-economic profile
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
        </div>
        <dl lang="en" className="grid gap-3 sm:grid-cols-2">
          {facts.map(({ key, Icon, value, label, note }) => (
            <div key={key} className="card flex gap-4 p-5">
              <span className="icon-tile">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-semibold text-gray-700">{label}</dt>
                <dd className="mt-0.5 font-display text-2xl font-extrabold tabular-nums tracking-tight text-primary-900">
                  {value}
                </dd>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600">
                  {note}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

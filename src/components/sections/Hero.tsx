import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { populationSource, provincePSGC } from '../../data/province';
import islandAerial from '../../assets/marinduque-island-aerial.jpg';
import maniwayaShore from '../../assets/maniwaya-island-shore.jpg';
import morionesParade from '../../assets/marinduque-moriones-parade.jpg';
import mountMalindig from '../../assets/mount-malindig.jpg';
import HomeHeroGraphic from '../brand/HomeHeroGraphic';
import Wordmark from '../brand/Wordmark';

const heroBackgrounds = [
  islandAerial,
  maniwayaShore,
  mountMalindig,
  morionesParade,
];

function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % heroBackgrounds.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {heroBackgrounds.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          className={`absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-[1600ms] ease-in-out motion-reduce:transition-none ${
            index === activeIndex ? 'opacity-40' : ''
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-primary-900/45" />
    </div>
  );
}

const statistics = [
  { label: 'population', value: '226,522' },
  { label: 'municipalities', value: '6' },
  { label: 'barangays', value: '218' },
  { label: 'capital', value: 'Boac' },
];

const popularServices = [
  { label: 'business', to: '/services?category=business' },
  { label: 'health', to: '/services?category=health-services' },
  { label: 'scholarships', to: '/services?q=scholarships' },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="home-heading"
      lang={i18n.resolvedLanguage}
      className="relative isolate overflow-hidden bg-primary-800 text-white"
    >
      <HeroBackground />
      <div className="portal-container relative grid items-center gap-5 py-9 motion-safe:animate-fade-in sm:py-12 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.6fr)] md:gap-8 lg:py-14">
        <div className="min-w-0">
          <Wordmark
            variant="dark"
            className="mb-3 block text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl"
          />
          <h1
            id="home-heading"
            className="max-w-3xl text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.15] font-bold tracking-tight"
          >
            {t('hero.heading')}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {t('hero.subtitle')}
          </p>
          <form
            method="get"
            action="/services"
            role="search"
            aria-label={t('hero.searchLabel')}
            className="mt-6 max-w-2xl"
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
            <label
              htmlFor="home-service-search"
              className="block text-sm font-semibold"
            >
              {t('hero.searchLabel')}
            </label>
            <div className="mt-2 flex flex-wrap items-stretch gap-2">
              <input
                id="home-service-search"
                name="q"
                type="search"
                placeholder={t('hero.searchPlaceholder')}
                className="min-h-12 min-w-[10rem] flex-1 rounded-md border border-transparent bg-white px-3 text-base text-gray-900 placeholder:text-gray-700 focus-visible:outline-white"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white bg-primary-100 px-4 font-semibold text-primary-900 hover:bg-white focus-visible:outline-white"
              >
                <Search size={19} aria-hidden="true" />
                {t('hero.searchButton')}
              </button>
            </div>
          </form>
          <ul
            aria-label={t('hero.popular')}
            className="mt-2 flex flex-wrap gap-x-5 text-sm"
          >
            {popularServices.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-flex min-h-11 items-center rounded-sm text-white underline underline-offset-4 hover:text-primary-200 focus-visible:outline-white"
                >
                  {t(`hero.topics.${label}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <HomeHeroGraphic />
      </div>
    </section>
  );
}

export function ProvinceFacts() {
  const { t, i18n } = useTranslation();

  return (
    <section
      aria-labelledby="province-facts"
      lang={i18n.resolvedLanguage}
      className="portal-container py-8 sm:py-10"
    >
      <h2 id="province-facts" className="text-xl font-bold tracking-tight">
        {t('hero.provinceFacts')}
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
        {statistics.map(({ label, value }) => (
          <div key={label} className="border-t border-gray-300 pt-3">
            <dt className="text-sm text-gray-700">
              {t(`hero.stats.${label}`)}
            </dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-primary-800">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex flex-wrap gap-x-4 text-sm">
        <a href={populationSource} className="portal-link">
          {t('hero.censusSource')}
        </a>
        <a href={provincePSGC} className="portal-link">
          {t('hero.psgcSource')}
        </a>
      </p>
    </section>
  );
}

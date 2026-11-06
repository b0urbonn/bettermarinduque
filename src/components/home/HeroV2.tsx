import { ArrowRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const popularServices = [
  { label: 'business', to: '/services?category=business' },
  { label: 'health', to: '/services?category=health-services' },
  { label: 'scholarships', to: '/services?q=scholarships' },
];

export default function HeroV2() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="home-heading"
      lang={i18n.resolvedLanguage}
      className="bg-gradient-to-br from-primary-700 to-[#003d82] py-14 text-white md:py-20 lg:py-24"
    >
      <div className="portal-container grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 max-lg:text-center">
          <h1
            id="home-heading"
            className="text-3xl leading-[1.2] font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            {t('hero.heading')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg max-lg:mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 max-lg:justify-center">
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 font-semibold text-primary-700 transition hover:bg-gray-100 hover:text-primary-700"
            >
              {t('hero.browseServices', { defaultValue: 'Browse services' })}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-white px-6 font-semibold text-white transition hover:bg-white/15"
            >
              {t('hero.contactUs', { defaultValue: 'Contact us' })}
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl border border-primary-700/10 bg-white p-6 text-gray-900 shadow-[0_8px_32px_rgba(0,50,160,0.1),0_2px_8px_rgba(0,0,0,0.04)] transition focus-within:border-primary-700/15 focus-within:shadow-[0_12px_40px_rgba(0,50,160,0.15),0_4px_12px_rgba(0,0,0,0.06)] sm:p-8">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Search
                size={18}
                aria-hidden="true"
                className="text-primary-700"
              />
              {t('hero.searchLabel')}
            </h2>
            <form
              role="search"
              aria-label={t('hero.searchLabel')}
              className="mt-5"
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
              <div className="flex gap-2">
                <input
                  id="home-service-search"
                  name="q"
                  type="search"
                  placeholder={t('hero.searchPlaceholder')}
                  className="min-w-0 flex-1 rounded-[10px] border-2 border-gray-200 bg-[#fafbfc] px-4 py-3.5 text-base transition placeholder:text-gray-400 hover:border-[#d0d5dd] hover:bg-white focus:border-primary-700 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,50,160,0.1)] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={t('hero.searchButton')}
                  className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#0044cc] text-white shadow-[0_2px_8px_rgba(0,50,160,0.3)] transition hover:-translate-y-px hover:from-primary-800 hover:to-[#003399] hover:shadow-[0_4px_12px_rgba(0,50,160,0.4)] active:translate-y-0"
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.8125rem]">
              <span className="font-medium text-gray-500">
                {t('hero.popular')}:
              </span>
              {popularServices.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-full border border-transparent bg-primary-700/[0.06] px-3 py-1.5 font-medium text-primary-700 transition hover:border-primary-700/15 hover:bg-primary-700/10 hover:no-underline"
                >
                  {t(`hero.topics.${label}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

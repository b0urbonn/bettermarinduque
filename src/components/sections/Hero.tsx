import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router';
import { Search, Phone } from 'lucide-react';
import { Heading } from '../ui/Heading';
import MarinduqueMap from '../brand/MarinduqueMap';
import { isMeilisearchEnabled } from '../../lib/meilisearch';
import morionesBackground from '../../assets/moriones background.jpeg';
import morionesParade from '../../assets/marinduque-moriones-parade.jpg';
import maniwayaIsland from '../../assets/maniwaya-island-shore.jpg';
import marinduqueAerial from '../../assets/marinduque-island-aerial.jpg';
import mountMalindig from '../../assets/mount-malindig.jpg';
import wawiesBeach from '../../assets/wawies-beach-resort.jpg';

const backgroundSlides = [
  { src: morionesBackground, position: 'center 45%' },
  { src: morionesParade, position: 'center 45%' },
  { src: marinduqueAerial, position: 'center 50%' },
  { src: maniwayaIsland, position: 'center 55%' },
  { src: wawiesBeach, position: 'center 55%' },
  { src: mountMalindig, position: 'center 50%' },
];

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeBackground, setActiveBackground] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setActiveBackground(current => (current + 1) % backgroundSlides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white py-16 md:py-28">
      {backgroundSlides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          aria-hidden="true"
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: slide.position }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
            activeBackground === index ? 'opacity-10' : 'opacity-0'
          }`}
        />
      ))}
      <MarinduqueMap className="hidden lg:block absolute right-8 xl:right-24 top-1/2 -translate-y-1/2 h-[440px] w-[440px] text-white/15 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl animate-fade-in">
          <span className="inline-flex items-center rounded-full border border-accent-400/40 bg-primary-900/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300 mb-6">
            Heart of the Philippines
          </span>
          <Heading level={1} className="text-white">
            {t('hero.title')}
          </Heading>
          <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          {isMeilisearchEnabled ? (
            <form onSubmit={onSearch} role="search" className="max-w-lg">
              <label htmlFor="hero-search" className="sr-only">
                Search services and information
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search services, offices, documents..."
                  className="w-full rounded-lg border border-transparent bg-white py-3.5 pl-12 pr-28 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-accent-400 px-4 py-2 text-sm font-semibold text-primary-900 hover:bg-accent-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200"
                >
                  Search
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center rounded-lg bg-accent-400 px-6 py-3 font-semibold text-primary-900 hover:bg-accent-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200"
              >
                Browse services
              </Link>
              <Link
                to="/#hotlines"
                className="inline-flex items-center rounded-lg border-2 border-white/80 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                Emergency hotlines
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Globe, Menu, Phone, Search, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { provincialWebsite } from '../../data/province';
import { isMeilisearchEnabled } from '../../lib/meilisearch';
import Logo from '../brand/Logo';

const linkBase =
  'inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-sm font-semibold transition-colors duration-150';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:shadow-lg"
        onClick={event => {
          const main = document.getElementById('main-content');
          if (main) {
            event.preventDefault();
            setIsOpen(false);
            main.focus({ preventScroll: true });
            main.scrollIntoView({ block: 'start' });
          }
        }}
      >
        {t('navbar.skip')}
      </a>
      <div
        lang={i18n.resolvedLanguage}
        className="bg-primary-950 text-sm text-white/85"
      >
        <div className="portal-container flex min-h-10 flex-wrap items-center justify-between gap-x-4">
          <Link
            to="/#hotlines"
            onClick={() => setIsOpen(false)}
            className="inline-flex min-h-10 items-center gap-2 font-semibold text-white hover:text-accent-200"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-secondary-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-secondary-400" />
            </span>
            {t('navbar.emergency')}
            <span className="hidden text-white/60 sm:inline">
              · {t('navbar.emergencyHint', { defaultValue: 'Dial 911' })}
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-5">
            <a
              href={provincialWebsite}
              className="hidden min-h-10 items-center gap-1.5 hover:text-white hover:underline lg:inline-flex"
            >
              {t('navbar.official')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <label className="inline-flex items-center gap-1.5">
              <Globe size={15} aria-hidden="true" />
              <span className="sr-only">{t('navbar.language')}</span>
              <select
                value={i18n.resolvedLanguage === 'fil' ? 'fil' : 'en'}
                onChange={event => void i18n.changeLanguage(event.target.value)}
                className="min-h-10 cursor-pointer rounded-sm bg-transparent pr-1 text-sm font-medium text-white focus-visible:outline-white [&>option]:text-gray-900"
              >
                <option value="en" lang="en">
                  English
                </option>
                <option value="fil" lang="fil">
                  Filipino
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <header
        lang={i18n.resolvedLanguage}
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-lg backdrop-saturate-150 transition-shadow duration-200 ${
          scrolled || isOpen
            ? 'border-gray-200 shadow-[0_8px_24px_-16px_rgb(11_26_61/0.35)]'
            : 'border-transparent'
        }`}
        onKeyDown={event => {
          if (event.key === 'Escape' && isOpen) {
            setIsOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="portal-container flex min-h-16 flex-wrap items-center justify-between gap-x-4 py-2">
          <Link
            to="/"
            aria-label="BetterMarinduque home"
            onClick={() => setIsOpen(false)}
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg"
          >
            <Logo className="h-11 w-auto transition-transform duration-300 group-hover:scale-105 lg:h-12" />
            <span className="font-display text-[1.05rem] leading-[1.05] font-extrabold tracking-tight">
              <span className="block text-secondary-500">Better</span>
              <span className="block text-primary-900">Marinduque</span>
            </span>
          </Link>
          <button
            ref={menuButton}
            type="button"
            aria-controls="main-navigation"
            aria-expanded={isOpen}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 lg:hidden"
            onClick={() => setIsOpen(open => !open)}
          >
            {isOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
            {t('navbar.menu')}
          </button>
          <nav
            id="main-navigation"
            aria-label={t('navbar.mainNavigation', {
              defaultValue: 'Main navigation',
            })}
            className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 border-t border-gray-200 py-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-0.5 lg:border-0 lg:py-0 lg:motion-safe:animate-none`}
          >
            {mainNavigation.map(({ label, href }) =>
              href.startsWith('https://') ? (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`${linkBase} text-gray-700 hover:bg-gray-100 hover:text-primary-900`}
                >
                  {t(`navbar.${label.toLowerCase()}`, { defaultValue: label })}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="text-gray-500"
                  />
                </a>
              ) : (
                <NavLink
                  key={href}
                  to={href}
                  end={href === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? 'bg-primary-50 text-primary-800 ring-1 ring-primary-100'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary-900'
                    }`
                  }
                >
                  {t(`navbar.${label.toLowerCase()}`, { defaultValue: label })}
                </NavLink>
              )
            )}
            {isMeilisearchEnabled && (
              <NavLink
                to="/search"
                aria-label="Search the portal"
                onClick={() => setIsOpen(false)}
                className={`${linkBase} text-gray-700 hover:bg-gray-100`}
              >
                <Search size={18} aria-hidden="true" />
                <span className="lg:sr-only">Search the portal</span>
              </NavLink>
            )}
            <a
              href="tel:911"
              className="btn mt-2 bg-secondary-500 text-white hover:bg-secondary-600 lg:mt-0 lg:ml-2"
            >
              <Phone size={16} aria-hidden="true" />
              911
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

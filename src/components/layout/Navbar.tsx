import { useRef, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { isMeilisearchEnabled } from '../../lib/meilisearch';
import Logo from '../brand/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { t, i18n } = useTranslation('common');

  return (
    <header
      lang={i18n.resolvedLanguage}
      className="sticky top-0 z-50 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
      onKeyDown={event => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-10 focus:bg-white focus:p-2"
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
      <div className="portal-container flex flex-wrap items-center justify-between gap-x-2 py-3 lg:gap-x-4">
        <Link
          to="/"
          aria-label="BetterMarinduque home"
          onClick={() => setIsOpen(false)}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm text-primary-700"
        >
          <Logo className="h-10 w-auto lg:h-12" />
          <span className="text-base leading-none font-bold">
            Better<span className="block">Marinduque</span>
          </span>
        </Link>
        <button
          ref={menuButton}
          type="button"
          aria-controls="main-navigation"
          aria-expanded={isOpen}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-gray-300 px-2.5 text-sm font-semibold text-gray-900 lg:hidden"
          onClick={() => setIsOpen(open => !open)}
        >
          {isOpen ? (
            <X size={19} aria-hidden="true" />
          ) : (
            <Menu size={19} aria-hidden="true" />
          )}
          {t('navbar.menu')}
        </button>
        <nav
          id="main-navigation"
          aria-label={t('navbar.mainNavigation', {
            defaultValue: 'Main navigation',
          })}
          className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 border-t border-gray-200 pt-2 mt-2 lg:m-0 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:pt-0`}
        >
          {mainNavigation.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center rounded-sm px-2.5 text-sm transition hover:bg-primary-50 hover:text-primary-800 ${isActive ? 'font-bold text-primary-700 underline underline-offset-4' : 'font-medium text-gray-700'}`
              }
            >
              {t(`navbar.${label.toLowerCase()}`, { defaultValue: label })}
            </NavLink>
          ))}
          {isMeilisearchEnabled && (
            <NavLink
              to="/search"
              aria-label="Search the portal"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 text-sm text-gray-700 hover:bg-primary-50"
            >
              <Search size={18} aria-hidden="true" />
              <span className="lg:sr-only">Search the portal</span>
            </NavLink>
          )}
          <div
            role="group"
            aria-label={t('navbar.language')}
            className="mt-2 flex items-center gap-1.5 border-t border-gray-200 pt-3 lg:mt-0 lg:ml-3 lg:border-0 lg:pt-0"
          >
            {(['en', 'fil'] as const).map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => void i18n.changeLanguage(lang)}
                aria-label={`Switch to ${lang === 'en' ? 'English' : 'Filipino'}`}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  i18n.resolvedLanguage === lang
                    ? 'bg-primary-700 text-white'
                    : 'border border-primary-700 bg-white text-primary-700 hover:bg-primary-50'
                }`}
              >
                {lang === 'en' ? 'EN' : 'FIL'}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

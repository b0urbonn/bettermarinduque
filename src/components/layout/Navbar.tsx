import { useRef, useState } from 'react';
import { ArrowUpRight, Globe, Menu, Phone, Search, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { provincialWebsite } from '../../data/province';
import { isMeilisearchEnabled } from '../../lib/meilisearch';
import Logo from '../brand/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { t, i18n } = useTranslation('common');

  return (
    <header
      lang={i18n.resolvedLanguage}
      className="relative z-50 border-b border-gray-300 bg-white lg:sticky lg:top-0"
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
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="portal-container flex min-h-11 flex-wrap items-center justify-between gap-x-4 text-sm">
          <Link
            to="/#hotlines"
            onClick={() => setIsOpen(false)}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-secondary-700 hover:underline"
          >
            <Phone size={16} aria-hidden="true" />
            {t('navbar.emergency')}
          </Link>
          <div className="flex flex-wrap items-center gap-x-4">
            <a
              href={provincialWebsite}
              className="hidden min-h-11 items-center gap-1.5 rounded-sm text-gray-700 hover:underline lg:inline-flex"
            >
              {t('navbar.official')}{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <label className="inline-flex items-center gap-1 text-gray-700">
              <Globe size={16} aria-hidden="true" />
              <span className="sr-only">{t('navbar.language')}</span>
              <select
                value={i18n.resolvedLanguage === 'fil' ? 'fil' : 'en'}
                onChange={event => void i18n.changeLanguage(event.target.value)}
                className="min-h-11 rounded-sm bg-transparent px-1.5 text-sm font-medium"
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
      <div className="portal-container flex flex-wrap items-center justify-between gap-x-2 py-2.5 lg:gap-x-6 lg:py-3">
        <Link
          to="/"
          aria-label="BetterMarinduque home"
          onClick={() => setIsOpen(false)}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm text-primary-800"
        >
          <Logo className="h-9 w-auto lg:h-10" />
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
          className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 border-t border-gray-200 pt-2 mt-2 lg:m-0 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-3 lg:border-0 lg:pt-0`}
        >
          {mainNavigation.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center rounded-sm px-2 text-sm hover:bg-primary-50 hover:text-primary-800 ${isActive ? 'bg-primary-50 font-bold text-primary-900 underline underline-offset-4' : 'font-medium text-gray-700'}`
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
        </nav>
      </div>
    </header>
  );
}

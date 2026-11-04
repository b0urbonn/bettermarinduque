import type { ReactNode } from 'react';
import { Building2, Landmark, Network, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { governmentPaths } from '../../data/governmentDirectory';
import SEO from '../SEO';
import PageGraphic from '../brand/PageGraphic';

const navigation = [
  { key: 'overview', Icon: Network },
  { key: 'offices', Icon: Building2 },
  { key: 'executive', Icon: Landmark },
  { key: 'legislative', Icon: Scale },
] as const;

export default function GovernmentPage({
  title,
  description,
  term,
  actions,
  children,
}: {
  title: string;
  description: string;
  term?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { t, i18n } = useTranslation();

  return (
    <div lang={i18n.resolvedLanguage} className="bg-slate-50">
      <SEO title={title} description={description} />
      <header className="relative isolate overflow-hidden bg-linear-to-r from-primary-900 to-primary-800 text-white">
        <div className="portal-container flex items-start justify-between gap-3 py-8 sm:items-center sm:gap-8 sm:py-11">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold tracking-widest text-primary-100 uppercase">
                {t('government.province')}
              </p>
              {term && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {term}
                </span>
              )}
            </div>
            <h1 className="mt-2 max-w-3xl text-3xl leading-tight font-bold tracking-tight motion-safe:animate-fade-in sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-primary-50 sm:text-lg">
              {description}
            </p>
            {actions && (
              <div className="mt-5 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
          <PageGraphic key={title} kind="government" />
        </div>
      </header>
      <div className="border-b border-primary-100 bg-white">
        <nav
          aria-label={t('government.navigation')}
          className="portal-container grid grid-cols-2 sm:flex sm:gap-5"
        >
          {navigation.map(({ key, Icon }) => (
            <NavLink
              end
              key={key}
              to={governmentPaths[key]}
              className={({ isActive }) =>
                `flex min-h-12 items-center gap-2 border-b-2 px-2 py-2 text-sm font-semibold sm:px-3 ${isActive ? 'border-primary-700 bg-primary-50 text-primary-900' : 'border-transparent text-slate-700 hover:bg-slate-50 hover:text-primary-800'}`
              }
            >
              <Icon size={17} className="shrink-0" aria-hidden="true" />
              {t(`government.nav.${key}`)}
            </NavLink>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}

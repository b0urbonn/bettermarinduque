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
    <div lang={i18n.resolvedLanguage} className="bg-sand-50">
      <SEO title={title} description={description} />
      <header className="relative isolate overflow-hidden bg-primary-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_85%_-10%,color-mix(in_srgb,var(--color-primary-500)_35%,transparent),transparent_60%),radial-gradient(40rem_24rem_at_-10%_110%,color-mix(in_srgb,var(--color-accent-600)_18%,transparent),transparent_60%)]"
        />
        <div className="portal-container relative flex items-start justify-between gap-3 py-10 sm:items-center sm:gap-8 sm:py-14">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-accent-300">
                {t('government.province')}
              </p>
              {term && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
                  {term}
                </span>
              )}
            </div>
            <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight motion-safe:animate-fade-in sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-primary-100 sm:text-lg">
              {description}
            </p>
            {actions && (
              <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
          <PageGraphic key={title} kind="government" />
        </div>
      </header>
      <div className="border-b border-gray-200 bg-white">
        <nav
          aria-label={t('government.navigation')}
          className="portal-container flex gap-1 overflow-x-auto sm:gap-2"
        >
          {navigation.map(({ key, Icon }) => (
            <NavLink
              end
              key={key}
              to={governmentPaths[key]}
              className={({ isActive }) =>
                `relative flex min-h-12 shrink-0 items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors duration-150 sm:px-4 ${
                  isActive
                    ? 'text-primary-900 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary-700'
                    : 'text-gray-600 hover:text-primary-800'
                }`
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

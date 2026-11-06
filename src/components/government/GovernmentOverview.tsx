import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  ContactRound,
  Landmark,
  MapPin,
  Scale,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { citizenCharter } from '../../data/province';
import {
  governmentPaths,
  localGovernmentCode,
} from '../../data/governmentDirectory';
import leaders from '../../../content/government/departments/executive.json';
import GovernmentPage from './GovernmentPage';
import OfficialsDirectory from './OfficialsDirectory';

const branches = [
  {
    key: 'executive',
    Icon: Building2,
    roles: ['governor', 'departments'],
    leader: leaders.GOVERNOR,
  },
  {
    key: 'legislative',
    Icon: Scale,
    roles: ['viceGovernor', 'board'],
    leader: leaders.VICE_GOVERNOR,
  },
] as const;

const resources = [
  {
    key: 'offices',
    href: governmentPaths.offices,
    Icon: ContactRound,
    external: false,
  },
  {
    key: 'charter',
    href: citizenCharter,
    Icon: BookOpen,
    external: true,
  },
  {
    key: 'towns',
    href: governmentPaths.offices + '#municipal-offices',
    Icon: MapPin,
    external: false,
  },
] as const;

const localLevels = [
  { key: 'provincial', Icon: Landmark, href: '#government-structure' },
  { key: 'municipal', Icon: Building2, href: '/municipalities' },
  { key: 'barangay', Icon: MapPin, href: '/municipalities' },
] as const;

export default function GovernmentOverview() {
  const { t } = useTranslation();

  return (
    <GovernmentPage
      title={t('government.title')}
      description={t('government.description')}
      actions={
        <Link
          to={governmentPaths.offices}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 py-2 font-semibold text-primary-900 hover:bg-primary-100 focus-visible:outline-white"
        >
          {t('government.findOffice')}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      }
    >
      <div className="portal-container grid items-start gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8 lg:py-10">
        <div className="min-w-0 space-y-8">
          <section aria-labelledby="government-levels">
            <h2
              id="government-levels"
              className="text-2xl font-bold tracking-tight"
            >
              {t('government.levels.title')}
            </h2>
            <p className="mt-2 text-gray-700">
              {t('government.levels.description')}
            </p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {localLevels.map(({ key, Icon, href }) => (
                <li key={key}>
                  <Link
                    to={href}
                    className="group flex h-full flex-col rounded-md border border-gray-300 bg-white p-4 hover:border-primary-500 hover:bg-primary-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="rounded-md bg-primary-50 p-2 text-primary-700 group-hover:bg-white">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="font-bold text-primary-900 group-hover:underline">
                        {t(`levels.${key}`)}
                      </span>
                    </span>
                    <span className="mt-1.5 block font-mono text-xs uppercase tracking-widest text-gray-700">
                      {t(`government.levels.${key}.count`)}
                    </span>
                    <span className="mt-2 block flex-1 text-sm leading-relaxed text-gray-700">
                      {t(`government.levels.${key}.description`)}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:underline">
                      {t(`government.levels.${key}.link`)}
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="government-structure">
            <h2
              id="government-structure"
              className="text-2xl font-bold tracking-tight"
            >
              {t('government.structure')}
            </h2>
            <p className="mt-2 text-gray-700">
              {t('government.structureDescription')}
            </p>
            <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/80 p-3 sm:p-6">
              <ul role="list">
                <li>
                  <div className="inline-flex items-center gap-3 rounded-md bg-primary-900 px-4 py-3 font-bold text-white sm:mx-auto sm:flex sm:w-fit">
                    <Landmark
                      className="size-5 shrink-0 text-primary-200"
                      aria-hidden="true"
                    />
                    {t('government.title')}
                  </div>
                  <ul
                    role="list"
                    className="relative ml-4 grid pl-5 sm:ml-0 sm:grid-cols-2 sm:pt-8 sm:pl-0 sm:before:absolute sm:before:top-0 sm:before:left-1/2 sm:before:h-4 sm:before:border-l-2 sm:before:border-primary-300 sm:after:absolute sm:after:inset-x-1/4 sm:after:top-4 sm:after:border-t-2 sm:after:border-primary-300"
                  >
                    {branches.map(({ key, Icon, roles, leader }) => (
                      <li
                        key={key}
                        className="group/branch relative flex min-w-0 pt-3 sm:px-2 sm:pt-0"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute top-0 -left-5 h-full border-l-2 border-primary-300 group-last/branch:h-9 sm:hidden"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute top-9 -left-5 w-5 border-t-2 border-primary-300 sm:hidden"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute -top-4 left-1/2 hidden h-4 border-l-2 border-primary-300 sm:block"
                        />
                        <div className="flex w-full flex-col rounded-xl border border-primary-200 bg-white p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <span className="rounded-md bg-primary-50 p-2 text-primary-800">
                              <Icon className="size-5" aria-hidden="true" />
                            </span>
                            <div>
                              <p className="text-xs font-semibold tracking-wide text-primary-800 uppercase">
                                {t(`government.${key}.branch`)}
                              </p>
                              <h3 className="mt-0.5 text-lg leading-snug font-bold">
                                {t(`government.${key}.title`)}
                              </h3>
                            </div>
                          </div>
                          <ul
                            role="list"
                            className="my-4 space-y-3 border-l-2 border-primary-200 pl-4"
                          >
                            {roles.map(role => (
                              <li
                                key={role}
                                className="relative text-sm before:absolute before:top-2.5 before:-left-4 before:w-3 before:border-t-2 before:border-primary-200"
                              >
                                <p className="font-semibold">
                                  {t(`government.roles.${role}.title`)}
                                </p>
                                {role === roles[0] && (
                                  <p className="mt-0.5 font-semibold text-primary-800">
                                    {leader}
                                  </p>
                                )}
                                <p className="mt-0.5 leading-relaxed text-gray-700">
                                  {t(`government.roles.${role}.description`)}
                                </p>
                              </li>
                            ))}
                          </ul>
                          <Link
                            to={governmentPaths[key]}
                            className="mt-auto flex min-h-11 items-center justify-between gap-2 rounded-md bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100"
                          >
                            {t(`government.${key}.link`)}
                            <ArrowRight
                              className="size-4 shrink-0"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              <a
                href={localGovernmentCode}
                className="portal-link inline-flex min-h-11 items-center gap-1"
              >
                {t('government.source')}{' '}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </p>
          </section>
        </div>

        <aside
          aria-labelledby="government-resources"
          className="rounded-xl border border-gray-300 bg-white px-4 shadow-sm sm:px-5"
        >
          <h2 id="government-resources" className="pt-4 text-lg font-bold">
            {t('government.resources')}
          </h2>
          <ul role="list" className="mt-2 divide-y divide-primary-100">
            {resources.map(({ key, href, Icon, external }) => {
              const content = (
                <>
                  <Icon
                    className="mt-0.5 size-5 shrink-0 text-primary-700"
                    aria-hidden="true"
                  />
                  <span className="grow">
                    <span className="block font-semibold text-primary-800 underline-offset-4 group-hover:underline">
                      {t(`government.links.${key}.title`)}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-700">
                      {t(`government.links.${key}.description`)}
                    </span>
                  </span>
                  {external ? (
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-primary-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight
                      className="mt-0.5 size-4 shrink-0 text-primary-700"
                      aria-hidden="true"
                    />
                  )}
                </>
              );
              const className =
                'group flex items-start gap-2.5 rounded-sm py-4';
              return (
                <li key={key}>
                  {external ? (
                    <a href={href} className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link to={href} className={className}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
      <OfficialsDirectory />
    </GovernmentPage>
  );
}

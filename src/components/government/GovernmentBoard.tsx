import { ArrowUpRight, MapPin, Scale, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { provincialBoard } from '../../data/governmentDirectory';
import { provincialWebsite } from '../../data/province';
import GovernmentPage from './GovernmentPage';

const groups = ['district1', 'district2', 'exOfficio'] as const;

export default function GovernmentBoard() {
  const { t } = useTranslation();
  const presiding = provincialBoard.pages.find(
    page => page.group === 'presiding'
  );

  return (
    <GovernmentPage
      title="Sangguniang Panlalawigan"
      description={t('government.boardDescription')}
      term="2025–2028"
      actions={
        <a
          href={provincialWebsite + '/legislative/'}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/45 px-4 py-2 font-semibold text-white hover:bg-white/15 focus-visible:outline-white"
        >
          {t('government.officialRoster')}{' '}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      }
    >
      <div className="portal-container py-8 lg:py-10">
        {presiding && (
          <section
            className="flex items-start gap-4 rounded-xl border border-primary-100 bg-primary-50 p-5 sm:p-6"
            aria-labelledby="board-presiding"
          >
            <span className="rounded-lg bg-white p-3 text-primary-800">
              <Scale size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary-800">
                {t('government.presidingOfficer')}
              </p>
              <h2 id="board-presiding" className="mt-1 text-xl font-bold">
                {presiding.name}
              </h2>
              <p className="mt-1 text-sm text-slate-700">
                {t('government.roles.viceGovernor.description')}
              </p>
            </div>
          </section>
        )}

        <nav
          aria-label={t('government.boardSections')}
          className="my-5 flex flex-wrap gap-2"
        >
          {groups.map(group => (
            <Link
              key={group}
              to={`#board-${group}`}
              className="inline-flex min-h-11 items-center rounded-md border border-primary-100 bg-white px-3 text-sm font-semibold text-primary-800 hover:bg-primary-50"
            >
              {t(`government.boardGroups.${group}.title`)}
            </Link>
          ))}
        </nav>

        <div className="grid items-start gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          {groups.map(group => {
            const members = provincialBoard.pages.filter(
              page => page.group === group
            );
            const Icon = group === 'exOfficio' ? Users : MapPin;
            return (
              <section
                key={group}
                id={`board-${group}`}
                aria-labelledby={`board-${group}-heading`}
                className="overflow-hidden rounded-xl border border-primary-100 bg-white shadow-sm"
              >
                <div className="border-b border-primary-100 bg-primary-50/75 p-4">
                  <h2
                    id={`board-${group}-heading`}
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <Icon
                      size={19}
                      className="shrink-0 text-primary-700"
                      aria-hidden="true"
                    />
                    {t(`government.boardGroups.${group}.title`)}
                  </h2>
                  <p className="mt-1 text-sm text-slate-700">
                    {t(`government.boardGroups.${group}.description`)}
                  </p>
                </div>
                <ul role="list" className="divide-y divide-primary-100 px-4">
                  {members.map(member => (
                    <li key={member.name} className="py-3">
                      <p className="font-semibold">{member.name}</p>
                      {group === 'exOfficio' && (
                        <p lang="en" className="mt-0.5 text-sm text-slate-700">
                          {member.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </GovernmentPage>
  );
}

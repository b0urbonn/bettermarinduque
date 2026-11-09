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
          className="btn btn-on-dark"
        >
          {t('government.officialRoster')}{' '}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      }
    >
      <div className="portal-container py-8 lg:py-10">
        {presiding && (
          <section
            className="card flex items-start gap-4 border-primary-200 bg-primary-50/70 p-5 sm:p-6"
            aria-labelledby="board-presiding"
          >
            <span className="icon-tile bg-white">
              <Scale size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">{t('government.presidingOfficer')}</p>
              <h2
                id="board-presiding"
                className="mt-1 font-display text-xl font-extrabold tracking-tight text-gray-900"
              >
                {presiding.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
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
              className="chip inline-flex min-h-11 items-center px-4 py-2 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-400 hover:bg-primary-50"
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
                className="card overflow-hidden"
              >
                <div className="border-b border-primary-100 bg-primary-50/75 p-4">
                  <h2
                    id={`board-${group}-heading`}
                    className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-gray-900"
                  >
                    <Icon
                      size={19}
                      className="shrink-0 text-primary-700"
                      aria-hidden="true"
                    />
                    {t(`government.boardGroups.${group}.title`)}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {t(`government.boardGroups.${group}.description`)}
                  </p>
                </div>
                <ul role="list" className="divide-y divide-gray-100 px-4">
                  {members.map(member => (
                    <li key={member.name} className="py-3">
                      <p className="font-semibold">{member.name}</p>
                      {group === 'exOfficio' && (
                        <p lang="en" className="mt-0.5 text-sm text-gray-700">
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

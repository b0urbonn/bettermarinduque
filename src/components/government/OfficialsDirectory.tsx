import {
  ArrowRight,
  Building2,
  ContactRound,
  Mail,
  MapPin,
  Phone,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { municipalities } from '../../data/municipalities';
import {
  governmentPaths,
  provincialBoard,
  provincialOffices,
} from '../../data/governmentDirectory';
import { municipalityGuides } from '../../data/municipalityGuides';
import leaders from '../../../content/government/departments/executive.json';

function PhoneLink({ number }: { number: string }) {
  return (
    <a
      href={`tel:${number.replace(/\D/g, '').replace(/^0/, '+63')}`}
      className="portal-link inline-flex min-h-11 items-center gap-2 text-sm"
    >
      <Phone size={16} aria-hidden="true" />
      {number}
    </a>
  );
}

function MailLink({ email, name }: { email: string; name: string }) {
  const { t } = useTranslation();
  return (
    <a
      href={`mailto:${email}`}
      aria-label={t('government.emailOffice', { name })}
      className="portal-link inline-flex min-h-11 items-center gap-2 text-sm"
    >
      <Mail size={16} aria-hidden="true" />
      {t('government.email')}
    </a>
  );
}

function SectionLabel({
  Icon,
  children,
}: {
  Icon: typeof Building2;
  children: string;
}) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-700">
      <Icon size={15} aria-hidden="true" className="text-primary-700" />
      {children}
    </p>
  );
}

export default function OfficialsDirectory() {
  const { t, i18n } = useTranslation();
  const hon = t('government.tree.hon');

  const executives = [
    {
      role: t('government.roles.governor.title'),
      name: leaders.GOVERNOR,
      description: t('government.roles.governor.description'),
      phone: provincialOffices.find(office => office.key === 'governor')?.phone,
      email: provincialOffices.find(office => office.key === 'governor')?.email,
    },
    {
      role: t('government.roles.viceGovernor.title'),
      name: leaders.VICE_GOVERNOR,
      description: t('government.roles.viceGovernor.description'),
    },
    {
      role: t('government.roles.representative.title'),
      name: leaders.REPRESENTATIVE,
      description: t('government.roles.representative.description'),
    },
  ];

  const boardMembers = provincialBoard.pages.filter(
    member => member.group !== 'presiding'
  );

  return (
    <section
      aria-labelledby="officials-directory-heading"
      lang={i18n.resolvedLanguage}
      className="portal-container space-y-10 pb-10"
    >
      <div>
        <h2
          id="officials-directory-heading"
          className="text-2xl font-bold tracking-tight"
        >
          {t('government.tree.heading')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
          {t('government.tree.description')}
        </p>
      </div>

      <section aria-labelledby="officials-executive">
        <SectionLabel Icon={Building2}>
          {t('government.executive.branch')}
        </SectionLabel>
        <h3
          id="officials-executive"
          className="mt-2 text-xl font-bold tracking-tight"
        >
          {t('government.tree.executiveTitle')}
        </h3>
        <p className="mt-1 text-sm text-gray-700">
          {t('government.tree.executiveSub')}
        </p>
        <ul
          role="list"
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {executives.map(({ role, name, description, phone, email }) => (
            <li
              key={role}
              className="flex min-w-0 flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-sm"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-gray-600">
                {role}
              </p>
              <h4 className="mt-1 font-bold text-gray-900">
                {hon} {name}
              </h4>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-700">
                {description}
              </p>
              {(phone || email) && (
                <div className="mt-2 flex flex-wrap gap-x-4 border-t border-gray-200">
                  {phone && <PhoneLink number={phone} />}
                  {email && <MailLink email={email} name={name} />}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="officials-legislative">
        <SectionLabel Icon={Scale}>
          {t('government.legislative.branch')}
        </SectionLabel>
        <h3
          id="officials-legislative"
          className="mt-2 text-xl font-bold tracking-tight"
        >
          {t('government.legislative.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-700">
          {t('government.tree.legislativeSub')}
        </p>
        <ul
          role="list"
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {boardMembers.map(({ name, description }) => (
            <li
              key={name}
              className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm"
            >
              <h4 className="font-bold text-gray-900">
                {hon} {name}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="officials-offices">
        <SectionLabel Icon={ContactRound}>
          {t('government.provincialOffices')}
        </SectionLabel>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h3
              id="officials-offices"
              className="text-xl font-bold tracking-tight"
            >
              {t('government.tree.officesTitle')}
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              {t('government.tree.officesSub')}
            </p>
          </div>
          <Link
            to={governmentPaths.offices}
            className="portal-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            {t('government.findOffice')}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <ul
          role="list"
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {provincialOffices.map(({ key, phone, email }) => {
            const name = t(`government.office.${key}.name`);
            return (
              <li
                key={key}
                className="flex min-w-0 flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-sm"
              >
                <h4 className="flex-1 font-bold text-gray-900">{name}</h4>
                <div className="mt-2 flex flex-wrap gap-x-4 border-t border-gray-200">
                  {phone && <PhoneLink number={phone} />}
                  <MailLink email={email} name={name} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="officials-municipal">
        <SectionLabel Icon={MapPin}>{t('levels.municipal')}</SectionLabel>
        <h3
          id="officials-municipal"
          className="mt-2 text-xl font-bold tracking-tight"
        >
          {t('government.tree.municipalTitle')}
        </h3>
        <p className="mt-1 text-sm text-gray-700">
          {t('government.tree.municipalSub', {
            count: municipalities.length,
          })}
        </p>
        <ul
          role="list"
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {municipalities.map(town => {
            const guide =
              municipalityGuides[town.slug as keyof typeof municipalityGuides];
            return (
              <li
                key={town.slug}
                className="flex min-w-0 flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-sm"
              >
                <h4 className="font-bold text-primary-900">{town.name}</h4>
                <p className="mt-0.5 text-xs text-gray-600">
                  {town.slug === 'boac' && <>{t('towns.capital')} · </>}
                  {town.barangays} {t('hero.stats.barangays').toLowerCase()}
                </p>
                <p className="mt-2 text-sm">
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-gray-600">
                    {t('government.tree.mayor')}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {town.mayor}
                  </span>
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 border-t border-gray-200">
                  {guide && <PhoneLink number={guide.municipalOffice} />}
                  <Link
                    to={`/municipalities/${town.slug}`}
                    className="portal-link inline-flex min-h-11 items-center gap-1 text-sm"
                  >
                    {t('towns.openGuide')}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

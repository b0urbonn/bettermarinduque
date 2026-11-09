import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Phone,
  Search,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  officeDirectory,
  provincialOffices,
} from '../../data/governmentDirectory';
import {
  localGovernmentDirectory,
  municipalityGuides,
} from '../../data/municipalityGuides';
import { citizenCharter } from '../../data/province';
import GovernmentPage from './GovernmentPage';

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

export default function GovernmentOffices() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const offices = provincialOffices
    .map(office => ({
      ...office,
      name: t(`government.office.${office.key}.name`),
      description: t(`government.office.${office.key}.description`),
    }))
    .filter(({ name, description, key }) => {
      const text = `${name} ${description} ${key}`.toLowerCase();
      return words.every(word => text.includes(word));
    });

  return (
    <GovernmentPage
      title={t('government.officesTitle')}
      description={t('government.officesDescription')}
      actions={
        <Link to="#municipal-offices" className="btn btn-on-dark">
          <MapPin size={18} aria-hidden="true" />
          {t('government.links.towns.title')}
        </Link>
      }
    >
      <div className="portal-container space-y-9 py-8 lg:py-10">
        <section aria-labelledby="provincial-offices-heading">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <p className="eyebrow">
                {t('government.provincialEyebrow', 'Provincial')}
              </p>
              <h2
                id="provincial-offices-heading"
                className="mt-1 font-display text-2xl font-extrabold tracking-tight text-gray-900"
              >
                {t('government.provincialOffices')}
              </h2>
              <p className="mt-2 text-gray-600">
                {t('government.officeIntro')}
              </p>
            </div>
            <a
              href={officeDirectory}
              className="portal-link inline-flex min-h-11 items-center gap-1 text-sm font-semibold"
            >
              {t('government.fullDirectory')}{' '}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div
            role="search"
            aria-label={t('government.searchOffices')}
            className="card mt-5 p-4 sm:p-5"
          >
            <label
              htmlFor="provincial-office-search"
              className="block text-sm font-semibold text-gray-800"
            >
              {t('government.searchOffices')}
            </label>
            <div className="relative mt-2 max-w-xl">
              <Search
                size={18}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-500"
                aria-hidden="true"
              />
              <input
                id="provincial-office-search"
                type="search"
                value={query}
                placeholder={t('government.officePlaceholder')}
                onChange={event => setQuery(event.target.value)}
                className="field pl-10"
              />
            </div>
            <p role="status" className="mt-2 text-sm text-gray-600">
              {t('government.officeCount', { count: offices.length })}
            </p>
          </div>
          {offices.length === 0 ? (
            <p className="card mt-4 p-5 text-gray-700">
              {t('government.noOffices')}
            </p>
          ) : (
            <ul
              role="list"
              className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {offices.map(({ key, name, description, phone, email }) => (
                <li
                  key={key}
                  className="card card-hover flex min-w-0 flex-col p-4"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span className="icon-tile">
                      <Building2 size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900">{name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-x-4 border-t border-gray-200">
                    {phone && <PhoneLink number={phone} />}
                    <a
                      href={`mailto:${email}`}
                      aria-label={t('government.emailOffice', { name })}
                      className="portal-link inline-flex min-h-11 items-center gap-2 text-sm"
                    >
                      <Mail size={16} aria-hidden="true" />{' '}
                      {t('government.email')}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          id="municipal-offices"
          aria-labelledby="municipal-offices-heading"
          className="border-t border-gray-200 pt-7"
        >
          <p className="eyebrow">{t('levels.municipal')}</p>
          <h2
            id="municipal-offices-heading"
            className="mt-1 font-display text-2xl font-extrabold tracking-tight text-gray-900"
          >
            {t('government.links.towns.title')}
          </h2>
          <p className="mt-2 text-gray-600">{t('government.municipalIntro')}</p>
          <a
            href={localGovernmentDirectory}
            className="portal-link mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-semibold"
          >
            {t('government.municipalSource')}{' '}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <ul
            role="list"
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Object.entries(municipalityGuides).map(([slug, town]) => (
              <li key={slug} className="card p-4">
                <h3 className="flex items-center gap-2 font-display font-bold text-gray-900 capitalize">
                  <MapPin
                    size={18}
                    className="text-primary-700"
                    aria-hidden="true"
                  />
                  {slug.replaceAll('-', ' ')}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4">
                  <PhoneLink number={town.municipalOffice} />
                  <Link
                    to={`/municipalities/${slug}`}
                    className="portal-link inline-flex min-h-11 items-center gap-1 text-sm"
                  >
                    {t('towns.openGuide')}{' '}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside
          className="card flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-primary-200 bg-primary-50/70 p-4 sm:p-5"
          aria-labelledby="government-service-help"
        >
          <div>
            <h2
              id="government-service-help"
              className="font-display font-extrabold tracking-tight text-gray-900"
            >
              {t('government.serviceHelp')}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {t('government.links.charter.description')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4">
            <Link
              to="/services"
              className="portal-link inline-flex min-h-11 items-center gap-1 font-semibold"
            >
              {t('government.serviceGuides')}{' '}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={citizenCharter}
              className="portal-link inline-flex min-h-11 items-center gap-1 font-semibold"
            >
              {t('government.links.charter.title')}{' '}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </GovernmentPage>
  );
}

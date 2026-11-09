import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { municipalities } from '../../data/municipalities';
import { municipalWebsites } from '../../data/municipalityMedia';
import {
  nationalServices,
  provincialServices,
  type OnlineService,
} from '../../data/onlineServices';

function ServiceLink({ name, description, url }: OnlineService) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card card-hover flex h-full flex-col p-4"
    >
      <span className="flex items-start justify-between gap-2 font-bold text-gray-900 group-hover:text-primary-800">
        {name}
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-primary-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
      <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-gray-600">
        {description}
      </span>
    </a>
  );
}

export default function OnlineServices() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="online-services-heading"
      className="mt-10 border-t border-gray-200 pt-8"
    >
      <p className="eyebrow">{t('services.online.eyebrow')}</p>
      <h2
        id="online-services-heading"
        className="mt-1 font-display text-2xl font-extrabold tracking-tight text-gray-900"
      >
        {t('services.online.heading')}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
        {t('services.online.description')}
      </p>

      <h3 className="eyebrow mt-7">{t('levels.provincial')}</h3>
      <ul lang="en" className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {provincialServices.map(service => (
          <li key={service.url}>
            <ServiceLink {...service} />
          </li>
        ))}
      </ul>

      <h3 className="eyebrow mt-8">{t('levels.municipal')}</h3>
      <p className="mt-2 text-sm text-gray-700">
        {t('services.online.municipalNote')}
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {municipalities.map(town => {
          const website = municipalWebsites[town.slug];
          return (
            <li key={town.slug}>
              {website ? (
                <ServiceLink
                  name={`${town.name} — ${website.label}`}
                  description={website.note ?? t('services.online.townSite')}
                  url={website.url}
                />
              ) : (
                <Link
                  to={`/municipalities/${town.slug}`}
                  className="group card card-hover flex h-full flex-col p-4"
                >
                  <span className="flex items-start justify-between gap-2 font-bold text-gray-900 group-hover:text-primary-800">
                    {town.name}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-primary-600 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-gray-600">
                    {t('services.online.townGuide')}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <h3 className="eyebrow mt-8">{t('levels.barangay')}</h3>
      <div className="mt-3 rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 p-4">
        <p className="text-sm leading-relaxed text-gray-700">
          {t('services.online.barangayNote')}
        </p>
        <Link
          to="/municipalities"
          className="portal-link mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
        >
          {t('services.online.findBarangay')}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <h3 className="eyebrow mt-8">{t('levels.national')}</h3>
      <ul lang="en" className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nationalServices.map(service => (
          <li key={service.url}>
            <ServiceLink {...service} />
          </li>
        ))}
      </ul>
    </section>
  );
}

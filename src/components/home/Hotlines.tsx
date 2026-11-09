import {
  ArrowRight,
  ArrowUpRight,
  Hospital,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router';
import { emergencyDirectory } from '../../data/province';
import { municipalities } from '../../data/municipalities';
import { municipalityGuides } from '../../data/municipalityGuides';
import {
  provincialHotlines,
  publicHospitals,
  telHref,
} from '../../data/hotlines';

function CallLink({
  number,
  label,
  className = '',
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={telHref(number)}
      aria-label={`Call ${label}: ${number}`}
      className={`inline-flex min-h-10 items-center gap-1.5 font-semibold whitespace-nowrap tabular-nums text-primary-700 hover:text-primary-900 hover:underline ${className}`}
    >
      {number}
    </a>
  );
}

export default function Hotlines() {
  return (
    <section
      id="hotlines"
      aria-labelledby="hotlines-heading"
      className="portal-container py-16 sm:py-20"
    >
      <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-secondary-700 via-secondary-600 to-secondary-500 p-6 text-white shadow-[0_30px_60px_-30px_rgb(122_21_28/0.6)] sm:p-10">
        <ShieldAlert
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 -z-10 size-72 text-white/10"
          strokeWidth={1}
        />
        <p className="eyebrow text-secondary-100">Emergency contacts</p>
        <h2
          id="hotlines-heading"
          className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Help is a call away, anywhere in Marinduque
        </h2>
        <p className="mt-3 max-w-2xl text-white/85">
          Call 911 for police, fire, or medical emergencies. Use the provincial
          and local numbers below for disaster response and Red Cross help.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {provincialHotlines.map(({ name, description, number, tone }) => (
            <li key={name}>
              <a
                href={telHref(number)}
                aria-label={`${name}, ${number}`}
                className={`group flex h-full flex-col rounded-2xl p-5 transition-colors duration-150 focus-visible:outline-white ${
                  tone === 'urgent'
                    ? 'bg-white text-gray-900 hover:bg-secondary-50'
                    : 'border border-white/25 bg-white/10 hover:bg-white/20'
                }`}
              >
                <span
                  className={`text-sm font-semibold ${tone === 'urgent' ? 'text-secondary-700' : 'text-white'}`}
                >
                  {name}
                </span>
                <span className="mt-2 inline-flex items-center gap-2 font-display text-[1.6rem] font-extrabold whitespace-nowrap tabular-nums tracking-tight">
                  <Phone
                    size={22}
                    aria-hidden="true"
                    className={
                      tone === 'urgent' ? 'text-secondary-600' : 'text-white/80'
                    }
                  />
                  {number}
                </span>
                <span
                  className={`mt-2 text-sm leading-snug ${tone === 'urgent' ? 'text-gray-600' : 'text-white/80'}`}
                >
                  {description}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-lg font-bold">
              Police, fire, and rescue by town
            </h3>
            <p className="mt-0.5 text-sm text-gray-600">
              PNP municipal police stations, BFP fire stations, and municipal
              disaster response offices.
            </p>
          </div>
          <div
            role="region"
            aria-label="Local emergency numbers by town"
            tabIndex={0}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Town
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Police
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Fire
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Rescue / local
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {municipalities.map(({ slug, name }) => {
                  const guide = municipalityGuides[slug];
                  return (
                    <tr key={slug} className="hover:bg-primary-50/40">
                      <th scope="row" className="px-5 py-1 font-semibold">
                        <Link
                          to={`/municipalities/${slug}`}
                          className="hover:text-primary-700 hover:underline"
                        >
                          {name}
                        </Link>
                      </th>
                      <td className="px-3 py-1">
                        <CallLink
                          number={guide.police}
                          label={`${name} police`}
                        />
                      </td>
                      <td className="px-3 py-1">
                        <CallLink
                          number={guide.fireStation}
                          label={`${name} fire station`}
                        />
                      </td>
                      <td className="px-3 py-1">
                        <CallLink
                          number={guide.localResponse.number}
                          label={`${name} ${guide.localResponse.label}`}
                        />
                        {guide.localResponse.label !==
                          'Municipal disaster response' && (
                          <span className="block pb-1 text-xs text-gray-500">
                            {guide.localResponse.label}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Hospital
              size={20}
              aria-hidden="true"
              className="text-secondary-600"
            />
            Public hospitals
          </h3>
          <p className="mt-0.5 text-sm text-gray-600">
            Marinduque has three government-owned hospitals.
          </p>
          <ul className="mt-4 divide-y divide-gray-100">
            {publicHospitals.map(({ name, location, description, number }) => (
              <li key={name} className="py-3 first:pt-0">
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-xs font-medium text-gray-600">{location}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">
                  {description}
                </p>
                {number && <CallLink number={number} label={name} />}
              </li>
            ))}
          </ul>
          <Link
            to="/services/health-services/go-to-the-local-hospital-for-treatment-or-confinement"
            className="portal-link mt-1 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold"
          >
            What to bring to the hospital
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        Numbers come from public directories and the offices’ own posts, checked
        November 2026. Lines can change, so save them and{' '}
        <a
          href={emergencyDirectory}
          className="portal-link inline-flex items-center gap-1"
        >
          verify with the provincial emergency directory
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        .
      </p>
    </section>
  );
}

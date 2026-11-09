import { Fragment, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronRight } from 'lucide-react';
import { municipalBarangays } from '../../data/municipalBarangays';
import {
  barangayOfficialsSource,
  punongBarangays,
} from '../../data/barangayOfficials';
import {
  electedOfficialsDirectory,
  festivalSource,
  localGovernmentDirectory,
  municipalityGuides,
} from '../../data/municipalityGuides';
import { emergencyDirectory } from '../../data/province';
import type { barangayCouncils } from '../../data/barangayCouncils';

type Councils = typeof barangayCouncils;

function CouncilPanel({
  council,
}: {
  council: Councils[string][string] | undefined;
}) {
  if (!council) {
    return (
      <p className="px-3 py-2 text-sm text-gray-600">
        No council officials on record.
      </p>
    );
  }
  const rows: { role: string; names: string[] }[] = [
    { role: 'Kagawads', names: council.members },
    { role: 'SK chairperson', names: council.skChair ? [council.skChair] : [] },
    { role: 'SK members', names: council.skMembers },
    {
      role: 'Barangay secretary',
      names: council.secretary ? [council.secretary] : [],
    },
    {
      role: 'Barangay treasurer',
      names: council.treasurer ? [council.treasurer] : [],
    },
    {
      role: 'SK secretary',
      names: council.skSecretary ? [council.skSecretary] : [],
    },
    {
      role: 'SK treasurer',
      names: council.skTreasurer ? [council.skTreasurer] : [],
    },
  ].filter(row => row.names.length > 0);
  return (
    <dl className="grid gap-x-8 gap-y-3 py-3 sm:grid-cols-2">
      {rows.map(({ role, names }) => (
        <div key={role}>
          <dt className="text-xs font-bold uppercase tracking-widest text-gray-600">
            {role}
          </dt>
          <dd className="mt-0.5">
            <ul className="space-y-0.5">
              {names.map(n => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

interface MunicipalityGuideProps {
  name: string;
  slug: keyof typeof municipalityGuides;
  code: keyof typeof municipalBarangays;
  sectionId?: string;
  expanded?: boolean;
}

const populationFormat = new Intl.NumberFormat('en-PH');

export default function MunicipalityGuide({
  name,
  slug,
  code,
  sectionId = 'town-guide',
  expanded = false,
}: MunicipalityGuideProps) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [openBarangay, setOpenBarangay] = useState<string>();
  const [councils, setCouncils] = useState<Councils>();
  const guide = municipalityGuides[slug];
  const barangays = municipalBarangays[code];
  const officials = punongBarangays[code] ?? {};

  function toggleBarangay(psgc: string) {
    if (!councils) {
      void import('../../data/barangayCouncils').then(module =>
        setCouncils(module.barangayCouncils)
      );
    }
    setOpenBarangay(openBarangay === psgc ? undefined : psgc);
  }
  const searchTerm = query.trim().toLowerCase();
  const matches = barangays
    .filter(
      ([barangay, psgc]) =>
        barangay.toLowerCase().includes(searchTerm) || psgc.includes(searchTerm)
    )
    .sort((a, b) =>
      sortBy === 'population' ? b[2] - a[2] : a[0].localeCompare(b[0])
    );
  const contacts = [
    { label: 'Municipal government', number: guide.municipalOffice },
    guide.localResponse,
    { label: 'Fire station', number: guide.fireStation },
  ];

  return (
    <section
      id={sectionId}
      lang="en"
      aria-labelledby={`town-guide-heading-${slug}`}
      className="mt-8"
    >
      <h2
        id={`town-guide-heading-${slug}`}
        className="mb-4 font-display text-2xl font-extrabold tracking-tight text-gray-900"
      >
        {name} town guide
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div
          id={`contacts-${slug}`}
          className="scroll-mt-32 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900">Local contacts</h3>
          <dl className="mt-3 divide-y divide-gray-200 text-sm">
            {contacts.map(({ label, number }) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
              >
                <dt>{label}</dt>
                <dd>
                  <a
                    href={`tel:+63${number.replace(/\D/g, '').slice(1)}`}
                    aria-label={`Call ${name} ${label}: ${number}`}
                    className="portal-link inline-flex min-h-11 items-center whitespace-nowrap font-semibold tabular-nums"
                  >
                    {number}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Verify local numbers with the{' '}
            <a href={localGovernmentDirectory} className="portal-link">
              DILG directory
            </a>{' '}
            or the{' '}
            <a href={emergencyDirectory} className="portal-link">
              provincial emergency directory
            </a>
            . For an emergency, call{' '}
            <a href="tel:911" className="portal-link font-semibold">
              911
            </a>
            .
          </p>
        </div>
        <div
          id={`places-${slug}`}
          className="scroll-mt-32 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900">
            Places and culture
          </h3>
          <ul className="mt-3 space-y-3 text-sm">
            {guide.places.map(place => (
              <li key={place.name}>
                <a
                  href={place.source}
                  className="portal-link inline-flex items-baseline gap-1 font-semibold"
                >
                  {place.name}{' '}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                </a>
                <p className="mt-1 leading-relaxed text-gray-700">
                  {place.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-gray-300 pt-3 text-sm text-gray-700">
            Local celebration ·{' '}
            <a href={festivalSource} className="portal-link font-semibold">
              {guide.festival}
            </a>
          </p>
        </div>
      </div>
      <details
        id={`barangays-${slug}`}
        open={expanded}
        className="group mt-4 scroll-mt-32 rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-t-xl p-4 font-bold transition-colors hover:bg-gray-50 group-open:rounded-b-none [&::-webkit-details-marker]:hidden">
          Barangay directory{' '}
          <span className="mr-auto text-sm font-normal text-gray-700">
            · {barangays.length} barangays
          </span>
          <ChevronDown
            size={19}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-open:rotate-180"
          />
        </summary>
        <div className="details-body border-t border-gray-200 px-4 py-4 sm:px-5">
          <label
            htmlFor={`barangay-search-${slug}`}
            className="block text-sm font-semibold"
          >
            Search by barangay name or code
          </label>
          <input
            id={`barangay-search-${slug}`}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="field mt-2 max-w-md"
          />
          <label
            htmlFor={`barangay-sort-${slug}`}
            className="mt-3 block text-sm font-semibold"
          >
            Sort barangays
          </label>
          <select
            id={`barangay-sort-${slug}`}
            value={sortBy}
            onChange={event => setSortBy(event.target.value)}
            className="field mt-2 w-auto text-sm"
          >
            <option value="name">Name · A to Z</option>
            <option value="population">Population · highest first</option>
          </select>
          <p role="status" className="mt-2 text-sm text-gray-700">
            {searchTerm
              ? `${matches.length} of ${barangays.length} barangays shown`
              : `${barangays.length} barangays`}
          </p>
          {matches.length > 0 ? (
            <div
              role="region"
              aria-label={`${name} barangay directory`}
              tabIndex={0}
              className="mt-3 max-h-[28rem] overflow-auto rounded-xl border border-gray-200"
            >
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  {name} barangays, their punong barangay, and 2024 census
                  populations
                </caption>
                <thead className="sticky top-0 border-y border-gray-200 bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2.5">
                      Barangay
                    </th>
                    <th scope="col" className="px-2 py-2.5">
                      Punong Barangay
                    </th>
                    <th scope="col" className="px-2 py-2.5">
                      PSGC code
                    </th>
                    <th scope="col" className="px-2 py-2.5 text-right">
                      2024 population
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {matches.map(([barangay, psgc, population]) => {
                    const open = openBarangay === psgc;
                    return (
                      <Fragment key={psgc}>
                        <tr className="transition-colors hover:bg-primary-50/60">
                          <th scope="row" className="px-2 py-2 font-medium">
                            <button
                              type="button"
                              aria-expanded={open}
                              onClick={() => toggleBarangay(psgc)}
                              className="inline-flex items-center gap-1.5 rounded-sm text-left transition-colors hover:text-primary-700 hover:underline"
                            >
                              <ChevronRight
                                size={14}
                                aria-hidden="true"
                                className={`shrink-0 text-primary-700 transition-transform duration-200 ${
                                  open ? 'rotate-90' : ''
                                }`}
                              />
                              {barangay}
                            </button>
                          </th>
                          <td className="px-2 py-2">
                            {officials[psgc] ?? (
                              <span className="text-gray-500">
                                Not on record
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-2 tabular-nums">{psgc}</td>
                          <td className="px-2 py-2 text-right tabular-nums">
                            {populationFormat.format(population)}
                          </td>
                        </tr>
                        {open && (
                          <tr>
                            <td colSpan={4} className="bg-gray-50 px-3 text-sm">
                              <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200">
                                {councils ? (
                                  <CouncilPanel
                                    council={councils[code]?.[psgc]}
                                  />
                                ) : (
                                  <p className="py-2 text-gray-600">
                                    Loading council…
                                  </p>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-700">
              No barangay matches that name or code.
            </p>
          )}
          <p className="mt-4 text-sm text-gray-700">
            Census reference date is July 1, 2024.{' '}
            <a
              href={`https://psa.gov.ph/classification/psgc/barangays/${code}`}
              className="portal-link"
            >
              PSA barangay directory
            </a>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Punong barangay names come from the{' '}
            <a href={barangayOfficialsSource} className="portal-link">
              DILG Barangay Officials Directory
            </a>{' '}
            (2023–2026 term) and can change between elections. For the full
            sanggunian — kagawads, SK chair, secretary, and treasurer — see the{' '}
            <a href={electedOfficialsDirectory} className="portal-link">
              DILG list of elected local officials
            </a>
            . Barangay hall phone numbers are not published — call the {name}{' '}
            municipal office and ask to be connected.
          </p>
        </div>
      </details>
    </section>
  );
}

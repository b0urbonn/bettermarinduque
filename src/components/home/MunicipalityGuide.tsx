import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { municipalBarangays } from '../../data/municipalBarangays';
import {
  festivalSource,
  localGovernmentDirectory,
  municipalityGuides,
} from '../../data/municipalityGuides';
import { emergencyDirectory } from '../../data/province';

interface MunicipalityGuideProps {
  name: string;
  slug: keyof typeof municipalityGuides;
  code: keyof typeof municipalBarangays;
}

const populationFormat = new Intl.NumberFormat('en-PH');

export default function MunicipalityGuide({
  name,
  slug,
  code,
}: MunicipalityGuideProps) {
  const [query, setQuery] = useState('');
  const guide = municipalityGuides[slug];
  const barangays = municipalBarangays[code];
  const searchTerm = query.trim().toLowerCase();
  const matches = barangays.filter(
    ([barangay, psgc]) =>
      barangay.toLowerCase().includes(searchTerm) || psgc.includes(searchTerm)
  );
  const contacts = [
    { label: 'Municipal government', number: guide.municipalOffice },
    guide.localResponse,
    { label: 'Fire station', number: guide.fireStation },
  ];

  return (
    <section
      id="town-guide"
      lang="en"
      aria-labelledby="town-guide-heading"
      className="mt-8"
    >
      <h3
        id="town-guide-heading"
        className="mb-4 text-2xl font-bold tracking-tight"
      >
        {name} town guide
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border border-gray-300 p-5">
          <h4 className="text-lg font-bold">Local contacts</h4>
          <dl className="mt-3 divide-y divide-gray-300 text-sm">
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
        <div className="rounded border border-gray-300 p-5">
          <h4 className="text-lg font-bold">Places and culture</h4>
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
      <details className="group mt-4 rounded border border-gray-300">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-bold [&::-webkit-details-marker]:hidden">
          Barangay directory{' '}
          <span className="mr-auto text-sm font-normal text-gray-700">
            · {barangays.length} barangays
          </span>
          <ChevronDown
            size={19}
            aria-hidden="true"
            className="shrink-0 group-open:rotate-180"
          />
        </summary>
        <div className="border-t border-gray-300 px-4 py-4 sm:px-5">
          <label
            htmlFor="barangay-search"
            className="block text-sm font-semibold"
          >
            Search by barangay name or code
          </label>
          <input
            id="barangay-search"
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="mt-2 min-h-11 w-full max-w-md rounded-md border border-gray-400 bg-white px-3 py-2 text-base"
          />
          <p role="status" className="mt-2 text-sm text-gray-700">
            {searchTerm
              ? `${matches.length} of ${barangays.length} barangays shown`
              : `${barangays.length} barangays`}
          </p>
          {matches.length > 0 ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  {name} barangays and their 2024 census populations
                </caption>
                <thead className="border-y border-gray-300 bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2.5">
                      Barangay
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
                  {matches.map(([barangay, psgc, population]) => (
                    <tr key={psgc}>
                      <th scope="row" className="px-2 py-2 font-medium">
                        {barangay}
                      </th>
                      <td className="px-2 py-2 tabular-nums">{psgc}</td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {populationFormat.format(population)}
                      </td>
                    </tr>
                  ))}
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
        </div>
      </details>
    </section>
  );
}

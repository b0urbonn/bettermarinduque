import { ArrowUpRight, Building, MapPin, Ruler, Users } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { municipalities } from '../data/municipalities';
import { populationSource, provincePSGC } from '../data/province';

const icons = [Users, Building, MapPin, Ruler];

const stats = [
  {
    label: 'Population',
    value: '226,522',
    note: '2024 Census of Population, PSA',
  },
  {
    label: 'Municipalities',
    value: '6',
    note: 'Boac · Buenavista · Gasan · Mogpog · Santa Cruz · Torrijos',
  },
  {
    label: 'Barangays',
    value: '218',
    note: 'PSA Philippine Standard Geographic Code',
  },
  {
    label: 'Land Area',
    value: '952.58 km²',
    note: 'PSA Philippine Statistical Yearbook',
  },
];

export default function Statistics() {
  return (
    <div className="portal-container py-10 md:py-14">
      <SEO
        title="Statistics"
        description="Marinduque at a glance — population, municipalities, barangays, land area, and per-town census figures from official sources."
      />
      <header>
        <p className="font-mono text-xs tracking-widest text-primary-700 uppercase">
          Marinduque at a glance
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Statistics
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
          Key figures for the province, drawn from the Philippine Statistics
          Authority and official records.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = icons[index];
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="mt-4 block text-2xl font-bold text-primary-700 tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1 block text-sm font-medium text-gray-900">
                {stat.label}
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {stat.note}
              </span>
            </div>
          );
        })}
      </div>

      <h2 className="mt-12 text-xl font-bold">Population by municipality</h2>
      <p className="mt-2 text-sm text-gray-600">
        2024 Census of Population figures per town.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-5 py-3.5 font-semibold">Municipality</th>
              <th className="px-5 py-3.5 text-right font-semibold">
                Population
              </th>
              <th className="px-5 py-3.5 text-right font-semibold">
                Barangays
              </th>
              <th className="px-5 py-3.5 text-right font-semibold">
                Income class
              </th>
              <th className="px-5 py-3.5 font-semibold">Mayor</th>
            </tr>
          </thead>
          <tbody>
            {municipalities.map(town => (
              <tr
                key={town.slug}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-5 py-3.5 font-medium">
                  <Link
                    to={`/municipalities/${town.slug}`}
                    className="text-primary-700 hover:underline"
                  >
                    {town.name}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums">
                  {town.population}
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums">
                  {town.barangays}
                </td>
                <td className="px-5 py-3.5 text-right">{town.incomeClass}</td>
                <td className="px-5 py-3.5">{town.mayor}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold">
              <td className="px-5 py-3.5">Province total</td>
              <td className="px-5 py-3.5 text-right tabular-nums">226,522</td>
              <td className="px-5 py-3.5 text-right tabular-nums">218</td>
              <td className="px-5 py-3.5" colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href={populationSource}
          className="portal-link inline-flex items-center gap-1"
        >
          2024 census figures · PSA{' '}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a
          href={provincePSGC}
          className="portal-link inline-flex items-center gap-1"
        >
          Municipalities and barangays · PSA PSGC{' '}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}

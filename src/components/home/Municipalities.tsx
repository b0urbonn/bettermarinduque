import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { MapPin } from 'lucide-react';
import MarinduqueMap from '../brand/MarinduqueMap';

interface Municipality {
  name: string;
  description: string;
  mayor: string;
  population: string;
  barangays: number;
  phone?: { label: string; number: string };
  capital?: boolean;
}

const municipalities: Municipality[] = [
  {
    name: 'Boac',
    description:
      'Seat of the provincial government and the center of commerce and education.',
    mayor: 'Mayor Armi Carrion',
    population: '57,283',
    barangays: 61,
    phone: { label: 'Municipal Hall', number: '(042) 311-1378' },
    capital: true,
  },
  {
    name: 'Mogpog',
    description:
      'Primary gateway via Balanacan Port and the origin of the Moriones (1807).',
    mayor: 'Mayor Senen Livelo Jr.',
    population: '34,516',
    barangays: 37,
    phone: { label: 'Municipal Hall', number: '(042) 332-1249' },
  },
  {
    name: 'Santa Cruz',
    description: 'Largest by land area; gateway to Maniwaya and Polo islands.',
    mayor: 'Mayor Marisa Red-Martinez',
    population: '54,692',
    barangays: 55,
    phone: { label: 'Municipal Hall', number: '(042) 5047-001' },
  },
  {
    name: 'Torrijos',
    description:
      'The “summer capital,” known for Poctoy White Beach and locally grown strawberries.',
    mayor: 'Mayor Joey Peñaflor',
    population: '30,476',
    barangays: 25,
    phone: { label: 'Tourism Office', number: '0963-689-5699' },
  },
  {
    name: 'Buenavista',
    description:
      'The smallest municipality, at the foot of Mt. Malindig overlooking Tablas Strait.',
    mayor: 'Mayor Eduard Siena',
    population: '26,043',
    barangays: 15,
    phone: { label: 'Municipal Hall', number: '(042) 704-0062' },
  },
  {
    name: 'Gasan',
    description:
      'The “cultural nerve center” — home of the kalutang, facing the Tres Reyes Islands.',
    mayor: 'Mayor James Marty Lim',
    population: '36,197',
    barangays: 25,
    phone: { label: 'Municipal Hall', number: '(042) 342-1074' },
  },
];

export default function Municipalities() {
  return (
    <Section
      id="municipalities"
      decoration={
        <MarinduqueMap className="hidden md:block absolute -right-24 -top-10 h-[560px] w-[560px] text-primary-700/10 pointer-events-none" />
      }
    >
      <Heading level={2}>Municipalities</Heading>
      <Text className="text-gray-600 mb-6">
        The six municipalities of the Province of Marinduque. Populations from
        the 2020 Census.
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {municipalities.map(m => (
          <div
            key={m.name}
            className="rounded-xl bg-white border border-gray-200 p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-primary-50 p-2.5 text-primary-600 shrink-0">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-gray-900">
                {m.name}
                {m.capital && (
                  <span className="ml-2 rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-800 align-middle">
                    Capital
                  </span>
                )}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">{m.description}</p>
            <dl className="mt-auto text-sm space-y-1">
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">Mayor</dt>
                <dd className="font-medium text-gray-900 text-right">
                  {m.mayor.replace(/^Mayor /, '')}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">Population (2020)</dt>
                <dd className="font-medium text-gray-900">{m.population}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">Barangays</dt>
                <dd className="font-medium text-gray-900">{m.barangays}</dd>
              </div>
              {m.phone && (
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500">{m.phone.label}</dt>
                  <dd className="font-medium text-primary-700">
                    {m.phone.number}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}

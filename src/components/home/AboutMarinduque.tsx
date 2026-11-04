import {
  Compass,
  Landmark,
  Music,
  PartyPopper,
  Sprout,
  TreePalm,
} from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import MarinduqueMap from '../brand/MarinduqueMap';
import morionesParade from '../../assets/marinduque-moriones-parade.jpg';
import maniwayaIsland from '../../assets/maniwaya-island-shore.jpg';
import mountMalindig from '../../assets/mount-malindig.jpg';

const quickFacts = [
  { label: 'Capital', value: 'Boac' },
  { label: 'Region', value: 'MIMAROPA' },
  { label: 'Founded', value: 'Feb 21, 1921' },
  { label: 'Population (2020)', value: '239,207' },
  { label: 'Land area', value: '952.58 km²' },
  { label: 'Municipalities', value: '6 · 218 barangays' },
];

const featured = [
  {
    title: 'Moryonan',
    subtitle: 'Moriones Lenten Rites',
    image: morionesParade,
    description:
      'A week-long Holy Week tradition of carved masks, Roman soldier garb, and the reenactment of Longinus. For many morions, it is a personal panata (vow).',
    note: 'Ask before close-up photos, and never lift a mask.',
  },
  {
    title: 'Island getaways',
    subtitle: 'Maniwaya, Polo & Mongpong',
    image: maniwayaIsland,
    description:
      'White-sand islands off Santa Cruz in the northeast, with the Tres Reyes and Elephant Island off the southwest coast.',
  },
  {
    title: 'Mt. Malindig',
    subtitle: '1,157 m · Buenavista',
    image: mountMalindig,
    description:
      'The highest point of the island, a potentially active stratovolcano at the southern tip overlooking Tablas Strait.',
  },
];

const prideItems = [
  {
    icon: TreePalm,
    title: 'Poctoy White Beach',
    description:
      'Torrijos, the “summer capital,” also known for locally grown strawberries.',
  },
  {
    icon: Music,
    title: 'Kalutang',
    description:
      'Gasan’s two-stick percussion instrument, cited by the NCCA as intangible cultural heritage.',
  },
  {
    icon: Landmark,
    title: 'Luzon Datum of 1911',
    description:
      'Station Balanacan on Mt. Mataas, Mogpog — the reference point for Philippine maps, with an NHCP marker.',
  },
  {
    icon: PartyPopper,
    title: 'Festivals',
    description:
      'Mogpog’s Kangga Festival, the Bila-Bila Festival, and the province’s founding anniversary every February 21.',
  },
  {
    icon: Compass,
    title: 'Caves & heritage',
    description:
      'Bathala Cave in Santa Cruz, Tarug Caves in Mogpog, and the Marinduque Museum in Boac.',
  },
  {
    icon: Sprout,
    title: 'Crafts & livelihood',
    description:
      'Handicrafts, butterfly farming, coconut, rice, and fishing sustain island communities.',
  },
];

export default function AboutMarinduque() {
  return (
    <Section
      id="about-marinduque"
      className="bg-gray-50"
      decoration={
        <MarinduqueMap className="hidden lg:block absolute -left-32 top-16 h-[620px] w-[620px] text-primary-700/[0.07] pointer-events-none" />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mb-12">
        <div className="lg:col-span-3">
          <span className="inline-flex items-center rounded-full bg-secondary-50 border border-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-600 mb-4">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500 mr-1.5"
              aria-hidden="true"
            />
            Heart of the Philippines
          </span>
          <Heading level={2}>About Marinduque</Heading>
          <Text className="text-gray-700 mb-4">
            Marinduque is a heart-shaped island province at the geographic
            center of the Philippine archipelago. It became its own province on
            February 21, 1921, after separating from Tayabas (now Quezon).
          </Text>
          <Text className="text-gray-600">
            Its people speak Marinduque Tagalog, a dialect known for its archaic
            features. Most residents live by farming, fishing, and handicrafts,
            and tourism peaks every Holy Week during the Moryonan.
          </Text>
        </div>
        <dl className="lg:col-span-2 grid grid-cols-2 gap-3">
          {quickFacts.map(f => (
            <div
              key={f.label}
              className="rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 p-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {f.label}
              </dt>
              <dd className="font-display text-lg font-semibold text-primary-800 mt-1">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Heading level={3} className="text-gray-900">
        What Marinduque is proud of
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {featured.map(item => (
          <article
            key={item.title}
            className="overflow-hidden rounded-xl bg-white border border-gray-200 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.subtitle}
              loading="lazy"
              decoding="async"
              className="h-44 w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-700">
                {item.subtitle}
              </div>
              <h4 className="font-display text-lg font-semibold text-gray-900 mt-1 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.note && (
                <p className="mt-3 rounded-lg bg-accent-50 px-3 py-2 text-xs text-accent-900">
                  {item.note}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prideItems.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex gap-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 p-5"
          >
            <span className="rounded-full bg-primary-50 p-2.5 text-primary-600 h-fit shrink-0">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="font-display font-semibold text-gray-900">
                {title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

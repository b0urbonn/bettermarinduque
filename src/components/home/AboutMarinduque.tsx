import {
  ArrowRight,
  ArrowUpRight,
  Drama,
  Music,
  PartyPopper,
} from 'lucide-react';
import { Link } from 'react-router';
import morionesParade from '../../assets/marinduque-moriones-parade.jpg';
import { festivalSource } from '../../data/municipalityGuides';

const milestones = [
  {
    year: '1900',
    title: 'The Battle of Pulang Lupa',
    description:
      'On September 13, 1900, Filipino forces defeated an American detachment in Torrijos during the Philippine-American War. The site is a national historical landmark.',
    source: 'NHCP · Ang Labanan sa Pulang Lupa',
    url: 'https://philhistoricsites.nhcp.gov.ph/registry_database/ang-labanan-sa-pulang-lupa/',
  },
  {
    year: '1911',
    title: 'Station Balanacan anchors the Luzon Datum',
    description:
      'A survey point on Mount Mataas in Mogpog became the origin of the Luzon Datum, a reference for mapping and surveying in the Philippines.',
    source: 'NHCP · Station Balanacan',
    url: 'https://philhistoricsites.nhcp.gov.ph/registry_database/station-balanacan/',
  },
  {
    year: '1920',
    title: 'A separate province again',
    description:
      'Act No. 2880 authorized Marinduque’s separation from Tayabas and named Boac as its capital.',
    source: 'Act No. 2880 · Lawphil',
    url: 'https://lawphil.net/statutes/acts/act1920/act_2880_1920.html',
  },
  {
    year: '1921',
    title: 'Provincial founding anniversary',
    description:
      'The provincial government records February 21, 1921 as Marinduque’s establishment date, celebrated every year.',
    source: 'Province of Marinduque · Socio-economic profile',
    url: 'https://marinduque.gov.ph/socio-economic-profile/',
  },
  {
    year: '1996',
    title: 'The Marcopper tailings spill',
    description:
      'On March 24, 1996, mine tailings flooded the Boac River system. The disaster halted mining on the island and led to decades of legal action.',
    source: 'Marcopper settlement tracker',
    to: '/transparency/marcopper-fund',
  },
  {
    year: '2025',
    title: 'A US$100 million settlement',
    description:
      'The Province and Barrick signed a settlement on April 4, 2025, without admission of liability. The Court of Appeals approved it that October.',
    source: 'Follow the settlement fund',
    to: '/transparency/marcopper-fund',
  },
];

const heritage = [
  {
    Icon: Drama,
    title: 'Moryonan',
    detail: 'Holy Week',
    description:
      'During the Lenten rites, participants wear carved masks and Roman soldier costumes and reenact the story of Longinus. For many, taking part is a panata, or personal vow. Ask before taking close-up photos, and never lift a mask.',
    source: 'National Museum · Moryonan',
    url: 'https://www.nationalmuseum.gov.ph/exhibitions/nm-marinduque-romblon-area-museum/moryonan/',
  },
  {
    Icon: Music,
    title: 'Kalutang',
    detail: 'Traditional music',
    description:
      'Musicians strike pairs of wooden sticks to make melodies. The tradition is closely associated with Gasan and is recognized as intangible cultural heritage.',
    source: 'National Museum · Kalutang',
    url: 'https://www.nationalmuseum.gov.ph/2022/04/29/kalutang-marinduques-traditional-musical-instrument/',
  },
  {
    Icon: PartyPopper,
    title: 'Town festivals',
    detail: 'All year',
    description:
      'Each town has its own celebration: Bila-bila in Boac, Tubaan in Buenavista, Gasang-gasang in Gasan, Kangga in Mogpog, the Seafood Festival in Santa Cruz, and the Torrijos Festival.',
    source: 'Philippine Information Agency',
    url: festivalSource,
  },
];

export default function AboutMarinduque() {
  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="bg-sand-50"
    >
      <div className="portal-container py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Heritage</p>
          <h2 id="history-heading" className="section-title mt-2">
            History and culture
          </h2>
          <p className="mt-3 text-gray-700">
            The events that shaped Marinduque and the traditions its communities
            carry on today.
          </p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h3 className="mb-6 text-xl font-bold">Milestones through time</h3>
            <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[1.4rem] before:w-0.5 before:bg-linear-to-b before:from-primary-300 before:via-primary-200 before:to-transparent">
              {milestones.map(milestone => (
                <li key={milestone.year} className="relative flex gap-5">
                  <span className="relative z-10 inline-flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-white font-display text-sm font-extrabold tabular-nums text-primary-800 shadow-sm ring-1 ring-primary-100">
                    {milestone.year}
                  </span>
                  <div className="card flex-1 p-4 sm:p-5">
                    <h4 className="font-bold text-gray-900">
                      {milestone.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                      {milestone.description}
                    </p>
                    {'to' in milestone && milestone.to ? (
                      <Link
                        to={milestone.to}
                        className="portal-link mt-2 inline-flex items-center gap-1 text-sm font-semibold"
                      >
                        {milestone.source}
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href={milestone.url}
                        className="portal-link mt-2 inline-flex items-center gap-1 text-sm"
                      >
                        {milestone.source}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-bold">Living heritage</h3>
            <figure className="relative mb-4 overflow-hidden rounded-2xl">
              <img
                src={morionesParade}
                alt="Morions in carved masks and Roman soldier costumes during a Holy Week parade in Marinduque"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10 text-xs text-white/90">
                Moriones parade ·{' '}
                <a href="/image-credits.html" className="underline">
                  Photo credits
                </a>
              </figcaption>
            </figure>
            <div className="space-y-4">
              {heritage.map(
                ({ Icon, title, detail, description, source, url }) => (
                  <article key={title} className="card p-5">
                    <div className="flex items-center gap-3">
                      <span className="icon-tile">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-bold text-gray-900">{title}</h4>
                        <p className="text-xs font-semibold tracking-wide text-accent-700 uppercase">
                          {detail}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {description}
                    </p>
                    <a
                      href={url}
                      className="portal-link mt-2 inline-flex items-center gap-1 text-sm"
                    >
                      {source}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

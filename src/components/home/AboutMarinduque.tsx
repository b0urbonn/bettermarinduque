import { Drama, Music } from 'lucide-react';

const milestones = [
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
      'The provincial government records February 21, 1921 as Marinduque’s establishment date.',
    source: 'Province of Marinduque · Socio-economic profile',
    url: 'https://marinduque.gov.ph/socio-economic-profile/',
  },
];

const heritage = [
  {
    Icon: Drama,
    title: 'Moryonan',
    detail: 'Holy Week',
    description:
      'During the Lenten rites, participants wear carved masks and Roman soldier costumes. For many, taking part is a panata, or personal vow.',
    url: 'https://www.nationalmuseum.gov.ph/exhibitions/nm-marinduque-romblon-area-museum/moryonan/',
  },
  {
    Icon: Music,
    title: 'Kalutang',
    detail: 'Traditional music',
    description:
      'Musicians strike pairs of wooden sticks to make melodies. The tradition is closely associated with Gasan.',
    url: 'https://www.nationalmuseum.gov.ph/2022/04/29/kalutang-marinduques-traditional-musical-instrument/',
  },
];

export default function AboutMarinduque() {
  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="bg-gray-50"
    >
      <div className="portal-container py-10 md:py-12">
        <h2 id="history-heading" className="text-2xl font-bold tracking-tight">
          History and culture
        </h2>
        <p className="mt-3 text-gray-700">
          Explore the events that shaped Marinduque and the traditions that its
          communities carry on today.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-5 text-xl font-bold">Milestones through time</h3>
            <ol className="ml-2 space-y-7 border-l-2 border-gray-300">
              {milestones.map(({ year, title, description, source, url }) => (
                <li
                  key={year}
                  className="relative pl-6 before:absolute before:-left-[9px] before:top-2 before:size-4 before:rounded-full before:border-2 before:border-primary-600 before:bg-gray-50"
                >
                  <p className="text-2xl font-bold tabular-nums text-primary-700">
                    {year}
                  </p>
                  <h4 className="mt-2 font-bold">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {description}
                  </p>
                  <a
                    href={url}
                    className="portal-link mt-2 inline-block text-sm"
                  >
                    {source}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-5 text-xl font-bold">Living heritage</h3>
            <div className="space-y-4">
              {heritage.map(({ Icon, title, detail, description, url }) => (
                <article
                  key={title}
                  className="rounded border border-gray-300 bg-white p-5 sm:p-6"
                >
                  <h4 className="flex items-center gap-2.5 font-bold">
                    <Icon
                      size={21}
                      aria-hidden="true"
                      className="text-primary-700"
                    />
                    {title}
                  </h4>
                  <p className="mt-3 text-xl font-bold text-primary-700">
                    {detail}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {description}
                  </p>
                  <a
                    href={url}
                    className="portal-link mt-3 inline-block text-sm"
                  >
                    National Museum · {title}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

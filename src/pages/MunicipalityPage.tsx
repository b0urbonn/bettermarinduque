import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import MunicipalityGuide from '../components/home/MunicipalityGuide';
import { municipalities } from '../data/municipalities';
import { municipalityProfiles } from '../data/municipalityProfiles';
import { municipalityBoundaries } from '../data/municipalityBoundaries';
import { municipalBarangays } from '../data/municipalBarangays';
import {
  municipalityGuides,
  electedOfficialsDirectory,
  localGovernmentDirectory,
} from '../data/municipalityGuides';
import PageHeader from '../components/ui/PageHeader';
import SEO from '../components/SEO';
import MunicipalityPhoto, {
  MunicipalityPhotoCredit,
} from '../components/brand/MunicipalityPhoto';
import { municipalWebsites } from '../data/municipalityMedia';
import {
  populationSource,
  provincialWebsite,
  provincePSGC,
} from '../data/province';

const services = [
  {
    title: 'Business and permits',
    description:
      'Start with the municipal business permits office for local business permit questions.',
    to: '/services?category=business',
  },
  {
    title: 'Health services',
    description:
      'Ask the Rural Health Unit or Municipal Health Office about local consultations and health programs.',
    to: '/services?category=health-services',
  },
  {
    title: 'Social welfare',
    description:
      'Ask the municipal social welfare office about assistance, eligibility, and supporting documents.',
    to: '/services?category=social-welfare',
  },
  {
    title: 'Building and land use',
    description:
      'Ask the municipal engineering or planning office which permits and clearances apply.',
    to: '/services?category=housing-land-use',
  },
];

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || shown) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [shown]);
  return (
    <div
      ref={ref}
      className={`${className} ${
        shown
          ? 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500'
          : 'motion-safe:opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

export default function MunicipalityPage() {
  const { slug } = useParams();
  const town = municipalities.find(item => item.slug === slug);
  if (!town) return <Navigate to="/municipalities" replace />;
  return <TownContent key={town.slug} town={town} />;
}

function TownContent({ town }: { town: (typeof municipalities)[number] }) {
  const { t, i18n } = useTranslation();

  const profile = municipalityProfiles[town.slug];
  const guide = municipalityGuides[town.slug];
  const website = municipalWebsites[town.slug];
  const largestBarangays = [...municipalBarangays[town.code]]
    .sort((a, b) => b[2] - a[2])
    .slice(0, 3);
  const sections = [
    { id: `overview-${town.slug}`, label: 'Overview' },
    { id: `government-${town.slug}`, label: 'Local government' },
    { id: `services-${town.slug}`, label: 'Services and offices' },
    { id: `visit-${town.slug}`, label: 'Getting there and planning' },
    { id: `contacts-${town.slug}`, label: 'Local contacts' },
    { id: `places-${town.slug}`, label: 'Places and culture' },
    { id: `barangays-${town.slug}`, label: 'Barangay directory' },
    { id: `online-${town.slug}`, label: 'Websites and directories' },
    { id: `sources-${town.slug}`, label: 'Sources' },
  ];
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(`${town.name}, Marinduque, Philippines`);
  const phone = `tel:${guide.municipalOffice.replace(/\D/g, '').replace(/^0/, '+63')}`;

  const [activeSection, setActiveSection] = useState(sections[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div lang={i18n.resolvedLanguage}>
      <SEO title={town.name} description={town.description} />
      <PageHeader
        title={town.name}
        description={town.description}
        breadcrumbItems={[
          { label: t('navbar.home'), href: '/' },
          { label: t('navbar.municipalities'), href: '/municipalities' },
          { label: town.name },
        ]}
      />
      <div className="portal-container grid items-start gap-6 py-7 sm:py-9 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
        <aside
          lang="en"
          className="rounded-xl border border-primary-100 bg-primary-50 p-4 lg:sticky lg:top-32"
        >
          <Link
            to="/municipalities"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-800 hover:underline"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All municipalities
          </Link>
          <nav
            aria-label={`${town.name} page sections`}
            className="mt-3 border-t border-primary-200 pt-4"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary-900">
              On this page
            </p>
            <ul className="flex flex-wrap gap-1 lg:flex-col">
              {sections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={
                      activeSection === section.id ? 'true' : undefined
                    }
                    className={`inline-flex min-h-11 items-center rounded-lg px-2 text-sm transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-white font-bold text-primary-900 shadow-sm'
                        : 'text-primary-800 hover:bg-white/70 hover:underline'
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div lang="en" className="min-w-0 space-y-7">
          <Reveal>
            <figure className="overflow-hidden rounded-xl border border-gray-300 bg-white">
              <div className="aspect-[16/9] max-h-[28rem] w-full">
                <MunicipalityPhoto
                  key={town.slug}
                  slug={town.slug}
                  priority
                  slideshow
                />
              </div>
              <figcaption className="px-4 py-3 text-xs leading-relaxed text-gray-700">
                <MunicipalityPhotoCredit slug={town.slug} slideshow />
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <section
              id={`overview-${town.slug}`}
              aria-labelledby="overview-heading"
              className="rounded-xl border border-gray-300 bg-white p-4 sm:p-6"
            >
              <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_12rem]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">
                    {town.slug === 'boac'
                      ? 'Provincial capital'
                      : 'Municipality'}{' '}
                    · MIMAROPA
                  </p>
                  <h2
                    id="overview-heading"
                    className="mt-2 text-2xl font-bold tracking-tight text-primary-900"
                  >
                    About {town.name}
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
                    {profile.introduction.map(paragraph => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <ul
                    aria-label="Town highlights"
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {profile.highlights.map(highlight => (
                      <li
                        key={highlight}
                        className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${provincialWebsite}/municipal/`}
                    className="portal-link mt-3 inline-flex min-h-11 items-center gap-1 text-xs"
                  >
                    Provincial municipality profiles
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
                <figure className="rounded-lg bg-primary-50 p-3">
                  <svg
                    viewBox="0 0 440 440"
                    role="img"
                    aria-label={`${town.name} highlighted within Marinduque`}
                    className="mx-auto w-full max-w-48"
                  >
                    {Object.entries(municipalityBoundaries).map(
                      ([code, boundary]) => (
                        <path
                          key={code}
                          d={boundary.path}
                          fillRule="evenodd"
                          strokeWidth="3"
                          className={
                            code === town.code
                              ? 'fill-primary-700 stroke-white'
                              : 'fill-primary-200 stroke-white'
                          }
                        />
                      )
                    )}
                  </svg>
                  <figcaption className="mt-2 text-center text-xs text-primary-900">
                    {town.name} in Marinduque
                  </figcaption>
                </figure>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { label: '2024 population', value: town.population },
                  { label: 'Barangays', value: town.barangays },
                  { label: 'Income class', value: town.incomeClass },
                  {
                    label: 'Provincial board district',
                    value: profile.boardDistrict,
                  },
                ].map(fact => (
                  <div
                    key={fact.label}
                    className="rounded-lg border border-primary-100 bg-primary-50 p-3"
                  >
                    <dt className="text-xs text-gray-700">{fact.label}</dt>
                    <dd className="mt-1 text-2xl font-bold tabular-nums text-primary-900">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-gray-700">
                Population reference date: July 1, 2024.{' '}
                <a href={populationSource} className="portal-link">
                  PSA census source
                </a>
              </p>
              <div className="mt-5 border-t border-gray-200 pt-4">
                <h3 className="font-bold text-primary-900">
                  Largest barangays by population
                </h3>
                <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                  {largestBarangays.map(([name, code, population]) => (
                    <li
                      key={code}
                      className="rounded-lg bg-gray-50 p-3 transition-colors hover:bg-primary-50"
                    >
                      <span className="block text-sm font-semibold">
                        {name}
                      </span>
                      <span className="mt-1 block text-sm tabular-nums text-gray-700">
                        {population.toLocaleString('en-PH')} residents
                      </span>
                    </li>
                  ))}
                </ol>
                <a
                  href={`#barangays-${town.slug}`}
                  className="portal-link mt-2 inline-flex min-h-11 items-center gap-2 text-sm"
                >
                  Browse all {town.barangays} barangays
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section
              id={`government-${town.slug}`}
              aria-labelledby="government-heading"
              className="rounded-xl border border-gray-300 bg-white p-4 sm:p-6"
            >
              <h2
                id="government-heading"
                className="text-2xl font-bold tracking-tight text-primary-900"
              >
                Local government
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Municipal elected officials · 2025–2028 term
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Mayor', value: town.mayor },
                  { label: 'Vice mayor', value: town.viceMayor },
                ].map(official => (
                  <div
                    key={official.label}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/50"
                  >
                    <dt className="text-sm text-gray-700">{official.label}</dt>
                    <dd className="mt-1 text-lg font-bold text-primary-900">
                      {official.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                <Building2
                  size={22}
                  className="shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold">
                    {town.name} Municipal Government
                  </h3>
                  {profile.municipalHall && (
                    <p className="mt-1 text-sm text-gray-700">
                      {profile.municipalHall}
                    </p>
                  )}
                  <a
                    href={phone}
                    className="portal-link mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    <Phone size={16} aria-hidden="true" />
                    {guide.municipalOffice}
                  </a>
                  <p className="text-xs text-gray-700">
                    Verify this directory number before relying on it.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700">
                PSGC code:{' '}
                <span className="font-mono font-semibold">{town.code}</span> ·
                Province of Marinduque · MIMAROPA
              </p>
              <a
                href={electedOfficialsDirectory}
                className="portal-link mt-2 inline-flex min-h-11 items-center text-sm"
              >
                DILG elected officials directory
              </a>
            </section>
          </Reveal>

          <Reveal>
            <section
              id={`services-${town.slug}`}
              aria-labelledby="services-heading"
            >
              <h2
                id="services-heading"
                className="text-2xl font-bold tracking-tight text-primary-900"
              >
                Services and offices
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                General guidance for Philippine municipal services. Confirm
                current requirements, fees, and office hours with {town.name}{' '}
                Municipal Hall or the office concerned.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.map(service => (
                  <li key={service.to}>
                    <Link
                      to={service.to}
                      className="group flex h-full flex-col rounded-xl border border-gray-300 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-50 hover:shadow-md"
                    >
                      <h3 className="font-bold text-primary-900">
                        {service.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">
                        {service.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:underline">
                        Read service guides
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4 sm:p-5">
                <h3 className="font-bold text-primary-900">
                  At the barangay hall
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  Your barangay is the first stop for everyday documents and
                  community concerns. Ask the barangay secretary or the punong
                  barangay about:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  <li>Barangay clearance or business clearance endorsement</li>
                  <li>Certificate of residency or certificate of indigency</li>
                  <li>
                    Blotter entries and community mediation (Katarungang
                    Pambarangay)
                  </li>
                </ul>
                <a
                  href={`#barangays-${town.slug}`}
                  className="portal-link mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                >
                  Find your barangay in the {town.name} directory
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section
              id={`visit-${town.slug}`}
              aria-labelledby="visit-heading"
              className="rounded-xl border border-gray-300 bg-white p-4 sm:p-6"
            >
              <h2
                id="visit-heading"
                className="text-2xl font-bold tracking-tight text-primary-900"
              >
                Getting there and planning
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {profile.access}
              </p>
              <div className="mt-4 rounded-lg border-l-4 border-accent-400 bg-accent-50 p-4">
                <h3 className="text-sm font-bold text-gray-900">
                  Before you visit
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {profile.visitorNote}
                </p>
              </div>
              <a
                href={mapsUrl}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-700 px-4 text-sm font-semibold text-white hover:bg-primary-800"
              >
                <MapPin size={16} aria-hidden="true" />
                Open {town.name} on Google Maps
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </section>
          </Reveal>

          <Reveal>
            <MunicipalityGuide
              key={town.slug}
              name={town.name}
              slug={town.slug}
              code={town.code}
              sectionId={`town-guide-${town.slug}`}
              expanded
            />
          </Reveal>

          <Reveal>
            <section
              id={`online-${town.slug}`}
              aria-labelledby="online-heading"
              className="rounded-xl border border-gray-300 bg-white p-4 sm:p-6"
            >
              <h2
                id="online-heading"
                className="text-2xl font-bold tracking-tight text-primary-900"
              >
                Websites and government directories
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {website && (
                  <li className="rounded-lg border border-primary-100 bg-primary-50 p-4">
                    <a
                      href={website.url}
                      className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-800 hover:underline"
                    >
                      {town.name} · {website.label}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                    {website.note && (
                      <p className="mt-1 text-sm text-gray-700">
                        {website.note}
                      </p>
                    )}
                    <a
                      href={website.sourceUrl}
                      className="portal-link mt-2 inline-block text-xs"
                    >
                      Website listing source
                    </a>
                  </li>
                )}
                <li className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/50">
                  <a
                    href={localGovernmentDirectory}
                    className="portal-link inline-flex min-h-11 items-center gap-2 font-semibold"
                  >
                    DILG local government directory
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <p className="mt-1 text-sm text-gray-700">
                    Published municipal office phone numbers and email
                    addresses.
                  </p>
                </li>
                <li className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/50">
                  <a
                    href={`${provincialWebsite}/municipal/`}
                    className="portal-link inline-flex min-h-11 items-center gap-2 font-semibold"
                  >
                    Provincial municipality profiles
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <p className="mt-1 text-sm text-gray-700">
                    Municipal information from the Province of Marinduque.
                  </p>
                </li>
                <li className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/50">
                  <a
                    href={`https://psa.gov.ph/classification/psgc/barangays/${town.code}`}
                    className="portal-link inline-flex min-h-11 items-center gap-2 font-semibold"
                  >
                    PSA · {town.name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <p className="mt-1 text-sm text-gray-700">
                    Official barangay names and geographic codes.
                  </p>
                </li>
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section
              id={`sources-${town.slug}`}
              aria-labelledby="sources-heading"
              className="rounded-xl border border-gray-300 bg-gray-50 p-4 sm:p-6"
            >
              <h2
                id="sources-heading"
                className="text-xl font-bold text-primary-900"
              >
                Sources and references
              </h2>
              <ul className="mt-3 space-y-3 text-sm">
                <li>
                  <a href={populationSource} className="portal-link">
                    PSA · 2024 population counts
                  </a>
                </li>
                <li>
                  <a
                    href={`https://psa.gov.ph/classification/psgc/barangays/${town.code}`}
                    className="portal-link"
                  >
                    PSA · {town.name} barangay directory
                  </a>
                </li>
                <li>
                  <a href={provincePSGC} className="portal-link">
                    PSA · Marinduque province profile
                  </a>
                </li>
                <li>
                  <a href={localGovernmentDirectory} className="portal-link">
                    DILG MIMAROPA · local government contacts
                  </a>
                </li>
                <li>
                  <a
                    href={`${provincialWebsite}/places-of-interest-and-contact-persons/`}
                    className="portal-link"
                  >
                    Provincial tourism · places of interest
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-gray-700">
                Map boundaries: NAMRIA and PSA via OCHA COD-AB, simplified by{' '}
                <a
                  href="https://github.com/faeldon/philippines-json-maps"
                  className="portal-link"
                >
                  Philippines JSON Maps
                </a>{' '}
                ·{' '}
                <a
                  href="https://creativecommons.org/licenses/by/3.0/igo/"
                  className="portal-link"
                >
                  CC BY 3.0 IGO
                </a>
                . For general reference.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <nav
              aria-label="Other municipalities"
              className="border-t border-gray-300 pt-6"
            >
              <h2 className="text-xl font-bold text-primary-900">
                Explore other municipalities
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {municipalities
                  .filter(item => item.slug !== town.slug)
                  .map(item => (
                    <li key={item.slug}>
                      <Link
                        to={`/municipalities/${item.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary-200 bg-white px-3 text-sm font-semibold text-primary-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-50 hover:shadow-sm"
                      >
                        {item.name}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

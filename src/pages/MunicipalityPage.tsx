import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ExternalLink,
  FileText,
  HeartPulse,
  Home,
  MapPin,
  Phone,
  TriangleAlert,
  Users,
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
import Breadcrumbs from '../components/ui/Breadcrumbs';
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
import { telHref } from '../data/hotlines';

const services = [
  {
    title: 'Business and permits',
    description:
      'Start with the municipal business permits office for local business permit questions.',
    to: '/services?category=business',
    Icon: FileText,
  },
  {
    title: 'Health services',
    description:
      'Ask the Rural Health Unit or Municipal Health Office about local consultations and health programs.',
    to: '/services?category=health-services',
    Icon: HeartPulse,
  },
  {
    title: 'Social welfare',
    description:
      'Ask the municipal social welfare office about assistance, eligibility, and supporting documents.',
    to: '/services?category=social-welfare',
    Icon: Users,
  },
  {
    title: 'Building and land use',
    description:
      'Ask the municipal engineering or planning office which permits and clearances apply.',
    to: '/services?category=housing-land-use',
    Icon: Home,
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

function SectionHeading({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className="mt-1 font-display text-2xl font-extrabold tracking-tight text-gray-900"
      >
        {children}
      </h2>
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
    { id: `visit-${town.slug}`, label: 'Getting there' },
    { id: `contacts-${town.slug}`, label: 'Local contacts' },
    { id: `places-${town.slug}`, label: 'Places and culture' },
    { id: `barangays-${town.slug}`, label: 'Barangay directory' },
    { id: `online-${town.slug}`, label: 'Websites' },
    { id: `sources-${town.slug}`, label: 'Sources' },
  ];
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(`${town.name}, Marinduque, Philippines`);
  const density = Math.round(
    Number(town.population.replace(/,/g, '')) / town.area
  );

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

  const facts = [
    { label: '2024 population', value: town.population },
    { label: 'Barangays', value: town.barangays },
    { label: 'Land area', value: `${town.area.toFixed(2)} km²` },
    { label: 'Income class', value: town.incomeClass },
    { label: 'Board district', value: profile.boardDistrict },
  ];

  return (
    <div lang={i18n.resolvedLanguage}>
      <SEO title={town.name} description={town.description} />
      <header className="relative isolate overflow-hidden bg-primary-950 text-white">
        <div className="absolute inset-0 -z-10">
          <MunicipalityPhoto
            key={town.slug}
            slug={town.slug}
            priority
            slideshow
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary-950/95 via-primary-950/70 to-primary-950/20" />
          <div className="absolute inset-0 bg-linear-to-t from-primary-950 via-primary-950/30 to-transparent" />
        </div>
        <div className="portal-container pt-8 pb-10 sm:pt-10 lg:pt-14 lg:pb-14">
          <Breadcrumbs
            tone="dark"
            items={[
              { label: t('navbar.home'), href: '/' },
              { label: t('navbar.municipalities'), href: '/municipalities' },
              { label: town.name },
            ]}
          />
          <div className="mt-16 max-w-3xl sm:mt-24 lg:mt-32">
            <p className="eyebrow text-accent-300">
              {town.slug === 'boac' ? 'Provincial capital' : 'Municipality'} ·
              Marinduque
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
              {town.name}
            </h1>
            <p lang="en" className="mt-3 text-lg font-semibold text-accent-200">
              {town.tagline}
            </p>
            <p
              lang="en"
              className="mt-2 max-w-2xl leading-relaxed text-white/85"
            >
              {town.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={telHref(guide.municipalOffice)}
                className="btn btn-light"
              >
                <Phone size={16} aria-hidden="true" />
                Municipal hall · {guide.municipalOffice}
              </a>
              <a href={mapsUrl} className="btn btn-on-dark">
                <MapPin size={16} aria-hidden="true" />
                Google Maps
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <p className="portal-container pb-3 text-[11px] leading-relaxed text-white/60 [&_a]:text-white/75">
          <MunicipalityPhotoCredit slug={town.slug} slideshow />
        </p>
      </header>

      <div className="border-b border-gray-200 bg-white">
        <dl className="portal-container grid grid-cols-2 gap-y-3 py-5 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-gray-200">
          {facts.map(fact => (
            <div key={fact.label} className="lg:px-6 lg:first:pl-0">
              <dt className="text-sm text-gray-600">{fact.label}</dt>
              <dd className="font-display text-2xl font-extrabold tabular-nums tracking-tight text-primary-900">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-sand-50">
        <div className="portal-container grid items-start gap-6 py-8 sm:py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
          <aside lang="en" className="lg:sticky lg:top-24">
            <Link
              to="/municipalities"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-800 hover:underline"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              All municipalities
            </Link>
            <nav
              aria-label={`${town.name} page sections`}
              className="card mt-3 p-3"
            >
              <p className="eyebrow mb-2 px-2 pt-1 text-gray-500">
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
                      className={`relative flex min-h-10 items-center rounded-lg px-3 text-sm transition-colors duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary-50 font-semibold text-primary-900 lg:before:absolute lg:before:inset-y-2 lg:before:left-0 lg:before:w-0.5 lg:before:rounded-full lg:before:bg-primary-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-800'
                      }`}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div lang="en" className="min-w-0 space-y-6">
            <Reveal>
              <section
                id={`overview-${town.slug}`}
                aria-labelledby="overview-heading"
                className="card p-5 sm:p-7"
              >
                <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_13rem]">
                  <div>
                    <SectionHeading id="overview-heading" eyebrow="Overview">
                      About {town.name}
                    </SectionHeading>
                    <div className="space-y-3 leading-relaxed text-gray-700">
                      {profile.introduction.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <ul
                      aria-label="Town highlights"
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {profile.highlights.map(highlight => (
                        <li key={highlight} className="chip px-3 py-1">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className="rounded-2xl bg-linear-to-br from-primary-50 to-sand-100 p-4 ring-1 ring-primary-100">
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
                    <figcaption className="mt-2 text-center text-xs font-medium text-primary-900">
                      {town.name} in Marinduque
                    </figcaption>
                    <p className="mt-1 text-center text-xs text-gray-600">
                      About {density.toLocaleString('en-PH')} people per km²
                    </p>
                  </figure>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <h3 className="font-bold text-gray-900">
                    Largest barangays by population
                  </h3>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                    {largestBarangays.map(([name, code, population], index) => (
                      <li
                        key={code}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100"
                      >
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-extrabold text-primary-800 ring-1 ring-primary-100">
                          {index + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            {name}
                          </span>
                          <span className="block text-sm tabular-nums text-gray-600">
                            {population.toLocaleString('en-PH')} residents
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <a
                      href={`#barangays-${town.slug}`}
                      className="portal-link inline-flex min-h-10 items-center gap-1.5 font-semibold"
                    >
                      Browse all {town.barangays} barangays
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                    <span className="text-xs text-gray-600">
                      Population as of July 1, 2024 ·{' '}
                      <a href={populationSource} className="portal-link">
                        PSA
                      </a>{' '}
                      ·{' '}
                      <a
                        href={`${provincialWebsite}/municipal/`}
                        className="portal-link"
                      >
                        Provincial profiles
                      </a>
                    </span>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section
                id={`government-${town.slug}`}
                aria-labelledby="government-heading"
                className="card p-5 sm:p-7"
              >
                <SectionHeading
                  id="government-heading"
                  eyebrow="2025–2028 term"
                >
                  Local government
                </SectionHeading>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Mayor', value: town.mayor },
                    { label: 'Vice mayor', value: town.viceMayor },
                  ].map(official => (
                    <div
                      key={official.label}
                      className="flex items-center gap-4 rounded-xl border border-gray-200 p-4"
                    >
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-800 font-display text-lg font-extrabold text-white">
                        {official.value
                          .split(' ')
                          .filter(part => /^[A-Z]/.test(part))
                          .slice(0, 2)
                          .map(part => part[0])
                          .join('')}
                      </span>
                      <div>
                        <dt className="text-sm text-gray-600">
                          {official.label}
                        </dt>
                        <dd className="text-lg font-bold text-gray-900">
                          Hon. {official.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex flex-wrap items-start gap-4 rounded-xl bg-primary-50/70 p-4 ring-1 ring-primary-100">
                  <span className="icon-tile bg-white">
                    <Building2 size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">
                      {town.name} Municipal Government
                    </h3>
                    {profile.municipalHall && (
                      <p className="mt-0.5 text-sm text-gray-700">
                        {profile.municipalHall}
                      </p>
                    )}
                    <a
                      href={telHref(guide.municipalOffice)}
                      className="portal-link mt-1 inline-flex min-h-10 items-center gap-2 text-sm font-semibold"
                    >
                      <Phone size={15} aria-hidden="true" />
                      {guide.municipalOffice}
                    </a>
                    <p className="text-xs text-gray-600">
                      Directory number. Verify before relying on it.
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span>
                    PSGC{' '}
                    <span className="font-mono font-semibold text-gray-900">
                      {town.code}
                    </span>
                  </span>
                  <a
                    href={electedOfficialsDirectory}
                    className="portal-link inline-flex min-h-10 items-center gap-1"
                  >
                    DILG elected officials directory
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section
                id={`services-${town.slug}`}
                aria-labelledby="services-heading"
              >
                <SectionHeading id="services-heading" eyebrow="Where to go">
                  Services and offices
                </SectionHeading>
                <p className="-mt-2 mb-4 text-sm leading-relaxed text-gray-700">
                  General guidance for Philippine municipal services. Confirm
                  current requirements, fees, and office hours with {town.name}{' '}
                  Municipal Hall or the office concerned.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {services.map(({ title, description, to, Icon }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="group card card-hover flex h-full gap-4 p-5"
                      >
                        <span className="icon-tile">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="font-bold text-gray-900 group-hover:text-primary-800">
                            {title}
                          </span>
                          <span className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">
                            {description}
                          </span>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                            Read service guides
                            <ArrowRight
                              size={15}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 rounded-2xl border border-dashed border-primary-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">
                    At the barangay hall
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                    Your barangay is the first stop for everyday documents and
                    community concerns. Ask the barangay secretary or the punong
                    barangay about:
                  </p>
                  <ul className="mt-2 grid gap-1.5 text-sm text-gray-700 sm:grid-cols-3">
                    {[
                      'Barangay clearance or business clearance endorsement',
                      'Certificate of residency or certificate of indigency',
                      'Blotter entries and community mediation (Katarungang Pambarangay)',
                    ].map(item => (
                      <li
                        key={item}
                        className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`#barangays-${town.slug}`}
                    className="portal-link mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold"
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
                className="card p-5 sm:p-7"
              >
                <SectionHeading id="visit-heading" eyebrow="Plan a visit">
                  Getting there and planning
                </SectionHeading>
                <p className="leading-relaxed text-gray-700">
                  {profile.access}
                </p>
                <div className="mt-4 flex gap-3 rounded-xl bg-accent-50 p-4 ring-1 ring-accent-200">
                  <TriangleAlert
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Before you visit
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      {profile.visitorNote}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={mapsUrl} className="btn btn-primary">
                    <MapPin size={16} aria-hidden="true" />
                    Open {town.name} on Google Maps
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <Link to="/#getting-there" className="btn btn-secondary">
                    Getting to Marinduque
                  </Link>
                </div>
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
                className="card p-5 sm:p-7"
              >
                <SectionHeading id="online-heading" eyebrow="Online">
                  Websites and government directories
                </SectionHeading>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {website && (
                    <li className="rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
                      <a
                        href={website.url}
                        className="inline-flex min-h-10 items-center gap-2 font-semibold text-primary-800 hover:underline"
                      >
                        {town.name} · {website.label}
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      {website.note && (
                        <p className="text-sm text-gray-700">{website.note}</p>
                      )}
                      <a
                        href={website.sourceUrl}
                        className="portal-link mt-2 inline-block text-xs"
                      >
                        Website listing source
                      </a>
                    </li>
                  )}
                  {[
                    {
                      href: localGovernmentDirectory,
                      title: 'DILG local government directory',
                      body: 'Published municipal office phone numbers and email addresses.',
                    },
                    {
                      href: `${provincialWebsite}/municipal/`,
                      title: 'Provincial municipality profiles',
                      body: 'Municipal information from the Province of Marinduque.',
                    },
                    {
                      href: `https://psa.gov.ph/classification/psgc/barangays/${town.code}`,
                      title: `PSA · ${town.name}`,
                      body: 'Official barangay names and geographic codes.',
                    },
                  ].map(({ href, title, body }) => (
                    <li
                      key={href}
                      className="rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
                    >
                      <a
                        href={href}
                        className="inline-flex min-h-10 items-center gap-2 font-semibold text-primary-800 hover:underline"
                      >
                        {title}
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      <p className="text-sm text-gray-700">{body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section
                id={`sources-${town.slug}`}
                aria-labelledby="sources-heading"
                className="rounded-2xl border border-gray-200 bg-white/60 p-5 sm:p-7"
              >
                <h2
                  id="sources-heading"
                  className="text-lg font-bold text-gray-900"
                >
                  Sources and references
                </h2>
                <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  {[
                    {
                      href: populationSource,
                      label: 'PSA · 2024 population counts',
                    },
                    {
                      href: `https://psa.gov.ph/classification/psgc/barangays/${town.code}`,
                      label: `PSA · ${town.name} barangay directory`,
                    },
                    {
                      href: provincePSGC,
                      label: 'PSA · Marinduque province profile',
                    },
                    {
                      href: localGovernmentDirectory,
                      label: 'DILG MIMAROPA · local government contacts',
                    },
                    {
                      href: `${provincialWebsite}/places-of-interest-and-contact-persons/`,
                      label: 'Provincial tourism · places of interest',
                    },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className="portal-link">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-gray-600">
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
              <nav aria-label="Other municipalities" className="pt-2">
                <h2 className="font-display text-xl font-bold text-gray-900">
                  Explore other municipalities
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {municipalities
                    .filter(item => item.slug !== town.slug)
                    .map(item => (
                      <li key={item.slug}>
                        <Link
                          to={`/municipalities/${item.slug}`}
                          className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-primary-900"
                        >
                          <span className="block size-full transition-transform duration-500 group-hover:scale-105">
                            <MunicipalityPhoto slug={item.slug} />
                          </span>
                          <span className="absolute inset-0 bg-linear-to-t from-primary-950/90 to-transparent" />
                          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 font-display font-bold text-white">
                            {item.name}
                            <ArrowRight
                              size={16}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

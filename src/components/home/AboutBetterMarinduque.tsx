import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { contactMailto } from '../../data/navigation';
import { provincialWebsite } from '../../data/province';
import SEO from '../SEO';
import PageGraphic from '../brand/PageGraphic';

const portalLinks = [
  {
    label: 'Service guides',
    to: '/services',
    description: 'Find out what to bring and which office to contact.',
  },
  {
    label: 'Transparency',
    to: '/transparency',
    description: 'Follow public funds and read the records behind the figures.',
  },
  {
    label: 'Government directory',
    to: '/government',
    description: 'Find provincial departments and elected officials.',
  },
  {
    label: 'Municipalities',
    to: '/municipalities',
    description: 'Explore Marinduque’s six towns.',
  },
];

export default function AboutBetterMarinduque() {
  return (
    <div className="portal-container py-10 md:py-14">
      <SEO
        title="About"
        description="Learn how BetterMarinduque organizes public information, where its data comes from, and how to contribute."
      />
      <header className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap sm:items-center sm:gap-8">
        <div className="min-w-0 flex-[1_1_14rem]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary-700">
            For the people of Marinduque
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            About BetterMarinduque
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
            BetterMarinduque is a community-run civic information portal
            independent of the provincial and municipal governments. It helps
            residents find public services, look up local offices, explore their
            municipalities, and follow public spending.
          </p>
        </div>
        <PageGraphic kind="about" />
      </header>

      <section className="mt-10 border-t border-gray-300 pt-7">
        <h2 className="text-xl font-bold">BetterGov.ph and BetterLGU</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
          The BetterLGU directory by BetterGov.ph connects people with
          community-run portals across the Philippines. BetterMarinduque shares
          that goal by making public information easier to find and check for
          people in Marinduque.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <a
            href="https://bettergov.ph/"
            className="portal-link inline-flex items-center gap-1"
          >
            BetterGov.ph <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href="https://lgu.bettergov.ph/"
            className="portal-link inline-flex items-center gap-1"
          >
            BetterLGU directory <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mt-10 border-t border-gray-300 pt-7">
        <h2 className="text-xl font-bold">Role of the portal</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded border border-gray-300 p-5">
            <h3 className="text-lg font-bold">What we do</h3>
            <p className="mt-2 leading-relaxed text-gray-700">
              We organize public information into service guides, directories,
              maps, population figures, and public spending records. We link to
              source material so you can check what the figures cover and see
              where records are missing.
            </p>
          </div>
          <div className="rounded border border-gray-300 p-5">
            <h3 className="text-lg font-bold">Our limits</h3>
            <p className="mt-2 leading-relaxed text-gray-700">
              Government offices are responsible for issuing official records
              and handling applications, payments, complaints, and emergencies.
              Contact the responsible office directly for those requests and
              confirm current requirements, fees, and office hours with them.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 border-t border-gray-300 pt-7">
        <h2 className="text-xl font-bold">Where the information comes from</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
          We use provincial and national government publications for office and
          service information, Philippine Statistics Authority releases for
          population figures, and public documents and news reports for
          transparency coverage.
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
          Selected national budget and infrastructure records come through
          BetterGov.ph, which brings together data from sources such as the
          Department of Budget and Management, the House of Representatives, and
          the Department of Public Works and Highways. The Transparency Portal
          links each record to its source and identifies the budget stage or
          type of amount shown.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            to="/transparency"
            className="portal-link inline-flex items-center gap-1"
          >
            Explore the data and sources{' '}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a
            href="https://data.bettergov.ph/"
            className="portal-link inline-flex items-center gap-1"
          >
            BetterGov.ph Open Data <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href={provincialWebsite}
            className="portal-link inline-flex items-center gap-1"
          >
            Official Marinduque website{' '}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mt-10 border-t border-gray-300 pt-7">
        <h2 className="text-xl font-bold">Take part</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
          Help improve the portal by reporting outdated information, suggesting
          reliable sources, improving explanations, or contributing code. For
          corrections, include the page link and a supporting source if you have
          one. Email us for website feedback and contributions.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <a
            href={contactMailto}
            className="portal-link inline-flex items-center gap-1"
          >
            Email the team <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href={`${contactMailto}?subject=Correction`}
            className="portal-link inline-flex items-center gap-1"
          >
            Report a correction <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mt-10 border-t border-gray-300 pt-7">
        <h2 className="text-xl font-bold">Explore the portal</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {portalLinks.map(({ label, to, description }) => (
            <Link
              key={to}
              to={to}
              className="group rounded border border-gray-300 p-5 hover:border-primary-500 hover:bg-primary-50"
            >
              <h3 className="flex items-center justify-between gap-2 text-lg font-bold text-primary-700">
                {label} <ArrowRight size={18} aria-hidden="true" />
              </h3>
              <p className="mt-2 text-sm text-gray-700">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

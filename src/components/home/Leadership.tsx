import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { provincialContactPage, provinceLeadership } from '../../data/province';

export default function Leadership() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="bg-gray-50 py-12 md:py-16"
    >
      <div className="portal-container">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="leadership-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Provincial leadership
          </h2>
          <Link
            to="/government"
            className="portal-link inline-flex items-center gap-1 text-sm font-medium"
          >
            View officials <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {provinceLeadership.map(({ title, name, note }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-8 text-center"
            >
              <span className="mb-4 inline-block rounded-full bg-gradient-to-br from-primary-700 to-[#003d82] px-3.5 py-1.5 text-xs font-semibold text-white">
                {title}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="mt-3 text-sm text-gray-500">{note}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-600">
          <a
            href={provincialContactPage}
            className="portal-link inline-flex items-center gap-1"
          >
            Contact the provincial offices{' '}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}

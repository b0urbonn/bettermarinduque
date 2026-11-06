import { ArrowRight, Building, MapPin, Ruler, Users } from 'lucide-react';
import { Link } from 'react-router';
import { provinceStats } from '../../data/province';

const icons = [Users, Building, MapPin, Ruler];

export default function StatsCards() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-gray-50 py-12 md:py-16"
    >
      <div className="portal-container">
        <div className="mb-8 flex items-center justify-between gap-4 max-sm:flex-col max-sm:text-center">
          <h2
            id="stats-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Marinduque at a glance
          </h2>
          <Link
            to="/statistics"
            className="portal-link inline-flex items-center gap-1 text-sm font-medium"
          >
            View statistics <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provinceStats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <Link
                key={stat.label}
                to={stat.to}
                className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:-translate-y-0.5 hover:border-primary-700 hover:no-underline hover:shadow-[0_8px_24px_rgba(0,50,160,0.12)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary-700 to-[#003d82] opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-gray-50 text-primary-700 transition group-hover:bg-gradient-to-br group-hover:from-primary-700 group-hover:to-[#003d82] group-hover:text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-2xl leading-tight font-bold text-primary-700 tabular-nums transition group-hover:text-primary-900">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-gray-900">
                    {stat.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {stat.source}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  ArrowRight,
  Building2,
  GraduationCap,
  Heart,
  LayoutGrid,
  Users,
  Wheat,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router';

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
}

const cards: ServiceCard[] = [
  {
    icon: Heart,
    title: 'Health Services',
    description: 'Free check-ups, vaccines, hospitals, and health programs.',
    to: '/services/health-services',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Enrollment, scholarships, and education support.',
    to: '/services/education',
  },
  {
    icon: Building2,
    title: 'Business & Livelihood',
    description: 'Permits, clearances, taxes, and trade opportunities.',
    to: '/services/business',
  },
  {
    icon: Users,
    title: 'Social Welfare',
    description: 'Assistance for seniors, PWDs, solo parents, and families.',
    to: '/services/social-welfare',
  },
  {
    icon: Wheat,
    title: 'Agriculture & Fisheries',
    description: 'Farm and fishing support, seeds, training, and equipment.',
    to: '/services/agriculture-fisheries',
  },
];

export default function ServicesGrid() {
  return (
    <section aria-labelledby="popular-services" className="py-12 md:py-16">
      <div className="portal-container">
        <div className="text-center">
          <h2
            id="popular-services"
            className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
          >
            Popular services
          </h2>
          <p className="mt-3 text-gray-600">
            Quick access to the most-used government service guides
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description, to }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:border-primary-700 hover:no-underline hover:shadow-[0_4px_12px_rgba(0,50,160,0.1)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-gray-50 text-primary-700">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-gray-900">
                  {title}
                </span>
                <span className="mt-1 block text-[0.8125rem] text-gray-500">
                  {description}
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="text-gray-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
              />
            </Link>
          ))}
          <Link
            to="/services"
            className="group flex items-center gap-4 rounded-xl border border-transparent bg-gradient-to-br from-primary-700 to-[#003d82] p-6 text-white transition hover:no-underline hover:shadow-[0_4px_16px_rgba(0,50,160,0.3)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white/20 text-white">
              <LayoutGrid size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-white">
                View all services
              </span>
              <span className="mt-1 block text-[0.8125rem] text-white/85">
                Browse the full services directory
              </span>
            </span>
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="text-white opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

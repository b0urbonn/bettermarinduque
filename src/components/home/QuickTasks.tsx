import { Link } from 'react-router';
import { FileText, Wallet, Megaphone, MapPin } from 'lucide-react';

const tasks = [
  {
    verb: 'Apply',
    title: 'Apply for a business permit',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
    Icon: FileText,
  },
  {
    verb: 'Pay',
    title: 'Renew permits & pay local taxes',
    href: '/services/business/renew-permits-and-pay-local-business-taxes',
    Icon: Wallet,
  },
  {
    verb: 'Report',
    title: 'Report illegal dumping',
    href: '/services/garbage-waste-disposal/report-illegal-dumping-or-waste-management-violations',
    Icon: Megaphone,
  },
  {
    verb: 'Find',
    title: 'Find a government office',
    href: '/government/departments',
    Icon: MapPin,
  },
];

export default function QuickTasks() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-10 md:-mt-14 relative z-10">
        {tasks.map(({ verb, title, href, Icon }) => (
          <Link
            key={verb}
            to={href}
            className="group rounded-xl bg-white border border-gray-200 shadow-md p-5 flex items-start gap-4 transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:border-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <span className="rounded-full bg-primary-50 p-2.5 text-primary-600 shrink-0">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-secondary-500">
                {verb}
              </span>
              <span className="block text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                {title}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

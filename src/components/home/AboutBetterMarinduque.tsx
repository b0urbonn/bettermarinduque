import { Link } from 'react-router';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import MarinduqueMap from '../brand/MarinduqueMap';

const portalLinks = [
  { label: 'Service guides', description: 'See how to apply', to: '/services' },
  {
    label: 'Office directory',
    description: 'Find the right office',
    to: '/government/departments',
  },
  {
    label: 'Municipalities',
    description: 'Find municipal contacts',
    to: '/#municipalities',
  },
  {
    label: 'Emergency hotlines',
    description: 'Find numbers to call',
    to: '/#hotlines',
  },
];

export default function AboutBetterMarinduque() {
  return (
    <Section
      id="about"
      className="bg-gray-50"
      decoration={
        <MarinduqueMap className="hidden lg:block absolute right-1/2 translate-x-1/4 -bottom-24 h-[480px] w-[480px] text-secondary-600/[0.06] pointer-events-none" />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <span className="inline-flex items-center rounded-full bg-secondary-50 border border-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-600 mb-4">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500 mr-1.5"
              aria-hidden="true"
            />
            Community portal
          </span>
          <Heading level={2}>About BetterMarinduque</Heading>
          <Text className="text-gray-700 mb-4">
            BetterMarinduque is a community portal that makes local government
            information easier to find and use.
          </Text>
          <Text className="text-gray-600">
            Start here when you need to know how to apply for a service, what to
            bring, or which office to contact.
          </Text>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portalLinks.map(({ label, description, to }) => (
            <Link
              key={to}
              to={to}
              className="group block rounded-xl bg-white border border-gray-200 border-t-4 border-t-accent-400 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <div className="font-display text-lg font-semibold text-primary-800 group-hover:underline">
                {label}
              </div>
              <div className="text-sm text-gray-600 mt-1">{description}</div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

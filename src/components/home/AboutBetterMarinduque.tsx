import { Link } from 'react-router';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import Wordmark from '../brand/Wordmark';

const portalLinks = [
  { label: 'Service guides', to: '/services' },
  { label: 'Office directory', to: '/government/departments' },
  { label: 'Municipal contacts', to: '/#municipalities' },
  { label: 'Emergency hotlines', to: '/#hotlines' },
];

export default function AboutBetterMarinduque() {
  return (
    <Section id="about" className="bg-primary-900 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl">
          <Heading level={2} className="text-white mb-2">
            About <Wordmark />
          </Heading>
          <Text className="text-white/80">
            A community portal that makes local government information easier to
            find and use — how to apply for a service, what to bring, and which
            office to contact.
          </Text>
        </div>
        <nav aria-label="Portal sections" className="flex flex-wrap gap-3">
          {portalLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 hover:border-accent-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </Section>
  );
}

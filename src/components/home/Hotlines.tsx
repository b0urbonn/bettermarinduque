import { ArrowUpRight, HeartPulse, Phone, Siren } from 'lucide-react';
import { emergencyDirectory } from '../../data/province';

const hotlines = [
  {
    name: 'National Emergency Hotline',
    description: 'Police, fire, and medical emergencies',
    number: '911',
    Icon: Phone,
  },
  {
    name: 'Marinduque PDRRMO',
    description: 'Disaster response and rescue',
    number: '0968-226-5727',
    Icon: Siren,
  },
  {
    name: 'Philippine Red Cross',
    description: 'Marinduque Chapter',
    number: '0917-826-1395',
    Icon: HeartPulse,
  },
];

export default function Hotlines() {
  return (
    <section
      id="hotlines"
      aria-labelledby="hotlines-heading"
      className="portal-container border-t border-gray-300 py-8 md:py-10"
    >
      <h2 id="hotlines-heading" className="text-2xl font-bold tracking-tight">
        Emergency contacts
      </h2>
      <p className="mt-2 text-gray-700">
        Call 911 for an emergency. Use the local numbers for disaster response
        and Red Cross assistance.
      </p>
      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {hotlines.map(({ name, description, number, Icon }) => (
          <li
            key={name}
            className="flex gap-3 rounded-md border border-gray-300 p-4"
          >
            <span className="self-start rounded-lg bg-gray-50 p-2.5 text-primary-700">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="mt-1 text-sm text-gray-700">{description}</p>
              <a
                href={`tel:${number.replaceAll('-', '')}`}
                aria-label={`${name}, ${number}`}
                className="portal-link mt-1 inline-flex min-h-11 items-center gap-1.5 text-lg font-bold tabular-nums"
              >
                Call {number}
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-gray-700">
        <a
          href={emergencyDirectory}
          className="portal-link inline-flex items-center gap-1"
        >
          Verify numbers in the provincial emergency directory{' '}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}

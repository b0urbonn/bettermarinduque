import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Phone } from 'lucide-react';

interface Hotline {
  name: string;
  number: string;
  tel: string;
}

const groups: { label: string; hotlines: Hotline[] }[] = [
  {
    label: 'National',
    hotlines: [
      { name: 'National Emergency Hotline', number: '911', tel: '911' },
      { name: 'Philippine Red Cross', number: '143', tel: '143' },
    ],
  },
  {
    label: 'Provincial',
    hotlines: [
      {
        name: 'Marinduque PDRRMO (Provincial Capitol, Boac)',
        number: '0968-226-5727',
        tel: '09682265727',
      },
      {
        name: 'Santa Cruz MDRRMO',
        number: '0920-455-4034',
        tel: '09204554034',
      },
    ],
  },
  {
    label: 'Police stations',
    hotlines: [
      { name: 'PNP Boac', number: '0998-598-5802', tel: '09985985802' },
      { name: 'PNP Mogpog', number: '0998-598-5807', tel: '09985985807' },
      { name: 'PNP Gasan', number: '0998-598-5803', tel: '09985985803' },
      { name: 'PNP Buenavista', number: '0998-598-5804', tel: '09985985804' },
      { name: 'PNP Torrijos', number: '0998-598-5805', tel: '09985985805' },
      { name: 'PNP Santa Cruz', number: '0998-598-5806', tel: '09985985806' },
    ],
  },
];

export default function Hotlines() {
  return (
    <Section
      id="hotlines"
      className="bg-secondary-50 border-y border-secondary-100"
    >
      <Heading level={2}>Emergency Hotlines</Heading>
      {groups.map(group => (
        <div key={group.label} className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-600 mb-3">
            {group.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.hotlines.map(h => (
              <div
                key={h.name}
                className="rounded-xl bg-white border border-secondary-100 p-5 flex items-start gap-3"
              >
                <span className="rounded-full bg-secondary-50 p-2 text-secondary-500 shrink-0">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {h.name}
                  </div>
                  <a
                    href={`tel:${h.tel}`}
                    className="text-lg font-bold text-secondary-600 hover:text-secondary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 rounded-sm"
                  >
                    {h.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500">
        Local numbers are compiled from public directories and office pages
        (November 2026). If a line doesn't connect, dial 911.
      </p>
    </Section>
  );
}

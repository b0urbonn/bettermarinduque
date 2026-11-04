import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

const facts = [
  { label: 'Capital', value: 'Boac' },
  { label: 'Population', value: '239,207 (2020 Census)' },
  { label: 'Barangays', value: '218 in 6 towns' },
  { label: 'Highest peak', value: 'Mt. Malindig (1,157 m)' },
];

export default function AboutMarinduque() {
  return (
    <Section id="about" className="bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <span className="inline-flex items-center rounded-full bg-secondary-50 border border-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-600 mb-4">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500 mr-1.5"
              aria-hidden="true"
            />
            Moryonan · Lenten Rites & Panata
          </span>
          <Heading level={2}>About Marinduque</Heading>
          <Text className="text-gray-700 mb-4">
            Marinduque is an island province in the MIMAROPA region, often
            called the Heart of the Philippines for its heart-like shape and its
            location near the geographic center of the archipelago. Marinduque's
            Moryonan, also known as the Moriones Lenten Rites, is a Holy Week
            religious practice centered on devotion and reenactments of the
            story of Longinus. Participants wear hand-carved moryon masks and
            Roman soldier garb during processions. For many, taking part is a
            panata — a personal vow expressed through penance or thanksgiving.
            Marinduque is also home to the Luzon Datum of 1911 in Mogpog, the
            reference point for Philippine maps and surveys.
          </Text>
          <Text className="text-gray-600 mb-4">
            Better Marinduque is a community-run portal that makes provincial
            services easier to find.
          </Text>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {facts.map(fact => (
            <div
              key={fact.label}
              className="rounded-xl bg-white border border-gray-200 border-t-4 border-t-accent-400 p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                {fact.label}
              </div>
              <div className="font-display text-lg font-semibold text-primary-800">
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

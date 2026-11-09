import { ExternalLink } from 'lucide-react';
import type { DisclosureTopic } from '../../data/transparency';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import AmountBar from './AmountBar';

const pesos = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

export default function DisclosureView({ topic }: { topic: DisclosureTopic }) {
  return (
    <>
      <Section>
        <Heading level={2}>Selected public records</Heading>
        <ul className="grid gap-4 md:grid-cols-2">
          {topic.records.map(record => {
            const { comparison } = record;
            const maximum = Math.max(
              0,
              ...(comparison?.figures.map(figure => figure.amount) ?? [])
            );

            return (
              <li key={record.title} className="card flex flex-col p-5 sm:p-6">
                <p className="eyebrow">{record.period}</p>
                <h3 className="mt-1 font-display text-xl font-extrabold tracking-tight text-gray-900">
                  {record.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {record.description}
                </p>
                {comparison && (
                  <figure className="mt-4">
                    <figcaption className="text-sm font-semibold text-gray-900">
                      {comparison.title}
                    </figcaption>
                    <dl className="mt-3 space-y-3">
                      {comparison.figures.map(figure => (
                        <div key={figure.label}>
                          <dt className="text-sm text-gray-700">
                            {figure.label}
                          </dt>
                          <dd className="space-y-1 text-sm font-semibold tabular-nums text-gray-900">
                            <div>{pesos.format(figure.amount)}</div>
                            <AmountBar
                              amount={figure.amount}
                              maximum={maximum}
                            />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </figure>
                )}
                {record.figures && (
                  <dl className="mt-4 grid gap-3 rounded-lg bg-primary-50 p-4 sm:grid-cols-2">
                    {record.figures.map(figure => (
                      <div key={figure.label}>
                        <dt className="text-sm text-gray-700">
                          {figure.label}
                        </dt>
                        <dd className="font-semibold tabular-nums text-gray-900">
                          {pesos.format(figure.amount)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="mt-auto space-y-3 pt-4 text-sm">
                  {[record.source, ...(record.relatedSources ?? [])].map(
                    source => (
                      <li key={source.url}>
                        <p className="text-gray-700">{source.publisher}</p>
                        <a
                          href={source.url}
                          className="inline-flex items-center gap-2 font-semibold text-primary-800 underline underline-offset-2"
                        >
                          {source.title}
                          <ExternalLink
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section className="border-t border-gray-200 bg-sand-50">
        <Heading level={2}>Find more records</Heading>
        <p className="mb-4 max-w-3xl text-gray-600">{topic.nextSteps}</p>
        <ul className="space-y-4">
          {topic.directories.map(directory => (
            <li key={directory.url}>
              <a
                href={directory.url}
                className="inline-flex items-center gap-2 font-semibold text-primary-800 underline underline-offset-2"
              >
                {directory.name}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <p className="mt-1 text-sm text-gray-700">
                {directory.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

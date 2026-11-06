import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import { contactMailto } from '../data/navigation';
import { provincialWebsite } from '../data/province';

const faqs = [
  {
    question: 'Is this an official government website?',
    answer: `No. BetterMarinduque is an independent, volunteer-run community portal and is not operated by or affiliated with the Provincial Government of Marinduque. The official provincial website is marinduque.gov.ph.`,
  },
  {
    question: 'Where does the information come from?',
    answer:
      'Content is compiled from public sources — provincial and national government publications, PSA releases, and public budget documents. Transparency figures each carry a citation to their source document.',
  },
  {
    question: 'How current is the information?',
    answer:
      'We update on a best-effort basis, so content may lag behind official records. Where the portal and an official government publication disagree, the government publication prevails.',
  },
  {
    question: 'Can I process permits or payments here?',
    answer:
      'No. This site is informational only — it explains where to go and what to bring. All official transactions are handled by the responsible government office.',
  },
  {
    question: 'I found an error. How do I report it?',
    answer:
      'Email us with the page link and, if possible, a supporting source. Corrections are the point of the project — no fix is too small.',
  },
  {
    question: 'How can I contribute?',
    answer:
      'Content lives as Markdown and YAML in the GitHub repository, so you can edit pages directly on GitHub or open a pull request. Non-developers can email corrections or source suggestions.',
  },
  {
    question: 'Does the site collect personal data?',
    answer:
      'No. The portal is a static site — there are no accounts, no forms collecting personal information, and no cookies set by the app itself.',
  },
];

export default function Faq() {
  return (
    <div className="portal-container py-10 md:py-14">
      <SEO
        title="FAQs"
        description="Common questions about BetterMarinduque — what it is, where information comes from, and how to contribute."
      />
      <header>
        <p className="font-mono text-xs tracking-widest text-primary-700 uppercase">
          Common questions
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h1>
      </header>

      <div className="mt-8 max-w-3xl space-y-3">
        {faqs.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-xl border border-gray-200 bg-white open:border-primary-700"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-gray-900 marker:hidden [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDown
                size={18}
                aria-hidden="true"
                className="shrink-0 text-gray-400 transition group-open:rotate-180 group-open:text-primary-700"
              />
            </summary>
            <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
              {answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-8 max-w-3xl rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-base font-bold text-gray-900">
          Still have a question?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Email us at any time — or visit the{' '}
          <a href={provincialWebsite} className="portal-link">
            official provincial website
          </a>{' '}
          for government services.
        </p>
        <a
          href={contactMailto}
          className="portal-link mt-3 inline-flex items-center gap-1 text-sm font-medium"
        >
          Email the team
        </a>
      </div>
    </div>
  );
}

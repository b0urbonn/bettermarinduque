import { ArrowUpRight, FileText, ScrollText } from 'lucide-react';
import SEO from '../components/SEO';
import { contactMailto } from '../data/navigation';

const sections = [
  {
    icon: ScrollText,
    title: 'Provincial ordinances',
    description:
      'Ordinances enacted by the Sangguniang Panlalawigan of Marinduque. This index is being compiled — once published, each ordinance will be listed with its number, title, and date of approval.',
  },
  {
    icon: FileText,
    title: 'Provincial resolutions',
    description:
      'Resolutions passed by the Sangguniang Panlalawigan. We are gathering official copies so they can be browsed and searched here.',
  },
];

export default function Legislative() {
  return (
    <div className="portal-container py-10 md:py-14">
      <SEO
        title="Legislative"
        description="Ordinances and resolutions of the Sangguniang Panlalawigan of Marinduque — an index currently being compiled."
      />
      <header>
        <p className="font-mono text-xs tracking-widest text-primary-700 uppercase">
          Sangguniang Panlalawigan
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Legislative documents
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
          Ordinances and resolutions of the Marinduque Provincial Board. This
          section is under construction — documents will appear here as official
          copies are gathered and indexed.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-primary-700/15 bg-primary-50 p-6">
        <h2 className="text-base font-bold text-gray-900">
          Have copies of provincial board documents?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you can point us to official copies of Marinduque ordinances or
          resolutions — or you are from the SP Secretary&apos;s office — we
          would love to index them here.
        </p>
        <a
          href={`${contactMailto}?subject=Legislative%20documents`}
          className="portal-link mt-3 inline-flex items-center gap-1 text-sm font-medium"
        >
          Suggest documents <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

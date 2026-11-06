import { ArrowUpRight, Github, Globe, Mail, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import {
  contactEmail,
  contactMailto,
  contributorsUrl,
  repoUrl,
} from '../data/navigation';
import { capitolAddress, provincialContactPage } from '../data/province';

export default function Contact() {
  return (
    <div className="portal-container py-10 md:py-14">
      <SEO
        title="Contact"
        description="Reach the BetterMarinduque volunteer team, contribute on GitHub, or find the provincial government's own contact points."
      />
      <header>
        <p className="font-mono text-xs tracking-widest text-primary-700 uppercase">
          Get in touch
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">
          BetterMarinduque is a volunteer-run community portal. For corrections,
          suggestions, or to contribute, reach us below. For official
          transactions, contact the provincial government directly.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <a
          href={contactMailto}
          className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:border-primary-700 hover:no-underline hover:shadow-[0_4px_12px_rgba(0,50,160,0.08)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
            <Mail size={20} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
              Email the team
            </span>
            <span className="mt-1 block text-base font-semibold break-all text-gray-900">
              {contactEmail}
            </span>
            <span className="mt-1 block text-[0.8125rem] text-gray-500">
              Corrections, feedback, and contributions
            </span>
          </span>
        </a>
        <a
          href={repoUrl}
          className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:border-primary-700 hover:no-underline hover:shadow-[0_4px_12px_rgba(0,50,160,0.08)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
            <Github size={20} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
              GitHub
            </span>
            <span className="mt-1 block text-base font-semibold text-gray-900">
              b0urbonn/bettermarinduque
            </span>
            <span className="mt-1 block text-[0.8125rem] text-gray-500">
              Open an issue or submit a pull request
            </span>
          </span>
        </a>
        <a
          href={provincialContactPage}
          className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:border-primary-700 hover:no-underline hover:shadow-[0_4px_12px_rgba(0,50,160,0.08)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
            <Globe size={20} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
              Official government
            </span>
            <span className="mt-1 block text-base font-semibold text-gray-900">
              marinduque.gov.ph
            </span>
            <span className="mt-1 block text-[0.8125rem] text-gray-500">
              Office directory and official transactions
            </span>
          </span>
        </a>
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
            <MapPin size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
              Address
            </h2>
            <p className="mt-1 text-base font-semibold text-gray-900">
              Provincial Capitol
            </p>
            <p className="mt-1 text-[0.8125rem] text-gray-500">
              {capitolAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-primary-700/15 bg-primary-50 p-6">
        <h2 className="text-base font-bold text-gray-900">
          This portal is volunteer-run
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
          BetterMarinduque is not an official government website and cannot
          process permits, payments, or records requests. Every page is open
          source — corrections and new content are welcome from anyone,
          especially Marinduqueños.
        </p>
        <a
          href={contributorsUrl}
          className="portal-link mt-3 inline-flex items-center gap-1 text-sm font-medium"
        >
          Meet the contributors <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

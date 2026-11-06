import { ArrowRight, Globe, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { contactEmail, contactMailto } from '../../data/navigation';
import { capitolAddress, provincialContactPage } from '../../data/province';

export default function ContactCards() {
  return (
    <section aria-labelledby="contact-heading" className="py-12 md:py-16">
      <div className="portal-container">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="contact-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Get in touch
          </h2>
          <Link
            to="/contact"
            className="portal-link inline-flex items-center gap-1 text-sm font-medium"
          >
            View all <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href={provincialContactPage}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:border-primary-700 hover:no-underline hover:shadow-[0_4px_12px_rgba(0,50,160,0.08)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
              <Globe size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
                Official site
              </span>
              <span className="mt-1 block text-base font-semibold text-gray-900">
                marinduque.gov.ph
              </span>
              <span className="mt-1 block text-[0.8125rem] text-gray-500">
                Provincial government website and office directory
              </span>
            </span>
          </a>
          <a
            href={contactMailto}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 transition hover:border-primary-700 hover:no-underline hover:shadow-[0_4px_12px_rgba(0,50,160,0.08)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
              <Mail size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
                Email
              </span>
              <span className="mt-1 block text-base font-semibold break-all text-gray-900">
                {contactEmail}
              </span>
              <span className="mt-1 block text-[0.8125rem] text-gray-500">
                Corrections, feedback, and contributions
              </span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-gray-900">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[0.8125rem] font-medium tracking-wider text-gray-500 uppercase">
                Address
              </h3>
              <p className="mt-1 text-base font-semibold text-gray-900">
                Provincial Capitol
              </p>
              <p className="mt-1 text-[0.8125rem] text-gray-500">
                {capitolAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, Github, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';
import {
  contactEmail,
  contactMailto,
  footerNavigation,
  repoUrl,
} from '../../data/navigation';
import MarinduqueMap from '../brand/MarinduqueMap';
import Logo from '../brand/Logo';

export default function Footer() {
  return (
    <footer className="hero-surface relative isolate overflow-hidden">
      <MarinduqueMap className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-[34rem] text-white/[0.05]" />
      <div className="portal-container py-12 md:py-14">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
          <div>
            <p className="font-display text-lg font-bold">
              In an emergency, call 911.
            </p>
            <p className="mt-1 text-sm text-white/75">
              Police, fire, and medical response anywhere in Marinduque. Local
              hotlines are on the home page.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="tel:911" className="btn btn-light">
              <Phone size={16} aria-hidden="true" /> Call 911
            </a>
            <Link to="/#hotlines" className="btn btn-on-dark">
              Local hotlines
            </Link>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              to="/"
              aria-label="BetterMarinduque home"
              className="inline-flex items-center gap-3"
            >
              <Logo variant="light" className="h-12 w-auto" />
              <span className="font-display text-lg leading-none font-extrabold tracking-tight">
                Better<span className="block text-accent-300">Marinduque</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              A community portal for the Heart of the Philippines. Service
              guides, public records, and contacts for the offices that serve
              Marinduque’s six towns and 218 barangays.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={contactMailto}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-3.5 text-sm hover:bg-white/10"
              >
                <Mail size={16} aria-hidden="true" />
                {contactEmail}
              </a>
              <a
                href={repoUrl}
                aria-label="BetterMarinduque source code on GitHub"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <Github size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          {footerNavigation.map(({ title, links }) => (
            <div key={title}>
              <h2 className="mb-4 font-sans text-xs font-bold tracking-[0.14em] text-accent-300 uppercase">
                {title}
              </h2>
              <ul className="space-y-1 text-sm">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    {href.startsWith('https://') || href.endsWith('.html') ? (
                      <a
                        href={href}
                        className="inline-flex min-h-8 items-center gap-1 text-white/85 hover:text-white hover:underline"
                      >
                        {label}
                        {href.startsWith('https://') && (
                          <ArrowUpRight
                            size={13}
                            aria-hidden="true"
                            className="text-white/50"
                          />
                        )}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className="inline-flex min-h-8 items-center text-white/85 hover:text-white hover:underline"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/65">
          <p>
            An independent community initiative. Not an official website of the
            Province of Marinduque.
          </p>
          <p>© {new Date().getFullYear()} BetterMarinduque · MIMAROPA Region</p>
        </div>
      </div>
    </footer>
  );
}

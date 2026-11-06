import { ArrowUpRight, Github, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router';
import {
  contactEmail,
  contactMailto,
  contributorsUrl,
  footerNavigation,
  repoUrl,
} from '../../data/navigation';
import Logo from '../brand/Logo';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-gradient-to-b from-[#1a1a1a] to-[#111111] text-white"
    >
      <div className="portal-container">
        <div className="grid gap-12 border-b border-white/[0.08] py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-xs">
            <Link
              to="/"
              aria-label="BetterMarinduque home"
              className="inline-flex items-center gap-3"
            >
              <Logo variant="light" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              A community portal for Marinduque. Find local service guides,
              public records, and contacts for the offices that serve the
              province.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={repoUrl}
                aria-label="BetterMarinduque on GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/[0.08] text-white/70 transition hover:-translate-y-0.5 hover:bg-primary-700 hover:text-white"
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href={contactMailto}
                aria-label={`Email ${contactEmail}`}
                className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/[0.08] text-white/70 transition hover:-translate-y-0.5 hover:bg-primary-700 hover:text-white"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
              <a
                href="https://bettergov.ph/"
                aria-label="BetterGov.ph"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/[0.08] text-white/70 transition hover:-translate-y-0.5 hover:bg-primary-700 hover:text-white"
              >
                <Globe size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          {footerNavigation.map(({ title, links }) => (
            <div key={title}>
              <h2 className="mb-5 text-[0.8125rem] font-semibold tracking-wider text-white/50 uppercase">
                {title}
              </h2>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    {href.startsWith('https://') ||
                    href.startsWith('mailto:') ||
                    href.endsWith('.html') ? (
                      <a
                        href={href}
                        className="inline-flex items-center gap-1 text-[0.8125rem] text-white/80 transition hover:text-white hover:no-underline"
                      >
                        {label}
                        {href.startsWith('https://') && (
                          <ArrowUpRight
                            size={12}
                            aria-hidden="true"
                            className="opacity-60"
                          />
                        )}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className="text-[0.8125rem] text-white/80 transition hover:text-white hover:no-underline"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span
              role="status"
              aria-label="Cost to the people of Marinduque: zero pesos"
              className="inline-flex items-center gap-1.5 rounded-md bg-success-500/[0.08] px-3 py-1.5 text-xs whitespace-nowrap text-white/80"
            >
              Cost to the people of Marinduque ={' '}
              <span className="font-bold text-success-400">₱0</span>
            </span>
            <div className="mt-3 flex flex-col items-start gap-3">
              <a
                href={contactMailto}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[0.8125rem] text-white/70 transition hover:bg-white/10 hover:text-white hover:no-underline"
              >
                <Mail
                  size={14}
                  aria-hidden="true"
                  className="text-accent-500"
                />
                Volunteer with us
              </a>
              <a
                href={repoUrl}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[0.8125rem] text-white/70 transition hover:bg-white/10 hover:text-white hover:no-underline"
              >
                <Github
                  size={14}
                  aria-hidden="true"
                  className="text-accent-500"
                />
                Contribute on GitHub
              </a>
              <a
                href={contributorsUrl}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[0.8125rem] text-white/70 transition hover:bg-white/10 hover:text-white hover:no-underline"
              >
                <Github
                  size={14}
                  aria-hidden="true"
                  className="text-accent-500"
                />
                Contributors
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 py-6 text-[0.8125rem] text-white/50">
          <span className="text-white/60">
            &copy; {currentYear} BetterMarinduque
          </span>
          <span className="text-white/45">· CC0</span>
          <span className="text-white/40">
            · An independent community initiative — not an official government
            website.
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-white/50 max-sm:ml-0">
            For the people of Marinduque.
          </span>
        </div>
      </div>
    </footer>
  );
}

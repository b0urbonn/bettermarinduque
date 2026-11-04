import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router';
import { footerNavigation, projectRepository } from '../../data/navigation';
import Logo from '../brand/Logo';

export default function Footer() {
  return (
    <footer id="about" className="bg-neutral-950 text-white">
      <div className="portal-container py-8 md:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link
              to="/"
              aria-label="BetterMarinduque home"
              className="inline-flex items-center gap-3"
            >
              <Logo variant="light" className="h-9 w-auto" />
              <span className="text-lg font-bold leading-none">
                Better<span className="block">Marinduque</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-300">
              A community portal for Marinduque. Find local service guides,
              public records, and contacts for the offices that serve the
              province.
            </p>
            <a
              href={projectRepository}
              aria-label="BetterMarinduque on GitHub"
              className="mt-4 inline-flex hover:text-primary-200"
            >
              <Github size={20} aria-hidden="true" />
            </a>
          </div>
          {footerNavigation.map(({ title, links }) => (
            <div key={title}>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                {title}
              </h2>
              <ul className="space-y-2.5 text-sm">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    {href.startsWith('https://') || href.endsWith('.html') ? (
                      <a
                        href={href}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        {label}
                        {href.startsWith('https://') && (
                          <ArrowUpRight size={13} aria-hidden="true" />
                        )}
                      </a>
                    ) : (
                      <Link to={href} className="hover:underline">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-neutral-700 pt-5 text-sm text-neutral-300">
          <p>An independent community initiative.</p>
          <p>For the people of Marinduque.</p>
        </div>
      </div>
    </footer>
  );
}

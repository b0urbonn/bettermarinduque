import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Logo from '../brand/Logo';

const socialLinks = [
  {
    label: 'Facebook',
    url: import.meta.env.VITE_FACEBOOK_URL,
    Icon: Facebook,
  },
  {
    label: 'Instagram',
    url: import.meta.env.VITE_INSTAGRAM_URL,
    Icon: Instagram,
  },
  {
    label: 'YouTube',
    url: import.meta.env.VITE_YOUTUBE_URL,
    Icon: Youtube,
  },
  {
    label: 'Twitter',
    url: import.meta.env.VITE_TWITTER_URL,
    Icon: Twitter,
  },
].filter(link => Boolean(link.url));

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="banderitas" aria-hidden="true" />
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo variant="light" className="h-10 w-auto" />
              <div>
                <div className="font-display font-bold">{t('site_name')}</div>
                <div className="text-xs text-white/60">
                  Province of Marinduque
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">
              A community-run portal for the Province of Marinduque — the Heart
              of the Philippines.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map(({ label, url, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    aria-label={label}
                    className="text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {year} Better Marinduque. Community-run; not an official
              government website unless stated.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/image-credits.html"
                className="text-white/60 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Photo credits
              </a>
              <a
                href="https://github.com/bettergovph/bettergov"
                className="text-white/60 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute at GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

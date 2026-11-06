import { provincialWebsite } from './province';
import { PORTAL_URL } from '../lib/budgetApi';

export const mainNavigation = [
  { label: 'Services', href: '/services' },
  { label: 'Municipalities', href: '/municipalities' },
  { label: 'Government', href: '/government' },
  { label: 'Transparency', href: '/transparency' },
  // The dedicated budget portal (its own site, like budget.betterlaspinas.org).
  { label: 'Budget', href: PORTAL_URL },
  { label: 'About', href: '/about' },
];

export const contactEmail = 'bettermarinduque@proton.me';
export const contactMailto = `mailto:${contactEmail}`;

export const repoUrl = 'https://github.com/b0urbonn/bettermarinduque';
export const contributorsUrl = `${repoUrl}/graphs/contributors`;

export const footerNavigation = [
  { title: 'Explore', links: mainNavigation },
  {
    title: 'The project',
    links: [
      { label: 'About this project', href: '/about' },
      { label: 'Source code on GitHub', href: repoUrl },
      { label: 'Contributors', href: contributorsUrl },
      { label: 'Emergency hotlines', href: '/#hotlines' },
      { label: 'Photo credits', href: '/image-credits.html' },
    ],
  },
  {
    title: 'Official sources & partners',
    links: [
      { label: 'Provincial government', href: provincialWebsite },
      {
        label: 'Provincial office directory',
        href: provincialWebsite + '/contact-us/',
      },
      { label: 'BetterGov.ph', href: 'https://bettergov.ph/' },
      { label: 'BetterLGU community', href: 'https://lgu.bettergov.ph/' },
    ],
  },
];

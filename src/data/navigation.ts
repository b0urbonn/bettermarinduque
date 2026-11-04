import { provincialWebsite } from './province';

export const mainNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Government', href: '/government' },
  { label: 'About', href: '/about' },
];

export const contactEmail = 'bettermarinduque@proton.me';
export const contactMailto = `mailto:${contactEmail}`;

export const footerNavigation = [
  { title: 'Explore', links: mainNavigation },
  {
    title: 'The project',
    links: [
      { label: 'About this project', href: '/about' },
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

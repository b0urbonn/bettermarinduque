import {
  citizenCharter,
  provincialContactPage,
  provincialWebsite,
} from './province';

export const mainNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Municipalities', href: '/municipalities' },
  { label: 'Services', href: '/services' },
  { label: 'Government', href: '/government' },
  { label: 'Statistics', href: '/statistics' },
  { label: 'Legislative', href: '/legislative' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Contact', href: '/contact' },
];

export const contactEmail = 'bettermarinduque@proton.me';
export const contactMailto = `mailto:${contactEmail}`;

export const repoUrl = 'https://github.com/b0urbonn/bettermarinduque';
export const contributorsUrl = `${repoUrl}/graphs/contributors`;

export const footerNavigation = [
  {
    title: 'Quick links',
    links: [
      { label: 'About this project', href: '/about' },
      { label: 'Municipalities', href: '/municipalities' },
      { label: 'Transparency portal', href: '/transparency' },
      { label: 'News & updates', href: '/news' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Photo credits', href: '/image-credits.html' },
    ],
  },
  {
    title: 'Official sources',
    links: [
      { label: 'Provincial government', href: provincialWebsite },
      { label: 'Office directory', href: provincialContactPage },
      { label: "Citizen's charter", href: citizenCharter },
      { label: 'FOI portal', href: 'https://www.foi.gov.ph/' },
      { label: 'BetterGov.ph', href: 'https://bettergov.ph/' },
      { label: 'BetterLGU community', href: 'https://lgu.bettergov.ph/' },
    ],
  },
];

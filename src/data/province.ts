export const provincialWebsite = 'https://marinduque.gov.ph';
export const populationSource =
  'https://rssomimaropa.psa.gov.ph/content/official-population-count-province-marinduque-2024-census-population';
export const provincePSGC =
  'https://psa.gov.ph/classification/psgc/citimuni/1704000000';
export const citizenCharter = provincialWebsite + '/citizens-charter/';
export const emergencyDirectory = provincialWebsite + '/emergency-contacts/';
export const provincialContactPage = provincialWebsite + '/contact-us/';

// Provincial coordinates: Boac (provincial capital), Marinduque
export const capitolCoordinates = { lat: 13.4463, lon: 121.8407 };
export const capitolAddress =
  'Provincial Capitol, Capitol Compound, Boac, Marinduque 4900';

export const provinceStats = [
  {
    label: 'Population',
    value: '226,522',
    source: '2024 Census · PSA',
    to: '/statistics',
  },
  {
    label: 'Municipalities',
    value: '6',
    source: 'Component towns of the province',
    to: '/municipalities',
  },
  {
    label: 'Barangays',
    value: '218',
    source: 'PSA PSGC',
    to: '/statistics',
  },
  {
    label: 'Land Area',
    value: '952.58 km²',
    source: 'PSA Philippine Statistical Yearbook',
    to: '/statistics',
  },
] as const;

export const provinceLeadership = [
  {
    title: 'Provincial Governor',
    name: 'Hon. Melecio J. Go',
    note: 'Elected May 2025 · PDP-Laban',
  },
  {
    title: 'Vice Governor',
    name: 'Hon. Romulo A. Bacorro Jr.',
    note: 'Elected May 2025 · Independent',
  },
] as const;

export const provinceHistory = [
  {
    year: '1900',
    text: 'Filipino forces under Col. Máximo Abad win the Battle of Pulang Lupa in Torrijos — one of the worst U.S. defeats of the Philippine–American War.',
  },
  {
    year: '1901',
    text: 'Marinduque is established as a province under American civil government on May 1, with Boac as capital.',
  },
  {
    year: '1902',
    text: 'The province is annexed to Tayabas (now Quezon) on November 10.',
  },
  {
    year: '1911',
    text: 'Station Balanacan in Mogpog becomes the origin of the Luzon Datum of 1911 — the geodetic center of the Philippine mapping system.',
  },
  {
    year: '1920',
    text: 'Marinduque is re-established as a separate province on February 21 through Act No. 2880.',
  },
  {
    year: '1996',
    text: 'The Marcopper mine tailings disaster on March 24 spills into the Boac River — one of the largest mining disasters in Philippine history.',
  },
] as const;

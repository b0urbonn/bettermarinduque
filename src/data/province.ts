export const provincialWebsite = 'https://marinduque.gov.ph';
export const populationSource =
  'https://rssomimaropa.psa.gov.ph/content/official-population-count-province-marinduque-2024-census-population';
export const provincePSGC =
  'https://psa.gov.ph/classification/psgc/citimuni/1704000000';
export const citizenCharter = provincialWebsite + '/citizens-charter/';
export const emergencyDirectory = provincialWebsite + '/emergency-contacts/';
export const socioEconomicProfile =
  provincialWebsite + '/socio-economic-profile/';
export const gettingThereSource =
  'https://mogpog.gov.ph/how-to-get-to-marinduque/';

// Province-wide figures. See docs/marinduque-facts.md for sources.
export const provinceFacts = {
  population: '226,522',
  municipalities: 6,
  barangays: 218,
  capital: 'Boac',
  area: '952.58',
  highestPoint: 'Mount Malindig',
  highestElevation: '1,157',
  founded: 'February 21, 1921',
  region: 'MIMAROPA',
} as const;

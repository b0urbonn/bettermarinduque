import { provincialWebsite } from './province';

const provincialTourism =
  provincialWebsite + '/places-of-interest-and-contact-persons/';
const provincialProfiles = provincialWebsite + '/municipal/';
const tourismCaravan =
  'https://pia.gov.ph/news/luzon/mimaropa/dot-launches-cultural-tourism-caravan-to-showcase-marinduques-heritage/';

export const festivalSource =
  'https://pia.gov.ph/news/marinduque-offers-more-than-moryonan-says-tourism-office/';
export const localGovernmentDirectory =
  'https://mimaropa.dilg.gov.ph/contact-us/field-office/';

interface MunicipalityGuide {
  festival: string;
  places: { name: string; description: string; source: string }[];
  municipalOffice: string;
  fireStation: string;
  localResponse: { label: string; number: string };
}

export const municipalityGuides = {
  boac: {
    festival: 'Bila-bila Festival',
    places: [
      {
        name: 'National Museum of the Philippines – Marinduque',
        description:
          'The museum in Barangay Malusak has exhibits on Moryonan, Marinduque shipwrecks, and the Philippine Rise.',
        source:
          'https://www.nationalmuseum.gov.ph/our-museums-regional-area-and-site-museums-marinduque-romblon/',
      },
      {
        name: 'Boac Cathedral',
        description:
          'A historic stone fortress church in the provincial capital.',
        source: provincialTourism,
      },
    ],
    municipalOffice: '(042) 311-1378',
    fireStation: '(042) 332-0255',
    localResponse: { label: 'Police station', number: '(042) 332-0166' },
  },
  buenavista: {
    festival: 'Tubaan Festival',
    places: [
      {
        name: 'Malbog Hot Spring',
        description:
          'A sulfur hot spring at the foot of Mount Malindig in Barangay Malbog.',
        source:
          'https://region4b.dost.gov.ph/drying-with-hot-water-food-dehydrator-in-marinduque-utilizes-heat-from-malbog-hot-spring/',
      },
      {
        name: 'Mount Malindig',
        description:
          'Marinduque’s highest peak rises above the southern part of the island.',
        source: provincialProfiles,
      },
    ],
    municipalOffice: '(042) 704-0062',
    fireStation: '(042) 704-0095',
    localResponse: {
      label: 'Municipal disaster response',
      number: '0918-441-0544',
    },
  },
  gasan: {
    festival: 'Gasang-gasang Festival',
    places: [
      {
        name: 'Tres Reyes Islands',
        description:
          'The islands off Gasan’s coast are part of Barangay Pinggan.',
        source: provincialProfiles,
      },
      {
        name: 'St. Joseph Parish Church',
        description:
          'The hilltop church overlooks the town and features work by local artists.',
        source: provincialTourism,
      },
    ],
    municipalOffice: '(042) 342-1074',
    fireStation: '(042) 332-0477',
    localResponse: {
      label: 'Municipal disaster response',
      number: '(042) 332-0833',
    },
  },
  mogpog: {
    festival: 'Kangga Festival',
    places: [
      {
        name: 'Station Balanacan',
        description:
          'The survey marker on Mount Mataas in Barangay Hinanggayon marks the origin of the Luzon Datum of 1911.',
        source:
          'https://philhistoricsites.nhcp.gov.ph/registry_database/station-balanacan/',
      },
      {
        name: 'Balanacan Port',
        description:
          'A ferry gateway between Marinduque and Dalahican Port in Lucena. Check schedules with the operator before traveling.',
        source: 'https://mogpog.gov.ph/how-to-get-to-marinduque/',
      },
    ],
    municipalOffice: '(042) 332-1249',
    fireStation: '(042) 332-0810',
    localResponse: {
      label: 'Municipal disaster response',
      number: '0917-813-7880',
    },
  },
  'santa-cruz': {
    festival: 'Seafood Festival',
    places: [
      {
        name: 'Maniwaya Island',
        description:
          'An island off Santa Cruz known for its beaches. Confirm local boat arrangements before traveling.',
        source: festivalSource,
      },
      {
        name: 'Kawa-Kawa Falls',
        description:
          'A waterfall in Santa Cruz with pools named for their kettle-like shape.',
        source: provincialTourism,
      },
    ],
    municipalOffice: '(042) 5047-001',
    fireStation: '0915-603-1487',
    localResponse: {
      label: 'Municipal disaster response',
      number: '0949-996-7911',
    },
  },
  torrijos: {
    festival: 'Torrijos Festival',
    places: [
      {
        name: 'Poctoy White Beach',
        description:
          'A white-sand beach on Marinduque’s eastern coast with a view of Mount Malindig.',
        source: tourismCaravan,
      },
      {
        name: 'Pulang Lupa Battlefield',
        description:
          'A national historical landmark that marks the September 13, 1900 battle during the Philippine-American War.',
        source:
          'https://philhistoricsites.nhcp.gov.ph/registry_database/ang-labanan-sa-pulang-lupa/',
      },
    ],
    municipalOffice: '0908-608-4894',
    fireStation: '0948-633-1549',
    localResponse: {
      label: 'Municipal disaster response',
      number: '0919-523-7119',
    },
  },
} satisfies Record<string, MunicipalityGuide>;

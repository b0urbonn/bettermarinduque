// Population: PSA 2024 Census (July 1, 2024). Land area: PSA, as listed on
// each town's profile; the six areas sum to the province's 952.58 km².
export const municipalities = [
  {
    slug: 'boac',
    name: 'Boac',
    population: '54,365',
    barangays: 61,
    area: 212.7,
    code: '1704001000',
    mayor: 'Armi Carrion',
    viceMayor: 'Mark Anthony Seño',
    incomeClass: '1st',
    tagline: 'Provincial capital',
    description:
      'The provincial capital and most populous town, home to Boac Cathedral and the National Museum of the Philippines – Marinduque.',
  },
  {
    slug: 'buenavista',
    name: 'Buenavista',
    population: '24,136',
    barangays: 15,
    area: 81.25,
    code: '1704002000',
    mayor: 'Eduard Siena',
    viceMayor: 'David Vitto',
    incomeClass: '4th',
    tagline: 'At the foot of Mount Malindig',
    description:
      'The smallest town, at the foot of Mount Malindig and overlooking the Tablas Strait. Home of Malbog Hot Spring.',
  },
  {
    slug: 'gasan',
    name: 'Gasan',
    population: '35,315',
    barangays: 25,
    area: 100.88,
    code: '1704003000',
    mayor: 'James Marty Lim',
    viceMayor: 'Lidany Baldo',
    incomeClass: '2nd',
    tagline: 'Cultural nerve center',
    description:
      'Home of the kalutang musical tradition and handicrafts, Marinduque Airport, and the gateway to the Tres Reyes Islands.',
  },
  {
    slug: 'mogpog',
    name: 'Mogpog',
    population: '32,577',
    barangays: 37,
    area: 108.06,
    code: '1704004000',
    mayor: 'Senen Livelo Jr.',
    viceMayor: 'Augusto Leo Livelo',
    incomeClass: '2nd',
    tagline: 'Gateway to the Heart of the Philippines',
    description:
      'The main sea gateway through Balanacan Port, home of the original Moriones, and site of Station Balanacan, origin of the Luzon Datum of 1911.',
  },
  {
    slug: 'santa-cruz',
    name: 'Santa Cruz',
    population: '51,594',
    barangays: 55,
    area: 270.77,
    code: '1704005000',
    mayor: 'Marisa Red-Martinez',
    viceMayor: 'Medwin “Bobs” Manuel',
    incomeClass: '1st',
    tagline: 'Largest town by land area',
    description:
      'Marinduque’s largest municipality by land area and a gateway to Maniwaya and Polo islands.',
  },
  {
    slug: 'torrijos',
    name: 'Torrijos',
    population: '28,535',
    barangays: 25,
    area: 178.92,
    code: '1704006000',
    mayor: 'Joey Peñaflor',
    viceMayor: 'Edmar Frias',
    incomeClass: '2nd',
    tagline: 'Summer capital of Marinduque',
    description:
      'An eastern coastal town known for Poctoy White Beach, the Pulang Lupa battlefield, and locally grown strawberries.',
  },
] as const;

export type MunicipalitySlug = (typeof municipalities)[number]['slug'];

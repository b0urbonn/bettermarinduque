export const municipalities = [
  {
    slug: 'boac',
    name: 'Boac',
    population: '54,365',
    barangays: 61,
    code: '1704001000',
    mayor: 'Armi Carrion',
    viceMayor: 'Mark Anthony Seño',
    incomeClass: '1st',
    description: 'The provincial capital and home of the Marinduque Museum.',
  },
  {
    slug: 'buenavista',
    name: 'Buenavista',
    population: '24,136',
    barangays: 15,
    code: '1704002000',
    mayor: 'Eduard Siena',
    viceMayor: 'David Vitto',
    incomeClass: '4th',
    description:
      'A town at the foot of Mount Malindig, overlooking the Tablas Strait.',
  },
  {
    slug: 'gasan',
    name: 'Gasan',
    population: '35,315',
    barangays: 25,
    code: '1704003000',
    mayor: 'James Marty Lim',
    viceMayor: 'Lidany Baldo',
    incomeClass: '2nd',
    description:
      'Home of the kalutang musical tradition and the gateway to the Tres Reyes Islands.',
  },
  {
    slug: 'mogpog',
    name: 'Mogpog',
    population: '32,577',
    barangays: 37,
    code: '1704004000',
    mayor: 'Senen Livelo Jr.',
    viceMayor: 'Augusto Leo Livelo',
    incomeClass: '2nd',
    description:
      'Home to Balanacan Port and Station Balanacan, the origin of the Luzon Datum of 1911.',
  },
  {
    slug: 'santa-cruz',
    name: 'Santa Cruz',
    population: '51,594',
    barangays: 55,
    code: '1704005000',
    mayor: 'Marisa Red-Martinez',
    viceMayor: 'Medwin “Bobs” Manuel',
    incomeClass: '1st',
    description:
      'Marinduque’s largest municipality by land area and a gateway to Maniwaya and Polo islands.',
  },
  {
    slug: 'torrijos',
    name: 'Torrijos',
    population: '28,535',
    barangays: 25,
    code: '1704006000',
    mayor: 'Joey Peñaflor',
    viceMayor: 'Edmar Frias',
    incomeClass: '2nd',
    description:
      'Known for Poctoy White Beach on the eastern coast of Marinduque.',
  },
] as const;

export type MunicipalitySlug = (typeof municipalities)[number]['slug'];

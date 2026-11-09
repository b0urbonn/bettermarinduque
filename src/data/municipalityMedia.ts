import type { MunicipalitySlug } from './municipalities';

interface TownPhoto {
  src: string;
  title: string;
  alt: string;
  author: string;
  sourceUrl: string;
  license?: string;
  licenseUrl?: string;
  year?: number;
  objectPosition?: string;
  contain?: boolean;
}

function commonsPhoto(
  file: string,
  title: string,
  alt: string,
  author: string,
  license: string,
  licenseUrl: string,
  path: string
): TownPhoto {
  const name = encodeURIComponent(file.replaceAll(' ', '_')).replaceAll(
    '%2F',
    '/'
  );
  return {
    src: `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${name}/1280px-${name}`,
    sourceUrl: `https://commons.wikimedia.org/wiki/File:${name}`,
    title,
    alt,
    author,
    license,
    licenseUrl,
  };
}

const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/';
const bySa3 = 'https://creativecommons.org/licenses/by-sa/3.0/';
const by3 = 'https://creativecommons.org/licenses/by/3.0/';
const cc0 = 'https://creativecommons.org/publicdomain/zero/1.0/';

// Landmark photos per municipality. The first entry is also the card and
// page lead photo; the rest rotate behind it on the municipality page.
export const municipalityGalleries: Record<MunicipalitySlug, TownPhoto[]> = {
  boac: [
    commonsPhoto(
      'Boac_Cathedral.jpg',
      'Boac Cathedral',
      'The facade and fortress walls of Boac Cathedral in Boac, Marinduque',
      'ELRLogatoc',
      'CC BY-SA 4.0',
      bySa4,
      'f/f7'
    ),
    commonsPhoto(
      'Boac cathedral, Marinduque.jpg',
      'Boac Cathedral',
      'Boac Cathedral in Boac, Marinduque',
      'Benedict Esber',
      'CC BY-SA 4.0',
      bySa4,
      '3/37'
    ),
    commonsPhoto(
      'Interior of Boac Cathedral, Marinduque.jpg',
      'Boac Cathedral interior',
      'The interior of Boac Cathedral in Boac, Marinduque',
      'Joelaldor',
      'CC BY-SA 4.0',
      bySa4,
      '0/02'
    ),
  ],
  buenavista: [
    commonsPhoto(
      'Malindigsun2.jpg',
      'Mount Malindig',
      'Sunlight over Mount Malindig, the volcanic peak of Buenavista, Marinduque',
      'Lovebus',
      'CC BY 3.0',
      by3,
      'c/cd'
    ),
    commonsPhoto(
      'Mount Malindig from air (Marinduque; 04-22-2024).jpg',
      'Mount Malindig from the air',
      'Mount Malindig seen from the air above Buenavista, Marinduque',
      'Patrickroque01',
      'CC BY-SA 4.0',
      bySa4,
      'e/ec'
    ),
  ],
  gasan: [
    commonsPhoto(
      'San_Jose_Esposo_de_Maria_Parish_Church,_Gasan,_Marinduque.jpg',
      'St. Joseph Parish Church',
      'St. Joseph Parish Church in Gasan, Marinduque',
      'Joelaldor',
      'CC BY 3.0',
      by3,
      'b/b4'
    ),
    commonsPhoto(
      'Gasan Church, Marinduque.jpg',
      'Gasan Church',
      'The church in Gasan, Marinduque',
      'Joelaldor',
      'CC BY-SA 4.0',
      bySa4,
      'e/ea'
    ),
    commonsPhoto(
      'Interior of Gasan Church, Marinduque.jpg',
      'Gasan Church interior',
      'The interior of the church in Gasan, Marinduque',
      'Joelaldor',
      'CC BY-SA 4.0',
      bySa4,
      '7/70'
    ),
    commonsPhoto(
      'WV banner Marinduque Cliffs on Tres Reyes Islands.jpg',
      'Tres Reyes Islands cliffs',
      'Cliffs on the Tres Reyes Islands off the coast of Gasan, Marinduque',
      '(WT-en) Tomauer at English Wikivoyage',
      'CC0 1.0',
      cc0,
      'c/cc'
    ),
  ],
  mogpog: [
    {
      ...commonsPhoto(
        'Ancestral_Houses_in_Mogpog,_Marinduque.jpg',
        'Mogpog heritage streetscape',
        'Ancestral houses along a street in Mogpog, Marinduque',
        'Joelaldor',
        'CC BY-SA 4.0',
        bySa4,
        '7/78'
      ),
      year: 2013,
    },
    commonsPhoto(
      'Balanacan Port in Mogpog, Marinduque.jpg',
      'Balanacan Port',
      'Balanacan Port, the ferry gateway of Mogpog, Marinduque',
      'Totoyba2',
      'CC BY-SA 3.0',
      bySa3,
      '5/53'
    ),
    commonsPhoto(
      'Landmark Statue Of Balanacan Port,Mogpog,Marinduque..JPG',
      'Balanacan Port statue',
      'The statue landmark at Balanacan Port in Mogpog, Marinduque',
      'Totoyba2',
      'CC BY-SA 3.0',
      bySa3,
      'f/f8'
    ),
  ],
  'santa-cruz': [
    commonsPhoto(
      'Maniwaya_Island_Shore.jpg',
      'Maniwaya Island',
      'The shoreline of Maniwaya Island off the coast of Santa Cruz, Marinduque',
      'Totoyba2',
      'CC BY-SA 4.0',
      bySa4,
      '1/14'
    ),
    commonsPhoto(
      "Wawie's_Beach_Resort.jpg",
      "Wawie's Beach Resort",
      "Wawie's Beach Resort on Maniwaya Island, Santa Cruz, Marinduque",
      'Totoyba2',
      'CC BY-SA 4.0',
      bySa4,
      '0/0b'
    ),
    commonsPhoto(
      'Maniwaya_Pier.jpg',
      'Maniwaya Pier',
      'Fishing boats at the pier on Maniwaya Island, Santa Cruz, Marinduque',
      'Totoyba2',
      'CC BY-SA 4.0',
      bySa4,
      '6/65'
    ),
    commonsPhoto(
      'Holy_Cross_Parish_of_Santa_Cruz,_Marinduque.jpg',
      'Holy Cross Parish of Santa Cruz',
      'The facade of Holy Cross Parish church in Santa Cruz, Marinduque',
      'Benedict Esber',
      'CC BY-SA 4.0',
      bySa4,
      '2/2e'
    ),
  ],
  // "Poctoy_Pier_2014.jpg" on Commons is Poctoy Pier in Odiongan, Romblon
  // (Category:Poctoy Pier (Odiongan, Romblon)), not Torrijos. Do not use it.
  // The Municipality of Torrijos tourism site blocks hotlinking
  // (Cross-Origin-Resource-Policy: same-origin), so its White Beach photo
  // cannot be embedded; use the licensed Commons photo instead.
  torrijos: [
    commonsPhoto(
      'Boac - Mogpog - Santa Cruz - Torrijos Rd, Torrijos, Marinduque, Philippines - panoramio.jpg',
      'Torrijos coastal road',
      'A view along the Boac–Torrijos road in Torrijos, Marinduque',
      'Mozhar',
      'CC BY-SA 3.0',
      bySa3,
      '9/9d'
    ),
    commonsPhoto(
      'Ang_Labanan_sa_Pulang_Lupa_historical_marker.jpg',
      'Pulang Lupa historical marker',
      'The national historical marker at the Pulang Lupa battlefield in Torrijos, Marinduque',
      'Josh Lim (Sky Harbor)',
      'CC BY-SA 4.0',
      bySa4,
      '8/8a'
    ),
  ],
};

export const municipalityPhotos: Record<MunicipalitySlug, TownPhoto> = {
  boac: municipalityGalleries.boac[0],
  buenavista: municipalityGalleries.buenavista[0],
  gasan: municipalityGalleries.gasan[0],
  mogpog: municipalityGalleries.mogpog[0],
  'santa-cruz': municipalityGalleries['santa-cruz'][0],
  torrijos: municipalityGalleries.torrijos[0],
};

interface MunicipalWebsite {
  url: string;
  label: string;
  sourceUrl: string;
  note?: string;
}

// Checked against the cited government source or municipality's own site.
// Do not substitute same-name municipalities in other provinces.
export const municipalWebsites: Partial<
  Record<MunicipalitySlug, MunicipalWebsite>
> = {
  boac: {
    url: 'https://www.boac.gov.ph/',
    label: 'Municipal website',
    sourceUrl:
      'https://www.dbm.gov.ph/wp-content/uploads/DBM%20Publications/Directory2014/Local%20Govt/LGU.pdf',
    note: 'Government-listed website; it did not respond during our link check.',
  },
  mogpog: {
    url: 'https://mogpog.gov.ph/',
    label: 'Municipal website',
    sourceUrl: 'https://mogpog.gov.ph/',
  },
  torrijos: {
    url: 'https://hamossatorrijos.gov.ph/',
    label: 'Municipal tourism website',
    sourceUrl:
      'https://hamossatorrijos.gov.ph/wp-content/uploads/2023/06/CITIZENS-CHARTER-2022-1ST-EDITION-FULL.pdf',
    note: 'Tourism, Culture, and Arts Unit website. Availability may vary.',
  },
};

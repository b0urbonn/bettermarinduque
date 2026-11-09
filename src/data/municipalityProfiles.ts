import type { MunicipalitySlug } from './municipalities';

interface MunicipalityProfile {
  introduction: string[];
  highlights: string[];
  boardDistrict: '1st' | '2nd';
  access: string;
  visitorNote: string;
  municipalHall?: string;
}

// Town-specific information drawn from docs/marinduque-facts.md.
export const municipalityProfiles: Record<
  MunicipalitySlug,
  MunicipalityProfile
> = {
  boac: {
    introduction: [
      'Boac is the provincial capital and a center of government, commerce, and education in Marinduque. It is where residents find the Provincial Capitol as well as the municipal government, alongside the town’s commercial and educational institutions, including the main campus of Marinduque State University in Barangay Tanza. The town’s name is often traced to biak (“divided”), as the Boac River splits the town.',
      'Its heritage landmarks include Boac Cathedral and the National Museum of the Philippines – Marinduque in Barangay Malusak. The museum introduces visitors to the island’s cultural traditions, maritime history, and natural heritage. Boac is also associated with the Bila-bila Festival and the Moriones Lenten Rites.',
    ],
    highlights: [
      'Provincial capital',
      'Museum and heritage',
      'Bila-bila Festival',
    ],
    boardDistrict: '1st',
    municipalHall: 'Barangay Tampus, Boac',
    access:
      'Boac has a seaport at Cawit. Marinduque Airport is in Barangay Masiga in neighboring Gasan, while Balanacan Port is in Mogpog. Confirm operating routes and onward transport with the relevant operator before traveling.',
    visitorNote:
      'For a government transaction, check whether the responsible office is municipal or provincial. Boac Municipal Hall and the Provincial Capitol serve different functions; the Capitol is in Barangay Santol.',
  },
  buenavista: {
    introduction: [
      'Buenavista, the smallest of Marinduque’s six towns, lies at the foot of Mount Malindig, overlooking the Tablas Strait. Its name means “good view,” reflecting the southern town’s setting between the mountain and the sea.',
      'The town is associated with Malbog Hot Spring and the Tubaan Festival. Mount Malindig, a potentially active stratovolcano, is Marinduque’s highest point at 1,157 meters, while the sulfur hot spring in Barangay Malbog is a notable feature of the area’s volcanic landscape.',
    ],
    highlights: ['Mount Malindig', 'Malbog Hot Spring', 'Tubaan Festival'],
    boardDistrict: '2nd',
    access:
      'Use Buenavista as the town reference when asking for directions to Malbog Hot Spring or the Mount Malindig area. Check local access arrangements with the municipal office or the site concerned before setting out.',
    visitorNote:
      'For a mountain or hot-spring visit, ask about current access, weather conditions, guide arrangements, and any applicable fees. These can change and are not fixed by this guide.',
  },
  gasan: {
    introduction: [
      'Often called the cultural nerve center of Marinduque, Gasan is closely associated with the kalutang musical tradition and local handicrafts. The kalutang uses paired wooden percussion instruments and is an important part of the town’s cultural identity.',
      'The town faces the Tres Reyes Islands, which are part of Barangay Pinggan. St. Joseph Parish Church overlooks the town, and the Gasang-gasang Festival is one of its local celebrations. Marinduque Airport is in Barangay Masiga in Gasan.',
    ],
    highlights: [
      'Kalutang tradition',
      'Tres Reyes Islands',
      'Gasang-gasang Festival',
    ],
    boardDistrict: '1st',
    access:
      'Marinduque Airport is located in Barangay Masiga but has no scheduled commercial flights as of 2026 — most visitors arrive by ferry. For the Tres Reyes Islands, ask locally about boat arrangements and weather before planning a crossing.',
    visitorNote:
      'Ask permission before photographing performers or cultural activities at close range. For island trips, confirm the return arrangement and current sea conditions with the boat operator.',
  },
  mogpog: {
    introduction: [
      'Mogpog is an important gateway to Marinduque through Balanacan Port. The port connects the island with Dalahican in Lucena, making the town a familiar arrival point for visitors traveling by sea.',
      'Mogpog is known as the home of the original Moriones, with local accounts tracing the tradition to 1807. It is also home to Station Balanacan on Mount Mataas in Barangay Hinanggayon, which marks the origin of the Luzon Datum of 1911, a reference used for Philippine mapping and surveys. The Kangga Festival and the Tarug Caves are among its other attractions.',
    ],
    highlights: [
      'Balanacan Port',
      'Original Moriones',
      'Luzon Datum of 1911',
      'Kangga Festival',
    ],
    boardDistrict: '1st',
    access:
      'Balanacan Port serves the sea connection with Dalahican Port in Lucena. Sailing times, fares, and service availability should be confirmed with the shipping operator. Arrange onward transport separately from the port.',
    visitorNote:
      'Station Balanacan is on Mount Mataas, rather than at the ferry terminal itself. Ask for current directions and local access arrangements before visiting the survey marker.',
  },
  'santa-cruz': {
    introduction: [
      'Santa Cruz is Marinduque’s largest municipality by land area and its second most populous town in the 2024 census. It serves as a gateway to the northeastern islands, including Maniwaya and Polo.',
      'The municipality’s visitor destinations include Maniwaya Island, Kawa-Kawa Falls, and Bathala Cave in Barangay Ipil. Its local celebration includes the Seafood Festival, reflecting a strong connection with the coast and the surrounding waters.',
    ],
    highlights: [
      'Maniwaya and Polo islands',
      'Caves and waterfalls',
      'Seafood Festival',
    ],
    boardDistrict: '2nd',
    access:
      'Buyabod is one of Marinduque’s three major seaports, and a boat link connects Santa Cruz with General Luna, Quezon, via Maniwaya Island. For visits to Maniwaya or other nearby islands, confirm the departure point, boat availability, return trip, and weather with the operator before traveling.',
    visitorNote:
      'Island, cave, and waterfall visits may require different local arrangements. Ask about guides, site access, and any current restrictions with the tourism office or the site concerned.',
  },
  torrijos: {
    introduction: [
      'Often called Marinduque’s summer capital, Torrijos lies on the eastern coast and is known for Poctoy White Beach, with views toward Mount Malindig. The town is also known for locally grown strawberries.',
      'Pulang Lupa Battlefield commemorates the September 13, 1900 battle during the Philippine-American War. Torrijos also has a Marinduque State University campus in Poctoy associated with agriculture, and celebrates the Torrijos Festival.',
    ],
    highlights: [
      'Poctoy White Beach',
      'Pulang Lupa Battlefield',
      'Torrijos Festival',
    ],
    boardDistrict: '2nd',
    municipalHall:
      'Municipal Government Center, Rizal Street, Barangay Poblacion, Torrijos',
    access:
      'Use the specific destination when arranging transport: Poctoy White Beach, Pulang Lupa Battlefield, and the municipal government center are separate places. Confirm directions and local transport with the municipal office or your destination.',
    visitorNote:
      'Check current site opening arrangements and any entrance fees before visiting. For the battlefield, treat the area as a historical memorial and follow local guidance.',
  },
};

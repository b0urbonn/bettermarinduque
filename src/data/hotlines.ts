// Province-wide emergency lines and public hospitals. Numbers come from public
// directories and the offices' own posts (checked November 2026); see
// docs/marinduque-facts.md. Always show them with a "verify" note.

export interface Hotline {
  name: string;
  description: string;
  number: string;
  tone: 'urgent' | 'default';
}

export const provincialHotlines: Hotline[] = [
  {
    name: 'National Emergency Hotline',
    description: 'Police, fire, and medical emergencies, nationwide',
    number: '911',
    tone: 'urgent',
  },
  {
    name: 'Philippine Red Cross',
    description: 'National hotline for ambulance and emergency help',
    number: '143',
    tone: 'urgent',
  },
  {
    name: 'Marinduque PDRRMO',
    description: 'Provincial disaster response and rescue, Capitol, Boac',
    number: '0968-226-5727',
    tone: 'default',
  },
  {
    name: 'Red Cross Marinduque Chapter',
    description: 'Local chapter for blood services and relief',
    number: '0917-826-1395',
    tone: 'default',
  },
];

export interface Hospital {
  name: string;
  location: string;
  description: string;
  number?: string;
}

// The province has three government-owned hospitals (provincial
// socio-economic profile).
export const publicHospitals: Hospital[] = [
  {
    name: 'Dr. Damian Reyes Provincial Hospital',
    location: 'Brgy. Santol, Boac',
    description:
      'Level 1 general hospital near the Provincial Capitol, PhilHealth-accredited. For emergencies, go straight to the emergency room.',
  },
  {
    name: 'Santa Cruz District Hospital',
    location: 'Santa Cruz',
    description: 'Government district hospital in Santa Cruz.',
    number: '(042) 754-4306',
  },
  {
    name: 'Torrijos Municipal Hospital',
    location: 'Torrijos',
    description: 'Government municipal hospital in Torrijos.',
    number: '(042) 753-0322',
  },
];

export function telHref(number: string) {
  const digits = number.replace(/\D/g, '');
  return `tel:${digits.length > 4 ? digits.replace(/^0/, '+63') : digits}`;
}

export interface NewsItem {
  badge: 'announcement' | 'project' | 'advisory';
  date: string;
  title: string;
  description: string;
  to: string;
}

export const newsItems: NewsItem[] = [
  {
    badge: 'project',
    date: 'Nov 2025',
    title: 'Municipalities directory expands',
    description:
      'Per-town pages now cover population, barangays, officials, and photo galleries for all six municipalities of the province.',
    to: '/municipalities',
  },
  {
    badge: 'announcement',
    date: 'Ongoing',
    title: 'Transparency trackers updated',
    description:
      'Follow the Marcopper settlement fund, circumferential road projects, the provincial disaster fund, and flood-control allocations — every figure cited to its source document.',
    to: '/transparency',
  },
  {
    badge: 'advisory',
    date: 'Ongoing',
    title: 'Service guides being compiled',
    description:
      'Plain-language guides to permits, health programs, scholarships, and disaster preparedness are being gathered. Help complete them by suggesting sources.',
    to: '/services',
  },
];

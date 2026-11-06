export interface HotlineItem {
  label: string;
  number: string;
  tel: string;
  icon: 'emergency' | 'disaster' | 'medical';
}

// Numbers verified against the provincial emergency directory:
// https://marinduque.gov.ph/emergency-contacts/
export const hotlineBarItems: HotlineItem[] = [
  { label: 'Emergency', number: '911', tel: '911', icon: 'emergency' },
  {
    label: 'PDRRMO',
    number: '0968 226 5727',
    tel: '09682265727',
    icon: 'disaster',
  },
  {
    label: 'Red Cross Marinduque',
    number: '0917 826 1395',
    tel: '09178261395',
    icon: 'medical',
  },
];

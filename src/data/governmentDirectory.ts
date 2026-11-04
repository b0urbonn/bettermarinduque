import { load } from 'js-yaml';
import boardIndex from '../../content/government/departments/legislative/index.yaml?raw';
import { provincialWebsite } from './province';

export const governmentPaths = {
  overview: '/government',
  offices: '/government/departments',
  executive: '/government/departments/executive',
  legislative: '/government/departments/legislative',
} as const;

export const officeDirectory = provincialWebsite + '/contact-us/';
export const localGovernmentCode =
  'https://lawphil.net/statutes/repacts/ra1991/ra_7160_1991.html';

export const provincialOffices: readonly {
  key: string;
  email: string;
  phone?: string;
}[] = [
  {
    key: 'governor',
    phone: '(042) 704-0144',
    email: 'govmelgo.marinduque@gmail.com',
  },
  { key: 'health', phone: '0951-522-8088', email: 'phomarinduque@gmail.com' },
  {
    key: 'welfare',
    phone: '0917-888-2538',
    email: 'pswdomarinduque3@gmail.com',
  },
  {
    key: 'engineering',
    phone: '0977-839-3110',
    email: 'peomarinduque@gmail.com',
  },
  { key: 'employment', phone: '0929-103-0915', email: 'lmdpeso@yahoo.com' },
  {
    key: 'veterinary',
    phone: '0939-910-0115',
    email: 'marinduquepvet@gmail.com',
  },
  { key: 'planning', email: 'marinduqueppdo25@gmail.com' },
  { key: 'treasury', phone: '0917-109-6097', email: 'ptomarinduque@yahoo.com' },
  {
    key: 'assessment',
    phone: '0956-763-4205',
    email: 'provincialassessor.marinduque@gmail.com',
  },
  { key: 'agriculture', phone: '(042) 332-1256', email: 'agriduque@yahoo.com' },
  { key: 'tourism', email: 'tourism.marinduque@gmail.com' },
  {
    key: 'environment',
    phone: '0906-479-3751',
    email: 'marinduque_enro@yahoo.com',
  },
];

export const provincialBoard = load(boardIndex) as {
  pages: {
    name: string;
    group: 'presiding' | 'district1' | 'district2' | 'exOfficio';
    description: string;
  }[];
};

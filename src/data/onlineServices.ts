import { citizenCharter, provincialWebsite } from './province';

export interface OnlineService {
  name: string;
  description: string;
  url: string;
}

/** Official provincial government sites and portals. */
export const provincialServices: OnlineService[] = [
  {
    name: 'Province of Marinduque',
    description:
      'Official provincial website — announcements, programs, and office pages.',
    url: provincialWebsite,
  },
  {
    name: 'Provincial office directory',
    description: 'Phone numbers and email addresses for provincial offices.',
    url: provincialWebsite + '/contact-us/',
  },
  {
    name: 'Provincial Citizen’s Charter',
    description:
      'Published steps, requirements, and fees for provincial services.',
    url: citizenCharter,
  },
  {
    name: 'Provincial annual reports',
    description: 'Yearly accomplishment and financial reports of the province.',
    url: provincialWebsite + '/provincial-annual-report/',
  },
];

/** National agency portals residents commonly transact with. */
export const nationalServices: OnlineService[] = [
  {
    name: 'eGov PH Super App',
    description:
      'The official government app — digital IDs, records, and services in one place.',
    url: 'https://egov.gov.ph',
  },
  {
    name: 'PSA Civil Registration (Serbilis)',
    description:
      'Order birth, marriage, and death certificates or a CENOMAR for delivery.',
    url: 'https://psaserbilis.com.ph',
  },
  {
    name: 'NBI Clearance',
    description: 'Apply for or renew an NBI clearance online.',
    url: 'https://clearance.nbi.gov.ph',
  },
  {
    name: 'DFA Passport Appointment',
    description: 'Book a passport application or renewal appointment.',
    url: 'https://www.passport.gov.ph',
  },
  {
    name: 'LTO LTMS Portal',
    description:
      'Driver’s license and motor vehicle registration transactions.',
    url: 'https://portal.lto.gov.ph',
  },
  {
    name: 'PRC LERIS',
    description:
      'Professional license applications, renewals, and exam results.',
    url: 'https://online.prc.gov.ph',
  },
  {
    name: 'DTI Business Name Registration',
    description: 'Register or renew a business name for your enterprise.',
    url: 'https://bnrs.dti.gov.ph',
  },
  {
    name: 'My.SSS',
    description:
      'Social Security System member portal — contributions, loans, and claims.',
    url: 'https://www.sss.gov.ph',
  },
  {
    name: 'Virtual Pag-IBIG',
    description: 'Pag-IBIG contributions, loans, and member records online.',
    url: 'https://www.pagibigfundservices.com/virtualpagibig/',
  },
  {
    name: 'PhilHealth',
    description:
      'Member portal, contribution records, and benefit information.',
    url: 'https://www.philhealth.gov.ph',
  },
];

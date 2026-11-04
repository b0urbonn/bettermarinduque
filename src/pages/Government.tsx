import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import GovernmentBoard from '../components/government/GovernmentBoard';
import GovernmentExecutive from '../components/government/GovernmentExecutive';
import GovernmentOffices from '../components/government/GovernmentOffices';
import GovernmentOverview from '../components/government/GovernmentOverview';
import GovernmentPage from '../components/government/GovernmentPage';
import { governmentPaths } from '../data/governmentDirectory';

export default function Government() {
  const { category, documentSlug } = useParams();
  const { t } = useTranslation();

  if (!category) return <GovernmentOverview />;

  if (category === 'departments') {
    if (!documentSlug) return <GovernmentOffices />;
    if (documentSlug === 'executive') return <GovernmentExecutive />;
    if (documentSlug === 'legislative') return <GovernmentBoard />;
  }

  return (
    <GovernmentPage
      title={t('government.unavailableTitle')}
      description={t('government.unavailableDescription')}
    >
      <div className="portal-container py-8">
        <Link
          to={governmentPaths.overview}
          className="portal-link inline-flex min-h-11 items-center gap-2 font-semibold"
        >
          {t('government.backToGovernment')}{' '}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </GovernmentPage>
  );
}

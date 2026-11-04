import { Link, Navigate, useLocation, useParams } from 'react-router';
import { serviceCategories } from '../data/yamlLoader';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';

export default function Services() {
  const { category } = useParams();
  const { search } = useLocation();

  if (category) {
    if (serviceCategories.categories.some(item => item.slug === category)) {
      const params = new URLSearchParams(search);
      params.set('category', category);
      return (
        <Navigate
          replace
          to={{ pathname: '/services', search: params.toString() }}
        />
      );
    }

    return (
      <div className="portal-container py-8">
        <SEO title="Service category unavailable" />
        <h1 className="text-3xl font-bold">Service category unavailable</h1>
        <Link
          to="/services"
          className="portal-link mt-3 inline-flex min-h-11 items-center"
        >
          Browse service guides
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Services"
        description="Browse Marinduque service guides by topic and find links to the provincial Citizen’s Charter and office directory."
      />
      <ServicesSection />
    </>
  );
}

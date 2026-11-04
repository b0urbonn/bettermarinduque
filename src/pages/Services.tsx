import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import PageHeader from '../components/ui/PageHeader';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Services: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return serviceCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description="All provincial services of Marinduque. Find what you need for business, health, social welfare, and more."
          keywords="Marinduque services, government services, public services, provincial government"
        />
        <ServicesSection
          title="All provincial services"
          description="All services provided by the Province of Marinduque. Find what you need for business, health, social welfare, and more."
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, Marinduque, government services, public services`}
      />
      <PageHeader
        title={categoryData.category || category}
        description={categoryData.description}
      >
        {Icon && (
          <span className="inline-flex rounded-full bg-white border border-primary-100 p-3 text-primary-600 mb-4">
            <Icon className="h-8 w-8" aria-hidden="true" />
          </span>
        )}
      </PageHeader>
      <Section className="py-10 mb-12">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading services...</Text>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading level={3}>{categoryIndex.title}</Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 mb-4">
                {categoryIndex.description}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                    className="group rounded-xl bg-white border border-gray-200 border-t-4 border-t-accent-400 p-5 transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                      {subcategory.name}
                    </h4>
                    {subcategory.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {subcategory.description}
                      </p>
                    )}
                    <span className="inline-block px-2 py-1 mt-3 text-xs font-medium rounded-sm bg-primary-50 text-primary-700">
                      {categoryData.category || category}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                    className="group block rounded-xl bg-white border border-gray-200 border-l-4 border-l-accent-400 p-5 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                      {subcategory.name}
                    </h4>
                    {subcategory.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {subcategory.description}
                      </p>
                    )}
                    <span className="inline-block px-2 py-1 mt-3 text-xs font-medium rounded-sm bg-primary-50 text-primary-700">
                      {categoryData.category || category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default Services;

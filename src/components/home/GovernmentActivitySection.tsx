import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from 'react-router';

import { governmentCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
}

export default function GovernmentActivitySection({
  title,
  description,
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? (
      <IconComponent className="h-6 w-6" aria-hidden="true" />
    ) : null;
  };

  const displayedCategories = governmentCategories.categories as Category[];

  return (
    <Section id="government">
      <Heading level={2}>{title || t('governmentActivity.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('governmentActivity.description')}
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Link
            key={category.slug}
            to={`/government/${category.slug}`}
            className="group rounded-xl bg-white border border-gray-200 border-t-4 border-t-accent-400 p-6 flex flex-col h-full transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <div className="rounded-full bg-primary-50 p-3 text-primary-600 self-start mb-4">
              {getIcon(category.icon)}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">
              {category.category}
            </h3>
            <Text className="text-gray-600 text-sm line-clamp-3 mb-4">
              {category.description}
            </Text>
            <span className="mt-auto text-primary-700 font-medium text-sm inline-flex items-center">
              Explore
              <span className="ml-1" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

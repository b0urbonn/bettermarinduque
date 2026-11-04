import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Heading } from './Heading';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbItems,
  children,
}) => {
  return (
    <div className="bg-primary-50 border-b border-primary-100">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        {children}
        <Heading level={1} className="mb-2">
          {title}
        </Heading>
        {description && (
          <p className="text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

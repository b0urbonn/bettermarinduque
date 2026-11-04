import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Heading } from './Heading';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  children?: React.ReactNode;
  illustration?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbItems,
  children,
  illustration,
}) => {
  return (
    <div className="bg-white border-b border-gray-300">
      <div className="portal-container py-8 motion-safe:animate-fade-in md:py-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        {children}
        <div
          className={
            illustration
              ? 'flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap sm:items-center sm:gap-8'
              : undefined
          }
        >
          <div className="min-w-0 flex-[1_1_12rem]">
            <Heading level={1} className="mb-2 leading-tight tracking-tight">
              {title}
            </Heading>
            {description && (
              <p className="text-gray-700 max-w-3xl">{description}</p>
            )}
          </div>
          {illustration && <div className="shrink-0">{illustration}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

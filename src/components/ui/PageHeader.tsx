import React from 'react';
import MarinduqueMap from '../brand/MarinduqueMap';
import Breadcrumbs from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  children?: React.ReactNode;
  actions?: React.ReactNode;
  illustration?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  eyebrow,
  breadcrumbItems,
  children,
  actions,
  illustration,
}) => {
  return (
    <div className="hero-surface relative isolate overflow-hidden">
      <MarinduqueMap className="pointer-events-none absolute -top-24 -right-20 -z-10 size-[26rem] text-white/[0.06] sm:size-[34rem]" />
      <div className="portal-container py-9 motion-safe:animate-fade-in md:py-12">
        <Breadcrumbs items={breadcrumbItems} tone="dark" className="mb-5" />
        {children}
        <div className="flex flex-wrap items-center justify-between gap-6 sm:flex-nowrap sm:gap-10">
          <div className="min-w-0 flex-[1_1_14rem]">
            {eyebrow && (
              <p className="eyebrow mb-3 text-accent-300">{eyebrow}</p>
            )}
            <h1 className="max-w-4xl font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-extrabold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                {description}
              </p>
            )}
            {actions && (
              <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
          {illustration && (
            <div className="hidden shrink-0 drop-shadow-[0_20px_30px_rgb(0_0_0/0.25)] sm:block">
              {illustration}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

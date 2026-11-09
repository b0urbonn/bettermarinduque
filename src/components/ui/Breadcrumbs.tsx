import React from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  tone?: 'light' | 'dark';
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  tone = 'light',
}) => {
  const location = useLocation();
  const dark = tone === 'dark';

  // Generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm',
          dark ? 'text-white/70' : 'text-gray-600'
        )}
      >
        {breadcrumbItems.map((item, index) => {
          const label =
            item.label.charAt(0).toUpperCase() + item.label.slice(1);
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    'size-3.5',
                    dark ? 'text-white/40' : 'text-gray-400'
                  )}
                />
              )}
              {item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-sm transition-colors duration-150',
                    dark
                      ? 'hover:text-white focus-visible:outline-white'
                      : 'hover:text-primary-700'
                  )}
                >
                  {index === 0 && (
                    <Home className="size-3.5" aria-hidden="true" />
                  )}
                  {label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'font-semibold',
                    dark ? 'text-white' : 'text-gray-900'
                  )}
                  aria-current="page"
                >
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

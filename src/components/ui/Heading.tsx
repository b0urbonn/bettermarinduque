import React from 'react';
import { cn } from '../../lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const headingStyles = {
  1: 'text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight',
  2: 'text-2xl sm:text-3xl font-extrabold mb-5 leading-tight tracking-tight',
  3: 'text-xl sm:text-2xl font-bold mb-4 leading-snug tracking-tight',
  4: 'text-lg sm:text-xl font-bold mb-3 leading-snug',
  5: 'text-base sm:text-lg font-bold mb-3 leading-snug',
  6: 'text-sm sm:text-base font-bold mb-2 leading-snug',
};

export function Heading({ level = 1, children, className }: HeadingProps) {
  const baseClasses = cn(
    headingStyles[level],
    'font-display',
    level <= 2 && 'text-gray-900'
  );
  const combinedClasses = cn(baseClasses, className);

  const HeadingTag = `h${level}`;

  return React.createElement(
    HeadingTag,
    { className: combinedClasses },
    children
  );
}

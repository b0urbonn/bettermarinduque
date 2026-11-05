import React from 'react';
import { cn } from '../../lib/utils';

// Shades chosen to stay legible on light backgrounds and on primary-800/900.
const Wordmark: React.FC<{
  className?: string;
  variant?: 'default' | 'dark';
}> = ({ className, variant = 'default' }) => {
  const dark = variant === 'dark';
  return (
    <span className={cn('font-display font-bold', className)}>
      <span className={dark ? 'text-white' : 'text-secondary-400'}>Better</span>
      <span className={dark ? 'text-accent-200' : 'text-accent-600'}>
        Marinduque
      </span>
    </span>
  );
};

export default Wordmark;

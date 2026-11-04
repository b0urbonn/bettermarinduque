import React from 'react';
import { cn } from '../../lib/utils';

// Shades chosen to stay legible on both white and primary-900 backgrounds.
const Wordmark: React.FC<{ className?: string }> = ({ className }) => (
  <span className={cn('font-display font-bold', className)}>
    <span className="text-secondary-400">Better</span>
    <span className="text-accent-600">Marinduque</span>
  </span>
);

export default Wordmark;

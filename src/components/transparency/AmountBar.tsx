import { useLayoutEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import './transparencyMotion.css';

export default function AmountBar({
  amount,
  maximum,
  className,
  fillClassName,
}: {
  amount: number;
  maximum: number;
  className?: string;
  fillClassName?: string;
}) {
  const width = maximum > 0 ? (amount / maximum) * 100 : 0;
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = track.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    element.dataset.revealed = 'false';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;

      element.dataset.revealed = 'true';
      observer.disconnect();
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={track}
      aria-hidden="true"
      className={cn(
        'transparency-amount-bar h-2 overflow-hidden rounded-full bg-gray-200',
        className
      )}
    >
      <div
        className={cn('h-full rounded-full bg-primary-700', fillClassName)}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

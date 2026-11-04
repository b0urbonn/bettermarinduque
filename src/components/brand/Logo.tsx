import { useId } from 'react';
import logoPng from '../../assets/brand/bettermarinduque-logo.png';
import logoWebp from '../../assets/brand/bettermarinduque-logo.webp';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'light';
}

export default function Logo({ className, variant = 'color' }: LogoProps) {
  const filterId = useId();
  const light = variant === 'light';

  return (
    <>
      <svg aria-hidden="true" className="absolute size-0">
        <filter id={filterId} colorInterpolationFilters="sRGB">
          {/* Use the artwork's luminance to blend between two theme colors. */}
          <feColorMatrix
            in="SourceGraphic"
            type="luminanceToAlpha"
            result="luminance"
          />
          <feFlood
            floodColor={
              light ? 'var(--color-primary-500)' : 'var(--color-primary-900)'
            }
            result="shadow"
          />
          <feFlood
            floodColor={
              light ? 'var(--color-primary-50)' : 'var(--color-primary-300)'
            }
          />
          <feComposite in2="luminance" operator="in" />
          <feComposite in2="shadow" operator="over" />
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </svg>
      <picture className="shrink-0">
        <source srcSet={logoWebp} type="image/webp" />
        <img
          src={logoPng}
          alt="BetterMarinduque logo"
          width={800}
          height={579}
          className={className}
          style={{ filter: `url("#${filterId}")` }}
        />
      </picture>
    </>
  );
}

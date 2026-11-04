import React from 'react';
import logoPng from '../../assets/brand/bettermarinduque-logo.png';
import logoWebp from '../../assets/brand/bettermarinduque-logo.webp';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'light';
}

function LogoImage({ className }: { className?: string }) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt="BetterMarinduque logo"
        width={800}
        height={579}
        className={className}
      />
    </picture>
  );
}

const Logo: React.FC<LogoProps> = ({ className, variant = 'color' }) => {
  // On dark backgrounds the dark parts of the mark disappear — put it on a
  // light badge instead.
  if (variant === 'light') {
    return (
      <span className="inline-flex shrink-0 items-center rounded-xl bg-white p-1.5">
        <LogoImage className={className} />
      </span>
    );
  }

  return <LogoImage className={className} />;
};

export default Logo;

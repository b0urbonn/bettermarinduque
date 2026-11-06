import logoPng from '../../assets/brand/bettermarinduque-emblem-v2.png';
import logoWebp from '../../assets/brand/bettermarinduque-emblem-v2.webp';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'light';
}

export default function Logo({ className, variant = 'color' }: LogoProps) {
  return (
    <picture
      className={`inline-flex shrink-0 ${variant === 'light' ? 'rounded-md bg-white p-1' : ''}`}
    >
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt="BetterMarinduque: Marinduque island with a white Morion and gold Philippine sun"
        width={800}
        height={800}
        className={className}
      />
    </picture>
  );
}

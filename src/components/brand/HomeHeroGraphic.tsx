import MarinduqueMap from './MarinduqueMap';

export default function HomeHeroGraphic() {
  return (
    <div
      aria-hidden="true"
      data-page-graphic="home"
      className="mx-auto aspect-square w-full max-w-72 select-none motion-safe:animate-fade-in md:max-w-92"
    >
      <MarinduqueMap className="size-full text-primary-100" />
    </div>
  );
}

import { ClipboardCheck, HeartPulse, Landmark, MapPin } from 'lucide-react';
import MarinduqueMap from './MarinduqueMap';
import './civicMotion.css';

const tiles = [
  {
    Icon: ClipboardCheck,
    position: 'top-[9%] right-[7%]',
    delay: 'civic-graphic-delay-1',
  },
  {
    Icon: HeartPulse,
    position: 'top-[42%] left-[5%]',
    delay: 'civic-graphic-delay-2',
  },
  {
    Icon: Landmark,
    position: 'right-[9%] bottom-[10%]',
    delay: 'civic-graphic-delay-2',
  },
];

export default function HomeHeroGraphic() {
  return (
    <div
      aria-hidden="true"
      data-page-graphic="home"
      className="relative mx-auto aspect-[4/3] w-full max-w-72 select-none md:max-w-92"
    >
      <div className="absolute inset-x-[13%] inset-y-[5%] rounded-full border border-primary-300/35" />
      <div className="absolute inset-x-[19%] inset-y-[12%] rounded-full border border-primary-300/35 bg-primary-900/50" />
      <div className="civic-graphic-rise absolute inset-x-[24%] inset-y-[14%]">
        <MarinduqueMap className="size-full text-primary-200" />
      </div>
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 size-full"
        focusable="false"
      >
        <path
          d="M69 111h31l30 21m117-88h-31l-29 24m59 130h-27l-35-36"
          pathLength="1"
          className="civic-graphic-trace fill-none stroke-primary-200/65"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="civic-graphic-rise civic-graphic-delay-1 absolute top-[46%] left-[43%] grid size-9 place-items-center rounded-full border border-accent-300 bg-accent-200 text-primary-900 sm:size-11">
        <MapPin size={21} />
      </span>
      {tiles.map(({ Icon, position, delay }) => (
        <span
          key={position}
          className={`civic-graphic-rise ${delay} ${position} absolute grid size-11 place-items-center rounded-xl border border-primary-200 bg-white text-primary-800 shadow-md sm:size-13`}
        >
          <Icon size={23} strokeWidth={1.8} />
        </span>
      ))}
    </div>
  );
}

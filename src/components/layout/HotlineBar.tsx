import { Flame, HeartPulse, Phone, Siren } from 'lucide-react';
import { hotlineBarItems, type HotlineItem } from '../../data/hotlines';

const icons = {
  emergency: Phone,
  disaster: Siren,
  medical: HeartPulse,
};

function HotlineLink({
  label,
  number,
  tel,
  icon,
  duplicate = false,
}: HotlineItem & { duplicate?: boolean }) {
  const Icon = icons[icon];
  return (
    <a
      href={`tel:${tel}`}
      aria-label={`${label}, ${number}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[0.75rem] text-white transition hover:-translate-y-px hover:bg-white/30 hover:text-white hover:no-underline sm:text-[0.8125rem]"
    >
      <Icon size={12} aria-hidden="true" />
      <span>
        {label}: {number}
      </span>
    </a>
  );
}

export default function HotlineBar() {
  return (
    <div className="bg-gradient-to-br from-[#ff0000] to-[#cc0000] py-2 text-[0.8125rem] text-white max-lg:py-0">
      <div className="portal-container max-lg:max-w-none max-lg:px-0">
        <div className="flex items-center gap-4 max-lg:flex-nowrap max-lg:justify-start">
          <span className="flex items-center gap-1.5 font-semibold whitespace-nowrap max-lg:hidden">
            <Flame size={14} aria-hidden="true" />
            Emergency hotlines
          </span>
          {/* Desktop: static list. Tablet/mobile: duplicated track scrolls. */}
          <div className="flex items-center gap-2 overflow-hidden max-lg:w-full">
            <div className="flex items-center gap-2 py-0 max-lg:w-max max-lg:animate-hotline-scroll max-lg:gap-4 max-lg:py-2 max-lg:pl-4 max-lg:will-change-transform motion-reduce:max-lg:animate-none max-lg:hover:[animation-play-state:paused] max-lg:focus-within:[animation-play-state:paused]">
              {hotlineBarItems.map(item => (
                <HotlineLink key={item.tel} {...item} />
              ))}
              <span className="hidden max-lg:contents">
                {hotlineBarItems.map(item => (
                  <HotlineLink key={`${item.tel}-dup`} {...item} duplicate />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

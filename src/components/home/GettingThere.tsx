import { ArrowUpRight, Bus, Plane, Ship, TriangleAlert } from 'lucide-react';
import { gettingThereSource } from '../../data/province';

const route = [
  { place: 'Manila', detail: 'Cubao, Kamias, Buendia, or Turbina terminals' },
  { place: 'Lucena City', detail: 'Port of Lucena, also called Dalahican' },
  { place: 'Balanacan Port', detail: 'Mogpog, Marinduque' },
];

const legs = ['Bus or van · about 3 hours', 'RoRo ferry · about 3 hours'];

const options = [
  {
    Icon: Ship,
    title: 'By sea',
    body: 'Starhorse Shipping Lines and Montenegro Shipping Lines run several RoRo trips a day between Dalahican Port in Lucena and Balanacan Port in Mogpog. You can bring a vehicle on board.',
    note: 'Other ports: Cawit (Boac) and Buyabod (Santa Cruz). A boat link connects General Luna, Quezon, with Santa Cruz via Maniwaya Island.',
  },
  {
    Icon: Plane,
    title: 'By air',
    body: 'Marinduque Airport in Barangay Masiga, Gasan, has no scheduled commercial flights at present — the last Manila service ended in 2023. Plan to arrive by sea.',
    note: 'Air service could resume. Check airline or provincial announcements before planning around a flight.',
  },
  {
    Icon: Bus,
    title: 'Getting around',
    body: 'Arrange onward transport at the port or airport. Jeepneys, vans, and tricycles serve the towns along the island’s main road.',
    note: 'Use the specific destination, not just the town, when asking for directions.',
  },
];

export default function GettingThere() {
  return (
    <section
      id="getting-there"
      aria-labelledby="getting-there-heading"
      className="hero-surface relative isolate overflow-hidden"
    >
      <div className="portal-container py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-300">Plan your trip</p>
          <h2
            id="getting-there-heading"
            className="mt-2 font-display text-[1.625rem] leading-tight font-extrabold tracking-tight sm:text-[2rem]"
          >
            Getting to Marinduque
          </h2>
          <p className="mt-3 text-white/80">
            Most travelers arrive by sea from Lucena City in Quezon. The trip
            from Manila takes about six hours by bus and ferry.
          </p>
        </div>

        <ol
          aria-label="Usual route from Manila"
          className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-0"
        >
          {route.map(({ place, detail }, index) => (
            <li
              key={place}
              className="flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-start sm:gap-0 sm:last:flex-none"
            >
              <div className="flex items-center gap-4 sm:w-44 sm:flex-col sm:text-center">
                <span
                  aria-hidden="true"
                  className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold ring-4 ${
                    index === route.length - 1
                      ? 'bg-accent-400 text-primary-950 ring-accent-400/25'
                      : 'bg-white text-primary-900 ring-white/15'
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-bold">{place}</p>
                  <p className="text-sm text-white/70">{detail}</p>
                </div>
              </div>
              {index < legs.length && (
                <p className="ml-6 border-l-2 border-dashed border-white/30 py-3 pl-9 text-sm font-semibold text-accent-200 sm:ml-0 sm:flex-1 sm:border-0 sm:p-0 sm:pt-3 sm:text-center">
                  <span
                    aria-hidden="true"
                    className="mb-2 hidden h-0.5 bg-linear-to-r from-white/5 via-white/50 to-white/5 sm:block"
                  />
                  {legs[index]}
                </p>
              )}
            </li>
          ))}
        </ol>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {options.map(({ Icon, title, body, note }) => (
            <li
              key={title}
              className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-accent-200 ring-1 ring-white/20">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/85">
                {body}
              </p>
              <p className="mt-4 border-t border-white/15 pt-3 text-xs leading-relaxed text-white/65">
                {note}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-accent-400/15 p-4 ring-1 ring-accent-300/30">
          <p className="flex max-w-3xl gap-2.5 text-sm leading-relaxed text-white/90">
            <TriangleAlert
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-accent-300"
            />
            Sailing times, fares, and trips change and are suspended in bad
            weather. Confirm with the shipping line before you travel, and book
            early for Holy Week, when visitors peak for the Moriones.
          </p>
          <a
            href={gettingThereSource}
            className="inline-flex items-center gap-1 text-sm font-semibold text-white underline underline-offset-4 hover:text-accent-200"
          >
            Source: Municipality of Mogpog
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { BookOpen, Drama, MapPin, Music } from 'lucide-react';
import { provinceHistory } from '../../data/province';

export default function HistorySection() {
  return (
    <section
      aria-labelledby="history-heading"
      className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16"
    >
      <div className="portal-container">
        <div className="mb-8">
          <h2
            id="history-heading"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900"
          >
            <BookOpen
              size={20}
              aria-hidden="true"
              className="text-primary-700"
            />
            Brief history of Marinduque
          </h2>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <ol className="relative ml-2 border-l-2 border-transparent pl-7 [border-image:linear-gradient(180deg,var(--color-primary-700),rgba(0,50,160,0.2))_1]">
            {provinceHistory.map(({ year, text }, index) => (
              <li
                key={year}
                className="group relative pb-5 last:pb-0 motion-safe:animate-fade-in-up motion-safe:opacity-0"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[37px] h-3.5 w-3.5 rounded-full border-[3px] border-primary-700 bg-white transition group-hover:scale-110 group-hover:bg-primary-700 group-hover:shadow-[0_0_0_4px_rgba(0,50,160,0.15)]"
                />
                <div className="rounded-[10px] border border-black/[0.06] bg-white px-5 py-4 transition group-hover:translate-x-1 group-hover:border-primary-700 group-hover:shadow-[0_4px_16px_rgba(0,50,160,0.1)]">
                  <span className="mb-2 inline-block rounded-full bg-primary-700 px-2.5 py-0.5 text-xs font-bold text-white">
                    {year}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-800">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-4 max-lg:flex-row max-lg:flex-wrap lg:sticky lg:top-24">
            <div className="flex flex-1 items-start gap-3.5 rounded-xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-700 hover:shadow-[0_4px_16px_rgba(0,50,160,0.1)] max-lg:min-w-72">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-gray-900">
                  Heart of the Philippines
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-gray-500">
                  Marinduque sits at the country&apos;s geographic center — the
                  Luzon Datum marker in Mogpog is the reference point of the
                  national mapping grid.
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-3.5 rounded-xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-700 hover:shadow-[0_4px_16px_rgba(0,50,160,0.1)] max-lg:min-w-72">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
                <Drama size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-gray-900">
                  Home of the Moriones
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-gray-500">
                  The island is known for the Holy Week Moryonan Lenten rites —
                  masked &ldquo;Roman soldiers&rdquo; taken on as a panata, or
                  personal vow.
                </p>
                <a
                  href="https://www.nationalmuseum.gov.ph/exhibitions/nm-marinduque-romblon-area-museum/moryonan/"
                  className="portal-link mt-2 inline-block text-[0.8125rem]"
                >
                  National Museum · Moryonan
                </a>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-3.5 rounded-xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-700 hover:shadow-[0_4px_16px_rgba(0,50,160,0.1)] max-lg:min-w-72">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-700 to-[#003d82] text-white">
                <Music size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-gray-900">
                  Kalutang music
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-gray-500">
                  Musicians strike pairs of wooden sticks to make melodies — a
                  tradition closely associated with Gasan.
                </p>
                <a
                  href="https://www.nationalmuseum.gov.ph/2022/04/29/kalutang-marinduques-traditional-musical-instrument/"
                  className="portal-link mt-2 inline-block text-[0.8125rem]"
                >
                  National Museum · Kalutang
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
